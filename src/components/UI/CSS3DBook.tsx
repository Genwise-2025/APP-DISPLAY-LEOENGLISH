import React, { useState, useRef } from 'react';
import { BookOpen, Sparkles, Eye } from 'lucide-react';

interface CSS3DBookProps {
  coverImage: string;
  title: string;
  thickness?: number; // thickness in px (default 34)
  width?: number; // width in px (default 200)
  height?: number; // height in px (default 280)
  spineColor?: string;
  badge?: string;
  onQuickView?: () => void;
  showHoverEffect?: boolean;
}

export const CSS3DBook: React.FC<CSS3DBookProps> = ({
  coverImage,
  title,
  thickness = 34,
  width = 200,
  height = 280,
  spineColor = '#D84315',
  badge,
  onQuickView,
  showHoverEffect = true,
}) => {
  const [rotate, setRotate] = useState({ x: 8, y: -22 });
  const [isHovered, setIsHovered] = useState(false);
  const bookRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showHoverEffect || !bookRef.current) return;
    const rect = bookRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 18 - 8;
    const rotateX = -((y - centerY) / centerY) * 14 + 4;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 8, y: -22 });
  };

  return (
    <div
      ref={bookRef}
      className="book-scene relative flex items-center justify-center py-6 cursor-pointer group"
      style={{
        width: `${width + 60}px`,
        height: `${height + 40}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onQuickView}
    >
      {/* Dynamic Floor Soft Drop Shadow */}
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full transition-all duration-500 pointer-events-none"
        style={{
          width: `${width * 0.95}px`,
          height: `${thickness * 0.7}px`,
          background: 'radial-gradient(ellipse at center, rgba(59, 36, 24, 0.45) 0%, rgba(59, 36, 24, 0.1) 60%, transparent 80%)',
          transform: isHovered
            ? 'scale(1.15) translateY(12px) rotate(2deg)'
            : 'scale(1) translateY(0px)',
          filter: 'blur(8px)',
        }}
      />

      {/* Warm Ambient Gold Backlight Glow */}
      <div
        className="absolute w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[35px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245, 183, 0, 0.45) 0%, rgba(255, 138, 61, 0.25) 70%, transparent 100%)',
        }}
      />

      {/* 3D Book Container */}
      <div
        className="book-3d-wrapper relative"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: isHovered
            ? `rotateY(${rotate.y}deg) rotateX(${rotate.x}deg) translateY(-14px) scale(1.03)`
            : 'rotateY(-22deg) rotateX(8deg)',
          '--book-thickness': `${thickness}px`,
          '--book-width': `${width}px`,
          '--spine-color': spineColor,
        } as React.CSSProperties}
      >
        {/* FRONT COVER */}
        <div className="book-face book-front relative overflow-hidden bg-cream border border-amber-200/40">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover select-none"
            onError={(e) => {
              // Fallback placeholder with nice title if image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />

          {/* Image Fallback Container */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500 to-warm-600 p-4 flex flex-col justify-between text-white -z-10">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-1 rounded">LEO BOOK</span>
              <BookOpen className="w-5 h-5 opacity-80" />
            </div>
            <h3 className="font-extrabold text-lg leading-tight line-clamp-3 text-shadow">{title}</h3>
            <p className="text-xs text-amber-100 font-medium">LEO EDUCATION PUBLISHING</p>
          </div>

          {/* Shimmer Light Reflection effect */}
          <div className="shimmer-glow pointer-events-none" />

          {/* Book Front Spine Shadow overlay */}
          <div className="absolute top-0 left-0 bottom-0 w-4 bg-gradient-to-r from-black/30 via-black/10 to-transparent pointer-events-none" />

          {/* Quick View Button Hover Overlay */}
          {onQuickView && (
            <div className="absolute inset-0 bg-darkbrown/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4">
              <button
                type="button"
                className="px-4 py-2 bg-gradient-to-r from-gold-500 to-warm-400 text-darkbrown font-bold text-xs rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-1.5"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView();
                }}
              >
                <Eye className="w-4 h-4" />
                Xem Chi Tiết 3D
              </button>
            </div>
          )}

          {/* Gold VIP Seal Stamp */}
          <div 
            className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-xl overflow-hidden border border-gold-400/80 shadow-md bg-black/50 backdrop-blur-[2px] opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none"
            title="Book VIP LeoEnglish - Bản quyền chính hãng"
          >
            <img src="/images/logo-book-vip.png" alt="Book VIP Seal" className="w-full h-full object-cover" />
          </div>

          {/* Badge Overlay */}
          {badge && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-warm-500 to-gold-500 text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
              {badge}
            </div>
          )}
        </div>

        {/* BACK COVER */}
        <div className="book-face book-back bg-darkbrown p-4 text-cream flex flex-col justify-between border border-gold-500/30">
          <div className="text-[10px] text-amber-300/80 font-mono uppercase tracking-widest">LEO EDUCATION</div>
          <div className="text-center font-bold text-xs text-gold-300 line-clamp-4">{title}</div>
          <div className="text-[9px] text-amber-200/60 text-center">www.leoeducation.vn</div>
        </div>

        {/* SPINE */}
        <div className="book-face book-spine text-white">
          <div className="text-[9px] font-bold text-amber-200 uppercase tracking-widest rotate-90 my-2">LEO</div>
          <div
            className="text-[11px] font-bold tracking-wide text-white text-center line-clamp-2"
            style={{
              writingMode: 'vertical-rl',
              textTransform: 'uppercase',
              transform: 'rotate(180deg)',
            }}
          >
            {title.slice(0, 32)}
          </div>
          <div className="w-2 h-2 rounded-full bg-gold-400 my-1 shadow-glow-gold" />
        </div>

        {/* RIGHT PAGES (TEXTURED PAGE STACK) */}
        <div className="book-face book-pages-right" />

        {/* TOP PAGES */}
        <div className="book-face book-pages-top" />

        {/* BOTTOM PAGES */}
        <div className="book-face book-pages-bottom" />
      </div>
    </div>
  );
};
