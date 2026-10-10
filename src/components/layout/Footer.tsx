import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { BookOpen, PhoneCall, Mail, Send, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { addToast, setActiveCategory } = useCart();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    addToast('Đăng ký nhận ưu đãi thành công!', 'Bạn sẽ nhận được thông báo về các đầu sách và voucher mới nhất.');
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-b from-darkbrown to-darkbrown-deep text-cream pt-16 pb-8 border-t-4 border-gold-500 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gold-500/20">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo-book-vip.png"
                alt="Book VIP Leo"
                className="w-12 h-12 rounded-2xl border-2 border-gold-400 shadow-xl object-cover"
              />
              <div className="flex flex-col">
                <span className="font-black text-xl text-gold-400 tracking-tight leading-tight">
                  LEO <span className="text-warm-400">EDUCATION</span>
                </span>
                <span className="text-[10px] text-amber-200/80 uppercase tracking-widest font-bold">Book VIP & Smart EdTech</span>
              </div>
            </div>

            <p className="text-xs text-cream/80 leading-relaxed font-medium max-w-sm">
              Hệ sinh thái sản phẩm giáo dục ngoại ngữ (Tiếng Anh - Tiếng Trung) hiện đại bậc nhất cho người Việt. Mô hình 3D trực quan, sách in màu cao cấp và phần mềm AI học tập trọn đời.
            </p>

              <div className="space-y-2 text-xs text-amber-200/90 font-medium">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-gold-400" />
                  <span>Zalo Thầy Leo hỗ trợ: <strong className="text-gold-300 font-bold">0799713094</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gold-400" />
                  <span>Gmail Admin Duyệt Sách: <strong className="text-gold-300 font-bold font-mono">nguyentoandinh.0511@gmail.com</strong></span>
                </div>
              </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold-500 hover:text-darkbrown text-amber-200 flex items-center justify-center transition-colors font-bold text-xs"
              >
                FB
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold-500 hover:text-darkbrown text-amber-200 flex items-center justify-center transition-colors font-bold text-xs"
              >
                TT
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold-500 hover:text-darkbrown text-amber-200 flex items-center justify-center transition-colors font-bold text-xs"
              >
                YT
              </a>
              <a
                href="https://zalo.me/0799713094"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-extrabold text-[10px] shadow"
              >
                ZALO
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-extrabold text-sm text-gold-400 uppercase tracking-wider mb-4">Danh Mục Sản Phẩm</h4>
            <ul className="space-y-2.5 text-xs text-cream/80 font-medium">
              <li>
                <button type="button" onClick={() => setActiveCategory('English')} className="hover:text-gold-300 transition-colors">
                  Sách Tiếng Anh Giao Tiếp
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveCategory('Chinese')} className="hover:text-gold-300 transition-colors">
                  Sách Tiếng Trung HSK
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveCategory('ebook')} className="hover:text-gold-300 transition-colors">
                  Thư Viện Ebook Tương Tác
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveCategory('software')} className="hover:text-gold-300 transition-colors">
                  Phần Mềm MandaLeo HSK
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveCategory('combo')} className="hover:text-gold-300 transition-colors">
                  Combo Ưu Đãi Trọn Đời
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Policy */}
          <div>
            <h4 className="font-extrabold text-sm text-gold-400 uppercase tracking-wider mb-4">Chính Sách & Hỗ Trợ</h4>
            <ul className="space-y-2.5 text-xs text-cream/80 font-medium">
              <li><a href="#benefits-section" className="hover:text-gold-300 transition-colors">Chính sách giao nhận</a></li>
              <li><a href="#benefits-section" className="hover:text-gold-300 transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#benefits-section" className="hover:text-gold-300 transition-colors">Điều khoản sử dụng</a></li>
              <li><a href="#faq-section" className="hover:text-gold-300 transition-colors">Hướng dẫn kích hoạt app</a></li>
              <li><a href="#faq-section" className="hover:text-gold-300 transition-colors">Quy định đổi trả 1:1</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-extrabold text-sm text-gold-400 uppercase tracking-wider mb-4">Đăng Ký Nhận Ưu Đãi</h4>
            <p className="text-xs text-cream/80 font-medium mb-3">
              Nhận ngay mã giảm giá 10% cho đơn hàng đầu tiên.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Nhập email của bạn..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-gold-500/30 text-xs text-white placeholder:text-cream/50 focus:outline-none focus:ring-1 focus:ring-gold-400"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-warm-500 hover:from-gold-400 hover:to-warm-600 text-darkbrown font-black text-xs shadow transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Đăng Ký
              </button>
            </form>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60 font-medium text-center sm:text-left">
          <div>
            © 2026 LEO EDUCATION. Bản quyền thuộc về thương hiệu LEO EDUCATION.
          </div>

          <div className="flex items-center gap-1">
            <span>Thiết kế với</span>
            <Heart className="w-3.5 h-3.5 text-warm-500 fill-current" />
            <span>cho người học Việt Nam</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
