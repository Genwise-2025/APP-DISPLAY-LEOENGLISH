import React, { useState } from 'react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import { CSS3DBook } from '../UI/CSS3DBook';
import { SoftwareMockup } from '../UI/SoftwareMockup';
import { Star, ShoppingBag, Eye, Heart, Sparkles, Laptop, BookOpen, Edit3, Upload, Trash2, ShieldCheck, Tag, ExternalLink } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setActiveProduct, isAdminAuthenticated, updateProduct, deleteProduct, addToast } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  // Inline Image Upload Handler for Admin
  const handleAdminImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImageBase64 = reader.result as string;
        updateProduct({
          ...product,
          images: [newImageBase64, ...product.images.slice(1)],
        });
        addToast('Thay đổi ảnh thành công!', `Đã cập nhật ảnh bìa cho "${product.name}".`);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-5 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 group border border-amber-200/70 shadow-md hover:shadow-2xl relative overflow-hidden">
      
      {/* ADMIN QUICK EDIT TOOLBAR (ONLY VISIBLE TO LOGGED-IN ADMIN) */}
      {isAdminAuthenticated && (
        <div className="mb-3 p-2 rounded-2xl bg-gradient-to-r from-darkbrown to-darkbrown-deep text-gold-300 shadow-md border border-gold-500/40 z-30">
          <div className="flex items-center justify-between text-[10px] font-extrabold text-gold-400 pb-1 mb-1 border-b border-gold-500/20">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Admin Edit Tool
            </span>
            <span className="text-[9px] bg-emerald-700 text-white px-1.5 py-0.2 rounded-md">ID: {product.id.slice(-6)}</span>
          </div>

          <div className="grid grid-cols-4 gap-1">
            {/* Quick Upload Image */}
            <label className="py-1 px-1 rounded-lg bg-gold-500/20 hover:bg-gold-500 text-gold-300 hover:text-darkbrown text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors" title="Tải ảnh mới từ máy">
              <Upload className="w-3 h-3" />
              <span>Đổi ảnh</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAdminImageUpload}
              />
            </label>

            {/* Quick Edit Price */}
            <button
              type="button"
              onClick={() => {
                const newPriceStr = prompt(`Nhập giá bán mới cho "${product.name}" (VNĐ):`, product.salePrice.toString());
                if (newPriceStr) {
                  const newPrice = parseInt(newPriceStr, 10);
                  if (!isNaN(newPrice) && newPrice > 0) {
                    updateProduct({ ...product, salePrice: newPrice });
                  }
                }
              }}
              className="py-1 px-1 rounded-lg bg-gold-500/20 hover:bg-gold-500 text-gold-300 hover:text-darkbrown text-[10px] font-bold flex items-center justify-center gap-1 transition-colors"
              title="Chỉnh sửa giá"
            >
              <Edit3 className="w-3 h-3" />
              <span>Sửa giá</span>
            </button>

            {/* Quick Edit Name */}
            <button
              type="button"
              onClick={() => {
                const newName = prompt(`Nhập tên mới cho sản phẩm:`, product.name);
                if (newName && newName.trim()) {
                  updateProduct({ ...product, name: newName.trim() });
                }
              }}
              className="py-1 px-1 rounded-lg bg-gold-500/20 hover:bg-gold-500 text-gold-300 hover:text-darkbrown text-[10px] font-bold flex items-center justify-center gap-1 transition-colors"
              title="Đổi tên sản phẩm"
            >
              <Tag className="w-3 h-3" />
              <span>Đổi tên</span>
            </button>

            {/* Quick Delete */}
            <button
              type="button"
              onClick={() => {
                if (confirm(`Bạn có chắc muốn xóa "${product.name}"?`)) {
                  deleteProduct(product.id);
                }
              }}
              className="py-1 px-1 rounded-lg bg-rose-500/30 hover:bg-rose-600 text-rose-200 hover:text-white text-[10px] font-bold flex items-center justify-center gap-1 transition-colors"
              title="Xóa sản phẩm"
            >
              <Trash2 className="w-3 h-3" />
              <span>Xóa</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Header Row: Badge & Wishlist */}
      <div className="flex items-center justify-between mb-2 z-10">
        {product.badge ? (
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-warm-500 to-gold-500 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {product.badge}
          </span>
        ) : (
          <span className="px-2.5 py-0.5 rounded-full bg-cream-dark text-darkbrown font-bold text-[10px]">
            {product.category}
          </span>
        )}

        <button
          type="button"
          onClick={() => setIsFavorite(!isFavorite)}
          className={`p-2 rounded-full transition-all ${
            isFavorite ? 'bg-rose-500 text-white shadow-md' : 'bg-white/80 text-darkbrown/50 hover:text-rose-500'
          }`}
          title="Yêu thích"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* 3D VISUAL PRODUCT PRESENTATION AREA */}
      <div
        className="relative my-2 py-4 flex items-center justify-center min-h-[260px] cursor-pointer"
        onClick={() => setActiveProduct(product)}
      >
        {/* Subtle radial glow light behind image */}
        <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-gold-500/20 via-warm-400/15 to-transparent blur-2xl group-hover:scale-125 transition-transform" />

        {product.type === 'software' ? (
          <SoftwareMockup
            title={product.name}
            subtitle={product.description}
            coverImage={product.images[0]}
            language={product.language}
            onPreviewVideo={() => setActiveProduct(product)}
          />
        ) : (
          <CSS3DBook
            coverImage={product.images[0]}
            title={product.name}
            thickness={product.thickness || 32}
            spineColor={product.spineColor || '#D84315'}
            width={140}
            height={210}
            onQuickView={() => setActiveProduct(product)}
          />
        )}
      </div>

      {/* PRODUCT DETAILS */}
      <div className="mt-2 flex flex-col flex-1 justify-between">
        
        <div>
          {/* Product Type Tag & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[11px] font-extrabold text-warm-600 flex items-center gap-1">
              {product.type === 'software' && <Laptop className="w-3.5 h-3.5" />}
              {product.type === 'book' && <BookOpen className="w-3.5 h-3.5" />}
              {product.language === 'English' ? 'Tiếng Anh' : product.language === 'Chinese' ? 'Tiếng Trung' : 'Đa Ngôn Ngữ'}
            </span>

            <div className="flex items-center gap-1 font-bold text-darkbrown text-[11px]">
              <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-500" />
              <span>{product.rating}</span>
              <span className="text-darkbrown/50">({product.sold})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setActiveProduct(product)}
            className="font-extrabold text-sm sm:text-base text-darkbrown group-hover:text-warm-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-darkbrown/75 font-medium line-clamp-2 mt-1.5">
            {product.description}
          </p>
        </div>

        {/* PRICE & ACTION BUTTONS SECTION */}
        <div className="mt-4 pt-3 border-t border-amber-200/60">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              {/* Sale Price */}
              <span className="text-lg sm:text-xl font-black text-warm-600 tracking-tight">
                {formatCurrency(product.salePrice)}
              </span>
              {/* Original Price */}
              <span className="text-xs text-darkbrown/50 line-through font-semibold ml-2">
                {formatCurrency(product.originalPrice)}
              </span>
            </div>

            {/* Discount Percentage Badge */}
            <span className="px-2 py-0.5 rounded-lg bg-rose-500/10 text-rose-600 font-extrabold text-xs border border-rose-300/40">
              -{product.discount}%
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setActiveProduct(product)}
              className="py-2.5 px-3 rounded-xl bg-white hover:bg-gold-100 text-darkbrown font-extrabold text-xs border border-gold-300 shadow-sm transition-all flex items-center justify-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              Chi Tiết
            </button>

            <button
              type="button"
              onClick={() => addToCart(product)}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-gold-500 to-warm-500 hover:from-gold-400 hover:to-warm-600 text-darkbrown font-black text-xs shadow-md transition-all flex items-center justify-center gap-1 group/btn"
            >
              <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
              Thêm Giỏ
            </button>
          </div>

          {/* Quick Zalo Link */}
          {product.zaloCatalogUrl && (
            <a
              href={product.zaloCatalogUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 w-full py-1.5 px-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold text-[11px] border border-blue-200 flex items-center justify-center gap-1 transition-all"
            >
              <ExternalLink className="w-3 h-3 text-blue-600" />
              <span>Xem trực tiếp trên Zalo Catalog</span>
            </a>
          )}
        </div>

      </div>

    </div>
  );
};
