import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Search, Menu, X, BookOpen, ShieldCheck, User, LogOut, Mail, CheckCircle2 } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

export const Header: React.FC = () => {
  const { 
    totalItems, 
    setIsCartOpen, 
    searchQuery, 
    setSearchQuery, 
    setActiveCategory, 
    setIsAdminOpen, 
    isAdminAuthenticated, 
    adminEmail, 
    logoutAdmin, 
    navigateToView,
    currentStudentEmail,
    isStudentApproved,
    setIsStudentAuthModalOpen
  } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (categoryFilter?: string, targetId?: string) => {
    if (categoryFilter) {
      setActiveCategory(categoryFilter);
    }
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* BRAND LOGO */}
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => {
                navigateToView('home');
                setActiveCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-gold-500 via-warm-400 to-honey flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-amber-200">
                <BookOpen className="w-5 h-5 text-darkbrown font-black" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg sm:text-xl tracking-tight text-darkbrown flex items-center gap-1 leading-none">
                  LEO <span className="text-warm-500 font-black">EDUCATION</span>
                </span>
                <span className="text-[10px] text-warm-700 tracking-wider uppercase font-bold">Smart EdTech & Bookstore</span>
              </div>
            </div>

            {/* DESKTOP NAVIGATION LINKS */}
            <nav className="hidden lg:flex items-center gap-4 text-xs xl:text-sm font-bold text-darkbrown">
              <button
                type="button"
                onClick={() => {
                  navigateToView('home');
                  handleNavClick('all');
                }}
                className="hover:text-warm-500 transition-colors py-1 relative group"
              >
                Trang chủ
              </button>

              {/* DEDICATED 3 BOOK GROUPS QUICK NAV */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => navigateToView('1000-cau')}
                  className="hover:text-emerald-700 transition-colors py-1 relative group flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 text-emerald-900 rounded-xl border border-emerald-400/80 font-black shadow-sm hover:shadow"
                  title="Trang riêng Nhóm 1: 1000 Câu Phản Xạ"
                >
                  <span>📗 1000 Câu</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigateToView('nhom-2')}
                  className="hover:text-amber-800 transition-colors py-1 relative group flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-amber-500/15 to-yellow-500/15 text-amber-950 rounded-xl border border-amber-400/80 font-black shadow-sm hover:shadow"
                  title="Trang riêng Nhóm 2: Community 390"
                >
                  <span>⭐ Nhóm 2 (Community 390)</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigateToView('nhom-3')}
                  className="hover:text-purple-800 transition-colors py-1 relative group flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-purple-500/15 to-indigo-500/15 text-purple-950 rounded-xl border border-purple-400/80 font-black shadow-sm hover:shadow"
                  title="Trang riêng Nhóm 3: Combo VIP L299"
                >
                  <span>💎 Nhóm 3 (Combo VIP)</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleNavClick(undefined, 'app-showcase')}
                className="hover:text-warm-500 transition-colors py-1 relative group flex items-center gap-1 text-warm-600 font-black"
              >
                <span>📱 Ứng Dụng VIP</span>
                <span className="px-1.5 py-0.2 bg-rose-500 text-[9px] text-white font-black rounded-full">Sale sốc</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('Chinese', 'app-showcase')}
                className="hover:text-warm-500 transition-colors py-1 relative group"
              >
                MandaLeo 299k
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('English', 'app-showcase')}
                className="hover:text-warm-500 transition-colors py-1 relative group"
              >
                Leo Pro 1.290k
              </button>
              <button
                type="button"
                onClick={() => handleNavClick(undefined, 'kho-sach')}
                className="hover:text-warm-500 transition-colors py-1 relative group flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-500/15 via-gold-500/20 to-warm-500/15 text-warm-800 rounded-xl border border-amber-300/80 font-black shadow-sm hover:shadow"
              >
                <span>📚 Kho Tải Sách</span>
                <span className="px-1.5 py-0.2 bg-gradient-to-r from-gold-500 to-warm-500 text-[9px] text-white font-black rounded-full shadow-sm animate-pulse">
                  Mã VIP Học Viên
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('all', 'products-section')}
                className="hover:text-warm-500 transition-colors py-1 relative group"
              >
                Cửa hàng
              </button>
              <a
                href="https://catalog.zalo.me/?cid=CDd8JZoPdmrJrgrSM9UBSYIjerTHu_K7Ei7OL3_--nawlg1FDOFwOm"
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 hover:text-blue-900 transition-colors py-1 font-extrabold flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200"
              >
                <span>Zalo Catalog</span>
              </a>
              <button
                type="button"
                onClick={() => handleNavClick(undefined, 'benefits-section')}
                className="hover:text-warm-500 transition-colors py-1 relative group"
              >
                Về chúng tôi
              </button>
              <button
                type="button"
                onClick={() => handleNavClick(undefined, 'faq-section')}
                className="hover:text-warm-500 transition-colors py-1 relative group"
              >
                Liên hệ
              </button>
            </nav>

            {/* ACTION BUTTONS & SEARCH */}
            <div className="flex items-center gap-3">
              {/* Search Bar Input */}
              <div className="relative">
                {isSearchExpanded ? (
                  <div className="flex items-center bg-white/90 rounded-full px-3 py-1.5 border border-gold-400 shadow-md">
                    <Search className="w-4 h-4 text-warm-500 mr-2" />
                    <input
                      type="text"
                      placeholder="Tìm sách, ebook, phần mềm..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-xs text-darkbrown placeholder:text-darkbrown/50 focus:outline-none w-44 sm:w-56"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setIsSearchExpanded(false)}
                      className="text-darkbrown/60 hover:text-darkbrown ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchExpanded(true);
                      handleNavClick(undefined, 'products-section');
                    }}
                    className="p-2.5 rounded-full hover:bg-gold-200/50 text-darkbrown transition-colors"
                    title="Tìm kiếm sản phẩm"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Student Gmail Auth Trigger Button */}
              {isStudentApproved ? (
                <button
                  type="button"
                  onClick={() => setIsStudentAuthModalOpen(true)}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400 text-emerald-800 text-xs font-bold transition-all shadow-sm hover:bg-emerald-500/25"
                  title="Học viên đã được duyệt tải sách"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="max-w-[120px] truncate">{currentStudentEmail || 'Học Viên VIP'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsStudentAuthModalOpen(true)}
                  className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-gold-500/25 to-warm-500/20 hover:from-amber-500/30 hover:to-warm-500/30 text-darkbrown border border-gold-400/80 text-xs font-black transition-all shadow-sm hover:scale-105"
                  title="Nhập Gmail để nhận quyền tải sách bản quyền"
                >
                  <Mail className="w-3.5 h-3.5 text-warm-600" />
                  <span>Gmail Tải Sách</span>
                </button>
              )}

              {/* Cart Drawer Trigger Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-gradient-to-tr from-gold-500/20 to-warm-400/20 hover:from-gold-500 hover:to-warm-400 text-darkbrown transition-all shadow-sm group"
                title="Giỏ hàng"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-warm-500 text-white font-black text-[11px] flex items-center justify-center shadow-md animate-bounce">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Admin CMS Trigger / Login Button */}
              {isAdminAuthenticated ? (
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAdminOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-700 to-emerald-900 text-gold-300 font-extrabold text-xs shadow-md border border-emerald-400/40"
                    title={`Admin: ${adminEmail}`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Admin CMS
                  </button>
                  <button
                    type="button"
                    onClick={logoutAdmin}
                    className="p-1.5 rounded-full hover:bg-rose-100 text-rose-700 transition-colors"
                    title="Đăng xuất Admin"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAdminOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-darkbrown to-darkbrown-deep hover:from-warm-700 hover:to-darkbrown text-gold-400 font-extrabold text-xs shadow-md transition-all border border-gold-500/40"
                  title="Đăng nhập Admin (nguyentoandinh.0511@gmail.com)"
                >
                  <User className="w-3.5 h-3.5" />
                  Đăng nhập Admin
                </button>
              )}

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-darkbrown hover:bg-gold-200/50"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavClick={handleNavClick}
      />
    </>
  );
};
