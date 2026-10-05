import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, ChevronRight, X, BookOpen, Presentation } from 'lucide-react';
import { cn } from '../lib/utils';

interface AcademicConferencesSectionProps {
  conferences: any[];
}

export default function AcademicConferencesSection({ conferences }: AcademicConferencesSectionProps) {
  const [selectedType, setSelectedType] = useState('all');
  const [activeItem, setActiveItem] = useState<any | null>(null);

  const conferenceTypes = [
    { id: 'all', label: 'กิจกรรมทั้งหมด' },
    { id: 'Grand Round', label: 'Grand Round' },
    { id: 'Morning Conference', label: 'Morning Conference' },
    { id: 'Journal Club', label: 'Journal Club' },
    { id: 'Interhospital Conference', label: 'Interhospital' }
  ];

  const filteredConferences = selectedType === 'all'
    ? conferences
    : conferences.filter(c => c.type === selectedType);

  return (
    <section id="conferences" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase">Academic Schedule</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">ตารางกิจกรรมวิชาการและการบรรยายพิเศษ</h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-xl">
            กิจกรรมการเรียนรู้ทางคลินิกสำหรับนักศึกษาแพทย์ชั้นปีที่ 4-6 แพทย์เพิ่มพูนทักษะ และแพทย์ประจำบ้าน
          </p>
        </div>

        {/* Interactive Filter Tabs (Buttons with click handlers) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg overflow-x-auto shrink-0">
          {conferenceTypes.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap",
                selectedType === tab.id
                  ? "bg-white text-slate-900 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {filteredConferences.map((conf) => (
          <div
            key={conf.id}
            onClick={() => setActiveItem(conf)}
            className="group cursor-pointer bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {conf.type}
                </span>
                <span className="text-slate-500 font-mono tabular-nums">ภาควิชา{conf.department}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                {conf.title}
              </h3>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar size={13} className="text-slate-400 shrink-0" />
                  <span className="font-mono tabular-nums font-medium text-slate-800">{conf.date}</span>
                  <span className="text-slate-300">|</span>
                  <Clock size={13} className="text-slate-400 shrink-0" />
                  <span className="font-mono tabular-nums">{conf.time} น.</span>
                </div>
                <div className="flex items-start gap-2">
                  <User size={13} className="text-slate-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{conf.speaker}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={13} className="text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-slate-500">{conf.venue}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
              <span>รายละเอียดการประชุมและการเตรียมตัว</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Conference Detail Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 md:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                {activeItem.type} · ภาควิชา{activeItem.department}
              </span>
              <button
                onClick={() => setActiveItem(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mt-4 leading-snug">
              {activeItem.title}
            </h3>

            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">วันเวลา:</span>
                <span className="font-mono font-semibold text-slate-800">{activeItem.date} เวลา {activeItem.time} น.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">วิทยากร / อาจารย์ผู้ดูแล:</span>
                <span className="font-medium text-slate-800">{activeItem.speaker}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">สถานที่จัด:</span>
                <span className="font-medium text-slate-800">{activeItem.venue}</span>
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-600 leading-relaxed space-y-2">
              <p className="font-semibold text-slate-800">คำอธิบายและวัตถุประสงค์การเรียนรู้:</p>
              <p>{activeItem.description || 'การอภิปรายกรณีศึกษาทางคลินิกและการทบทวนหลักฐานเชิงประจักษ์ (Evidence-Based Medicine)'}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveItem(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
