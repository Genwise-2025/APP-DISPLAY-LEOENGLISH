import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { CountdownTimer } from '../UI/CountdownTimer';
import { X, Gift, CheckCircle2, PhoneCall, Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PromotionModal: React.FC = () => {
  const { isPromoModalOpen, setIsPromoModalOpen, addToast } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    productOfInterest: 'Combo English Premium',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      addToast('Chưa điền đủ thông tin', 'Vui lòng nhập Họ tên và Số điện thoại.', 'warning');
      return;
    }

    setIsSubmitted(true);
    addToast(
      'Đăng ký thành công!',
      'LEO EDUCATION sẽ liên hệ với bạn trong thời gian sớm nhất qua Zalo/Điện thoại.'
    );
  };

  const handleClose = () => {
    setIsPromoModalOpen(false);
    setIsSubmitted(false);
  };

  if (!isPromoModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] bg-darkbrown/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative w-full max-w-2xl bg-[#FFF9EF] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-gold-400 my-8 overflow-hidden text-darkbrown"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Background Glow */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gold-500 via-warm-500 to-gold-400" />

          {/* Close Button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full text-darkbrown/60 hover:text-darkbrown hover:bg-gold-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              {/* Header */}
              <div className="text-center max-w-lg mx-auto mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-gold-500 to-warm-500 text-darkbrown font-black text-xs uppercase tracking-wider mb-2 shadow-sm">
                  <Gift className="w-4 h-4 text-darkbrown" /> CHƯƠNG TRÌNH KHUYẾN MÃI ĐẶC BIỆT
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-darkbrown">
                  Đăng Ký Nhận Ưu Đãi Giảm 50%
                </h3>
                <p className="text-xs sm:text-sm text-darkbrown/80 font-medium mt-1">
                  Áp dụng cho trọn bộ Sách, Ebook và Phần mềm học ngoại ngữ thông minh
                </p>
              </div>

              {/* Gift List & Timer Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 p-4 rounded-2xl bg-white border border-gold-300">
                <div>
                  <h4 className="font-extrabold text-xs text-warm-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Quà Tặng Đính Kèm (Trị giá 850.000đ):
                  </h4>
                  <ul className="space-y-1.5 text-xs font-semibold text-darkbrown/90">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      File Ebook 500 Phrases Interactive
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      Bộ 300 Flashcard từ vựng phản xạ 3s
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      Tài khoản Phần mềm LEO VIP 1 năm
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      Group Zalo sửa phát âm 1:1 hàng tuần
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col justify-between pt-2 md:pt-0 md:pl-4 md:border-l md:border-amber-200">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-xs text-darkbrown/70 font-bold">Giá ưu đãi từ:</span>
                    <div>
                      <span className="text-xl font-black text-warm-600">399.000 VNĐ</span>
                      <span className="text-xs text-darkbrown/40 line-through font-bold ml-1.5">850.000 VNĐ</span>
                    </div>
                  </div>

                  <div className="bg-cream p-2 rounded-xl border border-gold-300">
                    <CountdownTimer initialHours={48} />
                  </div>
                </div>
              </div>

              {/* Lead Capture Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-darkbrown mb-1">
                      Họ và tên <span className="text-warm-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Văn A"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold-300 text-xs font-medium text-darkbrown focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-darkbrown mb-1">
                      Số điện thoại / Zalo <span className="text-warm-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ví dụ: 0987654321"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold-300 text-xs font-medium text-darkbrown focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-darkbrown mb-1">Email nhận Ebook</label>
                    <input
                      type="email"
                      placeholder="Ví dụ: email@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold-300 text-xs font-medium text-darkbrown focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-darkbrown mb-1">Sản phẩm quan tâm</label>
                    <select
                      value={formData.productOfInterest}
                      onChange={(e) => setFormData({ ...formData, productOfInterest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold-300 text-xs font-medium text-darkbrown focus:outline-none focus:ring-2 focus:ring-gold-500"
                    >
                      <option value="Sách Giao Tiếp Starter">Sách Giao Tiếp Starter</option>
                      <option value="1000 Câu Thực Chiến A1/B1">1000 Câu Thực Chiến A1/B1</option>
                      <option value="500 English Phrases Ebook">500 English Phrases Ebook</option>
                      <option value="App MandaLeo HSK 1-6">App MandaLeo HSK 1-6</option>
                      <option value="Combo English Premium">Combo English Premium</option>
                      <option value="Combo Chinese Master">Combo Chinese Master</option>
                    </select>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-warm-500 hover:from-gold-400 hover:to-warm-600 text-darkbrown font-black text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Đăng Ký Nhận Ưu Đãi
                  </button>

                  <a
                    href="https://zalo.me/0799713094"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-gold-400 text-darkbrown font-bold text-xs flex items-center justify-center gap-2 shadow-sm shrink-0"
                  >
                    <PhoneCall className="w-4 h-4 text-blue-600" />
                    Zalo: 0799713094
                  </a>
                </div>
              </form>
            </div>
          ) : (
            /* SUCCESS STATE */
            <div className="py-8 text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-darkbrown">Đăng Ký Thành Công!</h3>
              <p className="text-sm text-darkbrown/80 font-medium mt-2 leading-relaxed">
                LEO EDUCATION sẽ liên hệ với bạn qua Zalo/Điện thoại trong thời gian sớm nhất để hướng dẫn nhận tài liệu quà tặng và ưu đãi 50%.
              </p>

              <button
                type="button"
                onClick={handleClose}
                className="mt-6 px-6 py-2.5 rounded-xl bg-gold-500 text-darkbrown font-black text-xs shadow hover:bg-gold-400 transition-colors"
              >
                Hoàn tất & Tiếp tục xem sách
              </button>
            </div>
          )}

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
