import React, { useState } from 'react';
import { Search, X, Calendar, Clock, CheckCircle2, AlertCircle, Printer, MapPin, User, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

interface AppointmentTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export default function AppointmentTrackerModal({ isOpen, onClose, initialQuery = '' }: AppointmentTrackerModalProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setErrorMsg('กรุณากรอกเบอร์โทรศัพท์หรือรหัสนัดหมาย');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`/api/appointments/track?q=${encodeURIComponent(query.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data);
        setSearched(true);
      } else {
        setErrorMsg('เกิดข้อผิดพลาดในการค้นหาข้อมูล');
      }
    } catch (err) {
      setErrorMsg('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
            <CheckCircle2 size={13} className="shrink-0" /> ยืนยันนัดหมายแล้ว
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md">
            <CheckCircle2 size={13} className="shrink-0" /> เข้ารับการตรวจแล้ว
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-md">
            <AlertCircle size={13} className="shrink-0" /> ยกเลิกนัดหมาย
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
            <Clock size={13} className="shrink-0" /> อยู่ระหว่างการตรวจสอบคิว
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="text-base font-semibold text-slate-900">ตรวจสอบสถานะนัดหมายตรวจสุขภาพ</h3>
            <p className="text-xs text-slate-500 mt-0.5">ค้นหาด้วยเบอร์โทรศัพท์ที่ใช้จอง หรือ รหัสนัดหมาย (เช่น SMC-2610-xxxx)</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-slate-100">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="ระบุเบอร์โทรศัพท์ (เช่น 0812345678) หรือ รหัสนัดหมาย"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shrink-0 disabled:opacity-50"
            >
              {loading ? 'กำลังค้นหา...' : 'ค้นหาข้อมูล'}
            </button>
          </form>

          {errorMsg && (
            <p className="text-xs text-rose-600 mt-2">{errorMsg}</p>
          )}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {searched && results && results.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <FileText size={40} className="mx-auto text-slate-300 mb-3" />
              <p className="font-medium text-slate-700">ไม่พบนัดหมายในระบบ</p>
              <p className="text-xs text-slate-400 mt-1">โปรดตรวจสอบความถูกต้องของเบอร์โทรศัพท์ หรือติดต่อเจ้าหน้าที่เวชระเบียน 044-511-757</p>
            </div>
          )}

          {results && results.map((item) => (
            <div key={item.id} className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-emerald-800">{item.code || `SMC-${item.id}`}</span>
                    {getStatusBadge(item.status)}
                  </div>
                  <h4 className="text-base font-semibold text-slate-900 mt-1">{item.name}</h4>
                  <p className="text-xs text-slate-500">โทร: <span className="font-mono tabular-nums">{item.phone}</span> {item.hn ? `· HN: ${item.hn}` : ''}</p>
                </div>
                <button 
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Printer size={13} /> พิมพ์ใบนัด
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 py-3 border-t border-b border-slate-100 text-xs">
                <div>
                  <span className="text-slate-500">คลินิก / แผนก:</span>
                  <p className="font-medium text-slate-800 mt-0.5">{item.service}</p>
                </div>
                <div>
                  <span className="text-slate-500">แพทย์ผู้ออกตรวจ:</span>
                  <p className="font-medium text-slate-800 mt-0.5">{item.doctor_name || 'แพทย์เวรประจำวัน'}</p>
                </div>
                <div>
                  <span className="text-slate-500">วันเวลานัดหมาย:</span>
                  <p className="font-medium text-slate-800 mt-0.5 font-mono tabular-nums">
                    {item.date} · {item.time_slot}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">สถานที่:</span>
                  <p className="font-medium text-slate-800 mt-0.5">อาคารศูนย์แพทย์สุรินทร์ ชั้น 1</p>
                </div>
              </div>

              {item.admin_notes && (
                <div className="mt-3 p-2.5 rounded-md bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900">
                  <span className="font-semibold">ข้อความจากเจ้าหน้าที่: </span>
                  {item.admin_notes}
                </div>
              )}

              <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
                <span>กรุณามาถึงก่อนเวลานัดหมาย 15 นาที พร้อมบัตรประชาชน</span>
                <span className="font-mono tabular-nums">บันทึกเมื่อ: {item.created_at?.split(' ')[0]}</span>
              </div>
            </div>
          ))}

          {!searched && (
            <div className="text-center py-10 text-slate-400">
              <Search size={32} className="mx-auto text-slate-300 mb-2" />
              <p className="text-xs">กรอกข้อมูลด้านบนเพื่อเริ่มตรวจสอบสถานะการนัดหมายของคุณ</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
}
