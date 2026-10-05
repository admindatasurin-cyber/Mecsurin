import React, { useState } from 'react';
import { FileText, Download, Search, CheckCircle, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

interface DownloadCenterProps {
  resources: any[];
}

export default function DownloadCenter({ resources }: DownloadCenterProps) {
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'เอกสารทั้งหมด' },
    { id: 'คู่มือนักศึกษา', label: 'คู่มือนักศึกษา' },
    { id: 'แบบฟอร์มคำร้อง', label: 'แบบฟอร์มคำร้อง' },
    { id: 'คู่มือการประเมิน', label: 'Logbook & การประเมิน' },
    { id: 'งานวิจัยนักศึกษา', label: 'งานวิจัย & IRB' }
  ];

  const filteredResources = resources.filter(res => {
    const matchCat = selectedCat === 'all' || res.category === selectedCat;
    const matchSearch = !searchQuery.trim() || 
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDownload = (title: string) => {
    setDownloadSuccessMessage(`เริ่มดาวน์โหลด: ${title}`);
    setTimeout(() => {
      setDownloadSuccessMessage(null);
    }, 3500);
  };

  return (
    <section id="resources" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase">Document Repository</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">คลังเอกสารและศูนย์ดาวน์โหลดแบบฟอร์ม</h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-xl">
            คู่มือนักศึกษาแพทย์, แบบฟอร์มคำร้องขอลา, เกณฑ์การบันทึก Logbook, และเอกสารขออนุมัติจริยธรรมการวิจัย
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาชื่อเอกสารหรือแบบฟอร์ม..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg overflow-x-auto mb-6 shrink-0 w-fit">
        {categories.map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedCat(tab.id)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap",
              selectedCat === tab.id
                ? "bg-white text-slate-900 shadow-2xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {downloadSuccessMessage && (
        <div className="mb-6 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle size={15} className="text-emerald-600 shrink-0" />
          <span>{downloadSuccessMessage} (ไฟล์ตัวอย่างสำหรับการศึกษา)</span>
        </div>
      )}

      {/* Resource Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {res.category}
                </span>
                <span className="font-mono text-slate-500 font-semibold">{res.file_type} · {res.file_size}</span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                {res.title}
              </h3>

              <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                {res.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-mono">ปรับปรุง: {res.update_date}</span>
              <button
                type="button"
                onClick={() => handleDownload(res.title)}
                className="py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-emerald-700 hover:text-white text-slate-700 font-semibold transition-colors flex items-center gap-1.5 text-xs"
              >
                <Download size={13} />
                <span>ดาวน์โหลด</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 text-slate-400 text-xs">
          ไม่พบเอกสารตามคำค้นหาที่ระบุ
        </div>
      )}
    </section>
  );
}
