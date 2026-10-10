import React, { useState, useMemo } from 'react';
import { BookItem } from '../../types/book';
import { ALL_VIP_BOOKS, VIP_CATEGORIES } from '../../data/vipBookLibrary';
import { CSS3DBook } from '../UI/CSS3DBook';
import { useCart } from '../../context/CartContext';
import { 
  Search, 
  Sparkles, 
  BookOpen, 
  Download, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Star, 
  FileText, 
  Eye, 
  Filter, 
  Layers,
  ArrowRight
} from 'lucide-react';

interface AllGenresOnePageCatalogProps {
  onSelectBook: (book: BookItem) => void;
  onReadSample: (book: BookItem) => void;
  onRequestDownload: (book: BookItem) => void;
}

export const AllGenresOnePageCatalog: React.FC<AllGenresOnePageCatalogProps> = ({
  onSelectBook,
  onReadSample,
  onRequestDownload
}) => {
  const { isStudentApproved, currentStudentEmail } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: ALL_VIP_BOOKS.length };
    VIP_CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = ALL_VIP_BOOKS.filter((b) => b.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  // Filtered books
  const filteredBooks = useMemo(() => {
    return ALL_VIP_BOOKS.filter((book) => {
      const matchCat = selectedCategory === 'all' || book.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' || 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.vietnameseTitle && book.vietnameseTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        book.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchLevel = selectedLevel === 'all' ||
        book.level.toLowerCase().includes(selectedLevel.toLowerCase());

      return matchCat && matchSearch && matchLevel;
    });
  }, [selectedCategory, searchQuery, selectedLevel]);

  return (
    <section id="kho-sach-toan-dien" className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="flex justify-center mb-3">
          <img
            src="/images/logo-book-vip.png"
            alt="Book VIP Leo"
            className="w-14 h-14 rounded-2xl border-2 border-gold-400 shadow-glow-gold object-cover hover:scale-105 transition-transform"
          />
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Layers className="w-3.5 h-3.5 text-gold-400" />
          TẤT CẢ 11 THỂ LOẠI NẰM GỌN TRONG 1 TRANG
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          Kho Thư Viện Sách Số VIP Leo English
        </h2>
        <p className="mt-2 text-sm text-cream/70 font-medium">
          Dễ dàng tìm kiếm và xem toàn bộ 11 thể loại giáo trình thực chiến, phản xạ, thương mại và truyện đọc ngay tại đây.
        </p>
      </div>

      {/* Sticky Categories Bar */}
      <div className="sticky top-20 z-30 py-3 mb-6 bg-[#160B05]/90 backdrop-blur-md border-y border-gold-500/20 shadow-xl">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin no-scrollbar">
          {VIP_CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.id] || 0;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-gold-500 to-warm-500 text-darkbrown font-black shadow-lg shadow-gold-500/20 scale-105'
                    : 'bg-white/5 text-cream/80 hover:bg-white/10 hover:text-white border border-gold-500/10'
                }`}
              >
                <span>{cat.shortLabel}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  isSelected ? 'bg-darkbrown/30 text-darkbrown font-extrabold' : 'bg-white/10 text-cream/60'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-gold-500/20 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/40" />
          <input
            type="text"
            placeholder="Tìm theo tên sách, tác giả, thể loại (ví dụ: phản xạ, thương mại, 1000 câu, writing...)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-gold-500/30 text-white placeholder-cream/40 text-xs focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-cream/50 hover:text-white"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Level Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <span className="text-[11px] text-cream/50 font-semibold mr-1 flex items-center gap-1 flex-shrink-0">
            <Filter className="w-3 h-3 text-gold-400" /> Trình độ:
          </span>
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'mất gốc', label: 'Mất gốc' },
            { id: 'a1', label: 'A1 - A2' },
            { id: 'b1', label: 'B1 - B2' },
            { id: 'c1', label: 'C1' },
            { id: 'song ngữ', label: 'Song ngữ' },
          ].map((lvl) => (
            <button
              key={lvl.id}
              type="button"
              onClick={() => setSelectedLevel(lvl.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedLevel === lvl.id
                  ? 'bg-amber-500/30 text-gold-300 border border-gold-400/40'
                  : 'bg-white/5 text-cream/60 hover:bg-white/10'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Book Grid */}
      {filteredBooks.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white/5 border border-gold-500/20 p-8">
          <BookOpen className="w-12 h-12 text-gold-400/40 mx-auto mb-3" />
          <h4 className="text-base font-bold text-white mb-1">Không tìm thấy sách phù hợp</h4>
          <p className="text-xs text-cream/60 mb-4">
            Hãy thử tìm bằng từ khóa khác hoặc bấm hiển thị tất cả thể loại.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setSelectedLevel('all');
            }}
            className="px-4 py-2 rounded-xl bg-gold-500 text-darkbrown font-bold text-xs uppercase"
          >
            Hiện Toàn Bộ Kho Sách
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => {
            return (
              <div
                key={book.id}
                className="group relative rounded-3xl bg-gradient-to-b from-[#21130A] to-[#140A04] border border-gold-500/30 hover:border-gold-400/70 shadow-xl hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden p-5"
              >
                {/* Top: 3D Book Miniature */}
                <div className="relative flex flex-col items-center justify-center py-4">
                  <div className="transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300">
                    <CSS3DBook
                      coverImage={book.coverImage}
                      title={book.title}
                      thickness={32}
                      width={170}
                      height={240}
                      spineColor={book.spineColor || '#C2410C'}
                      badge={book.badge}
                      onQuickView={() => onSelectBook(book)}
                    />
                  </div>

                  {/* Level Tag Pill floating */}
                  <div className="mt-3 flex items-center justify-between w-full px-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-300 text-[10px] font-bold uppercase truncate max-w-[140px]">
                      {book.categoryLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold">
                      {book.level}
                    </span>
                  </div>
                </div>

                {/* Middle: Info */}
                <div className="flex-1 flex flex-col justify-between pt-2">
                  <div>
                    <h3
                      onClick={() => onSelectBook(book)}
                      className="font-bold text-sm text-white hover:text-gold-300 transition-colors line-clamp-2 cursor-pointer leading-snug"
                    >
                      {book.title}
                    </h3>
                    {book.vietnameseTitle && (
                      <p className="text-[11px] text-amber-200/70 line-clamp-1 mt-0.5 font-medium">
                        {book.vietnameseTitle}
                      </p>
                    )}

                    <p className="text-xs text-cream/60 line-clamp-2 mt-2 leading-relaxed">
                      {book.description}
                    </p>
                  </div>

                  {/* Price & Meta info */}
                  <div className="mt-3 pt-3 border-t border-gold-500/15 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] text-cream/50 line-through">
                        {book.originalPrice.toLocaleString('vi-VN')}đ
                      </div>
                      <div className="text-sm font-black text-gold-400 flex items-center gap-1">
                        <span>{book.promoPrice.toLocaleString('vi-VN')}đ</span>
                        <span className="px-1.5 py-0.2 rounded bg-rose-500 text-white text-[9px] font-bold">
                          -50%
                        </span>
                      </div>
                    </div>

                    <div className="text-right text-[10px] text-cream/60 font-mono">
                      <div>{book.pages} Trang</div>
                      <div className="text-amber-300/80 font-bold">{book.fileSize}</div>
                    </div>
                  </div>
                </div>

                {/* Bottom: 2 Action Buttons */}
                <div className="mt-4 pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onReadSample(book)}
                    className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-cream font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    title="Đọc thử 10 trang xem trước"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-gold-400" />
                    Đọc Thử
                  </button>

                  <button
                    type="button"
                    onClick={() => onRequestDownload(book)}
                    className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-gold-500 to-warm-500 hover:from-gold-400 hover:to-warm-400 text-darkbrown font-black text-xs transition-transform hover:scale-102 flex items-center justify-center gap-1.5 shadow"
                    title="Tải sách PDF (Yêu cầu Gmail học viên)"
                  >
                    {isStudentApproved ? (
                      <Unlock className="w-3.5 h-3.5 text-darkbrown" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-darkbrown" />
                    )}
                    Tải PDF
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
