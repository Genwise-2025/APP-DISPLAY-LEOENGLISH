import React, { useState } from 'react';
import { BOOK_GROUPS, ADMIN_CONFIG } from '../../data/bookLibrary';
import { 
  X, 
  ShieldCheck, 
  Key, 
  Copy, 
  Check, 
  Download, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles,
  ExternalLink,
  PhoneCall
} from 'lucide-react';

interface AdminDownloadManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdminAuthenticated: boolean;
  onLoginSuccess: (email: string) => void;
}

export const AdminDownloadManagerModal: React.FC<AdminDownloadManagerModalProps> = ({
  isOpen,
  onClose,
  isAdminAuthenticated,
  onLoginSuccess
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPass, setEnteredPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleCopyMessageTemplate = (groupCode: string, groupName: string) => {
    const template = `Chào bạn! Cảm ơn bạn đã tham gia khóa học tại LEOENGLISH.
Đây là thông tin nhận trọn bộ sách số bản quyền của bạn:
🌐 Link tải sách: https://leoenglish-display.vercel.app#book-groups-section
🔑 MÃ TẢI SÁCH RIÊNG: ${groupCode} (${groupName})
👉 Bạn chỉ cần truy cập link trên, nhập đúng mã "${groupCode}" vào ô tải sách là hệ thống sẽ tự động mở khóa và tải trọn bộ về máy cho bạn nhé!`;

    navigator.clipboard.writeText(template);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 3000);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredEmail.trim().toLowerCase() === ADMIN_CONFIG.adminEmail.toLowerCase()) {
      onLoginSuccess(enteredEmail.trim());
      setLoginError('');
    } else {
      setLoginError(`Gmail "${enteredEmail}" không khớp với Gmail Admin (${ADMIN_CONFIG.adminEmail}).`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#1E1109] to-[#120A05] text-white rounded-3xl shadow-2xl border-2 border-gold-500/60 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-amber-950 via-warm-900 to-amber-950 border-b border-gold-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gold-500/20 border border-gold-400 flex items-center justify-center text-gold-300">
              <ShieldCheck className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>BẢNG QUẢN LÝ MÃ TẢI SÁCH (ADMIN)</span>
                <span className="px-2 py-0.5 rounded-full bg-gold-500 text-darkbrown text-[10px] font-black uppercase">
                  Leo Portal
                </span>
              </h3>
              <p className="text-xs text-amber-200/80 font-medium">
                Quản lý mật khẩu tải sách &amp; sao chép nhanh gửi học viên qua Zalo
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">

          {/* Admin Email Info Card */}
          <div className="p-4 rounded-2xl bg-black/40 border border-gold-500/30 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-gold-500/20 text-gold-300 mt-0.5">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-amber-200/70 uppercase font-black tracking-wider block">
                  GMAIL QUẢN TRỊ VIÊN ĐƯỢC ỦY QUYỀN
                </span>
                <span className="text-sm sm:text-base font-black text-gold-300">
                  {ADMIN_CONFIG.adminEmail}
                </span>
                <div className="flex items-center gap-2 mt-1 text-xs text-emerald-400 font-bold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Quyền truy cập toàn phần hệ thống Ebook &amp; Phần mềm</span>
                </div>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <span className="text-[10px] text-amber-200/60 block">Hotline Zalo</span>
              <span className="text-xs font-black text-white">{ADMIN_CONFIG.adminHotline}</span>
            </div>
          </div>

          {/* 3 ACTIVE PASSWORDS / DOWNLOAD CODES */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-gold-400 mb-3 flex items-center gap-1.5">
              <Key className="w-4 h-4" />
              DANH SÁCH 3 MÃ TẢI SÁCH CHÍNH ĐANG HOẠT ĐỘNG:
            </h4>

            <div className="space-y-3.5">
              {BOOK_GROUPS.map((group, idx) => {
                const isCopied = copiedCode === group.code;

                return (
                  <div
                    key={group.id}
                    className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-gold-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-gold-300">
                          #{idx + 1}. {group.name}
                        </span>
                        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/80">
                          {group.books.length} cuốn
                        </span>
                      </div>
                      <p className="text-xs text-amber-200/70 mt-1">
                        Sách gồm: {group.books.map(b => b.title).join(', ')}
                      </p>
                    </div>

                    {/* CODE DISPLAY & COPY BUTTON */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="px-3.5 py-2 rounded-xl bg-gold-500/20 border border-gold-400/60 font-mono text-sm sm:text-base font-black text-gold-300 tracking-wider">
                        {group.code}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy(group.code)}
                        className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                          isCopied
                            ? 'bg-emerald-600 text-white shadow-lg'
                            : 'bg-white/10 hover:bg-gold-500 hover:text-darkbrown text-white'
                        }`}
                        title="Sao chép mã tải"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Đã chép!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Chép mã</span>
                          </>
                        )}
                      </button>

                      {/* Quick Download link for Admin */}
                      <a
                        href={group.allDownloadUrl}
                        download={group.sampleFileName}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-amber-200 hover:text-white transition-colors border border-white/10"
                        title="Tải nhanh file trọn bộ"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Message Template for Zalo */}
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                Mẫu tin nhắn gửi học viên qua Zalo:
              </span>

              <button
                type="button"
                onClick={() => handleCopyMessageTemplate('T390', 'Nhóm Community 390')}
                className="text-xs text-gold-400 hover:text-gold-300 font-bold flex items-center gap-1"
              >
                {copiedTemplate ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTemplate ? 'Đã sao chép mẫu tin!' : 'Sao chép tin nhắn'}</span>
              </button>
            </div>

            <p className="text-xs text-amber-100/80 leading-relaxed font-mono bg-black/40 p-3 rounded-xl border border-white/10 select-all">
              Chào bạn! Đây là thông tin tải sách LEOENGLISH của bạn:<br />
              🌐 Link: https://leoenglish-display.vercel.app#book-groups-section<br />
              🔑 MÃ TẢI SÁCH: [L1000 / T390 / L299VIP]<br />
              👉 Nhập đúng mã vào website để tải trọn bộ sách về máy nhé!
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-black/50 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-amber-200/60 font-medium">
            Hệ thống Quản lý Mật khẩu Tải Sách LEOENGLISH PRO
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
          >
            Đóng cửa sổ
          </button>
        </div>

      </div>
    </div>
  );
};
