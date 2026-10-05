import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, CheckCircle2, User, Phone, Stethoscope, FileText, Printer, ArrowRight } from 'lucide-react';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  preselectedDoctor?: string;
  doctorsList?: any[];
}

export default function AppointmentBookingModal({
  isOpen,
  onClose,
  preselectedService = '',
  preselectedDoctor = '',
  doctorsList = []
}: AppointmentBookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    hn: '',
    service: preselectedService || 'ตรวจสุขภาพทั่วไป',
    doctor_name: preselectedDoctor || '',
    date: '',
    time_slot: '09:00 - 10:00',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
    if (preselectedDoctor) {
      setFormData(prev => ({ ...prev, doctor_name: preselectedDoctor }));
    }
  }, [preselectedService, preselectedDoctor]);

  if (!isOpen) return null;

  // Tomorrow as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const data = await res.json();
        setConfirmedBooking(data);
      } else {
        alert('เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง');
      }
    } catch (err) {
      alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setConfirmedBooking(null);
    setFormData({
      name: '',
      phone: '',
      hn: '',
      service: 'ตรวจสุขภาพทั่วไป',
      doctor_name: '',
      date: '',
      time_slot: '09:00 - 10:00',
      message: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 sticky top-0 z-10 backdrop-blur-xs">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              {confirmedBooking ? 'ใบนัดหมายแพทย์สำเร็จ' : 'จองนัดหมายตรวจล่วงหน้า'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              ศูนย์แพทย์สุรินทร์ (Surin Medical Center)
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {confirmedBooking ? (
          /* Confirmation Slip */
          <div className="p-6">
            <div className="p-6 rounded-xl border border-emerald-200 bg-emerald-50/30 text-center mb-6">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="text-lg font-bold text-slate-900">การจองนัดหมายสำเร็จเรียบร้อย</h4>
              <p className="text-xs text-slate-600 mt-1">
                โปรดบันทึกรหัสนัดหมายหรือถ่ายภาพหน้าจอนี้ไว้เพื่อติดต่อในวันรับบริการ
              </p>
              <div className="mt-4 inline-block bg-white border border-emerald-300 px-4 py-2 rounded-lg">
                <span className="text-[11px] text-slate-500 block">รหัสนัดหมาย (Booking Ref)</span>
                <span className="font-mono text-xl font-bold text-emerald-700 tracking-wider">
                  {confirmedBooking.code}
                </span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 space-y-3 text-xs bg-white">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">ชื่อคนไข้:</span>
                <span className="font-semibold text-slate-800">{confirmedBooking.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">เบอร์โทรศัพท์:</span>
                <span className="font-mono font-medium text-slate-800">{confirmedBooking.phone}</span>
              </div>
              {confirmedBooking.hn && (
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">เลขประจำตัวผู้ป่วย (HN):</span>
                  <span className="font-mono font-medium text-slate-800">{confirmedBooking.hn}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">บริการ / แผนก:</span>
                <span className="font-semibold text-slate-800">{confirmedBooking.service}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">แพทย์ผู้ออกตรวจ:</span>
                <span className="font-medium text-slate-800">{confirmedBooking.doctor_name || 'แพทย์เวรประจำวัน'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">วันเวลานัดหมาย:</span>
                <span className="font-mono font-semibold text-emerald-800">
                  {confirmedBooking.date} ({confirmedBooking.time_slot})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">สถานะ:</span>
                <span className="font-semibold text-amber-700">รอยืนยันคิวตรวจจากเจ้าหน้าที่</span>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-800">ข้อควรปฏิบัติในวันตรวจ:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-500">
                <li>กรุณาเดินทางมาถึงก่อนเวลานัดหมายอย่างน้อย 15 นาที</li>
                <li>นำบัตรประชาชนตัวจริง หรือหลักฐานสิทธิการรักษามาแสดงที่เคาน์เตอร์เวชระเบียน</li>
                <li>หากเป็นการตรวจสุขภาพหรือเจาะเลือด ควรงดน้ำและอาหารอย่างน้อย 8 ชั่วโมง</li>
              </ul>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
              >
                <Printer size={14} /> พิมพ์ใบนัด
              </button>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
              >
                เสร็จสิ้น
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ชื่อ - นามสกุล ผู้รับบริการ <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น นายสมใจ รักดี"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  เบอร์โทรศัพท์ติดต่อ <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="เช่น 0812345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  บริการ / แผนกคลินิก <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                >
                  <option value="ตรวจสุขภาพทั่วไป">ตรวจสุขภาพทั่วไป (General Checkup)</option>
                  <option value="คลินิกอายุรกรรมและหัวใจ">คลินิกอายุรกรรมและหัวใจ (Internal Medicine)</option>
                  <option value="คลินิกกุมารเวชกรรม">คลินิกกุมารเวชกรรม (Pediatrics)</option>
                  <option value="คลินิกศัลยกรรมกระดูกและข้อ">คลินิกศัลยกรรมกระดูกและข้อ (Orthopedics)</option>
                  <option value="คลินิกเวชศาสตร์ครอบครัว">คลินิกเวชศาสตร์ครอบครัว (Family Medicine)</option>
                  <option value="ฉีดวัคซีนป้องกันโรค">ฉีดวัคซีนป้องกันโรค (Vaccination)</option>
                  <option value="แพ็กเกจตรวจสุขภาพพิเศษ">แพ็กเกจตรวจสุขภาพพิเศษ (Health Package)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ระบุแพทย์ที่ต้องการตรวจ (ถ้ามี)
                </label>
                <select
                  value={formData.doctor_name}
                  onChange={(e) => setFormData({ ...formData, doctor_name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                >
                  <option value="">-- ไม่ระบุ (แพทย์เวรประจำวัน) --</option>
                  {doctorsList.map((doc) => (
                    <option key={doc.id} value={doc.name}>
                      {doc.name} ({doc.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  วันที่ต้องการเข้ารับการตรวจ <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  min={minDate}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ช่วงเวลาที่สะดวก
                </label>
                <select
                  value={formData.time_slot}
                  onChange={(e) => setFormData({ ...formData, time_slot: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                >
                  <option value="08:30 - 09:30">ช่วงเช้า: 08:30 - 09:30 น.</option>
                  <option value="09:30 - 10:30">ช่วงเช้า: 09:30 - 10:30 น.</option>
                  <option value="10:30 - 11:30">ช่วงสาย: 10:30 - 11:30 น.</option>
                  <option value="13:00 - 14:00">ช่วงบ่าย: 13:00 - 14:00 น.</option>
                  <option value="14:00 - 15:30">ช่วงบ่าย: 14:00 - 15:30 น.</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                เลขประจำตัวผู้ป่วยเดิม (HN) ในเครือ รพ.สุรินทร์ (ถ้ามี)
              </label>
              <input
                type="text"
                placeholder="เช่น 6401923 (เว้นว่างได้หากเป็นคนไข้ใหม่)"
                value={formData.hn}
                onChange={(e) => setFormData({ ...formData, hn: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                อาการเบื้องต้น หรือข้อความถึงแพทย์
              </label>
              <textarea
                rows={2}
                placeholder="ระบุอาการที่เป็น เช่น แน่นหน้าอก, ต้องการตรวจสุขภาพประจำปี, ต้องการรับวัคซีน..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
              >
                {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ยืนยันการจองนัดหมาย'}
                <ArrowRight size={14} />
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-2">
                หลังการจอง เจ้าหน้าที่จะตรวจสอบคิวและอัปเดตสถานะในระบบภายใน 24 ชม.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
