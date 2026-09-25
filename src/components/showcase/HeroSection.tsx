import React from 'react';
import { useCart } from '../../context/CartContext';
import { AppDeviceMockup } from '../UI/AppDeviceMockup';
import { CSS3DBook } from '../UI/CSS3DBook';
import { Sparkles, ArrowRight, Flame, BookOpen, Volume2, Video, PhoneCall, Gift, CheckCircle2, ExternalLink, Zap, Globe2, Laptop } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const { setIsPromoModalOpen } = useCart();

  const scrollToAppShowcase = () => {
    const el = document.getElementById('app-showcase');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP FLASH DEAL NOTIFICATION BANNER */}
        <div className="mb-6 p-3 rounded-2xl bg-gradient-to-r from-warm-500 via-gold-500 to-warm-600 text-darkbrown font-extrabold text-xs sm:text-sm shadow-md border border-amber-200 flex flex-wrap items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-darkbrown animate-bounce" />
            <span>
              🔥 <strong>FLASH SALE APP NGOẠI NGỮ:</strong> MandaLeo 299k | Leo Pro 1.290k (gốc 2,3tr) | Leo 10 299k | 1000 Phản Xạ 30k!
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://catalog.zalo.me/?cid=CDd8JZoPdmrJrgrSM9UBSYIjerTHu_K7Ei7OL3_--nawlg1FDOFwOm"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-1 bg-darkbrown text-gold-300 px-3 py-1 rounded-full text-xs font-black hover:bg-darkbrown-light transition-colors"
            >
              <ExternalLink className="w-3 h-3 text-gold-400" />
              <span>Catalog Zalo Chính Hãng</span>
            </a>
            <a
              href="https://zalo.me/0799713094"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 rounded-xl bg-white text-darkbrown font-black text-xs flex items-center gap-1 shadow-sm hover:scale-105 transition-transform"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              Zalo: 0799713094
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT CONTENT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Top Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-gold-500/20 via-warm-400/20 to-honey-light/40 border border-gold-400/50 shadow-sm mb-5">
              <span className="w-2 h-2 rounded-full bg-warm-500 animate-ping" />
              <span className="text-xs font-extrabold text-darkbrown uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-warm-500" /> Hệ Sinh Thái App Tiếng Anh & Tiếng Trung
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-darkbrown leading-[1.2] tracking-tight">
              Trưng bày các ứng dụng{' '}
              <span className="bg-gradient-to-r from-gold-600 via-warm-500 to-warm-700 bg-clip-text text-transparent">
                Tiếng Anh & Tiếng Trung
              </span>{' '}
              hiện đại nhất
            </h1>

            {/* Subheadline */}
            <p className="mt-3 text-base sm:text-lg text-darkbrown/85 font-medium leading-relaxed max-w-xl">
              Luyện phản xạ giao tiếp tự nhiên cùng AI chấm phát âm chuẩn giọng bản xứ.
              Sở hữu bản quyền vĩnh viễn trên Smartphone và Máy tính!
            </p>

            {/* SPECIAL PRICING HIGHLIGHT BOX - 4 APPS DIRECTLY MATCHING USER REQUEST */}
            <div className="mt-5 p-4 rounded-3xl bg-white/95 border-2 border-gold-300 shadow-sm w-full space-y-2.5 text-xs sm:text-sm font-bold text-darkbrown">
              <div className="flex items-center justify-between pb-2 border-b border-amber-200/60">
                <span className="text-[11px] uppercase tracking-wider font-black text-warm-600 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-warm-500" /> Bảng giá khuyến mãi siêu ứng dụng:
                </span>
                <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-extrabold">
                  Tiết kiệm đến 80%
                </span>
              </div>

              {/* App 1: MandaLeo */}
              <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl hover:bg-gold-50/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center text-xs shrink-0 font-black">中</span>
                  <span className="truncate"><strong>App MandaLeo (Tiếng Trung HSK 1–6):</strong></span>
                </div>
                <div className="shrink-0 flex items-baseline gap-1.5">
                  <span className="text-xs text-darkbrown/50 line-through">699k</span>
                  <span className="text-sm font-black text-warm-600 bg-warm-100 px-2 py-0.5 rounded-lg">299k</span>
                </div>
              </div>

              {/* App 2: Leo English Pro */}
              <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl hover:bg-gold-50/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs shrink-0 font-black">👑</span>
                  <span className="truncate"><strong>App Leo English Pro (Full Level + 4 Sách):</strong></span>
                </div>
                <div className="shrink-0 flex items-baseline gap-1.5">
                  <span className="text-xs text-darkbrown/50 line-through">2,3 triệu</span>
                  <span className="text-sm font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-lg">1,290 triệu</span>
                </div>
              </div>

              {/* App 3: Leo 10 */}
              <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl hover:bg-gold-50/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs shrink-0 font-black">🚀</span>
                  <span className="truncate"><strong>App LEO 10 (10 Cấp Độ Phản Xạ):</strong></span>
                </div>
                <div className="shrink-0 flex items-baseline gap-1.5">
                  <span className="text-xs text-darkbrown/50 line-through">599k</span>
                  <span className="text-sm font-black text-warm-600 bg-warm-100 px-2 py-0.5 rounded-lg">299k</span>
                </div>
              </div>

              {/* App 4: LeoEnglish 1000 Phản Xạ */}
              <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl hover:bg-gold-50/70 transition-colors">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs shrink-0 font-black">⚡</span>
                  <span className="truncate"><strong>App LeoEnglish 1000 Phản Xạ Thực Chiến:</strong></span>
                </div>
                <div className="shrink-0 flex items-baseline gap-1.5">
                  <span className="text-xs text-darkbrown/50 line-through">150k</span>
                  <span className="text-sm font-black text-rose-600 bg-rose-100 px-2 py-0.5 rounded-lg">30k</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={scrollToAppShowcase}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 via-warm-400 to-warm-500 hover:from-gold-400 hover:to-warm-600 text-darkbrown font-black text-sm shadow-glow-warm hover:scale-105 transition-all flex items-center justify-center gap-2 group border border-amber-200"
              >
                Khám Phá Chi Tiết Các App
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://catalog.zalo.me/?cid=CDd8JZoPdmrJrgrSM9UBSYIjerTHu_K7Ei7OL3_--nawlg1FDOFwOm"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Xem Trên Zalo Catalog</span>
              </a>
            </div>

            {/* Teacher Zalo Contact Callout */}
            <div className="mt-6 pt-4 border-t border-amber-200/60 flex items-center gap-4 w-full">
              <a
                href="https://zalo.me/0799713094"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-white text-darkbrown border border-gold-300 font-extrabold text-xs flex items-center gap-2 shadow-sm hover:scale-105 transition-transform"
              >
                <PhoneCall className="w-4 h-4 text-warm-500" />
                <span>Cần tư vấn app hay sách, nhắn ngay Thầy Leo: <strong>0799713094</strong></span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT 3D SHOWCASE CLUSTER COLUMN */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-6 relative flex justify-center items-center min-h-[460px] sm:min-h-[520px]"
          >
            {/* Background Halo Aura Light */}
            <div className="absolute w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] rounded-full bg-gradient-to-tr from-gold-500/30 via-warm-400/25 to-honey-light/40 blur-[70px] animate-pulse-glow" />

            {/* Floating Promo Badge */}
            <div className="absolute top-2 right-2 sm:right-6 bg-gradient-to-r from-warm-600 to-gold-500 text-white p-3 sm:p-4 rounded-2xl shadow-2xl z-30 border border-amber-200 animate-float flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-100">LEO ENGLISH PRO</span>
              <span className="text-xl sm:text-2xl font-black tracking-tight drop-shadow">1.290.000 VNĐ</span>
              <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full mt-1 font-semibold">Gốc: 2.300.000đ (-44%)</span>
            </div>

            {/* Floating EdTech Capability Icons around products */}
            <div className="absolute top-12 left-0 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl border border-gold-300 shadow-md flex items-center gap-2 z-20 animate-float">
              <div className="p-1.5 rounded-lg bg-warm-100 text-warm-600">
                <Volume2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-darkbrown">AI Chấm Phát Âm Chuẩn</span>
            </div>

            <div className="absolute bottom-12 left-2 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl border border-gold-300 shadow-md flex items-center gap-2 z-20 animate-float-slow" style={{ animationDelay: '1.8s' }}>
              <div className="p-1.5 rounded-lg bg-rose-100 text-rose-700 font-black text-xs">
                中
              </div>
              <span className="text-xs font-bold text-darkbrown">MandaLeo HSK: 299k</span>
            </div>

            <div className="absolute bottom-4 right-10 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl border border-gold-300 shadow-md flex items-center gap-2 z-20 animate-float" style={{ animationDelay: '3s' }}>
              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-darkbrown">1000 Phản Xạ: 30k</span>
            </div>

            {/* 3D APPS & BOOKS STACK PRESENTATION */}
            <div className="relative w-full max-w-lg flex items-center justify-center">
              {/* Smartphone Frame in the front */}
              <div className="relative z-20 transform -rotate-3 hover:rotate-0 transition-transform">
                <AppDeviceMockup
                  title="App Leo English Pro"
                  subtitle="Mở khóa toàn bộ 5 Level"
                  coverImage="/images/zalo/leo-pro-1.jpg"
                  appType="pro"
                  device="phone"
                  interactiveAudio={true}
                />
              </div>

              {/* Second Smartphone / Book Peek in the back */}
              <div className="relative z-10 -ml-16 transform rotate-6 hover:rotate-0 transition-transform">
                <AppDeviceMockup
                  title="App MandaLeo Tiếng Trung"
                  subtitle="Chinh phục HSK 1–6"
                  coverImage="/images/zalo/mandaleo-1.jpg"
                  appType="mandaleo"
                  language="Chinese"
                  device="phone"
                  interactiveAudio={true}
                />
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
