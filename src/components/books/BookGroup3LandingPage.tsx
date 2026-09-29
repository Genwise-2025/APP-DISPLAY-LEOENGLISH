import React, { useState } from 'react';
import { 
  Download, 
  ArrowLeft, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Star, 
  FileText, 
  Eye, 
  MessageCircle, 
  Zap, 
  Headphones, 
  Video, 
  ShieldCheck, 
  Share2, 
  Check, 
  ExternalLink,
  ShoppingBag,
  Clock,
  Layers,
  Award,
  Lock,
  Unlock,
  KeyRound,
  ArrowRight,
  Flame
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { BOOK_GROUPS, ADMIN_CONFIG } from '../../data/bookLibrary';
import { RetailBooksSection } from './RetailBooksSection';
import { BookDetailModal } from './BookDetailModal';
import { BookItem } from '../../types/book';

export const BookGroup3LandingPage: React.FC = () => {
  const { navigateToView, addToast, totalItems, setIsCartOpen, isAdminAuthenticated } = useCart();
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [downloadCount, setDownloadCount] = useState(8150);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [codeError, setCodeError] = useState('');

  const group3 = BOOK_GROUPS.find(g => g.id === 'nhom-3-l299vip') || BOOK_GROUPS[2];
  const groupBooks = group3.books;

  const handleVerifyCode = () => {
    if (inputCode.trim().toUpperCase() === 'L299VIP' || inputCode.trim().toUpperCase() === group3.code) {
      setIsUnlocked(true);
      setCodeError('');
      addToast('Mở khóa VIP thành công!', 'Mã L299VIP hợp lệ. Bạn có thể tải trọn bộ 4 cuốn sách ngay bây giờ!', 'success');
    } else {
      setCodeError('Mã không chính xác. Vui lòng nhắn Zalo Thầy Leo để nhận mã L299VIP.');
    }
  };

  const handleDownloadAll = () => {
    setDownloadCount(prev => prev + 1);
    setHasDownloaded(true);
    addToast(
      '🎉 Đang tải trọn bộ Combo VIP L299...',
      'Bắt đầu tải trọn bộ 4 cuốn sách tinh hoa về thiết bị của bạn!',
      'success'
    );

    // Download primary package file
    const link = document.createElement('a');
    link.href = group3.allDownloadUrl;
    link.download = group3.sampleFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSingleBook = (book: BookItem) => {
    const link = document.createElement('a');
    link.href = book.pdfDownloadUrl || '/downloads/2. BEGINNER.pdf';
    link.download = `${book.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast(`Đang tải sách: ${book.title}`, 'Tệp PDF VIP chất lượng cao đang được tải xuống!', 'success');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '/nhom-3-combo-l299');
    setIsCopiedLink(true);
    addToast('Đã sao chép link trang sách', 'Bạn có thể chia sẻ link cho bạn bè cùng nhóm VIP!', 'info');
    setTimeout(() => setIsCopiedLink(false), 2500);
  };

  const handleOpenZaloL299 = () => {
    const message = encodeURIComponent(
      'Chào Thầy Leo! Em là học viên gói Combo VIP L299. Nhờ Thầy gửi giúp em Mã Tải Sách L299VIP và toàn bộ Audio bài giảng của 4 cuốn sách tinh hoa với ạ!'
    );
    window.open(`https://zalo.me/${ADMIN_CONFIG.adminHotline}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#130722] text-white flex flex-col selection:bg-purple-500 selection:text-white">
      {/* 1. TOP STICKY NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-[#130722]/90 backdrop-blur-md border-b border-purple-800/60 shadow-lg px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back to Home Button */}
          <button
            type="button"
            onClick={() => navigateToView('home')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-purple-500/40 text-purple-200 text-xs sm:text-sm font-bold transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-amber-400" />
            <span className="hidden sm:inline">Quay lại Trang Chủ</span>
            <span className="sm:hidden">Trang Chủ</span>
          </button>

          {/* Quick Switch to Group 1 and Group 2 */}
          <div className="hidden md:flex items-center gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => navigateToView('1000-cau')}
              className="px-3 py-1 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-600/40 text-emerald-300 transition-colors flex items-center gap-1"
            >
              <span>📗 Nhóm 1 (1000 Câu)</span>
            </button>
            <button
              type="button"
              onClick={() => navigateToView('nhom-2')}
              className="px-3 py-1 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 border border-amber-600/40 text-amber-300 transition-colors flex items-center gap-1"
            >
              <span>⭐ Nhóm 2 (Community 390)</span>
            </button>
          </div>

          {/* Right Action: Hotline, Share & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleCopyLink}
              title="Sao chép link trang này"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-purple-500/30 text-purple-200 transition-colors hidden sm:flex items-center gap-1.5 text-xs font-bold"
            >
              {isCopiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{isCopiedLink ? 'Đã chép link' : 'Chia sẻ'}</span>
            </button>

            <a
              href={`https://zalo.me/${ADMIN_CONFIG.adminHotline}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/90 hover:bg-purple-600 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Zalo Hỗ Trợ</span>
            </a>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 transition-colors"
              title="Giỏ hàng"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* 2. HERO SPOTLIGHT SECTION FOR NHÓM 3: COMBO VIP L299 */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-[#130722] via-[#200c39] to-[#2c104e] border-b border-purple-800/80">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Slogan Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>ĐẶC QUYỀN HỌC VIÊN KHÓA HỌC L299 — BỘ 4 CUỐN SÁCH TINH HOA VIP</span>
            </div>
          </div>

          {/* Hero Main Header */}
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              NHÓM 3: COMBO <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300">VIP L299</span>
            </h1>
            <p className="mt-3 text-lg sm:text-2xl font-bold text-amber-300">
              (BỘ 4 CUỐN SÁCH TINH HOA TĂNG TỐC PHẢN XẠ &amp; KHẨU NGỮ ĐỘT PHÁ)
            </p>
            <p className="mt-4 text-sm sm:text-base text-purple-200/80 leading-relaxed font-medium max-w-2xl mx-auto">
              Sự kết hợp hoàn hảo giữa phương pháp xây nền mất gốc, nạp 500 cụm từ nói lưu loát chuẩn Mỹ, vốn từ vựng đời sống và truyện đọc song ngữ thẩm thấu tự nhiên!
            </p>
          </div>

          {/* ============================================================== */}
          {/* 🌟 NÚT TẢI SÁCH THẬT TO CHO NHÓM 3 (COMBO VIP L299) 🌟 */}
          {/* ============================================================== */}
          <div className="max-w-3xl mx-auto mb-12">
            <a
              href={group3.allDownloadUrl}
              download={group3.sampleFileName}
              onClick={handleDownloadAll}
              className="group relative w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-8 sm:px-12 py-6 sm:py-7 rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-400 text-white font-black shadow-[0_0_45px_rgba(168,85,247,0.7)] hover:shadow-[0_0_65px_rgba(245,158,11,0.85)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border-2 border-purple-300 overflow-hidden cursor-pointer"
            >
              {/* Shimmer light sweep effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

              {/* Pulsing Icon */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner flex-shrink-0 animate-bounce">
                <Download className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-md" />
              </div>

              {/* Massive Text Display */}
              <div className="flex flex-col text-center sm:text-left">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white drop-shadow leading-tight">
                  TẢI TRỌN BỘ COMBO VIP L299 NGAY
                </span>
                <span className="text-xs sm:text-sm lg:text-base font-extrabold text-amber-200 flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1">
                  <span>⚡ 4 CUỐN EBOOK TINH HOA</span>
                  <span>•</span>
                  <span>HƠN 580 TRANG MÀU ĐẸP</span>
                  <span>•</span>
                  <span className="bg-amber-400 text-purple-950 px-2 py-0.5 rounded font-black text-xs">MÃ TẢI: L299VIP</span>
                </span>
              </div>
            </a>

            {/* Quick Actions Row */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
              <button
                type="button"
                onClick={handleOpenZaloL299}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Nhắn Zalo Thầy Leo nhận mã L299VIP &amp; Audio</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('combo-4-books-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-purple-400/40 text-purple-200 font-bold transition-all"
              >
                <Eye className="w-4 h-4 text-amber-300" />
                <span>Xem chi tiết &amp; tải lẻ 4 cuốn dưới đây</span>
              </button>
            </div>

            {hasDownloaded && (
              <div className="mt-3 p-3 rounded-xl bg-purple-900/80 border border-purple-400 text-purple-200 text-xs sm:text-sm font-bold flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Trọn bộ Combo VIP L299 đang được tải về! Bạn có thể xem từng cuốn hoặc tải lẻ ở danh sách 4 cuốn ngay bên dưới.</span>
              </div>
            )}
          </div>

          {/* 3. SHOWCASE 4 CUỐN SÁCH THUỘC NHÓM 3 */}
          <div id="combo-4-books-grid" className="mt-16">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/40">
                BỘ TỨ TINH HOA KHÓA HỌC L299
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                Trọn Bộ 4 Cuốn Ebook VIP Đặc Quyền
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
                Bấm vào từng cuốn để xem chi tiết hoặc bấm nút tải riêng từng cuốn
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {groupBooks.map((book, idx) => (
                <div
                  key={book.id}
                  className="bg-white/5 border border-purple-500/30 rounded-2xl p-5 hover:border-purple-400/80 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    {/* Top Tag & Number */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-7 h-7 rounded-lg bg-purple-500/30 text-purple-300 font-black text-xs flex items-center justify-center border border-purple-400/40">
                        {idx + 1}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-600/40">
                        {book.categoryLabel || 'COMBO VIP'}
                      </span>
                    </div>

                    {/* Book Cover Image */}
                    <div 
                      onClick={() => setSelectedBook(book)}
                      className="relative rounded-xl overflow-hidden mb-4 cursor-pointer bg-black/40 aspect-[3/4] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all"
                    >
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" /> Bấm để xem chi tiết
                        </span>
                      </div>
                    </div>

                    {/* Titles */}
                    <h4 
                      onClick={() => setSelectedBook(book)}
                      className="font-black text-base sm:text-lg text-white hover:text-purple-300 transition-colors cursor-pointer line-clamp-2"
                    >
                      {book.title}
                    </h4>
                    {book.vietnameseTitle && (
                      <p className="text-xs text-purple-200/80 line-clamp-1 mt-1 font-medium">
                        {book.vietnameseTitle}
                      </p>
                    )}

                    {/* Meta info */}
                    <div className="mt-3 flex items-center gap-2 text-xs text-purple-200/60">
                      <span>📄 {book.pages} trang</span>
                      <span>•</span>
                      <span>💾 {book.fileSize}</span>
                      <span>•</span>
                      <span className="text-amber-400 font-bold">⭐ {book.rating || 5.0}</span>
                    </div>
                  </div>

                  {/* Actions for this specific book */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDownloadSingleBook(book)}
                      className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-black text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Tải Cuốn Này</span>
                    </button>

                    <a
                      href={book.pdfDownloadUrl || '/downloads/2. BEGINNER.pdf'}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
                      title="Đọc trực tiếp online"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. VALUE PILLARS OF COMBO VIP L299 */}
          <div className="mt-16 bg-white/5 border border-purple-500/20 rounded-3xl p-6 sm:p-10 backdrop-blur-md">
            <h3 className="text-xl sm:text-2xl font-black text-center text-amber-300 mb-6">
              4 BƯỚC ĐỘT PHÁ NÓI TIẾNG ANH LƯU LOÁT CÙNG COMBO VIP L299
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-700/40">
                <span className="text-xs font-black text-amber-300 bg-purple-500/30 px-2 py-0.5 rounded">GIAI ĐOẠN 1</span>
                <h4 className="font-bold text-white text-sm mt-2">Xóa Mù Mất Gốc 24 Unit</h4>
                <p className="text-xs text-purple-200/70 mt-1">Xây dựng gốc rễ phát âm IPA và câu nói chào hỏi, sinh hoạt với STARTER full.</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-700/40">
                <span className="text-xs font-black text-amber-300 bg-purple-500/30 px-2 py-0.5 rounded">GIAI ĐOẠN 2</span>
                <h4 className="font-bold text-white text-sm mt-2">Nạp 500 Từ Vựng Cốt Lõi</h4>
                <p className="text-xs text-purple-200/70 mt-1">Ghi nhớ sâu 500 từ vựng song ngữ thiết thực trong cuộc sống hàng ngày.</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-700/40">
                <span className="text-xs font-black text-amber-300 bg-purple-500/30 px-2 py-0.5 rounded">GIAI ĐOẠN 3</span>
                <h4 className="font-bold text-white text-sm mt-2">500 Cụm Từ Nói Mượt Chuẩn Tây</h4>
                <p className="text-xs text-purple-200/70 mt-1">Nói lưu loát không ngập ngừng nhờ 500 collocations &amp; idioms tự nhiên.</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-700/40">
                <span className="text-xs font-black text-amber-300 bg-purple-500/30 px-2 py-0.5 rounded">GIAI ĐOẠN 4</span>
                <h4 className="font-bold text-white text-sm mt-2">Đọc Truyện Cảm Thụ Tự Nhiên</h4>
                <p className="text-xs text-purple-200/70 mt-1">Thư giãn cùng cuốn truyện Cô Gái Tóc Đỏ để ngấm ngữ pháp vào tiềm thức.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. DƯỚI LÀ GIỚI THIỆU CÁC SÁCH KHÁC GIỐNG TRANG LÚC NÃY (THEO YÊU CẦU CỦA BẠN) */}
      <section className="relative z-10 bg-[#FFF9EF]">
        <RetailBooksSection
          onSelectBook={(book) => setSelectedBook(book)}
        />
      </section>

      {/* 6. MODALS */}
      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      {/* 7. FOOTER */}
      <footer className="bg-[#0b0314] border-t border-purple-900/60 py-10 px-4 sm:px-8 text-center text-xs text-purple-300/70">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-white text-sm">LEO ENGLISH EDUCATION</span>
            <span>•</span>
            <span>Bộ Sách Nhóm 3 Combo VIP L299 (Mã: L299VIP)</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <button 
              type="button" 
              onClick={() => navigateToView('home')} 
              className="text-amber-400 hover:underline"
            >
              Về Trang Chủ App &amp; Sách
            </button>
            <span>•</span>
            <a 
              href={`https://zalo.me/${ADMIN_CONFIG.adminHotline}`} 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white"
            >
              Hotline/Zalo: 0799.713.094
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
