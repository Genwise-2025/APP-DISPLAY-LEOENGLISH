import React, { useEffect, useState } from 'react';

export const FantasyBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 40 - 20,
        y: (e.clientY / window.innerHeight) * 40 - 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Cursor Light Aura */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-30 transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(245, 183, 0, 0.45) 0%, rgba(255, 138, 61, 0.2) 60%, transparent 80%)',
          transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)`,
          top: '20%',
          left: '25%',
        }}
      />

      {/* Top Right Warm Ambient Glowing Orb */}
      <div className="absolute -top-40 -right-40 w-[650px] h-[650px] bg-gradient-to-br from-gold-300/30 via-warm-400/20 to-transparent rounded-full blur-[120px] animate-pulse-glow" />

      {/* Bottom Left Soft Honey Glowing Orb */}
      <div className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-gradient-to-tr from-honey-light/40 via-gold-400/15 to-transparent rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Magical Floating Bokeh Dots */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-gold-400/60 rounded-full blur-[1px] animate-float" />
      <div className="absolute top-1/3 right-16 w-6 h-6 bg-warm-300/50 rounded-full blur-[2px] animate-float-slow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-1/3 left-1/4 w-5 h-5 bg-honey/60 rounded-full blur-[1px] animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-gold-300/70 rounded-full blur-[1px] animate-float-slow" style={{ animationDelay: '4.5s' }} />

      {/* Background Soft Mesh Texture Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#3B2418 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />
    </div>
  );
};
