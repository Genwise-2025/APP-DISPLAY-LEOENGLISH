import React, { useState } from 'react';
import { Volume2, VolumeX, Smartphone, Laptop, CheckCircle2, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface AppDeviceMockupProps {
  title: string;
  subtitle?: string;
  coverImage?: string;
  appType?: 'pro' | 'mandaleo' | 'leo10' | '1000reflex' | 'combo' | 'course' | 'general';
  language?: 'English' | 'Chinese' | 'Both';
  device?: 'phone' | 'laptop';
  zaloUrl?: string;
  onPreviewClick?: () => void;
  interactiveAudio?: boolean;
}

export const AppDeviceMockup: React.FC<AppDeviceMockupProps> = ({
  title,
  subtitle,
  coverImage,
  appType = 'general',
  language = 'English',
  device = 'phone',
  zaloUrl,
  onPreviewClick,
  interactiveAudio = true,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Sample phrases for speech synthesis based on app type
  const getAudioConfig = () => {
    switch (appType) {
      case 'mandaleo':
        return {
          text: '你好！欢迎使用 MandaLeo 学习中文。今天我们一起练习口语。',
          lang: 'zh-CN',
          label: 'Nghe phát âm tiếng Trung',
        };
      case 'leo10':
        return {
          text: 'Welcome to Leo 10 Reflex Training! Level 1: Everyday conversation. Think fast and speak clearly!',
          lang: 'en-US',
          label: 'Nghe phản xạ Level 1',
        };
      case '1000reflex':
        return {
          text: 'Excuse me, could you please tell me where the nearest station is? I am on my way to work.',
          lang: 'en-US',
          label: 'Nghe mẫu câu phản xạ 3s',
        };
      case 'pro':
      default:
        return {
          text: 'Welcome to Leo English Pro! Unlock all 5 levels and master natural English communication today.',
          lang: 'en-US',
          label: 'Nghe phát âm giọng Mỹ bản ngữ',
        };
    }
  };

  const audioConfig = getAudioConfig();

  const handlePlayVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(audioConfig.text);
    utterance.lang = audioConfig.lang;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const defaultImage = coverImage || '/images/zalo/leo-pro-1.jpg';

  if (device === 'phone') {
    return (
      <div className="relative flex flex-col items-center justify-center p-2 sm:p-4 group select-none">
        {/* Glow Halo */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/20 via-warm-500/20 to-honey-light/30 blur-2xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />

        {/* Floating AI Badges */}
        <div className="absolute -top-2 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl border border-gold-300 shadow-md text-[10px] sm:text-xs font-black text-darkbrown flex items-center gap-1.5 animate-float z-30">
          <Sparkles className="w-3.5 h-3.5 text-warm-500 animate-spin" style={{ animationDuration: '8s' }} />
          <span>{appType === 'mandaleo' ? 'HSK 1 - 6 AI' : appType === 'leo10' ? '10 Cấp Độ' : appType === '1000reflex' ? '1000 Mẫu Câu' : 'Full 5 Level VIP'}</span>
        </div>

        {/* Audio Test Chip Button */}
        {interactiveAudio && (
          <button
            type="button"
            onClick={handlePlayVoice}
            className={`absolute top-1/2 -right-3 sm:-right-6 -translate-y-1/2 px-2.5 py-1.5 rounded-xl border shadow-lg text-[10px] sm:text-xs font-black flex items-center gap-1.5 z-30 transition-all ${
              isPlayingAudio
                ? 'bg-gradient-to-r from-warm-500 to-rose-500 text-white border-white scale-105 animate-pulse'
                : 'bg-white/95 text-darkbrown border-gold-400 hover:bg-gold-50 hover:scale-105'
            }`}
            title="Bấm để nghe âm thanh phát âm mẫu"
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Đang đọc...</span>
                <span className="flex gap-0.5 items-end h-3">
                  <span className="w-0.5 h-2 bg-white animate-bounce" />
                  <span className="w-0.5 h-3 bg-white animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <span className="w-0.5 h-1.5 bg-white animate-bounce" style={{ animationDelay: '0.3s' }} />
                </span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-warm-500" />
                <span className="hidden sm:inline">Phát âm thử</span>
                <span className="sm:hidden">Nghe thử</span>
              </>
            )}
          </button>
        )}

        {/* Modern Smartphone Frame */}
        <div
          onClick={onPreviewClick}
          className="relative w-[190px] sm:w-[220px] aspect-[9/18.5] bg-slate-900 rounded-[38px] p-2.5 shadow-2xl border-4 border-slate-800 ring-2 ring-gold-400/40 cursor-pointer transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02]"
        >
          {/* Dynamic Island / Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-between px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-ping" />
          </div>

          {/* Screen Content */}
          <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-slate-950 flex flex-col justify-between">
            {/* Top Status Bar Space */}
            <div className="h-6 w-full bg-black/40 flex items-center justify-between px-4 text-[9px] text-white/70 font-semibold pt-1 z-10">
              <span>9:41</span>
              <span className="text-[8px] bg-gold-500/30 text-gold-300 px-1 rounded">5G</span>
            </div>

            {/* App Screen Real Image */}
            <div className="relative flex-1 overflow-hidden">
              <img
                src={defaultImage}
                alt={title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/zalo/leo-pro-1.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-darkbrown/85 via-transparent to-black/20" />
            </div>

            {/* Bottom In-App Banner */}
            <div className="absolute bottom-2 left-2 right-2 p-2 rounded-xl bg-darkbrown/90 backdrop-blur-md border border-gold-400/30 text-white z-10">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h4 className="font-extrabold text-[10px] text-gold-300 leading-tight truncate">{title}</h4>
              </div>
              <p className="text-[8px] text-amber-100/80 line-clamp-1">{subtitle || 'Bản quyền học tập trọn đời'}</p>
            </div>

            {/* Home Indicator Bar */}
            <div className="h-4 w-full flex items-center justify-center bg-black/60 z-10">
              <div className="w-20 h-1 bg-white/60 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Laptop Mode
  return (
    <div className="relative flex flex-col items-center justify-center p-3 sm:p-4 group select-none">
      {/* Glow Halo */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/25 via-warm-400/20 to-transparent blur-3xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />

      {/* Floating Badges */}
      <div className="absolute -top-3 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gold-300 shadow-md text-xs font-black text-darkbrown flex items-center gap-1.5 animate-float z-20">
        <Sparkles className="w-4 h-4 text-warm-500" />
        {appType === 'mandaleo' ? 'Học Tiếng Trung HSK 1–6' : 'App Leo English AI Pro'}
      </div>

      {/* Laptop Frame */}
      <div
        onClick={onPreviewClick}
        className="relative w-full max-w-[340px] sm:max-w-[420px] transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-0.5 cursor-pointer"
      >
        {/* Laptop Display Outer Box */}
        <div className="relative aspect-[16/10] bg-darkbrown rounded-t-2xl p-2 sm:p-2.5 border-4 border-slate-800 shadow-2xl overflow-hidden flex flex-col">
          {/* Camera */}
          <div className="flex justify-center items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-slate-700" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Screen Content */}
          <div className="relative flex-1 rounded-lg bg-darkbrown overflow-hidden border border-gold-500/30">
            <img
              src={defaultImage}
              alt={title}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/zalo/mandaleo-1.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-darkbrown/85 via-transparent to-transparent opacity-75" />

            {/* Bottom Overlay */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between p-2 rounded-lg bg-darkbrown/90 backdrop-blur-md border border-gold-400/30 text-white">
              <div className="flex-1 mr-2">
                <h4 className="font-extrabold text-[11px] text-gold-300 leading-tight truncate">{title}</h4>
                <p className="text-[9px] text-cream/80 truncate">{subtitle || 'Hệ sinh thái EdTech thông minh'}</p>
              </div>

              {interactiveAudio && (
                <button
                  type="button"
                  onClick={handlePlayVoice}
                  className="px-2 py-1 rounded-md bg-gold-500 hover:bg-gold-400 text-darkbrown font-black text-[10px] flex items-center gap-1 shadow shrink-0"
                >
                  <Volume2 className="w-3 h-3" />
                  <span>{isPlayingAudio ? 'Dừng' : 'Nghe thử'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Keyboard Base */}
        <div className="relative h-3 sm:h-4 bg-slate-800 rounded-b-xl border-t-2 border-slate-700 shadow-xl flex justify-center items-center">
          <div className="w-16 h-1 rounded-full bg-slate-600" />
        </div>
      </div>
    </div>
  );
};
