import React, { useState } from 'react';
import { Calendar, User, Clock, CheckCircle2, Award, BookOpen, GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';

interface CurriculumAndRotationsProps {
  rotations: any[];
}

export default function CurriculumAndRotations({ rotations }: CurriculumAndRotationsProps) {
  const [selectedYear, setSelectedYear] = useState('all');

  const years = [
    { id: 'all', label: 'ทุกระดับชั้นปี' },
    { id: 'ชั้นปีที่ 4', label: 'นศพ.ชั้นปีที่ 4' },
    { id: 'ชั้นปีที่ 5', label: 'นศพ.ชั้นปีที่ 5' },
    { id: 'ชั้นปีที่ 6 (Extern)', label: 'ชั้นปีที่ 6 (Extern)' },
    { id: 'แพทย์เพิ่มพูนทักษะ (Intern)', label: 'แพทย์เพิ่มพูนทักษะ (Intern)' }
  ];

  const filteredRotations = selectedYear === 'all'
    ? rotations
    : rotations.filter(r => r.student_year.includes(selectedYear) || selectedYear.includes(r.student_year));

  return (
    <section id="rotations" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100 bg-slate-50/50 rounded-3xl my-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase">Clinical Curriculum</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">หลักสูตรแพทยศาสตร์และการฝึกปฏิบัติงาน (Rotations)</h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-xl">
            โครงสร้างการฝึกปฏิบัติงานคลินิกตามเกณฑ์มาตรฐานแพทยสภาและโครงการผลิตแพทย์เพื่อชาวชนบท (CPIRD)
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-lg overflow-x-auto shrink-0">
          {years.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedYear(tab.id)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap",
                selectedYear === tab.id
                  ? "bg-white text-slate-900 shadow-2xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {filteredRotations.map((rot) => (
          <div
            key={rot.id}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                  {rot.student_year}
                </span>
                <span className="font-mono text-slate-500">{rot.batch_name}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mt-2">
                {rot.department}
              </h3>

              <div className="mt-3 py-2 border-t border-b border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[11px]">ระยะเวลาฝึก:</span>
                  <span className="font-semibold text-slate-800">{rot.duration}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">ช่วงเวลา:</span>
                  <span className="font-mono tabular-nums text-slate-800">{rot.start_date} ถึง {rot.end_date}</span>
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-600">
                <span className="text-slate-400 text-[11px] block mb-0.5">อาจารย์ผู้รับผิดชอบรายวิชา:</span>
                <p className="font-medium text-slate-800">{rot.course_director}</p>
              </div>

              <div className="mt-3 text-xs text-slate-500 leading-relaxed">
                <span className="text-slate-400 text-[11px] block mb-0.5">วัตถุประสงค์และสมรรถนะการเรียนรู้:</span>
                <p className="line-clamp-3">{rot.objectives}</p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>เกณฑ์การประเมิน: Logbook / Mini-CEX / OSCE</span>
              <span className="text-emerald-700 font-semibold">ศูนย์แพทย์สุรินทร์</span>
            </div>
          </div>
        ))}
      </div>

      {/* Curriculum Tracks Summary */}
      <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200">
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <GraduationCap className="text-emerald-700" size={18} />
          <span>เส้นทางการผลิตบัณฑิตแพทย์ โครงการ CPIRD โรงพยาบาลสุรินทร์</span>
        </h3>
        <div className="grid sm:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-bold text-emerald-800 block mb-1">ชั้นปรีคลินิก (ปี 1 - 3)</span>
            <p className="text-slate-500">ศึกษาวิทยาศาสตร์การแพทย์พื้นฐาน ณ มหาวิทยาลัยคู่สัญญา (มทส. / มข.)</p>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-bold text-emerald-800 block mb-1">ชั้นคลินิก (ปี 4 - 6)</span>
            <p className="text-slate-500">ฝึกทักษะเวชปฏิบัติกับผู้ป่วยจริง ณ โรงพยาบาลสุรินทร์และ รพ.ชุมชนเครือข่าย</p>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-bold text-emerald-800 block mb-1">แพทย์เพิ่มพูนทักษะ (Intern)</span>
            <p className="text-slate-500">ปฏิบัติงานชดใช้ทุนและเพิ่มพูนทักษะทางวิชาชีพก่อนเข้าสู่การฝึกอบรมแพทย์เฉพาะทาง</p>
          </div>
        </div>
      </div>
    </section>
  );
}
