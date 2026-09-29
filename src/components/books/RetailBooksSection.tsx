import React, { useState } from 'react';
import { ALL_LIBRARY_BOOKS, ADMIN_CONFIG, mapBookToProduct } from '../../data/bookLibrary';
import { BookItem } from '../../types/book';
import { useCart } from '../../context/CartContext';
import { 
  Sparkles, 
  ShoppingBag, 
  BookOpen, 
  Star, 
  Check, 
  Filter, 
  Search, 
  ExternalLink,
  MessageCircle,
  FileText
} from 'lucide-react';

interface RetailBooksSectionProps {
  onSelectBook: (book: BookItem) => void;
}

export const RetailBooksSection: React.FC<RetailBooksSectionProps> = ({ onSelectBook }) => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Tất Cả Sách' },
    { id: 'communication', label: 'Giao Tiếp & Phản Xạ' },
    { id: 'vocabulary', label: 'Từ Vựng & Cụm Từ' },
    { id: 'business', label: 'Tiếng Anh Doanh Nghiệp' },
    { id: 'grammar-ielts', label: 'Ngữ Pháp & IELTS' },
    { id: 'chinese', label: 'Tiếng Trung & Song Ngữ' },
    { id: 'story', label: 'Truyện Đọc' },
  ];

  const filteredBooks = ALL_LIBRARY_BOOKS.filter((book) => {
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesSearch = 
      book.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (book.vietnameseTitle && book.vietnameseTitle.toLowerCase().includes(searchFilter.toLowerCase())) ||
      book.description.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBuyBookZalo = (book: BookItem) => {
    const message = encodeURIComponent(
      `Chào Thầy Leo! Em muốn đặt mua sách lẻ: "${book.title}" với giá ưu đãi học viên mới 40.000 VNĐ (Giá gốc 80.000 VNĐ). Nhờ thầy hỗ trợ gửi sách và mã tải cho em qua Zalo nhé!`
    );
    window.open(`https://zalo.me/${ADMIN_CONFIG.adminHotline}?text=${message}`, '_blank');
  };

  const handleAddToCart = (book: BookItem) => {
    addToCart(mapBookToProduct(book));
  };

  return (
    <section id="retail-books-section" className="py-16 sm:py-24 bg-[#FFF9EF] text-darkbrown relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-500/40 text-warm-600 text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4 text-warm-500" />
            <span>KHO SÁCH LẺ — TỰ CHỌN TỪNG CUỐN YÊU THÍCH</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-darkbrown tracking-tight leading-tight">
            Kho Sách Ebook <span className="text-warm-500">Bản Quyền Đầy Đủ</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-darkbrown/80 font-medium">
            Mỗi cuốn sách giá niêm yết <span className="line-through font-bold text-gray-500">80.000 VNĐ</span> — Ưu đãi đặc quyền cho học viên mới: <strong className="text-rose-600 text-xl font-black">CHỈ 40.000 VNĐ / CUỐN</strong> (Tiết kiệm 50%)!
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-white/80 p-4 rounded-2xl border border-amber-200 shadow-sm backdrop-blur-md">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-gold-500 to-warm-500 text-white shadow-md'
                    : 'bg-warm-100/50 hover:bg-warm-200/60 text-darkbrown/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-warm-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm tên cuốn sách..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-warm-50 border border-amber-200 text-xs sm:text-sm focus:outline-none focus:border-warm-500"
            />
          </div>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredBooks.map((book) => {
            return (
              <div
                key={book.id}
                className="group bg-white rounded-3xl p-4 sm:p-5 border border-amber-200/80 shadow-sm hover:shadow-2xl hover:border-gold-400 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Badge & Discount */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-warm-100 text-warm-700 text-[10px] font-extrabold uppercase">
                      {book.categoryLabel}
                    </span>

                    <span className="px-2 py-0.5 rounded-lg bg-rose-600 text-white text-[10px] font-black shadow-sm animate-pulse">
                      GIẢM 50%
                    </span>
                  </div>

                  {/* Real Book Cover Image */}
                  <div
                    onClick={() => onSelectBook(book)}
                    className="relative w-full h-56 sm:h-64 rounded-2xl bg-gradient-to-b from-[#FFF3DD] to-[#FFE8BD] p-3 flex items-center justify-center overflow-hidden cursor-pointer group-hover:shadow-md transition-all"
                  >
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="max-h-full max-w-full object-contain rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/books/starter-anh-van-giao-tiep-hi.jpg';
                      }}
                    />

                    {/* Quick preview hover pill */}
                    <div className="absolute inset-0 bg-darkbrown/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-3 py-1.5 rounded-full bg-white/95 text-darkbrown font-black text-xs shadow-xl flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-warm-500" />
                        <span>Xem chi tiết sách</span>
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3
                    onClick={() => onSelectBook(book)}
                    className="mt-4 font-black text-sm sm:text-base text-darkbrown line-clamp-2 leading-snug group-hover:text-warm-500 cursor-pointer transition-colors"
                  >
                    {book.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-darkbrown/70 line-clamp-2 leading-relaxed">
                    {book.subtitle || book.description}
                  </p>

                  <div className="flex items-center gap-2 mt-2 text-[11px] text-darkbrown/60">
                    <span className="flex items-center text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                      {book.rating || 5.0}
                    </span>
                    <span>•</span>
                    <span>{book.pages} trang</span>
                    <span>•</span>
                    <span>{book.fileSize}</span>
                  </div>
                </div>

                {/* Price & Action Buttons */}
                <div className="mt-5 pt-4 border-t border-amber-100">
                  {/* Pricing: 80.000đ -> 40.000đ */}
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-xs text-gray-400 line-through mr-2 font-medium">
                        {book.originalPrice.toLocaleString('vi-VN')} VNĐ
                      </span>
                      <span className="text-lg sm:text-xl font-black text-rose-600">
                        {book.promoPrice.toLocaleString('vi-VN')} VNĐ
                      </span>
                    </div>

                    <span className="text-[10px] text-warm-600 font-bold bg-gold-100 px-2 py-0.5 rounded-full">
                      Học viên mới
                    </span>
                  </div>

                  {/* ACTION BUTTONS WITH CSS ÁNH SÁNG */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Zalo Buy Button with CSS Ánh Sáng */}
                    <button
                      type="button"
                      onClick={() => handleBuyBookZalo(book)}
                      className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-gold-500 via-amber-400 to-warm-500 hover:from-gold-400 hover:to-warm-400 text-darkbrown font-black text-xs shadow-md btn-dynamic-glow btn-light-sweep flex items-center justify-center gap-1 cursor-pointer transition-transform"
                      title="Đặt mua trực tiếp qua Zalo với giá ưu đãi 40k"
                    >
                      <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Mua Zalo 40k</span>
                    </button>

                    {/* Add to Cart / Detail Button */}
                    <button
                      type="button"
                      onClick={() => handleAddToCart(book)}
                      className="py-2.5 px-2 rounded-xl bg-white hover:bg-gold-50 text-darkbrown font-bold text-xs border border-amber-300 hover:border-gold-500 shadow-sm flex items-center justify-center gap-1 transition-all"
                      title="Thêm vào giỏ hàng"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-warm-500 flex-shrink-0" />
                      <span>Thêm Giỏ</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
