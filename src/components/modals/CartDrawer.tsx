import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { X, ShoppingBag, Trash2, Plus, Minus, Tag, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalAmount,
    totalOriginalAmount,
    totalSavings,
    addToast,
  } = useCart();

  const [voucherCode, setVoucherCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherCode.trim()) return;

    if (voucherCode.toUpperCase() === 'LEO50' || voucherCode.toUpperCase() === 'CHAOCANH') {
      const extraDiscount = Math.round(totalAmount * 0.1); // 10% extra voucher
      setDiscountAmount(extraDiscount);
      setIsVoucherApplied(true);
      addToast('Mã giảm giá hợp lệ!', `Bạn được giảm thêm ${formatCurrency(extraDiscount)}.`);
    } else {
      addToast('Mã không hợp lệ', 'Thử dùng mã LEO50 hoặc CHAOCANH.', 'warning');
    }
  };

  const finalCheckoutAmount = Math.max(0, totalAmount - discountAmount);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      setIsCartOpen(false);
      addToast(
        'Đặt hàng thành công!',
        'Cảm ơn bạn đã tin tưởng LEO EDUCATION. Nhân viên sẽ liên hệ gửi sách/tài khoản ngay lập tức.'
      );
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[65] bg-darkbrown/60 backdrop-blur-md flex justify-end"
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-md h-full bg-[#FFF9EF] p-6 flex flex-col justify-between shadow-2xl border-l border-gold-300 relative text-darkbrown"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-amber-200">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-gold-500 text-darkbrown flex items-center justify-center font-bold shadow">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-base text-darkbrown">Giỏ Hàng Của Bạn</h3>
                    <p className="text-[11px] text-darkbrown/70 font-bold">
                      ({totalItems} sản phẩm đã chọn)
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-xl text-darkbrown/60 hover:text-darkbrown hover:bg-gold-200/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items Scroll Area */}
              <div className="mt-4 overflow-y-auto max-h-[50vh] pr-1 space-y-3">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3 rounded-2xl bg-white border border-gold-200 shadow-sm flex items-center gap-3"
                    >
                      {/* Product Cover Thumbnail */}
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-14 h-18 object-cover rounded-lg border border-gold-300 shrink-0"
                      />

                      {/* Info & Quantity Controls */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-extrabold text-xs text-darkbrown truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[10px] text-warm-600 font-bold mt-0.5">
                          {formatCurrency(item.product.salePrice)}
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-gold-300 rounded-lg bg-cream px-1">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 text-darkbrown hover:text-warm-600"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-darkbrown">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 text-darkbrown hover:text-warm-600"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 transition-colors ml-auto"
                            title="Xóa sản phẩm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center text-darkbrown/60">
                    <ShoppingBag className="w-12 h-12 text-gold-400 mx-auto mb-2 opacity-60" />
                    <p className="text-xs font-semibold">Giỏ hàng của bạn đang trống</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-amber-200 space-y-3">
                {/* Voucher Form */}
                <form onSubmit={handleApplyVoucher} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-warm-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Nhập mã: LEO50"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-gold-300 text-xs font-semibold uppercase text-darkbrown focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-darkbrown font-extrabold text-xs shadow"
                  >
                    Áp Dụng
                  </button>
                </form>

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-darkbrown/70 font-semibold">
                    <span>Giá gốc ban đầu:</span>
                    <span className="line-through">{formatCurrency(totalOriginalAmount)}</span>
                  </div>

                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Tiết kiệm sản phẩm:</span>
                    <span>-{formatCurrency(totalSavings)}</span>
                  </div>

                  {isVoucherApplied && (
                    <div className="flex justify-between text-warm-600 font-bold">
                      <span>Mã giảm giá LEO50:</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-baseline pt-2 border-t border-amber-200/60 font-black text-sm">
                    <span className="text-darkbrown">Tổng thanh toán:</span>
                    <span className="text-xl text-warm-600">{formatCurrency(finalCheckoutAmount)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="space-y-2">
                  <button
                    type="button"
                    disabled={isCheckingOut}
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-warm-500 hover:from-gold-400 hover:to-warm-600 text-darkbrown font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isCheckingOut ? (
                      <span>Đang xử lý đơn hàng...</span>
                    ) : (
                      <>
                        <span>Tiến Hành Đặt Hàng Trực Tiếp</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <a
                    href={`https://zalo.me/0799713094`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow transition-all flex items-center justify-center gap-2"
                  >
                    <span>Gửi Đơn Nhanh Qua Zalo (0799713094)</span>
                  </a>
                </div>

                <div className="text-[10px] text-darkbrown/60 text-center font-semibold flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Bảo mật thông tin & Hỗ trợ kỹ thuật 24/7
                </div>
              </div>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
