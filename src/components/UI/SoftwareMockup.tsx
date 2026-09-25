import React from 'react';
import { Volume2, Mic, Award, CheckCircle2, PlayCircle, Sparkles } from 'lucide-react';

interface SoftwareMockupProps {
  title: string;
  subtitle?: string;
  coverImage?: string;
  onPreviewVideo?: () => void;
  language?: 'English' | 'Chinese' | 'Both';
}

export const SoftwareMockup: React.FC<SoftwareMockupProps> = ({
  title,
  subtitle,
  coverImage,
  onPreviewVideo,
  language,
}) => {
  const isChinese = language === 'Chinese' || title.toLowerCase().includes('mandaleo') || title.toLowerCase().includes('trung');
  const displayImage = coverImage || (isChinese ? '/images/zalo/mandaleo-1.jpg' : '/images/zalo/leo-pro-1.jpg');

  return (
    <div className="relative flex flex-col items-center justify-center p-3 group select-none">
      {/* Floating Animated Feature Badges around Laptop */}
      <div className="absolute -top-3 -left-2 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl border border-gold-300 shadow-md text-[11px] font-black text-darkbrown flex items-center gap-1.5 animate-float z-20">
        <Mic className="w-3.5 h-3.5 text-warm-500 animate-pulse" />
        {isChinese ? 'Sư Tử MandaLeo AI' : 'Công Nghệ AI Chuẩn Mỹ'}
      </div>

      <div className="absolute top-1/2 -right-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl border border-gold-300 shadow-md text-[11px] font-black text-darkbrown flex items-center gap-1.5 animate-float-slow z-20" style={{ animationDelay: '1.2s' }}>
        <Volume2 className="w-3.5 h-3.5 text-gold-500" />
        {isChinese ? '3 Câu Mỗi Ngày' : 'Phản Xạ Swivox 3 Giây'}
      </div>

      <div className="absolute -bottom-1 -left-1 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl border border-gold-300 shadow-md text-[11px] font-black text-darkbrown flex items-center gap-1.5 animate-float z-20" style={{ animationDelay: '2.5s' }}>
        <Award className="w-3.5 h-3.5 text-emerald-500" />
        {isChinese ? 'HSK 1 đến HSK 6' : 'Sở Hữu Vĩnh Viễn'}
      </div>

      {/* Screen Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/20 via-warm-400/20 to-transparent blur-3xl rounded-full opacity-70 group-hover:opacity-100 transition-opacity" />

      {/* Laptop Frame Container */}
      <div className="relative w-full max-w-[320px] sm:max-w-[380px] transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-0.5">
        {/* Laptop Display Outer Box */}
        <div className="relative aspect-[16/10] bg-darkbrown rounded-t-2xl p-2 sm:p-2.5 border-4 border-slate-800 shadow-2xl overflow-hidden flex flex-col">
          {/* Web Cam & Speaker notches */}
          <div className="flex justify-center items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-slate-700" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Real Display Image Frame */}
          <div className="relative flex-1 rounded-lg bg-darkbrown overflow-hidden border border-gold-500/30 group/screen">
            <img
              src={displayImage}
              alt={title}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/screen:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = isChinese ? '/images/mandaleo/mandaleo-banner.png' : '/images/books/leo-english-starter.png';
              }}
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-darkbrown-deep/85 via-transparent to-transparent opacity-65" />

            {/* Bottom App Overlay Tag */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between p-2 rounded-lg bg-darkbrown/90 backdrop-blur-md border border-gold-400/30 text-white">
              <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                <div className="w-6 h-6 rounded-md bg-gold-500 text-darkbrown font-black text-xs flex items-center justify-center shrink-0">
                  {isChinese ? '中' : 'LEO'}
                </div>
                <div className="min-w-0">
                  <h4 className="font-extrabold text-[10px] sm:text-[11px] text-gold-300 leading-tight truncate">{title}</h4>
                  <p className="text-[9px] text-cream/80 font-medium truncate">{subtitle || 'Học ngoại ngữ thông minh'}</p>
                </div>
              </div>

              {onPreviewVideo && (
                <button
                  type="button"
                  onClick={onPreviewVideo}
                  className="px-2.5 py-1 bg-gold-500 hover:bg-gold-400 text-darkbrown font-black text-[10px] rounded-md transition-colors flex items-center gap-1 shadow shrink-0"
                >
                  <PlayCircle className="w-3 h-3" /> Trải Nghiệm
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Laptop Base Keyboard Stand */}
        <div className="relative h-3 sm:h-4 bg-slate-800 rounded-b-xl border-t-2 border-slate-700 shadow-xl flex justify-center items-center">
          <div className="w-16 h-1 rounded-full bg-slate-600" />
        </div>
      </div>
    </div>
  );
};
