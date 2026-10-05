import React from 'react';
import { Mail, Phone, MapPin, Shield, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MECFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-white font-bold text-base">
              <div className="w-7 h-7 rounded-md bg-emerald-600 flex items-center justify-center text-white text-xs font-bold font-mono">
                MEC
              </div>
              <span className="text-sm">ศูนย์แพทยศาสตรศึกษาชั้นคลินิก</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              โรงพยาบาลสุรินทร์ โครงการร่วมผลิตแพทย์เพื่อชาวชนบท (CPIRD) กระทรวงสาธารณสุข ร่วมกับสำนักวิชาแพทยศาสตร์ มหาวิทยาลัยเทคโนโลยีสุรนารี
            </p>
            <div className="pt-2">
              <span className="inline-block text-[11px] text-emerald-400 font-mono">
                Surin Medical Education Center · CPIRD
              </span>
            </div>
          </div>

          {/* Academic links */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3">หลักสูตรและการศึกษา</h4>
            <ul className="space-y-2">
              <li><a href="#rotations" className="hover:text-white transition-colors">หลักสูตรแพทยศาสตรบัณฑิต</a></li>
              <li><a href="#conferences" className="hover:text-white transition-colors">ตารางกิจกรรม Grand Round</a></li>
              <li><a href="#conferences" className="hover:text-white transition-colors">Morning Conference & Journal Club</a></li>
              <li><a href="#facilities" className="hover:text-white transition-colors">ศูนย์ Simulation & Skills Lab</a></li>
              <li><a href="#facilities" className="hover:text-white transition-colors">ห้องสมุดและคลังสารสนเทศ</a></li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3">เอกสารและบริการนักศึกษา</h4>
            <ul className="space-y-2">
              <li><a href="#resources" className="hover:text-white transition-colors">คู่มือนักศึกษาแพทย์</a></li>
              <li><a href="#resources" className="hover:text-white transition-colors">แบบฟอร์มคำร้องขอลา</a></li>
              <li><a href="#resources" className="hover:text-white transition-colors">เกณฑ์การบันทึก Logbook & EPA</a></li>
              <li><a href="#resources" className="hover:text-white transition-colors">แนวทางการขอจริยธรรมวิจัย (IRB)</a></li>
              <li>
                <Link to="/admin" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-emerald-400/90 font-medium">
                  <Shield size={12} />
                  <span>ระบบเจ้าหน้าที่ฝ่ายการศึกษา (Admin)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Office Contact */}
          <div className="space-y-2.5">
            <h4 className="text-slate-200 font-semibold mb-3">ฝ่ายแพทยศาสตรศึกษาชั้นคลินิก</h4>
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
              <span>อาคารศูนย์แพทยศาสตรศึกษาชั้นคลินิก ชั้น 3 โรงพยาบาลสุรินทร์ ถ.หลักเมือง อ.เมือง จ.สุรินทร์ 32000</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-slate-400 shrink-0" />
              <span className="font-mono tabular-nums">โทรศัพท์: 044-511-757 ต่อ 1130, 1132</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-slate-400 shrink-0" />
              <span className="font-mono tabular-nums text-slate-300">admindata.surin@cpird.in.th</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-600">
          <p>© 2026 ศูนย์แพทยศาสตรศึกษาชั้นคลินิก โรงพยาบาลสุรินทร์ (CPIRD MEC Surin). All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 transition-colors">นโยบายความเป็นส่วนตัวและคุ้มครองข้อมูลนักศึกษา</span>
            <span>·</span>
            <span className="hover:text-slate-400 transition-colors">ระเบียบแพทยสภา</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
