import React from 'react';
import { useCart } from '../../context/CartContext';
import { BookOpen, Globe2, Laptop, Library, Sparkles, ArrowRight, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export const CategorySection: React.FC = () => {
  const { setActiveCategory } = useCart();

  const categories = [
    {
      id: 'English',
      name: 'English Books',
      title: 'Sách Tiếng Anh Giao Tiếp',
      desc: 'Sách in màu cao cấp kèm sơ đồ Mindmap & Audio giọng Mỹ chuẩn.',
      count: '15+ Đầu sách',
      icon: BookOpen,
      color: 'from-warm-400 to-gold-500',
    },
    {
      id: 'Chinese',
      name: 'Chinese Books',
      title: 'Sách Tiếng Trung HSK',
      desc: 'Giáo trình luyện chữ Hán, từ vựng HSK 1–6 cho người Việt.',
      count: '10+ Đầu sách',
      icon: Globe2,
      color: 'from-rose-500 to-warm-500',
    },
    {
      id: 'software',
      name: 'English Software',
      title: 'Phần Mềm Tiếng Anh AI',
      desc: 'Luyện phản xạ nghe nói & sửa phát âm trực tiếp với trí tuệ nhân tạo.',
      count: 'Bản quyền trọn đời',
      icon: Laptop,
      color: 'from-amber-500 to-gold-400',
    },
    {
      id: 'software',
      name: 'Chinese Software',
      title: 'Phần Mềm MandaLeo HSK',
      desc: 'Học Flashcard 3D, quy tắc nét chữ Hán và đề thi thử HSK.',
      count: 'Bản quyền trọn đời',
      icon: Sparkles,
      color: 'from-gold-500 to-warm-600',
    },
    {
      id: 'ebook',
      name: 'Ebook Library',
      title: 'Thư Viện Ebook Tương Tác',
      desc: 'Ebook PDF bấm phát âm thanh trực tiếp trên điện thoại & máy tính.',
      count: '20+ File Ebook',
      icon: Library,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'combo',
      name: 'Learning Combos',
      title: 'Combo Ưu Đãi Trọn Gói',
      desc: 'Gói giải pháp toàn diện gồm Sách + Ebook + App tiết kiệm tới 50%.',
      count: 'Tiết kiệm nhất',
      icon: Layers,
      color: 'from-warm-600 to-gold-600',
    },
  ];

  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-warm-600 uppercase tracking-widest bg-warm-100 px-3 py-1 rounded-full border border-warm-300/40">
            HỆ SINH THÁI ĐA DẠNG
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-darkbrown mt-3">
            Danh Mục Sản Phẩm Giáo Dục LEO
          </h2>
          <p className="text-sm text-darkbrown/80 font-medium mt-2">
            Lựa chọn hình thức học tập phù hợp nhất với phong cách và mục tiêu của bạn
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => handleSelectCategory(cat.id)}
                className="glass-card p-6 rounded-3xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative overflow-hidden shadow-sm hover:shadow-xl border border-amber-200/60"
              >
                {/* Top Corner Gradient Flare */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${cat.color} opacity-10 group-hover:opacity-25 transition-opacity rounded-bl-full`} />

                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${cat.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-darkbrown/70 bg-white/80 px-2.5 py-1 rounded-full border border-amber-200">
                    {cat.count}
                  </span>
                </div>

                <h3 className="font-extrabold text-lg text-darkbrown group-hover:text-warm-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-darkbrown/75 font-medium mt-2 leading-relaxed">
                  {cat.desc}
                </p>

                <div className="mt-6 pt-4 border-t border-amber-200/50 flex items-center justify-between text-xs font-extrabold text-darkbrown group-hover:text-warm-600">
                  <span>Khám phá ngay</span>
                  <div className="w-7 h-7 rounded-full bg-gold-500/20 group-hover:bg-gold-500 group-hover:text-darkbrown flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
