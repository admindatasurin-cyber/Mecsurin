import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Stethoscope, ChevronRight, Award } from 'lucide-react';
import { cn } from '../lib/utils';

interface DoctorDirectoryProps {
  onSelectDoctor: (doctorName: string, specialty: string) => void;
  doctors: any[];
}

export default function DoctorDirectory({ onSelectDoctor, doctors }: DoctorDirectoryProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const specialties = [
    { id: 'all', label: 'แพทย์ทุกสาขา' },
    { id: 'อายุรกรรม', label: 'อายุรกรรม' },
    { id: 'กุมารเวชกรรม', label: 'กุมารเวชกรรม' },
    { id: 'ศัลยกรรมออร์โธปิดิกส์', label: 'กระดูกและข้อ' },
    { id: 'เวชศาสตร์ครอบครัว', label: 'เวชศาสตร์ครอบครัว' }
  ];

  const filteredDoctors = selectedSpecialty === 'all'
    ? doctors
    : doctors.filter(d => d.specialty === selectedSpecialty);

  return (
    <section id="doctors" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase">Medical Specialists</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">ทีมแพทย์และตารางออกตรวจ</h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-xl">
            แพทย์ผู้เชี่ยวชาญเฉพาะทาง พร้อมให้บริการตรวจวินิจฉัยและดูแลรักษาตามมาตรฐานวิชาชีพ
          </p>
        </div>

        {/* Interactive Filter Tabs (Buttons with click handlers compliant with Section 1A) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg overflow-x-auto shrink-0">
          {specialties.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedSpecialty(tab.id)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap",
                selectedSpecialty === tab.id
                  ? "bg-white text-slate-900 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDoctors.map((doc) => (
          <div 
            key={doc.id}
            className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-md transition-all flex flex-col"
          >
            {/* Image Container with Fallback */}
            <div className="relative aspect-square bg-slate-100 overflow-hidden">
              <img
                src={doc.image || '/src/assets/images/doctor_portrait_male_1791176624773.jpg'}
                alt={doc.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback styling
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-medium text-slate-700 border border-slate-200/50 shadow-2xs">
                {doc.specialty}
              </div>
            </div>

            {/* Doctor Info */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{doc.name}</h3>
                <p className="text-xs text-emerald-700 font-medium mt-0.5">{doc.role}</p>

                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-start gap-1.5">
                    <MapPin size={13} className="text-slate-400 shrink-0 mt-0.5" />
                    <span>{doc.room}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Clock size={13} className="text-slate-400 shrink-0 mt-0.5" />
                    <span className="font-mono tabular-nums">{doc.schedule}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 mt-2.5 line-clamp-2" title={doc.edu}>
                  {doc.edu}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onSelectDoctor(doc.name, doc.specialty)}
                  className="w-full py-2 px-3 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calendar size={13} />
                  <span>จองตรวจกับแพทย์ท่านนี้</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
