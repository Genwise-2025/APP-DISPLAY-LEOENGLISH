import React, { useState } from 'react';
import { BookItem } from '../../types/book';
import { ALL_VIP_BOOKS } from '../../data/vipBookLibrary';
import { CSS3DBook } from '../UI/CSS3DBook';
import { useCart } from '../../context/CartContext';
import { 
  Sparkles, 
  BookOpen, 
  Download, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Eye, 
  Layers, 
  FileText, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';

interface Featured3DShowcaseProps {
  onSelectBookForDetails: (book: BookItem) => void;
  onReadSample: (book: BookItem) => void;
  onRequestDownload: (book: BookItem) => void;
}

export const Featured3DShowcase: React.FC<Featured3DShowcaseProps> = ({
  onSelectBookForDetails,
  onReadSample,
  onRequestDownload
}) => {
  const { isStudentApproved, currentStudentEmail, isAdminAuthenticated } = useCart();
  
  // Choose 6 highlight books for 3D stage
  const highlightBooks = [
    ALL_VIP_BOOKS[0], // Tiếng Anh Mất Gốc
    ALL_VIP_BOOKS[7], // 1000 Câu Phản Xạ A1-A2
    ALL_VIP_BOOKS[3], // Elementary Business
    ALL_VIP_BOOKS[9], // Feeling Hill
    ALL_VIP_BOOKS[10], // IELTS Mocking Test
    ALL_VIP_BOOKS[13], // 500 English Phrases
    ALL_VIP_BOOKS[16], // Nhà Giả Kim
    ALL_VIP_BOOKS[20], // Luyện Writing
  ].filter(Boolean);

  const [selectedBook, setSelectedBook] = useState<BookItem>(highlightBooks[1] || highlightBooks[0]);

  return (
    <section className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title & Badge */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-gold-500/20 to-warm-500/20 border border-gold-400/40 text-gold-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-glow-gold">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin" style={{ animationDuration: '6s' }} />
          KHÔNG GIAN TRƯNG BÀY SÁCH 3D TƯƠNG TÁC
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-gold-300 to-warm-200 drop-shadow-sm leading-tight">
          Sách Số Bản Quyền 3D — Mr. Leo & Genwise
        </h2>
        <p className="mt-2 text-sm sm:text-base text-amber-100/70 font-medium leading-relaxed">
          Rê chuột để xoay và cảm nhận độ dày, gáy sách và góc nhìn 3D chân thực. Nhấp chọn đọc thử 10 trang hoặc tải về máy.
        </p>
      </div>

      {/* 3D Interactive Stage Card */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#1C1008]/90 via-[#26150B]/80 to-[#150A04]/95 border-2 border-gold-500/40 shadow-2xl p-6 sm:p-10 backdrop-blur-xl overflow-hidden">
        {/* Glow ambient background orbs */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-gold-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-warm-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: 3D Book Scene */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative transform hover:scale-105 transition-transform duration-500">
              <CSS3DBook
                coverImage={selectedBook.coverImage}
                title={selectedBook.title}
                thickness={38}
                width={220}
                height={310}
                spineColor={selectedBook.spineColor || '#D97706'}
                badge={selectedBook.badge}
                onQuickView={() => onSelectBookForDetails(selectedBook)}
              />
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-amber-300/70 font-medium">
              <RotateCcw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Rê chuột lên bìa sách để tương tác hiệu ứng 3D</span>
            </div>
          </div>

          {/* Right Column: Book Details & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5 text-white">
            <div>
              {/* Category & Badge */}
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className="px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 font-bold text-xs uppercase tracking-wide">
                  {selectedBook.categoryLabel}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold text-xs">
                  {selectedBook.level}
                </span>
                {selectedBook.badge && (
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-warm-500 to-amber-500 text-white font-extrabold text-xs uppercase shadow">
                    {selectedBook.badge}
                  </span>
                )}
              </div>

              {/* Title & Vietnamese Subtitle */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
                {selectedBook.title}
              </h3>
              <p className="text-sm font-semibold text-gold-300 mt-1">
                {selectedBook.vietnameseTitle}
              </p>
              <p className="text-xs text-amber-200/70 mt-1 italic">
                "{selectedBook.subtitle}"
              </p>

              {/* Description */}
              <p className="mt-3 text-xs sm:text-sm text-cream/80 leading-relaxed">
                {selectedBook.description}
              </p>

              {/* Highlights 4 Bullet Points */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedBook.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-cream/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="line-clamp-1">{h}</span>
                  </div>
                ))}
              </div>

              {/* Meta stats */}
              <div className="mt-4 pt-4 border-t border-gold-500/20 flex flex-wrap items-center gap-4 text-xs text-cream/70 font-mono">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-gold-400" />
                  <span>{selectedBook.pages} Trang</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-gold-400" />
                  <span>Dung lượng: {selectedBook.fileSize}</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-300">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>5.0 ({selectedBook.reviewsCount || 400}+ đánh giá)</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {/* Read 10 Sample Pages Button */}
              <button
                type="button"
                onClick={() => onReadSample(selectedBook)}
                className="flex-1 min-w-[170px] py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/20 border border-gold-400/30 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-md"
              >
                <BookOpen className="w-4 h-4 text-gold-400" />
                Đọc Thử 10 Trang
              </button>

              {/* Download PDF Button */}
              <button
                type="button"
                onClick={() => onRequestDownload(selectedBook)}
                className="flex-1 min-w-[190px] py-3 px-5 rounded-2xl bg-gradient-to-r from-gold-500 via-warm-500 to-gold-400 text-darkbrown font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:shadow-gold-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                {isStudentApproved ? 'Tải Sách PDF Bản Quyền' : 'Nhập Gmail Để Tải Sách'}
              </button>

              {/* Details modal button */}
              <button
                type="button"
                onClick={() => onSelectBookForDetails(selectedBook)}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-gold-500/20 text-gold-300 transition-colors"
                title="Xem chi tiết toàn bộ sách"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            {/* Student Approval status indicator */}
            <div className="text-[11px] text-amber-200/70 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
              {isStudentApproved ? (
                <span className="text-emerald-300 font-bold">
                  Tài khoản ({currentStudentEmail || 'Admin'}) đã được duyệt: Bạn có thể tải không giới hạn toàn bộ sách.
                </span>
              ) : (
                <span>
                  Admin duyệt quyền qua Gmail: <strong className="text-gold-300">nguyentoandinh.0511@gmail.com</strong>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Selector Ribbon: Quick Switch Books on 3D Stage */}
        <div className="mt-8 pt-6 border-t border-gold-500/20">
          <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Chọn Sách Tiêu Biểu Để Xem 3D Trực Tiếp:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {highlightBooks.map((b) => {
              const isSelected = selectedBook.id === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBook(b)}
                  className={`p-2 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gold-500/25 border-gold-400 shadow-[0_0_15px_rgba(245,183,0,0.3)] scale-[1.03]'
                      : 'bg-white/5 border-gold-500/20 hover:bg-white/10 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="w-full h-20 rounded-lg overflow-hidden bg-black/40 mb-2 border border-amber-200/20">
                    <img
                      src={b.coverImage}
                      alt={b.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="text-[10px] font-bold text-white line-clamp-2 leading-tight">
                    {b.title}
                  </div>
                  <div className="text-[9px] text-gold-300 mt-1 font-semibold truncate">
                    {b.categoryLabel}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
