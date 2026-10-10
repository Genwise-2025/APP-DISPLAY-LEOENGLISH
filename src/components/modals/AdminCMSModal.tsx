import React, { useState, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { Product, Language, ProductType } from '../../types/product';
import { ADMIN_CONFIG } from '../../data/vipBookLibrary';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Image as ImageIcon, 
  Upload, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  LogOut, 
  CheckCircle2, 
  KeyRound, 
  Eye, 
  EyeOff, 
  Camera,
  Users,
  Key,
  Clock,
  Ban,
  UserPlus,
  Search,
  Copy,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AUTHORIZED_ADMIN_EMAIL = 'nguyentoandinh.0511@gmail.com';

export const AdminCMSModal: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    adminEmail,
    loginAdmin,
    logoutAdmin,
    addToast,
    students,
    approveStudent,
    blockStudent,
    unblockStudent,
    deleteStudent,
    addStudentDirectly,
  } = useCart();

  // DEFAULT TAB IS 'students' (DUYỆT GMAIL HỌC VIÊN VIP)
  const [activeTab, setActiveTab] = useState<'students' | 'passcodes' | 'manage' | 'create'>('students');
  
  // Login Form State
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Student Manager State
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentStatus, setNewStudentStatus] = useState<'approved' | 'pending'>('approved');
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [studentStatusFilter, setStudentStatusFilter] = useState<'all' | 'pending' | 'approved' | 'blocked'>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Product Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Sách tiếng Anh');
  const [language, setLanguage] = useState<Language>('English');
  const [type, setType] = useState<ProductType>('book');
  const [description, setDescription] = useState('');
  const [originalPrice, setOriginalPrice] = useState(200000);
  const [salePrice, setSalePrice] = useState(80000);
  const [badge, setBadge] = useState<'Bán chạy' | 'Mới' | 'Ưu đãi' | 'Độc quyền' | 'Hot' | ''>('Mới');
  const [imageUrl, setImageUrl] = useState('');
  const [features, setFeatures] = useState('Đồng giá 80k/quyển, Mua 4 tặng 2, Tích hợp audio giọng đọc bản ngữ');

  if (!isAdminOpen) return null;

  // Login Handler (Validates BOTH Email & Password)
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmail || !inputPassword) {
      addToast('Thiếu thông tin', 'Vui lòng nhập đầy đủ Email và Mật khẩu.', 'warning');
      return;
    }

    const success = loginAdmin(inputEmail, inputPassword);
    if (success) {
      setInputEmail('');
      setInputPassword('');
      setLoginError('');
    } else {
      setLoginError(`Gmail hoặc mật khẩu Admin không đúng. Chỉ tài khoản ${AUTHORIZED_ADMIN_EMAIL} mới có quyền truy cập.`);
    }
  };

  // Student Direct Add Handler
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentEmail.trim()) {
      addToast('Chưa nhập Gmail', 'Vui lòng nhập địa chỉ Gmail học viên cần thêm.', 'warning');
      return;
    }
    addStudentDirectly(newStudentEmail.trim(), newStudentStatus, newStudentName.trim() || undefined);
    setNewStudentEmail('');
    setNewStudentName('');
  };

  // Passcode Copy Helper
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    addToast('Đã copy mã', `Đã sao chép mã ${code} vào bộ nhớ tạm.`, 'info');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleCopyTemplate = (code: string, groupName: string) => {
    const msg = `Chào bạn! Admin LEO ENGLISH gửi bạn quyền tải sách:
🌐 Link tải sách VIP: https://github.com/Genwise-2025/APP-DISPLAY-LEOENGLISH
🔑 MÃ TẢI SÁCH: ${code} (${groupName})
Hoặc bạn chỉ cần nhập đúng Gmail của bạn vào trang web là hệ thống tự động mở khóa tải vĩnh viễn trọn bộ sách PDF bản quyền nhé!`;
    navigator.clipboard.writeText(msg);
    setCopiedCode('template-' + code);
    addToast('Đã copy mẫu tin nhắn', 'Bạn có thể gửi ngay tin nhắn này cho học viên qua Zalo!', 'success');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Filter students
  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.email.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
      (s.fullName && s.fullName.toLowerCase().includes(studentSearchQuery.toLowerCase()));
    const matchesStatus = studentStatusFilter === 'all' || s.status === studentStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = students.filter(s => s.status === 'pending').length;
  const approvedCount = students.filter(s => s.status === 'approved').length;
  const blockedCount = students.filter(s => s.status === 'blocked').length;

  // Create Form Image Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        addToast('Đã tải ảnh lên!', 'Bìa sách sẽ được dùng cho sản phẩm mới.', 'info');
      };
      reader.readAsDataURL(file);
    }
  };

  // Replace Existing Product Image Handler
  const handleReplaceProductImage = (productId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const targetProd = products.find((p) => p.id === productId);
      if (!targetProd) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        const newImageBase64 = reader.result as string;
        const updatedImages = [newImageBase64, ...targetProd.images.slice(1)];
        updateProduct({
          ...targetProd,
          images: updatedImages,
        });
        addToast(
          'Thay đổi ảnh bìa thành công!',
          `Đã cập nhật ảnh bìa mới cho "${targetProd.name}".`
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdminAuthenticated) {
      addToast('Từ chối truy cập', `Chỉ admin ${AUTHORIZED_ADMIN_EMAIL} mới có quyền đăng sản phẩm.`, 'warning');
      return;
    }

    if (!name.trim()) {
      addToast('Thiếu tên sản phẩm', 'Vui lòng nhập tên sản phẩm.', 'warning');
      return;
    }

    const calculatedDiscount = Math.round(((originalPrice - salePrice) / originalPrice) * 100);

    const newProduct: Product = {
      id: `prod-custom-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      category,
      language,
      type,
      description,
      fullDescription: description,
      originalPrice: Number(originalPrice),
      salePrice: Number(salePrice),
      discount: Math.max(0, calculatedDiscount),
      rating: 5.0,
      ratingCount: 1,
      sold: 10,
      badge: badge || undefined,
      images: [imageUrl || '/images/books/SÁCH GIAO TIẾP STARTER.jpg'],
      features: features.split(',').map((f) => f.trim()).filter(Boolean),
      includedItems: ['Sách/Tài khoản theo sản phẩm', 'Audio MP3 đính kèm'],
      targetAudience: ['Học viên tiếng Anh & tiếng Trung'],
      benefits: ['Bảo hành 1:1', 'Zalo hỗ trợ 0799713094'],
      lifetimeAccess: true,
      thickness: 34,
      spineColor: '#E65100',
    };

    addProduct(newProduct);
    
    // Reset Form
    setName('');
    setDescription('');
    setImageUrl('');
    setActiveTab('manage');
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        onClick={() => setIsAdminOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative w-full max-w-4xl bg-gradient-to-b from-[#1C1008] via-[#24140B] to-[#120803] text-cream rounded-3xl p-5 sm:p-7 shadow-2xl border-2 border-gold-400/80 my-6 overflow-hidden max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsAdminOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full text-cream/60 hover:text-white hover:bg-white/10 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-gold-500/30 mb-5 flex-shrink-0">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo-book-vip.png"
                alt="Book VIP Leo"
                className="w-11 h-11 rounded-2xl border-2 border-gold-400 shadow-md object-cover"
              />
              <div>
                <h3 className="font-black text-base sm:text-lg text-white flex items-center gap-2">
                  <span>BẢNG ĐIỀU KHIỂN QUẢN TRỊ ADMIN LEO</span>
                  {isAdminAuthenticated && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-darkbrown text-[10px] font-black uppercase shadow">
                      ĐÃ XÁC THỰC
                    </span>
                  )}
                </h3>
                <p className="text-xs text-amber-200/80 font-semibold">
                  Tài khoản: <strong className="text-gold-300">nguyentoandinh.0511@gmail.com</strong>
                </p>
              </div>
            </div>

            {isAdminAuthenticated && (
              <button
                type="button"
                onClick={logoutAdmin}
                className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 font-bold text-xs transition-colors flex items-center gap-1.5 mr-8"
              >
                <LogOut className="w-3.5 h-3.5" /> Đăng xuất
              </button>
            )}
          </div>

          {/* UNAUTHENTICATED ADMIN LOGIN SCREEN */}
          {!isAdminAuthenticated ? (
            <div className="py-8 px-4 max-w-md mx-auto text-center space-y-4 my-auto">
              <div className="w-20 h-20 rounded-3xl bg-gold-500/15 border-2 border-gold-400/60 mx-auto flex items-center justify-center text-gold-400 shadow-glow-gold">
                <Lock className="w-10 h-10" />
              </div>

              <div>
                <h4 className="font-black text-xl text-white">Đăng Nhập Quản Trị Viên</h4>
                <p className="text-xs text-cream/75 font-medium mt-1 leading-relaxed">
                  Đăng nhập Gmail <strong className="text-gold-300">nguyentoandinh.0511@gmail.com</strong> để mở khóa quyền duyệt học viên tải sách và quản trị website.
                </p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-3 pt-2 text-left">
                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">Gmail Admin *</label>
                  <input
                    type="email"
                    required
                    placeholder="nguyentoandinh.0511@gmail.com"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-gold-500/40 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-gold-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1 flex items-center gap-1">
                    <KeyRound className="w-3.5 h-3.5 text-gold-400" /> Mật khẩu Admin *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Mật khẩu Admin"
                      value={inputPassword}
                      onChange={(e) => setInputPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-gold-500/40 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-gold-500 pr-10 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/50 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-medium">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-500 via-warm-500 to-gold-400 hover:from-gold-400 hover:to-warm-600 text-darkbrown font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <ShieldCheck className="w-4 h-4" /> Đăng Nhập Quyền Quản Trị
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setInputEmail('nguyentoandinh.0511@gmail.com');
                    setInputPassword('Dinh100216');
                  }}
                  className="w-full py-2 text-center text-xs text-amber-300/80 hover:text-amber-200 underline font-semibold transition-colors"
                >
                  Điền nhanh thông tin Admin mặc định
                </button>
              </form>
            </div>
          ) : (
            /* AUTHENTICATED ADMIN FULL CMS DASHBOARD */
            <div className="flex-1 flex flex-col min-h-0">
              {/* Navigation Tabs Bar */}
              <div className="flex flex-wrap items-center gap-2 border-b border-gold-500/20 pb-3 mb-4 flex-shrink-0">
                {/* TAB 1: DUYỆT GMAIL HỌC VIÊN */}
                <button
                  type="button"
                  onClick={() => setActiveTab('students')}
                  className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all ${
                    activeTab === 'students' 
                      ? 'bg-gradient-to-r from-gold-500 to-warm-500 text-darkbrown shadow-lg' 
                      : 'bg-white/5 text-cream/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>👑 Duyệt Gmail Học Viên VIP ({students.length})</span>
                  {pendingCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-black animate-pulse">
                      {pendingCount}
                    </span>
                  )}
                </button>

                {/* TAB 2: MÃ TẢI DỰ PHÒNG */}
                <button
                  type="button"
                  onClick={() => setActiveTab('passcodes')}
                  className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all ${
                    activeTab === 'passcodes' 
                      ? 'bg-gradient-to-r from-gold-500 to-warm-500 text-darkbrown shadow-lg' 
                      : 'bg-white/5 text-cream/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Key className="w-4 h-4" />
                  <span>🔑 Mã Tải Dự Phòng</span>
                </button>

                {/* TAB 3: QUẢN LÝ SẢN PHẨM */}
                <button
                  type="button"
                  onClick={() => setActiveTab('manage')}
                  className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all ${
                    activeTab === 'manage' 
                      ? 'bg-gradient-to-r from-gold-500 to-warm-500 text-darkbrown shadow-lg' 
                      : 'bg-white/5 text-cream/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Edit3 className="w-4 h-4" />
                  <span>📦 Quản Lý Sản Phẩm ({products.length})</span>
                </button>

                {/* TAB 4: THÊM SẢN PHẨM MỚI */}
                <button
                  type="button"
                  onClick={() => setActiveTab('create')}
                  className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all ${
                    activeTab === 'create' 
                      ? 'bg-gradient-to-r from-gold-500 to-warm-500 text-darkbrown shadow-lg' 
                      : 'bg-white/5 text-cream/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>✨ Thêm Sản Phẩm Mới</span>
                </button>
              </div>

              {/* TAB 1: DUYỆT GMAIL HỌC VIÊN VIP */}
              {activeTab === 'students' && (
                <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                  {/* 4 Summary Stats Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="p-3 rounded-2xl bg-white/5 border border-gold-500/20 flex flex-col">
                      <span className="text-[11px] text-cream/60 font-medium">Tổng Học Viên</span>
                      <span className="text-xl sm:text-2xl font-black text-white mt-0.5">{students.length}</span>
                    </div>

                    <div className={`p-3 rounded-2xl border flex flex-col ${
                      pendingCount > 0 
                        ? 'bg-amber-950/50 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.25)]' 
                        : 'bg-white/5 border-gold-500/20'
                    }`}>
                      <span className="text-[11px] text-amber-300 font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Chờ Phê Duyệt
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-amber-400 mt-0.5">{pendingCount}</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col">
                      <span className="text-[11px] text-emerald-300 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Đã Phê Duyệt VIP
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">{approvedCount}</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-500/30 flex flex-col">
                      <span className="text-[11px] text-rose-300 font-bold flex items-center gap-1">
                        <Ban className="w-3 h-3" /> Đã Bị Chặn
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-rose-400 mt-0.5">{blockedCount}</span>
                    </div>
                  </div>

                  {/* Form Add Student Direct */}
                  <form onSubmit={handleAddStudent} className="p-3.5 rounded-2xl bg-white/5 border border-gold-500/30 space-y-2.5">
                    <div className="text-xs font-black text-gold-300 uppercase tracking-wider flex items-center gap-2">
                      <UserPlus className="w-4 h-4 text-gold-400" />
                      <span>Thêm Nhanh Gmail Học Viên (Cấp Quyền Tải Ngay):</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <input
                        type="email"
                        required
                        placeholder="Gmail học viên (bắt buộc)..."
                        value={newStudentEmail}
                        onChange={(e) => setNewStudentEmail(e.target.value)}
                        className="px-3.5 py-2 rounded-xl bg-black/50 border border-gold-500/30 text-white placeholder-cream/40 text-xs focus:outline-none focus:border-gold-400 font-mono"
                      />

                      <input
                        type="text"
                        placeholder="Tên học viên (tùy chọn)..."
                        value={newStudentName}
                        onChange={(e) => setNewStudentName(e.target.value)}
                        className="px-3.5 py-2 rounded-xl bg-black/50 border border-gold-500/30 text-white placeholder-cream/40 text-xs focus:outline-none focus:border-gold-400"
                      />

                      <div className="flex gap-2">
                        <select
                          value={newStudentStatus}
                          onChange={(e) => setNewStudentStatus(e.target.value as 'approved' | 'pending')}
                          className="px-3 py-2 rounded-xl bg-black/50 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400 flex-1 font-semibold"
                        >
                          <option value="approved">Duyệt Ngay (Approved)</option>
                          <option value="pending">Chờ Duyệt (Pending)</option>
                        </select>

                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-xs uppercase tracking-wider shadow transition-transform hover:scale-105 flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" /> Thêm
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Filter and Search Bar */}
                  <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/40" />
                      <input
                        type="text"
                        placeholder="Tìm theo Gmail hoặc tên học viên..."
                        value={studentSearchQuery}
                        onChange={(e) => setStudentSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/40 border border-gold-500/20 text-white placeholder-cream/40 text-xs focus:outline-none focus:border-gold-400"
                      />
                    </div>

                    <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                      <button
                        type="button"
                        onClick={() => setStudentStatusFilter('all')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          studentStatusFilter === 'all'
                            ? 'bg-gold-500 text-darkbrown font-black'
                            : 'bg-white/5 text-cream/60 hover:bg-white/10'
                        }`}
                      >
                        Tất cả ({students.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setStudentStatusFilter('pending')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                          studentStatusFilter === 'pending'
                            ? 'bg-amber-500 text-darkbrown font-black'
                            : 'bg-white/5 text-amber-300 hover:bg-white/10'
                        }`}
                      >
                        Chờ duyệt ({pendingCount})
                      </button>
                      <button
                        type="button"
                        onClick={() => setStudentStatusFilter('approved')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                          studentStatusFilter === 'approved'
                            ? 'bg-emerald-500 text-darkbrown font-black'
                            : 'bg-white/5 text-emerald-300 hover:bg-white/10'
                        }`}
                      >
                        Đã duyệt ({approvedCount})
                      </button>
                      <button
                        type="button"
                        onClick={() => setStudentStatusFilter('blocked')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                          studentStatusFilter === 'blocked'
                            ? 'bg-rose-500 text-white font-black'
                            : 'bg-white/5 text-rose-300 hover:bg-white/10'
                        }`}
                      >
                        Đã chặn ({blockedCount})
                      </button>
                    </div>
                  </div>

                  {/* Students Table */}
                  <div className="rounded-2xl border border-gold-500/20 overflow-hidden bg-black/30">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-white/5 text-cream/60 uppercase tracking-wider text-[10px] border-b border-gold-500/20">
                          <tr>
                            <th className="py-2.5 px-3.5">Học Viên / Gmail</th>
                            <th className="py-2.5 px-3.5">Ngày Đăng Ký</th>
                            <th className="py-2.5 px-3.5">Trạng Thái</th>
                            <th className="py-2.5 px-3.5 text-right">Thao Tác Admin Duyệt</th>
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
                                <td className="py-3 px-3.5">
                                  <div className="font-bold text-white flex items-center gap-1.5">
                                    <span>{std.email}</span>
                                    {std.email.toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase() && (
                                      <span className="px-1.5 py-0.2 rounded text-[9px] bg-gold-500 text-darkbrown font-black">
                                        ADMIN CHÍNH
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

                                <td className="py-3 px-3.5 text-cream/60 font-mono text-[11px]">
                                  {new Date(std.registeredAt).toLocaleDateString('vi-VN')}
                                </td>

                                <td className="py-3 px-3.5">
                                  {std.status === 'approved' ? (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-[10px]">
                                      <CheckCircle2 className="w-3 h-3" /> ĐÃ DUYỆT VIP
                                    </span>
                                  ) : std.status === 'blocked' ? (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold text-[10px]">
                                      <Ban className="w-3 h-3" /> ĐÃ CHẶN
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-[10px] animate-pulse">
                                      <Clock className="w-3 h-3" /> CHỜ DUYỆT
                                    </span>
                                  )}
                                </td>

                                <td className="py-3 px-3.5 text-right">
                                  <div className="inline-flex items-center gap-1.5">
                                    {/* Approve Button */}
                                    {std.status !== 'approved' && (
                                      <button
                                        type="button"
                                        onClick={() => approveStudent(std.email)}
                                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow transition-transform hover:scale-105 flex items-center gap-1"
                                        title="Duyệt cho học viên tải sách"
                                      >
                                        <Check className="w-3 h-3" /> Duyệt Ngay
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
                                        disabled={std.email.toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase()}
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
                                      disabled={std.email.toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase()}
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

              {/* TAB 2: MÃ TẢI SÁCH DỰ PHÒNG */}
              {activeTab === 'passcodes' && (
                <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed">
                    Admin có thể sao chép nhanh mã tải sách dự phòng hoặc gửi mẫu tin nhắn Zalo kèm link cho học viên đã chuyển khoản:
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {/* Nhóm 1 */}
                    <div className="p-4 rounded-2xl bg-gradient-to-b from-emerald-950/60 to-black/60 border border-emerald-500/40 space-y-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500 text-white font-bold">
                        NHÓM 1
                      </span>
                      <h5 className="font-black text-xs text-white">1000 CÂU PHẢN XẠ SWIVOX</h5>
                      <div className="p-2.5 rounded-xl bg-black/60 border border-emerald-500/30 flex items-center justify-between">
                        <span className="font-mono text-base font-black text-emerald-400">L1000</span>
                        <button
                          type="button"
                          onClick={() => handleCopy('L1000')}
                          className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-bold text-cream flex items-center gap-1"
                        >
                          {copiedCode === 'L1000' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          {copiedCode === 'L1000' ? 'Đã copy' : 'Copy'}
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyTemplate('L1000', '1000 Câu Phản Xạ')}
                        className="w-full py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 text-xs font-bold transition-colors"
                      >
                        {copiedCode === 'template-L1000' ? 'Đã copy mẫu tin nhắn!' : 'Sao chép tin nhắn Zalo'}
                      </button>
                    </div>

                    {/* Nhóm 2 */}
                    <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-950/60 to-black/60 border border-amber-500/40 space-y-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500 text-darkbrown font-bold">
                        NHÓM 2
                      </span>
                      <h5 className="font-black text-xs text-white">COMMUNITY 390 (6 CUỐN)</h5>
                      <div className="p-2.5 rounded-xl bg-black/60 border border-amber-500/30 flex items-center justify-between">
                        <span className="font-mono text-base font-black text-amber-400">T390</span>
                        <button
                          type="button"
                          onClick={() => handleCopy('T390')}
                          className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-bold text-cream flex items-center gap-1"
                        >
                          {copiedCode === 'T390' ? <Check className="w-3 h-3 text-amber-400" /> : <Copy className="w-3 h-3" />}
                          {copiedCode === 'T390' ? 'Đã copy' : 'Copy'}
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyTemplate('T390', 'Community 390')}
                        className="w-full py-1.5 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 text-xs font-bold transition-colors"
                      >
                        {copiedCode === 'template-T390' ? 'Đã copy mẫu tin nhắn!' : 'Sao chép tin nhắn Zalo'}
                      </button>
                    </div>

                    {/* Nhóm 3 */}
                    <div className="p-4 rounded-2xl bg-gradient-to-b from-purple-950/60 to-black/60 border border-purple-500/40 space-y-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500 text-white font-bold">
                        NHÓM 3
                      </span>
                      <h5 className="font-black text-xs text-white">COMBO VIP L299 (4 CUỐN)</h5>
                      <div className="p-2.5 rounded-xl bg-black/60 border border-purple-500/30 flex items-center justify-between">
                        <span className="font-mono text-base font-black text-purple-400">L299VIP</span>
                        <button
                          type="button"
                          onClick={() => handleCopy('L299VIP')}
                          className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-bold text-cream flex items-center gap-1"
                        >
                          {copiedCode === 'L299VIP' ? <Check className="w-3 h-3 text-purple-400" /> : <Copy className="w-3 h-3" />}
                          {copiedCode === 'L299VIP' ? 'Đã copy' : 'Copy'}
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyTemplate('L299VIP', 'Combo VIP L299')}
                        className="w-full py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 text-xs font-bold transition-colors"
                      >
                        {copiedCode === 'template-L299VIP' ? 'Đã copy mẫu tin nhắn!' : 'Sao chép tin nhắn Zalo'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: MANAGE EXISTING PRODUCTS */}
              {activeTab === 'manage' && (
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  <div className="flex justify-between items-center text-xs font-bold text-amber-200/70 pb-2 border-b border-gold-500/20">
                    <span>Danh sách {products.length} sản phẩm trên website</span>
                    <span>Thao tác chỉnh sửa ảnh & giá bán</span>
                  </div>

                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-2xl bg-white/5 border border-gold-500/20 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/10 transition-colors"
                    >
                      {/* Product Thumbnail & Info */}
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="relative group/thumb shrink-0 cursor-pointer">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-12 h-16 object-cover rounded-xl border border-gold-400 shadow-sm group-hover/thumb:opacity-75 transition-opacity"
                          />
                          <label
                            className="absolute inset-0 bg-black/60 rounded-xl opacity-0 group-hover/thumb:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[9px] font-bold p-1 text-center cursor-pointer"
                            title="Nhấp để đổi ảnh bìa"
                          >
                            <Camera className="w-3.5 h-3.5 mb-0.5 text-gold-400" />
                            Đổi ảnh
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleReplaceProductImage(p.id, e)}
                            />
                          </label>
                        </div>

                        <div className="min-w-0">
                          <h4 className="font-black text-xs sm:text-sm text-white truncate leading-tight">
                            {p.name}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px]">
                            <span className="font-black text-gold-400">{formatCurrency(p.salePrice)}</span>
                            <span className="text-cream/40 line-through font-semibold">{formatCurrency(p.originalPrice)}</span>
                            {p.badge && (
                              <span className="px-2 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-bold">
                                {p.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-cream/50 font-semibold block mt-0.5">
                            Loại: {p.type === 'software' ? 'Phần mềm' : p.type === 'book' ? 'Sách in' : p.type === 'ebook' ? 'Ebook' : 'Combo'}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-white/10">
                        <label className="p-2 rounded-xl bg-gold-500/20 text-gold-300 font-bold text-xs hover:bg-gold-500/30 transition-colors flex items-center gap-1 cursor-pointer">
                          <Upload className="w-3.5 h-3.5 text-gold-400" />
                          <span>Đổi ảnh</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleReplaceProductImage(p.id, e)}
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => {
                            const newPriceStr = prompt(`Nhập giá bán mới cho "${p.name}" (VNĐ):`, p.salePrice.toString());
                            if (newPriceStr) {
                              const newPrice = parseInt(newPriceStr, 10);
                              if (!isNaN(newPrice) && newPrice > 0) {
                                updateProduct({ ...p, salePrice: newPrice });
                              }
                            }
                          }}
                          className="p-2 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-colors flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-amber-300" /> Sửa giá
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Bạn có chắc muốn xóa "${p.name}"?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-2 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition-colors"
                          title="Xóa sản phẩm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: CREATE NEW PRODUCT */}
              {activeTab === 'create' && (
                <form onSubmit={handleSubmitNewProduct} className="flex-1 overflow-y-auto space-y-3.5 pr-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-amber-200 mb-1">Tên Sách / Phần Mềm / Ebook *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Sách Communication English Starter 2026"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-500/30 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-amber-200 mb-1">Danh mục</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-500/30 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                      >
                        <option value="Sách tiếng Anh">Sách tiếng Anh</option>
                        <option value="Sách tiếng Trung">Sách tiếng Trung</option>
                        <option value="Ebook tiếng Anh">Ebook tiếng Anh</option>
                        <option value="Phần mềm tiếng Anh">Phần mềm tiếng Anh</option>
                        <option value="Phần mềm tiếng Trung">Phần mềm tiếng Trung</option>
                        <option value="Combo ưu đãi">Combo ưu đãi</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-amber-200 mb-1">Loại sản phẩm</label>
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value as ProductType)}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-500/30 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                      >
                        <option value="book">Sách giấy in</option>
                        <option value="ebook">File Ebook PDF</option>
                        <option value="software">Phần mềm App</option>
                        <option value="combo">Gói Combo trọn bộ</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-amber-200 mb-1">Giá bán ưu đãi (VNĐ) *</label>
                      <input
                        type="number"
                        required
                        value={salePrice}
                        onChange={(e) => setSalePrice(Number(e.target.value))}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-500/30 text-xs font-bold text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-amber-200 mb-1">Giá gốc ban đầu (VNĐ)</label>
                      <input
                        type="number"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(Number(e.target.value))}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-500/30 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-amber-200 mb-1">Nhãn Badge nổi bật</label>
                      <select
                        value={badge}
                        onChange={(e) => setBadge(e.target.value as any)}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-500/30 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                      >
                        <option value="Mới">Mới</option>
                        <option value="Bán chạy">Bán chạy</option>
                        <option value="Hot">Hot</option>
                        <option value="Ưu đãi">Ưu đãi</option>
                        <option value="Độc quyền">Độc quyền</option>
                        <option value="">Không dùng nhãn</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-amber-200 mb-1">Ngôn ngữ</label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as Language)}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-500/30 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                      >
                        <option value="English">Tiếng Anh</option>
                        <option value="Chinese">Tiếng Trung</option>
                        <option value="Both">Cả 2 Ngôn ngữ</option>
                      </select>
                    </div>
                  </div>

                  {/* IMAGE UPLOAD SECTION */}
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-gold-500/30 space-y-2.5">
                    <label className="block text-xs font-bold text-amber-200 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-gold-400" /> Tải Bìa Sách / Ảnh Sản Phẩm *
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <div>
                        <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-warm-500 hover:from-gold-400 hover:to-warm-400 text-darkbrown font-black text-xs shadow flex items-center justify-center gap-2 border border-amber-200">
                          <Upload className="w-4 h-4" /> Tải ảnh từ máy tính
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div>
                        <span className="text-[11px] text-cream/60 font-semibold">hoặc Dán URL ảnh:</span>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="w-full mt-1 px-3 py-1.5 rounded-lg bg-black/40 border border-gold-500/30 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {imageUrl && (
                      <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                        <img src={imageUrl} alt="Preview" className="w-14 h-18 object-cover rounded-lg border border-gold-400 shadow" />
                        <span className="text-xs text-emerald-400 font-bold">Xem trước ảnh đã tải lên</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amber-200 mb-1">Mô tả ngắn sản phẩm</label>
                    <textarea
                      rows={2}
                      placeholder="Mô tả tóm tắt nội dung cuốn sách hay phần mềm..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-500/30 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amber-200 mb-1">Các điểm nổi bật (phân cách bằng dấu phẩy)</label>
                    <input
                      type="text"
                      placeholder="Đồng giá 80k, Mua 4 tặng 2, Tặng kèm audio nghe"
                      value={features}
                      onChange={(e) => setFeatures(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-500/30 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-gold-500 via-warm-500 to-gold-400 hover:from-gold-400 hover:to-warm-600 text-darkbrown font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                  >
                    <Sparkles className="w-4 h-4" /> Đăng Sản Phẩm Mới Ngay
                  </button>
                </form>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
