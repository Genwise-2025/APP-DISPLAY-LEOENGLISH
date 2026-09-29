import { BookItem, BookGroup } from '../types/book';

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

// -------------------------------------------------------------
// CORE BOOK DEFINITIONS
// Every book has originalPrice: 80,000đ & promoPrice: 40,000đ (-50%)
// -------------------------------------------------------------

export const ALL_LIBRARY_BOOKS: BookItem[] = [
  // 1. 1000 Câu Phản Xạ Anh Văn Thực Chiến EBOOK
  {
    id: 'book-1000-phan-xa',
    title: '1000 Câu Phản Xạ Anh Văn Thực Chiến EBOOK',
    vietnameseTitle: '1000 Câu Phản Xạ Anh Văn Thực Chiến — Bản Kèm Đáp Án',
    subtitle: 'Độc quyền phương pháp Swivox 3 giây — Phản xạ tức thì không cần dịch',
    coverImage: '/images/books/leoenglish-1000-cau-phan-xa.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'communication',
    categoryLabel: 'Phản Xạ Giao Tiếp',
    pages: 185,
    fileSize: '2.1 MB',
    level: 'A1 - B2 Thực Chiến',
    description: 'Giáo trình luyện 1000 câu giao tiếp thực chiến thông dụng nhất trong đời sống, công sở và du lịch. Thiết kế kèm lời giải chi tiết giúp người học phản xạ tự nhiên sau 3 giây.',
    highlights: [
      '1000 câu khẩu ngữ đàm thoại thực tế nhất',
      'Kèm bảng phiên âm IPA & giải nghĩa chuẩn',
      'Ứng dụng phương pháp phản xạ Swivox độc quyền',
      'Có sẵn đáp án và bài tập đối thoại song ngữ'
    ],
    pdfDownloadUrl: '/downloads/LEOENGLISH_1000_CAU_PHAN_XA_KEM_DAP_AN (1).pdf',
    badge: 'SIÊU BÁN CHẠY #1',
    rating: 5.0,
    reviewsCount: 384
  },

  // 2. 500 Vietnamese-English Daily Vocabulary
  {
    id: 'book-500-daily-vocab',
    title: '500 Vietnamese-English Daily Vocabulary',
    vietnameseTitle: '500 Từ Vựng Song Ngữ Việt - Anh Đời Sống Hàng Ngày',
    subtitle: 'Hình ảnh sinh động, ngữ cảnh gần gũi, học nhanh nhớ sâu',
    coverImage: '/images/books/500-daily-vocabulary.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'vocabulary',
    categoryLabel: 'Từ Vựng Đời Sống',
    pages: 140,
    fileSize: '4.5 MB',
    level: 'Cơ Bản - Trung Cấp',
    description: 'Tổng hợp 500 từ vựng và cụm từ cốt lõi được người bản ngữ dùng nhiều nhất trong sinh hoạt gia đình, mua sắm, ăn uống và kết nối bạn bè.',
    highlights: [
      '500 từ vựng chia theo 20 chủ đề sinh hoạt quen thuộc',
      'Ví dụ minh họa ngữ cảnh đàm thoại thực tế',
      'Kèm mẫu câu ứng dụng tức thì',
      'Định dạng ebook chuẩn in màu chất lượng cao'
    ],
    pdfDownloadUrl: '/downloads/1. STARTER.pdf',
    badge: 'HỌC VIÊN YÊU THÍCH',
    rating: 4.9,
    reviewsCount: 245
  },

  // 3. The Girl with Red Hair
  {
    id: 'book-the-girl-with-red-hair',
    title: 'The Girl with Red Hair',
    vietnameseTitle: 'Truyện Đọc Tiếng Anh — Cô Gái Tóc Đỏ',
    subtitle: 'Đọc truyện tiếng Anh giải trí, thẩm thấu ngữ pháp tự nhiên',
    coverImage: '/images/books/the-girl-with-red-hair.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'story',
    categoryLabel: 'Truyện Đọc Song Ngữ',
    pages: 110,
    fileSize: '3.8 MB',
    level: 'A2 - B1 Dễ Đọc',
    description: 'Cuốn truyện đọc lôi cuốn kể về những tình huống phiêu lưu và tình cảm nhẹ nhàng. Giúp người học nâng cao vốn từ vựng và khả năng cảm thụ câu văn tiếng Anh một cách thư giãn.',
    highlights: [
      'Cốt truyện hấp dẫn, văn phong bản ngữ mượt mà',
      'Chú thích từ mới ngay dưới chân trang',
      'Củng cố ngữ pháp qua mạch cảm xúc tự nhiên',
      'Thích hợp đọc giải trí trước khi ngủ'
    ],
    pdfDownloadUrl: '/downloads/2. BEGINNER.pdf',
    badge: 'TRUYỆN SONG NGỮ',
    rating: 4.8,
    reviewsCount: 198
  },

  // 4. 200 Practical Vietnamese - English Conversation Sentences for Hotels, Coffee Shops, Supermarkets, Parking Lots, and Markets
  {
    id: 'book-200-practical-conversation',
    title: '200 Practical Vietnamese - English Conversation Sentences for Hotels, Coffee Shops, Supermarkets, Parking Lots, and Markets',
    vietnameseTitle: '200 Câu Đàm Thoại Thực Tế: Khách Sạn, Quán Cà Phê, Siêu Thị, Bãi Xe & Khu Chợ',
    subtitle: 'Tình huống giao tiếp đường phố và dịch vụ đô thị hiện đại',
    coverImage: '/images/books/200-practical-conversation-hi.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'communication',
    categoryLabel: 'Đàm Thoại Tình Huống',
    pages: 132,
    fileSize: '4.2 MB',
    level: 'Thực Chiến Mọi Trình Độ',
    description: 'Cẩm nang đút túi đàm thoại trong 5 không gian đời sống phổ biến nhất: Quán cà phê, siêu thị, khách sạn, bãi đậu xe và chợ truyền thống.',
    highlights: [
      '200 mẫu câu chuẩn bản ngữ cho từng tình huống cụ thể',
      'Cách hỏi giá, mặc cả, đặt chỗ và nhờ hỗ trợ lịch thiệp',
      'Phiên âm phát âm dễ hiểu cho người mới bắt đầu',
      'Có file nghe audio đính kèm luyện tập'
    ],
    pdfDownloadUrl: '/downloads/3. ELEMENTARY.pdf',
    badge: 'THỰC CHIẾN ĐÔ THỊ',
    rating: 4.9,
    reviewsCount: 312
  },

  // 5. AT THE SUPERMARKET 1
  {
    id: 'book-at-the-supermarket-1',
    title: 'AT THE SUPERMARKET 1',
    vietnameseTitle: 'Giao Tiếp Thực Tế Tại Siêu Thị — Tập 1',
    subtitle: 'Tất tần tật từ vựng hàng tiêu dùng, hỏi quầy kệ và thanh toán hóa đơn',
    coverImage: '/images/books/at-the-supermarket-1.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'communication',
    categoryLabel: 'Giao Tiếp Hàng Ngày',
    pages: 96,
    fileSize: '3.1 MB',
    level: 'A1 - A2',
    description: 'Chuyên đề đàm thoại siêu thị: Cách phân biệt từng loại thực phẩm, rau củ quả, hỏi khuyến mãi và thanh toán bằng tiền mặt lẫn ví điện tử.',
    highlights: [
      'Toàn cảnh từ vựng quầy hàng và đồ dùng tiêu dùng',
      'Đoạn hội thoại hỏi quầy thu ngân và nhân viên bán hàng',
      'Mẫu câu hỏi mã giảm giá & đổi trả hàng',
      'Hình ảnh minh họa in màu sắc nét'
    ],
    pdfDownloadUrl: '/downloads/1. STARTER.pdf',
    badge: 'ĐỜI SỐNG HẰNG NGÀY',
    rating: 4.8,
    reviewsCount: 164
  },

  // 6. TIENG ANH CHO NGUOI MAT GOC - STARTER full
  {
    id: 'book-tieng-anh-mat-goc-starter',
    title: 'TIENG ANH CHO NGUOI MAT GOC- STARTER full',
    vietnameseTitle: 'Tiếng Anh Cho Người Mất Gốc — Bản Đầy Đủ Trọn Gói 24 Bài',
    subtitle: 'Lộ trình chuẩn chỉnh xây lại nền tảng từ vựng, ngữ pháp và phát âm IPA',
    coverImage: '/images/books/tieng-anh-mat-goc-starter-v2.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'communication',
    categoryLabel: 'Lấy Gốc Tiếng Anh',
    pages: 172,
    fileSize: '7.1 MB',
    level: 'Mất Gốc -> Tự Tin Nói',
    description: 'Giáo trình cốt lõi LEOENGLISH được thiết kế riêng cho người Việt mất gốc. Hướng dẫn từng bước từ chào hỏi, giới thiệu bản thân, con số, gia đình đến đàm thoại đời sống trôi chảy.',
    highlights: [
      '24 Unit toàn diện từ con số 0 lên phản xạ đàm thoại',
      'Bảng phiên âm chuẩn quốc tế IPA phiên âm theo ngữ điệu người Việt',
      'Bài tập tình huống và đối thoại thực chiến',
      'Tặng kèm audio chuẩn giọng Mỹ'
    ],
    pdfDownloadUrl: '/downloads/1. STARTER.pdf',
    badge: 'KHUYÊN DÙNG CHO MẤT GỐC',
    rating: 5.0,
    reviewsCount: 520
  },

  // 7. 500 English Phrases for Instant Fluency-NEW EDITION
  {
    id: 'book-500-phrases-fluency',
    title: '500 English Phrases for Instant Fluency-NEW EDITION',
    vietnameseTitle: '500 Cụm Từ Tiếng Anh Giúp Bạn Nói Lưu Loát Tức Thì — Bản Mới',
    subtitle: 'Các cụm từ cố định (collocations) & thành ngữ hiện đại người Mỹ nói hàng ngày',
    coverImage: '/images/books/500-english-phrases-hi.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'vocabulary',
    categoryLabel: 'Cụm Từ Lưu Loát',
    pages: 160,
    fileSize: '4.8 MB',
    level: 'A2 - B2 Nâng Cao Phản Xạ',
    description: 'Bí quyết nói tiếng Anh mượt mà không bị ngập ngừng: 500 cụm từ cố định (chunks & idioms) được dùng dày đặc trong phim ảnh và giao tiếp hàng ngày của người bản xứ.',
    highlights: [
      '500 cụm từ đắt giá giúp câu nói tự nhiên không gượng gạo',
      'Tránh lỗi dịch từng từ (word-by-word) từ tiếng Việt sang tiếng Anh',
      'Ví dụ hội thoại văn minh trong công việc và đời sống',
      'Đã cập nhật các cụm từ thịnh hành nhất năm 2026'
    ],
    pdfDownloadUrl: '/downloads/2. BEGINNER.pdf',
    badge: 'VIP BÁN CHẠY',
    rating: 4.9,
    reviewsCount: 410
  },

  // 8. 1000 CÂU THỰC CHIẾN B1-C1
  {
    id: 'book-1000-cau-thuc-chien-b1-c1',
    title: '1000 CÂU THỰC CHIẾN B1-C1',
    vietnameseTitle: '1000 Câu Giao Tiếp Thực Chiến Trung Cao Cấp B1-C1',
    subtitle: 'Nâng tầm cách diễn đạt sang trọng, học thuật và chuyên nghiệp',
    coverImage: '/images/books/1000-cau-thuc-chien-b1-c1-hi.jpg',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'communication',
    categoryLabel: 'Nâng Cao B1-C1',
    pages: 195,
    fileSize: '5.6 MB',
    level: 'B1 - C1 Trung Cao Cấp',
    description: 'Dành riêng cho người đã có nền tảng cơ bản và muốn diễn đạt ý kiến sâu sắc, phản biện, đàm phán và thuyết trình chuyên nghiệp bằng tiếng Anh chuẩn mực.',
    highlights: [
      '1000 mẫu câu B1-C1 chia theo 30 chuyên đề nâng cao',
      'Từ vựng học thuật & cụm từ biểu đạt cảm xúc tinh tế',
      'Mẫu câu đàm phán, phản biện và thuyết phục',
      'Bài tập thực hành phản xạ nâng cao'
    ],
    pdfDownloadUrl: '/downloads/4. PRE INTER.pdf',
    badge: 'CHUYÊN SÂU B1-C1',
    rating: 4.9,
    reviewsCount: 280
  },

  // 9. AT THE SUPERMARKET (Full Edition)
  {
    id: 'book-at-the-supermarket-full',
    title: 'AT THE SUPERMARKET',
    vietnameseTitle: 'Toàn Diện Đàm Thoại Mua Sắm Tại Siêu Thị',
    subtitle: 'Bản đầy đủ tích hợp tất cả các chủng loại hàng hóa & quy trình thanh toán',
    coverImage: '/images/books/at-the-supermarket.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'communication',
    categoryLabel: 'Mua Sắm Đời Sống',
    pages: 115,
    fileSize: '3.6 MB',
    level: 'A1 - B1',
    description: 'Cẩm nang toàn diện về mua sắm tại các chuỗi siêu thị lớn ở nước ngoài: Hỏi cân nặng, xem bảng thành phần dinh dưỡng, hạn sử dụng và xử lý tình huống phát sinh.',
    highlights: [
      'Từ vựng chuyên ngành thực phẩm và đóng gói',
      'Đối thoại xử lý hóa đơn, quét mã tích điểm',
      'Tình huống khiếu nại và đổi trả lịch thiệp',
      'Kèm bài tập ghép cặp từ vựng'
    ],
    pdfDownloadUrl: '/downloads/1. STARTER.pdf',
    badge: 'PHỔ THÔNG',
    rating: 4.8,
    reviewsCount: 142
  },

  // 10. ELEMENTARY BUSINESS ENGLISH EBOOK
  {
    id: 'book-elementary-business',
    title: 'ELEMENTARY BUSINESS ENGLISH EBOOK',
    vietnameseTitle: 'Tiếng Anh Thương Mại Cơ Bản Dành Cho Văn Phòng',
    subtitle: 'Giao tiếp công sở, email chuyên nghiệp và đón tiếp đối tác',
    coverImage: '/images/books/business-1-hi.jpg',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'business',
    categoryLabel: 'Tiếng Anh Công Sở',
    pages: 168,
    fileSize: '5.2 MB',
    level: 'Văn Phòng Cơ Bản',
    description: 'Trang bị kỹ năng giao tiếp tiếng Anh công sở thực tiễn: Viết email xin phép, viết báo cáo ngắn, gọi điện với khách hàng và tham gia các cuộc họp nội bộ.',
    highlights: [
      'Mẫu email thương mại chuẩn phong cách lịch thiệp',
      'Đàm thoại xã giao Small Talk với sếp và đồng nghiệp',
      'Cách đặt lịch hẹn và xác nhận cuộc gặp đối tác',
      'Thuật ngữ văn phòng thông dụng nhất'
    ],
    pdfDownloadUrl: '/downloads/3. ELEMENTARY.pdf',
    badge: 'DOANH NGHIỆP',
    rating: 4.9,
    reviewsCount: 220
  },

  // 11. ENGLISH FOR POLICE OFFICERS EBOOK
  {
    id: 'book-english-police',
    title: 'ENGLISH FOR POLICE OFFICERS EBOOK',
    vietnameseTitle: 'Tiếng Anh Nghiệp Vụ Công An & An Ninh Trật Tự',
    subtitle: 'Xử lý tình huống giao tiếp với du khách quốc tế, chỉ đường và an ninh',
    coverImage: '/images/books/english-for-police-officers.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'business',
    categoryLabel: 'Tiếng Anh Nghiệp Vụ',
    pages: 148,
    fileSize: '4.7 MB',
    level: 'Chuyên Ngành',
    description: 'Giáo trình đặc thù hướng dẫn cán bộ an ninh và trật tự công cộng giao tiếp lịch sự, xử lý tình huống khẩn cấp, khai báo thất lạc và hướng dẫn khách du lịch nước ngoài.',
    highlights: [
      'Mẫu câu hướng dẫn đường đi và trật tự giao thông',
      'Khai báo hộ chiếu, thất lạc tài sản của khách quốc tế',
      'Từ vựng pháp lý cơ bản và quyền công dân',
      'Văn phong dứt khoát, chuẩn xác và lịch thiệp'
    ],
    pdfDownloadUrl: '/downloads/3. ELEMENTARY.pdf',
    badge: 'CHUYÊN NGÀNH ĐẶC THÙ',
    rating: 4.9,
    reviewsCount: 115
  },

  // 12. Fluent Traveller- English for Real Journeys EBOOK
  {
    id: 'book-fluent-traveller',
    title: 'Fluent Traveller- English for Real Journeys EBOOK',
    vietnameseTitle: 'Tiếng Anh Du Lịch Thực Tế — Tự Tin Bay Khắp Thế Giới',
    subtitle: 'Thủ tục sân bay, khách sạn, ẩm thực và khám phá văn hóa',
    coverImage: '/images/books/fluent-traveller-hi.jpg',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'communication',
    categoryLabel: 'Tiếng Anh Du Lịch',
    pages: 175,
    fileSize: '5.8 MB',
    level: 'Tất Cả Người Đi Du Lịch',
    description: 'Hành trang không thể thiếu cho mọi chuyến xuất ngoại: Làm thủ tục check-in sân bay, qua cổng hải quan, thuê xe, đặt phòng và thưởng thức ẩm thực địa phương.',
    highlights: [
      'Đầy đủ các khâu từ lên máy bay đến nhận phòng khách sạn',
      'Mẫu câu giải quyết tình huống hành lý thất lạc hoặc trễ chuyến',
      'Kinh nghiệm giao tiếp thân thiện với người dân bản xứ',
      'Bản đồ tình huống du lịch kèm âm thanh'
    ],
    pdfDownloadUrl: '/downloads/2. BEGINNER.pdf',
    badge: 'DU LỊCH HOT',
    rating: 5.0,
    reviewsCount: 360
  },

  // 13. Giải thích ngữ pháp Tiếng Anh - Mai Lan Hương
  {
    id: 'book-giai-thich-ngu-phap',
    title: 'Giải thích ngữ pháp Tiếng Anh - Mai Lan Hương',
    vietnameseTitle: 'Giải Thích Ngữ Pháp Tiếng Anh Toàn Diện Có Bài Tập',
    subtitle: 'Bản kinh điển được số hóa sắc nét, dễ tra cứu mọi thì và cấu trúc',
    coverImage: '/images/books/giai-thich-ngu-phap-mai-lan-huong.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'grammar-ielts',
    categoryLabel: 'Ngữ Pháp Cốt Lõi',
    pages: 350,
    fileSize: '15.4 MB',
    level: 'Từ Cơ Bản Đến Nâng Cao',
    description: 'Cuốn sách gối đầu giường của hàng triệu thế hệ học sinh Việt Nam. Giải thích cặn kẽ từng hiện tượng ngữ pháp, thì động từ, câu điều kiện, bị động và mệnh đề quan hệ.',
    highlights: [
      'Giải thích ngữ pháp bằng tiếng Việt cực kỳ chi tiết',
      'Hàng ngàn câu bài tập ứng dụng có đáp án chuẩn',
      'Phù hợp ôn thi THPT, Đại học, TOEIC & IELTS',
      'Bản scan kỹ thuật số rõ nét từng con chữ'
    ],
    pdfDownloadUrl: '/downloads/5. INTERMEDIATE.pdf',
    badge: 'KINH ĐIỂN',
    rating: 5.0,
    reviewsCount: 890
  },

  // 14. IELTS MOCKING TEST-MR. LEO
  {
    id: 'book-ielts-mocking-test',
    title: 'IELTS MOCKING TEST-MR. LEO',
    vietnameseTitle: 'Bộ Đề Thi Thử IELTS Chuẩn Cambridge Kèm Lời Giải — Mr. Leo',
    subtitle: 'Chiến thuật làm bài Listening, Reading, Writing & Speaking điểm cao',
    coverImage: '/images/books/ielts-mocking-test.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'grammar-ielts',
    categoryLabel: 'Luyện Thi IELTS',
    pages: 210,
    fileSize: '8.4 MB',
    level: 'Target 5.5 - 7.5+',
    description: 'Tổng hợp đề thi thử IELTS mới nhất được Mr. Leo biên soạn dựa trên cấu trúc Cambridge. Kèm phân tích bẫy đề thi và dàn bài mẫu Speaking - Writing đạt band điểm cao.',
    highlights: [
      'Bộ đề thi thử bám sát đề thi thật 2026',
      'Lời giải chi tiết từng câu trong Reading và Listening',
      'Dàn bài mẫu Speaking Part 1, 2, 3 và Writing Task 1, 2',
      'Mẹo căn giờ và phân bổ sức lực trong phòng thi'
    ],
    pdfDownloadUrl: '/downloads/5. INTERMEDIATE.pdf',
    badge: 'IELTS VIP',
    rating: 4.9,
    reviewsCount: 310
  },

  // 15. INTER BUSINESS ENGLISH EBOOK
  {
    id: 'book-inter-business-english',
    title: 'INTER BUSINESS ENGLISH EBOOK',
    vietnameseTitle: 'Tiếng Anh Doanh Nghiệp Trung Cấp (Intermediate)',
    subtitle: 'Thuyết trình dự án, điều hành cuộc họp và đàm phán hợp đồng',
    coverImage: '/images/books/business-2-hi.jpg',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'business',
    categoryLabel: 'Thương Mại Trung Cấp',
    pages: 180,
    fileSize: '6.2 MB',
    level: 'B1 - B2 Business',
    description: 'Giáo trình chuyên sâu cho quản lý và chuyên viên: Kỹ thuật thuyết trình cuốn hút, xử lý tranh cãi trong cuộc họp, thương lượng chiết khấu và ký kết thỏa thuận.',
    highlights: [
      'Kịch bản đàm phán và thuyết trình từng bước',
      'Từ vựng tài chính, marketing và chuỗi cung ứng',
      'Cách nhận xét và đóng góp ý kiến mang tính xây dựng',
      'Mẫu biên bản cuộc họp chuyên nghiệp'
    ],
    pdfDownloadUrl: '/downloads/4. PRE INTER.pdf',
    badge: 'QUẢN LÝ DOANH NGHIỆP',
    rating: 4.9,
    reviewsCount: 175
  },

  // 16. LUYỆN WRITING - HÀNH TRÌNH CHINH PHỤC NGÔN TỪ
  {
    id: 'book-luyen-writing',
    title: 'LUYỆN WRITING - HÀNH TRÌNH CHINH PHỤC NGÔN TỪ',
    vietnameseTitle: 'Luyện Kỹ Năng Viết Tiếng Anh — Hành Trình Chinh Phục Ngôn Từ',
    subtitle: 'Từ viết câu đơn giản đến đoạn văn logic và bài luận thuyết phục',
    coverImage: '/images/books/luyen-writing-hi.jpg',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'grammar-ielts',
    categoryLabel: 'Kỹ Năng Viết Writing',
    pages: 190,
    fileSize: '6.5 MB',
    level: 'Mọi Trình Độ Cần Viết Chuẩn',
    description: 'Bí quyết viết câu tiếng Anh mạch lạc, chặt chẽ, không phạm lỗi ngữ pháp và diễn đạt trôi chảy như người bản xứ. Cung cấp bộ khung dàn ý và từ nối học thuật.',
    highlights: [
      'Sơ đồ tư duy liên kết ý tưởng bài viết mạch lạc',
      'Bộ từ nối chuyển đoạn giúp bài viết uyển chuyển',
      'Phân tích 50 lỗi hành văn phổ biến nhất của người Việt',
      'Bài tập viết có nhận xét và bài sửa mẫu'
    ],
    pdfDownloadUrl: '/downloads/4. PRE INTER.pdf',
    badge: 'LUYỆN VIẾT CHUYÊN SÂU',
    rating: 4.9,
    reviewsCount: 230
  },

  // 17. MASTERING IELTS SPEAKING EBOOK
  {
    id: 'book-mastering-ielts-speaking',
    title: 'MASTERING IELTS SPEAKING EBOOK',
    vietnameseTitle: 'Làm Chủ IELTS Speaking Cùng Mr. Leo',
    subtitle: 'Chiến thuật trả lời Part 1, 2, 3 tự nhiên, đạt band 7.0+',
    coverImage: '/images/books/mastering-ielts-speaking.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'grammar-ielts',
    categoryLabel: 'IELTS Speaking',
    pages: 185,
    fileSize: '5.9 MB',
    level: 'Target 6.5 - 8.0+',
    description: 'Phương pháp trả lời IELTS Speaking thông minh không cần học thuộc lòng câu chữ: Cách triển khai ý tưởng nhanh, dùng Idioms tự nhiên và kiểm soát ngữ điệu chuẩn xác.',
    highlights: [
      'Bộ câu hỏi dự đoán Speaking sát đề thi thật',
      'Công thức trả lời A.R.E.A giúp kéo dài câu trả lời mượt mà',
      'Từ vựng Collocations đắt giá cho từng chủ đề',
      'Kèm audio bài mẫu thu âm giọng chuẩn người bản ngữ'
    ],
    pdfDownloadUrl: '/downloads/5. INTERMEDIATE.pdf',
    badge: 'SPEAKING PRO',
    rating: 5.0,
    reviewsCount: 420
  },

  // 18. PRE INTER BUSINESS ENGLISH EBOOK
  {
    id: 'book-pre-inter-business',
    title: 'PRE INTER BUSINESS ENGLISH EBOOK',
    vietnameseTitle: 'Tiếng Anh Doanh Nghiệp Tiền Trung Cấp (Pre-Intermediate)',
    subtitle: 'Nâng bước giao tiếp công sở, trao đổi văn bản và làm việc nhóm',
    coverImage: '/images/books/business-3-hi.jpg',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'business',
    categoryLabel: 'Kinh Doanh Quốc Tế',
    pages: 155,
    fileSize: '5.1 MB',
    level: 'A2 - B1 Business',
    description: 'Khóa giáo trình chuyển tiếp giúp nhân sự văn phòng tự tin giao tiếp qua video call, viết báo cáo tuần, thảo luận kế hoạch làm việc và phối hợp phòng ban hiệu quả.',
    highlights: [
      'Giao tiếp qua Teams / Zoom chuẩn tác phong quốc tế',
      'Mẫu câu đề xuất cải tiến và giải pháp công việc',
      'Kỹ năng phân bổ nhiệm vụ và giám sát tiến độ',
      'Bài tập tình huống doanh nghiệp sống động'
    ],
    pdfDownloadUrl: '/downloads/4. PRE INTER.pdf',
    badge: 'DOANH NGHIỆP',
    rating: 4.8,
    reviewsCount: 160
  },

  // 19. PROFESSIONAL ENGLISH VOCABULARY AND SENTENCES
  {
    id: 'book-pro-vocab-sentences',
    title: 'PROFESSIONAL ENGLISH VOCABULARY AND SENTENCES',
    vietnameseTitle: 'Từ Vựng & Mẫu Câu Chuyên Nghiệp Trong Môi Trường Đa Quốc Gia',
    subtitle: 'Từ vựng chuyên môn nâng cao cho quản trị, tài chính và công nghệ',
    coverImage: '/images/books/professional-english-vocabulary.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'business',
    categoryLabel: 'Từ Vựng Chuyên Nghiệp',
    pages: 170,
    fileSize: '5.7 MB',
    level: 'B1 - C1 Chuyên Môn',
    description: 'Kho từ vựng tinh chọn dành cho chuyên gia làm việc trong các tập đoàn đa quốc gia. Giúp nâng tầm bài phát biểu, email và đề xuất kinh doanh.',
    highlights: [
      '1200 từ vựng và cụm diễn đạt chuyên nghiệp cấp cao',
      'Ví dụ minh họa ngữ cảnh đàm phán và thuyết trình',
      'Kèm bảng từ đồng nghĩa tránh lặp từ nhàm chán',
      'Bản PDF chuẩn in màu'
    ],
    pdfDownloadUrl: '/downloads/4. PRE INTER.pdf',
    badge: 'TỪ VỰNG CHUYÊN SÂU',
    rating: 4.9,
    reviewsCount: 195
  },

  // 20. Project Management and Hotel Management
  {
    id: 'book-project-hotel-management',
    title: 'Project Management and Hotel Management',
    vietnameseTitle: 'Tiếng Anh Quản Trị Dự Án & Quản Lý Nhà Hàng Khách Sạn',
    subtitle: 'Nghiệp vụ điều hành dự án, dịch vụ lưu trú và sự kiện cao cấp',
    coverImage: '/images/books/project-hotel-management.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'business',
    categoryLabel: 'Quản Lý Dự Án & KS',
    pages: 162,
    fileSize: '5.4 MB',
    level: 'Chuyên Ngành Dịch Vụ',
    description: 'Bộ giáo trình chuyên ngành kép: Quy trình điều phối dự án quốc tế và nghiệp vụ quản lý khách sạn 5 sao. Xử lý yêu cầu khách VIP và tổ chức sự kiện chuyên nghiệp.',
    highlights: [
      'Quy trình vận hành khách sạn & tiếp đón khách quốc tế',
      'Thuật ngữ quản trị tiến độ (Scrum, Agile, KPI)',
      'Kỹ năng giải quyết khủng hoảng và phản hồi khách hàng',
      'Mẫu biên bản và hợp đồng dịch vụ lưu trú'
    ],
    pdfDownloadUrl: '/downloads/3. ELEMENTARY.pdf',
    badge: 'QUẢN TRỊ DỰ ÁN',
    rating: 4.8,
    reviewsCount: 135
  },

  // 21. STARTER CHINESE BOOK
  {
    id: 'book-starter-chinese',
    title: 'STARTER CHINESE BOOK',
    vietnameseTitle: 'Giáo Trình Tiếng Trung Nhập Môn HSK 1-2 Cùng Mandaleo',
    subtitle: 'Học bính âm Pinyin chuẩn xác, nét chữ Hán và đàm thoại đời sống cơ bản',
    coverImage: '/images/books/starter-chinese-book.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'chinese',
    categoryLabel: 'Tiếng Trung Nhập Môn',
    pages: 156,
    fileSize: '6.8 MB',
    level: 'HSK 1 - HSK 2',
    description: 'Giáo trình nhập môn tiếng Trung hiện đại đồng hành cùng ứng dụng MandaLeo: Quy tắc phát âm Pinyin chuẩn Bắc Kinh, thứ tự viết nét chữ Hán và 150 câu đàm thoại đời thường.',
    highlights: [
      'Bảng phiên âm Pinyin có hướng dẫn khẩu hình chi tiết',
      'Tập viết 100 chữ Hán căn bản có sơ đồ thứ tự nét',
      'Đàm thoại mua sắm, chào hỏi và gọi món ăn Trung Hoa',
      'Kèm file nghe audio chuẩn giọng bản xứ'
    ],
    pdfDownloadUrl: '/downloads/1. STARTER.pdf',
    badge: 'TIẾNG TRUNG HOT',
    rating: 4.9,
    reviewsCount: 340
  },

  // 22. STARTER - ANH VĂN GIAO TIẾP - MR.LEO EBOOK
  {
    id: 'book-starter-anh-van-mr-leo',
    title: 'STARTER - ANH VĂN GIAO TIẾP - MR.LEO EBOOK',
    vietnameseTitle: 'Anh Văn Giao Tiếp Cơ Bản — Tác Giả Mr. Leo',
    subtitle: 'Giáo trình độc quyền với phương pháp trực quan, dễ hiểu nhất cho người lớn',
    coverImage: '/images/books/starter-anh-van-giao-tiep-hi.jpg',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'communication',
    categoryLabel: 'Giao Tiếp Cốt Lõi',
    pages: 172,
    fileSize: '7.1 MB',
    level: 'Mới Bắt Đầu',
    description: 'Tác phẩm đúc kết hơn 10 năm giảng dạy tiếng Anh của Mr. Leo. Giúp người lớn bận rộn học nhanh phản xạ thực tế, tự tin nói ngay sau bài học đầu tiên.',
    highlights: [
      'Phương pháp tư duy trực quan bằng hình ảnh',
      'Cấu trúc ngữ pháp tinh gọn không nhồi nhét lý thuyết',
      'Các tình huống giao tiếp đời sống gần gũi và thú vị',
      'Định dạng ebook chuẩn in màu tuyệt đẹp'
    ],
    pdfDownloadUrl: '/downloads/1. STARTER.pdf',
    badge: 'ĐỘC QUYỀN MR. LEO',
    rating: 5.0,
    reviewsCount: 490
  },

  // 23. UPPER INTERMEDIATE BUSINESS ENGLISH EBOOK
  {
    id: 'book-upper-inter-business',
    title: 'UPPER INTERMEDIATE BUSINESS ENGLISH EBOOK',
    vietnameseTitle: 'Tiếng Anh Doanh Nghiệp Cao Cấp (Upper-Intermediate B2-C1)',
    subtitle: 'Chiến lược quản trị, đàm phán hợp đồng lớn và giao tiếp lãnh đạo',
    coverImage: '/images/books/business-4-hi.jpg',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'business',
    categoryLabel: 'Doanh Nghiệp Cao Cấp',
    pages: 192,
    fileSize: '6.9 MB',
    level: 'B2 - C1 Quản Lý Cấp Cao',
    description: 'Giáo trình đỉnh cao dành cho giám đốc, trưởng bộ phận và chuyên gia đàm phán quốc tế: Chiến lược thương lượng, xử lý bất đồng quan điểm và xây dựng uy tín nhà lãnh đạo.',
    highlights: [
      'Nghệ thuật đàm phán đa văn hóa trong kinh doanh toàn cầu',
      'Cách diễn đạt tinh tế trong các quyết định kinh doanh nhạy cảm',
      'Từ vựng kinh tế vĩ mô và thị trường vốn',
      'Bài tập mô phỏng cuộc họp hội đồng quản trị'
    ],
    pdfDownloadUrl: '/downloads/5. INTERMEDIATE.pdf',
    badge: 'LÃNH ĐẠO CẤP CAO',
    rating: 4.9,
    reviewsCount: 205
  },

  // 24. 书苑双语词汇 (Chinese-English Bilingual Vocabulary)
  {
    id: 'book-chinese-bilingual-vocab',
    title: '书苑双语词汇 — CHINESE & ENGLISH BILINGUAL VOCABULARY',
    vietnameseTitle: 'Thư Uyển Song Ngữ Từ Vựng — Tiếng Trung & Tiếng Anh Kèm Tiếng Việt',
    subtitle: 'Học 1 được 2 — Tra cứu đối chiếu từ vựng Trung - Anh - Việt tiện lợi',
    coverImage: '/images/books/chinese-bilingual-vocabulary.png',
    originalPrice: 80000,
    promoPrice: 40000,
    discountPercent: 50,
    category: 'chinese',
    categoryLabel: 'Song Ngữ Trung - Anh',
    pages: 168,
    fileSize: '7.5 MB',
    level: 'Song Ngữ Thực Chiến',
    description: 'Cuốn từ điển song ngữ bỏ túi độc đáo giúp người học đối chiếu cùng lúc cả 3 ngôn ngữ: Tiếng Trung (chữ Hán + Pinyin), Tiếng Anh và Tiếng Việt trong cùng một trang sách.',
    highlights: [
      'Hơn 800 từ vựng cốt lõi đối chiếu 3 thứ tiếng Trung - Anh - Việt',
      'Mẹo ghi nhớ từ vựng qua gốc từ và liên tưởng văn hóa',
      'Ví dụ song ngữ đối chiếu thực tế',
      'Hỗ trợ đắc lực cho người làm việc trong công ty đa quốc gia'
    ],
    pdfDownloadUrl: '/downloads/1. STARTER.pdf',
    badge: 'SONG NGỮ ĐẶC BIỆT',
    rating: 5.0,
    reviewsCount: 275
  }
];

