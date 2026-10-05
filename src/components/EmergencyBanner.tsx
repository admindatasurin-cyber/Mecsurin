import React from 'react';
import { PhoneCall, AlertTriangle, Clock, Ambulance, MapPin } from 'lucide-react';

export default function EmergencyBanner() {
  return (
    <div className="bg-slate-900 text-white py-4 px-6 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-emerald-400">สถานะเปิดทำการ:</span>
            <span className="text-slate-300 font-mono tabular-nums">08:00 - 20:00 น. (ทุกวัน)</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <MapPin size={13} className="text-slate-400" />
            <span>อาคารศูนย์แพทย์สุรินทร์ ถ.หลักเมือง อ.เมือง จ.สุรินทร์</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-rose-300 font-medium">
            <Ambulance size={14} className="text-rose-400" />
            <span>ฉุกเฉินโทร: <strong className="font-mono text-white text-sm">1669</strong></span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <PhoneCall size={13} className="text-emerald-400" />
            <span>สายตรงศูนย์แพทย์: <strong className="font-mono text-white">044-511-757</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
