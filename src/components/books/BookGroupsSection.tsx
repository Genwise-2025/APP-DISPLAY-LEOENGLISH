import React, { useState, useEffect } from 'react';
import { BOOK_GROUPS, ADMIN_CONFIG } from '../../data/bookLibrary';
import { BookGroup, BookItem } from '../../types/book';
import { 
  Download, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  AlertCircle, 
  KeyRound, 
  BookOpen, 
  Sparkles, 
  Share2, 
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  FileCheck,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface BookGroupsSectionProps {
  onSelectBook: (book: BookItem) => void;
  onOpenAdminModal: () => void;
  isAdminAuthenticated: boolean;
}

const UNLOCKED_STORAGE_KEY = 'LEO_UNLOCKED_BOOK_GROUPS_V1';

export const BookGroupsSection: React.FC<BookGroupsSectionProps> = ({
  onSelectBook,
  onOpenAdminModal,
  isAdminAuthenticated
}) => {
  const { navigateToView } = useCart();
  // Store input code typed by user for each group
  const [inputCodes, setInputCodes] = useState<Record<string, string>>({
    'nhom-1-l1000': '',
    'nhom-2-t390': '',
    'nhom-3-l299vip': ''
  });

  // Store error messages for each group
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Store unlocked status
  const [unlockedGroups, setUnlockedGroups] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(UNLOCKED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save unlocked status to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(UNLOCKED_STORAGE_KEY, JSON.stringify(unlockedGroups));
    } catch (e) {
      console.error('Failed to save unlocked status:', e);
    }
  }, [unlockedGroups]);

  // Handle Code Validation
  const handleVerifyCode = (group: BookGroup) => {
    const userCode = (inputCodes[group.id] || '').trim().toUpperCase();
    const correctCode = group.code.toUpperCase();

    if (!userCode) {
      setErrors((prev) => ({
        ...prev,
        [group.id]: 'Vui lòng nhập mã tải sách của bạn.'
      }));
      return;
    }

    if (userCode === correctCode || (isAdminAuthenticated && userCode === 'ADMIN')) {
      // Success!
      setUnlockedGroups((prev) => ({
        ...prev,
        [group.id]: true
      }));
      setErrors((prev) => ({
        ...prev,
        [group.id]: ''
      }));

      // Automatically trigger download
      triggerGroupDownload(group);
    } else {
      setErrors((prev) => ({
        ...prev,
        [group.id]: `Mã "${userCode}" không chính xác. Hãy liên hệ Zalo Thầy Leo để nhận mã.`
      }));
    }
  };

  // Trigger download of the entire group
  const triggerGroupDownload = (group: BookGroup) => {
    // Download primary package file
    const link = document.createElement('a');
    link.href = group.allDownloadUrl;
    link.download = group.sampleFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="book-groups-section" className="py-16 sm:py-24 bg-gradient-to-b from-[#1C0F08] via-[#24130A] to-[#170B05] text-white relative overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/40 text-gold-400 text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-4 shadow-sm">
            <KeyRound className="w-4 h-4 text-gold-300" />
            <span>KHU VỰC TẢI SÁCH THEO MÃ HỌC VIÊN</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            3 Nhóm Sách VIP <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-yellow-200 to-warm-400">&amp; Mã Tải Độc Quyền</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-amber-200/80 leading-relaxed font-medium">
            Học viên nhập mã tải sách riêng được Thầy Leo cấp (qua Zalo) để mở khóa và <strong>tải sách về máy</strong> ngay lập tức!
          </p>

          {/* Quick Admin Helper Bar */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="text-amber-200/60">Chưa có mã tải sách?</span>
            <a
              href={ADMIN_CONFIG.zaloUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 underline font-bold"
            >
              <span>Nhắn Zalo Thầy Leo ({ADMIN_CONFIG.adminHotline})</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-white/20">•</span>
            <button
              type="button"
              onClick={onOpenAdminModal}
              className="text-amber-300/80 hover:text-white flex items-center gap-1 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 transition-colors"
            >
              <KeyRound className="w-3 h-3 text-gold-400" />
              <span>Dành cho Quản trị viên (Admin)</span>
            </button>
          </div>
        </div>

        {/* 3 BOOK GROUPS - DISPLAYED CLEARLY & BEAUTIFULLY */}
        <div className="space-y-12 sm:space-y-16">
          {BOOK_GROUPS.map((group, groupIdx) => {
            const isUnlocked = unlockedGroups[group.id] || isAdminAuthenticated;
            const currentInput = inputCodes[group.id] || '';
            const errorMsg = errors[group.id];

            return (
              <div
                key={group.id}
                className={`relative rounded-3xl p-6 sm:p-8 lg:p-10 bg-gradient-to-b ${group.gradientClass} border-2 ${
                  isUnlocked ? 'border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.4)]' : group.borderGlowClass
                } transition-all duration-500`}
              >
                {/* Header of Group */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/15">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 rounded-xl bg-black/40 text-gold-300 border border-gold-400/40 text-xs sm:text-sm font-black tracking-wider uppercase flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-gold-300" />
                        {group.name}
                      </span>

                      <span className="px-3 py-1 rounded-xl bg-white/10 text-white text-xs font-bold border border-white/15">
                        {group.books.length === 1 ? '1 cuốn sách (Bản màu xanh lá)' : `Trọn bộ ${group.books.length} cuốn sách`}
                      </span>

                      {isUnlocked && (
                        <span className="px-3 py-1 rounded-xl bg-emerald-500 text-white text-xs font-black flex items-center gap-1 shadow-lg animate-pulse">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          ĐÃ MỞ KHÓA TẢI VỀ
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
                      {group.subtitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed font-medium">
                      {group.description}
                    </p>

                    {group.id === 'nhom-1-l1000' && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => navigateToView('1000-cau')}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/25 to-teal-500/25 border border-emerald-400/60 text-emerald-300 text-xs sm:text-sm font-black hover:bg-emerald-500/35 hover:scale-[1.02] transition-all shadow-md group"
                        >
                          <BookOpen className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                          <span>Mở Trang Tải Riêng Sách 1000 Câu (Nút Tải Thật To)</span>
                          <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* CODE INPUT & DYNAMIC LIGHT BUTTON */}
                  <div className="w-full lg:w-96 flex-shrink-0 bg-black/40 p-4 sm:p-5 rounded-2xl border border-white/15 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-amber-200 flex items-center gap-1.5">
                        {isUnlocked ? (
                          <Unlock className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Lock className="w-4 h-4 text-gold-400" />
                        )}
                        <span>{isUnlocked ? 'Trạng thái quyền truy cập' : 'Nhập mã để tải sách:'}</span>
                      </label>

                      {isAdminAuthenticated ? (
                        <span className="text-[11px] font-black text-emerald-400 tracking-wider bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-500/50">
                          MÃ ADMIN: {group.code}
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-amber-300/80 tracking-wider">
                          MÃ BẢO MẬT VIP
                        </span>
                      )}
                    </div>

                    {!isUnlocked ? (
                      <div className="space-y-3">
                        <div className="relative">
                          <input
                            type="text"
                            value={currentInput}
                            onChange={(e) => {
                              setInputCodes((prev) => ({
                                ...prev,
                                [group.id]: e.target.value
                              }));
                              if (errors[group.id]) {
                                setErrors((prev) => ({ ...prev, [group.id]: '' }));
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleVerifyCode(group);
                              }
                            }}
                            placeholder="Nhập mã tải sách được cấp qua Zalo..."
                            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-gold-400 focus:bg-white/15 transition-all"
                          />
                        </div>

                        {errorMsg && (
                          <p className="text-xs text-rose-300 font-semibold flex items-center gap-1.5 bg-rose-950/60 p-2 rounded-lg border border-rose-500/40">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{errorMsg}</span>
                          </p>
                        )}

                        {/* DYNAMIC BUTTON WITH LIGHT EFFECT (CSS ÁNH SÁNG) */}
                        <button
                          type="button"
                          onClick={() => handleVerifyCode(group)}
                          className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-gold-500 via-amber-400 to-warm-500 hover:from-gold-400 hover:to-warm-400 text-darkbrown font-black text-sm tracking-wide shadow-xl btn-dynamic-glow btn-light-sweep flex items-center justify-center gap-2 cursor-pointer group"
                        >
                          <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                          <span>{group.books.length === 1 ? 'XÁC NHẬN MÃ & TẢI SÁCH' : 'XÁC NHẬN MÃ & TẢI TRỌN BỘ'}</span>
                        </button>
                      </div>
                    ) : (
                      /* UNLOCKED STATE */
                      <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-black text-emerald-300">ĐÃ XÁC THỰC MÃ THÀNH CÔNG!</p>
                            <p className="text-[11px] text-emerald-100/80">
                              {group.books.length === 1 ? 'Sẵn sàng tải xuống file sách PDF.' : `Sẵn sàng tải xuống toàn bộ ${group.books.length} cuốn.`}
                            </p>
                          </div>
                        </div>

                        {/* DYNAMIC DOWNLOAD ALL BUTTON (CSS ÁNH SÁNG) */}
                        <button
                          type="button"
                          onClick={() => triggerGroupDownload(group)}
                          className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-black text-sm tracking-wide shadow-2xl btn-dynamic-glow-emerald btn-light-sweep flex items-center justify-center gap-2 cursor-pointer group"
                        >
                          <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span>{group.books.length === 1 ? 'TẢI SÁCH XANH LÁ (.PDF BẢN QUYỀN)' : 'TẢI TOÀN BỘ SÁCH TRONG NHÓM (.PDF / .ZIP)'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* HORIZONTAL SHOWCASE OF BOOKS IN THIS GROUP */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-200 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-gold-400" />
                      {group.books.length === 1
                        ? 'SÁCH TRONG NHÓM NÀY (BẢN MÀU XANH LÁ):'
                        : `DANH SÁCH ${group.books.length} CUỐN SÁCH TRONG NHÓM NÀY (HIỂN THỊ HÀNG NGANG):`}
                    </span>
                    {group.books.length > 1 && (
                      <span className="text-xs text-amber-200/60 hidden sm:inline">
                        Cuộn ngang để xem tất cả &rarr;
                      </span>
                    )}
                  </div>

                  {/* Horizontal Scroll Deck */}
                  <div className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-gold-500/40">
                    {group.books.map((book, bookIdx) => {
                      return (
                        <div
                          key={`${group.id}-book-${book.id}-${bookIdx}`}
                          className="flex-shrink-0 w-52 sm:w-60 bg-black/40 rounded-2xl p-3.5 border border-white/10 hover:border-gold-400/80 hover:bg-black/60 transition-all duration-300 flex flex-col justify-between group"
                        >
                          <div>
                            {/* Card Header Info */}
                            <div className="flex items-center justify-between text-[10px] text-amber-200/70 mb-2">
                              <span className="font-extrabold text-gold-400">
                                {group.books.length === 1 ? 'Quyển Màu Xanh Lá' : `Cuốn #${bookIdx + 1}`}
                              </span>
                              <span className="bg-white/10 px-1.5 py-0.5 rounded text-[9px] font-bold">
                                {book.pages} trang
                              </span>
                            </div>

                            {/* Book Cover Image */}
                            <div
                              onClick={() => onSelectBook(book)}
                              className="relative w-full h-44 sm:h-48 rounded-xl bg-black/50 p-2 flex items-center justify-center overflow-hidden cursor-pointer group-hover:shadow-[0_8px_20px_rgba(245,183,0,0.25)] transition-all"
                            >
                              <img
                                src={book.coverImage}
                                alt={book.title}
                                className="max-h-full max-w-full object-contain rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/images/books/starter-anh-van-giao-tiep-hi.jpg';
                                }}
                              />
                              <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/10 transition-colors pointer-events-none rounded-xl" />
                            </div>

                            {/* Title */}
                            <h4
                              onClick={() => onSelectBook(book)}
                              className="mt-3 text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-gold-300 cursor-pointer transition-colors"
                            >
                              {book.title}
                            </h4>
                          </div>

                          {/* Card Footer: Detail / Download Button */}
                          <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                            {isUnlocked ? (
                              <a
                                href={book.pdfDownloadUrl || group.allDownloadUrl}
                                download={`${book.title}.pdf`}
                                className="w-full py-2 px-3 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 text-white text-xs font-black flex items-center justify-center gap-1.5 transition-colors shadow-md"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Tải Cuốn Này</span>
                              </a>
                            ) : (
                              <button
                                type="button"
                                onClick={() => onSelectBook(book)}
                                className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-gold-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                              >
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>Xem Chi Tiết Sách</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
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
