import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ADMIN_CONFIG } from '../../data/vipBookLibrary';
import { 
  X, 
  ShieldCheck, 
  Key, 
  Check, 
  CheckCircle2, 
  Clock, 
  Ban, 
  Trash2, 
  UserPlus, 
  Search, 
  Copy, 
  LogOut, 
  Mail, 
  ExternalLink, 
  AlertCircle,
  Sparkles,
  Download,
  Users
} from 'lucide-react';

interface AdminStudentManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminStudentManagerModal: React.FC<AdminStudentManagerModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    isAdminAuthenticated,
    adminEmail,
    loginAdmin,
    logoutAdmin,
    students,
    approveStudent,
    blockStudent,
    unblockStudent,
    deleteStudent,
    addStudentDirectly
  } = useCart();

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPass, setEnteredPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Admin Add Student Form State
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentStatus, setNewStudentStatus] = useState<'approved' | 'pending'>('approved');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'blocked'>('all');
  const [activeTab, setActiveTab] = useState<'students' | 'passcodes'>('students');

  // Copy code feedback
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginAdmin(enteredEmail, enteredPass);
    if (!ok) {
      setLoginError(`Gmail "${enteredEmail}" hoặc mật khẩu không chính xác.`);
    } else {
      setLoginError('');
      setEnteredPass('');
    }
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentEmail.trim()) return;
    addStudentDirectly(newStudentEmail.trim(), newStudentStatus, newStudentName.trim() || undefined);
    setNewStudentEmail('');
    setNewStudentName('');
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.fullName && s.fullName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = students.filter(s => s.status === 'pending').length;
  const approvedCount = students.filter(s => s.status === 'approved').length;
  const blockedCount = students.filter(s => s.status === 'blocked').length;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleCopyTemplate = (code: string, name: string) => {
    const msg = `Chào bạn! Admin LEO ENGLISH gửi bạn quyền tải sách:
🌐 Link tải sách: https://github.com/Genwise-2025
🔑 MÃ TẢI SÁCH: ${code} (${name})
Hoặc bạn chỉ cần nhập đúng Gmail của bạn vào trang web là có thể tải ngay trọn bộ sách PDF bản quyền nhé!`;
    navigator.clipboard.writeText(msg);
    setCopiedCode('template-' + code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-gradient-to-b from-[#1E1109] to-[#120A05] text-white rounded-3xl shadow-2xl border-2 border-gold-500/60 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-amber-950 via-warm-900 to-amber-950 border-b border-gold-500/30 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gold-500/20 border border-gold-400 flex items-center justify-center text-gold-300">
              <ShieldCheck className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>BẢNG ĐIỀU KHIỂN QUẢN TRỊ ADMIN</span>
                {isAdminAuthenticated && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase shadow">
                    ĐÃ XÁC THỰC
                  </span>
                )}
              </h3>
              <p className="text-xs text-amber-200/80 font-medium">
                Admin: <strong className="text-gold-300">nguyentoandinh.0511@gmail.com</strong> — Duyệt, chặn & xóa học viên tải sách
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                type="button"
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition-colors flex items-center gap-1.5"
                title="Đăng xuất Admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                Đăng Xuất
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-cream flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Not Authenticated -> Login Screen */}
        {!isAdminAuthenticated ? (
          <div className="p-8 flex flex-col items-center justify-center max-w-md mx-auto my-auto text-center">
            <div className="w-16 h-16 rounded-3xl bg-gold-500/10 border-2 border-gold-400/40 flex items-center justify-center text-gold-400 mb-4 shadow-glow-gold">
              <Key className="w-8 h-8" />
            </div>

            <h4 className="text-xl font-black text-white mb-2">Đăng Nhập Quản Trị Viên</h4>
            <p className="text-xs text-cream/70 mb-6 leading-relaxed">
              Vui lòng xác thực tài khoản Gmail Admin <strong className="text-gold-300">nguyentoandinh.0511@gmail.com</strong> để quản lý duyệt học viên và mã tải sách.
            </p>

            <form onSubmit={handleAdminLogin} className="w-full space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1">
                  Gmail Admin:
                </label>
                <input
                  type="email"
                  required
                  placeholder="nguyentoandinh.0511@gmail.com"
                  value={enteredEmail}
                  onChange={(e) => setEnteredEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-black/50 border border-gold-500/40 text-white placeholder-cream/30 text-sm focus:outline-none focus:border-gold-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1">
                  Mật khẩu bảo mật:
                </label>
                <input
                  type="password"
                  required
                  placeholder="Mật khẩu Admin"
                  value={enteredPass}
                  onChange={(e) => setEnteredPass(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-black/50 border border-gold-500/40 text-white placeholder-cream/30 text-sm focus:outline-none focus:border-gold-400 font-mono"
                />
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-medium">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-gold-500 via-warm-500 to-gold-400 text-darkbrown font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-gold-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Đăng Nhập Quyền Quản Trị
              </button>

              <button
                type="button"
                onClick={() => {
                  setEnteredEmail('nguyentoandinh.0511@gmail.com');
                  setEnteredPass('Dinh100216');
                }}
                className="w-full py-2 text-center text-xs text-amber-400/80 hover:text-amber-300 underline font-medium transition-colors"
              >
                Điền nhanh thông tin Admin mặc định
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Top Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-gold-500/20 pb-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('students')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'students'
                      ? 'bg-gold-500 text-darkbrown shadow-lg font-black'
                      : 'bg-white/5 text-cream/70 hover:bg-white/10'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Duyệt Gmail Học Viên ({students.length})
                  {pendingCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center animate-pulse">
                      {pendingCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('passcodes')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'passcodes'
                      ? 'bg-gold-500 text-darkbrown shadow-lg font-black'
                      : 'bg-white/5 text-cream/70 hover:bg-white/10'
                  }`}
                >
                  <Key className="w-4 h-4" />
                  Mã Tải Sách Nhóm (L1000, T390, L299VIP)
                </button>
              </div>

              <div className="text-xs text-amber-300/80 font-mono">
                Admin: {adminEmail}
              </div>
            </div>

            {/* TAB 1: DUYỆT GMAIL HỌC VIÊN */}
            {activeTab === 'students' && (
              <div className="space-y-6">
                {/* 4 Summary Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-gold-500/20 flex flex-col">
                    <span className="text-[11px] text-cream/60 font-medium">Tổng Học Viên</span>
                    <span className="text-2xl font-black text-white mt-1">{students.length}</span>
                  </div>

                  <div className={`p-3.5 rounded-2xl border flex flex-col ${
                    pendingCount > 0 
                      ? 'bg-amber-950/40 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                      : 'bg-white/5 border-gold-500/20'
                  }`}>
                    <span className="text-[11px] text-amber-300 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Chờ Phê Duyệt
                    </span>
                    <span className="text-2xl font-black text-amber-400 mt-1">{pendingCount}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col">
                    <span className="text-[11px] text-emerald-300 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Đã Phê Duyệt
                    </span>
                    <span className="text-2xl font-black text-emerald-400 mt-1">{approvedCount}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/30 flex flex-col">
                    <span className="text-[11px] text-rose-300 font-medium flex items-center gap-1">
                      <Ban className="w-3 h-3" /> Đã Bị Chặn
                    </span>
                    <span className="text-2xl font-black text-rose-400 mt-1">{blockedCount}</span>
                  </div>
                </div>

                {/* Form Add Student Direct */}
                <form onSubmit={handleAddStudent} className="p-4 rounded-2xl bg-white/5 border border-gold-500/30 space-y-3">
                  <div className="text-xs font-bold text-gold-300 uppercase tracking-wider flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-gold-400" />
                    <span>Thêm Nhanh Gmail Học Viên Được Cấp Quyền Tải Sách:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="email"
                      required
                      placeholder="Gmail học viên (bắt buộc)..."
                      value={newStudentEmail}
                      onChange={(e) => setNewStudentEmail(e.target.value)}
                      className="px-3.5 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white placeholder-cream/40 text-xs focus:outline-none focus:border-gold-400 font-mono"
                    />

                    <input
                      type="text"
                      placeholder="Họ tên học viên (tùy chọn)..."
                      value={newStudentName}
                      onChange={(e) => setNewStudentName(e.target.value)}
                      className="px-3.5 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white placeholder-cream/40 text-xs focus:outline-none focus:border-gold-400"
                    />

                    <div className="flex gap-2">
                      <select
                        value={newStudentStatus}
                        onChange={(e) => setNewStudentStatus(e.target.value as 'approved' | 'pending')}
                        className="px-3 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400 flex-1 font-semibold"
                      >
                        <option value="approved">Duyệt Ngay (Approved)</option>
                        <option value="pending">Chờ Duyệt (Pending)</option>
                      </select>

                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs uppercase tracking-wider shadow transition-transform hover:scale-105 flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Thêm
                      </button>
                    </div>
                  </div>
                </form>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/40" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm Gmail hoặc tên học viên..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/30 border border-gold-500/20 text-white placeholder-cream/40 text-xs focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    <button
                      type="button"
                      onClick={() => setStatusFilter('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        statusFilter === 'all'
                          ? 'bg-gold-500 text-darkbrown'
                          : 'bg-white/5 text-cream/60 hover:bg-white/10'
                      }`}
                    >
                      Tất cả ({students.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusFilter('pending')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                        statusFilter === 'pending'
                          ? 'bg-amber-500 text-darkbrown font-black'
                          : 'bg-white/5 text-amber-300 hover:bg-white/10'
                      }`}
                    >
                      Chờ duyệt ({pendingCount})
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusFilter('approved')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        statusFilter === 'approved'
                          ? 'bg-emerald-500 text-darkbrown font-black'
                          : 'bg-white/5 text-emerald-300 hover:bg-white/10'
                      }`}
                    >
                      Đã duyệt ({approvedCount})
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusFilter('blocked')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        statusFilter === 'blocked'
                          ? 'bg-rose-500 text-white font-black'
                          : 'bg-white/5 text-rose-300 hover:bg-white/10'
                      }`}
                    >
                      Đã chặn ({blockedCount})
                    </button>
                  </div>
                </div>

                {/* Students Table */}
                <div className="rounded-2xl border border-gold-500/20 overflow-hidden bg-black/20">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-white/5 text-cream/60 uppercase tracking-wider text-[10px] border-b border-gold-500/20">
                        <tr>
                          <th className="py-3 px-4">Học Viên / Gmail</th>
                          <th className="py-3 px-4">Ngày Đăng Ký</th>
                          <th className="py-3 px-4">Trạng Thái</th>
                          <th className="py-3 px-4 text-right">Thao Tác Admin</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gold-500/10">
                        {filteredStudents.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="py-8 text-center text-cream/40">
                              Không tìm thấy học viên nào phù hợp bộ lọc.
                            </td>
                          </tr>
                        ) : (
                          filteredStudents.map((std) => (
                            <tr key={std.id} className="hover:bg-white/5 transition-colors">
                              <td className="py-3.5 px-4">
                                <div className="font-bold text-white flex items-center gap-1.5">
                                  <span>{std.email}</span>
                                  {std.email.toLowerCase() === ADMIN_CONFIG.adminEmail.toLowerCase() && (
                                    <span className="px-1.5 py-0.2 rounded text-[9px] bg-gold-500 text-darkbrown font-black">
                                      ADMIN
                                    </span>
                                  )}
                                </div>
                                {std.fullName && (
                                  <div className="text-[11px] text-cream/60">{std.fullName}</div>
                                )}
                                {std.notes && (
                                  <div className="text-[10px] text-amber-300/60 italic">{std.notes}</div>
                                )}
                              </td>

                              <td className="py-3.5 px-4 text-cream/60 font-mono text-[11px]">
                                {new Date(std.registeredAt).toLocaleDateString('vi-VN')}
                              </td>

                              <td className="py-3.5 px-4">
                                {std.status === 'approved' ? (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-[10px]">
                                    <CheckCircle2 className="w-3 h-3" /> ĐÃ DUYỆT
                                  </span>
                                ) : std.status === 'blocked' ? (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold text-[10px]">
                                    <Ban className="w-3 h-3" /> ĐÃ CHẶN
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-[10px] animate-pulse">
                                    <Clock className="w-3 h-3" /> CHỜ DUYỆT
                                  </span>
                                )}
                              </td>

                              <td className="py-3.5 px-4 text-right">
                                <div className="inline-flex items-center gap-1.5">
                                  {/* Approve Button */}
                                  {std.status !== 'approved' && (
                                    <button
                                      type="button"
                                      onClick={() => approveStudent(std.email)}
                                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow transition-transform hover:scale-105 flex items-center gap-1"
                                      title="Duyệt cho học viên tải sách"
                                    >
                                      <Check className="w-3 h-3" /> Duyệt
                                    </button>
                                  )}

                                  {/* Block / Unblock Button */}
                                  {std.status === 'blocked' ? (
                                    <button
                                      type="button"
                                      onClick={() => unblockStudent(std.email)}
                                      className="px-2.5 py-1 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 border border-cyan-400/40 font-bold text-[11px] transition-colors"
                                      title="Mở khóa tài khoản"
                                    >
                                      Mở Chặn
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => blockStudent(std.email)}
                                      disabled={std.email.toLowerCase() === ADMIN_CONFIG.adminEmail.toLowerCase()}
                                      className="px-2.5 py-1 rounded-lg bg-amber-600/20 hover:bg-amber-600/40 text-amber-300 border border-amber-500/30 font-bold text-[11px] transition-colors disabled:opacity-30 disabled:pointer-events-none"
                                      title="Chặn quyền tải sách"
                                    >
                                      Chặn
                                    </button>
                                  )}

                                  {/* Delete Button */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (window.confirm(`Bạn có chắc chắn muốn XÓA học viên "${std.email}"?`)) {
                                        deleteStudent(std.email);
                                      }
                                    }}
                                    disabled={std.email.toLowerCase() === ADMIN_CONFIG.adminEmail.toLowerCase()}
                                    className="p-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/30 text-rose-300 border border-rose-500/20 transition-colors disabled:opacity-20 disabled:pointer-events-none"
                                    title="Xóa hoàn toàn tài khoản"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
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

            {/* TAB 2: MÃ TẢI SÁCH NHÓM */}
            {activeTab === 'passcodes' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                  Admin có thể sao chép nhanh mã tải sách hoặc gửi mẫu tin nhắn Zalo kèm hướng dẫn cho học viên đã đóng học phí:
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* L1000 */}
                  <div className="p-5 rounded-2xl bg-gradient-to-b from-emerald-950/60 to-black/60 border border-emerald-500/40 space-y-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500 text-white font-bold">
                      NHÓM 1
                    </span>
                    <h5 className="font-black text-sm text-white">1000 CÂU PHẢN XẠ SWIVOX</h5>
                    <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/30 flex items-center justify-between">
                      <span className="font-mono text-lg font-black text-emerald-400">L1000</span>
                      <button
                        type="button"
                        onClick={() => handleCopy('L1000')}
                        className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-bold text-cream flex items-center gap-1"
                      >
                        {copiedCode === 'L1000' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedCode === 'L1000' ? 'Đã copy' : 'Copy'}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyTemplate('L1000', '1000 Câu Phản Xạ')}
                      className="w-full py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 text-xs font-bold transition-colors"
                    >
                      {copiedCode === 'template-L1000' ? 'Đã copy mẫu tin nhắn!' : 'Sao chép tin nhắn Zalo'}
                    </button>
                  </div>

                  {/* T390 */}
                  <div className="p-5 rounded-2xl bg-gradient-to-b from-amber-950/60 to-black/60 border border-amber-500/40 space-y-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500 text-darkbrown font-bold">
                      NHÓM 2
                    </span>
                    <h5 className="font-black text-sm text-white">COMMUNITY 390 (6 CUỐN)</h5>
                    <div className="p-3 rounded-xl bg-black/60 border border-amber-500/30 flex items-center justify-between">
                      <span className="font-mono text-lg font-black text-amber-400">T390</span>
                      <button
                        type="button"
                        onClick={() => handleCopy('T390')}
                        className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-bold text-cream flex items-center gap-1"
                      >
                        {copiedCode === 'T390' ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedCode === 'T390' ? 'Đã copy' : 'Copy'}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyTemplate('T390', 'Community 390')}
                      className="w-full py-2 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 text-xs font-bold transition-colors"
                    >
                      {copiedCode === 'template-T390' ? 'Đã copy mẫu tin nhắn!' : 'Sao chép tin nhắn Zalo'}
                    </button>
                  </div>

                  {/* L299VIP */}
                  <div className="p-5 rounded-2xl bg-gradient-to-b from-purple-950/60 to-black/60 border border-purple-500/40 space-y-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500 text-white font-bold">
                      NHÓM 3
                    </span>
                    <h5 className="font-black text-sm text-white">COMBO VIP L299 (4 CUỐN)</h5>
                    <div className="p-3 rounded-xl bg-black/60 border border-purple-500/30 flex items-center justify-between">
                      <span className="font-mono text-lg font-black text-purple-400">L299VIP</span>
                      <button
                        type="button"
                        onClick={() => handleCopy('L299VIP')}
                        className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-bold text-cream flex items-center gap-1"
                      >
                        {copiedCode === 'L299VIP' ? <Check className="w-3.5 h-3.5 text-purple-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedCode === 'L299VIP' ? 'Đã copy' : 'Copy'}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyTemplate('L299VIP', 'Combo VIP L299')}
                      className="w-full py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 text-xs font-bold transition-colors"
                    >
                      {copiedCode === 'template-L299VIP' ? 'Đã copy mẫu tin nhắn!' : 'Sao chép tin nhắn Zalo'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
