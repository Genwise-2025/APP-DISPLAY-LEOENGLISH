import React, { useState } from 'react';
import { BookItem } from '../../types/book';
import { BookMarqueeBanner } from './BookMarqueeBanner';
import { BookGroupsSection } from './BookGroupsSection';
import { RetailBooksSection } from './RetailBooksSection';
import { BookDetailModal } from './BookDetailModal';
import { AdminDownloadManagerModal } from './AdminDownloadManagerModal';
import { useCart } from '../../context/CartContext';

export const BookLibraryHub: React.FC = () => {
  const { isAdminAuthenticated, loginAdmin } = useCart();
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const handleNavigateToGroups = () => {
    const el = document.getElementById('book-groups-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="kho-sach" className="relative z-10">
      {/* 1. TOP MARQUEE BANNER: SÁCH CHẠY TỪ PHẢI SANG TRÁI */}
      <BookMarqueeBanner
        onSelectBook={(book) => setSelectedBook(book)}
        onNavigateToGroups={handleNavigateToGroups}
      />

      {/* 2. KHU VỰC 3 NHÓM SÁCH CHÍNH & MÃ TẢI SÁCH (L1000, T390, L299VIP) */}
      <BookGroupsSection
        onSelectBook={(book) => setSelectedBook(book)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        isAdminAuthenticated={isAdminAuthenticated}
      />

      {/* 3. DƯỚI 3 NHÓM SÁCH LÀ KHO SÁCH LẺ: GIÁ GỐC 80.000Đ, ƯU ĐÃI HỌC VIÊN MỚI 40.000Đ (-50%) */}
      <RetailBooksSection
        onSelectBook={(book) => setSelectedBook(book)}
      />

      {/* Modals */}
      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      <AdminDownloadManagerModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        isAdminAuthenticated={isAdminAuthenticated}
        onLoginSuccess={(email) => loginAdmin(email, 'Dinh100216')}
      />
    </div>
  );
};
