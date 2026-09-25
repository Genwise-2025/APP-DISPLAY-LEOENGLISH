import React, { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { ProductFilter } from './ProductFilter';
import { ProductCard } from './ProductCard';
import { SortOption } from '../../types/product';
import { SearchX, Sparkles, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductGrid: React.FC = () => {
  const { products, searchQuery, activeCategory, setSearchQuery, setActiveCategory, setIsAdminOpen } = useCart();
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category / Type filter
      let matchesCategory = true;
      if (activeCategory === 'app') {
        matchesCategory = product.type === 'software' || !!product.appType;
      } else if (activeCategory === 'English' || activeCategory === 'Chinese') {
        matchesCategory = product.language === activeCategory;
      } else if (activeCategory === 'book' || activeCategory === 'ebook' || activeCategory === 'software' || activeCategory === 'combo') {
        matchesCategory = product.type === activeCategory;
      }

      // Search Query filter
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.salePrice - b.salePrice;
      if (sortBy === 'price-high') return b.salePrice - a.salePrice;
      if (sortBy === 'best-selling') return b.sold - a.sold;
      if (sortBy === 'highest-discount') return b.discount - a.discount;
      return 0; // default featured order
    });
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <section id="products-section" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/20 text-darkbrown font-extrabold text-xs mb-3 border border-gold-400/40">
            <Sparkles className="w-3.5 h-3.5 text-warm-500" />
            CỬA HÀNG SẢN PHẨM LEO EDUCATION
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-darkbrown">
            Sách, Ebook & Phần Mềm Học Tập
          </h2>
          <p className="text-sm text-darkbrown/80 font-medium mt-2">
            Mô hình 3D trực quan, chất lượng biên soạn hàng đầu, cam kết đồng hành trọn đời
          </p>

          <button
            type="button"
            onClick={() => setIsAdminOpen(true)}
            className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-darkbrown to-darkbrown-deep text-gold-300 font-extrabold text-xs shadow hover:scale-105 transition-transform flex items-center gap-1.5 border border-gold-500/40"
          >
            <PlusCircle className="w-4 h-4 text-warm-400" />
            Quản lý & Đăng bài mới (Admin CMS)
          </button>
        </div>

        {/* Filter Bar */}
        <ProductFilter
          sortBy={sortBy}
          setSortBy={setSortBy}
          resultCount={filteredProducts.length}
        />

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty Search / Filter State */
          <div className="glass-panel p-12 rounded-3xl text-center max-w-md mx-auto my-12 border border-amber-200">
            <SearchX className="w-12 h-12 text-warm-500 mx-auto mb-3 opacity-80" />
            <h3 className="font-extrabold text-lg text-darkbrown">Không tìm thấy sản phẩm phù hợp</h3>
            <p className="text-xs text-darkbrown/70 mt-1">
              Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc để xem toàn bộ danh mục sản phẩm.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-5 px-5 py-2.5 rounded-xl bg-gold-500 text-darkbrown font-extrabold text-xs shadow hover:bg-gold-400 transition-colors"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
