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
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { BOOK_GROUPS, ADMIN_CONFIG } from '../../data/bookLibrary';
import { RetailBooksSection } from './RetailBooksSection';
import { BookDetailModal } from './BookDetailModal';
import { BookItem } from '../../types/book';

export const BookGroup2LandingPage: React.FC = () => {
  const { navigateToView, addToast, totalItems, setIsCartOpen, isAdminAuthenticated } = useCart();
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [downloadCount, setDownloadCount] = useState(9420);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [codeError, setCodeError] = useState('');

  const group2 = BOOK_GROUPS.find(g => g.id === 'nhom-2-t390') || BOOK_GROUPS[1];
  const groupBooks = group2.books;

  const handleVerifyCode = () => {
    if (inputCode.trim().toUpperCase() === 'T390' || inputCode.trim().toUpperCase() === group2.code) {
      setIsUnlocked(true);
      setCodeError('');
      addToast('Mở khóa thành công!', 'Mã T390 hợp lệ. Bạn có thể tải trọn bộ 6 cuốn sách ngay bây giờ!', 'success');
    } else {
      setCodeError('Mã không chính xác. Vui lòng nhắn Zalo Thầy Leo để nhận mã T390.');
    }
  };

  const handleDownloadAll = () => {
    setDownloadCount(prev => prev + 1);
    setHasDownloaded(true);
    addToast(
      '🎉 Đang tải trọn bộ sách Community 390...',
      'Bắt đầu tải trọn bộ tài liệu 6 cuốn sách chuẩn gốc về thiết bị của bạn!',
      'success'
    );

    // Download primary package file
    const link = document.createElement('a');
    link.href = group2.allDownloadUrl;
    link.download = group2.sampleFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSingleBook = (book: BookItem) => {
    const link = document.createElement('a');
    link.href = book.pdfDownloadUrl || '/downloads/1. STARTER.pdf';
    link.download = `${book.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast(`Đang tải sách: ${book.title}`, 'Tệp PDF chuẩn in nét đang được tải xuống!', 'success');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '/nhom-2-community-390');
    setIsCopiedLink(true);
    addToast('Đã sao chép link trang sách', 'Bạn có thể chia sẻ link cho bạn bè cùng nhóm học!', 'info');
    setTimeout(() => setIsCopiedLink(false), 2500);
  };

  const handleOpenZaloT390 = () => {
    const message = encodeURIComponent(
      'Chào Thầy Leo! Em là học viên nhóm Community 390. Nhờ Thầy gửi giúp em Mã Tải Sách T390 và trọn bộ Audio bài giảng của 6 cuốn sách với ạ!'
    );
    window.open(`https://zalo.me/${ADMIN_CONFIG.adminHotline}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#1c0e07] text-white flex flex-col selection:bg-amber-500 selection:text-white">
      {/* 1. TOP STICKY NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-[#1c0e07]/90 backdrop-blur-md border-b border-amber-800/60 shadow-lg px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back to Home Button */}
          <button
            type="button"
            onClick={() => navigateToView('home')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-bold transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-amber-400" />
            <span className="hidden sm:inline">Quay lại Trang Chủ</span>
            <span className="sm:hidden">Trang Chủ</span>
          </button>

          {/* Quick Switch to Group 1 and Group 3 */}
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
              onClick={() => navigateToView('nhom-3')}
              className="px-3 py-1 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-600/40 text-purple-300 transition-colors flex items-center gap-1"
            >
              <span>💎 Nhóm 3 (Combo L299)</span>
            </button>
          </div>

          {/* Right Action: Hotline, Share & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleCopyLink}
              title="Sao chép link trang này"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-500/30 text-amber-200 transition-colors hidden sm:flex items-center gap-1.5 text-xs font-bold"
            >
              {isCopiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{isCopiedLink ? 'Đã chép link' : 'Chia sẻ'}</span>
            </button>

            <a
              href={`https://zalo.me/${ADMIN_CONFIG.adminHotline}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600/90 hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-sm"
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

      {/* 2. HERO SPOTLIGHT SECTION FOR NHÓM 2: COMMUNITY 390 */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-[#1c0e07] via-[#29140a] to-[#341a0d] border-b border-amber-800/80">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Slogan Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-inner">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
              <span>ĐẶC QUYỀN HỌC VIÊN COMMUNITY 390 — TRỌN BỘ 6 ĐẦU SÁCH VIP</span>
            </div>
          </div>

          {/* Hero Main Header */}
          <div className="text-center max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              NHÓM 2: TRỌN BỘ <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">COMMUNITY 390</span>
            </h1>
            <p className="mt-3 text-lg sm:text-2xl font-bold text-amber-200">
              (COMBO 6 CUỐN ĐÀM THOẠI, TỪ VỰNG & TRUYỆN ĐỌC TOÀN DIỆN)
            </p>
            <p className="mt-4 text-sm sm:text-base text-amber-100/80 leading-relaxed font-medium max-w-2xl mx-auto">
              Trọn bộ tài liệu giá trị nhất giúp bạn xây vững nền tảng từ vựng, phản xạ giao tiếp đời sống, siêu thị, nhà hàng, khách sạn và đọc truyện tiếng Anh tự nhiên!
            </p>
          </div>

          {/* DUAL SPOTLIGHT 2 QUYỂN LÊN ĐẦU TRANG TRƯNG BÀY (THEO YÊU CẦU CỦA BẠN) */}
          <div className="max-w-5xl mx-auto mb-10 bg-black/40 border border-amber-500/40 rounded-3xl p-5 sm:p-7 backdrop-blur-xl shadow-2xl">
            <div className="text-center mb-5">
              <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-widest">
                ⭐ 2 GIÁO TRÌNH CỐT LÕI HÀNG ĐẦU CỦA COMMUNITY 390 ⭐
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center">
              {/* Sách 1: STARTER FULL */}
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-amber-500/30 hover:border-amber-400 transition-all group">
                <div 
                  onClick={() => setSelectedBook(groupBooks[0])}
                  className="w-24 sm:w-28 flex-shrink-0 rounded-xl overflow-hidden shadow-lg border border-amber-400/40 aspect-[3/4] bg-black/50 cursor-pointer"
                >
                  <img
                    src="/images/books/starter-anh-van-giao-tiep-hi.jpg"
                    alt="TIENG ANH CHO NGUOI MAT GOC- STARTER full"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[10px] font-black text-amber-300 bg-amber-950 px-2 py-0.5 rounded w-max mb-1 border border-amber-600/40">
                    QUYỂN TRỌNG TÂM #1
                  </span>
                  <h3 
                    onClick={() => setSelectedBook(groupBooks[0])}
                    className="font-black text-white text-sm sm:text-base leading-snug hover:text-amber-300 cursor-pointer line-clamp-2"
                  >
                    TIENG ANH CHO NGUOI MAT GOC - STARTER full
                  </h3>
                  <p className="text-xs text-amber-100/70 mt-1 line-clamp-2">
                    Lộ trình chuẩn chỉnh 24 bài xây lại nền tảng từ vựng, ngữ pháp và phát âm IPA.
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDownloadSingleBook(groupBooks[0])}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-darkbrown font-black text-xs flex items-center gap-1 shadow"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Tải Cuốn 1</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedBook(groupBooks[0])}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sách 2: 1000 CÂU PHẢN XẠ */}
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-emerald-500/40 hover:border-emerald-400 transition-all group">
                <div 
                  onClick={() => setSelectedBook(groupBooks[1])}
                  className="w-24 sm:w-28 flex-shrink-0 rounded-xl overflow-hidden shadow-lg border border-emerald-400/40 aspect-[3/4] bg-black/50 cursor-pointer"
                >
                  <img
                    src="/images/books/leoenglish-1000-cau-phan-xa.png"
                    alt="1000 Câu Phản Xạ Anh Văn Thực Chiến EBOOK"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[10px] font-black text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded w-max mb-1 border border-emerald-600/40">
                    QUYỂN TRỌNG TÂM #2
                  </span>
                  <h3 
                    onClick={() => setSelectedBook(groupBooks[1])}
                    className="font-black text-white text-sm sm:text-base leading-snug hover:text-emerald-300 cursor-pointer line-clamp-2"
                  >
                    1000 Câu Phản Xạ Anh Văn Thực Chiến EBOOK
                  </h3>
                  <p className="text-xs text-emerald-100/70 mt-1 line-clamp-2">
                    Độc quyền phương pháp Swivox 3 giây — Phản xạ tức thì kèm toàn bộ đáp án.
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDownloadSingleBook(groupBooks[1])}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs flex items-center gap-1 shadow"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Tải Cuốn 2</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedBook(groupBooks[1])}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 🌟 NÚT TẢI SÁCH THẬT TO CHO NHÓM 2 (COMMUNITY 390) 🌟 */}
          {/* ============================================================== */}
          <div className="max-w-3xl mx-auto mb-12">
            <a
              href={group2.allDownloadUrl}
              download={group2.sampleFileName}
              onClick={handleDownloadAll}
              className="group relative w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-8 sm:px-12 py-6 sm:py-7 rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-darkbrown font-black shadow-[0_0_45px_rgba(245,158,11,0.7)] hover:shadow-[0_0_65px_rgba(251,191,36,0.85)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border-2 border-amber-200 overflow-hidden cursor-pointer"
            >
              {/* Shimmer light sweep effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

              {/* Pulsing Icon */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-black/10 flex items-center justify-center backdrop-blur-md shadow-inner flex-shrink-0 animate-bounce">
                <Download className="w-8 h-8 sm:w-10 sm:h-10 text-darkbrown drop-shadow-md" />
              </div>

              {/* Massive Text Display */}
              <div className="flex flex-col text-center sm:text-left">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-darkbrown drop-shadow leading-tight">
                  TẢI TRỌN BỘ COMMUNITY 390 NGAY
                </span>
                <span className="text-xs sm:text-sm lg:text-base font-extrabold text-amber-950 flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1">
                  <span>⚡ 6 CUỐN FILE PDF GỐC</span>
                  <span>•</span>
                  <span>GẦN 860 TRANG NỘI DUNG</span>
                  <span>•</span>
                  <span className="bg-darkbrown text-amber-300 px-2 py-0.5 rounded font-black text-xs">MÃ TẢI: T390</span>
                </span>
              </div>
            </a>

            {/* Quick Actions Row */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
              <button
                type="button"
                onClick={handleOpenZaloT390}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white font-bold transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Nhắn Zalo Thầy Leo nhận mã T390 &amp; Audio</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('community-6-books-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-400/40 text-amber-200 font-bold transition-all"
              >
                <Eye className="w-4 h-4 text-amber-300" />
                <span>Xem chi tiết &amp; tải lẻ 6 cuốn dưới đây</span>
              </button>
            </div>

            {hasDownloaded && (
              <div className="mt-3 p-3 rounded-xl bg-amber-900/80 border border-amber-400 text-amber-200 text-xs sm:text-sm font-bold flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Trọn bộ sách đang được tải về! Bạn có thể xem từng cuốn hoặc tải lẻ ở danh sách 6 cuốn ngay bên dưới.</span>
              </div>
            )}
          </div>

          {/* 3. SHOWCASE 6 CUỐN SÁCH THUỘC NHÓM 2 */}
          <div id="community-6-books-grid" className="mt-16">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                DANH SÁCH 6 CUỐN SÁCH BẢN QUYỀN
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                Trọn Bộ 6 Cuốn Ebook Thuộc Gói Community 390
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/80 mt-1">
                Bấm vào từng cuốn để xem chi tiết hoặc bấm nút tải riêng từng cuốn
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupBooks.map((book, idx) => (
                <div
                  key={book.id}
                  className="bg-white/5 border border-amber-500/30 rounded-2xl p-5 hover:border-amber-400/80 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    {/* Top Tag & Number */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 font-black text-xs flex items-center justify-center border border-amber-400/40">
                        {idx + 1}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/40">
                        {book.categoryLabel || 'COMMUNITY 390'}
                      </span>
                    </div>

                    {/* Book Cover Image */}
                    <div 
                      onClick={() => setSelectedBook(book)}
                      className="relative rounded-xl overflow-hidden mb-4 cursor-pointer bg-black/40 aspect-[3/4] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
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
                      className="font-black text-base sm:text-lg text-white hover:text-amber-300 transition-colors cursor-pointer line-clamp-2"
                    >
                      {book.title}
                    </h4>
                    {book.vietnameseTitle && (
                      <p className="text-xs text-amber-200/80 line-clamp-1 mt-1 font-medium">
                        {book.vietnameseTitle}
                      </p>
                    )}

                    {/* Meta info */}
                    <div className="mt-3 flex items-center gap-3 text-xs text-amber-200/60">
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
                      className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-darkbrown font-black text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Tải Cuốn Này</span>
                    </button>

                    <a
                      href={book.pdfDownloadUrl || '/downloads/1. STARTER.pdf'}
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

          {/* 4. ROADMAP & VALUE OF COMMUNITY 390 */}
          <div className="mt-16 bg-white/5 border border-amber-500/20 rounded-3xl p-6 sm:p-10 backdrop-blur-md">
            <h3 className="text-xl sm:text-2xl font-black text-center text-amber-300 mb-6">
              LỘ TRÌNH 4 BƯỚC CHINH PHỤC TIẾNG ANH VỚI BỘ COMMUNITY 390
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-700/40">
                <span className="text-xs font-black text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">BƯỚC 1</span>
                <h4 className="font-bold text-white text-sm mt-2">Lấy Lại Gốc Toàn Diện</h4>
                <p className="text-xs text-amber-100/70 mt-1">Xây nền với cuốn STARTER FULL 24 bài & bảng phiên âm quốc tế IPA.</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-700/40">
                <span className="text-xs font-black text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">BƯỚC 2</span>
                <h4 className="font-bold text-white text-sm mt-2">Nạp 500 Từ Vựng Đời Sống</h4>
                <p className="text-xs text-amber-100/70 mt-1">Nắm vững 500 từ vựng cốt lõi & tình huống mua sắm tại siêu thị.</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-700/40">
                <span className="text-xs font-black text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">BƯỚC 3</span>
                <h4 className="font-bold text-white text-sm mt-2">Đàm Thoại Đường Phố</h4>
                <p className="text-xs text-amber-100/70 mt-1">200 mẫu câu thực tế tại quán cà phê, khách sạn, bãi xe và chợ.</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-700/40">
                <span className="text-xs font-black text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">BƯỚC 4</span>
                <h4 className="font-bold text-white text-sm mt-2">Đột Phá Phản Xạ &amp; Truyện</h4>
                <p className="text-xs text-amber-100/70 mt-1">Thực hành 1000 câu phản xạ Swivox và đọc truyện Cô gái tóc đỏ.</p>
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
      <footer className="bg-[#120803] border-t border-amber-900/60 py-10 px-4 sm:px-8 text-center text-xs text-amber-300/70">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-white text-sm">LEO ENGLISH EDUCATION</span>
            <span>•</span>
            <span>Bộ Sách Nhóm 2 Community 390 (Mã: T390)</span>
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
