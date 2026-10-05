import React, { useState } from 'react';
import { Calendar, ChevronRight, X, Bell } from 'lucide-react';

interface AnnouncementsProps {
  announcements: any[];
}

export default function Announcements({ announcements }: AnnouncementsProps) {
  const [activeArticle, setActiveArticle] = useState<any | null>(null);

  return (
    <section id="news" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase">Health Advisories</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">ข่าวสารและสาระน่ารู้สุขภาพ</h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            ข้อมูลการให้บริการ วัคซีนตามฤดูกาล และเกร็ดความรู้ในการดูแลสุขภาพตนเอง
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {announcements.map((item) => (
          <article
            key={item.id}
            onClick={() => setActiveArticle(item)}
            className="group cursor-pointer bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
                <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <span className="font-mono tabular-nums">{item.date}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 group-hover:text-slate-900 font-medium">
              <span>อ่านรายละเอียด</span>
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </article>
        ))}
      </div>

      {/* Reading Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-4 leading-snug">
              {activeArticle.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-mono tabular-nums">
              ประกาศเมื่อวันที่ {activeArticle.date} · ศูนย์แพทย์สุรินทร์
            </p>

            <div className="mt-5 text-xs md:text-sm text-slate-700 leading-relaxed space-y-3">
              <p>{activeArticle.content || activeArticle.summary}</p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
