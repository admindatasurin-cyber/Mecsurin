import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Plus, 
  Trash2, 
  Edit2, 
  CheckCircle, 
  XCircle, 
  LogOut,
  LayoutDashboard,
  Package,
  Bell,
  Search,
  Printer,
  KeyRound,
  Eye,
  AlertCircle,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'doctors' | 'packages' | 'announcements'>('overview');
  const [stats, setStats] = useState<any>({
    totalAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    totalDoctors: 0,
    totalPackages: 0
  });

  const [appointments, setAppointments] = useState<any[]>([]);
  const [appointmentFilter, setAppointmentFilter] = useState('all');
  const [appointmentSearch, setAppointmentSearch] = useState('');

  const [doctors, setDoctors] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  // Modals
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<any>(null);

  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);

  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [viewingAppointmentSlip, setViewingAppointmentSlip] = useState<any | null>(null);

  // Check login session on mount
  useEffect(() => {
    const token = sessionStorage.getItem('smc_admin_auth');
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
        sessionStorage.setItem('smc_admin_auth', data.token);
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
    sessionStorage.removeItem('smc_admin_auth');
    setIsAuthenticated(false);
  };

  const fetchDashboardData = () => {
    fetchStats();
    fetchAppointments();
    fetchDoctors();
    fetchPackages();
    fetchAnnouncements();
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (e) {}
  };

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments');
      const data = await res.json();
      setAppointments(data);
    } catch (e) {}
  };

  const fetchDoctors = async () => {
    try {
      const res = await fetch('/api/doctors');
      const data = await res.json();
      setDoctors(data);
    } catch (e) {}
  };

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/packages');
      const data = await res.json();
      setPackages(data);
    } catch (e) {}
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('/api/announcements');
      const data = await res.json();
      setAnnouncements(data);
    } catch (e) {}
  };

  const updateAppointmentStatus = async (id: number, status: string) => {
    await fetch(`/api/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchAppointments();
    fetchStats();
  };

  const updateAdminNotes = async (id: number, notes: string) => {
    await fetch(`/api/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admin_notes: notes })
    });
    fetchAppointments();
  };

  const deleteAppointment = async (id: number) => {
    if (confirm('ยืนยันการลบประวัตินัดหมายนี้ออกจากระบบ?')) {
      await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      fetchAppointments();
      fetchStats();
    }
  };

  const handleDoctorSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const url = editingDoctor ? `/api/doctors/${editingDoctor.id}` : '/api/doctors';
    const method = editingDoctor ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    setIsDoctorModalOpen(false);
    setEditingDoctor(null);
    fetchDoctors();
    fetchStats();
  };

  const deleteDoctor = async (id: number) => {
    if (confirm('ยืนยันการลบรายชื่อแพทย์นี้?')) {
      await fetch(`/api/doctors/${id}`, { method: 'DELETE' });
      fetchDoctors();
      fetchStats();
    }
  };

  const handlePackageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const itemsRaw = formData.get('items')?.toString() || '';
    const items = itemsRaw.split('\n').map(s => s.trim()).filter(Boolean);

    const payload = {
      name: formData.get('name'),
      price: Number(formData.get('price')),
      original_price: Number(formData.get('original_price')),
      category: formData.get('category'),
      target_group: formData.get('target_group'),
      items,
      is_popular: formData.get('is_popular') ? 1 : 0
    };

    const url = editingPackage ? `/api/packages/${editingPackage.id}` : '/api/packages';
    const method = editingPackage ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setIsPackageModalOpen(false);
    setEditingPackage(null);
    fetchPackages();
    fetchStats();
  };

  const deletePackage = async (id: number) => {
    if (confirm('ยืนยันการลบแพ็กเกจนี้?')) {
      await fetch(`/api/packages/${id}`, { method: 'DELETE' });
      fetchPackages();
      fetchStats();
    }
  };

  const handleAnnouncementSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    await fetch('/api/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    setIsAnnouncementModalOpen(false);
    fetchAnnouncements();
  };

  const deleteAnnouncement = async (id: number) => {
    if (confirm('ยืนยันการลบประกาศนี้?')) {
      await fetch(`/api/announcements/${id}`, { method: 'DELETE' });
      fetchAnnouncements();
    }
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter(app => {
    const matchStatus = appointmentFilter === 'all' || app.status === appointmentFilter;
    const matchSearch = !appointmentSearch.trim() || 
      app.name.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      app.phone.includes(appointmentSearch) ||
      (app.code && app.code.toLowerCase().includes(appointmentSearch.toLowerCase()));
    return matchStatus && matchSearch;
  });

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-slate-100">
        <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3">
              <KeyRound size={24} />
            </div>
            <h1 className="text-xl font-bold text-white">ระบบจัดการเจ้าหน้าที่</h1>
            <p className="text-xs text-slate-400 mt-1">ศูนย์แพทย์สุรินทร์ (Surin Medical Center)</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                รหัสผ่านเข้าใช้งานระบบ
              </label>
              <input
                type="password"
                placeholder="ระบุรหัสผ่าน (เริ่มต้น: admin1234)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                autoFocus
              />
              <p className="text-[11px] text-slate-400 mt-1">
                * ค่าเริ่มต้นสำหรับการจำลองระบบ: <code className="text-emerald-400">admin1234</code>
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
              เข้าสู่ระบบบริหารจัดการ
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700 text-center">
            <Link to="/" className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5">
              <ArrowLeft size={13} /> กลับไปยังหน้าหลักสำหรับประชาชน
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-5 flex flex-col shrink-0 border-r border-slate-800">
        <div className="flex items-center gap-2.5 px-3 py-2 mb-8">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center font-bold text-xs">
            SM
          </div>
          <div>
            <span className="font-bold text-sm block leading-none">ศูนย์แพทย์สุรินทร์</span>
            <span className="text-[10px] text-emerald-400 font-mono">STAFF PORTAL</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 text-xs">
          <button 
            onClick={() => setActiveTab('overview')}
            className={cn(
              "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-left",
              activeTab === 'overview' ? "bg-emerald-600 text-white font-semibold" : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <LayoutDashboard size={16} />
            <span>ภาพรวมระบบ (Overview)</span>
          </button>
          <button 
            onClick={() => setActiveTab('appointments')}
            className={cn(
              "w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-all text-left",
              activeTab === 'appointments' ? "bg-emerald-600 text-white font-semibold" : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <div className="flex items-center gap-3">
              <Calendar size={16} />
              <span>รายการนัดหมาย</span>
            </div>
            {stats.pendingAppointments > 0 && (
              <span className="bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded text-[10px]">
                {stats.pendingAppointments}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('doctors')}
            className={cn(
              "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-left",
              activeTab === 'doctors' ? "bg-emerald-600 text-white font-semibold" : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <Users size={16} />
            <span>จัดการทีมแพทย์</span>
          </button>
          <button 
            onClick={() => setActiveTab('packages')}
            className={cn(
              "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-left",
              activeTab === 'packages' ? "bg-emerald-600 text-white font-semibold" : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <Package size={16} />
            <span>แพ็กเกจตรวจสุขภาพ</span>
          </button>
          <button 
            onClick={() => setActiveTab('announcements')}
            className={cn(
              "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-left",
              activeTab === 'announcements' ? "bg-emerald-600 text-white font-semibold" : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <Bell size={16} />
            <span>ข่าวสารและประกาศ</span>
          </button>
        </nav>

        <div className="pt-4 border-t border-slate-800 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>กลับหน้าเว็บไซต์หลัก</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:text-rose-300 rounded-lg hover:bg-slate-800 transition-colors text-left"
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
              {activeTab === 'overview' && 'ภาพรวมศูนย์บริการและสถิติ'}
              {activeTab === 'appointments' && 'ระบบจัดการนัดหมายคนไข้'}
              {activeTab === 'doctors' && 'จัดการรายชื่อแพทย์และตารางออกตรวจ'}
              {activeTab === 'packages' && 'จัดการแพ็กเกจตรวจสุขภาพ'}
              {activeTab === 'announcements' && 'จัดการข่าวสารและประกาศศูนย์'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              ศูนย์แพทย์สุรินทร์ · ฐานข้อมูลและระบบสารสนเทศ
            </p>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'doctors' && (
              <button 
                onClick={() => { setEditingDoctor(null); setIsDoctorModalOpen(true); }}
                className="bg-emerald-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-emerald-800 transition-colors shadow-xs"
              >
                <Plus size={14} />
                เพิ่มข้อมูลแพทย์
              </button>
            )}
            {activeTab === 'packages' && (
              <button 
                onClick={() => { setEditingPackage(null); setIsPackageModalOpen(true); }}
                className="bg-emerald-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-emerald-800 transition-colors shadow-xs"
              >
                <Plus size={14} />
                สร้างแพ็กเกจใหม่
              </button>
            )}
            {activeTab === 'announcements' && (
              <button 
                onClick={() => setIsAnnouncementModalOpen(true)}
                className="bg-emerald-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-emerald-800 transition-colors shadow-xs"
              >
                <Plus size={14} />
                เขียนข่าวประกาศ
              </button>
            )}
          </div>
        </header>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500">นัดหมายทั้งหมด</span>
                <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
                  {stats.totalAppointments}
                </p>
                <span className="text-[11px] text-slate-400 mt-1 block">รายการที่บันทึกในระบบ</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-amber-200 bg-amber-50/20">
                <span className="text-xs text-amber-800 font-medium">รอดำเนินการยืนยัน</span>
                <p className="text-2xl font-bold text-amber-700 font-mono tabular-nums mt-1">
                  {stats.pendingAppointments}
                </p>
                <span className="text-[11px] text-amber-600 mt-1 block">ต้องการการติดต่อกลับ</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-emerald-200 bg-emerald-50/20">
                <span className="text-xs text-emerald-800 font-medium">ยืนยันคิวแล้ว</span>
                <p className="text-2xl font-bold text-emerald-700 font-mono tabular-nums mt-1">
                  {stats.confirmedAppointments}
                </p>
                <span className="text-[11px] text-emerald-600 mt-1 block">พร้อมเข้ารับการตรวจ</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500">แพทย์ประจำศูนย์</span>
                <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
                  {stats.totalDoctors}
                </p>
                <span className="text-[11px] text-slate-400 mt-1 block">แพทย์เฉพาะทางทุกสาขา</span>
              </div>
            </div>

            {/* Recent Pending Table */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900">รายการนัดหมายล่าสุดที่ต้องตรวจสอบ</h3>
                <button
                  onClick={() => { setActiveTab('appointments'); setAppointmentFilter('pending'); }}
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  ดูทั้งหมด →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-500">
                    <tr>
                      <th className="py-2.5 px-3 font-semibold">รหัส</th>
                      <th className="py-2.5 px-3 font-semibold">ผู้รับบริการ</th>
                      <th className="py-2.5 px-3 font-semibold">แผนก / แพทย์</th>
                      <th className="py-2.5 px-3 font-semibold">วันเวลานัด</th>
                      <th className="py-2.5 px-3 font-semibold">สถานะ</th>
                      <th className="py-2.5 px-3 font-semibold text-right">ดำเนินการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {appointments.slice(0, 5).map(app => (
                      <tr key={app.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-3 font-mono font-medium text-emerald-800">{app.code || `SMC-${app.id}`}</td>
                        <td className="py-3 px-3">
                          <p className="font-semibold text-slate-800">{app.name}</p>
                          <p className="text-slate-400 font-mono">{app.phone}</p>
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          <p className="font-medium text-slate-800">{app.service}</p>
                          <p className="text-slate-400">{app.doctor_name || 'แพทย์เวร'}</p>
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-700">{app.date} ({app.time_slot})</td>
                        <td className="py-3 px-3">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-semibold",
                            app.status === 'confirmed' ? "bg-emerald-100 text-emerald-800" :
                            app.status === 'cancelled' ? "bg-rose-100 text-rose-800" :
                            app.status === 'completed' ? "bg-blue-100 text-blue-800" :
                            "bg-amber-100 text-amber-800"
                          )}>
                            {app.status === 'confirmed' ? 'ยืนยันแล้ว' :
                             app.status === 'cancelled' ? 'ยกเลิก' :
                             app.status === 'completed' ? 'ตรวจเสร็จ' : 'รอดำเนินการ'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => updateAppointmentStatus(app.id, 'confirmed')}
                            className="px-2.5 py-1 text-[11px] font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded mr-1.5"
                          >
                            ยืนยัน
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Appointments */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="ค้นหาชื่อ, เบอร์โทร, รหัสนัดหมาย..."
                  value={appointmentSearch}
                  onChange={(e) => setAppointmentSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg w-full md:w-auto overflow-x-auto">
                {[
                  { id: 'all', label: 'ทั้งหมด' },
                  { id: 'pending', label: 'รอดำเนินการ' },
                  { id: 'confirmed', label: 'ยืนยันแล้ว' },
                  { id: 'completed', label: 'ตรวจเสร็จสิ้น' },
                  { id: 'cancelled', label: 'ยกเลิก' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setAppointmentFilter(tab.id)}
                    className={cn(
                      "px-3 py-1 text-xs rounded-md transition-colors whitespace-nowrap",
                      appointmentFilter === tab.id ? "bg-white font-semibold text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    <tr>
                      <th className="py-3 px-4 font-semibold">รหัสนัด</th>
                      <th className="py-3 px-4 font-semibold">ข้อมูลคนไข้</th>
                      <th className="py-3 px-4 font-semibold">บริการ / คลินิก</th>
                      <th className="py-3 px-4 font-semibold">วันเวลานัด</th>
                      <th className="py-3 px-4 font-semibold">สถานะ</th>
                      <th className="py-3 px-4 font-semibold">บันทึกเจ้าหน้าที่</th>
                      <th className="py-3 px-4 font-semibold text-right">การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          ไม่พบรายการนัดหมายตามเงื่อนไขที่เลือก
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map(app => (
                        <tr key={app.id} className="hover:bg-slate-50/60">
                          <td className="py-3 px-4 font-mono font-semibold text-emerald-800">
                            {app.code || `SMC-${app.id}`}
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-semibold text-slate-900">{app.name}</p>
                            <p className="text-slate-500 font-mono">{app.phone} {app.hn ? `· HN: ${app.hn}` : ''}</p>
                            {app.message && (
                              <p className="text-[11px] text-slate-400 mt-0.5 italic line-clamp-1">
                                "{app.message}"
                              </p>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-slate-800">{app.service}</p>
                            <p className="text-slate-500">{app.doctor_name || 'แพทย์เวรประจำวัน'}</p>
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-700 whitespace-nowrap">
                            <p className="font-medium">{app.date}</p>
                            <p className="text-slate-500 text-[11px]">{app.time_slot}</p>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className={cn(
                              "px-2.5 py-1 rounded-md text-[11px] font-semibold inline-block",
                              app.status === 'confirmed' ? "bg-emerald-100 text-emerald-800" :
                              app.status === 'cancelled' ? "bg-rose-100 text-rose-800" :
                              app.status === 'completed' ? "bg-blue-100 text-blue-800" :
                              "bg-amber-100 text-amber-800"
                            )}>
                              {app.status === 'confirmed' ? 'ยืนยันแล้ว' :
                               app.status === 'cancelled' ? 'ยกเลิก' :
                               app.status === 'completed' ? 'ตรวจเสร็จ' : 'รอดำเนินการ'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <input
                              type="text"
                              defaultValue={app.admin_notes || ''}
                              placeholder="คลิกเพื่อบันทึกโน้ต..."
                              onBlur={(e) => updateAdminNotes(app.id, e.target.value)}
                              className="w-full max-w-xs px-2 py-1 text-[11px] bg-transparent border-b border-dashed border-slate-300 hover:border-slate-500 focus:outline-none focus:border-emerald-600 focus:bg-white"
                            />
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap space-x-1">
                            <button
                              onClick={() => setViewingAppointmentSlip(app)}
                              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                              title="ดูใบนัด"
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              onClick={() => updateAppointmentStatus(app.id, 'confirmed')}
                              className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded"
                              title="ยืนยันนัดหมาย"
                            >
                              <CheckCircle size={15} />
                            </button>
                            <button
                              onClick={() => updateAppointmentStatus(app.id, 'completed')}
                              className="p-1.5 text-blue-700 hover:bg-blue-50 rounded"
                              title="ทำเครื่องหมายว่าตรวจแล้ว"
                            >
                              <Clock size={15} />
                            </button>
                            <button
                              onClick={() => updateAppointmentStatus(app.id, 'cancelled')}
                              className="p-1.5 text-amber-700 hover:bg-amber-50 rounded"
                              title="ยกเลิกนัด"
                            >
                              <XCircle size={15} />
                            </button>
                            <button
                              onClick={() => deleteAppointment(app.id)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                              title="ลบรายการ"
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Doctors Management */}
        {activeTab === 'doctors' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {doctors.map(doc => (
              <div key={doc.id} className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <img 
                      src={doc.image} 
                      alt={doc.name} 
                      className="w-16 h-16 rounded-lg object-cover bg-slate-100 shrink-0" 
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{doc.name}</h4>
                      <p className="text-xs text-emerald-700 font-medium">{doc.role}</p>
                      <span className="inline-block mt-1 text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {doc.specialty}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600 py-3 border-t border-slate-100">
                    <p><strong className="text-slate-700">สถานที่:</strong> {doc.room}</p>
                    <p><strong className="text-slate-700">ตารางตรวจ:</strong> {doc.schedule}</p>
                    <p className="text-[11px] text-slate-400 mt-2 line-clamp-2">{doc.edu}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-slate-100 mt-2">
                  <button
                    onClick={() => { setEditingDoctor(doc); setIsDoctorModalOpen(true); }}
                    className="flex-1 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit2 size={13} /> แก้ไข
                  </button>
                  <button
                    onClick={() => deleteDoctor(doc.id)}
                    className="py-1.5 px-3 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Trash2 size={13} /> ลบ
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Health Packages Management */}
        {activeTab === 'packages' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {packages.map(pkg => (
              <div key={pkg.id} className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {pkg.category}
                    </span>
                    {pkg.is_popular ? (
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                        ยอดนิยม
                      </span>
                    ) : null}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{pkg.name}</h4>
                  <p className="text-lg font-bold text-slate-900 font-mono mt-2">
                    ฿{pkg.price?.toLocaleString()}
                    {pkg.original_price > pkg.price && (
                      <span className="text-xs text-slate-400 line-through ml-2">
                        ฿{pkg.original_price?.toLocaleString()}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{pkg.target_group}</p>

                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-700 block mb-1">
                      รายการตรวจ ({pkg.items?.length || 0} รายการ):
                    </span>
                    <ul className="text-[11px] text-slate-500 space-y-1 list-disc list-inside">
                      {pkg.items?.slice(0, 4).map((it: string, i: number) => (
                        <li key={i} className="line-clamp-1">{it}</li>
                      ))}
                      {pkg.items?.length > 4 && <li>และรายการอื่นๆ อีก {pkg.items.length - 4} รายการ</li>}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-slate-100 mt-4">
                  <button
                    onClick={() => { setEditingPackage(pkg); setIsPackageModalOpen(true); }}
                    className="flex-1 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit2 size={13} /> แก้ไข
                  </button>
                  <button
                    onClick={() => deletePackage(pkg.id)}
                    className="py-1.5 px-3 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Trash2 size={13} /> ลบ
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Announcements Management */}
        {activeTab === 'announcements' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
              {announcements.map(ann => (
                <div key={ann.id} className="p-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {ann.category}
                      </span>
                      <span className="font-mono">{ann.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{ann.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">{ann.summary}</p>
                  </div>
                  <button
                    onClick={() => deleteAnnouncement(ann.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded shrink-0"
                    title="ลบประกาศนี้"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Doctor Modal (Create/Edit) */}
      {isDoctorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-slate-200">
            <h2 className="text-base font-bold mb-4 text-slate-900">
              {editingDoctor ? 'แก้ไขข้อมูลแพทย์' : 'เพิ่มข้อมูลแพทย์ใหม่'}
            </h2>
            <form onSubmit={handleDoctorSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">ชื่อ - นามสกุล แพทย์</label>
                <input 
                  name="name" 
                  defaultValue={editingDoctor?.name} 
                  required 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">ตำแหน่ง / ความเชี่ยวชาญ</label>
                  <input 
                    name="role" 
                    defaultValue={editingDoctor?.role} 
                    required 
                    placeholder="เช่น อายุรแพทย์โรคหัวใจ"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" 
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">สาขาหลัก</label>
                  <select 
                    name="specialty" 
                    defaultValue={editingDoctor?.specialty || 'อายุรกรรม'}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600"
                  >
                    <option value="อายุรกรรม">อายุรกรรม</option>
                    <option value="กุมารเวชกรรม">กุมารเวชกรรม</option>
                    <option value="ศัลยกรรมออร์โธปิดิกส์">ศัลยกรรมออร์โธปิดิกส์</option>
                    <option value="เวชศาสตร์ครอบครัว">เวชศาสตร์ครอบครัว</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">ห้องตรวจ</label>
                  <input 
                    name="room" 
                    defaultValue={editingDoctor?.room || 'ห้องตรวจ 101'} 
                    required 
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" 
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">ตารางออกตรวจ</label>
                  <input 
                    name="schedule" 
                    defaultValue={editingDoctor?.schedule || 'จันทร์ - ศุกร์ (08:30 - 15:30)'} 
                    required 
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" 
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">รูปถ่าย (URL หรือ Image Path)</label>
                <input 
                  name="image" 
                  defaultValue={editingDoctor?.image || '/src/assets/images/doctor_portrait_male_1791176624773.jpg'} 
                  required 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" 
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">ประวัติการศึกษาและการฝึกอบรม</label>
                <textarea 
                  name="edu" 
                  defaultValue={editingDoctor?.edu} 
                  required 
                  rows={3} 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600 resize-none" 
                />
              </div>
              <div className="flex gap-2 pt-3">
                <button 
                  type="button" 
                  onClick={() => setIsDoctorModalOpen(false)} 
                  className="flex-1 py-2 rounded-lg font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  ยกเลิก
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2 rounded-lg font-semibold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Package Modal */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-slate-200">
            <h2 className="text-base font-bold mb-4 text-slate-900">
              {editingPackage ? 'แก้ไขแพ็กเกจตรวจสุขภาพ' : 'เพิ่มแพ็กเกจตรวจสุขภาพใหม่'}
            </h2>
            <form onSubmit={handlePackageSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">ชื่อโปรแกรมตรวจสุขภาพ</label>
                <input 
                  name="name" 
                  defaultValue={editingPackage?.name} 
                  required 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">ราคาพิเศษ (บาท)</label>
                  <input 
                    name="price" 
                    type="number"
                    defaultValue={editingPackage?.price} 
                    required 
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" 
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">ราคาปกติ (บาท)</label>
                  <input 
                    name="original_price" 
                    type="number"
                    defaultValue={editingPackage?.original_price || editingPackage?.price} 
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">หมวดหมู่</label>
                  <input 
                    name="category" 
                    defaultValue={editingPackage?.category || 'ทั่วไป'} 
                    required 
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" 
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">กลุ่มเป้าหมาย</label>
                  <input 
                    name="target_group" 
                    defaultValue={editingPackage?.target_group} 
                    placeholder="เช่น อายุ 35 ปีขึ้นไป"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" 
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">รายการตรวจ (บรรทัดละ 1 รายการ)</label>
                <textarea 
                  name="items" 
                  defaultValue={editingPackage?.items ? editingPackage.items.join('\n') : ''} 
                  required 
                  rows={4} 
                  placeholder="ตรวจร่างกายทั่วไปโดยแพทย์&#10;ตรวจความสมบูรณ์ของเม็ดเลือด CBC&#10;ตรวจระดับน้ำตาลในเลือด FBS"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600 resize-none font-mono" 
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="checkbox" 
                  name="is_popular" 
                  id="is_popular" 
                  defaultChecked={Boolean(editingPackage?.is_popular)} 
                  className="rounded border-slate-300 text-emerald-600"
                />
                <label htmlFor="is_popular" className="font-semibold text-slate-700">แสดงป้าย "โปรแกรมยอดนิยม"</label>
              </div>
              <div className="flex gap-2 pt-3">
                <button 
                  type="button" 
                  onClick={() => setIsPackageModalOpen(false)} 
                  className="flex-1 py-2 rounded-lg font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  ยกเลิก
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2 rounded-lg font-semibold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                >
                  บันทึกแพ็กเกจ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Announcement Modal */}
      {isAnnouncementModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-slate-200">
            <h2 className="text-base font-bold mb-4 text-slate-900">ประกาศข่าวสารศูนย์แพทย์</h2>
            <form onSubmit={handleAnnouncementSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">หัวข้อประกาศ</label>
                <input 
                  name="title" 
                  required 
                  placeholder="เช่น เปิดให้บริการฉีดวัคซีนไข้หวัดใหญ่ 2026"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">หมวดหมู่</label>
                  <input 
                    name="category" 
                    defaultValue="ประกาศศูนย์แพทย์" 
                    required 
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" 
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">วันที่ประกาศ</label>
                  <input 
                    name="date" 
                    type="date" 
                    defaultValue={new Date().toISOString().split('T')[0]} 
                    required 
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600" 
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">บทคัดย่อสั้น</label>
                <textarea 
                  name="summary" 
                  required 
                  rows={2} 
                  placeholder="ข้อความสรุปสั้น 1-2 ประโยค"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600 resize-none" 
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">เนื้อหาฉบับเต็ม</label>
                <textarea 
                  name="content" 
                  required 
                  rows={4} 
                  placeholder="รายละเอียดประกาศทั้งหมด..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600 resize-none" 
                />
              </div>
              <div className="flex gap-2 pt-3">
                <button 
                  type="button" 
                  onClick={() => setIsAnnouncementModalOpen(false)} 
                  className="flex-1 py-2 rounded-lg font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  ยกเลิก
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2 rounded-lg font-semibold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                >
                  เผยแพร่ประกาศ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Appointment Slip View & Print Modal */}
      {viewingAppointmentSlip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-200">
            <div className="text-center pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">ใบนัดหมายผู้รับบริการ</h3>
              <p className="text-xs text-slate-500">ศูนย์แพทย์สุรินทร์ (Surin Medical Center)</p>
              <div className="mt-2 text-emerald-800 font-mono font-bold text-lg">
                {viewingAppointmentSlip.code || `SMC-${viewingAppointmentSlip.id}`}
              </div>
            </div>

            <div className="py-4 space-y-2 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">ชื่อคนไข้:</span>
                <span className="font-semibold">{viewingAppointmentSlip.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">เบอร์โทรศัพท์:</span>
                <span className="font-mono">{viewingAppointmentSlip.phone}</span>
              </div>
              {viewingAppointmentSlip.hn && (
                <div className="flex justify-between">
                  <span className="text-slate-500">HN:</span>
                  <span className="font-mono">{viewingAppointmentSlip.hn}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">บริการ / แผนก:</span>
                <span className="font-medium">{viewingAppointmentSlip.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">แพทย์ผู้ออกตรวจ:</span>
                <span className="font-medium">{viewingAppointmentSlip.doctor_name || 'แพทย์เวรประจำวัน'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">วันเวลานัด:</span>
                <span className="font-mono font-semibold text-emerald-800">
                  {viewingAppointmentSlip.date} ({viewingAppointmentSlip.time_slot})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">สถานะ:</span>
                <span className="font-semibold text-slate-900">{viewingAppointmentSlip.status}</span>
              </div>
              {viewingAppointmentSlip.admin_notes && (
                <div className="mt-2 p-2 bg-slate-50 rounded text-slate-600">
                  <strong>บันทึกเจ้าหน้าที่:</strong> {viewingAppointmentSlip.admin_notes}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-1.5"
              >
                <Printer size={14} /> พิมพ์ใบนัด
              </button>
              <button
                onClick={() => setViewingAppointmentSlip(null)}
                className="flex-1 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
