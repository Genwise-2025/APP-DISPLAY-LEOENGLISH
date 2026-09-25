import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

interface CountdownTimerProps {
  initialHours?: number; // default 48 hours countdown
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialHours = 48 }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    // Target 48 hours from now or stored target time
    const targetKey = 'LEO_PROMO_TARGET_TIME_V1';
    let targetTime = localStorage.getItem(targetKey);
    
    if (!targetTime) {
      const now = new Date();
      now.setHours(now.getHours() + initialHours);
      targetTime = now.getTime().toString();
      localStorage.setItem(targetKey, targetTime);
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = parseInt(targetTime as string, 10) - now;

      if (distance <= 0) {
        // Reset 24h cycle
        const resetTarget = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem(targetKey, resetTarget.toString());
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [initialHours]);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-2 sm:gap-3 my-2">
      <div className="flex items-center gap-1.5 text-xs font-bold text-darkbrown uppercase tracking-wider mr-1">
        <Timer className="w-4 h-4 text-warm-600 animate-spin" style={{ animationDuration: '6s' }} />
        <span className="hidden sm:inline">Ưu đãi hết hạn sau:</span>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 font-mono">
        {/* Days */}
        <div className="flex flex-col items-center">
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-gradient-to-b from-darkbrown to-darkbrown-deep text-gold-400 font-extrabold text-base sm:text-lg flex items-center justify-center shadow border border-gold-500/30">
            {pad(timeLeft.days)}
          </div>
          <span className="text-[10px] text-darkbrown font-semibold mt-1">Ngày</span>
        </div>

        <span className="text-xl font-bold text-warm-600 -mt-4">:</span>

        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-gradient-to-b from-darkbrown to-darkbrown-deep text-gold-400 font-extrabold text-base sm:text-lg flex items-center justify-center shadow border border-gold-500/30">
            {pad(timeLeft.hours)}
          </div>
          <span className="text-[10px] text-darkbrown font-semibold mt-1">Giờ</span>
        </div>

        <span className="text-xl font-bold text-warm-600 -mt-4">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-gradient-to-b from-darkbrown to-darkbrown-deep text-gold-400 font-extrabold text-base sm:text-lg flex items-center justify-center shadow border border-gold-500/30">
            {pad(timeLeft.minutes)}
          </div>
          <span className="text-[10px] text-darkbrown font-semibold mt-1">Phút</span>
        </div>

        <span className="text-xl font-bold text-warm-600 -mt-4">:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-gradient-to-b from-gold-500 to-warm-500 text-darkbrown font-extrabold text-base sm:text-lg flex items-center justify-center shadow border border-amber-200">
            {pad(timeLeft.seconds)}
          </div>
          <span className="text-[10px] text-darkbrown font-bold mt-1">Giây</span>
        </div>
      </div>
    </div>
  );
};
