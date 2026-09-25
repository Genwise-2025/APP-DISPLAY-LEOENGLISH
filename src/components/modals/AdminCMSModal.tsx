import React, { useState, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { Product, Language, ProductType } from '../../types/product';
import { X, Plus, Trash2, Edit3, Image as ImageIcon, Upload, ShieldCheck, Sparkles, Lock, LogOut, CheckCircle2, KeyRound, Eye, EyeOff, Camera } from 'lucide-react';
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
  } = useCart();

  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');
  
  // Login Form State
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Selected Product for Image Replacement
  const [editingImageProductId, setEditingImageProductId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    }
  };

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
        setEditingImageProductId(null);
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

  if (!isAdminOpen) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[75] bg-darkbrown/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        onClick={() => setIsAdminOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative w-full max-w-3xl bg-[#FFF9EF] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-gold-400 my-6 text-darkbrown overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsAdminOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full text-darkbrown/60 hover:text-darkbrown hover:bg-gold-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-amber-200 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-gold-500 to-warm-400 text-darkbrown flex items-center justify-center font-bold shadow">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-lg text-darkbrown flex items-center gap-1.5">
                  Bảng Quản Lý Admin LEO CMS
                </h3>
                <p className="text-xs text-darkbrown/70 font-semibold">
                  Đăng nhập Email & Mật khẩu Admin để chỉnh sửa nội dung
                </p>
              </div>
            </div>

            {isAdminAuthenticated && (
              <button
                type="button"
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-700 font-bold text-xs hover:bg-rose-200 transition-colors flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" /> Đăng xuất
              </button>
            )}
          </div>

          {/* UNAUTHENTICATED ADMIN LOGIN SCREEN */}
          {!isAdminAuthenticated ? (
            <div className="py-6 max-w-md mx-auto text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-warm-100 text-warm-600 mx-auto flex items-center justify-center border border-warm-300">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-black text-xl text-darkbrown">Đăng Nhập Quản Trị Viên</h4>
                <p className="text-xs text-darkbrown/75 font-medium mt-1">
                  Nhập Email và Mật khẩu Admin để truy cập Bảng điều khiển CMS.
                </p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-3 pt-2 text-left">
                <div>
                  <label className="block text-xs font-bold text-darkbrown mb-1">Email Admin *</label>
                  <input
                    type="email"
                    required
                    placeholder="nguyentoandinh.0511@gmail.com"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold-300 text-xs font-bold text-darkbrown focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-darkbrown mb-1 flex items-center gap-1">
                    <KeyRound className="w-3.5 h-3.5 text-warm-500" /> Mật khẩu Admin *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Mật khẩu Admin"
                      value={inputPassword}
                      onChange={(e) => setInputPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold-300 text-xs font-bold text-darkbrown focus:outline-none focus:ring-2 focus:ring-gold-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-darkbrown/50 hover:text-darkbrown"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-500 to-warm-500 hover:from-gold-400 hover:to-warm-600 text-darkbrown font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" /> Đăng Nhập Admin CMS
                </button>
              </form>
            </div>
          ) : (
            /* AUTHENTICATED ADMIN FULL CMS DASHBOARD */
            <div>
              {/* Status Bar */}
              <div className="mb-4 p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Đã xác thực Admin: <strong>{adminEmail}</strong></span>
                </div>
                <span className="text-[10px] bg-emerald-700 text-white px-2 py-0.5 rounded-full uppercase">Quyền Chỉnh Sửa</span>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-amber-200 mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('create')}
                  className={`py-2.5 px-4 text-xs sm:text-sm font-extrabold border-b-2 flex items-center gap-1.5 transition-all ${
                    activeTab === 'create' ? 'border-warm-500 text-warm-600' : 'border-transparent text-darkbrown/60'
                  }`}
                >
                  <Plus className="w-4 h-4" /> Đăng Sản Phẩm / Bài Mới
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('manage')}
                  className={`py-2.5 px-4 text-xs sm:text-sm font-extrabold border-b-2 flex items-center gap-1.5 transition-all ${
                    activeTab === 'manage' ? 'border-warm-500 text-warm-600' : 'border-transparent text-darkbrown/60'
                  }`}
                >
                  <Edit3 className="w-4 h-4" /> Quản Lý Danh Sách ({products.length})
                </button>
              </div>

              {/* TAB 1: CREATE NEW PRODUCT */}
              {activeTab === 'create' && (
                <form onSubmit={handleSubmitNewProduct} className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-darkbrown mb-1">Tên Sách / Phần Mềm / Ebook *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Sách Communication English Starter 2026"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold-300 text-xs font-medium text-darkbrown focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-darkbrown mb-1">Danh mục</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold-300 text-xs font-medium text-darkbrown focus:outline-none focus:ring-2 focus:ring-gold-500"
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
                      <label className="block text-xs font-bold text-darkbrown mb-1">Loại sản phẩm</label>
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value as ProductType)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold-300 text-xs font-medium text-darkbrown focus:outline-none focus:ring-2 focus:ring-gold-500"
                      >
                        <option value="book">Sách giấy in</option>
                        <option value="ebook">File Ebook PDF</option>
                        <option value="software">Phần mềm App</option>
                        <option value="combo">Gói Combo trọn bộ</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-darkbrown mb-1">Giá bán ưu đãi (VNĐ) *</label>
                      <input
                        type="number"
                        required
                        value={salePrice}
                        onChange={(e) => setSalePrice(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold-300 text-xs font-bold text-warm-600 focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-darkbrown mb-1">Giá gốc ban đầu (VNĐ)</label>
                      <input
                        type="number"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold-300 text-xs font-medium text-darkbrown focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-darkbrown mb-1">Nhãn Badge nổi bật</label>
                      <select
                        value={badge}
                        onChange={(e) => setBadge(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold-300 text-xs font-medium text-darkbrown focus:outline-none focus:ring-2 focus:ring-gold-500"
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
                      <label className="block text-xs font-bold text-darkbrown mb-1">Ngôn ngữ</label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as Language)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold-300 text-xs font-medium text-darkbrown focus:outline-none focus:ring-2 focus:ring-gold-500"
                      >
                        <option value="English">Tiếng Anh</option>
                        <option value="Chinese">Tiếng Trung</option>
                        <option value="Both">Cả 2 Ngôn ngữ</option>
                      </select>
                    </div>
                  </div>

                  {/* IMAGE UPLOAD SECTION */}
                  <div className="p-4 rounded-2xl bg-white border border-gold-300 space-y-3">
                    <label className="block text-xs font-bold text-darkbrown flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-warm-500" /> Tải Bìa Sách / Ảnh Sản Phẩm *
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <div>
                        <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-darkbrown font-black text-xs shadow flex items-center justify-center gap-2 border border-amber-200">
                          <Upload className="w-4 h-4" /> Tải ảnh từ máy tính
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="text-center sm:text-left">
                        <span className="text-[11px] text-darkbrown/60 font-semibold">hoặc Dán URL ảnh:</span>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="w-full mt-1 px-3 py-1.5 rounded-lg bg-cream border border-gold-200 text-xs text-darkbrown focus:outline-none"
                        />
                      </div>
                    </div>

                    {imageUrl && (
                      <div className="flex items-center gap-3 pt-2 border-t border-amber-100">
                        <img src={imageUrl} alt="Preview" className="w-16 h-20 object-cover rounded-lg border border-gold-400 shadow" />
                        <span className="text-xs text-emerald-700 font-bold">Xem trước ảnh đã tải lên</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-darkbrown mb-1">Mô tả ngắn sản phẩm</label>
                    <textarea
                      rows={2}
                      placeholder="Mô tả tóm tắt nội dung cuốn sách hay phần mềm..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-gold-300 text-xs text-darkbrown focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-darkbrown mb-1">Các điểm nổi bật (phân cách bằng dấu phẩy)</label>
                    <input
                      type="text"
                      placeholder="Đồng giá 80k, Mua 4 tặng 2, Tặng kèm audio nghe"
                      value={features}
                      onChange={(e) => setFeatures(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-gold-300 text-xs text-darkbrown focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-warm-500 hover:from-gold-400 hover:to-warm-600 text-darkbrown font-black text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" /> Đăng Sản Phẩm Mới Ngay
                  </button>
                </form>
              )}

              {/* TAB 2: MANAGE EXISTING PRODUCTS & REPLACE IMAGES */}
              {activeTab === 'manage' && (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  <div className="flex justify-between items-center text-xs font-bold text-darkbrown/70 pb-2 border-b border-amber-200">
                    <span>Danh sách {products.length} sản phẩm trên web</span>
                    <span>Thao tác chỉnh sửa ảnh & giá</span>
                  </div>

                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-2xl bg-white border border-gold-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      {/* Product Thumbnail & Info */}
                      <div className="flex items-center gap-3.5 min-w-0 flex-1">
                        {/* Interactive Thumbnail Image replacing trigger */}
                        <div className="relative group/thumb shrink-0 cursor-pointer">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-14 h-18 object-cover rounded-xl border-2 border-gold-300 shadow-sm group-hover/thumb:opacity-75 transition-opacity"
                          />
                          <label
                            className="absolute inset-0 bg-darkbrown/60 rounded-xl opacity-0 group-hover/thumb:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[9px] font-bold p-1 text-center cursor-pointer"
                            title="Nhấp để đổi ảnh bìa này"
                          >
                            <Camera className="w-4 h-4 mb-0.5 text-gold-400" />
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
                          <h4 className="font-black text-xs sm:text-sm text-darkbrown truncate leading-tight">
                            {p.name}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px]">
                            <span className="font-black text-warm-600">{formatCurrency(p.salePrice)}</span>
                            <span className="text-darkbrown/50 line-through font-semibold">{formatCurrency(p.originalPrice)}</span>
                            {p.badge && (
                              <span className="px-2 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-bold">
                                {p.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-darkbrown/60 font-semibold block mt-0.5">
                            Loại: {p.type === 'software' ? 'Phần mềm' : p.type === 'book' ? 'Sách in' : p.type === 'ebook' ? 'Ebook' : 'Combo'}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-amber-100">
                        {/* Replace Image Button */}
                        <label className="p-2 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs hover:bg-amber-200 transition-colors flex items-center gap-1 cursor-pointer">
                          <Upload className="w-3.5 h-3.5 text-warm-600" />
                          <span>Đổi ảnh</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleReplaceProductImage(p.id, e)}
                          />
                        </label>

                        {/* Edit Price Button */}
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
                          className="p-2 rounded-xl bg-gold-100 text-darkbrown font-bold text-xs hover:bg-gold-200 transition-colors flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Sửa giá
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Bạn có chắc muốn xóa "${p.name}"?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-2 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors"
                          title="Xóa sản phẩm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
