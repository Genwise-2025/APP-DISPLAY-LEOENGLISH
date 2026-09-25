import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Tôi nhận ebook bằng cách nào?',
      a: 'Ngay sau khi hoàn tất thanh toán thành công, hệ thống tự động gửi đường link tải Ebook định dạng PDF cao cấp tương tác trực tiếp qua Email và Tin nhắn Zalo của bạn. Bạn chỉ cần nhấn vào link để tải về máy dùng vĩnh viễn.',
    },
    {
      q: 'Phần mềm sử dụng được trong bao lâu?',
      a: 'Tất cả các sản phẩm phần mềm (như MandaLeo HSK và LEO AI) khi mua tại LEO EDUCATION đều được cấp quyền sử dụng bản quyền VIP trọn đời (Lifetime Access). Bạn không phải đóng thêm bất kỳ chi phí duy trì hàng tháng hay hàng năm nào.',
    },
    {
      q: 'Có thể học trên điện thoại không?',
      a: 'Có! Hệ sinh thái của LEO được tối ưu hoàn hảo cho các thiết bị di động (iPhone, iPad, Android) lẫn Máy tính (Windows/Mac). Ebook và App đều đồng bộ tiến độ học tức thì.',
    },
    {
      q: 'Một tài khoản dùng được bao nhiêu thiết bị?',
      a: 'Mỗi mã kích hoạt tài khoản VIP của LEO cho phép bạn đăng nhập và học tập song song trên 03 thiết bị (Ví dụ: 1 Điện thoại + 1 iPad + 1 Laptop).',
    },
    {
      q: 'Tôi có được cập nhật bài học mới không?',
      a: 'Hoàn toàn có! LEO EDUCATION liên tục nâng cấp bài giảng video, cập nhật từ vựng thực tế và bộ đề thi HSK mới nhất hàng năm. Học viên đã mua gói trọn đời sẽ được nâng cấp miễn phí 100%.',
    },
    {
      q: 'Có hỗ trợ hướng dẫn sử dụng không?',
      a: 'Có! Chúng tôi có đội ngũ trợ giảng chuyên môn cao túc trực hỗ trợ bạn cài đặt, kích hoạt tài khoản và giải đáp bài tập 24/7 thông qua Zalo chính thức: 0799713094.',
    },
    {
      q: 'Có chính sách hoàn tiền không?',
      a: 'LEO EDUCATION cam kết đổi mới 1:1 lập tức nếu sản phẩm sách in bị hư hỏng do vận chuyển. Đối với các gói combo và phần mềm, nếu học viên áp dụng đúng lộ trình trong 7 ngày đầu không hiệu quả, chúng tôi hỗ trợ tư vấn lại phương pháp hoặc hoàn tiền theo quy định.',
    },
  ];

  return (
    <section id="faq-section" className="py-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/20 text-darkbrown font-extrabold text-xs mb-3 border border-gold-400">
            <HelpCircle className="w-3.5 h-3.5 text-warm-500" />
            GIẢI ĐÁP THẮC MẮC
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-darkbrown">
            Câu Hỏi Thường Gặp (FAQ)
          </h2>
          <p className="text-sm text-darkbrown/80 font-medium mt-1">
            Mọi thắc mắc của bạn về sản phẩm và phương thức giao nhận
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="glass-card rounded-2xl border border-amber-200/80 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-extrabold text-sm sm:text-base text-darkbrown flex items-center justify-between gap-4 hover:text-warm-600 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gold-500/20 text-darkbrown font-mono text-xs flex items-center justify-center shrink-0">
                      ?
                    </span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-warm-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-darkbrown/80 font-medium leading-relaxed border-t border-amber-200/40">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Help Contact Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-warm-100 to-gold-100 border border-gold-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-extrabold text-sm text-darkbrown">Vẫn còn thắc mắc cần tư vấn?</h4>
            <p className="text-xs text-darkbrown/75 font-medium mt-0.5">
              Đội ngũ chuyên gia LEO luôn sẵn sàng đồng hành cùng bạn 24/7.
            </p>
          </div>

          <a
            href="https://zalo.me/0799713094"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-warm-500 text-darkbrown font-black text-xs shadow-md hover:scale-105 transition-transform flex items-center gap-1.5 shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            Chat Zalo: 0799713094
          </a>
        </div>

      </div>
    </section>
  );
};
