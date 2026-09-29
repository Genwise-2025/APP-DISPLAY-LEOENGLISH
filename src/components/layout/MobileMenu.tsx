import React from 'react';
import { useCart } from '../../context/CartContext';
import { X, BookOpen, Sparkles, PhoneCall, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavClick: (categoryFilter?: string, targetId?: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onNavClick }) => {
  const { setIsPromoModalOpen } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-darkbrown/60 backdrop-blur-md lg:hidden flex justify-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-4/5 max-w-sm h-full bg-[#FFF9EF] p-6 flex flex-col justify-between shadow-2xl border-l border-gold-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-amber-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gold-500 flex items-center justify-center font-bold text-darkbrown">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-base text-darkbrown">LEO EDUCATION</span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-lg text-darkbrown hover:bg-gold-200/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 flex flex-col gap-2 font-bold text-darkbrown text-xs sm:text-sm">
                <button
                  type="button"
                  onClick={() => onNavClick('all')}
                  className="text-left py-2 px-3 rounded-xl hover:bg-gold-200/40 flex items-center justify-between"
                >
                  Trang chủ
                </button>
                <button
                  type="button"
                  onClick={() => onNavClick(undefined, 'app-showcase')}
                  className="text-left py-2 px-3 rounded-xl bg-gradient-to-r from-gold-100 to-warm-100 text-warm-700 font-black flex items-center justify-between"
                >
                  <span>📱 4 Siêu Ứng Dụng VIP</span>
                  <span className="px-1.5 py-0.5 bg-rose-500 text-white text-[9px] font-black rounded-full">Sale sốc</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavClick('Chinese', 'app-showcase')}
                  className="text-left py-2 px-3 rounded-xl hover:bg-gold-200/40 flex items-center justify-between"
                >
                  <span>🇨🇳 App MandaLeo</span>
                  <span className="font-extrabold text-warm-600">299k</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavClick('English', 'app-showcase')}
                  className="text-left py-2 px-3 rounded-xl hover:bg-gold-200/40 flex items-center justify-between"
                >
                  <span>🇬🇧 App Leo English Pro</span>
                  <span className="font-extrabold text-warm-600">1.290k</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavClick('app', 'products-section')}
                  className="text-left py-2 px-3 rounded-xl hover:bg-gold-200/40 flex items-center justify-between"
                >
                  <span>🚀 App LEO 10</span>
                  <span className="font-extrabold text-warm-600">299k</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavClick('app', 'products-section')}
                  className="text-left py-2 px-3 rounded-xl hover:bg-gold-200/40 flex items-center justify-between"
                >
                  <span>⚡ App 1000 Phản Xạ</span>
                  <span className="font-extrabold text-rose-600">30k</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavClick(undefined, 'kho-sach')}
                  className="text-left py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500/20 via-gold-500/25 to-warm-500/20 text-warm-900 border border-amber-300 font-black flex items-center justify-between shadow-sm"
                >
                  <span className="flex items-center gap-1.5">
                    <span>📚 Kho Tải Sách (Dành Cho Học Viên)</span>
                  </span>
                  <span className="px-1.5 py-0.5 bg-gradient-to-r from-gold-500 to-warm-500 text-white text-[9px] font-black rounded-full animate-pulse">HOT</span>
                </button>
                <a
                  href="https://catalog.zalo.me/?cid=CDd8JZoPdmrJrgrSM9UBSYIjerTHu_K7Ei7OL3_--nawlg1FDOFwOm"
                  target="_blank"
                  rel="noreferrer"
                  className="text-left py-2 px-3 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 font-extrabold flex items-center justify-between"
                >
                  <span>Zalo Catalog Chính Hãng</span>
                  <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded">Xem ngay</span>
                </a>
                <button
                  type="button"
                  onClick={() => onNavClick('all', 'products-section')}
                  className="text-left py-2 px-3 rounded-xl hover:bg-gold-200/40 flex items-center justify-between"
                >
                  Cửa Hàng Đầy Đủ
                </button>
                <button
                  type="button"
                  onClick={() => onNavClick(undefined, 'benefits-section')}
                  className="text-left py-2 px-3 rounded-xl hover:bg-gold-200/40"
                >
                  Chính sách & Cam kết
                </button>
                <button
                  type="button"
                  onClick={() => onNavClick(undefined, 'faq-section')}
                  className="text-left py-2 px-3 rounded-xl hover:bg-gold-200/40"
                >
                  FAQ & Trợ giúp
                </button>
              </nav>
            </div>

            {/* Bottom Contact & Action */}
            <div className="pt-6 border-t border-amber-200 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setIsPromoModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-500 to-warm-500 text-darkbrown font-black text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Nhận Ưu Đãi 50% Ngay
              </button>

              <a
                href="https://zalo.me/0799713094"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-white border border-gold-400 text-darkbrown font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-blue-600" />
                Hỗ trợ Zalo: 0799713094
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