// Helper to look up a book by title or partial title
export const findBookByPartialTitle = (keyword: string): BookItem => {
  const normalized = keyword.toLowerCase().trim();
  const found = ALL_LIBRARY_BOOKS.find(b => 
    b.title.toLowerCase().includes(normalized) || 
    (b.vietnameseTitle && b.vietnameseTitle.toLowerCase().includes(normalized)) ||
    b.id.toLowerCase().includes(normalized)
  );
  if (found) return found;
  return ALL_LIBRARY_BOOKS[0]; // fallback
};

// -------------------------------------------------------------
// 3 MAIN BOOK GROUPS REQUESTED BY USER:
// NHÓM 1: 1000 CÂU PHẢN XẠ THỰC CHIẾN (MÃ TẢI: L1000)
// NHÓM 2: COMMUNITY 390 (MÃ TẢI: T390)
// NHÓM 3: COMBO VIP L299 (MÃ TẢI: L299VIP)
// -------------------------------------------------------------

export const BOOK_GROUPS: BookGroup[] = [
  // NHÓM 1: 1000 CÂU PHẢN XẠ THỰC CHIẾN
  {
    id: 'nhom-1-l1000',
    code: 'L1000',
    name: 'NHÓM 1: 1000 CÂU PHẢN XẠ THỰC CHIẾN',
    subtitle: 'Chuyên đề đột phá phản xạ giao tiếp Swivox 3 giây — Đầy đủ đáp án',
    badge: 'MÃ TẢI HỌC VIÊN',
    tagline: 'Bộ giáo trình phản xạ thần tốc — Nói tiếng Anh tự nhiên không cần dịch trong đầu',
    accentColor: '#10B981',
    gradientClass: 'from-emerald-950 via-teal-900 to-emerald-800',
    borderGlowClass: 'border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.35)]',
    description: 'Tập trung toàn diện vào bộ giáo trình 1000 Câu Phản Xạ Thực Chiến độc quyền từ Mr. Leo, tích hợp bảng phiên âm quốc tế IPA và đáp án chi tiết cho từng câu hỏi.',
    books: [
      findBookByPartialTitle('1000 Câu Phản Xạ')
    ],
    allDownloadUrl: '/downloads/LEOENGLISH_1000_CAU_PHAN_XA_KEM_DAP_AN (1).pdf',
    sampleFileName: 'LEOENGLISH_1000_CAU_PHAN_XA_KEM_DAP_AN.pdf'
  },

  // NHÓM 2: COMMUNITY 390
  {
    id: 'nhom-2-t390',
    code: 'T390',
    name: 'NHÓM 2: COMMUNITY 390',
    subtitle: 'Bộ sưu tập 6 cuốn đàm thoại, từ vựng & truyện đọc đời sống',
    badge: 'MÃ TẢI HỌC VIÊN',
    tagline: 'Trọn bộ 6 cuốn sách giá trị nhất dành riêng cho thành viên Community 390',
    accentColor: '#F59E0B',
    gradientClass: 'from-amber-950 via-yellow-950 to-amber-900',
    borderGlowClass: 'border-amber-400/60 shadow-[0_0_35px_rgba(245,158,11,0.35)]',
    description: 'Bao gồm 6 đầu sách phong phú từ từ vựng đời sống, truyện đọc thư giãn đến đàm thoại siêu thị, khách sạn và giáo trình cho người mất gốc.',
    books: [
      {
        ...findBookByPartialTitle('TIENG ANH CHO NGUOI MAT GOC- STARTER full'),
        coverImage: '/images/books/tieng-anh-mat-goc-starter-v2.png'
      },
      {
        ...findBookByPartialTitle('1000 Câu Phản Xạ Anh Văn Thực Chiến EBOOK'),
        coverImage: '/images/books/1000-cau-phan-xa-white-shirt.png'
      },
      findBookByPartialTitle('500 Vietnamese-English Daily Vocabulary'),
      findBookByPartialTitle('200 Practical Vietnamese'),
      findBookByPartialTitle('AT THE SUPERMARKET 1'),
      findBookByPartialTitle('The Girl with Red Hair')
    ],
    allDownloadUrl: '/downloads/1. STARTER.pdf',
    sampleFileName: 'TRON_BO_COMMUNITY_390_LEOENGLISH.zip'
  },

  // NHÓM 3: COMBO VIP L299
  {
    id: 'nhom-3-l299vip',
    code: 'L299VIP',
    name: 'NHÓM 3: COMBO VIP L299',
    subtitle: 'Combo 4 cuốn sách tinh hoa mở khóa sự lưu loát tức thì',
    badge: 'MÃ TẢI HỌC VIÊN',
    tagline: 'Bộ sách đặc quyền dành cho học viên VIP sở hữu khóa học L299',
    accentColor: '#8B5CF6',
    gradientClass: 'from-purple-950 via-indigo-950 to-purple-900',
    borderGlowClass: 'border-purple-400/60 shadow-[0_0_35px_rgba(139,92,246,0.35)]',
    description: 'Sự kết hợp hoàn hảo giữa lấy gốc tiếng Anh cơ bản, đọc truyện thẩm thấu và 500 cụm từ nói lưu loát tức thì chuẩn Tây.',
    books: [
      findBookByPartialTitle('TIENG ANH CHO NGUOI MAT GOC- STARTER full'),
      findBookByPartialTitle('The Girl with Red Hair'),
      findBookByPartialTitle('500 English Phrases for Instant Fluency'),
      findBookByPartialTitle('500 Vietnamese-English Daily Vocabulary')
    ],
    allDownloadUrl: '/downloads/2. BEGINNER.pdf',
    sampleFileName: 'COMBO_VIP_L299_LEOENGLISH.zip'
  }
];

