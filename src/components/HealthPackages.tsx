import React, { useState, useEffect } from 'react';
import { Check, Star, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { cn } from '../lib/utils';

interface HealthPackagesProps {
  onSelectPackage: (packageName: string) => void;
  packages: any[];
}

export default function HealthPackages({ onSelectPackage, packages }: HealthPackagesProps) {
  return (
    <section id="packages" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100 bg-slate-50/60 rounded-3xl my-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase">Preventive Healthcare</span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">แพ็กเกจตรวจสุขภาพประจำปี</h2>
        <p className="text-xs md:text-sm text-slate-500 mt-2">
          ออกแบบโดยทีมแพทย์เพื่อตรวจคัดกรองความเสี่ยงทางสุขภาพอย่างครอบคลุม แม่นยำ และคุ้มค่า
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={cn(
              "bg-white rounded-2xl p-6 border transition-all flex flex-col justify-between relative",
              pkg.is_popular 
                ? "border-emerald-600 shadow-md ring-1 ring-emerald-600/20" 
                : "border-slate-200 hover:border-slate-300 shadow-xs"
            )}
          >
            {pkg.is_popular ? (
              <div className="absolute -top-3 left-6 bg-emerald-700 text-white text-[11px] font-semibold px-3 py-0.5 rounded-full shadow-xs">
                โปรแกรมยอดนิยม
              </div>
            ) : null}

            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>{pkg.category}</span>
                <span className="text-slate-500">{pkg.target_group}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">{pkg.name}</h3>

              <div className="mt-4 pb-4 border-b border-slate-100 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                  ฿{pkg.price?.toLocaleString()}
                </span>
                {pkg.original_price && pkg.original_price > pkg.price && (
                  <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                    ฿{pkg.original_price?.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-slate-500 ml-auto">/ ท่าน</span>
              </div>

              <div className="mt-5 space-y-2.5">
                <span className="text-xs font-semibold text-slate-700 block">รายการตรวจในโปรแกรม:</span>
                <ul className="space-y-2 text-xs text-slate-600">
                  {pkg.items && pkg.items.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onSelectPackage(pkg.name)}
                className={cn(
                  "w-full py-2.5 px-4 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5",
                  pkg.is_popular
                    ? "bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                )}
              >
                <span>เลือกจองแพ็กเกจนี้</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div>
            <p className="font-semibold text-slate-800">ผลการตรวจมาตรฐานสากล พร้อมพบแพทย์รับคำปรึกษาฟรี</p>
            <p className="text-slate-500">รวมค่าบริการทางการแพทย์และค่าอุปกรณ์ทางห้องปฏิบัติการทั้งหมดแล้ว</p>
          </div>
        </div>
        <span className="text-slate-400 font-mono text-[11px] shrink-0">
          สอบถามรายละเอียดเพิ่มเติม: 044-511-757 ต่อ 102
        </span>
      </div>
    </section>
  );
}
