import React from 'react';
import { SoftwareMockup } from '../UI/SoftwareMockup';
import { useCart } from '../../context/CartContext';
import { Sparkles, Mic, Brain, Headphones, Award, Smartphone, Video, BarChart3, CheckSquare, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const SoftwareFeatures: React.FC = () => {
  const { setIsPromoModalOpen } = useCart();

  const featureList = [
    {
      icon: Brain,
      title: 'Học từ vựng Flashcard 3D',
      desc: 'Ghi nhớ gấp 3 lần nhờ hình ảnh 3D trực quan và phương pháp lặp lại ngắt quãng (Spaced Repetition).',
      color: 'bg-gold-500/15 text-warm-600',
    },
    {
      icon: Mic,
      title: 'Luyện phát âm AI chuẩn xác',
      desc: 'Công nghệ AI chấm điểm thanh điệu, ngữ điệu từng từ giúp bạn phát âm như người bản xứ.',
      color: 'bg-warm-500/15 text-warm-600',
    },
    {
      icon: Headphones,
      title: 'Luyện nghe chép chính tả',
      desc: 'Tăng cường phản xạ nghe qua các đoạn hội thoại thực tế có điều chỉnh tốc độ đọc.',
      color: 'bg-blue-500/15 text-blue-600',
    },
    {
      icon: Award,
      title: 'Giáo trình & Đề thi HSK 1–6',
      desc: 'Trọn bộ bài giảng và 200+ đề thi thử HSK có chấm điểm và đáp án giải thích chi tiết.',
      color: 'bg-emerald-500/15 text-emerald-600',
    },
    {
      icon: Video,
      title: 'Video bài giảng quay sẵn',
      desc: 'Xem lại bài giảng không giới hạn thời gian, học theo tốc độ cá nhân mọi lúc mọi nơi.',
      color: 'bg-purple-500/15 text-purple-600',
    },
    {
      icon: BarChart3,
      title: 'Theo dõi tiến độ thông minh',
      desc: 'Báo cáo chi tiết điểm mạnh, điểm yếu và lộ trình cải thiện kỹ năng mỗi ngày.',
      color: 'bg-amber-500/15 text-amber-700',
    },
    {
      icon: CheckSquare,
      title: 'Bài tập & Quiz tương tác',
      desc: 'Hệ thống câu hỏi trắc nghiệm sinh động giúp củng cố kiến thức ngay sau mỗi bài học.',
      color: 'bg-rose-500/15 text-rose-600',
    },
    {
      icon: Smartphone,
      title: 'Học đa nền tảng',
      desc: 'Đăng nhập linh hoạt trên iPhone, Android, iPad và Máy tính (Windows/Mac).',
      color: 'bg-indigo-500/15 text-indigo-600',
    },
  ];

  return (
    <section id="software-section" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warm-100 text-warm-700 font-extrabold text-xs mb-3 border border-warm-300">
            <Sparkles className="w-3.5 h-3.5 text-warm-500" />
            CÔNG NGHỆ PHẦN MỀM THÔNG MINH
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-darkbrown">
            Ứng Dụng Học Tập LEO AI Pro
          </h2>
          <p className="text-sm text-darkbrown/80 font-medium mt-2">
            Trải nghiệm phương pháp học ngoại ngữ thời đại công nghệ số
          </p>
        </div>

        {/* Software Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Feature Laptop Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <SoftwareMockup
              title="Phần Mềm LEO Education AI"
              subtitle="Luyện phản xạ giao tiếp & HSK 1-6 chuyên sâu"
              onPreviewVideo={() => setIsPromoModalOpen(true)}
            />
          </div>

          {/* Right Features Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featureList.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="glass-card p-4 sm:p-5 rounded-2xl border border-amber-200/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl ${feat.color} shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-darkbrown">{feat.title}</h4>
                      <p className="text-xs text-darkbrown/75 font-medium mt-1 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
