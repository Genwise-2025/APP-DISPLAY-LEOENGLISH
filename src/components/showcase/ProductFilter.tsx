import React from 'react';
import { useCart } from '../../context/CartContext';
import { SortOption } from '../../types/product';
import { Search, Filter, ArrowUpDown, Sparkles } from 'lucide-react';

interface ProductFilterProps {
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  resultCount: number;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  sortBy,
  setSortBy,
  resultCount,
}) => {
  const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useCart();

  const filterTabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'app', label: '📱 Ứng dụng / App' },
    { id: 'English', label: 'Tiếng Anh' },
    { id: 'Chinese', label: 'Tiếng Trung' },
    { id: 'combo', label: 'Combo ưu đãi' },
    { id: 'book', label: 'Sách giấy' },
  ];

  return (
    <div className="w-full mb-8">
      {/* Top Controls Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-3xl glass-panel border border-amber-200 shadow-sm">
        
        {/* Real-time Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-warm-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm tên sách, ebook, phần mềm HSK..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/90 border border-gold-300 text-xs sm:text-sm text-darkbrown placeholder:text-darkbrown/50 focus:outline-none focus:ring-2 focus:ring-gold-500 shadow-inner"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-darkbrown/60 hover:text-darkbrown font-bold"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-darkbrown shrink-0">
            <ArrowUpDown className="w-4 h-4 text-warm-500" />
            <span>Sắp xếp:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="py-2 px-3 rounded-2xl bg-white/90 border border-gold-300 text-xs font-semibold text-darkbrown focus:outline-none focus:ring-2 focus:ring-gold-500 cursor-pointer shadow-sm"
          >
            <option value="featured">Nổi bật nhất</option>
            <option value="best-selling">Sản phẩm bán chạy</option>
            <option value="highest-discount">Giảm giá nhiều nhất</option>
            <option value="price-low">Giá: Thấp đến Cao</option>
            <option value="price-high">Giá: Cao đến Thấp</option>
          </select>
        </div>

      </div>

      {/* Filter Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-4 no-scrollbar">
        <div className="flex items-center gap-1 text-xs font-bold text-darkbrown/70 shrink-0 mr-1">
          <Filter className="w-3.5 h-3.5 text-warm-500" />
          <span>Bộ lọc:</span>
        </div>
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeCategory === tab.id
                ? 'bg-gradient-to-r from-gold-500 to-warm-500 text-darkbrown shadow-md scale-105 border border-amber-200'
                : 'bg-white/80 hover:bg-gold-100 text-darkbrown/80 border border-gold-200/60'
            }`}
          >
            {tab.id === 'combo' && <Sparkles className="w-3 h-3 text-warm-600" />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Result Count Status Bar */}
      <div className="mt-3 text-xs font-semibold text-darkbrown/70 flex items-center justify-between">
        <span>
          Hiển thị <strong className="text-warm-600 font-extrabold">{resultCount}</strong> sản phẩm
          {searchQuery && (
            <span> cho từ khóa "{searchQuery}"</span>
          )}
        </span>
        {activeCategory !== 'all' && (
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className="text-warm-600 hover:underline font-bold text-[11px]"
          >
            Xóa bộ lọc
          </button>
        )}
      </div>
    </div>
  );
};
