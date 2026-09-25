import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { CSS3DBook } from '../UI/CSS3DBook';
import { SoftwareMockup } from '../UI/SoftwareMockup';
import { X, Star, ShoppingBag, CheckCircle2, ShieldCheck, PhoneCall, Sparkles, BookOpen, PlayCircle, Eye, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductDetailModal: React.FC = () => {
  const { activeProduct, setActiveProduct, addToCart, setIsCartOpen } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'included' | 'sample' | 'demo'>('overview');
  const [showSampleReader, setShowSampleReader] = useState(false);

  if (!activeProduct) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleBuyNow = () => {
    addToCart(activeProduct);
    setActiveProduct(null);
    setIsCartOpen(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] bg-darkbrown/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        onClick={() => setActiveProduct(null)}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative w-full max-w-4xl bg-[#FFF9EF] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-gold-400 my-6 overflow-hidden text-darkbrown"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setActiveProduct(null)}
            className="absolute top-4 right-4 p-2 rounded-full text-darkbrown/60 hover:text-darkbrown hover:bg-gold-200/50 transition-colors z-20"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: 3D MODEL & GALLERY */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              {/* Main 3D Display Box */}
              <div className="w-full flex items-center justify-center min-h-[300px] sm:min-h-[360px] p-4 rounded-2xl glass-panel border border-amber-200 shadow-inner relative">
                {activeProduct.type === 'software' ? (
                  <SoftwareMockup
                    title={activeProduct.name}
                    subtitle={activeProduct.description}
                    coverImage={activeProduct.images[activeImageIndex] || activeProduct.images[0]}
                    language={activeProduct.language}
                  />
                ) : (
                  <CSS3DBook
                    coverImage={activeProduct.images[activeImageIndex] || activeProduct.images[0]}
                    title={activeProduct.name}
                    thickness={activeProduct.thickness || 34}
                    spineColor={activeProduct.spineColor || '#D84315'}
                    width={170}
                    height={250}
                  />
                )}
              </div>

              {/* Gallery Thumbnails (if multiple images) */}
              {activeProduct.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto max-w-full py-1">
                  {activeProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-18 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? 'border-warm-500 scale-105 shadow-md' : 'border-gold-300 opacity-60'
                      }`}
                    >
                      <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Type-Specific Interactive Actions */}
              <div className="w-full mt-4 flex flex-col gap-2">
                {activeProduct.type === 'ebook' || activeProduct.type === 'book' ? (
                  <button
                    type="button"
                    onClick={() => setShowSampleReader(!showSampleReader)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white border border-gold-400 text-darkbrown font-bold text-xs flex items-center justify-center gap-2 hover:bg-gold-100 transition-colors shadow-sm"
                  >
                    <BookOpen className="w-4 h-4 text-warm-500" />
                    {showSampleReader ? 'Ẩn bản đọc thử' : 'Xem thử nội dung (Đọc 5 trang mẫu)'}
                  </button>
                ) : null}

                {activeProduct.zaloCatalogUrl && (
                  <a
                    href={activeProduct.zaloCatalogUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Xem Sản Phẩm Này Trên Zalo Catalog
                  </a>
                )}
              </div>

            </div>

            {/* RIGHT COLUMN: PRODUCT SPECIFICATIONS & CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              
              <div>
                {/* Category & Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-gold-500 to-warm-500 text-darkbrown font-extrabold text-[10px] uppercase">
                    {activeProduct.category}
                  </span>
                  {activeProduct.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-bold text-[10px]">
                      {activeProduct.badge}
                    </span>
                  )}
                </div>

                {/* Name */}
                <h2 className="text-xl sm:text-2xl font-black text-darkbrown leading-tight">
                  {activeProduct.name}
                </h2>

                {/* Rating & Sales */}
                <div className="flex items-center gap-3 mt-2 text-xs font-bold text-darkbrown/80">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-gold-400 text-gold-500" />
                    <span>{activeProduct.rating}</span>
                    <span className="text-darkbrown/50">({activeProduct.ratingCount} đánh giá)</span>
                  </div>
                  <span>•</span>
                  <span>Đã bán: <strong className="text-warm-600">{activeProduct.sold}</strong> sản phẩm</span>
                </div>

                {/* Price Box */}
                <div className="mt-4 p-4 rounded-2xl bg-white border border-gold-300 flex items-baseline justify-between shadow-sm">
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-warm-600 tracking-tight">
                      {formatCurrency(activeProduct.salePrice)}
                    </span>
                    <span className="text-xs text-darkbrown/50 line-through font-semibold ml-2">
                      {formatCurrency(activeProduct.originalPrice)}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-600 font-extrabold text-xs">
                    Tiết kiệm {activeProduct.discount}%
                  </span>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b border-amber-200 mt-5">
                  <button
                    type="button"
                    onClick={() => setActiveTab('overview')}
                    className={`py-2 px-3 text-xs font-extrabold border-b-2 transition-all ${
                      activeTab === 'overview' ? 'border-warm-500 text-warm-600' : 'border-transparent text-darkbrown/60'
                    }`}
                  >
                    Tổng quan
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('included')}
                    className={`py-2 px-3 text-xs font-extrabold border-b-2 transition-all ${
                      activeTab === 'included' ? 'border-warm-500 text-warm-600' : 'border-transparent text-darkbrown/60'
                    }`}
                  >
                    Bộ sản phẩm bao gồm ({activeProduct.includedItems.length})
                  </button>
                </div>

                {/* Tab Content */}
                <div className="mt-3 py-1">
                  {activeTab === 'overview' && (
                    <div className="space-y-3">
                      <p className="text-xs sm:text-sm text-darkbrown/85 font-medium leading-relaxed">
                        {activeProduct.fullDescription}
                      </p>

                      {/* Key Features */}
                      <div>
                        <h4 className="font-extrabold text-xs text-darkbrown mb-1.5">Tính năng nổi bật:</h4>
                        <div className="space-y-1">
                          {activeProduct.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs font-medium text-darkbrown/80">
                              <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'included' && (
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-xs text-darkbrown">Vật phẩm & Tài khoản trọn gói:</h4>
                      {activeProduct.includedItems.map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-white border border-gold-200 text-xs font-semibold text-darkbrown flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-warm-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sample Reader Preview Popup Drawer */}
                {showSampleReader && activeProduct.samplePages && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-2xl bg-amber-50 border border-gold-300 text-xs"
                  >
                    <h4 className="font-extrabold text-darkbrown mb-2 flex items-center gap-1">
                      <FileText className="w-4 h-4 text-warm-500" /> Bản xem thử nội dung sách:
                    </h4>
                    <ul className="space-y-1 text-darkbrown/80 font-medium">
                      {activeProduct.samplePages.map((page, i) => (
                        <li key={i} className="p-2 rounded bg-white border border-amber-200 flex items-center justify-between">
                          <span>{page}</span>
                          <span className="text-[10px] text-warm-600 font-bold">Xem trang</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

              </div>

              {/* Action Buttons Footer */}
              <div className="mt-6 pt-4 border-t border-amber-200 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-gold-500 to-warm-500 hover:from-gold-400 hover:to-warm-600 text-darkbrown font-black text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  Mua Ngay
                </button>

                <button
                  type="button"
                  onClick={() => addToCart(activeProduct)}
                  className="py-3 px-4 rounded-2xl bg-white hover:bg-gold-100 border border-gold-300 text-darkbrown font-extrabold text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-warm-500" />
                  Thêm Vào Giỏ
                </button>

                <a
                  href="https://zalo.me/0799713094"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
                  title="Tư vấn qua Zalo"
                >
                  <PhoneCall className="w-5 h-5" />
                </a>
              </div>

            </div>

          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
