import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, BookOpen, GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';

export default function MECNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdmin) return null;

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full transition-all duration-200 border-b",
      isScrolled 
        ? "bg-slate-900/95 backdrop-blur-md border-slate-800 text-white shadow-sm" 
        : "bg-slate-950 border-slate-900 text-white"
    )}>
      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <Link 
          to="/" 
          className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2.5 hover:opacity-95 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs tracking-wider">
            MEC
          </div>
          <div className="flex flex-col">
            <span className="leading-tight text-sm sm:text-base font-bold text-white">ศูนย์แพทยศาสตรศึกษาชั้นคลินิก</span>
            <span className="text-[10px] text-emerald-400 font-mono tracking-wider font-semibold">โรงพยาบาลสุรินทร์ (CPIRD)</span>
          </div>
        </Link>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-300">
          <a href="#about" className="hover:text-emerald-400 transition-colors">
            เกี่ยวกับศูนย์แพทย์ฯ
          </a>
          <a href="#conferences" className="hover:text-emerald-400 transition-colors">
            กิจกรรมวิชาการ & Grand Round
          </a>
          <a href="#rotations" className="hover:text-emerald-400 transition-colors">
            ตารางการศึกษา & วอร์ด
          </a>
          <a href="#facilities" className="hover:text-emerald-400 transition-colors">
            Simulation Lab & ห้องสมุด
          </a>
          <a href="#resources" className="hover:text-emerald-400 transition-colors">
            คลังเอกสาร & แบบฟอร์ม
          </a>
          <a href="#faculty" className="hover:text-emerald-400 transition-colors">
            ทำเนียบอาจารย์แพทย์
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#resources"
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-md hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <BookOpen size={13} className="text-emerald-400" />
            <span>ดาวน์โหลดเอกสาร</span>
          </a>
          <Link
            to="/admin"
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs whitespace-nowrap"
          >
            <Shield size={13} />
            <span>ระบบเจ้าหน้าที่ฝ่ายการศึกษา</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900 px-6 py-4 space-y-3 shadow-xl text-slate-200">
          <a 
            href="#about" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium hover:text-emerald-400 py-1"
          >
            เกี่ยวกับศูนย์แพทย์ฯ
          </a>
          <a 
            href="#conferences" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium hover:text-emerald-400 py-1"
          >
            กิจกรรมวิชาการ & Grand Round
          </a>
          <a 
            href="#rotations" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium hover:text-emerald-400 py-1"
          >
            ตารางการศึกษา & วอร์ด
          </a>
          <a 
            href="#facilities" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium hover:text-emerald-400 py-1"
          >
            Simulation Lab & ห้องสมุด
          </a>
          <a 
            href="#resources" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium hover:text-emerald-400 py-1"
          >
            คลังเอกสาร & แบบฟอร์ม
          </a>
          <a 
            href="#faculty" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium hover:text-emerald-400 py-1"
          >
            ทำเนียบอาจารย์แพทย์
          </a>
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg flex items-center justify-center gap-1.5"
            >
              <Shield size={14} />
              <span>ระบบเจ้าหน้าที่ฝ่ายการศึกษา</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
