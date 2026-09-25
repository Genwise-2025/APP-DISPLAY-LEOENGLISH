import React from 'react';
import { useCart } from '../../context/CartContext';
import { CountdownTimer } from '../UI/CountdownTimer';
import { CSS3DBook } from '../UI/CSS3DBook';
import { CheckCircle2, Flame, Gift, ArrowRight, PhoneCall, Sparkles } from 'lucide-react';

export const FeaturedCombo: React.FC = () => {
  const { setIsPromoModalOpen } = useCart();

  const benefitsList = [
    '🔥 MUA TRỌN BỘ APP LEO ENGLISH PRO CHỈ 1.290.000 VNĐ (Tiết kiệm 1.010.000đ so với giá gốc 2,3 triệu!)',
    '🎁 TẶNG KÈM TRỌN BỘ 4 CUỐN SÁCH IN MÀU Mr. Leo giao tận nhà',
    'Quyền truy cập VIP ứng dụng LEO English Pro SỞ HỮU VĨNH VIỄN không đóng phí duy trì',
    'Học đủ các Level từ mất gốc đến nâng cao, bám sát hội thoại thực chiến',
    'Tích hợp công nghệ luyện phát âm AI & Audio giọng bản ngữ chuẩn Mỹ 100%',
    'Hỗ trợ chữa phát âm trực tiếp 1:1 qua Zalo 0799713094 cùng thầy LEO'
  ];

  return (
    <section id="combo-section" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Card */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-darkbrown via-[#4A2C1D] to-darkbrown-deep text-white p-8 sm:p-12 border-2 border-gold-500/50 shadow-2xl">
          
          {/* Background Ambient Glow Orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-gold-500/30 via-warm-500/20 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-warm-600/30 via-gold-400/20 to-transparent blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* LEFT CONTENT */}
            <div className="lg:col-span-7 flex flex-col items-start">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-gold-500 to-warm-500 text-darkbrown font-black text-xs uppercase tracking-wider shadow-md mb-4">
                <Flame className="w-4 h-4 text-darkbrown animate-bounce" />
                COMBO SIÊU HỜI - SỞ HỮU VĨNH VIỄN
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gold-300 leading-tight">
                App Leo English Pro – Trọn Bộ VIP + Tặng 4 Sách In Màu
              </h2>

              <p className="text-sm sm:text-base text-cream/90 font-medium mt-3 leading-relaxed">
                Mở khóa toàn bộ các Level học trên ứng dụng Leo English Pro giá gốc 2,3 triệu GIẢM CÒN 1.290.000 VNĐ. Tặng trọn bộ 4 cuốn sách in Mr. Leo cao cấp giao tận tay!
              </p>

              {/* Benefits Checklist */}
              <div className="mt-6 space-y-2.5 w-full">
                {benefitsList.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-cream/95">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Countdown Timer Widget */}
              <div className="mt-8 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-gold-500/30 w-full sm:w-auto">
                <CountdownTimer initialHours={48} />
              </div>

              {/* Price & CTA Button */}
              <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
                <div>
                  <div className="text-xs text-amber-200/80 font-bold uppercase tracking-wider">🔥 GIÁ KHUYẾN MÃI PRO:</div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-gold-400">1.290.000 VNĐ</span>
                    <span className="text-sm text-cream/50 line-through font-semibold">2.300.000 VNĐ</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPromoModalOpen(true)}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 via-warm-400 to-warm-500 hover:from-gold-400 hover:to-warm-600 text-darkbrown font-black text-sm sm:text-base shadow-glow-gold hover:scale-105 transition-all flex items-center gap-2 group border border-amber-200"
                  >
                    <span>Đăng Ký Nhận Sách</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href="https://catalog.zalo.me/?cid=CDd8JZoPdmrJrgrSM9UBSYIjerTHu_K7Ei7OL3_--nawlg1FDOFwOm&pid=9f625b39567cbf22e66d"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <span>Xem Trên Zalo</span>
                  </a>
                </div>
              </div>

              {/* Call Teacher Action Note */}
              <div className="mt-6">
                <a
                  href="https://zalo.me/0799713094"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-gold-300 hover:text-white bg-white/10 px-4 py-2 rounded-xl border border-gold-400/40 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-warm-400" />
                  Có mua sách nào alo thầy qua Zalo 0799713094 nha!
                </a>
              </div>

            </div>

            {/* RIGHT 3D GRAPHIC */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              <div className="relative transform hover:scale-105 transition-transform duration-500">
                <CSS3DBook
                  coverImage="/images/books/leo-english-starter.png"
                  title="Combo 4 Level LEO English + 4 Sách In Mr. Leo"
                  width={210}
                  height={300}
                  thickness={50}
                  spineColor="#BF360C"
                  badge="1.290K VĨNH VIỄN"
                />
              </div>

              {/* Floating Gift Box Badge */}
              <div className="absolute -bottom-4 right-4 bg-white text-darkbrown p-3 rounded-2xl shadow-2xl border border-gold-400 flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-xl bg-warm-500 text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-extrabold text-xs">Tặng Trọn Bộ 4 Sách In</h5>
                  <p className="text-[10px] text-darkbrown/70 font-semibold">Giao hàng miễn phí toàn quốc</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
