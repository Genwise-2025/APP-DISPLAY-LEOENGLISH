import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types/product';
import { PRODUCTS_DATA } from '../data/products';

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
  
  // Search & Filter Global State
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;

  // Toast System
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'LEO_EDUCATION_CART_V2';
const PRODUCTS_STORAGE_KEY = 'LEO_EDUCATION_CUSTOM_PRODUCTS_V6';
const ADMIN_EMAIL_STORAGE_KEY = 'LEO_ADMIN_SESSION_EMAIL_V2';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

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
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        toasts,
        addToast,
        removeToast,
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
