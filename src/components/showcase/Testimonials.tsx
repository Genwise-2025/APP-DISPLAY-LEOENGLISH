import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'Nguyễn Thùy Linh',
      role: 'Nhân viên Ngân hàng (Hà Nội)',
      product: 'Combo English Premium',
      rating: 5,
      content: 'Mình mất gốc tiếng Anh hơn 5 năm. Nhờ cuốn Sách Giao Tiếp Starter và App LEO mà sau 2 tháng mình đã tự tin giao tiếp với khách hàng nước ngoài tại chi nhánh!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      name: 'Trần Hoàng Minh',
      role: 'Du học sinh tương lai (TP.HCM)',
      product: 'MandaLeo - Phần mềm HSK 1–6',
      rating: 5,
      content: 'Phần mềm MandaLeo thực sự thần thánh! Tính năng AI sửa thanh điệu tiếng Trung cực kỳ chính xác. Mình đã đỗ HSK 4 chỉ sau 3.5 tháng tự học.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      name: 'Phạm Thu Trang',
      role: 'Chủ cửa hàng thời trang (Đà Nẵng)',
      product: 'Ebook 500 English Phrases',
      rating: 5,
      content: 'Ebook rất tiện lợi, bấm phát ra tiếng ngay trên iPad. Từ vựng thực tế không rườm rà, mình áp dụng ngay khi đi đánh hàng ở Quảng Châu và Thái Lan.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-extrabold text-warm-600 uppercase tracking-widest bg-warm-100 px-3 py-1 rounded-full border border-warm-300">
            CẢM NHẬN THỰC TẾ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-darkbrown mt-3">
            Học Viên Nói Gì Về LEO EDUCATION?
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-panel p-8 sm:p-10 rounded-3xl border border-amber-200 shadow-xl relative"
            >
              <Quote className="w-12 h-12 text-gold-400/30 absolute top-6 right-6" />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-500" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-base sm:text-lg text-darkbrown font-medium leading-relaxed italic">
                "{reviews[currentIndex].content}"
              </p>

              {/* Author Footer */}
              <div className="mt-8 pt-6 border-t border-amber-200/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={reviews[currentIndex].avatar}
                    alt={reviews[currentIndex].name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gold-400 shadow"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-darkbrown">{reviews[currentIndex].name}</h4>
                    <p className="text-xs text-darkbrown/70 font-medium">{reviews[currentIndex].role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Đã mua hàng
                  </span>
                  <p className="text-[10px] text-darkbrown/60 font-semibold mt-1">
                    {reviews[currentIndex].product}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              type="button"
              onClick={prev}
              className="p-3 rounded-full bg-white border border-gold-300 text-darkbrown hover:bg-gold-500 transition-colors shadow-sm"
              title="Trước"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === idx ? 'bg-warm-500 w-8' : 'bg-gold-300/60'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="p-3 rounded-full bg-white border border-gold-300 text-darkbrown hover:bg-gold-500 transition-colors shadow-sm"
              title="Tiếp theo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
