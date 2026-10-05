import React from 'react';
import { Check, Clock, ShieldCheck, MapPin, Laptop, BookOpen, Activity } from 'lucide-react';

interface FacilitiesShowcaseProps {
  facilities: any[];
}

export default function FacilitiesShowcase({ facilities }: FacilitiesShowcaseProps) {
  return (
    <section id="facilities" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100">
      <div className="max-w-2xl mb-12">
        <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase">Learning Environments</span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">สิ่งสนับสนุนการเรียนรู้และห้องปฏิบัติการทักษะ</h2>
        <p className="text-xs md:text-sm text-slate-500 mt-2">
          ศูนย์แพทยศาสตรศึกษาชั้นคลินิก รพ.สุรินทร์ เพียบพร้อมด้วยเทคโนโลยีการจำลองสถานการณ์เสมือนจริง และคลังสารสนเทศทางการแพทย์มาตรฐานสากล
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {facilities.map((fac) => (
          <div
            key={fac.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image Container with Fallback */}
              <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                <img
                  src={fac.image}
                  alt={fac.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded">
                  {fac.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-base font-bold text-slate-900 leading-snug">{fac.name}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{fac.description}</p>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-700 block mb-2">อุปกรณ์และจุดเด่น:</span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {fac.features && fac.features.map((feat: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
                <Clock size={13} className="text-slate-400 shrink-0" />
                <span className="line-clamp-1">{fac.hours}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