import { Product } from '../types/product';

export const mapBookToProduct = (book: BookItem): Product => ({
  id: book.id,
  name: book.title,
  slug: book.id,
  category: 'ebook',
  language: book.category === 'chinese' ? 'Chinese' : 'English',
  type: 'ebook',
  description: book.subtitle || book.description,
  fullDescription: book.description,
  originalPrice: book.originalPrice,
  salePrice: book.promoPrice,
  discount: book.discountPercent,
  rating: book.rating || 5.0,
  ratingCount: book.reviewsCount || 100,
  sold: (book.reviewsCount || 100) * 3,
  badge: 'Ưu đãi',
  images: [book.coverImage],
  features: book.highlights,
  includedItems: ['File Ebook PDF chuẩn in màu', 'Quyền đọc trực tuyến', 'Cập nhật trọn đời'],
  targetAudience: [book.level],
  benefits: book.highlights,
  lifetimeAccess: true,
  zaloCatalogUrl: `https://zalo.me/${ADMIN_CONFIG.adminHotline}?text=${encodeURIComponent('Em muốn đặt mua ebook: ' + book.title + ' (Ưu đãi 40.000đ)')}`
});

export const get10PageSamplePdfUrl = (book: BookItem): string => {
  if (book.samplePreviewUrl) return book.samplePreviewUrl;
  if (book.id === 'book-1000-phan-xa' || (book.pdfDownloadUrl && book.pdfDownloadUrl.includes('1000'))) {
    return '/downloads/samples/SAMPLE_10_TRANG_1000_CAU_PHAN_XA.pdf';
  }
  if (book.pdfDownloadUrl && book.pdfDownloadUrl.includes('1. STARTER')) {
    return '/downloads/samples/SAMPLE_10_TRANG_1_STARTER.pdf';
  }
  if (book.pdfDownloadUrl && book.pdfDownloadUrl.includes('2. BEGINNER')) {
    return '/downloads/samples/SAMPLE_10_TRANG_2_BEGINNER.pdf';
  }
  if (book.pdfDownloadUrl && book.pdfDownloadUrl.includes('3. ELEMENTARY')) {
    return '/downloads/samples/SAMPLE_10_TRANG_3_ELEMENTARY.pdf';
  }
  if (book.pdfDownloadUrl && book.pdfDownloadUrl.includes('4. PRE INTER')) {
    return '/downloads/samples/SAMPLE_10_TRANG_4_PRE_INTER.pdf';
  }
  if (book.pdfDownloadUrl && book.pdfDownloadUrl.includes('5. INTERMEDIATE')) {
    return '/downloads/samples/SAMPLE_10_TRANG_5_INTERMEDIATE.pdf';
  }
  return '/downloads/samples/SAMPLE_10_TRANG_1_STARTER.pdf';
};

