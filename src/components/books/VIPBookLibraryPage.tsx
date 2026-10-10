import React, { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { ALL_VIP_BOOKS, VIP_CATEGORIES, CategoryFilterItem } from '../../data/vipBookLibrary';
import { BookItem } from '../../types/book';
import { CSS3DBook } from '../UI/CSS3DBook';
import { BookDetailModal } from './BookDetailModal';
import { BookSampleReaderModal } from './BookSampleReaderModal';
import { AdminStudentManagerModal } from '../modals/AdminStudentManagerModal';
import { 
  ArrowLeft, 
  Crown, 
  Download, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  Mail, 
  PhoneCall, 
  FileText, 
  Layers, 
  Star, 
  LogOut, 
  ExternalLink,
  ChevronDown,
  Clock,
  Ban
} from 'lucide-react';

export const VIPBookLibraryPage: React.FC = () => {
  const { 
    navigateToView, 
    isStudentApproved, 
    currentStudentEmail, 
    currentStudent, 
    loginStudent, 
    logoutStudent, 
    addToast,
    isAdminAuthenticated,
    setIsAdminOpen,
    isAdminOpen
  } = useCart();

  const [inputEmail, setInputEmail] = useState('');
  const [inputName, setInputName] = useState('');
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [sampleReaderBook, setSampleReaderBook] = useState<BookItem | null>(null);
  const [isDownloadingAll, setIsDownloadingAll] = useState<string | null>(null);

  // Filter out the 'all' category to get 11 distinct categories
  const categoriesList = useMemo(() => {
    return VIP_CATEGORIES.filter(c => c.id !== 'all');
  }, []);

  // Handle student login submit
  const handleGmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmail.trim()) {
      addToast('Chưa nhập Gmail', 'Vui lòng điền đúng địa chỉ Gmail của bạn.', 'warning');
      return;
    }
    loginStudent(inputEmail.trim(), inputName.trim() || undefined);
    setInputEmail('');
    setInputName('');
  };

  // Download single book
  const handleDownloadSingleBook = (book: BookItem) => {
    if (!isStudentApproved) {
      addToast(
        'Yêu cầu xác thực Gmail',
        'Vui lòng nhập Gmail học viên ở phía trên để mở khóa tải sách vĩnh viễn!',
        'warning'
      );
      const el = document.getElementById('gmail-auth-card');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const downloadUrl = book.pdfDownloadUrl || '/downloads/vip/TIENG ANH CHO NGUOI MAT GOC- STARTER full.pdf';
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${book.title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast(
      'Đang tải sách!',
      `Tệp "${book.title}" đang được tải về cho Gmail: ${currentStudentEmail || 'Admin'}.`,
      'success'
    );
  };

  // Download all books in a category
  const handleDownloadAllInCategory = (cat: CategoryFilterItem, books: BookItem[]) => {
    if (!isStudentApproved) {
      addToast(
        'Chưa mở khóa tải full',
        'Vui lòng nhập Gmail học viên ở phía trên để mở khóa tải full trọn bộ!',
        'warning'
      );
      const el = document.getElementById('gmail-auth-card');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsDownloadingAll(cat.id);
    addToast(
      `Bắt đầu tải trọn bộ ${cat.label}!`,
      `Hệ thống đang tải toàn bộ ${books.length} cuốn sách thuộc mục này về máy của bạn.`,
      'success'
    );

    // Trigger sequential downloads with small interval
    books.forEach((book, idx) => {
      setTimeout(() => {
        const downloadUrl = book.pdfDownloadUrl || '/downloads/vip/TIENG ANH CHO NGUOI MAT GOC- STARTER full.pdf';
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `[${cat.shortLabel}] ${book.title}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, idx * 1200);
    });

    setTimeout(() => {
      setIsDownloadingAll(null);
    }, books.length * 1200 + 500);
  };

  const scrollToCategory = (categoryId: string) => {
    const el = document.getElementById(`category-${categoryId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#140A04] via-[#1A0E06] to-[#0D0502] text-cream selection:bg-gold-500 selection:text-darkbrown pb-24">
      {/* 1. TOP VIP STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-[#160A04]/95 backdrop-blur-md border-b border-gold-500/30 px-4 sm:px-8 py-3.5 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigateToView('home')}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-cream font-bold text-xs flex items-center gap-1.5 transition-colors border border-gold-500/20"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Về Trang Chủ</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-gold-500 to-warm-500 text-darkbrown flex items-center justify-center font-black shadow-glow-gold">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-black text-white flex items-center gap-1.5">
                  <span>KHO SÁCH SỐ FULL VIP</span>
                  <span className="px-2 py-0.2 rounded-full bg-gold-500 text-darkbrown text-[10px] font-black uppercase">
                    11 HẠNG MỤC
                  </span>
                </h1>
                <p className="text-[10px] text-amber-200/70 hidden sm:block">
                  Leo English & Genwise Language — Tải trọn bộ sách bản quyền
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Status Pill */}
            {isStudentApproved ? (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="max-w-[130px] sm:max-w-[180px] truncate">
                  {currentStudentEmail || 'Admin'} (ĐÃ DUYỆT)
                </span>
                <button
                  type="button"
                  onClick={logoutStudent}
                  className="p-1 hover:text-white rounded"
                  title="Đổi Gmail khác"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('gmail-auth-card');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-full bg-gold-500 text-darkbrown font-black text-xs flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Nhập Gmail Mở Khóa</span>
              </button>
            )}

            {/* Admin Management Button */}
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-darkbrown border border-gold-500/50 text-gold-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              title="Quản lý Admin duyệt Gmail"
            >
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. PAGE HERO BANNER */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-10 pb-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-400/40 text-gold-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-glow-gold">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          ĐẶC QUYỀN TRỌN BỘ SÁCH SỐ BẢN QUYỀN
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-gold-300 to-warm-200 leading-tight">
          Kho Sách VIP 11 Thể Loại — Xem & Tải Full Trọn Bộ
        </h2>

        <p className="mt-3 text-sm sm:text-base text-cream/80 max-w-2xl mx-auto leading-relaxed">
          Tất cả sách được xếp từ trên xuống dưới theo từng chuyên mục. Nhập Gmail một lần duy nhất để mở khóa tải lẻ hoặc tải full trọn bộ từng hạng mục vĩnh viễn!
        </p>

        {/* 3. PERSISTENT GMAIL AUTHENTICATION CARD */}
        <div id="gmail-auth-card" className="mt-8 max-w-2xl mx-auto">
          {isStudentApproved ? (
            /* STATE: ALREADY UNLOCKED (NHẬP 1 LẦN LÀ TẢI ĐƯỢC HẾT) */
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-[#10271E] to-teal-950/80 border-2 border-emerald-400/60 shadow-[0_0_30px_rgba(16,185,129,0.25)] text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs uppercase font-mono text-emerald-300 font-bold tracking-wider">
                    🎉 TRẠNG THÁI: ĐÃ MỞ KHÓA VĨNH VIỄN
                  </div>
                  <div className="text-base sm:text-lg font-black text-white mt-0.5">
                    Gmail: <span className="text-gold-300">{currentStudentEmail || 'Admin'}</span>
                  </div>
                  <p className="text-xs text-emerald-200/80 mt-1">
                    Bạn có thể tải lẻ hoặc bấm <strong>"Tải Full Trọn Bộ"</strong> cho bất kỳ hạng mục nào bên dưới mà không cần nhập lại Gmail!
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={logoutStudent}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-rose-500/20 hover:text-rose-300 text-cream text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                Đổi Gmail
              </button>
            </div>
          ) : (
            /* STATE: NOT UNLOCKED YET -> ENTER GMAIL ONCE */
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#25150B] to-[#180C05] border-2 border-gold-500/50 shadow-2xl text-left space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gold-500/20 border border-gold-400 flex items-center justify-center text-gold-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Nhập Gmail Của Bạn Để Mở Khóa Tải Toàn Bộ Sách
                  </h3>
                  <p className="text-xs text-amber-200/70">
                    Chỉ cần nhập 1 lần — Hệ thống tự động ghi nhớ vĩnh viễn trên máy của bạn!
                  </p>
                </div>
              </div>

              <form onSubmit={handleGmailSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-amber-200 uppercase mb-1">
                      Địa chỉ Gmail học viên:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ví dụ: hocvien.vip@gmail.com"
                      value={inputEmail}
                      onChange={(e) => setInputEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-gold-500/40 text-white placeholder-cream/30 text-xs focus:outline-none focus:border-gold-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-amber-200 uppercase mb-1">
                      Họ và tên (Tùy chọn):
                    </label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn An"
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-gold-500/40 text-white placeholder-cream/30 text-xs focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                {currentStudent && currentStudent.status === 'pending' && (
                  <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2">
                    <Clock className="w-4 h-4 animate-spin text-amber-400" style={{ animationDuration: '6s' }} />
                    <span>Gmail <strong>{currentStudent.email}</strong> đang chờ Admin phê duyệt. Vui lòng liên hệ Zalo bên dưới để duyệt ngay!</span>
                  </div>
                )}

                {currentStudent && currentStudent.status === 'blocked' && (
                  <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                    <Ban className="w-4 h-4 text-rose-400" />
                    <span>Gmail <strong>{currentStudent.email}</strong> đã bị tạm khóa. Vui lòng liên hệ Admin!</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold-500 via-warm-500 to-gold-400 text-darkbrown font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-gold-500/30 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  Mở Khóa Quyền Tải Sách (Ghi Nhớ Vĩnh Viễn)
                </button>
              </form>

              <div className="pt-2 border-t border-gold-500/20 flex flex-wrap items-center justify-between gap-2 text-[11px] text-cream/70">
                <span>
                  Admin phê duyệt: <strong className="text-gold-300 font-mono">nguyentoandinh.0511@gmail.com</strong>
                </span>
                <a
                  href="https://zalo.me/0799713094"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Nhắn Zalo Thầy Leo duyệt ngay: 0799.713.094
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 4. QUICK STICKY JUMP BAR (MỤC 1 -> MỤC 11) */}
        <div className="mt-8 sticky top-[60px] z-30 bg-[#140A04]/90 backdrop-blur-md py-3 border-y border-gold-500/20 shadow-md">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin no-scrollbar">
            {categoriesList.map((cat) => {
              const bookCount = ALL_VIP_BOOKS.filter(b => b.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => scrollToCategory(cat.id)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-gold-500/20 border border-gold-500/20 hover:border-gold-400/50 text-cream/90 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <span>Mục {cat.number}: {cat.shortLabel}</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-gold-500/30 text-gold-300 text-[10px] font-mono font-bold">
                    {bookCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FULL CATEGORIZED SHELF (TỪ TRÊN XUỐNG DƯỚI ĐẦY ĐỦ 11 MỤC) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-6">
        {categoriesList.map((cat) => {
          const catBooks = ALL_VIP_BOOKS.filter(b => b.category === cat.id);
          const isCurrentCategoryDownloading = isDownloadingAll === cat.id;

          return (
            <section
              key={cat.id}
              id={`category-${cat.id}`}
              className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1E1108]/90 via-[#180D06]/80 to-[#120803] border-2 border-gold-500/30 shadow-2xl relative overflow-hidden"
            >
              {/* Category Header Banner with Count & Full Download Button */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gold-500/20">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-gold-500/20 border border-gold-400 flex items-center justify-center font-black text-gold-300 text-sm">
                      {cat.number}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {cat.label}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-gold-300 text-xs font-black">
                      {catBooks.length} CUỐN SÁCH
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-cream/70 mt-1.5">
                    {cat.description}
                  </p>
                </div>

                {/* BIG BUTTON: TẢI FULL TRỌN BỘ MỤC NÀY */}
                <button
                  type="button"
                  onClick={() => handleDownloadAllInCategory(cat, catBooks)}
                  disabled={isCurrentCategoryDownloading}
                  className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all hover:scale-105 active:scale-95 ${
                    isStudentApproved
                      ? 'bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 text-white shadow-emerald-500/20'
                      : 'bg-gradient-to-r from-gold-500 via-warm-500 to-gold-400 text-darkbrown shadow-gold-500/20'
                  }`}
                >
                  <Download className={`w-4 h-4 ${isCurrentCategoryDownloading ? 'animate-bounce' : ''}`} />
                  <span>
                    {isCurrentCategoryDownloading
                      ? `Đang tải ${catBooks.length} cuốn...`
                      : `TẢI FULL TRỌN BỘ MỤC ${cat.number} (${catBooks.length} CUỐN)`}
                  </span>
                </button>
              </div>

              {/* Books Grid for this category */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {catBooks.map((book) => {
                  return (
                    <div
                      key={book.id}
                      className="group relative rounded-2xl bg-black/40 border border-gold-500/25 hover:border-gold-400/60 p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/10"
                    >
                      {/* Top: 3D Book Miniature */}
                      <div className="flex flex-col items-center justify-center py-2">
                        <div className="transform group-hover:scale-105 transition-transform duration-300">
                          <CSS3DBook
                            coverImage={book.coverImage}
                            title={book.title}
                            thickness={30}
                            width={160}
                            height={230}
                            spineColor={book.spineColor || '#D97706'}
                            badge={book.badge}
                            onQuickView={() => setSelectedBook(book)}
                          />
                        </div>

                        {/* Level and Category Tag */}
                        <div className="mt-3 w-full flex items-center justify-between text-[10px] font-bold">
                          <span className="px-2 py-0.5 rounded-full bg-gold-500/15 text-gold-300 border border-gold-400/20 truncate max-w-[120px]">
                            {book.categoryLabel}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/20">
                            {book.level}
                          </span>
                        </div>
                      </div>

                      {/* Middle: Info */}
                      <div className="pt-2 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 
                            onClick={() => setSelectedBook(book)}
                            className="font-bold text-sm text-white hover:text-gold-300 transition-colors cursor-pointer line-clamp-2 leading-snug"
                          >
                            {book.title}
                          </h4>
                          {book.vietnameseTitle && (
                            <p className="text-[11px] text-amber-200/70 line-clamp-1 mt-0.5">
                              {book.vietnameseTitle}
                            </p>
                          )}
                          <p className="text-xs text-cream/60 line-clamp-2 mt-2 leading-relaxed">
                            {book.description}
                          </p>
                        </div>

                        {/* Meta info */}
                        <div className="mt-3 pt-3 border-t border-gold-500/15 flex items-center justify-between text-[11px] text-cream/70 font-mono">
                          <div className="flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5 text-gold-400" />
                            <span>{book.pages} Trang</span>
                          </div>
                          <div className="text-amber-300 font-bold">
                            {book.fileSize}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Buttons: Đọc thử & Tải lẻ cuốn này */}
                      <div className="mt-4 pt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSampleReaderBook(book)}
                          className="flex-1 py-2 px-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-cream font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                          title="Đọc thử 10 trang đầu tiên"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-gold-400" />
                          <span>Đọc Thử</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDownloadSingleBook(book)}
                          className={`flex-1 py-2 px-2.5 rounded-xl font-black text-xs transition-transform hover:scale-102 flex items-center justify-center gap-1.5 shadow ${
                            isStudentApproved
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white'
                              : 'bg-gradient-to-r from-gold-500 to-warm-500 text-darkbrown'
                          }`}
                          title={isStudentApproved ? 'Tải ngay file PDF' : 'Cần nhập Gmail để tải'}
                        >
                          {isStudentApproved ? (
                            <Unlock className="w-3.5 h-3.5 text-white" />
                          ) : (
                            <Lock className="w-3.5 h-3.5 text-darkbrown" />
                          )}
                          <span>Tải PDF</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>

      {/* MODALS */}
      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      <BookSampleReaderModal
        book={sampleReaderBook}
        isOpen={Boolean(sampleReaderBook)}
        onClose={() => setSampleReaderBook(null)}
      />

      <AdminStudentManagerModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
};
