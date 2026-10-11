import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types/product';
import { PRODUCTS_DATA } from '../data/products';

import { StudentAccount } from '../types/student';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

const AUTHORIZED_ADMIN_EMAIL = 'nguyentoandinh.0511@gmail.com';
const AUTHORIZED_ADMIN_PASSWORD = 'Dinh100216';

interface CartContextType {
  // Product Catalog CRUD
  products: Product[];
  addProduct: (newProduct: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (productId: string) => void;

  // Admin Auth System
  adminEmail: string | null;
  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, passKey: string) => boolean;
  logoutAdmin: () => void;

  // Student Accounts & Gmail Approval System (Yêu cầu Admin duyệt Gmail tải sách)
  students: StudentAccount[];
  currentStudentEmail: string | null;
  currentStudent: StudentAccount | null;
  isStudentApproved: boolean;
  loginStudent: (email: string, fullName?: string) => { success: boolean; status: 'approved' | 'pending' | 'blocked'; message: string };
  logoutStudent: () => void;
  approveStudent: (email: string) => void;
  blockStudent: (email: string) => void;
  unblockStudent: (email: string) => void;
  deleteStudent: (email: string) => void;
  addStudentDirectly: (email: string, status?: 'approved' | 'pending', fullName?: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
  totalOriginalAmount: number;
  totalSavings: number;
  
  // Modals & UI State
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  activeProduct: Product | null;
  setActiveProduct: (product: Product | null) => void;
  
  isPromoModalOpen: boolean;
  setIsPromoModalOpen: (open: boolean) => void;

  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  isStudentAuthModalOpen: boolean;
  setIsStudentAuthModalOpen: (open: boolean) => void;
  
  // Search & Filter Global State
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;

  // Toast System
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // View / Page Routing
  currentView: AppView;
  navigateToView: (view: AppView) => void;
}

export type AppView = 'home' | '1000-cau' | 'nhom-2' | 'nhom-3' | 'kho-sach-vip';

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'LEO_EDUCATION_CART_V2';
const PRODUCTS_STORAGE_KEY = 'LEO_EDUCATION_CUSTOM_PRODUCTS_V6';
const ADMIN_EMAIL_STORAGE_KEY = 'LEO_ADMIN_SESSION_EMAIL_V2';
const STUDENTS_STORAGE_KEY = 'LEO_STUDENT_ACCOUNTS_V2';
const STUDENT_SESSION_KEY = 'LEO_ACTIVE_STUDENT_EMAIL_V2';
const CLOUD_SYNC_TOPIC = 'leoenglish-vip-student-sync-v1';
const CLOUD_SYNC_URL = `https://ntfy.sh/${CLOUD_SYNC_TOPIC}`;

const DEFAULT_STUDENTS: StudentAccount[] = [
  {
    id: 'std-admin',
    email: 'nguyentoandinh.0511@gmail.com',
    fullName: 'Admin Nguyễn Toàn Định',
    status: 'approved',
    registeredAt: '2026-01-01T08:00:00.000Z',
    approvedAt: '2026-01-01T08:00:00.000Z',
    notes: 'Quản Trị Viên'
  },
  {
    id: 'std-kieulinh-06051992',
    email: 'kieulinh06051992@gmail.com',
    fullName: 'Học Viên Kiều Linh',
    status: 'pending',
    registeredAt: '2026-10-11T04:30:00.000Z',
    notes: 'Đăng ký tải sách VIP'
  },
  {
    id: 'std-demo-1',
    email: 'hocvien.vip@gmail.com',
    fullName: 'Học Viên VIP (Mẫu Đã Duyệt)',
    status: 'approved',
    registeredAt: '2026-10-01T10:00:00.000Z',
    approvedAt: '2026-10-01T10:30:00.000Z',
    notes: 'Đã hoàn thành học phí - Được phép tải toàn bộ sách'
  },
  {
    id: 'std-demo-2',
    email: 'hocvien.choduyet@gmail.com',
    fullName: 'Học Viên Mới (Mẫu Chờ Duyệt)',
    status: 'pending',
    registeredAt: '2026-10-10T14:20:00.000Z',
    notes: 'Vừa đăng ký qua web, đang chờ Admin duyệt'
  },
  {
    id: 'std-demo-3',
    email: 'hocvien.spam@gmail.com',
    fullName: 'Tài Khoản Khóa (Mẫu Bị Chặn)',
    status: 'blocked',
    registeredAt: '2026-09-15T09:00:00.000Z',
    notes: 'Đã bị Admin chặn tải sách'
  }
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Admin Authentication State
  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem(ADMIN_EMAIL_STORAGE_KEY);
      return saved || null;
    } catch {
      return null;
    }
  });

  const isAdminAuthenticated = adminEmail?.trim().toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase();

  // Student Accounts State (with automatic merge of DEFAULT_STUDENTS)
  const [students, setStudents] = useState<StudentAccount[]>(() => {
    try {
      const saved = localStorage.getItem(STUDENTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with DEFAULT_STUDENTS so new pre-registered emails (like kieulinh06051992@gmail.com) are ALWAYS injected
          const merged = [...parsed];
          DEFAULT_STUDENTS.forEach((ds) => {
            if (!merged.some((m) => m.email.toLowerCase() === ds.email.toLowerCase())) {
              merged.unshift(ds);
            }
          });
          return merged;
        }
      }
    } catch (e) {
      console.error('Failed to load students:', e);
    }
    return DEFAULT_STUDENTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(students));
    } catch (e) {
      console.error('Failed to save students:', e);
    }
  }, [students]);

  // Cloud Sync Broadcaster helper
  const broadcastStudentAction = async (payload: {
    action: 'register' | 'approve' | 'block' | 'unblock' | 'delete';
    email: string;
    fullName?: string;
    status?: 'approved' | 'pending' | 'blocked';
    notes?: string;
  }) => {
    try {
      await fetch(CLOUD_SYNC_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          timestamp: new Date().toISOString()
        })
      });
    } catch (err) {
      console.warn('Sync broadcast error:', err);
    }
  };

  // Real-Time Cross-Device Sync Poller
  useEffect(() => {
    let isCancelled = false;

    const syncCloudData = async () => {
      try {
        const res = await fetch(`${CLOUD_SYNC_URL}/json?poll=1&since=48h`);
        if (!res.ok) return;
        const rawText = await res.text();
        if (!rawText || isCancelled) return;

        const lines = rawText.trim().split('\n');
        lines.forEach((line) => {
          if (!line.trim()) return;
          try {
            const parsedEnvelope = JSON.parse(line);
            if (parsedEnvelope.event !== 'message' || !parsedEnvelope.message) return;
            const data = JSON.parse(parsedEnvelope.message);
            if (!data.email || !data.action) return;

            const targetEmail = data.email.trim().toLowerCase();

            if (data.action === 'register') {
              setStudents((prev) => {
                if (prev.some((s) => s.email.toLowerCase() === targetEmail)) return prev;
                const newAcc: StudentAccount = {
                  id: `std-cloud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                  email: targetEmail,
                  fullName: data.fullName || targetEmail.split('@')[0],
                  status: (data.status as any) || 'pending',
                  registeredAt: data.timestamp || new Date().toISOString(),
                  notes: data.notes || 'Đăng ký qua mạng (Cloud Sync)'
                };
                return [newAcc, ...prev];
              });
            } else if (data.action === 'approve') {
              setStudents((prev) =>
                prev.map((s) =>
                  s.email.toLowerCase() === targetEmail
                    ? { ...s, status: 'approved', approvedAt: data.timestamp || new Date().toISOString() }
                    : s
                )
              );
            } else if (data.action === 'block') {
              setStudents((prev) =>
                prev.map((s) =>
                  s.email.toLowerCase() === targetEmail
                    ? { ...s, status: 'blocked' }
                    : s
                )
              );
            } else if (data.action === 'unblock') {
              setStudents((prev) =>
                prev.map((s) =>
                  s.email.toLowerCase() === targetEmail
                    ? { ...s, status: 'approved' }
                    : s
                )
              );
            } else if (data.action === 'delete') {
              setStudents((prev) => prev.filter((s) => s.email.toLowerCase() !== targetEmail));
            }
          } catch {
            // ignore malformed line
          }
        });
      } catch {
        // network offline, ignore
      }
    };

    // Initial sync
    syncCloudData();

    // Poll every 4 seconds for instant cross-device updates
    const pollInterval = setInterval(syncCloudData, 4000);

    const onWindowFocus = () => syncCloudData();
    window.addEventListener('focus', onWindowFocus);

    return () => {
      isCancelled = true;
      clearInterval(pollInterval);
      window.removeEventListener('focus', onWindowFocus);
    };
  }, []);

  // Current Active Student Session State
  const [currentStudentEmail, setCurrentStudentEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STUDENT_SESSION_KEY) || null;
    } catch {
      return null;
    }
  });

  const currentStudent = currentStudentEmail 
    ? students.find(s => s.email.toLowerCase() === currentStudentEmail.toLowerCase()) || null 
    : null;

  const isStudentApproved = isAdminAuthenticated || (currentStudent?.status === 'approved');

  // Initialize Dynamic Products from LocalStorage or Fallback to Default PRODUCTS_DATA
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const savedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load dynamic products:', e);
    }
    return PRODUCTS_DATA;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isStudentAuthModalOpen, setIsStudentAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Navigation / Page View State
  const getInitialView = (): AppView => {
    try {
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (
        path.includes('kho-sach-vip') || 
        path.includes('sach-vip') || 
        search.includes('kho-sach-vip') || 
        hash.includes('kho-sach-vip')
      ) {
        return 'kho-sach-vip';
      }
      if (
        path.includes('nhom-2') || 
        path.includes('community-390') || 
        path.includes('t390') || 
        search.includes('nhom-2') || 
        hash.includes('nhom-2')
      ) {
        return 'nhom-2';
      }
      if (
        path.includes('nhom-3') || 
        path.includes('combo-l299') || 
        path.includes('l299vip') || 
        search.includes('nhom-3') || 
        hash.includes('nhom-3')
      ) {
        return 'nhom-3';
      }
      if (
        path.includes('1000-cau') || 
        path.includes('sach-1000') || 
        path.includes('nhom-1') || 
        search.includes('1000-cau') || 
        hash.includes('1000-cau')
      ) {
        return '1000-cau';
      }
    } catch {}
    return 'home';
  };

  const [currentView, setCurrentView] = useState<AppView>(getInitialView);

  const navigateToView = (view: AppView) => {
    setCurrentView(view);
    try {
      if (view === 'kho-sach-vip') {
        window.history.pushState({ view: 'kho-sach-vip' }, '', '/kho-sach-vip');
      } else if (view === '1000-cau') {
        window.history.pushState({ view: '1000-cau' }, '', '/sach-1000-cau');
      } else if (view === 'nhom-2') {
        window.history.pushState({ view: 'nhom-2' }, '', '/nhom-2-community-390');
      } else if (view === 'nhom-3') {
        window.history.pushState({ view: 'nhom-3' }, '', '/nhom-3-combo-l299');
      } else {
        window.history.pushState({ view: 'home' }, '', '/');
      }
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync products to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products:', e);
    }
  }, [products]);

  // Sync cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cart]);

  // Sync admin email to LocalStorage
  useEffect(() => {
    try {
      if (adminEmail) {
        localStorage.setItem(ADMIN_EMAIL_STORAGE_KEY, adminEmail);
      } else {
        localStorage.removeItem(ADMIN_EMAIL_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save admin session:', e);
    }
  }, [adminEmail]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Admin Login / Logout Verification with Password
  const loginAdmin = (email: string, passKey: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    
    if (cleanEmail !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      addToast(
        'Email không đúng!',
        `Chỉ tài khoản ${AUTHORIZED_ADMIN_EMAIL} mới có quyền Admin.`,
        'warning'
      );
      return false;
    }

    if (passKey !== AUTHORIZED_ADMIN_PASSWORD) {
      addToast(
        'Sai mật khẩu Admin!',
        'Mật khẩu Admin không chính xác. Vui lòng thử lại.',
        'warning'
      );
      return false;
    }

    setAdminEmail(AUTHORIZED_ADMIN_EMAIL);
    addToast('Đăng nhập Admin thành công!', `Xin chào Admin ${AUTHORIZED_ADMIN_EMAIL}.`);
    return true;
  };

  const logoutAdmin = () => {
    setAdminEmail(null);
    setIsAdminOpen(false);
    addToast('Đã đăng xuất', 'Đã đăng xuất tài khoản Admin thành công.', 'info');
  };

  // Student Login / Request Access
  const loginStudent = (
    email: string,
    fullName?: string
  ): { success: boolean; status: 'approved' | 'pending' | 'blocked'; message: string } => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      addToast('Email không hợp lệ', 'Vui lòng nhập đúng địa chỉ Gmail.', 'warning');
      return { success: false, status: 'pending', message: 'Email không hợp lệ' };
    }

    // If it's Admin email
    if (cleanEmail === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      setCurrentStudentEmail(cleanEmail);
      localStorage.setItem(STUDENT_SESSION_KEY, cleanEmail);
      addToast('Chào mừng Admin!', `Tài khoản ${cleanEmail} có toàn quyền tải sách.`, 'success');
      return { success: true, status: 'approved', message: 'Tài khoản Admin đã kích hoạt toàn quyền tải sách!' };
    }

    const existing = students.find((s) => s.email.toLowerCase() === cleanEmail);

    if (existing) {
      setCurrentStudentEmail(cleanEmail);
      localStorage.setItem(STUDENT_SESSION_KEY, cleanEmail);

      // Broadcast registration status so other devices/Admin instantly see this active student
      broadcastStudentAction({
        action: 'register',
        email: cleanEmail,
        fullName: existing.fullName,
        status: existing.status
      });

      if (existing.status === 'approved') {
        addToast(
          'Đã duyệt tải sách!',
          `Xin chào ${existing.fullName || cleanEmail}! Bạn đã được duyệt quyền tải toàn bộ sách VIP.`,
          'success'
        );
        return { success: true, status: 'approved', message: 'Tài khoản của bạn đã được duyệt tải sách!' };
      } else if (existing.status === 'blocked') {
        addToast(
          'Tài khoản bị chặn',
          `Gmail "${cleanEmail}" đã bị chặn tải sách. Vui lòng liên hệ Admin qua Zalo 0799713094.`,
          'warning'
        );
        return { success: false, status: 'blocked', message: 'Tài khoản này đã bị Admin tạm khóa quyền tải sách.' };
      } else {
        addToast(
          'Đang chờ Admin duyệt',
          `Gmail "${cleanEmail}" đang chờ Admin nguyentoandinh.0511@gmail.com phê duyệt.`,
          'info'
        );
        return {
          success: false,
          status: 'pending',
          message: 'Tài khoản của bạn đang chờ Admin phê duyệt. Vui lòng liên hệ Admin để được duyệt nhanh!'
        };
      }
    }

    // If student not found, register new pending student
    const newStudent: StudentAccount = {
      id: `std-${Date.now()}`,
      email: cleanEmail,
      fullName: fullName || cleanEmail.split('@')[0],
      status: 'pending',
      registeredAt: new Date().toISOString(),
      notes: 'Đăng ký tự động từ trang web'
    };

    setStudents((prev) => [newStudent, ...prev]);
    setCurrentStudentEmail(cleanEmail);
    localStorage.setItem(STUDENT_SESSION_KEY, cleanEmail);

    // Broadcast registration to Admin across devices
    broadcastStudentAction({
      action: 'register',
      email: cleanEmail,
      fullName: newStudent.fullName,
      status: 'pending'
    });

    addToast(
      'Đã gửi yêu cầu duyệt!',
      `Gmail "${cleanEmail}" đã được gửi tới Admin nguyentoandinh.0511@gmail.com chờ duyệt.`,
      'info'
    );

    return {
      success: false,
      status: 'pending',
      message: 'Đã gửi yêu cầu nhận quyền tải sách tới Admin nguyentoandinh.0511@gmail.com thành công!'
    };
  };

  const logoutStudent = () => {
    setCurrentStudentEmail(null);
    localStorage.removeItem(STUDENT_SESSION_KEY);
    addToast('Đã đăng xuất', 'Đã thoát tài khoản học viên.', 'info');
  };

  const approveStudent = (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    setStudents((prev) =>
      prev.map((s) =>
        s.email.toLowerCase() === cleanEmail
          ? { ...s, status: 'approved', approvedAt: new Date().toISOString() }
          : s
      )
    );
    broadcastStudentAction({ action: 'approve', email: cleanEmail, status: 'approved' });
    addToast('Đã DUYỆT học viên!', `Đã cấp quyền tải sách thành công cho ${cleanEmail}.`, 'success');
  };

  const blockStudent = (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    setStudents((prev) =>
      prev.map((s) =>
        s.email.toLowerCase() === cleanEmail
          ? { ...s, status: 'blocked' }
          : s
      )
    );
    broadcastStudentAction({ action: 'block', email: cleanEmail, status: 'blocked' });
    addToast('Đã CHẶN học viên!', `Đã khóa quyền tải sách của ${cleanEmail}.`, 'warning');
  };

  const unblockStudent = (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    setStudents((prev) =>
      prev.map((s) =>
        s.email.toLowerCase() === cleanEmail
          ? { ...s, status: 'approved' }
          : s
      )
    );
    broadcastStudentAction({ action: 'unblock', email: cleanEmail, status: 'approved' });
    addToast('Đã mở khóa học viên!', `Đã khôi phục quyền tải sách cho ${cleanEmail}.`, 'success');
  };

  const deleteStudent = (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    setStudents((prev) => prev.filter((s) => s.email.toLowerCase() !== cleanEmail));
    if (currentStudentEmail?.toLowerCase() === cleanEmail) {
      setCurrentStudentEmail(null);
      localStorage.removeItem(STUDENT_SESSION_KEY);
    }
    broadcastStudentAction({ action: 'delete', email: cleanEmail });
    addToast('Đã XÓA học viên!', `Đã gỡ hoàn toàn tài khoản ${cleanEmail} khỏi hệ thống.`, 'info');
  };

  const addStudentDirectly = (
    email: string,
    status: 'approved' | 'pending' = 'approved',
    fullName?: string
  ) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      addToast('Lỗi', 'Email không hợp lệ.', 'warning');
      return;
    }

    setStudents((prev) => {
      const exists = prev.find((s) => s.email.toLowerCase() === cleanEmail);
      if (exists) {
        return prev.map((s) =>
          s.email.toLowerCase() === cleanEmail
            ? { ...s, status, fullName: fullName || s.fullName }
            : s
        );
      }
      const newAcc: StudentAccount = {
        id: `std-${Date.now()}`,
        email: cleanEmail,
        fullName: fullName || cleanEmail.split('@')[0],
        status,
        registeredAt: new Date().toISOString(),
        approvedAt: status === 'approved' ? new Date().toISOString() : undefined,
        notes: 'Admin thêm trực tiếp'
      };
      return [newAcc, ...prev];
    });

    broadcastStudentAction({
      action: status === 'approved' ? 'approve' : 'register',
      email: cleanEmail,
      fullName,
      status
    });

    addToast(
      'Thao tác thành công!',
      `Học viên ${cleanEmail} đã được thiết lập: ${status === 'approved' ? 'ĐÃ DUYỆT' : 'CHỜ DUYỆT'}.`,
      'success'
    );
  };

  // Product CRUD (Restricted to Authorized Admin)
  const addProduct = (newProduct: Product) => {
    if (!isAdminAuthenticated) {
      addToast('Không có quyền!', `Chỉ admin ${AUTHORIZED_ADMIN_EMAIL} mới được đăng bài mới.`, 'warning');
      return;
    }
    setProducts((prev) => [newProduct, ...prev]);
    addToast('Đã đăng sản phẩm mới!', `Sản phẩm "${newProduct.name}" đã được hiển thị lên trang chủ.`);
  };

  const updateProduct = (updatedProduct: Product) => {
    if (!isAdminAuthenticated) {
      addToast('Không có quyền!', `Chỉ admin ${AUTHORIZED_ADMIN_EMAIL} mới được sửa thông tin.`, 'warning');
      return;
    }
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    addToast('Cập nhật thành công', `Đã cập nhật thông tin cho "${updatedProduct.name}".`, 'info');
  };

  const deleteProduct = (productId: string) => {
    if (!isAdminAuthenticated) {
      addToast('Không có quyền!', `Chỉ admin ${AUTHORIZED_ADMIN_EMAIL} mới được xóa sản phẩm.`, 'warning');
      return;
    }
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    addToast('Đã xóa sản phẩm', 'Sản phẩm đã được gỡ khỏi hệ thống.', 'info');
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast(
      'Đã thêm vào giỏ hàng!',
      `Sản phẩm "${product.name.slice(0, 30)}..." đã được thêm vào giỏ.`
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Đã xóa sản phẩm', 'Sản phẩm đã được bỏ khỏi giỏ hàng.', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.salePrice * item.quantity,
    0
  );
  const totalOriginalAmount = cart.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0
  );
  const totalSavings = totalOriginalAmount - totalAmount;

  return (
    <CartContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        adminEmail,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        students,
        currentStudentEmail,
        currentStudent,
        isStudentApproved,
        loginStudent,
        logoutStudent,
        approveStudent,
        blockStudent,
        unblockStudent,
        deleteStudent,
        addStudentDirectly,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
        totalOriginalAmount,
        totalSavings,
        isCartOpen,
        setIsCartOpen,
        activeProduct,
        setActiveProduct,
        isPromoModalOpen,
        setIsPromoModalOpen,
        isAdminOpen,
        setIsAdminOpen,
        isStudentAuthModalOpen,
        setIsStudentAuthModalOpen,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        toasts,
        addToast,
        removeToast,
        currentView,
        navigateToView,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
