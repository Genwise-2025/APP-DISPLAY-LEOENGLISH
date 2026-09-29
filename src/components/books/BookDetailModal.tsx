import React from 'react';
import { BookItem } from '../../types/book';
import { ADMIN_CONFIG, mapBookToProduct } from '../../data/bookLibrary';
import { useCart } from '../../context/CartContext';
import { 
  X, 
  BookOpen, 
  Download, 
  ShoppingBag, 
  Star, 
  CheckCircle, 
  ExternalLink, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';

interface BookDetailModalProps {
  book: BookItem | null;
  onClose: () => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({ book, onClose }) => {
  const { addToCart } = useCart();

  if (!book) return null;

  const handleOrderZalo = () => {
    const message = encodeURIComponent(
      `Chào Thầy Leo! Em muốn mua cuốn sách: "${book.title}" với giá ưu đãi học viên mới 40.000 VNĐ (Giá gốc 80.000 VNĐ). Em cần tải file PDF chất lượng cao!`
    );
    window.open(`https://zalo.me/${ADMIN_CONFIG.adminHotline}?text=${message}`, '_blank');
  };

  const handleAddToCart = () => {
    addToCart(mapBookToProduct(book));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-gradient-to-b from-[#FFFDF9] to-[#FFF6E9] rounded-3xl shadow-2xl border border-amber-300 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-darkbrown/70 hover:text-darkbrown flex items-center justify-center shadow-md transition-all border border-amber-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
            
            {/* Book Cover Preview */}
            <div className="w-full md:w-5/12 flex-shrink-0 flex flex-col items-center">
              <div className="relative w-full max-w-[260px] rounded-2xl bg-gradient-to-b from-amber-100 to-amber-200/50 p-4 border border-amber-300/80 shadow-xl flex items-center justify-center">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="max-h-72 w-auto object-contain rounded-lg shadow-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/books/starter-anh-van-giao-tiep-hi.jpg';
                  }}
                />

                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-black shadow-sm">
                  -50% HỌC VIÊN MỚI
                </span>
              </div>

              {/* Quick specs */}
              <div className="w-full max-w-[260px] mt-4 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-white/80 p-2 rounded-xl border border-amber-200">
                  <span className="text-gray-500 block text-[10px]">Số trang</span>
                  <span className="font-extrabold text-darkbrown">{book.pages} trang</span>
                </div>
                <div className="bg-white/80 p-2 rounded-xl border border-amber-200">
                  <span className="text-gray-500 block text-[10px]">Định dạng</span>
                  <span className="font-extrabold text-darkbrown">PDF Chuẩn In</span>
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="w-full md:w-7/12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-warm-700 text-xs font-black uppercase">
                    {book.categoryLabel}
                  </span>
                  <span className="flex items-center text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                    {book.rating || 5.0} ({book.reviewsCount || 100} đánh giá)
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-darkbrown leading-snug">
                  {book.title}
                </h2>

                {book.vietnameseTitle && (
                  <p className="text-xs sm:text-sm text-warm-600 font-bold mt-1">
                    {book.vietnameseTitle}
                  </p>
                )}

                <p className="mt-3 text-xs sm:text-sm text-darkbrown/80 leading-relaxed font-medium">
                  {book.description}
                </p>

                {/* Highlights List */}
                <div className="mt-4 space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-darkbrown flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-warm-500" />
                    Điểm nổi bật của cuốn sách:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-darkbrown/80">
                    {book.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Action Section */}
              <div className="mt-6 pt-5 border-t border-amber-200">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-xs text-gray-400 line-through mr-2 font-medium">
                      Giá gốc: {book.originalPrice.toLocaleString('vi-VN')} VNĐ
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-rose-600">
                        {book.promoPrice.toLocaleString('vi-VN')} VNĐ
                      </span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Tiết kiệm 50%
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-gray-500">
                    Tải ngay file PDF bản quyền
                  </span>
                </div>

                {/* Buttons with CSS Ánh Sáng */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleOrderZalo}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-gold-500 via-amber-400 to-warm-500 hover:from-gold-400 hover:to-warm-400 text-darkbrown font-black text-sm shadow-lg btn-dynamic-glow btn-light-sweep flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 flex-shrink-0" />
                    <span>MUA QUA ZALO 40.000Đ</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="py-3 px-4 rounded-xl bg-white hover:bg-gold-50 text-darkbrown font-extrabold text-sm border-2 border-amber-300 shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-warm-500 flex-shrink-0" />
                    <span>THÊM VÀO GIỎ HÀNG</span>
                  </button>
                </div>

                {book.pdfDownloadUrl && (
                  <div className="mt-3 text-center">
                    <a
                      href={book.pdfDownloadUrl}
                      download={`${book.title}.pdf`}
                      className="text-xs text-warm-600 hover:text-warm-700 underline font-bold inline-flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Tải file đọc thử (Sample PDF)</span>
                    </a>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
