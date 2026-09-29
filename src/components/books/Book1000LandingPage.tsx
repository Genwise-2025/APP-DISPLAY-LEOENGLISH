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
  Award
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ALL_LIBRARY_BOOKS, ADMIN_CONFIG } from '../../data/bookLibrary';
import { RetailBooksSection } from './RetailBooksSection';
import { BookDetailModal } from './BookDetailModal';
import { BookItem } from '../../types/book';

export const Book1000LandingPage: React.FC = () => {
  const { navigateToView, addToast, totalItems, setIsCartOpen } = useCart();
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [downloadCount, setDownloadCount] = useState(14820);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [isCopiedLink, setIsCopiedLink] = useState(false);

  const book1000 = ALL_LIBRARY_BOOKS.find(b => b.id === 'book-1000-phan-xa') || ALL_LIBRARY_BOOKS[0];
  const pdfDownloadUrl = '/downloads/LEOENGLISH_1000_CAU_PHAN_XA_KEM_DAP_AN (1).pdf';
  const cleanPdfUrl = '/downloads/LEOENGLISH_1000_CAU_PHAN_XA_KEM_DAP_AN.pdf';

  const handleDownloadClick = () => {
    setDownloadCount(prev => prev + 1);
    setHasDownloaded(true);
    addToast(
      '🎉 Đang tải sách 1000 Câu Phản Xạ...',
      'Bản PDF 210 trang đầy đủ kèm đáp án đang được tải xuống máy của bạn!',
      'success'
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '/sach-1000-cau');
    setIsCopiedLink(true);
    addToast('Đã sao chép link trang sách', 'Bạn có thể chia sẻ link cho bạn bè cùng tải học nhé!', 'info');
    setTimeout(() => setIsCopiedLink(false), 2500);
  };

  const handleOpenZaloAudio = () => {
    const message = encodeURIComponent(
      'Chào Thầy Leo! Em vừa tải sách "1000 Câu Phản Xạ Thực Chiến Kèm Đáp Án" trên web. Nhờ Thầy gửi giúp em link bộ Audio luyện nghe và bài giảng đi kèm nhé!'
    );
    window.open(`https://zalo.me/${ADMIN_CONFIG.adminHotline}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#061e14] text-white flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* 1. TOP STICKY NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-[#061e14]/90 backdrop-blur-md border-b border-emerald-800/60 shadow-lg px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back to Home Button */}
          <button
            type="button"
            onClick={() => navigateToView('home')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm font-bold transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-amber-400" />
            <span className="hidden sm:inline">Quay lại Trang Chủ</span>
            <span className="sm:hidden">Trang Chủ</span>
          </button>

          {/* Quick Switch to Group 2 and Group 3 */}
          <div className="hidden md:flex items-center gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => navigateToView('nhom-2')}
              className="px-3 py-1 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 border border-amber-600/40 text-amber-300 transition-colors flex items-center gap-1"
            >
              <span>⭐ Nhóm 2 (Community 390)</span>
            </button>
            <button
              type="button"
              onClick={() => navigateToView('nhom-3')}
              className="px-3 py-1 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-600/40 text-purple-300 transition-colors flex items-center gap-1"
            >
              <span>💎 Nhóm 3 (Combo L299)</span>
            </button>
          </div>

          {/* Logo Brand */}
          <div 
            onClick={() => navigateToView('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-300 flex items-center justify-center shadow-md border border-emerald-300">
              <BookOpen className="w-5 h-5 text-emerald-950 font-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-base sm:text-lg tracking-tight text-white flex items-center gap-1 leading-none">
                LEO <span className="text-amber-400">ENGLISH</span>
              </span>
              <span className="text-[9px] text-emerald-300 font-bold uppercase tracking-wider">Học Thật • Nói Thật</span>
            </div>
          </div>

          {/* Right Action: Hotline, Share & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleCopyLink}
              title="Sao chép link trang này"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-emerald-500/30 text-emerald-200 transition-colors hidden sm:flex items-center gap-1.5 text-xs font-bold"
            >
              {isCopiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{isCopiedLink ? 'Đã chép link' : 'Chia sẻ'}</span>
            </button>

            <a
              href={`https://zalo.me/${ADMIN_CONFIG.adminHotline}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-bold transition-colors shadow-sm"
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

      {/* 2. HERO SPOTLIGHT SECTION FOR 1000 CÂU PHẢN XẠ */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-[#061e14] via-[#04281b] to-[#0a3524] border-b border-emerald-800/80">
        {/* Glowing backdrop ambient orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Slogan Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span>GIÁO TRÌNH GỐC ĐỘC QUYỀN — PHÁT HÀNH BẢN ĐẦY ĐỦ 2026</span>
            </div>
          </div>

          {/* Main 2-Column Hero Card */}
          <div className="bg-white/5 border border-emerald-500/30 backdrop-blur-xl rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: 3D Book Cover Presentation */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative group max-w-[340px] sm:max-w-[380px] w-full">
                  {/* Glowing halo behind book */}
                  <div className="absolute -inset-3 bg-gradient-to-r from-emerald-500 to-amber-400 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-700 animate-pulse" />
                  
                  {/* Book Cover Frame */}
                  <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-300/60 shadow-2xl bg-[#03150d]">
                    <img
                      src="/images/books/leoenglish-1000-cau-phan-xa.png"
                      alt="1000 Câu Phản Xạ Thực Chiến Leo English"
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge Overlay */}
                    <div className="absolute top-3 left-3 bg-rose-600 text-white text-[11px] font-black px-2.5 py-1 rounded-lg shadow-md uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      <span>BẢN GỐC 210 TRANG</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md rounded-xl p-2.5 border border-emerald-500/40 flex items-center justify-between text-xs">
                      <span className="text-emerald-300 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Kèm Đáp Án 100%
                      </span>
                      <span className="text-amber-300 font-extrabold">2.1 MB • PDF</span>
                    </div>
                  </div>
                </div>

                {/* Live Stats Under Book */}
                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-emerald-200/90 font-medium">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-extrabold text-white text-sm">5.0</span>
                    <span>/5.0</span>
                  </div>
                  <span>•</span>
                  <span>{downloadCount.toLocaleString()} lượt tải về</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">100% Miễn Phí</span>
                </div>
              </div>

              {/* Right Column: Book Details & HUGE DOWNLOAD BUTTON */}
              <div className="lg:col-span-7 flex flex-col">
                
                {/* Badge & Title */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-400/40">
                    Phản Xạ Giao Tiếp A1 - B2
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/40">
                    Phương pháp Swivox 3s
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  1000 CÂU PHẢN XẠ <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">THỰC CHIẾN</span>
                </h1>

                <p className="mt-2 text-base sm:text-xl font-bold text-amber-300/95">
                  (DỊCH SONG NGỮ • KÈM ĐÁP ÁN ĐẦY ĐỦ • BẢN ĐỘC QUYỀN THẦY LEO)
                </p>

                {/* Slogan */}
                <div className="mt-4 p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-600/40 text-emerald-200 text-sm sm:text-base italic leading-relaxed">
                  "Nói tiếng Anh tự nhiên hơn trong mọi tình huống! Không còn cảnh dịch từng chữ từ tiếng Việt sang tiếng Anh — phản xạ tức thì chỉ sau 3 giây!"
                </div>

                {/* 4 Feature Cards */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 my-6">
                  <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-emerald-500/20">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm">
                      <Zap className="w-4 h-4" />
                      <span>Phản xạ nhanh 3s</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-300 mt-1">Tự tin ứng biến trong thực tế, không cần dịch nhẩm trong đầu.</p>
                  </div>

                  <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-emerald-500/20">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Thực hành mỗi ngày</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-300 mt-1">Lộ trình bài bản, thấy rõ sự tiến bộ vượt bậc chỉ sau 2-4 tuần.</p>
                  </div>

                  <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-emerald-500/20">
                    <div className="flex items-center gap-2 text-teal-400 font-bold text-xs sm:text-sm">
                      <BookOpen className="w-4 h-4" />
                      <span>Học siêu dễ hiểu</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-300 mt-1">Dịch song ngữ từng câu, kèm bảng phiên âm IPA và giải thích chuẩn.</p>
                  </div>

                  <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-emerald-500/20">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-xs sm:text-sm">
                      <Video className="w-4 h-4" />
                      <span>Học qua live cùng Thầy</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-300 mt-1">Xem video phân tích, chỉnh phát âm và đồng hành cùng Thầy Leo.</p>
                  </div>
                </div>

                {/* ============================================================== */}
                {/* 🌟 NÚT TẢI SÁCH THẬT TO Ở QUYỂN 1000 CÂU (THEO YÊU CẦU CỦA BẠN) 🌟 */}
                {/* ============================================================== */}
                <div className="mt-2 mb-6">
                  <a
                    href={cleanPdfUrl}
                    download="LEOENGLISH_1000_CAU_PHAN_XA_KEM_DAP_AN.pdf"
                    onClick={handleDownloadClick}
                    className="group relative w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-8 sm:px-12 py-6 sm:py-7 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-400 text-white font-black shadow-[0_0_45px_rgba(16,185,129,0.7)] hover:shadow-[0_0_65px_rgba(245,158,11,0.85)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border-2 border-emerald-200 overflow-hidden cursor-pointer"
                  >
                    {/* Animated Light Sweep Line */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                    {/* Big Pulsing Icon */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner flex-shrink-0 animate-bounce">
                      <Download className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-md" />
                    </div>

                    {/* Massive Text Display */}
                    <div className="flex flex-col text-center sm:text-left">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white drop-shadow-lg leading-tight">
                        TẢI SÁCH 1000 CÂU NGAY
                      </span>
                      <span className="text-xs sm:text-sm lg:text-base font-extrabold text-amber-100 flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1 drop-shadow">
                        <span>⚡ BẢN GỐC 210 TRANG</span>
                        <span>•</span>
                        <span>KÈM ĐÁP ÁN 100%</span>
                        <span>•</span>
                        <span className="bg-amber-400 text-emerald-950 px-2 py-0.5 rounded font-black text-xs">MIỄN PHÍ TẢI VỀ</span>
                      </span>
                    </div>
                  </a>

                  {hasDownloaded && (
                    <div className="mt-3 p-3 rounded-xl bg-emerald-900/80 border border-emerald-400 text-emerald-200 text-xs sm:text-sm font-bold flex items-center gap-2 animate-fadeIn">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Sách đang được tải về thiết bị của bạn! Bạn có thể bấm nút dưới để xem trực tiếp hoặc nhận audio.</span>
                    </div>
                  )}
                </div>

                {/* Secondary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Read Online Button */}
                  <a
                    href={cleanPdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-emerald-400/40 text-emerald-200 text-xs sm:text-sm font-bold transition-all"
                  >
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span>Xem Thử / Đọc Trực Tiếp</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>

                  {/* Zalo Audio Request */}
                  <button
                    type="button"
                    onClick={handleOpenZaloAudio}
                    className="flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-blue-600/80 hover:bg-blue-600 border border-blue-400 text-white text-xs sm:text-sm font-bold transition-all shadow-md"
                  >
                    <Headphones className="w-4 h-4 text-amber-300" />
                    <span>Nhận Bộ Audio MP3 Qua Zalo</span>
                  </button>
                </div>

                {/* File info notice */}
                <div className="mt-4 flex items-center gap-2 text-[11px] text-gray-400">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tên tệp gốc: <strong className="text-gray-200 font-mono">LEOENGLISH_1000_CAU_PHAN_XA_KEM_DAP_AN (1).pdf</strong> (2.1 MB)</span>
                </div>

              </div>
            </div>
          </div>

          {/* 4 STAGES ROADMAP IN THE BOOK */}
          <div className="mt-12">
            <div className="text-center mb-6">
              <h3 className="text-lg sm:text-2xl font-black text-amber-300">
                LỘ TRÌNH 4 CHẶNG THỰC CHIẾN TRONG 210 TRANG SÁCH
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">Được biên soạn khoa học theo từng cấp độ từ cơ bản đến nâng cao phản xạ tức thì</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-emerald-950/70 border border-emerald-700/50 rounded-2xl p-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 font-black flex items-center justify-center mb-2">1</div>
                <h4 className="font-black text-sm text-white">Chặng 1: Nền Tảng (Câu 1 - 250)</h4>
                <p className="text-xs text-emerald-200/70 mt-1">Chào hỏi, giới thiệu bản thân, thói quen và 50 ngữ cảnh giao tiếp đời sống gần gũi nhất.</p>
              </div>

              <div className="bg-emerald-950/70 border border-emerald-700/50 rounded-2xl p-4">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 font-black flex items-center justify-center mb-2">2</div>
                <h4 className="font-black text-sm text-white">Chặng 2: Ra Phố (Câu 251 - 500)</h4>
                <p className="text-xs text-emerald-200/70 mt-1">Phản xạ tức thì khi đi mua sắm, siêu thị, nhà hàng, gọi món, khách sạn, sân bay.</p>
              </div>

              <div className="bg-emerald-950/70 border border-emerald-700/50 rounded-2xl p-4">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 font-black flex items-center justify-center mb-2">3</div>
                <h4 className="font-black text-sm text-white">Chặng 3: Công Sở (Câu 501 - 750)</h4>
                <p className="text-xs text-emerald-200/70 mt-1">Phỏng vấn xin việc, trao đổi email, làm việc nhóm, đàm phán hợp đồng và xử lý công việc.</p>
              </div>

              <div className="bg-emerald-950/70 border border-emerald-700/50 rounded-2xl p-4">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-300 font-black flex items-center justify-center mb-2">4</div>
                <h4 className="font-black text-sm text-white">Chặng 4: B1-C1 & Đáp Án (751 - 1000)</h4>
                <p className="text-xs text-emerald-200/70 mt-1">Nâng cấp phản xạ nhanh không cần dịch nhẩm, kèm toàn bộ đáp án và phân tích chi tiết.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. DƯỚI 1000 CÂU LÀ GIỚI THIỆU CÁC SÁCH KHÁC GIỐNG TRANG LÚC NÃY (THEO YÊU CẦU CỦA BẠN) */}
      <section className="relative z-10 bg-[#FFF9EF]">
        <RetailBooksSection
          onSelectBook={(book) => setSelectedBook(book)}
        />
      </section>

      {/* 4. MODALS & PREVIEWS */}
      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      {/* 5. FOOTER RIÊNG CHO TRANG SÁCH */}
      <footer className="bg-[#04150e] border-t border-emerald-900/60 py-10 px-4 sm:px-8 text-center text-xs text-emerald-300/70">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-white text-sm">LEO ENGLISH EDUCATION</span>
            <span>•</span>
            <span>Giáo trình 1000 Câu Phản Xạ Thực Chiến 2026</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <button 
              type="button" 
              onClick={() => navigateToView('home')} 
              className="text-amber-400 hover:underline"
            >
              Về Trang Chủ App & Sách
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
