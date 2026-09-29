import React from 'react';
import { ALL_LIBRARY_BOOKS } from '../../data/bookLibrary';
import { BookItem } from '../../types/book';
import { Sparkles, ArrowRight, BookOpen, Star } from 'lucide-react';

interface BookMarqueeBannerProps {
  onSelectBook: (book: BookItem) => void;
  onNavigateToGroups: () => void;
}

export const BookMarqueeBanner: React.FC<BookMarqueeBannerProps> = ({
  onSelectBook,
  onNavigateToGroups
}) => {
  // Duplicate array to create a completely seamless infinite loop
  const marqueeBooks = [...ALL_LIBRARY_BOOKS, ...ALL_LIBRARY_BOOKS];

  return (
    <div className="relative w-full overflow-hidden py-6 bg-gradient-to-r from-amber-950 via-warm-900 to-amber-950 border-y-2 border-gold-500/40 shadow-2xl">
      {/* Top Banner Header / Title Badge */}
      <div className="max-w-7xl mx-auto px-4 mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gold-500/20 border border-gold-400 flex items-center justify-center text-gold-300">
            <BookOpen className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-gold-400 font-extrabold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-gold-300" />
                KHÔNG GIAN SÁCH & EBOOK SỐ LEOENGLISH
              </span>
              <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black animate-pulse">
                Ưu Đãi Học Viên Mới 40K
              </span>
            </div>
            <p className="text-sm font-bold text-amber-100">
              Trọn bộ giáo trình độc quyền — Chạm vào sách bất kỳ để xem chi tiết & đọc thử
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onNavigateToGroups}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 hover:text-white border border-gold-500/40 text-xs font-bold transition-all"
        >
          <span>Nhận mã tải 3 nhóm sách VIP</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Decorative gradient masks for subtle fade on edges */}
      <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-amber-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-amber-950 to-transparent z-10 pointer-events-none" />

      {/* Marquee Track: Gliding from Right to Left */}
      <div className="flex w-full overflow-hidden select-none">
        <div className="animate-marquee-left flex items-center gap-4 pl-4">
          {marqueeBooks.map((book, index) => {
            return (
              <div
                key={`${book.id}-${index}`}
                onClick={() => onSelectBook(book)}
                className="group relative flex-shrink-0 w-52 sm:w-60 bg-gradient-to-b from-[#2A1810] to-[#1A0E08] p-3 rounded-2xl border border-gold-500/30 hover:border-gold-400 hover:shadow-[0_10px_25px_rgba(245,183,0,0.35)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Book Badge */}
                {book.badge && (
                  <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-gold-500 text-darkbrown text-[9px] font-black uppercase shadow-md">
                    {book.badge}
                  </div>
                )}

                {/* 50% OFF Badge */}
                <div className="absolute top-2 right-2 z-10 px-1.5 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-black shadow-md flex items-center gap-0.5">
                  -50%
                </div>

                {/* Cover Image Container */}
                <div className="relative w-full h-40 sm:h-44 rounded-xl overflow-hidden bg-black/40 flex items-center justify-center p-1.5 group-hover:scale-[1.02] transition-transform">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback if image fails to load
                      (e.target as HTMLImageElement).src = '/images/books/starter-anh-van-giao-tiep-hi.jpg';
                    }}
                  />
                  
                  {/* Subtle shine on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/0 via-white/10 to-gold-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" />
                </div>

                {/* Book Meta & Pricing */}
                <div className="mt-2.5">
                  <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-gold-300 transition-colors">
                    {book.title}
                  </h4>

                  <div className="flex items-center gap-1.5 mt-1 text-[10px] text-amber-200/70">
                    <span className="flex items-center text-amber-400">
                      <Star className="w-2.5 h-2.5 fill-amber-400 mr-0.5" />
                      {book.rating || 5.0}
                    </span>
                    <span>•</span>
                    <span>{book.pages} trang</span>
                    <span>•</span>
                    <span>{book.fileSize}</span>
                  </div>

                  {/* Pricing: 80k -> 40k */}
                  <div className="mt-2 pt-1.5 border-t border-white/10 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 line-through mr-1.5 font-medium">
                        {book.originalPrice.toLocaleString('vi-VN')}đ
                      </span>
                      <span className="text-sm font-black text-gold-400">
                        {book.promoPrice.toLocaleString('vi-VN')}đ
                      </span>
                    </div>

                    <span className="text-[10px] text-gold-300 group-hover:translate-x-0.5 transition-transform flex items-center font-bold">
                      Chi tiết &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
