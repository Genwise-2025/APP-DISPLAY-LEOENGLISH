import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Gift, X, Sparkles, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'LEO_PROMO_POPUP_DISMISSED';

export const PromotionPopup: React.FC = () => {
  const { setIsPromoModalOpen } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Check if dismissed in session
    const isDismissed = localStorage.getItem(STORAGE_KEY);
    if (isDismissed === 'true') {
      setIsMinimized(true);
      setIsVisible(true);
      return;
    }

    // Auto show after 3.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsMinimized(true);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  const handleOpenFullModal = () => {
    setIsPromoModalOpen(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-auto">
      <AnimatePresence mode="wait">
        {isMinimized ? (
          /* Mini Floating Gift Trigger Button when minimized */
          <motion.button
            key="minimized-btn"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            onClick={() => setIsMinimized(false)}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-gold-500 via-warm-500 to-warm-600 text-darkbrown shadow-2xl flex items-center justify-center border-2 border-white hover:scale-110 transition-transform group relative"
            title="Mở ưu đãi đặc biệt"
          >
            <Gift className="w-6 h-6 animate-bounce" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white font-black text-[9px] flex items-center justify-center animate-ping" />
          </motion.button>
        ) : (
          /* Full Floating Corner Popup */
          <motion.div
            key="full-popup"
            initial={{ y: 80, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 180 }}
            className="w-[300px] sm:w-[340px] p-5 rounded-3xl bg-gradient-to-br from-darkbrown via-[#45281A] to-darkbrown-deep text-white shadow-2xl border-2 border-gold-500/60 relative overflow-hidden backdrop-blur-xl"
          >
            {/* Ambient Lighting Flare */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold-500/30 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-3 p-1.5 rounded-full text-cream/70 hover:text-white hover:bg-white/10 transition-colors"
              title="Đóng popup"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-gold-500 to-warm-400 text-darkbrown font-black flex items-center justify-center shrink-0 shadow-md">
                <Gift className="w-6 h-6 animate-pulse" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-warm-500/20 text-gold-300 font-extrabold text-[9px] uppercase tracking-wider border border-gold-400/30">
                  <Flame className="w-3 h-3 text-warm-400" /> ƯU ĐÃI ĐẶC BIỆT
                </div>
                <h4 className="font-extrabold text-sm sm:text-base text-gold-300 leading-snug mt-1">
                  Giảm đến 50% Sách & Phần Mềm
                </h4>
              </div>
            </div>

            <p className="text-xs text-cream/90 font-medium mt-3 leading-relaxed">
              Tặng thêm bộ tài liệu học tập trị giá <strong className="text-gold-400 font-bold">850.000 VNĐ</strong> khi đăng ký hôm nay.
            </p>

            {/* CTA Button */}
            <button
              type="button"
              onClick={handleOpenFullModal}
              className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-warm-500 hover:from-gold-400 hover:to-warm-600 text-darkbrown font-black text-xs shadow-glow-gold transition-all flex items-center justify-center gap-1.5 group"
            >
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Nhận Ưu Đãi Ngay
            </button>

            <div className="mt-2 text-[10px] text-amber-200/70 text-center font-medium">
              *Số lượng có hạn cho 50 người đăng ký đầu tiên.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
