import React from 'react';
import { Award, BookOpen, HeartHandshake, ShieldCheck, GraduationCap, Building } from 'lucide-react';

export default function MECAboutSection() {
  return (
    <section id="about" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase">Institutional Overview</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">
            พันธกิจและประวัติความเป็นมา <br />
            <span className="text-emerald-800">ศูนย์แพทยศาสตรศึกษาชั้นคลินิก โรงพยาบาลสุรินทร์</span>
          </h2>

          <p className="mt-4 text-xs md:text-sm text-slate-600 leading-relaxed">
            ศูนย์แพทยศาสตรศึกษาชั้นคลินิก โรงพยาบาลสุรินทร์ ก่อตั้งขึ้นตามมติคณะรัฐมนตรีภายใต้โครงการร่วมผลิตแพทย์เพื่อชาวชนบท (CPIRD) กระทรวงสาธารณสุข เพื่อกระจายโอกาสทางการศึกษาแพทยศาสตร์และแก้ปัญหาการขาดแคลนแพทย์ในพื้นที่ภาคตะวันออกเฉียงเหนือตอนล่าง
          </p>

          <p className="mt-3 text-xs md:text-sm text-slate-600 leading-relaxed">
            ตลอดระยะเวลากว่า 18 ปีที่ผ่านมา ศูนย์แพทย์สุรินทร์ได้จัดการเรียนการสอนในชั้นคลินิก (ปี 4, 5, 6) และแพทย์เพิ่มพูนทักษะ มุ่งเน้นการเรียนรู้จากผู้ป่วยจริง (Bedside Teaching) ควบคู่กับการปลูกฝังจิตสำนึกในการดูแลสุขภาพชุมชนแบบองค์รวม
          </p>

          {/* Pillars */}
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2">
                <GraduationCap size={16} />
              </div>
              <h4 className="text-xs font-bold text-slate-900">มาตรฐาน WFME & แพทยสภา</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                หลักสูตรได้รับการรับรองตามมาตรฐานสากล World Federation for Medical Education
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2">
                <HeartHandshake size={16} />
              </div>
              <h4 className="text-xs font-bold text-slate-900">จิตวิญญาณแพทย์ชนบท</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                บ่มเพาะทัศนคติที่ดีต่อการรับใช้สังคมในถิ่นกำเนิดและการทำงานร่วมกับสหวิชาชีพ
              </p>
            </div>
          </div>
        </div>

        {/* Affiliated Universities & Academic Network */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">Academic Partnerships</span>
            <h3 className="text-xl font-bold text-white mb-4">เครือข่ายความร่วมมือทางวิชาการ</h3>
            
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <span className="text-emerald-400 font-semibold block text-[11px]">มหาวิทยาลัยคู่สัญญาหลัก</span>
                <p className="text-sm font-bold text-white mt-0.5">สำนักวิชาแพทยศาสตร์ มหาวิทยาลัยเทคโนโลยีสุรนารี</p>
                <p className="text-slate-400 text-[11px] mt-1">ร่วมจัดการเรียนการสอนหลักสูตรแพทยศาสตรบัณฑิต (ชั้นคลินิก)</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <span className="text-emerald-400 font-semibold block text-[11px]">หน่วยงานกำกับดูแลระดับชาติ</span>
                <p className="text-sm font-bold text-white mt-0.5">สำนักงานบริหารโครงการร่วมผลิตแพทย์เพื่อชาวชนบท (สปรช.)</p>
                <p className="text-slate-400 text-[11px] mt-1">กระทรวงสาธารณสุข และแพทยสภาแห่งประเทศไทย</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <span className="text-emerald-400 font-semibold block text-[11px]">สถาบันฝึกอบรมระดับตติยภูมิ</span>
                <p className="text-sm font-bold text-white mt-0.5">โรงพยาบาลสุรินทร์ และ รพ.ชุมชนเครือข่าย 17 อำเภอ</p>
                <p className="text-slate-400 text-[11px] mt-1">ความหลากหลายของโรคและหัตถการทางคลินิกกว่า 900 เตียง</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>SURIN MEC · CPIRD ACCREDITED</span>
            <span className="text-emerald-400">EST. 2008</span>
          </div>
        </div>
      </div>
    </section>
  );
}
