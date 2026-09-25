import React from 'react';
import { ShieldCheck, Download, Smartphone, RefreshCw, MessageSquare, Award } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Thanh toán an toàn',
      desc: 'Bảo mật 100% qua mã QR Banking, MoMo hoặc COD nhận sách mới thanh toán.',
    },
    {
      icon: Download,
      title: 'Tải Ebook siêu tốc',
      desc: 'Nhận link tải Ebook PDF bản chuẩn HD ngay 5 giây sau khi xác nhận đơn hàng.',
    },
    {
      icon: Smartphone,
      title: 'Dùng đa thiết bị',
      desc: 'Phần mềm kích hoạt đồng thời trên Điện thoại, Máy tính bảng và Laptop.',
    },
    {
      icon: RefreshCw,
      title: 'Cập nhật nội dung mới',
      desc: 'Miễn phí cập nhật bài học, từ vựng và đề thi HSK mới hàng năm.',
    },
    {
      icon: MessageSquare,
      title: 'Hỗ trợ Zalo 24/7',
      desc: 'Đội ngũ chuyên gia trợ giảng giải đáp bài tập trực tiếp qua Zalo 0799713094.',
    },
    {
      icon: Award,
      title: 'Bảo hành đổi trả 1:1',
      desc: 'Đổi mới lập tức nếu sách in bị lỗi hoặc tài khoản app phát sinh sự cố.',
    },
  ];

  return (
    <section id="benefits-section" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-200 shadow-lg">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-darkbrown">
              Quyền Lợi & Cam Kết LEO EDUCATION
            </h2>
            <p className="text-sm text-darkbrown/80 font-medium mt-1">
              Đồng hành cùng sự tiến bộ của bạn trên mỗi bước đường học tập
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-white/70 border border-gold-200/60 shadow-sm flex items-start gap-4 hover:bg-white transition-colors"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-tr from-gold-500 to-warm-400 text-darkbrown shrink-0 shadow">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-darkbrown">{item.title}</h4>
                    <p className="text-xs text-darkbrown/75 font-medium mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
