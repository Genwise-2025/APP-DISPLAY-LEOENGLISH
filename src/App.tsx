import React from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { FantasyBackground } from './components/UI/FantasyBackground';
import { HeroSection } from './components/showcase/HeroSection';
import { AppShowcaseSection } from './components/showcase/AppShowcaseSection';
import { CategorySection } from './components/showcase/CategorySection';
import { ProductGrid } from './components/showcase/ProductGrid';
import { FeaturedCombo } from './components/showcase/FeaturedCombo';
import { SoftwareFeatures } from './components/showcase/SoftwareFeatures';
import { Testimonials } from './components/showcase/Testimonials';
import { Benefits } from './components/showcase/Benefits';
import { FAQ } from './components/showcase/FAQ';
import { Footer } from './components/layout/Footer';
import { PromotionPopup } from './components/modals/PromotionPopup';
import { PromotionModal } from './components/modals/PromotionModal';
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { CartDrawer } from './components/modals/CartDrawer';
import { AdminCMSModal } from './components/modals/AdminCMSModal';
import { ToastNotification } from './components/UI/ToastNotification';
import { BookLibraryHub } from './components/books/BookLibraryHub';
import { Book1000LandingPage } from './components/books/Book1000LandingPage';
import { BookGroup2LandingPage } from './components/books/BookGroup2LandingPage';
import { BookGroup3LandingPage } from './components/books/BookGroup3LandingPage';
import { VIPBookLibraryPage } from './components/books/VIPBookLibraryPage';
import { StudentAuthModal } from './components/modals/StudentAuthModal';
import { AdminStudentManagerModal } from './components/modals/AdminStudentManagerModal';
import { useCart } from './context/CartContext';

export const AppContent: React.FC = () => {
  const { 
    currentView, 
    isStudentAuthModalOpen, 
    setIsStudentAuthModalOpen, 
    isAdminOpen, 
    setIsAdminOpen 
  } = useCart();

  if (currentView === 'kho-sach-vip') {
    return (
      <div className="relative min-h-screen selection:bg-gold-500 selection:text-white">
        <VIPBookLibraryPage />

        {/* Global Modals & Notifications */}
        <ProductDetailModal />
        <CartDrawer />
        <AdminCMSModal />
        <ToastNotification />
      </div>
    );
  }

  if (currentView === '1000-cau') {
    return (
      <div className="relative min-h-screen selection:bg-emerald-500 selection:text-white">
        <Book1000LandingPage />

        {/* Global Modals & Notifications */}
        <ProductDetailModal />
        <CartDrawer />
        <AdminCMSModal />
        <ToastNotification />
      </div>
    );
  }

  if (currentView === 'nhom-2') {
    return (
      <div className="relative min-h-screen selection:bg-amber-500 selection:text-white">
        <BookGroup2LandingPage />

        {/* Global Modals & Notifications */}
        <ProductDetailModal />
        <CartDrawer />
        <AdminCMSModal />
        <ToastNotification />
      </div>
    );
  }

  if (currentView === 'nhom-3') {
    return (
      <div className="relative min-h-screen selection:bg-purple-500 selection:text-white">
        <BookGroup3LandingPage />

        {/* Global Modals & Notifications */}
        <ProductDetailModal />
        <CartDrawer />
        <AdminCMSModal />
        <ToastNotification />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-gold-500 selection:text-white">
      {/* Magical Background Orbs */}
      <FantasyBackground />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 flex-1">
        <HeroSection />
        <AppShowcaseSection />
        {/* KHO TẢI SÁCH EBOOK, BANNER CHẠY, 3 NHÓM SÁCH (T390, L1000, L299VIP) & KHO SÁCH LẺ 40K */}
        <BookLibraryHub />
        <CategorySection />
        <ProductGrid />
        <FeaturedCombo />
        <SoftwareFeatures />
        <Testimonials />
        <Benefits />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Popups */}
      <PromotionPopup />
      <PromotionModal />
      <ProductDetailModal />
      <CartDrawer />
      <AdminCMSModal />
      <AdminStudentManagerModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
      <StudentAuthModal
        isOpen={isStudentAuthModalOpen}
        onClose={() => setIsStudentAuthModalOpen(false)}
      />
      <ToastNotification />
    </div>
  );
};

export function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
