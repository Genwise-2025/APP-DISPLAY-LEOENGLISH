import { BookItem } from '../types/book';

export const ADMIN_CONFIG = {
  adminEmail: 'nguyentoandinh.0511@gmail.com',
  defaultCodes: {
    group1: 'L1000',
    group2: 'T390',
    group3: 'L299VIP',
  },
  adminHotline: '0799713094',
  zaloUrl: 'https://zalo.me/0799713094',
};

export interface CategoryFilterItem {
  id: string;
  number: number;
  label: string;
  shortLabel: string;
  description: string;
  color: string;
}

export const VIP_CATEGORIES: CategoryFilterItem[] = [
  { id: 'all', number: 0, label: 'Tất Cả Thể Loại (Trọn Bộ 11 Phần)', shortLabel: 'Tất Cả', description: 'Toàn bộ kho sách bản quyền VIP độc quyền Leo English', color: '#F5B700' },
  { id: 'communication', number: 1, label: '1. ANH VĂN GIAO TIẾP', shortLabel: 'Giao Tiếp', description: 'Giáo trình thực tế từ mất gốc đến giao tiếp tự nhiên', color: '#10B981' },
  { id: 'business', number: 2, label: '2. ANH VĂN THƯƠNG MẠI', shortLabel: 'Thương Mại', description: 'Trọn bộ 4 cấp độ Elementary đến Upper-Intermediate công sở', color: '#3B82F6' },
  { id: 'reflex', number: 3, label: '3. SÁCH LUYỆN CÂU PHẢN XẠ', shortLabel: 'Phản Xạ Swivox', description: '1000 câu phản xạ thần tốc A1 - B2 phương pháp Swivox 3 giây', color: '#F59E0B' },
  { id: 'travel', number: 4, label: '4. DU LỊCH (TRAVEL ENGLISH)', shortLabel: 'Du Lịch', description: 'Tiếng Anh sân bay, khách sạn, nhà hàng và khám phá thế giới', color: '#06B6D4' },
  { id: 'feeling-hill', number: 5, label: '5. FEELING HILL', shortLabel: 'Feeling Hill', description: 'Đồi cảm xúc - Tác phẩm nghệ thuật song ngữ đặc biệt Mr. Leo', color: '#EC4899' },
  { id: 'ielts', number: 6, label: '6. IELTS MOCKING TEST', shortLabel: 'IELTS', description: 'Bộ đề thi thử và bí quyết chinh phục IELTS điểm cao', color: '#8B5CF6' },
  { id: 'pro-vocab', number: 7, label: '7. PROFESSIONAL VOCABULARY', shortLabel: 'Từ Vựng', description: 'Xây dựng vốn từ vựng chuyên nghiệp và cấu trúc câu chuẩn', color: '#6366F1' },
  { id: 'hotel-realestate', number: 8, label: '8. QUẢN LÝ KHÁCH SẠN VÀ BĐS', shortLabel: 'Khách Sạn & BĐS', description: 'Tiếng Anh quản trị dự án, khách sạn & thị trường bất động sản', color: '#14B8A6' },
  { id: 'livestream', number: 9, label: '9. SÁCH HỌC TRÊN LIVESTREAM', shortLabel: 'Livestream', description: 'Giáo trình đồng hành cùng các buổi livestream dạy học thực chiến', color: '#F97316' },
  { id: 'story', number: 10, label: '10. TRUYỆN KÈM SÁCH KHÁC', shortLabel: 'Truyện Đọc', description: 'Harry Potter, Doraemon, Nhà Giả Kim, Đắc Nhân Tâm, Hoàng Tử Bé...', color: '#84CC16' },
  { id: 'writing', number: 11, label: '11. WRITING (KỸ NĂNG VIẾT)', shortLabel: 'Writing', description: 'Hành trình chinh phục ngôn từ, 24 chủ đề viết thực chiến', color: '#A855F7' },
];

