import React from 'react';
import { Phone, MapPin, Clock, Mail, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-7 h-7 rounded-md bg-emerald-600 flex items-center justify-center text-white text-xs">
                SM
              </div>
              <span>ศูนย์แพทย์สุรินทร์</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              หน่วยบริการการแพทย์และสร้างเสริมสุขภาพครบวงจร มุ่งเน้นการตรวจวินิจฉัยแม่นยำและการดูแลด้วยหัวใจเพื่อประชาชนในจังหวัดสุรินทร์
            </p>
            <div className="pt-2">
              <span className="inline-block text-[11px] text-emerald-400 font-mono">
                Surin Medical Center · CPIRD
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3">บริการทางการแพทย์</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-white transition-colors">ตรวจสุขภาพประจำปี</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">คลินิกอายุรกรรมและหัวใจ</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">คลินิกกุมารเวชกรรม</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">คลินิกกระดูกและข้อ</a></li>
              <li><a href="#packages" className="hover:text-white transition-colors">แพ็กเกจตรวจคัดกรอง</a></li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3">ระบบและการติดต่อ</h4>
            <ul className="space-y-2">
              <li><a href="#doctors" className="hover:text-white transition-colors">ตารางแพทย์ออกตรวจ</a></li>
              <li><a href="#news" className="hover:text-white transition-colors">ข่าวสารและประกาศศูนย์</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">การเดินทางและที่จอดรถ</a></li>
              <li>
                <Link to="/admin" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <Shield size={12} />
                  <span>ระบบจัดการเจ้าหน้าที่ (Admin)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-2.5">
            <h4 className="text-slate-200 font-semibold mb-3">ที่อยู่และเวลาทำการ</h4>
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
              <span>123 ถนนหลักเมือง ตำบลในเมือง อำเภอเมือง จังหวัดสุรินทร์ 32000</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-slate-400 shrink-0" />
              <span className="font-mono tabular-nums">จันทร์ - อาทิตย์ 08:00 - 20:00 น.</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-slate-400 shrink-0" />
              <span className="font-mono tabular-nums">โทรศัพท์: 044-511-757</span>
            </div>
            <div className="flex items-center gap-2 text-rose-400 font-medium">
              <Phone size={14} className="shrink-0" />
              <span>ฉุกเฉินและอุบัติเหตุ: 1669</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 ศูนย์แพทย์สุรินทร์ (Surin Medical Center). All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 transition-colors">นโยบายความเป็นส่วนตัวและคุ้มครองข้อมูลผู้ป่วย</span>
            <span>·</span>
            <span className="hover:text-slate-400 transition-colors">ข้อกำหนดการเข้ารับบริการ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
