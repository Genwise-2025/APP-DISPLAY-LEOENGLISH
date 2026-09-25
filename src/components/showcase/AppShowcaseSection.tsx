import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { AppDeviceMockup } from '../UI/AppDeviceMockup';
import { Product } from '../../types/product';
import {
  Sparkles,
  ShoppingBag,
  ExternalLink,
  Flame,
  CheckCircle2,
  PhoneCall,
  Volume2,
  ShieldCheck,
  Star,
  Layers,
  ArrowRight,
  Gift,
  Zap,
  Globe2,
  Laptop
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const AppShowcaseSection: React.FC = () => {
  const { products, addToCart, setActiveProduct, addToast } = useCart();

  // Find the 4 focal apps
  const appPro = products.find((p) => p.id === 'prod-leo-english-pro') || products[0];
  const appMandaleo = products.find((p) => p.id === 'prod-mandaleo-chinese-software') || products[1];
  const appLeo10 = products.find((p) => p.id === 'prod-leo-10-software') || products[2];
  const app1000 = products.find((p) => p.id === 'prod-leoenglish-1000-phan-xa') || products[3];

  const focalApps = [appPro, appMandaleo, appLeo10, app1000].filter(Boolean);

  const [selectedAppId, setSelectedAppId] = useState<string>(appPro?.id || 'prod-leo-english-pro');

  const selectedApp = focalApps.find((p) => p.id === selectedAppId) || focalApps[0];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleAddToCartWithConfetti = (product: Product) => {
    addToCart(product);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#F5B700', '#FF8A3D', '#FFC857', '#ea4d0a'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="app-showcase" className="py-20 relative overflow-hidden bg-gradient-to-b from-cream/40 via-white/80 to-cream/30">
      {/* Background Decorative Blur Spheres */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-gold-400/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-warm-500/15 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-warm-500/15 via-gold-500/20 to-warm-500/15 border border-gold-400/40 shadow-sm mb-4">
            <Flame className="w-4 h-4 text-warm-500 animate-bounce" />
            <span className="text-xs font-black text-darkbrown uppercase tracking-wider">
              BỘ TỨ SIÊU ỨNG DỤNG NGOẠI NGỮ 2026
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-darkbrown tracking-tight leading-[1.2]">
            Trưng Bày Hệ Sinh Thái App{' '}
            <span className="bg-gradient-to-r from-warm-600 via-gold-500 to-warm-500 bg-clip-text text-transparent">
              Tiếng Anh & Tiếng Trung
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-darkbrown/85 font-medium leading-relaxed max-w-2xl mx-auto">
            Học thông minh qua ứng dụng di động & máy tính với công nghệ AI sửa phát âm, luyện phản xạ 3 giây chuẩn quốc tế.
            Giá gốc ưu đãi cực sốc, sở hữu tài khoản vĩnh viễn!
          </p>

          {/* Quick Zalo Catalog Link Badge */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://catalog.zalo.me/?cid=CDd8JZoPdmrJrgrSM9UBSYIjerTHu_K7Ei7OL3_--nawlg1FDOFwOm"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 transition-all font-bold text-xs shadow-sm hover:scale-105"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
              <span>Xem Toàn Bộ Catalog Trên Zalo Chính Hãng</span>
            </a>

            <a
              href="https://zalo.me/0799713094"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white text-darkbrown border border-gold-300 hover:bg-gold-50 transition-all font-extrabold text-xs shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5 text-warm-500" />
              <span>Zalo Thầy Leo: 0799713094</span>
            </a>
          </div>
        </div>

        {/* 4 INTERACTIVE TAB PILLS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {focalApps.map((app) => {
            const isSelected = app.id === selectedAppId;
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => setSelectedAppId(app.id)}
                className={`p-4 rounded-3xl text-left transition-all duration-300 relative border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-white via-honey-light/40 to-gold-200/50 border-gold-500 shadow-xl scale-[1.03] ring-2 ring-gold-400'
                    : 'glass-card border-amber-200/70 hover:border-gold-400 hover:bg-white/90 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Active indicator dot */}
                {isSelected && (
                  <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-warm-500 animate-ping" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                      app.language === 'Chinese' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {app.language === 'Chinese' ? '🇨🇳 Tiếng Trung' : '🇬🇧 Tiếng Anh'}
                    </span>

                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-rose-500 text-white">
                      -{app.discount}%
                    </span>
                  </div>

                  <h3 className="font-extrabold text-xs sm:text-sm text-darkbrown line-clamp-1 leading-snug">
                    {app.name.split('–')[0].replace('🔥', '').trim()}
                  </h3>
                </div>

                <div className="mt-3 pt-2 border-t border-amber-200/50 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-darkbrown/60 line-through mr-1 font-semibold">
                      {formatCurrency(app.originalPrice)}
                    </span>
                    <span className="text-sm sm:text-base font-black text-warm-600">
                      {formatCurrency(app.salePrice)}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-warm-700 bg-gold-400/20 px-1.5 py-0.5 rounded">
                    {app.badge || 'Hot'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* SPOTLIGHT HERO CARD */}
        {selectedApp && (
          <motion.div
            key={selectedApp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-[36px] glass-panel border-2 border-gold-400/80 shadow-2xl p-6 sm:p-10 mb-16 relative overflow-hidden"
          >
            {/* Background Glow inside card */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-gold-400/20 via-warm-500/10 to-transparent rounded-bl-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* LEFT COLUMN: 3D DEVICE DISPLAY */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <AppDeviceMockup
                  title={selectedApp.name}
                  subtitle={selectedApp.description}
                  coverImage={selectedApp.images[0]}
                  appType={selectedApp.appType}
                  language={selectedApp.language}
                  device="phone"
                  zaloUrl={selectedApp.zaloCatalogUrl}
                  onPreviewClick={() => setActiveProduct(selectedApp)}
                  interactiveAudio={true}
                />

                {/* Additional screenshots thumbnail strip */}
                {selectedApp.images.length > 1 && (
                  <div className="flex items-center gap-2 mt-4 max-w-full overflow-x-auto py-1">
                    {selectedApp.images.slice(0, 4).map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveProduct(selectedApp)}
                        className="w-12 h-14 rounded-xl overflow-hidden border-2 border-gold-300 hover:border-warm-500 hover:scale-105 transition-all shadow-sm shrink-0"
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setActiveProduct(selectedApp)}
                      className="px-2.5 py-1 rounded-xl bg-gold-200/70 text-darkbrown font-extrabold text-[10px] hover:bg-gold-300 transition-colors shrink-0"
                    >
                      +{selectedApp.images.length - 1} ảnh
                    </button>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: APP HIGHLIGHTS & PRICING */}
              <div className="lg:col-span-7 flex flex-col items-start">
                
                {/* Badges Row */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm flex items-center gap-1 text-white ${
                    selectedApp.language === 'Chinese'
                      ? 'bg-gradient-to-r from-rose-600 to-amber-600'
                      : 'bg-gradient-to-r from-blue-600 to-warm-500'
                  }`}>
                    {selectedApp.language === 'Chinese' ? <Globe2 className="w-3.5 h-3.5" /> : <Laptop className="w-3.5 h-3.5" />}
                    {selectedApp.language === 'Chinese' ? 'Tiếng Trung HSK 1–6' : 'Tiếng Anh Phản Xạ'}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-gold-500/20 text-darkbrown border border-gold-400 font-extrabold text-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-warm-500" />
                    Bản Quyền Sở Hữu Vĩnh Viễn
                  </span>

                  <div className="flex items-center gap-1 text-xs font-bold text-darkbrown bg-white px-2.5 py-1 rounded-full border border-amber-200 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-500" />
                    <span>{selectedApp.rating}</span>
                    <span className="text-darkbrown/60">({selectedApp.sold} học viên)</span>
                  </div>
                </div>

                {/* App Name */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-darkbrown leading-tight tracking-tight">
                  {selectedApp.name}
                </h3>

                {/* Short Description */}
                <p className="mt-3 text-sm sm:text-base text-darkbrown/85 font-medium leading-relaxed">
                  {selectedApp.description}
                </p>

                {/* PRICE HIGHLIGHT BOX */}
                <div className="mt-6 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-gold-50 via-warm-50 to-white border-2 border-gold-400 shadow-md w-full">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-darkbrown/70 uppercase tracking-wider">
                          Giá Gốc Niêm Yết:
                        </span>
                        <span className="text-base sm:text-lg font-bold text-darkbrown/60 line-through decoration-rose-500 decoration-2">
                          {formatCurrency(selectedApp.originalPrice)}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-black text-warm-600 uppercase tracking-wider">
                          Giá Khuyến Mãi:
                        </span>
                        <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-warm-600 via-warm-500 to-gold-600 bg-clip-text text-transparent drop-shadow-sm">
                          {formatCurrency(selectedApp.salePrice)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="px-3 py-1.5 rounded-2xl bg-gradient-to-r from-rose-500 to-warm-500 text-white font-black text-sm shadow-md flex items-center gap-1 animate-pulse">
                        <Zap className="w-4 h-4 fill-white" />
                        Tiết Kiệm {formatCurrency(selectedApp.originalPrice - selectedApp.salePrice)} (-{selectedApp.discount}%)
                      </span>
                      <span className="text-[11px] text-darkbrown/70 font-semibold mt-1">
                        Ưu đãi áp dụng hôm nay
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features Bullet List */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                  {selectedApp.features.slice(0, 6).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-bold text-darkbrown">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* CALL TO ACTION BUTTONS */}
                <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 w-full">
                  {/* Add to Cart */}
                  <button
                    type="button"
                    onClick={() => handleAddToCartWithConfetti(selectedApp)}
                    className="flex-1 min-w-[170px] py-4 px-6 rounded-2xl bg-gradient-to-r from-gold-500 via-warm-400 to-warm-500 hover:from-gold-400 hover:to-warm-600 text-darkbrown font-black text-sm sm:text-base shadow-glow-warm hover:scale-105 transition-all flex items-center justify-center gap-2 group border border-amber-200"
                  >
                    <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Thêm Giỏ Hàng</span>
                  </button>

                  {/* Direct Zalo Catalog Product Link */}
                  {selectedApp.zaloCatalogUrl && (
                    <a
                      href={selectedApp.zaloCatalogUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 min-w-[170px] py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm sm:text-base shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2 group"
                    >
                      <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                      <span>Mua Trên Zalo</span>
                    </a>
                  )}

                  {/* View Details */}
                  <button
                    type="button"
                    onClick={() => setActiveProduct(selectedApp)}
                    className="py-4 px-5 rounded-2xl bg-white hover:bg-gold-50 text-darkbrown font-extrabold text-sm border border-gold-300 shadow-sm hover:scale-105 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Chi Tiết</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Zalo Direct Help Note */}
                <div className="mt-4 pt-3 border-t border-amber-200/60 w-full flex items-center justify-between text-xs text-darkbrown/80 font-bold">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Kích hoạt ngay trong 30 giây qua Zalo
                  </span>

                  <a
                    href="https://zalo.me/0799713094"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> Hotline/Zalo: 0799713094
                  </a>
                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* 4 APPS COMPARISON GRID */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-darkbrown">
                Bảng So Sánh Chi Tiết 4 Ứng Dụng
              </h3>
              <p className="text-xs sm:text-sm text-darkbrown/70 font-medium">
                Giá gốc và giá khuyến mãi được cập nhật trực tiếp theo thời gian thực
              </p>
            </div>
            <span className="hidden sm:inline-block text-xs font-extrabold text-warm-600 bg-warm-100 px-3 py-1 rounded-full border border-warm-300">
              ⚡ Ưu đãi có hạn
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {focalApps.map((app) => (
              <div
                key={app.id}
                className="glass-card rounded-3xl p-5 border border-amber-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      app.language === 'Chinese' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {app.language === 'Chinese' ? 'Tiếng Trung' : 'Tiếng Anh'}
                    </span>

                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                      Tiết kiệm -{app.discount}%
                    </span>
                  </div>

                  {/* App Thumbnail */}
                  <div
                    onClick={() => setActiveProduct(app)}
                    className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-gold-300/60 cursor-pointer group-hover:scale-105 transition-transform"
                  >
                    <img
                      src={app.images[0]}
                      alt={app.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-darkbrown/60 via-transparent to-transparent opacity-50" />
                    <span className="absolute bottom-2 left-2 text-[10px] font-black text-white bg-darkbrown/80 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      {app.badge || 'App VIP'}
                    </span>
                  </div>

                  {/* Title */}
                  <h4
                    onClick={() => setActiveProduct(app)}
                    className="font-black text-sm sm:text-base text-darkbrown group-hover:text-warm-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
                    title={app.name}
                  >
                    {app.name}
                  </h4>

                  {/* Highlights */}
                  <p className="mt-2 text-xs text-darkbrown/75 font-medium line-clamp-2">
                    {app.description}
                  </p>
                </div>

                {/* Bottom Pricing & Actions */}
                <div className="mt-5 pt-3 border-t border-amber-200/60">
                  <div className="mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-darkbrown/60">Giá gốc:</span>
                      <span className="text-xs font-bold text-darkbrown/50 line-through">
                        {formatCurrency(app.originalPrice)}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between mt-0.5">
                      <span className="text-xs font-black text-warm-600">Khuyến mãi:</span>
                      <span className="text-lg sm:text-xl font-black text-warm-600">
                        {formatCurrency(app.salePrice)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddToCartWithConfetti(app)}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-gold-500 to-warm-500 hover:from-gold-400 hover:to-warm-600 text-darkbrown font-black text-xs shadow transition-all flex items-center justify-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Thêm Giỏ</span>
                    </button>

                    {app.zaloCatalogUrl ? (
                      <a
                        href={app.zaloCatalogUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow transition-all flex items-center justify-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Mua Zalo</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActiveProduct(app)}
                        className="py-2.5 px-3 rounded-xl bg-white hover:bg-gold-50 text-darkbrown font-bold text-xs border border-gold-300 shadow-sm transition-all"
                      >
                        Chi Tiết
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
