import React, { useState } from 'react';
import { BookItem } from '../../types/book';
import { ADMIN_CONFIG, mapBookToProduct, get10PageSamplePdfUrl } from '../../data/bookLibrary';
import { useCart } from '../../context/CartContext';
import { 
  X, 
  BookOpen, 
  Download, 
  ShoppingBag, 
  MessageCircle, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface BookSampleReaderModalProps {
  book: BookItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookSampleReaderModal: React.FC<BookSampleReaderModalProps> = ({
  book,
  isOpen,
  onClose
}) => {
  const { addToCart, addToast } = useCart();
  const [hasDownloadedSample, setHasDownloadedSample] = useState(false);

  if (!isOpen || !book) return null;

  const sampleUrl = get10PageSamplePdfUrl(book);

  const handleDownloadSample = () => {
    setHasDownloadedSample(true);
    addToast(
      'Đang tải bản đọc thử 10 trang...',
      `Tệp mẫu 10 trang đầu của cuốn "${book.title}" đang được tải về máy!`,
      'info'
    );

    const link = document.createElement('a');
    link.href = sampleUrl;
    link.download = `[DOC THU 10 TRANG] ${book.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOrderFullZalo = () => {
    const message = encodeURIComponent(
      `Chào Thầy Leo! Em vừa xem xong bản đọc thử 10 trang của cuốn "${book.title}". Em muốn đặt mua trọn bộ ${book.pages} trang bản in nét với giá ưu đãi học viên mới 40.000 VNĐ. Nhờ Thầy hỗ trợ gửi trọn bộ giúp em với ạ!`
    );
    window.open(`https://zalo.me/${ADMIN_CONFIG.adminHotline}?text=${message}`, '_blank');
  };

  const handleAddToCart = () => {
    addToCart(mapBookToProduct(book));
    addToast('Đã thêm vào giỏ hàng', `Cuốn sách "${book.title}" đã được thêm vào giỏ!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-5xl h-[94vh] max-h-[900px] bg-[#160d07] rounded-3xl shadow-2xl border-2 border-amber-500/50 flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. TOP HEADER */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-amber-800/60 bg-[#211209] flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center flex-shrink-0 text-amber-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-500 text-darkbrown text-[10px] font-black uppercase">
                  BẢN ĐỌC THỬ
                </span>
                <span className="text-xs text-amber-200/80 font-bold hidden sm:inline">
                  Chỉ gồm 10 trang đầu tiên (1 - 10 / {book.pages} trang)
                </span>
              </div>
              <h3 className="font-black text-sm sm:text-base text-white truncate">
                {book.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={sampleUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-amber-200 transition-colors"
              title="Mở trong tab riêng"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Mở tab mới</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/15"
              title="Đóng bản đọc thử"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. NOTICE BAR */}
        <div className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-amber-950 via-warm-900 to-amber-950 border-b border-amber-800/40 text-xs flex flex-wrap items-center justify-between gap-2 flex-shrink-0">
          <div className="flex items-center gap-2 text-amber-200/90 font-medium">
            <Sparkles className="w-4 h-4 text-yellow-300 flex-shrink-0" />
            <span>
              Bạn đang xem <strong>10 trang mẫu đầu tiên</strong>. Để sở hữu trọn bộ đầy đủ <strong>{book.pages} trang chuẩn in nét</strong>, hãy đặt mua với giá ưu đãi học viên <strong>40.000đ</strong>!
            </span>
          </div>

          <span className="text-amber-400 font-extrabold text-[11px] bg-black/40 px-2 py-0.5 rounded border border-amber-500/30">
            ƯU ĐÃI: 40.000 VNĐ / CUỐN
          </span>
        </div>

        {/* 3. PDF VIEWER BODY */}
        <div className="flex-1 bg-black/60 relative overflow-hidden p-2 sm:p-4">
          <iframe
            src={`${sampleUrl}#page=1&view=FitH`}
            className="w-full h-full rounded-2xl border border-amber-500/30 bg-neutral-900 shadow-inner"
            title={`Bản đọc thử 10 trang - ${book.title}`}
          />
        </div>

        {/* 4. BOTTOM ACTION TOOLBAR */}
        <div className="p-3.5 sm:p-5 border-t border-amber-800/60 bg-[#211209] flex-shrink-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Left: Button to download the 10-page sample only */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleDownloadSample}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-400/40 text-amber-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                title="Tải tệp PDF gồm 10 trang đầu tiên về máy"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Tải 10 Trang Đọc Thử (.PDF)</span>
              </button>

              {hasDownloadedSample && (
                <span className="hidden md:flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Đã tải tệp mẫu
                </span>
              )}
            </div>

            {/* Right: Order Full Book or Add To Cart */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-amber-300 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                <span>Thêm Giỏ Hàng</span>
              </button>

              <button
                type="button"
                onClick={handleOrderFullZalo}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-darkbrown font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>MUA TRỌN BỘ {book.pages} TRANG (40K)</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
