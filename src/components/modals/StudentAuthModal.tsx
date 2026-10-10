import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  X, 
  Mail, 
  CheckCircle2, 
  Clock, 
  Ban, 
  Sparkles, 
  ShieldCheck, 
  User, 
  PhoneCall, 
  Download,
  LogOut,
  ExternalLink
} from 'lucide-react';

interface StudentAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingBookTitle?: string;
  onDownloadConfirmed?: () => void;
}

export const StudentAuthModal: React.FC<StudentAuthModalProps> = ({
  isOpen,
  onClose,
  pendingBookTitle,
  onDownloadConfirmed
}) => {
  const { 
    currentStudent, 
    currentStudentEmail, 
    isStudentApproved, 
    loginStudent, 
    logoutStudent, 
    isAdminAuthenticated 
  } = useCart();

  const [inputEmail, setInputEmail] = useState('');
  const [inputName, setInputName] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'warning' | 'info' | 'error' } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmail.trim()) {
      setMessage({ text: 'Vui lòng nhập địa chỉ Gmail của bạn!', type: 'warning' });
      return;
    }

    const res = loginStudent(inputEmail.trim(), inputName.trim() || undefined);
    
    if (res.status === 'approved') {
      setMessage({ 
        text: `Tuyệt vời! Gmail ${inputEmail} ĐÃ ĐƯỢC PHÊ DUYỆT! Bạn có thể tải sách ngay bây giờ.`, 
        type: 'success' 
      });
      if (onDownloadConfirmed) {
        setTimeout(() => {
          onDownloadConfirmed();
          onClose();
        }, 800);
      }
    } else if (res.status === 'blocked') {
      setMessage({ 
        text: 'Tài khoản Gmail này đang bị tạm khóa. Vui lòng liên hệ Admin qua Zalo 0799713094.', 
        type: 'error' 
      });
    } else {
      setMessage({ 
        text: `Yêu cầu của Gmail "${inputEmail}" đã được gửi tới Admin nguyentoandinh.0511@gmail.com. Vui lòng chờ phê duyệt hoặc nhắn Zalo để được duyệt ngay!`, 
        type: 'info' 
      });
    }
  };

  const handleQuickDownloadNow = () => {
    if (onDownloadConfirmed) {
      onDownloadConfirmed();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-gradient-to-b from-[#1E1109] to-[#120A05] text-white rounded-3xl shadow-2xl border-2 border-gold-500/60 overflow-hidden"
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
                <span>XÁC THỰC GMAIL TẢI SÁCH</span>
              </h3>
              <p className="text-xs text-amber-200/80 font-medium">
                Admin duyệt Gmail học viên để mở khóa tải sách bản quyền
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-cream flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pending Book Info Banner */}
        {pendingBookTitle && (
          <div className="px-6 py-3 bg-amber-500/10 border-b border-amber-500/20 flex items-center gap-2 text-xs text-amber-300">
            <Download className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="truncate">Sách đang muốn tải: <strong className="text-gold-300">{pendingBookTitle}</strong></span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Status Display if already logged in */}
          {currentStudentEmail && (
            <div className={`p-4 rounded-2xl border ${
              isStudentApproved
                ? 'bg-emerald-950/40 border-emerald-500/50'
                : currentStudent?.status === 'blocked'
                ? 'bg-rose-950/40 border-rose-500/50'
                : 'bg-amber-950/40 border-amber-500/50'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {isStudentApproved ? (
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  ) : currentStudent?.status === 'blocked' ? (
                    <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-400 flex items-center justify-center text-rose-400">
                      <Ban className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400">
                      <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
                    </div>
                  )}

                  <div>
                    <div className="text-xs text-amber-300/80 font-mono">TÀI KHOẢN HIỆN TẠI:</div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{currentStudentEmail}</span>
                      {isAdminAuthenticated && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-gold-500 text-darkbrown font-black">ADMIN</span>
                      )}
                    </div>
                    <div className="mt-1">
                      {isStudentApproved ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" /> ĐÃ ĐƯỢC ADMIN DUYỆT — ĐƯỢC TẢI MỌI SÁCH
                        </span>
                      ) : currentStudent?.status === 'blocked' ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-400">
                          <Ban className="w-3.5 h-3.5" /> TÀI KHOẢN ĐANG BỊ TẠM KHÓA
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400">
                          <Clock className="w-3.5 h-3.5" /> ĐANG CHỜ ADMIN NGUYỄN TOÀN ĐỊNH DUYỆT
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={logoutStudent}
                  className="p-1.5 text-xs text-cream/60 hover:text-rose-300 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1"
                  title="Đổi tài khoản khác"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Action for Approved Student */}
              {isStudentApproved && (
                <div className="mt-4 pt-3 border-t border-emerald-500/30 flex gap-2">
                  <button
                    type="button"
                    onClick={handleQuickDownloadNow}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02]"
                  >
                    <Download className="w-4 h-4" />
                    Tải Sách Ngay Bây Giờ
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Form to Input / Register Gmail */}
          {(!currentStudentEmail || !isStudentApproved) && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gold-400" />
                  <span>Địa chỉ Gmail của bạn:</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="ví dụ: hocvien@gmail.com"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-gold-500/40 text-white placeholder-cream/40 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30 text-sm font-medium transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gold-400" />
                  <span>Họ và tên học viên (Tùy chọn):</span>
                </label>
                <input
                  type="text"
                  placeholder="ví dụ: Nguyễn Văn An"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-gold-500/40 text-white placeholder-cream/40 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30 text-sm font-medium transition-all"
                />
              </div>

              {message && (
                <div className={`p-3.5 rounded-2xl text-xs font-medium ${
                  message.type === 'success'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : message.type === 'error'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : message.type === 'warning'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                }`}>
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-gold-500 via-warm-500 to-gold-400 text-darkbrown font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-gold-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Kiểm Tra & Đăng Ký Tải Sách
              </button>
            </form>
          )}

          {/* Admin Note and Contact Box */}
          <div className="pt-4 border-t border-gold-500/20 flex flex-col gap-2.5 text-xs text-cream/70">
            <div className="flex items-center gap-2 text-gold-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>Admin duyệt sách: <span className="text-white font-mono">nguyentoandinh.0511@gmail.com</span></span>
            </div>
            <p className="leading-relaxed text-[11px] text-cream/60">
              * Sau khi gửi Gmail, bạn hãy nhắn tin Zalo cho Admin kèm địa chỉ Gmail để được duyệt quyền tải sách ngay trong 1 phút!
            </p>
            <div className="flex items-center gap-2 mt-1">
              <a
                href="https://zalo.me/0799713094"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-400/30 text-xs font-bold transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Nhắn Zalo Admin Duyệt Ngay (0799.713.094)
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
