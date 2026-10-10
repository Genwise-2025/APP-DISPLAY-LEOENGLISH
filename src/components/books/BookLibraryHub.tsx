import React, { useState } from 'react';
import { BookItem } from '../../types/book';
import { Featured3DShowcase } from './Featured3DShowcase';
import { AllGenresOnePageCatalog } from './AllGenresOnePageCatalog';
import { BookGroupsSection } from './BookGroupsSection';
import { BookMarqueeBanner } from './BookMarqueeBanner';
import { BookDetailModal } from './BookDetailModal';
import { BookSampleReaderModal } from './BookSampleReaderModal';
import { StudentAuthModal } from '../modals/StudentAuthModal';
import { AdminStudentManagerModal } from '../modals/AdminStudentManagerModal';
import { useCart } from '../../context/CartContext';

export const BookLibraryHub: React.FC = () => {
  const { 
    isAdminAuthenticated, 
    isStudentApproved, 
    currentStudentEmail, 
    addToast 
  } = useCart();

  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [sampleReaderBook, setSampleReaderBook] = useState<BookItem | null>(null);
  const [pendingDownloadBook, setPendingDownloadBook] = useState<BookItem | null>(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const handleDownloadBook = (book: BookItem) => {
    if (isStudentApproved) {
      const downloadUrl = book.pdfDownloadUrl || '/downloads/vip/TIENG ANH CHO NGUOI MAT GOC- STARTER full.pdf';
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${book.title}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      addToast(
        'Đang tải sách bản quyền!',
        `Tệp "${book.title}" đang được tải về cho học viên (${currentStudentEmail || 'Admin'}).`,
        'success'
      );
    } else {
      setPendingDownloadBook(book);
      setIsStudentModalOpen(true);
    }
  };

  const handleConfirmDownloadAfterAuth = () => {
    if (pendingDownloadBook) {
      const downloadUrl = pendingDownloadBook.pdfDownloadUrl || '/downloads/vip/TIENG ANH CHO NGUOI MAT GOC- STARTER full.pdf';
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${pendingDownloadBook.title}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      addToast(
        'Đã mở khóa tải sách!',
        `Tệp "${pendingDownloadBook.title}" đang được tải về thành công.`,
        'success'
      );
    }
  };

  const handleNavigateToGroups = () => {
    const el = document.getElementById('book-groups-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="kho-sach" className="relative z-10 space-y-12">
      {/* 1. TOP MARQUEE BANNER: SÁCH CHẠY NỔI BẬT */}
      <BookMarqueeBanner
        onSelectBook={(book) => setSelectedBook(book)}
        onNavigateToGroups={handleNavigateToGroups}
      />

      {/* 2. KHÔNG GIAN TRƯNG BÀY SÁCH 3D ĐẸP MẮT & TƯƠNG TÁC XOAY CHUỘT */}
      <Featured3DShowcase
        onSelectBookForDetails={(book) => setSelectedBook(book)}
        onReadSample={(book) => setSampleReaderBook(book)}
        onRequestDownload={handleDownloadBook}
      />

      {/* 3. TẤT CẢ 11 THỂ LOẠI NẰM GỌN TRONG 1 TRANG (FULL VIP LIBRARY CATALOG) */}
      <AllGenresOnePageCatalog
        onSelectBook={(book) => setSelectedBook(book)}
        onReadSample={(book) => setSampleReaderBook(book)}
        onRequestDownload={handleDownloadBook}
      />

      {/* 4. 3 NHÓM SÁCH CHÍNH & MÃ TẢI SÁCH (L1000, T390, L299VIP) */}
      <BookGroupsSection
        onSelectBook={(book) => setSelectedBook(book)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        isAdminAuthenticated={isAdminAuthenticated}
      />

      {/* MODALS */}
      {/* Book Detail Modal */}
      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      {/* 10-Page Sample Reader Modal */}
      <BookSampleReaderModal
        book={sampleReaderBook}
        isOpen={Boolean(sampleReaderBook)}
        onClose={() => setSampleReaderBook(null)}
      />

      {/* Student Authentication & Approval Modal */}
      <StudentAuthModal
        isOpen={isStudentModalOpen}
        onClose={() => {
          setIsStudentModalOpen(false);
          setPendingDownloadBook(null);
        }}
        pendingBookTitle={pendingDownloadBook?.title}
        onDownloadConfirmed={handleConfirmDownloadAfterAuth}
      />

      {/* Admin Student & Passcode Management Modal */}
      <AdminStudentManagerModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};
