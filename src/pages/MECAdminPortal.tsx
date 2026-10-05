import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Plus, 
  Trash2, 
  Edit2, 
  LogOut,
  LayoutDashboard,
  FileText,
  Bell,
  Search,
  KeyRound,
  BookOpen,
  GraduationCap,
  ArrowLeft,
  CheckCircle,
  Pin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function MECAdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'overview' | 'conferences' | 'rotations' | 'resources' | 'faculty' | 'announcements'>('overview');
  const [stats, setStats] = useState<any>({
    totalStudents: 96,
    facultyCount: 0,
    conferenceCount: 0,
    resourceCount: 0,
    nlPassRate: '98.4%'
  });

  const [conferences, setConferences] = useState<any[]>([]);
  const [rotations, setRotations] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [faculty, setFaculty] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  // Modals
  const [isConfModalOpen, setIsConfModalOpen] = useState(false);
  const [isRotModalOpen, setIsRotModalOpen] = useState(false);
  const [isResModalOpen, setIsResModalOpen] = useState(false);
  const [isFacModalOpen, setIsFacModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<any>(null);
  const [isAnnModalOpen, setIsAnnModalOpen] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('mec_admin_auth');
    if (token) {
      setIsAuthenticated(true);
      fetchDashboardData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem('mec_admin_auth', data.token);
        setIsAuthenticated(true);
        fetchDashboardData();
      } else {
        setAuthError(data.message || 'รหัสผ่านไม่ถูกต้อง');
      }
    } catch (err) {
      setAuthError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('mec_admin_auth');
    setIsAuthenticated(false);
  };

  const fetchDashboardData = () => {
    fetchStats();
    fetchConferences();
    fetchRotations();
    fetchResources();
    fetchFaculty();
    fetchAnnouncements();
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/mec/stats');
      const data = await res.json();
      setStats(data);
    } catch (e) {}
  };

  const fetchConferences = async () => {
    try {
      const res = await fetch('/api/conferences');
      const data = await res.json();
      setConferences(data);
    } catch (e) {}
  };

  const fetchRotations = async () => {
    try {
      const res = await fetch('/api/rotations');
      const data = await res.json();
      setRotations(data);
    } catch (e) {}
  };

  const fetchResources = async () => {
    try {
      const res = await fetch('/api/resources');
      const data = await res.json();
      setResources(data);
    } catch (e) {}
  };

  const fetchFaculty = async () => {
    try {
      const res = await fetch('/api/faculty');
      const data = await res.json();
      setFaculty(data);
    } catch (e) {}
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('/api/announcements');
      const data = await res.json();
      setAnnouncements(data);
    } catch (e) {}
  };

  // Submit Handlers
  const handleConfSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    await fetch('/api/conferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    setIsConfModalOpen(false);
    fetchConferences();
    fetchStats();
  };

  const deleteConf = async (id: number) => {
    if (confirm('ยืนยันการลบกิจกรรมวิชาการนี้?')) {
      await fetch(`/api/conferences/${id}`, { method: 'DELETE' });
      fetchConferences();
      fetchStats();
    }
  };

  const handleRotSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    await fetch('/api/rotations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    setIsRotModalOpen(false);
    fetchRotations();
    fetchStats();
  };

  const deleteRot = async (id: number) => {
    if (confirm('ยืนยันการลบตารางการศึกษานี้?')) {
      await fetch(`/api/rotations/${id}`, { method: 'DELETE' });
      fetchRotations();
    }
  };

  const handleResSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    await fetch('/api/resources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    setIsResModalOpen(false);
    fetchResources();
    fetchStats();
  };

  const deleteRes = async (id: number) => {
    if (confirm('ยืนยันการลบเอกสารนี้?')) {
      await fetch(`/api/resources/${id}`, { method: 'DELETE' });
      fetchResources();
      fetchStats();
    }
  };

  const handleFacSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const url = editingFaculty ? `/api/faculty/${editingFaculty.id}` : '/api/faculty';
    const method = editingFaculty ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    setIsFacModalOpen(false);
    setEditingFaculty(null);
    fetchFaculty();
    fetchStats();
  };

  const deleteFac = async (id: number) => {
    if (confirm('ยืนยันการลบข้อมูลอาจารย์แพทย์ท่านนี้?')) {
      await fetch(`/api/faculty/${id}`, { method: 'DELETE' });
      fetchFaculty();
      fetchStats();
    }
  };

  const handleAnnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    await fetch('/api/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    setIsAnnModalOpen(false);
    fetchAnnouncements();
  };

  const deleteAnn = async (id: number) => {
    if (confirm('ยืนยันการลบประกาศนี้?')) {
      await fetch(`/api/announcements/${id}`, { method: 'DELETE' });
      fetchAnnouncements();
    }
  };

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-100">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 font-bold text-sm">
              MEC
            </div>
            <h1 className="text-lg font-bold text-white">ระบบจัดการฝ่ายแพทยศาสตรศึกษา</h1>
            <p className="text-xs text-slate-400 mt-1">ศูนย์แพทยศาสตรศึกษาชั้นคลินิก โรงพยาบาลสุรินทร์ (CPIRD)</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                รหัสผ่านสำหรับอาจารย์และเจ้าหน้าที่
              </label>
              <input
                type="password"
                placeholder="ระบุรหัสผ่าน (เริ่มต้น: cpird หรือ admin1234)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                autoFocus
              />
              <p className="text-[11px] text-slate-400 mt-1">
                * รหัสผ่านจำลองสำหรับทดสอบ: <code className="text-emerald-400">cpird</code> หรือ <code className="text-emerald-400">admin1234</code>
              </p>
            </div>

            {authError && (
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-xs"
            >
              เข้าสู่ระบบบริหารจัดการการศึกษา
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <Link to="/" className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5">
              <ArrowLeft size={13} /> กลับไปยังหน้าหลักศูนย์แพทย์ฯ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 text-white p-5 flex flex-col shrink-0 border-r border-slate-800">
        <div className="flex items-center gap-2.5 px-3 py-2 mb-8">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center font-bold text-xs tracking-wider">
            MEC
          </div>
          <div>
            <span className="font-bold text-sm block leading-none">ศูนย์แพทย์สุรินทร์</span>
            <span className="text-[10px] text-emerald-400 font-mono">STAFF & FACULTY PORTAL</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 text-xs">
          <button 
            onClick={() => setActiveTab('overview')}
            className={cn(
              "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-left",
              activeTab === 'overview' ? "bg-emerald-600 text-white font-semibold" : "text-slate-400 hover:bg-slate-900 hover:text-white"
            )}
          >
            <LayoutDashboard size={16} />
            <span>ภาพรวมและสถิติ (Overview)</span>
          </button>
          <button 
            onClick={() => setActiveTab('conferences')}
            className={cn(
              "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-left",
              activeTab === 'conferences' ? "bg-emerald-600 text-white font-semibold" : "text-slate-400 hover:bg-slate-900 hover:text-white"
            )}
          >
            <Calendar size={16} />
            <span>กิจกรรมวิชาการ & Grand Round</span>
          </button>
          <button 
            onClick={() => setActiveTab('rotations')}
            className={cn(
              "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-left",
              activeTab === 'rotations' ? "bg-emerald-600 text-white font-semibold" : "text-slate-400 hover:bg-slate-900 hover:text-white"
            )}
          >
            <GraduationCap size={16} />
            <span>ตารางการศึกษา & วอร์ด (Rotations)</span>
          </button>
          <button 
            onClick={() => setActiveTab('resources')}
            className={cn(
              "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-left",
              activeTab === 'resources' ? "bg-emerald-600 text-white font-semibold" : "text-slate-400 hover:bg-slate-900 hover:text-white"
            )}
          >
            <FileText size={16} />
            <span>คลังเอกสาร & แบบฟอร์มคำร้อง</span>
          </button>
          <button 
            onClick={() => setActiveTab('faculty')}
            className={cn(
              "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-left",
              activeTab === 'faculty' ? "bg-emerald-600 text-white font-semibold" : "text-slate-400 hover:bg-slate-900 hover:text-white"
            )}
          >
            <Users size={16} />
            <span>ทำเนียบอาจารย์แพทย์</span>
          </button>
          <button 
            onClick={() => setActiveTab('announcements')}
            className={cn(
              "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-left",
              activeTab === 'announcements' ? "bg-emerald-600 text-white font-semibold" : "text-slate-400 hover:bg-slate-900 hover:text-white"
            )}
          >
            <Bell size={16} />
            <span>ประกาศทางวิชาการ</span>
          </button>
        </nav>

        <div className="pt-4 border-t border-slate-800 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>กลับสู่หน้าเว็บไซต์หลัก</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:text-rose-300 rounded-lg hover:bg-slate-900 transition-colors text-left"
          >
            <LogOut size={14} />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              {activeTab === 'overview' && 'ภาพรวมการบริหารการศึกษาแพทยศาสตร์'}
              {activeTab === 'conferences' && 'จัดการตารางกิจกรรมวิชาการและการบรรยายพิเศษ'}
              {activeTab === 'rotations' && 'จัดการตารางการศึกษาและแผนการฝึกปฏิบัติงานวอร์ด'}
              {activeTab === 'resources' && 'จัดการคลังเอกสาร คู่มือนักศึกษา และแบบฟอร์ม'}
              {activeTab === 'faculty' && 'จัดการข้อมูลทำเนียบอาจารย์แพทย์'}
              {activeTab === 'announcements' && 'จัดการข่าวสารและประกาศทางวิชาการ'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              ศูนย์แพทยศาสตรศึกษาชั้นคลินิก โรงพยาบาลสุรินทร์ (CPIRD)
            </p>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'conferences' && (
              <button
                onClick={() => setIsConfModalOpen(true)}
                className="bg-emerald-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-emerald-800 transition-colors shadow-xs"
              >
                <Plus size={14} />
                เพิ่มกิจกรรมวิชาการ
              </button>
            )}
            {activeTab === 'rotations' && (
              <button
                onClick={() => setIsRotModalOpen(true)}
                className="bg-emerald-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-emerald-800 transition-colors shadow-xs"
              >
                <Plus size={14} />
                เพิ่มตารางวอร์ด
              </button>
            )}
            {activeTab === 'resources' && (
              <button
                onClick={() => setIsResModalOpen(true)}
                className="bg-emerald-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-emerald-800 transition-colors shadow-xs"
              >
                <Plus size={14} />
                เพิ่มเอกสารดาวน์โหลด
              </button>
            )}
            {activeTab === 'faculty' && (
              <button
                onClick={() => { setEditingFaculty(null); setIsFacModalOpen(true); }}
                className="bg-emerald-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-emerald-800 transition-colors shadow-xs"
              >
                <Plus size={14} />
                เพิ่มข้อมูลอาจารย์แพทย์
              </button>
            )}
            {activeTab === 'announcements' && (
              <button
                onClick={() => setIsAnnModalOpen(true)}
                className="bg-emerald-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-emerald-800 transition-colors shadow-xs"
              >
                <Plus size={14} />
                เขียนประกาศวิชาการ
              </button>
            )}
          </div>
        </header>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">นักศึกษาแพทย์ปัจจุบัน</span>
                <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
                  {stats.totalStudents} <span className="text-xs font-normal text-slate-400">คน</span>
                </p>
                <span className="text-[11px] text-slate-400 mt-1 block">นศพ.ชั้นปีที่ 4, 5, 6 (CPIRD)</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-emerald-200 bg-emerald-50/20">
                <span className="text-xs text-emerald-800 font-medium">อัตราผ่าน National License</span>
                <p className="text-2xl font-bold text-emerald-700 font-mono tabular-nums mt-1">
                  {stats.nlPassRate}
                </p>
                <span className="text-[11px] text-emerald-600 mt-1 block">เกณฑ์มาตรฐานแพทยสภา</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">อาจารย์แพทย์และบุคลากร</span>
                <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
                  {stats.facultyCount} <span className="text-xs font-normal text-slate-400">ท่าน</span>
                </p>
                <span className="text-[11px] text-slate-400 mt-1 block">ผู้ทรงคุณวุฒิทุกภาควิชา</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">เอกสารและแบบฟอร์ม</span>
                <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
                  {stats.resourceCount} <span className="text-xs font-normal text-slate-400">ไฟล์</span>
                </p>
                <span className="text-[11px] text-slate-400 mt-1 block">คู่มือและแบบฟอร์มคำร้อง</span>
              </div>
            </div>

            {/* Upcoming Academic Conferences Summary */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900">กิจกรรมวิชาการและการบรรยายที่จะมาถึงเร็วๆ นี้</h3>
                <button
                  onClick={() => setActiveTab('conferences')}
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  ดูทั้งหมด →
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {conferences.slice(0, 4).map(conf => (
                  <div key={conf.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-0.5">
                        <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.2 rounded text-[10px]">
                          {conf.type}
                        </span>
                        <span className="font-mono tabular-nums">{conf.date} ({conf.time} น.)</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800">{conf.title}</h4>
                      <p className="text-[11px] text-slate-500">{conf.speaker} · {conf.venue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Conferences */}
        {activeTab === 'conferences' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <tr>
                    <th className="py-3 px-4 font-semibold">ประเภท / ภาควิชา</th>
                    <th className="py-3 px-4 font-semibold">หัวข้อกิจกรรมวิชาการ</th>
                    <th className="py-3 px-4 font-semibold">วันเวลา</th>
                    <th className="py-3 px-4 font-semibold">วิทยากร / สถานที่</th>
                    <th className="py-3 px-4 font-semibold text-right">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {conferences.map(conf => (
                    <tr key={conf.id} className="hover:bg-slate-50/60">
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px] block w-fit">
                          {conf.type}
                        </span>
                        <span className="text-[11px] text-slate-500 mt-1 block">ภาควิชา{conf.department}</span>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900 max-w-md">
                        <p className="font-bold">{conf.title}</p>
                        {conf.description && <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{conf.description}</p>}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-700 whitespace-nowrap">
                        <p className="font-medium">{conf.date}</p>
                        <p className="text-[11px] text-slate-400">{conf.time} น.</p>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        <p className="font-medium text-slate-800">{conf.speaker}</p>
                        <p className="text-[11px] text-slate-400">{conf.venue}</p>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => deleteConf(conf.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                          title="ลบกิจกรรม"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Rotations */}
        {activeTab === 'rotations' && (
          <div className="grid md:grid-cols-2 gap-4">
            {rotations.map(rot => (
              <div key={rot.id} className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {rot.student_year}
                    </span>
                    <span className="font-mono">{rot.batch_name}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{rot.department}</h4>
                  <div className="mt-2 py-2 border-t border-b border-slate-100 text-xs text-slate-600 space-y-1">
                    <p><strong>ระยะเวลา:</strong> {rot.duration} ({rot.start_date} ถึง {rot.end_date})</p>
                    <p><strong>อาจารย์ผู้รับผิดชอบ:</strong> {rot.course_director}</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">{rot.objectives}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 mt-3 flex justify-end">
                  <button
                    onClick={() => deleteRot(rot.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded text-xs flex items-center gap-1"
                  >
                    <Trash2 size={13} /> ลบตาราง
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Educational Resources */}
        {activeTab === 'resources' && (
          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
            {resources.map(res => (
              <div key={res.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {res.category}
                    </span>
                    <span className="font-mono">{res.file_type} · {res.file_size}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{res.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{res.description}</p>
                </div>
                <button
                  onClick={() => deleteRes(res.id)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded shrink-0"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Faculty */}
        {activeTab === 'faculty' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {faculty.map(f => (
              <div key={f.id} className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start gap-3">
                    <img src={f.image} alt={f.name} className="w-14 h-14 rounded-lg object-cover bg-slate-100 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{f.name}</h4>
                      <p className="text-[11px] text-emerald-800 font-semibold mt-0.5">{f.role}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{f.specialty}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                    <p><strong>ภาควิชา:</strong> {f.department}</p>
                    <p><strong>อีเมล:</strong> {f.email}</p>
                    <p className="line-clamp-2 mt-1">{f.education}</p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => { setEditingFaculty(f); setIsFacModalOpen(true); }}
                    className="flex-1 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-center gap-1"
                  >
                    <Edit2 size={12} /> แก้ไข
                  </button>
                  <button
                    onClick={() => deleteFac(f.id)}
                    className="py-1.5 px-3 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg flex items-center justify-center gap-1"
                  >
                    <Trash2 size={12} /> ลบ
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 6: Announcements */}
        {activeTab === 'announcements' && (
          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
              {announcements.map(ann => (
                <div key={ann.id} className="p-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {ann.category}
                      </span>
                      <span className="font-mono">{ann.date}</span>
                      {ann.is_pinned ? <span className="text-emerald-700 font-bold">★ ปักหมุด</span> : null}
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">{ann.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-2xl">{ann.summary}</p>
                  </div>
                  <button
                    onClick={() => deleteAnn(ann.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded shrink-0"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Conference Create Modal */}
      {isConfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-slate-200">
            <h2 className="text-base font-bold mb-4 text-slate-900">เพิ่มกิจกรรมวิชาการ / Grand Round</h2>
            <form onSubmit={handleConfSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">หัวข้อกิจกรรมวิชาการ</label>
                <input name="title" required placeholder="เช่น Grand Round: Approach to Sepsis" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">ประเภทกิจกรรม</label>
                  <select name="type" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600">
                    <option value="Grand Round">Grand Round</option>
                    <option value="Morning Conference">Morning Conference</option>
                    <option value="Journal Club">Journal Club</option>
                    <option value="Interhospital Conference">Interhospital Conference</option>
                    <option value="บรรยายพิเศษ">บรรยายพิเศษ</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">ภาควิชา</label>
                  <input name="department" required placeholder="เช่น อายุรศาสตร์" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">วันที่จัดกิจกรรม</label>
                  <input name="date" type="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">เวลา (เช่น 08:00 - 09:00)</label>
                  <input name="time" required placeholder="08:00 - 09:00" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">วิทยากร / อาจารย์แพทย์ผู้นำเสนอ</label>
                <input name="speaker" required placeholder="เช่น ผศ.พิเศษ นพ. ..." className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
              </div>
              <div>
                <label className="block font-semibold mb-1">สถานที่จัด (ห้องบรรยาย/ห้องประชุม)</label>
                <input name="venue" required defaultValue="ห้องประชุมมงคลนพรัตน์ ชั้น 4 ศูนย์แพทย์ฯ" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
              </div>
              <div>
                <label className="block font-semibold mb-1">คำอธิบายและวัตถุประสงค์สั้น</label>
                <textarea name="description" rows={3} placeholder="ระบุรายละเอียดเพื่อให้นักศึกษาเตรียมเคสมาล่วงหน้า..." className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600 resize-none" />
              </div>
              <div className="flex gap-2 pt-3">
                <button type="button" onClick={() => setIsConfModalOpen(false)} className="flex-1 py-2 rounded-lg font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200">ยกเลิก</button>
                <button type="submit" className="flex-1 py-2 rounded-lg font-semibold bg-emerald-700 text-white hover:bg-emerald-800">บันทึกกิจกรรม</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rotation Modal */}
      {isRotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-slate-200">
            <h2 className="text-base font-bold mb-4 text-slate-900">เพิ่มตารางการฝึกปฏิบัติงานวอร์ด (Rotation)</h2>
            <form onSubmit={handleRotSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">ระดับชั้นปี</label>
                  <select name="student_year" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600">
                    <option value="ชั้นปีที่ 4">ชั้นปีที่ 4</option>
                    <option value="ชั้นปีที่ 5">ชั้นปีที่ 5</option>
                    <option value="ชั้นปีที่ 6 (Extern)">ชั้นปีที่ 6 (Extern)</option>
                    <option value="แพทย์เพิ่มพูนทักษะ (Intern)">แพทย์เพิ่มพูนทักษะ (Intern)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">ชื่อรุ่น (เช่น นศพ.รุ่นที่ 18)</label>
                  <input name="batch_name" required defaultValue="นศพ.รุ่นที่ 18 (CPIRD)" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">ภาควิชา / วอร์ด</label>
                  <input name="department" required placeholder="เช่น อายุรศาสตร์" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">ระยะเวลา (เช่น 4 สัปดาห์)</label>
                  <input name="duration" required defaultValue="4 สัปดาห์" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">วันที่เริ่มต้น</label>
                  <input name="start_date" type="date" required className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">วันที่สิ้นสุด</label>
                  <input name="end_date" type="date" required className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">อาจารย์ผู้รับผิดชอบรายวิชา</label>
                <input name="course_director" required placeholder="ชื่ออาจารย์แพทย์..." className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
              </div>
              <div>
                <label className="block font-semibold mb-1">วัตถุประสงค์และสมรรถนะการเรียนรู้</label>
                <textarea name="objectives" rows={3} required placeholder="ทักษะหัตถการและภาระงานที่ต้องปฏิบัติ..." className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600 resize-none" />
              </div>
              <div className="flex gap-2 pt-3">
                <button type="button" onClick={() => setIsRotModalOpen(false)} className="flex-1 py-2 rounded-lg font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200">ยกเลิก</button>
                <button type="submit" className="flex-1 py-2 rounded-lg font-semibold bg-emerald-700 text-white hover:bg-emerald-800">บันทึกตาราง</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Resource Modal */}
      {isResModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-slate-200">
            <h2 className="text-base font-bold mb-4 text-slate-900">เพิ่มเอกสารดาวน์โหลด / แบบฟอร์ม</h2>
            <form onSubmit={handleResSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">ชื่อเอกสาร / แบบฟอร์ม</label>
                <input name="title" required placeholder="เช่น แบบฟอร์มขอลาการฝึกปฏิบัติงาน" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">หมวดหมู่</label>
                  <select name="category" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600">
                    <option value="คู่มือนักศึกษา">คู่มือนักศึกษา</option>
                    <option value="แบบฟอร์มคำร้อง">แบบฟอร์มคำร้อง</option>
                    <option value="คู่มือการประเมิน">Logbook & การประเมิน</option>
                    <option value="งานวิจัยนักศึกษา">งานวิจัยนักศึกษา</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">ชนิดไฟล์</label>
                  <input name="file_type" defaultValue="PDF" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">ขนาดไฟล์</label>
                  <input name="file_size" defaultValue="1.5 MB" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">คำอธิบายเอกสาร</label>
                <textarea name="description" rows={2} required placeholder="สรุปเนื้อหาและผู้มีสิทธิยื่น..." className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600 resize-none" />
              </div>
              <div className="flex gap-2 pt-3">
                <button type="button" onClick={() => setIsResModalOpen(false)} className="flex-1 py-2 rounded-lg font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200">ยกเลิก</button>
                <button type="submit" className="flex-1 py-2 rounded-lg font-semibold bg-emerald-700 text-white hover:bg-emerald-800">บันทึกเอกสาร</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Faculty Modal */}
      {isFacModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-slate-200">
            <h2 className="text-base font-bold mb-4 text-slate-900">
              {editingFaculty ? 'แก้ไขข้อมูลอาจารย์แพทย์' : 'เพิ่มข้อมูลอาจารย์แพทย์ใหม่'}
            </h2>
            <form onSubmit={handleFacSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">คำนำหน้าทางวิชาการ</label>
                  <input name="academic_title" defaultValue={editingFaculty?.academic_title || 'ผู้ช่วยศาสตราจารย์พิเศษ นายแพทย์'} required className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">ชื่อ - นามสกุล</label>
                  <input name="name" defaultValue={editingFaculty?.name} required className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">ตำแหน่งในการบริหาร / การสอน</label>
                <input name="role" defaultValue={editingFaculty?.role} placeholder="เช่น หัวหน้าภาควิชาอายุรศาสตร์" required className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">ภาควิชา</label>
                  <input name="department" defaultValue={editingFaculty?.department || 'อายุรศาสตร์'} required className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">สาขาความเชี่ยวชาญ</label>
                  <input name="specialty" defaultValue={editingFaculty?.specialty} placeholder="เช่น โรคหัวใจและหลอดเลือด" required className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">อีเมลติดต่อ</label>
                  <input name="email" type="email" defaultValue={editingFaculty?.email || 'faculty@cpird.in.th'} required className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">URL รูปภาพอาจารย์</label>
                  <input name="image" defaultValue={editingFaculty?.image || '/src/assets/images/doctor_portrait_male_1791176624773.jpg'} required className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">ประวัติการศึกษาและคุณวุฒิ</label>
                <textarea name="education" defaultValue={editingFaculty?.education} rows={2} required className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600 resize-none" />
              </div>
              <div className="flex gap-2 pt-3">
                <button type="button" onClick={() => setIsFacModalOpen(false)} className="flex-1 py-2 rounded-lg font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200">ยกเลิก</button>
                <button type="submit" className="flex-1 py-2 rounded-lg font-semibold bg-emerald-700 text-white hover:bg-emerald-800">บันทึกข้อมูลอาจารย์</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Announcement Modal */}
      {isAnnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-slate-200">
            <h2 className="text-base font-bold mb-4 text-slate-900">ประกาศข่าวสารทางวิชาการ</h2>
            <form onSubmit={handleAnnSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">หัวข้อประกาศ</label>
                <input name="title" required placeholder="เช่น กำหนดการสอบ Mock OSCE 2569" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" />
              </div>
              <div>
                <label className="block font-semibold mb-1">หมวดหมู่</label>
                <select name="category" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600">
                  <option value="การสอบวิชาชีพ (NL)">การสอบวิชาชีพ (NL)</option>
                  <option value="ทุนวิจัยและวิชาการ">ทุนวิจัยและวิชาการ</option>
                  <option value="สิ่งสนับสนุนการเรียนรู้">สิ่งสนับสนุนการเรียนรู้</option>
                  <option value="กิจกรรมนักศึกษา">กิจกรรมนักศึกษา</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">บทคัดย่อสั้น</label>
                <textarea name="summary" required rows={2} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600 resize-none" />
              </div>
              <div>
                <label className="block font-semibold mb-1">เนื้อหาฉบับเต็ม</label>
                <textarea name="content" required rows={4} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600 resize-none" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" name="is_pinned" id="is_pinned" value="1" className="rounded text-emerald-600" />
                <label htmlFor="is_pinned" className="font-semibold text-slate-700">ปักหมุดเป็นประกาศสำคัญ</label>
              </div>
              <div className="flex gap-2 pt-3">
                <button type="button" onClick={() => setIsAnnModalOpen(false)} className="flex-1 py-2 rounded-lg font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200">ยกเลิก</button>
                <button type="submit" className="flex-1 py-2 rounded-lg font-semibold bg-emerald-700 text-white hover:bg-emerald-800">เผยแพร่ประกาศ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
