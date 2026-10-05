import React, { useState } from 'react';
import { Mail, GraduationCap, Award, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

interface FacultyDirectoryProps {
  faculty: any[];
}

export default function FacultyDirectory({ faculty }: FacultyDirectoryProps) {
  const [selectedDept, setSelectedDept] = useState('all');

  const departments = [
    { id: 'all', label: 'อาจารย์แพทย์ทุกภาควิชา' },
    { id: 'บริหารการศึกษาและอายุรศาสตร์', label: 'ผู้บริหารศูนย์แพทย์' },
    { id: 'อายุรศาสตร์', label: 'อายุรศาสตร์' },
    { id: 'กุมารเวชศาสตร์', label: 'กุมารเวชศาสตร์' },
    { id: 'ศัลยศาสตร์ออร์โธปิดิกส์', label: 'ศัลยศาสตร์ออร์โธปิดิกส์' },
    { id: 'เวชศาสตร์ครอบครัว', label: 'เวชศาสตร์ครอบครัว' }
  ];

  const filteredFaculty = selectedDept === 'all'
    ? faculty
    : faculty.filter(f => f.department === selectedDept);

  return (
    <section id="faculty" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase">Academic Faculty</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">คณะผู้บริหารและทำเนียบอาจารย์แพทย์</h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-xl">
            ทีมอาจารย์แพทย์ผู้ทรงคุณวุฒิ ทุ่มเทถ่ายทอดความรู้และประสบการณ์ทางคลินิกแก่นักศึกษาแพทย์
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg overflow-x-auto shrink-0">
          {departments.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedDept(tab.id)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap",
                selectedDept === tab.id
                  ? "bg-white text-slate-900 shadow-2xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={member.image}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-200"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{member.name}</h3>
                  <p className="text-xs text-emerald-800 font-semibold mt-1 leading-snug">{member.role}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{member.specialty}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">ประวัติการศึกษาและคุณวุฒิ:</span>
                  <p className="text-slate-700 leading-relaxed mt-0.5">{member.education}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono text-[11px] text-slate-400">ภาควิชา{member.department}</span>
              <a 
                href={`mailto:${member.email}`} 
                className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-medium"
              >
                <Mail size={12} />
                <span className="font-mono text-[11px]">{member.email}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
