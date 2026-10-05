import React from 'react';
import { ArrowRight, BookOpen, Calendar, Award, GraduationCap, Building2, CheckCircle2 } from 'lucide-react';

export default function MECHero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Campus Image with Deep Academic Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_surin_mec_campus_1791177096756.jpg"
          alt="ศูนย์แพทยศาสตรศึกษาชั้นคลินิก โรงพยาบาลสุรินทร์"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="max-w-3xl">
          {/* Zero-Pill Unboxed Institutional Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-400 mb-4 tracking-wide uppercase">
            <span>สถาบันร่วมผลิตแพทย์แห่งประเทศไทย</span>
            <span aria-hidden="true">·</span>
            <span>โครงการ CPIRD</span>
            <span aria-hidden="true">·</span>
            <span>โรงพยาบาลศูนย์สุรินทร์</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.18] text-balance">
            ศูนย์แพทยศาสตรศึกษาชั้นคลินิก <br />
            <span className="text-emerald-400">โรงพยาบาลสุรินทร์</span> สู่มาตรฐานแพทย์สากล
          </h1>

          <p className="mt-5 text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl">
            มุ่งมั่นจัดการศึกษาแพทยศาสตร์ชั้นคลินิกที่เปี่ยมคุณภาพ บ่มเพาะนักศึกษาแพทย์และแพทย์เพิ่มพูนทักษะให้มีความรู้ ความสามารถ ทักษะทางคลินิกเป็นเลิศ ยึดมั่นในคุณธรรมจริยธรรม และพร้อมอุทิศตนเพื่อระบบสาธารณสุขไทย
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#conferences"
              className="py-3 px-6 text-xs md:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
            >
              <Calendar size={15} />
              <span>ตารางกิจกรรมวิชาการประจำสัปดาห์</span>
              <ArrowRight size={14} />
            </a>
            <a
              href="#resources"
              className="py-3 px-5 text-xs md:text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <BookOpen size={15} className="text-emerald-400" />
              <span>คู่มือนักศึกษา & ฟอร์มคำร้อง</span>
            </a>
          </div>

          {/* Academic Trust Metrics (Section 1H Quantitative Rigor) */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            <div>
              <span className="font-mono text-2xl lg:text-3xl font-bold text-white tabular-nums">98.4%</span>
              <p className="text-xs text-slate-400 mt-1">ผ่านเกณฑ์ National License</p>
            </div>
            <div>
              <span className="font-mono text-2xl lg:text-3xl font-bold text-white tabular-nums">18+</span>
              <p className="text-xs text-slate-400 mt-1">รุ่นบัณฑิตแพทย์ที่สำเร็จการศึกษา</p>
            </div>
            <div>
              <span className="font-mono text-2xl lg:text-3xl font-bold text-white tabular-nums">900+</span>
              <p className="text-xs text-slate-400 mt-1">เตียงผู้ป่วยรองรับการเรียนรู้</p>
            </div>
            <div>
              <span className="font-mono text-2xl lg:text-3xl font-bold text-white tabular-nums">10</span>
              <p className="text-xs text-slate-400 mt-1">ภาควิชาและคลินิกเฉพาะทาง</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