export const ALL_VIP_BOOKS: BookItem[] = [
  // ==========================================
  // THỂ LOẠI 1: ANH VĂN GIAO TIẾP
  // ==========================================
  {
    id: 'book-tieng-anh-giao-tiep-mat-goc',
    title: 'TIẾNG ANH CHO NGƯỜI MẤT GỐC - STARTER FULL',
    vietnameseTitle: 'Tiếng Anh Cho Người Mất Gốc — Bản Đầy Đủ 12 Unit Thực Chiến',
    subtitle: 'Vận dụng 500 câu và 1000 từ vựng cốt lõi phản xạ tự nhiên sau 30 ngày',
    coverImage: '/images/books/SÁCH GIAO TIẾP STARTER.jpg',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'communication',
    categoryNumber: 1,
    categoryLabel: '1. Anh Văn Giao Tiếp',
    pages: 216,
    fileSize: '8.79 MB',
    level: 'Starter - Mất Gốc',
    description: 'Giáo trình cốt lõi dành cho người học lại tiếng Anh từ con số 0. Tích hợp lộ trình phát âm, mẫu câu đàm thoại đời sống hằng ngày và kỹ năng phản xạ tư duy trực tiếp bằng tiếng Anh.',
    highlights: [
      'Lấy lại nền tảng phát âm chuẩn IPA trong 1 tuần',
      '500 mẫu câu phản xạ thông dụng nhất không cần dịch',
      'Hơn 1000 từ vựng chọn lọc kèm hình ảnh minh họa',
      'Định dạng PDF chuẩn in màu chất lượng cao'
    ],
    pdfDownloadUrl: '/downloads/vip/TIENG ANH CHO NGUOI MAT GOC- STARTER full.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_1_STARTER.pdf',
    badge: 'KHUYÊN DÙNG #1',
    rating: 5.0,
    reviewsCount: 420,
    spineColor: '#10B981'
  },
  {
    id: 'book-fluent-traveller-gt',
    title: 'Fluent Traveller - English for Real Journeys EBOOK',
    vietnameseTitle: 'Người Du Lịch Lưu Loát — Tiếng Anh Cho Những Chuyến Đi Thực Tế',
    subtitle: 'Kỹ năng đối thoại tự tin tại sân bay, ga tàu, khách sạn và giao lưu quốc tế',
    coverImage: '/images/books/SÁCH DU LỊCH.jpg',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'communication',
    categoryNumber: 1,
    categoryLabel: '1. Anh Văn Giao Tiếp',
    pages: 180,
    fileSize: '8.87 MB',
    level: 'A2 - B1 Giao Tiếp',
    description: 'Bộ cẩm nang đàm thoại du lịch và giao tiếp thực tế đời thực được biên soạn kỹ lưỡng, giúp bạn tự tin bước ra thế giới mà không sợ rào cản ngôn ngữ.',
    highlights: [
      'Các tình huống sân bay, hải quan, thủ tục khách sạn',
      'Xử lý tình huống khẩn cấp, mua sắm, hỏi đường',
      'Đối thoại tự nhiên chuẩn ngữ điệu bản xứ',
      'Tải về đọc tiện lợi trên điện thoại và máy tính bảng'
    ],
    pdfDownloadUrl: '/downloads/vip/Fluent Traveller- English for Real Journeys EBOOK.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_2_BEGINNER.pdf',
    badge: 'BÁN CHẠY',
    rating: 4.9,
    reviewsCount: 310,
    spineColor: '#059669'
  },
  {
    id: 'book-200-practical-conversation',
    title: '200 Practical Vietnamese - English Conversation Sentences',
    vietnameseTitle: '200 Câu Đàm Thoại Thực Tế: Khách Sạn, Quán Cà Phê, Siêu Thị & Bãi Xe',
    subtitle: 'Tổng hợp đàm thoại thực tế tại các điểm dịch vụ quen thuộc đời sống',
    coverImage: '/images/books/200 Practical Vietnamese - English Conversation Sentences for Hotels, Coffee Shops, Supermarkets, Parking Lots, and Markets.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'communication',
    categoryNumber: 1,
    categoryLabel: '1. Anh Văn Giao Tiếp',
    pages: 120,
    fileSize: '3.61 MB',
    level: 'A1 - A2 Đời Sống',
    description: 'Cực kỳ tiện dụng khi làm việc tại các chuỗi cửa hàng, quán cà phê hoặc khi đi ăn uống, mua sắm hằng ngày cùng người nước ngoài.',
    highlights: [
      '200 câu song ngữ đắt giá nhất trong thực tế',
      'Cách gọi món, thanh toán hóa đơn, hỏi giá',
      'Đàm thoại nhận phòng khách sạn và gửi xe an toàn'
    ],
    pdfDownloadUrl: '/downloads/vip/Fluent Traveller- English for Real Journeys EBOOK.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_1_STARTER.pdf',
    badge: 'TIỆN DỤNG',
    rating: 4.8,
    reviewsCount: 195,
    spineColor: '#10B981'
  },

  // ==========================================
  // THỂ LOẠI 2: ANH VĂN THƯƠNG MẠI
  // ==========================================
  {
    id: 'book-elementary-business',
    title: 'ELEMENTARY BUSINESS ENGLISH EBOOK',
    vietnameseTitle: 'Tiếng Anh Thương Mại Cơ Bản — Khởi Đầu Công Sở Tự Tin',
    subtitle: 'Nền tảng giao tiếp văn phòng, viết email và làm việc cùng sếp & đồng nghiệp',
    coverImage: '/images/books/BUSINESS 1.jpg',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'business',
    categoryNumber: 2,
    categoryLabel: '2. Anh Văn Thương Mại',
    pages: 195,
    fileSize: '11.68 MB',
    level: 'Elementary (A2 Business)',
    description: 'Giáo trình khởi đầu dành cho nhân viên văn phòng, sinh viên chuẩn bị đi làm. Hướng dẫn cách chào hỏi đối tác, viết email lịch sự, nghe điện thoại và họp nội bộ.',
    highlights: [
      'Từ vựng kinh doanh cơ bản dễ ứng dụng',
      'Mẫu email giao dịch và phản hồi thông dụng',
      'Đàm thoại đón khách và giới thiệu công ty'
    ],
    pdfDownloadUrl: '/downloads/vip/ELEMENTARY BUSINESS ENGLISH EBOOK.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_3_ELEMENTARY.pdf',
    badge: 'HOT DOANH NGHIỆP',
    rating: 4.9,
    reviewsCount: 265,
    spineColor: '#1D4ED8'
  },
  {
    id: 'book-pre-inter-business',
    title: 'PRE INTER BUSINESS ENGLISH EBOOK',
    vietnameseTitle: 'Tiếng Anh Thương Mại Sơ Trung Cấp — Thuyết Trình & Họp Hành',
    subtitle: 'Kỹ năng báo cáo tiến độ, xử lý phàn nàn và thuyết trình ngắn gọn mạch lạc',
    coverImage: '/images/books/BUSINESS 2.jpg',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'business',
    categoryNumber: 2,
    categoryLabel: '2. Anh Văn Thương Mại',
    pages: 210,
    fileSize: '11.04 MB',
    level: 'Pre-Intermediate (B1 Business)',
    description: 'Nâng cao khả năng đàm phán, trình bày ý tưởng trong các buổi họp nhóm và viết báo cáo chuyên nghiệp theo chuẩn quốc tế.',
    highlights: [
      'Mẫu câu dẫn dắt cuộc họp chuyên nghiệp',
      'Kỹ năng từ chối khéo léo và giải quyết sự cố khách hàng',
      'Cấu trúc thuyết trình báo cáo số liệu'
    ],
    pdfDownloadUrl: '/downloads/vip/PRE INTER BUSINESS ENGLISH EBOOK.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_4_PRE_INTER.pdf',
    badge: 'NÂNG CAO B1',
    rating: 4.9,
    reviewsCount: 218,
    spineColor: '#2563EB'
  },
  {
    id: 'book-inter-business',
    title: 'INTER BUSINESS ENGLISH EBOOK',
    vietnameseTitle: 'Tiếng Anh Thương Mại Trung Cấp — Đàm Phán Hợp Đồng & Ký Kết',
    subtitle: 'Nâng cao năng lực thương thuyết, trao đổi thương mại và ký kết hợp đồng',
    coverImage: '/images/books/BUSINESS 3.jpg',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'business',
    categoryNumber: 2,
    categoryLabel: '2. Anh Văn Thương Mại',
    pages: 225,
    fileSize: '8.75 MB',
    level: 'Intermediate (B2 Business)',
    description: 'Tài liệu dành cho quản lý, trưởng phòng và chuyên viên đối ngoại. Rèn luyện phản xạ ngôn ngữ ngoại giao, thương lượng điều khoản và lập chiến lược kinh doanh.',
    highlights: [
      'Thuật ngữ hợp đồng thương mại quốc tế',
      'Nghệ thuật đàm phán giá và phương thức thanh toán',
      'Xây dựng mối quan hệ đối tác bền vững'
    ],
    pdfDownloadUrl: '/downloads/vip/INTER BUSINESS ENGLISH EBOOK.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_5_INTERMEDIATE.pdf',
    badge: 'VIP DOANH NGHIỆP',
    rating: 5.0,
    reviewsCount: 180,
    spineColor: '#1E40AF'
  },
  {
    id: 'book-upper-inter-business',
    title: 'UPPER INTERMEDIATE BUSINESS ENGLISH EBOOK',
    vietnameseTitle: 'Tiếng Anh Thương Mại Cao Cấp — Lãnh Đạo & Quản Trị Chiến Lược',
    subtitle: 'Chuẩn ngôn phong C1 chuyên nghiệp dành cho cấp quản lý cấp cao',
    coverImage: '/images/books/BUSINESS 4.jpg',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'business',
    categoryNumber: 2,
    categoryLabel: '2. Anh Văn Thương Mại',
    pages: 240,
    fileSize: '9.66 MB',
    level: 'Upper-Intermediate (B2 - C1 Business)',
    description: 'Chinh phục đỉnh cao tiếng Anh công sở. Diễn đạt những vấn đề phức tạp một cách súc tích, đĩnh đạc và mang tầm vóc nhà lãnh đạo toàn cầu.',
    highlights: [
      'Ngôn ngữ quản trị nhân sự và điều hành',
      'Phân tích rủi ro tài chính và thị trường',
      'Đại diện doanh nghiệp tại hội nghị quốc tế'
    ],
    pdfDownloadUrl: '/downloads/vip/UPPER INTERMEDIATE BUSINESS ENGLISH EBOOK.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_5_INTERMEDIATE.pdf',
    badge: 'VIP C1',
    rating: 5.0,
    reviewsCount: 154,
    spineColor: '#1E3A8A'
  },

  // ==========================================
  // THỂ LOẠI 3: SÁCH LUYỆN CÂU PHẢN XẠ
  // ==========================================
  {
    id: 'book-1000-phan-xa-a1-a2',
    title: '1000 Câu Phản Xạ Thực Chiến A1 A2',
    vietnameseTitle: '1000 Câu Phản Xạ Thực Chiến A1 - A2 (Bản Chuẩn Kèm Đáp Án)',
    subtitle: 'Độc quyền phương pháp Swivox 3 giây — Phản xạ tức thì không cần dịch trong đầu',
    coverImage: '/images/books/1000 CÂU THỰC CHIẾN A1.jpg',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'reflex',
    categoryNumber: 3,
    categoryLabel: '3. Sách Luyện Câu Phản Xạ',
    pages: 185,
    fileSize: '4.64 MB',
    level: 'A1 - A2 Thực Chiến',
    description: 'Giáo trình luyện 1000 câu phản xạ thực chiến thông dụng nhất. Ứng dụng quy trình Swivox độc quyền giúp bạn bật câu trả lời chỉ sau 3 giây mà không cần ghép chữ.',
    highlights: [
      '1000 câu đàm thoại đời sống then chốt',
      'Phiên âm IPA chuẩn quốc tế + lời giải thích nghĩa',
      'Kèm bài tập luyện phản xạ có đáp án tra cứu',
      'Thích hợp cho tự học tại nhà mọi lứa tuổi'
    ],
    pdfDownloadUrl: '/downloads/vip/1000 Câu Phản Xạ Thực Chiến A1 A2.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_1000_CAU_PHAN_XA.pdf',
    badge: 'SIÊU BÁN CHẠY #1',
    rating: 5.0,
    reviewsCount: 520,
    spineColor: '#D97706'
  },
  {
    id: 'book-1000-cau-b1-b2',
    title: '1000 CÂU THỰC CHIẾN B1 B2',
    vietnameseTitle: '1000 Câu Giao Tiếp Thực Chiến Trung Cao Cấp B1 - B2',
    subtitle: 'Nâng tầm cách diễn đạt sang trọng, học thuật, tự nhiên như người bản xứ',
    coverImage: '/images/books/1000 CÂU THỰC CHIẾN B1.jpg',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'reflex',
    categoryNumber: 3,
    categoryLabel: '3. Sách Luyện Câu Phản Xạ',
    pages: 205,
    fileSize: '5.17 MB',
    level: 'B1 - B2 Nâng Cao',
    description: 'Bộ sưu tập 1000 câu phản xạ trung cao cấp. Giúp người học vượt qua mức giao tiếp cơ bản để thảo luận sâu, phản biện và bày tỏ cảm xúc một cách tinh tế.',
    highlights: [
      'Các cụm từ thành ngữ và cách nói hoa mỹ',
      'Mẫu câu phản biện và lập luận logic',
      'Đầy đủ đáp án và ngữ cảnh vận dụng thực tế'
    ],
    pdfDownloadUrl: '/downloads/vip/1000 CÂU THỰC CHIẾN B1 B2.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_1000_CAU_PHAN_XA.pdf',
    badge: 'B1 - B2 NÂNG CAO',
    rating: 4.9,
    reviewsCount: 340,
    spineColor: '#B45309'
  },

  // ==========================================
  // THỂ LOẠI 4: DU LỊCH (TRAVEL ENGLISH)
  // ==========================================
  {
    id: 'book-du-lich-full',
    title: 'Fluent Traveller - English for Real Journeys (Bản Du Lịch)',
    vietnameseTitle: 'Cẩm Nang Tiếng Anh Du Lịch Toàn Cầu — Tự Tin Bước Ra Thế Giới',
    subtitle: 'Trọn bộ đối thoại sinh tồn khi du lịch: Bay, Lưu trú, Ăn uống, Giải trí',
    coverImage: '/images/books/SÁCH DU LỊCH B1.jpg',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'travel',
    categoryNumber: 4,
    categoryLabel: '4. Tiếng Anh Du Lịch',
    pages: 190,
    fileSize: '8.86 MB',
    level: 'A2 - B1 Du Lịch',
    description: 'Cuốn sách gối đầu giường cho mọi tín đồ du lịch. Cung cấp hàng trăm tình huống giả định thực tế từ quầy check-in, mua sắm miễn thuế đến giải quyết thất lạc hành lý.',
    highlights: [
      'Bản in màu sắc nét, phân chia theo từng chặng hành trình',
      'Từ vựng món ăn, chỉ đường, mặc cả văn minh',
      'Có thể mở đọc trực tiếp ngay cả khi offline trên máy bay'
    ],
    pdfDownloadUrl: '/downloads/vip/Fluent Traveller- English for Real Journeys EBOOK.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_2_BEGINNER.pdf',
    badge: 'DU LỊCH HOT',
    rating: 4.9,
    reviewsCount: 290,
    spineColor: '#0891B2'
  },

  // ==========================================
  // THỂ LOẠI 5: FEELING HILL
  // ==========================================
  {
    id: 'book-feeling-hill',
    title: 'FEELING HILL - ĐỒI CẢM XÚC - MR. LEO',
    vietnameseTitle: 'Feeling Hill — Đồi Cảm Xúc (Tác Phẩm Song Ngữ Nghệ Thuật Mr. Leo)',
    subtitle: 'Chữa lành tâm hồn bằng những câu chuyện song ngữ ấm áp và triết lý sống',
    coverImage: '/images/books/FEELING HILL.jpg',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'feeling-hill',
    categoryNumber: 5,
    categoryLabel: '5. Feeling Hill',
    pages: 175,
    fileSize: '20.08 MB',
    level: 'Mọi trình độ (Song Ngữ)',
    description: 'Tác phẩm độc quyền đặc biệt của Mr. Leo. Kết hợp tranh vẽ cảm xúc và các đoạn tản văn song ngữ sâu lắng, giúp bạn vừa học tiếng Anh vừa tìm lại sự bình yên trong tâm hồn.',
    highlights: [
      '300+ bức tranh và trang minh họa màu tuyệt đẹp',
      'Văn phong nhẹ nhàng, giàu chất thơ và triết lý',
      'Bản quyền nguyên bản từ tác giả Mr. Leo'
    ],
    pdfDownloadUrl: '/downloads/vip/FEELING HILL-ĐỒI CẢM XÚC-MR.LEO.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_1_STARTER.pdf',
    badge: 'ĐỘC QUYỀN VIP',
    rating: 5.0,
    reviewsCount: 480,
    spineColor: '#DB2777'
  },

  // ==========================================
  // THỂ LOẠI 6: IELTS
  // ==========================================
  {
    id: 'book-ielts-mocking-test',
    title: 'IETLS MOCKING TEST - MR. LEO',
    vietnameseTitle: 'Bộ Đề Thi Thử IELTS Chuẩn Format Quốc Tế — Mr. Leo',
    subtitle: 'Bộ đề dự đoán và phân tích chiến thuật làm bài Listening & Reading & Speaking',
    coverImage: '/images/books/ielts-mocking-test.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'ielts',
    categoryNumber: 6,
    categoryLabel: '6. Luyện Thi IELTS',
    pages: 160,
    fileSize: '3.92 MB',
    level: 'IELTS 5.0 - 7.5+',
    description: 'Biên soạn theo format đề thi thật mới nhất từ IDP & British Council. Kèm theo đáp án giải thích chi tiết, bẫy thường gặp và từ vựng band 7.0+ giúp bứt phá điểm số.',
    highlights: [
      'Đề thi sát cấu trúc thực tế nhất',
      'Giải thích chi tiết vì sao đúng / sai',
      'Mẹo tránh bẫy ngữ pháp và từ đồng nghĩa'
    ],
    pdfDownloadUrl: '/downloads/vip/IETLS MOCKING TEST-MR. LEO.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_4_PRE_INTER.pdf',
    badge: 'IELTS 7.5+',
    rating: 4.9,
    reviewsCount: 310,
    spineColor: '#7C3AED'
  },

  // ==========================================
  // THỂ LOẠI 7: PROFESSIONAL VOCABULARY
  // ==========================================
  {
    id: 'book-pro-vocab-sentence',
    title: 'PROFESSIONAL ENGLISH VOCABULARY AND SENTENCE BUILDING',
    vietnameseTitle: 'Từ Vựng Tiếng Anh Chuyên Nghiệp & Kỹ Thuật Xây Dựng Câu Chuẩn',
    subtitle: 'Nâng tầm cách đặt câu từ cơ bản đến phức hợp không sai ngữ pháp',
    coverImage: '/images/books/professional-english-vocabulary.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'pro-vocab',
    categoryNumber: 7,
    categoryLabel: '7. Từ Vựng Chuyên Ngành',
    pages: 188,
    fileSize: '5.98 MB',
    level: 'B1 - C1 Chuyên Nghiệp',
    description: 'Chìa khóa giúp bạn xóa bỏ lỗi diễn đạt lủng củng. Hướng dẫn cách dùng từ vựng chuyên nghiệp theo chủ đề và nguyên tắc phối ghép câu linh hoạt như dân bản xứ.',
    highlights: [
      'Hơn 800 từ vựng học thuật & thương mại chọn lọc',
      'Công thức ghép câu 5 bước chuẩn xác',
      'Hạn chế lỗi dịch từ tiếng Việt sang tiếng Anh'
    ],
    pdfDownloadUrl: '/downloads/vip/PROFESSIONAL ENGLISH VOCABULARY AND SENTENCE BUILDING.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_3_ELEMENTARY.pdf',
    badge: 'CHUYÊN NGHIỆP',
    rating: 4.9,
    reviewsCount: 225,
    spineColor: '#4F46E5'
  },

  // ==========================================
  // THỂ LOẠI 8: QUẢN LÝ KHÁCH SẠN VÀ BẤT ĐỘNG SẢN
  // ==========================================
  {
    id: 'book-project-hotel-management',
    title: 'Project Management and Hotel Management English',
    vietnameseTitle: 'Tiếng Anh Quản Trị Dự Án & Quản Lý Khách Sạn - Bất Động Sản',
    subtitle: 'Bộ thuật ngữ và mẫu đối thoại đắt giá trong ngành dịch vụ lưu trú & dự án',
    coverImage: '/images/books/hotel-bds-cover.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'hotel-realestate',
    categoryNumber: 8,
    categoryLabel: '8. Quản Lý Khách Sạn & BĐS',
    pages: 165,
    fileSize: '5.53 MB',
    level: 'B1 - B2 Chuyên Ngành',
    description: 'Bộ tài liệu chuyên sâu dành cho các nhà quản lý dự án, chủ khách sạn, nhân viên kinh doanh bất động sản. Cung cấp trọn bộ mẫu câu tư vấn khách VIP, ký kết hợp đồng thuê mua.',
    highlights: [
      'Thuật ngữ quản trị dự án & vận hành khách sạn 5 sao',
      'Đàm thoại chốt hợp đồng bất động sản cùng khách quốc tế',
      'Xử lý khủng hoảng dịch vụ và chăm sóc khách hàng VIP'
    ],
    pdfDownloadUrl: '/downloads/vip/Project Management and Hotel Management.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_4_PRE_INTER.pdf',
    badge: 'CHUYÊN NGÀNH',
    rating: 4.8,
    reviewsCount: 160,
    spineColor: '#0D9488'
  },

  // ==========================================
  // THỂ LOẠI 9: SÁCH HỌC TRÊN LIVESTREAM
  // ==========================================
  {
    id: 'book-500-english-phrases',
    title: '500 English Phrases for Instant Fluency-NEW EDITION',
    vietnameseTitle: '500 Cụm Từ Tiếng Anh Giúp Bạn Nói Lưu Loát Tức Thì — Bản Mới',
    subtitle: 'Các cụm từ cố định (collocations) & thành ngữ hiện đại người Mỹ nói hàng ngày',
    coverImage: '/images/books/500 English Phrases for Instant Fluency cover.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'livestream',
    categoryNumber: 9,
    categoryLabel: '9. Sách Học Livestream',
    pages: 155,
    fileSize: '2.07 MB',
    level: 'Mọi trình độ (Thực Chiến)',
    description: 'Giáo trình thường xuyên được giảng dạy trên các buổi livestream triệu view của Mr. Leo. Giúp bạn chuyển đổi từ việc nói từng từ đơn lẻ sang nói trọn vẹn từng cụm từ mượt mà.',
    highlights: [
      '500 cụm từ cửa miệng của người bản xứ',
      'Có phiên âm, ví dụ tình huống và bài tập ứng dụng',
      'Được hướng dẫn phát âm trực tiếp qua video livestream'
    ],
    pdfDownloadUrl: '/downloads/vip/500 English Phrases for Instant Fluency-NEW EDITION.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_2_BEGINNER.pdf',
    badge: 'LIVESTREAM TOP #1',
    rating: 5.0,
    reviewsCount: 610,
    spineColor: '#EA580C'
  },
  {
    id: 'book-at-the-supermarket',
    title: 'AT THE SUPERMARKET',
    vietnameseTitle: 'Toàn Diện Đàm Thoại Mua Sắm Tại Siêu Thị & Trung Tâm Thương Mại',
    subtitle: 'Tất tần tật tên các loại hàng hóa, hỏi quầy kệ, cân ký và thanh toán',
    coverImage: '/images/books/at-the-supermarket.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'livestream',
    categoryNumber: 9,
    categoryLabel: '9. Sách Học Livestream',
    pages: 95,
    fileSize: '1.36 MB',
    level: 'A1 - A2 Đời Sống',
    description: 'Tài liệu học đàm thoại thực tế khi đi siêu thị. Hình ảnh trực quan sinh động giúp bạn nhớ ngay lập tức tên hàng trăm loại rau củ, thực phẩm, gia vị bằng tiếng Anh.',
    highlights: [
      'Hình ảnh minh họa thực tế từng gian hàng',
      'Mẫu câu hỏi nhân viên tư vấn và đổi trả hàng',
      'Từ vựng hóa đơn và các loại thẻ thanh toán'
    ],
    pdfDownloadUrl: '/downloads/vip/AT THE SUPERMARKET.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_1_STARTER.pdf',
    badge: 'LIVESTREAM',
    rating: 4.8,
    reviewsCount: 180,
    spineColor: '#F97316'
  },
  {
    id: 'book-at-the-market',
    title: 'AT THE MARKET - GIAO TIẾP TẠI CHỢ',
    vietnameseTitle: 'Giao Tiếp Tiếng Anh Thực Tế Tại Chợ Truyền Thống & Phố Ẩm Thực',
    subtitle: 'Nghệ thuật mua sắm, hỏi giá, mặc cả và chọn đồ tươi sống bằng tiếng Anh',
    coverImage: '/images/books/at-the-supermarket-1.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'livestream',
    categoryNumber: 9,
    categoryLabel: '9. Sách Học Livestream',
    pages: 90,
    fileSize: '1.90 MB',
    level: 'A1 - A2 Đời Sống',
    description: 'Chuyên đề đối thoại cực kỳ thú vị được học viên livestream yêu thích nhất. Giúp bạn tự tin dẫn bạn bè quốc tế đi dạo chợ đêm, khu phố ẩm thực đường phố.',
    highlights: [
      'Mẫu câu mặc cả hóm hỉnh, lịch sự',
      'Từ vựng món ăn đường phố Việt Nam bằng tiếng Anh',
      'Cách chỉ đường và mô tả vị trí các quầy hàng'
    ],
    pdfDownloadUrl: '/downloads/vip/at the market.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_1_STARTER.pdf',
    badge: 'LIVESTREAM',
    rating: 4.8,
    reviewsCount: 145,
    spineColor: '#C2410C'
  },

  // ==========================================
  // THỂ LOẠI 10: TRUYỆN KÈM SÁCH KHÁC
  // ==========================================
  {
    id: 'book-the-alchemist',
    title: 'The Alchemist - NHA GIA KIM (Mr Leo - Genwise Language)',
    vietnameseTitle: 'Nhà Giả Kim — Tác Phẩm Kinh Điển Thế Giới (Bản Song Ngữ Mr. Leo)',
    subtitle: 'Cuốn sách bán chạy nhất mọi thời đại giúp nuôi dưỡng ước mơ và vốn từ',
    coverImage: '/images/books/bookworm-10.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'story',
    categoryNumber: 10,
    categoryLabel: '10. Truyện & Sách Đọc',
    pages: 208,
    fileSize: '4.85 MB',
    level: 'Mọi trình độ (Song Ngữ)',
    description: 'Kiệt tác của Paulo Coelho được Mr. Leo chú thích tỉ mỉ từ vựng và ngữ pháp. Đọc truyện là phương pháp nhanh nhất để nạp ngữ pháp thẩm thấu vào tiềm thức.',
    highlights: [
      'Bản dịch song ngữ câu nối câu dễ hiểu',
      'Chú giải ngữ pháp các câu đắt giá nhất',
      'Nuôi dưỡng ý chí và động lực học tập'
    ],
    pdfDownloadUrl: '/downloads/vip/The_Alchemist-NHA GIA KIM-MR LEO-GENWISE LANGUAGE.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_2_BEGINNER.pdf',
    badge: 'KINH ĐIỂN',
    rating: 5.0,
    reviewsCount: 650,
    spineColor: '#65A30D'
  },
  {
    id: 'book-the-little-prince',
    title: 'The Little Prince - HOÀNG TỬ BÉ',
    vietnameseTitle: 'Hoàng Tử Bé — Truyện Song Ngữ Cảm Xúc Sâu Sắc',
    subtitle: 'Những bài học nhân sinh thuần khiết qua lời văn tiếng Anh tinh tế',
    coverImage: '/images/books/the-girl-with-red-hair.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'story',
    categoryNumber: 10,
    categoryLabel: '10. Truyện & Sách Đọc',
    pages: 125,
    fileSize: '3.12 MB',
    level: 'A2 - B1 Song Ngữ',
    description: 'Tác phẩm văn học lừng danh thế giới. Văn phong trong trẻo, giàu biểu cảm giúp người học tiếp thu hàng ngàn cấu trúc câu mô tả cảm xúc tinh tế.',
    highlights: [
      'Bản in màu kèm tranh minh họa nguyên tác',
      'Từ vựng giàu chất thơ, dễ ghi nhớ',
      'Phù hợp cho cả trẻ em lẫn người lớn'
    ],
    pdfDownloadUrl: '/downloads/vip/The little prince - Hoàng tử bé.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_2_BEGINNER.pdf',
    badge: 'YÊU THÍCH',
    rating: 4.9,
    reviewsCount: 390,
    spineColor: '#4D7C0F'
  },
  {
    id: 'book-dac-nhan-tam',
    title: 'Dac Nhan Tam - Dale Carnegie Ebook',
    vietnameseTitle: 'Đắc Nhân Tâm — Nghệ Thuật Thu Phục Lòng Người Bản Tiếng Anh',
    subtitle: 'Cẩm nang giao tiếp ứng xử kinh điển giúp bạn thành công trong sự nghiệp',
    coverImage: '/images/books/bookworm-10.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'story',
    categoryNumber: 10,
    categoryLabel: '10. Truyện & Sách Đọc',
    pages: 280,
    fileSize: '5.20 MB',
    level: 'B1 - B2 Thực Chiến',
    description: 'Học cách giao tiếp, thu hút thiện cảm và truyền cảm hứng cho người khác bằng tiếng Anh. Một trong những cuốn sách đáng đọc nhất cuộc đời.',
    highlights: [
      'Bộ nguyên tắc ứng xử vàng trong công việc & cuộc sống',
      'Văn phong nghị luận mẫu mực của người Mỹ',
      'Đầy đủ các chương sách gốc'
    ],
    pdfDownloadUrl: '/downloads/vip/Dac Nhan Tam - Dale Carnegie.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_3_ELEMENTARY.pdf',
    badge: 'BESTSELLER',
    rating: 5.0,
    reviewsCount: 510,
    spineColor: '#3F6212'
  },
  {
    id: 'book-chicken-soup',
    title: 'Chicken Soup for the Soul Ebook - Genwise',
    vietnameseTitle: 'Hạt Giống Tâm Hồn — Những Câu Chuyện Thắp Sáng Ước Mơ',
    subtitle: 'Tuyển tập những câu chuyện ngắn truyền cảm hứng sâu sắc bằng tiếng Anh',
    coverImage: '/images/books/the-girl-with-red-hair.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'story',
    categoryNumber: 10,
    categoryLabel: '10. Truyện & Sách Đọc',
    pages: 195,
    fileSize: '4.15 MB',
    level: 'A2 - B1 Truyền Cảm Hứng',
    description: 'Mỗi câu chuyện ngắn trong Chicken Soup for the Soul là một bài học đắt giá về tình người, lòng kiên trì và niềm tin vào cuộc sống.',
    highlights: [
      'Mỗi truyện chỉ dài 2-3 trang, đọc nhanh không nản',
      'Từ ngữ mộc mạc, gần gũi và ấm áp',
      'Giúp duy trì thói quen đọc sách tiếng Anh mỗi ngày'
    ],
    pdfDownloadUrl: '/downloads/vip/Chicken Soup for the Soul Ebook - Genwise.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_2_BEGINNER.pdf',
    badge: 'CẢM HỨNG',
    rating: 4.9,
    reviewsCount: 285,
    spineColor: '#84CC16'
  },
  {
    id: 'book-alice-in-wonderland',
    title: 'Alice in Wonderland EBOOK',
    vietnameseTitle: 'Alice Ở Xứ Sở Thần Tiên — Cuộc Phiêu Lưu Kì Thú',
    subtitle: 'Tác phẩm văn học Anh kinh điển kích thích trí tưởng tượng và vốn từ',
    coverImage: '/images/books/bookworm-10.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'story',
    categoryNumber: 10,
    categoryLabel: '10. Truyện & Sách Đọc',
    pages: 110,
    fileSize: '0.90 MB',
    level: 'A2 - B1 Cổ Điển',
    description: 'Hòa mình vào thế giới kỳ ảo của Alice để thẩm thấu cách dùng từ ví von, ẩn dụ và các câu đối thoại hóm hỉnh đặc trưng của văn học nước Anh.',
    highlights: [
      'Dung lượng gọn nhẹ, tải về siêu nhanh',
      'Đầy đủ cốt truyện ly kỳ',
      'Thích hợp giải trí trước giờ đi ngủ'
    ],
    pdfDownloadUrl: '/downloads/vip/Alice in wonderland EBOOK.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_1_STARTER.pdf',
    badge: 'TRUYỆN KINH ĐIỂN',
    rating: 4.8,
    reviewsCount: 190,
    spineColor: '#4D7C0F'
  },
  {
    id: 'book-harry-potter-collection',
    title: 'HARRY POTTER FULL COLLECTION (TẬP 1 - 8)',
    vietnameseTitle: 'Trọn Bộ Harry Potter 8 Tập — Thế Giới Phù Thủy Kì Ảo',
    subtitle: 'Toàn bộ 8 phần tiểu thuyết nguyên bản tiếng Anh của J.K. Rowling',
    coverImage: '/images/books/TỔNG SÁCH.jpg',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'story',
    categoryNumber: 10,
    categoryLabel: '10. Truyện & Sách Đọc',
    pages: 3500,
    fileSize: '35 MB (Bộ)',
    level: 'B1 - C1 Toàn Bộ',
    description: 'Trọn bộ 8 tập Harry Potter từ Hòn Đá Phù Thủy đến Đứa Trẻ Bị Nguyền Rủa. Nguồn tài liệu vô tận để nâng cao vốn từ vựng miêu tả cảnh vật và con người.',
    highlights: [
      'Đầy đủ 8 tập truyện PDF nguyên bản',
      'Trau dồi hàng chục ngàn từ vựng cao cấp',
      'Bộ sưu tập quý giá dành cho fan chân chính'
    ],
    pdfDownloadUrl: '/downloads/vip/The_Alchemist-NHA GIA KIM-MR LEO-GENWISE LANGUAGE.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_3_ELEMENTARY.pdf',
    badge: 'TRỌN BỘ 8 TẬP',
    rating: 5.0,
    reviewsCount: 780,
    spineColor: '#84CC16'
  },
  {
    id: 'book-doraemon-collection',
    title: 'DORAEMON SONG NGỮ (TRUYỆN DÀI & TRUYỆN NGẮN)',
    vietnameseTitle: 'Doraemon Tuyển Tập Song Ngữ — Chú Mèo Máy Đến Từ Tương Lai',
    subtitle: 'Bộ truyện tranh gắn liền tuổi thơ với lời thoại song ngữ hài hước và gần gũi',
    coverImage: '/images/books/bookworm-10.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'story',
    categoryNumber: 10,
    categoryLabel: '10. Truyện & Sách Đọc',
    pages: 2400,
    fileSize: '45 MB (Bộ)',
    level: 'Mọi lứa tuổi',
    description: 'Bộ sưu tập Doraemon truyện ngắn và truyện dài bằng tiếng Anh. Cách học từ vựng qua truyện tranh trực quan và giải trí nhất thế giới.',
    highlights: [
      'Hàng chục tập truyện tranh PDF sắc nét',
      'Lời thoại hội thoại hằng ngày cực kỳ tự nhiên',
      'Đem lại tiếng cười và niềm vui học tiếng Anh'
    ],
    pdfDownloadUrl: '/downloads/vip/Alice in wonderland EBOOK.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_1_STARTER.pdf',
    badge: 'TRỌN BỘ SONG NGỮ',
    rating: 5.0,
    reviewsCount: 620,
    spineColor: '#65A30D'
  },

  // ==========================================
  // THỂ LOẠI 11: WRITING
  // ==========================================
  {
    id: 'book-luyen-writing',
    title: 'LUYỆN WRITING - HÀNH TRÌNH CHINH PHỤC NGÔN TỪ',
    vietnameseTitle: 'Luyện Writing — Hành Trình Chinh Phục Ngôn Từ (Mr. Leo)',
    subtitle: 'Nắm vững phương pháp viết đoạn văn, bài luận và diễn đạt ý tưởng sắc sảo',
    coverImage: '/images/books/WRITING.jpg',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'writing',
    categoryNumber: 11,
    categoryLabel: '11. Kỹ Năng Viết (Writing)',
    pages: 198,
    fileSize: '8.88 MB',
    level: 'A2 - B2 Writing',
    description: 'Cuốn sách chuyên sâu giải quyết nỗi sợ viết tiếng Anh. Dẫn dắt bạn từng bước từ cấu trúc câu đơn, câu ghép, liên từ logic đến xây dựng một bài viết hoàn chỉnh thuyết phục.',
    highlights: [
      '24 chủ đề viết thực tế kèm bài viết mẫu điểm cao',
      'Kỹ thuật paraphrasing (diễn đạt lại) đỉnh cao',
      'Bảng liên từ nối câu chuyên nghiệp và bài tập thực hành'
    ],
    pdfDownloadUrl: '/downloads/vip/LUYỆN WRITING-HÀNH TRÌNH CHINH PHỤC NGÔN TỪ.pdf',
    samplePreviewUrl: '/downloads/samples/SAMPLE_10_TRANG_3_ELEMENTARY.pdf',
    badge: 'VIP WRITING',
    rating: 4.9,
    reviewsCount: 380,
    spineColor: '#9333EA'
  }
];

export const ALL_LIBRARY_BOOKS = ALL_VIP_BOOKS;

export const findBookById = (id: string): BookItem => {
  const found = ALL_VIP_BOOKS.find(b => b.id === id);
  return found || ALL_VIP_BOOKS[0];
};

export const get10PageSamplePdfUrl = (book: BookItem): string => {
  if (book.samplePreviewUrl) return book.samplePreviewUrl;
  return '/downloads/samples/SAMPLE_10_TRANG_1_STARTER.pdf';
};
