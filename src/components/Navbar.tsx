import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, CalendarCheck, Shield } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenTracker: () => void;
}

export default function Navbar({ onOpenBooking, onOpenTracker }: NavbarProps) {
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
        ? "bg-white/95 backdrop-blur-md border-slate-200 shadow-xs" 
        : "bg-white border-slate-100"
    )}>
      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <Link 
          to="/" 
          className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
            SM
          </div>
          <span>ศูนย์แพทย์สุรินทร์</span>
        </Link>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-slate-600">
          <a href="#services" className="hover:text-emerald-700 transition-colors">
            บริการการแพทย์
          </a>
          <a href="#doctors" className="hover:text-emerald-700 transition-colors">
            ตารางแพทย์ออกตรวจ
          </a>
          <a href="#packages" className="hover:text-emerald-700 transition-colors">
            แพ็กเกจตรวจสุขภาพ
          </a>
          <button 
            type="button"
            onClick={onOpenTracker}
            className="hover:text-emerald-700 transition-colors text-left font-medium"
          >
            ตรวจสอบสถานะนัด
          </button>
          <a href="#news" className="hover:text-emerald-700 transition-colors">
            ข่าวสารสุขภาพ
          </a>
          <a href="#contact" className="hover:text-emerald-700 transition-colors">
            การเดินทางและติดต่อ
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/admin"
            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors flex items-center gap-1.5"
          >
            <Shield size={13} className="text-slate-500" />
            <span>ระบบเจ้าหน้าที่</span>
          </Link>
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs whitespace-nowrap"
          >
            <CalendarCheck size={14} />
            <span>จองนัดหมายตรวจ</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-6 py-4 space-y-3 shadow-lg">
          <a 
            href="#services" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 hover:text-emerald-700 py-1"
          >
            บริการการแพทย์
          </a>
          <a 
            href="#doctors" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 hover:text-emerald-700 py-1"
          >
            ตารางแพทย์ออกตรวจ
          </a>
          <a 
            href="#packages" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 hover:text-emerald-700 py-1"
          >
            แพ็กเกจตรวจสุขภาพ
          </a>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenTracker(); }}
            className="block text-sm font-medium text-slate-700 hover:text-emerald-700 py-1 text-left w-full"
          >
            ตรวจสอบสถานะนัดหมาย
          </button>
          <a 
            href="#news" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 hover:text-emerald-700 py-1"
          >
            ข่าวสารสุขภาพ
          </a>
          <a 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 hover:text-emerald-700 py-1"
          >
            ติดต่อเรา
          </a>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="w-full py-2.5 text-center text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg"
            >
              จองนัดหมายตรวจ
            </button>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 text-center text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg"
            >
              ระบบเจ้าหน้าที่ / แอดมิน
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
