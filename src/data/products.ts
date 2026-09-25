import { Product } from '../types/product';

export const ZALO_CATALOG_BASE_URL = 'https://catalog.zalo.me/?cid=CDd8JZoPdmrJrgrSM9UBSYIjerTHu_K7Ei7OL3_--nawlg1FDOFwOm';

export const PRODUCTS_DATA: Product[] = [
  // 1. APP LEO ENGLISH PRO - Gốc 2,3 triệu -> Giảm còn 1,290 triệu
  {
    id: 'prod-leo-english-pro',
    name: 'App LeoEnglish Pro Full Level – Trọn Bộ VIP + TẶNG 4 SÁCH IN MÀU',
    slug: 'app-leoenglish-pro-full-level',
    category: 'Phần mềm tiếng Anh',
    language: 'English',
    type: 'software',
    appType: 'pro',
    description: '🔥 MỞ KHÓA TOÀN BỘ CÁC LEVEL HỌC. Giá gốc 2,3 triệu GIẢM CÒN 1,290 triệu. Trọn bộ lộ trình 3 tháng/level + Xem đầy đủ video học + TẶNG KÈM 4 SÁCH IN MÀU!',
    fullDescription: 'LEO ENGLISH PRO – GIẢI PHÁP TIẾNG ANH GIAO TIẾP TOÀN DIỆN:\n\n🎓 Mở khóa toàn bộ các Level học từ cơ bản đến nâng cao trên ứng dụng Leo English Pro.\n✅ Mỗi Level có lộ trình học bài bản trong 3 tháng, bám sát giao tiếp thực chiến.\n✅ Mở khóa 100% bài học và hệ thống video giảng dạy sinh động.\n✅ TẶNG KÈM TRỌN BỘ 4 CUỐN SÁCH IN MÀU cao cấp chuyển phát tận nhà miễn phí!\n✅ Tích hợp công nghệ nhận diện giọng nói AI sửa phát âm chuẩn người bản xứ.\n✅ Đặc quyền kết nối và chữa bài 1:1 trực tiếp cùng Thầy Leo qua Zalo 0799713094.',
    originalPrice: 2300000,
    salePrice: 1290000,
    discount: 44,
    rating: 5.0,
    ratingCount: 4250,
    sold: 8920,
    badge: 'Độc quyền',
    zaloCatalogUrl: 'https://catalog.zalo.me/?cid=CDd8JZoPdmrJrgrSM9UBSYIjerTHu_K7Ei7OL3_--nawlg1FDOFwOm&pid=9f625b39567cbf22e66d',
    images: [
      '/images/zalo/leo-pro-1.jpg',
      '/images/zalo/leo-pro-2.jpg',
      '/images/zalo/leo-pro-3.jpg',
      '/images/zalo/leo-pro-4.jpg',
      '/images/books/leo-english-starter.png'
    ],
    features: [
      '🔥 Giá gốc 2.300.000đ GIẢM CÒN 1.290.000 VNĐ (Tiết kiệm 1.010.000đ - 44%)',
      '🎁 TẶNG KÈM TRỌN BỘ 4 CUỐN SÁCH IN MÀU CAO CẤP GIAO TẬN NHÀ',
      'Mở khóa trọn bộ tất cả các Level từ mất gốc đến nâng cao',
      'Mỗi Level lộ trình 3 tháng với đầy đủ video bài giảng chuyên sâu',
      'AI chấm điểm phát âm & sửa ngữ điệu chuẩn giọng Mỹ',
      'Sở hữu tài khoản VIP vĩnh viễn trên Smartphone và Máy tính',
      'Hỗ trợ chữa bài trực tiếp 1:1 qua Zalo 0799713094'
    ],
    includedItems: [
      'Tài khoản VIP Full Level App LeoEnglish Pro (Sở hữu vĩnh viễn)',
      'Kho video bài giảng độc quyền tích hợp trong ứng dụng',
      'Bộ 4 cuốn sách in màu cao cấp giao tận tay',
      'Đặc quyền sửa lỗi phát âm 1:1 cùng giáo viên'
    ],
    targetAudience: [
      'Người từ mất gốc muốn chinh phục tiếng Anh từ cơ bản đến thành thạo',
      'Người đi làm, sinh viên cần phản xạ giao tiếp trôi chảy tự tin'
    ],
    benefits: [
      'Miễn phí vận chuyển sách in trên toàn quốc',
      'Kích hoạt tài khoản VIP ngay lập tức trong 30 giây',
      'Alo/nhắn Zalo 0799713094 nhận ưu đãi'
    ],
    lifetimeAccess: true,
    thickness: 52,
    spineColor: '#BF360C',
    coverAccent: '#F5B700'
  },

  // 2. APP MANDALEO TIẾNG TRUNG - Gốc 799k (hoặc 955k) -> Giảm còn 299k
  {
    id: 'prod-mandaleo-chinese-software',
    name: 'App MandaLeo – Phần Mềm Học Tiếng Trung HSK 1–6 & Giao Tiếp Đột Phá',
    slug: 'app-mandaleo-tieng-trung-hsk-1-6',
    category: 'Phần mềm tiếng Trung',
    language: 'Chinese',
    type: 'software',
    appType: 'mandaleo',
    description: 'Chinh phục HSK 1–6 và phản xạ tiếng Trung cùng MandaLeo. Giá gốc 799k GIẢM CÒN 299k. AI sửa thanh điệu chuẩn, Flashcard 3D, 3 câu tiếng Trung dùng mỗi ngày!',
    fullDescription: 'MandaLeo là ứng dụng học tiếng Trung hiện đại dành cho người Việt, với lộ trình bài bản từ HSK 1 đến HSK 6.\n\nỨng dụng bao gồm:\n✅ Từ vựng và hệ thống Flashcard 3D ôn tập thông minh\n✅ Luyện nghe, hội thoại phản xạ trực tiếp\n✅ Luyện đọc và viết chữ Hán theo quy tắc nét chuẩn\n✅ Theo dõi tiến độ học tập chi tiết\n✅ Giáo trình từ cơ bản đến nâng cao + Đề thi thử HSK quốc tế\n\nMức giá ưu đãi đặc biệt: Giá gốc 799.000đ GIẢM CÒN 299.000 VNĐ, sở hữu vĩnh viễn!',
    originalPrice: 799000,
    salePrice: 299000,
    discount: 63,
    rating: 4.98,
    ratingCount: 3120,
    sold: 6800,
    badge: 'Bán chạy',
    zaloCatalogUrl: 'https://catalog.zalo.me/?cid=CDd8JZoPdmrJrgrSM9UBSYIjerTHu_K7Ei7OL3_--nawlg1FDOFwOm&pid=1c9932bc3ef9d7a78ee8',
    images: [
      '/images/zalo/mandaleo-1.jpg',
      '/images/zalo/mandaleo-2.jpg',
      '/images/zalo/mandaleo-3.jpg',
      '/images/zalo/mandaleo-4.jpg',
      '/images/mandaleo/mandaleo-banner.png'
    ],
    features: [
      '🔥 Giá gốc 799.000đ GIẢM CÒN 299.000 VNĐ (Tiết kiệm 500.000đ - 63%)',
      'Lộ trình đầy đủ từ HSK 1 đến HSK 6 cho người mới bắt đầu',
      'Công nghệ AI nhận diện giọng nói chấm điểm 4 thanh điệu chuẩn xác',
      '5000+ từ vựng & ngữ pháp nhớ lâu qua Flashcard 3D đa giác quan',
      'Mỗi ngày cập nhật 3 câu tiếng Trung giao tiếp thực tế ứng dụng ngay',
      'Mascot sư tử MandaLeo đồng hành vui nhộn, tạo động lực học',
      'Bản quyền sở hữu trọn đời – Dùng trên iOS, Android, PC & Mac'
    ],
    includedItems: [
      'Tài khoản VIP MandaLeo trọn đời mở khóa HSK 1 đến HSK 6',
      'Kho đề thi thử HSK chuẩn quốc tế có đáp án giải thích',
      'Hỗ trợ cài đặt và kích hoạt siêu tốc qua Zalo 0799713094'
    ],
    targetAudience: [
      'Người học tiếng Trung từ số 0 cần nền tảng phát âm và chữ viết vững chắc',
      'Người luyện thi HSK 1-6 hoặc buôn bán, giao thương, du lịch Trung Quốc'
    ],
    benefits: [
      'Cập nhật bài học & đề thi mới miễn phí trọn đời',
      'Alo/nhắn Zalo 0799713094 nhận mã kích hoạt liền tay'
    ],
    lifetimeAccess: true
  },

  // 3. APP LEO 10 - Gốc 599k -> Giảm còn 299k
  {
    id: 'prod-leo-10-software',
    name: 'App LEO 10 – Luyện Phản Xạ Giao Tiếp Tiếng Anh 10 Cấp Độ Đột Phá',
    slug: 'app-leo-10-luyen-phan-xa-10-cap-do',
    category: 'Phần mềm tiếng Anh',
    language: 'English',
    type: 'software',
    appType: 'leo10',
    description: 'Bứt phá phản xạ nói tiếng Anh tự nhiên với 10 Cấp độ thực chiến. Giá gốc 599k GIẢM CÒN 299k. Phương pháp Swivox, audio người bản ngữ, sở hữu vĩnh viễn!',
    fullDescription: 'HỆ SINH THÁI LEO10 – BỨT PHÁ PHẢN XẠ NÓI TIẾNG ANH:\n\nLEO10 hiện đã có phần mềm học kèm đột phá, cho phép người học:\n✅ Học tương tác trực tiếp ngay trên ứng dụng di động\n✅ Trò chuyện, luyện khẩu ngữ cùng cộng đồng học viên\n✅ Theo dõi lộ trình và được vinh danh thành tích học tập\n✅ 10 Chặng bứt phá phản xạ từ đời sống thường nhật đến chuyên sâu\n\n💥 MỨC GIÁ ƯU ĐÃI ĐẶC BIỆT: Giá gốc 599.000đ GIẢM CÒN 299.000 VNĐ (Sở hữu vĩnh viễn)!',
    originalPrice: 599000,
    salePrice: 299000,
    discount: 50,
    rating: 4.96,
    ratingCount: 2150,
    sold: 4500,
    badge: 'Hot',
    zaloCatalogUrl: 'https://catalog.zalo.me/?cid=CDd8JZoPdmrJrgrSM9UBSYIjerTHu_K7Ei7OL3_--nawlg1FDOFwOm&pid=4567d534d971302f6960',
    images: [
      '/images/zalo/leo-10-1.jpg',
      '/images/zalo/leo-10-2.jpg',
      '/images/zalo/leo-10-3.jpg',
      '/images/apps/elementary tiger.png'
    ],
    features: [
      '🔥 Giá gốc 599.000đ GIẢM CÒN 299.000 VNĐ (Tiết kiệm 300.000đ - 50%)',
      '10 Cấp độ phản xạ giao tiếp Anh ngữ theo lộ trình bài bản',
      'Ứng dụng phương pháp phản xạ Swivox độc quyền: Nghe – Nhại – Bật câu trong 3 giây',
      'Audio người bản xứ chuẩn Mỹ, điều chỉnh linh hoạt tốc độ',
      'Hệ thống game tương tác và bảng thành tích động lực mỗi ngày',
      'Sở hữu tài khoản vĩnh viễn không đóng thêm bất kỳ phí gia hạn nào'
    ],
    includedItems: [
      'Mã kích hoạt App LEO 10 trọn đời',
      'Tài liệu ôn tập và bộ câu phản xạ độc quyền'
    ],
    targetAudience: [
      'Người học tiếng Anh lâu năm nhưng phản xạ chậm, ngập ngừng',
      'Học sinh, sinh viên, người đi làm cần tự tin giao tiếp cấp tốc'
    ],
    benefits: [
      'Sở hữu vĩnh viễn',
      'Hỗ trợ kỹ thuật và phương pháp qua Zalo 0799713094'
    ],
    lifetimeAccess: true
  },

  // 4. APP LEOENGLISH 1000 PHẢN XẠ - Gốc 150k -> Giảm sốc còn 30k
  {
    id: 'prod-leoenglish-1000-phan-xa',
    name: 'App LeoEnglish 1000 Phản Xạ – 1000 Câu Giao Tiếp Thần Tốc Thực Chiến',
    slug: 'app-leoenglish-1000-cau-phan-xa-giao-tiep',
    category: 'Phần mềm tiếng Anh',
    language: 'English',
    type: 'software',
    appType: '1000reflex',
    description: '1000 Mẫu câu phản xạ thực chiến bấm nghe trực tiếp. Giá gốc 150k GIẢM SỐC CHỈ CÒN 30K. Bật app luyện nghe nói phản xạ 3 giây mọi lúc mọi nơi!',
    fullDescription: 'APP 🌿 LEOENGLISH 1000 CÂU PHẢN XẠ THỰC CHIẾN:\n\nCẩm nang số bỏ túi thông minh giúp bạn làm chủ 1000 câu giao tiếp thực chiến thông dụng nhất ngoài đời thực:\n✅ Phủ kín 30+ tình huống: Sân bay, Khách sạn, Nhà hàng, Mua sắm, Du lịch, Công sở, Kết bạn...\n✅ Chỉ cần 1 chạm để nghe audio phát âm giọng Mỹ chuẩn studio\n✅ Tự động luyện phản xạ 3 giây không cần dịch nhẩm trong đầu\n✅ Flashcard số thông minh và chế độ lặp lại ngắt quãng khoa học\n\n💥 GIÁ TRẢI NGHIỆM SIÊU SỐC: Giá gốc 150.000đ GIẢM CÒN 30.000 VNĐ duy nhất hôm nay!',
    originalPrice: 150000,
    salePrice: 30000,
    discount: 80,
    rating: 4.95,
    ratingCount: 5600,
    sold: 12400,
    badge: 'Ưu đãi',
    zaloCatalogUrl: 'https://catalog.zalo.me/?cid=CDd8JZoPdmrJrgrSM9UBSYIjerTHu_K7Ei7OL3_--nawlg1FDOFwOm&pid=8bc2808f8dca64943ddb',
    images: [
      '/images/zalo/leo-1000-1.jpg',
      '/images/zalo/leo-1000-2.jpg',
      '/images/zalo/leo-1000-3.jpg',
      '/images/books/1000 CÂU THỰC CHIẾN A1.jpg'
    ],
    features: [
      '🔥 Giá gốc 150.000đ GIẢM SỐC CHỈ CÒN 30.000 VNĐ (Tiết kiệm 80%)',
      '1000 mẫu câu phản xạ giao tiếp thực tế bấm nghe tức thì',
      'Audio người bản xứ chuẩn Mỹ giọng trong trẻo, dễ nghe',
      'Luyện phản xạ 3 giây thần tốc xóa bỏ thói quen dịch nhẩm',
      'Giao diện cực kỳ gọn nhẹ, học mượt mà trên mọi smartphone',
      'Sở hữu vĩnh viễn trọn đời chỉ với 30k duy nhất 1 lần'
    ],
    includedItems: [
      'Tài khoản App LeoEnglish 1000 Phản Xạ vĩnh viễn',
      'File âm thanh Audio tổng hợp MP3 nghe thụ động'
    ],
    targetAudience: [
      'Mọi đối tượng muốn tích lũy nhanh những câu nói tiếng Anh thực tế nhất',
      'Người chuẩn bị đi nước ngoài, du lịch, xuất khẩu lao động'
    ],
    benefits: [
      'Giá siêu rẻ chỉ 30k – Ai cũng có thể sở hữu',
      'Nhắn Zalo 0799713094 nhận mã kích hoạt trong 30 giây'
    ],
    lifetimeAccess: true
  },

  // 5. COMBO APP + SÁCH EBOOK (GÓI VĨNH VIỄN) - Gốc 1.500k -> 950k
  {
    id: 'prod-combo-app-sach-ebook',
    name: 'Combo App LEO English + Sách Ebook (Gói Vĩnh Viễn)',
    slug: 'combo-app-leo-english-sach-ebook-vinh-vien',
    category: 'Combo ưu đãi',
    language: 'English',
    type: 'combo',
    appType: 'combo',
    description: 'Dành cho học viên mới (Starter): Ứng dụng hỗ trợ đầy đủ kỹ năng Nghe – Nói – Đọc – Viết – Từ vựng – Ngữ pháp + Sách Ebook trọn đời.',
    fullDescription: 'Dành cho học viên mới không đăng ký theo nhóm hay khóa Zoom:\n💎 Gói vĩnh viễn: 950.000 VNĐ (Bao gồm App + Sách Ebook tương tác trọn đời)\n📚 Ứng dụng hỗ trợ đầy đủ 6 kỹ năng then chốt: Nghe – Nói – Đọc – Viết – Từ vựng – Ngữ pháp.\n🚀 Học mọi lúc, mọi nơi – Tiến bộ nhanh chóng rõ rệt sau 30 ngày.',
    originalPrice: 1500000,
    salePrice: 950000,
    discount: 37,
    rating: 4.97,
    ratingCount: 1850,
    sold: 3800,
    badge: 'Bán chạy',
    zaloCatalogUrl: 'https://catalog.zalo.me/?cid=CDd8JZoPdmrJrgrSM9UBSYIjerTHu_K7Ei7OL3_--nawlg1FDOFwOm&pid=56fe9bda889f61c1388e',
    images: [
      '/images/zalo/combo-app-sach-1.jpg',
      '/images/zalo/combo-app-sach-2.jpg'
    ],
    features: [
      'Gói bản quyền phần mềm + Sách Ebook học vĩnh viễn: 950.000 VNĐ',
      'Đầy đủ kỹ năng: Nghe, Nói, Đọc, Viết, Từ vựng và Ngữ pháp',
      'Tích hợp Ebook tương tác phát âm thanh trên điện thoại & máy tính',
      'Tự chủ thời gian học tập 24/7'
    ],
    includedItems: [
      'Tài khoản phần mềm LEO English vĩnh viễn',
      'Bộ Ebook bản quyền phát âm thanh trực tiếp'
    ],
    targetAudience: [
      'Người tự học tiếng Anh cần bộ công cụ App + Ebook tương tác tiện lợi'
    ],
    benefits: [
      'Alo thầy qua Zalo 0799713094 để nhận mã kích hoạt ngay'
    ],
    lifetimeAccess: true,
    thickness: 40,
    spineColor: '#E65100',
    coverAccent: '#F5B700'
  },

  // 6. LỘ TRÌNH LỚP GIAO TIẾP 24 BÀI + APP - Gốc 4.500k -> 2.900k
  {
    id: 'prod-lotrinh-lop-giaotiep-app',
    name: 'Lộ Trình Lớp Giao Tiếp 24 Bài + Ứng Dụng Học Tương Tác',
    slug: 'lo-trinh-lop-giao-tiep-ung-dung-hoc',
    category: 'Combo ưu đãi',
    language: 'English',
    type: 'combo',
    appType: 'course',
    description: 'Lộ trình Starter English gồm 24 bài học cho người mới bắt đầu. Kết hợp giáo trình + ứng dụng học tương tác.',
    fullDescription: 'Lộ trình Starter English gồm 24 bài học chuyên sâu, được thiết kế dành riêng cho người mới bắt đầu, tập trung phát triển:\n✅ Từ vựng, Ngữ pháp ứng dụng\n✅ Hội thoại tình huống thực tế\n✅ Phản xạ giao tiếp tự nhiên chuẩn Swivox\n\nKết hợp giáo trình chuẩn quốc tế + Ứng dụng học tương tác thông minh, giúp học viên học dễ hơn, nhớ lâu hơn và từng bước tự tin làm chủ tiếng Anh.',
    originalPrice: 4500000,
    salePrice: 2900000,
    discount: 36,
    rating: 5.0,
    ratingCount: 890,
    sold: 1950,
    badge: 'Độc quyền',
    zaloCatalogUrl: 'https://catalog.zalo.me/?cid=CDd8JZoPdmrJrgrSM9UBSYIjerTHu_K7Ei7OL3_--nawlg1FDOFwOm&pid=9134813b8d7e64203d6f',
    images: [
      '/images/zalo/lotrinh-giaotiep-1.jpg',
      '/images/zalo/lotrinh-giaotiep-2.jpg'
    ],
    features: [
      'Lộ trình 24 bài học từ vựng, ngữ pháp và phản xạ giao tiếp',
      'Được hướng dẫn và sửa lỗi phát âm trực tiếp',
      'Tặng kèm ứng dụng học tập thông minh tương tác trên điện thoại',
      'Cam kết tự tin giao tiếp sau lộ trình'
    ],
    includedItems: [
      'Khóa học 24 bài theo lộ trình bài bản',
      'Ứng dụng học kèm hỗ trợ vĩnh viễn'
    ],
    targetAudience: [
      'Người mới bắt đầu hoặc mất gốc cần người đồng hành và lộ trình rõ ràng'
    ],
    benefits: [
      'Liên hệ Zalo 0799713094 để xếp lớp và nhận ưu đãi'
    ],
    lifetimeAccess: true
  },

  // 7. GÓI VIP 850K ĐỌC MỌI SÁCH VĨNH VIỄN
  {
    id: 'prod-goi-vip-lifetime-library',
    name: '🌟 GÓI VIP 850K – Đọc & Học Mọi Sách, Ebook Không Giới Hạn!',
    slug: 'goi-vip-850k-doc-moi-sach-khong-gioi-han',
    category: 'Combo ưu đãi',
    language: 'Both',
    type: 'combo',
    description: '🌟 GÓI VIP 850k – Đọc mọi sách không giới hạn! Quyền truy cập toàn bộ kho Sách, Ebook Tiếng Anh - Tiếng Trung trọn đời.',
    fullDescription: 'Quyền lợi độc quyền cao cấp nhất tại LEO EDUCATION: Chỉ 850.000 VNĐ cho Gói VIP Trọn Đời. Bạn được tải và đọc TẤT CẢ các đầu sách in, Ebook tiếng Anh, Ebook tiếng Trung HSK, tài liệu Business & IELTS mà không phát sinh thêm bất kỳ chi phí nào.',
    originalPrice: 2500000,
    salePrice: 850000,
    discount: 66,
    rating: 5.0,
    ratingCount: 2950,
    sold: 5100,
    badge: 'Độc quyền',
    zaloCatalogUrl: ZALO_CATALOG_BASE_URL,
    images: [
      '/images/books/TỔNG SÁCH.jpg',
      '/images/zalo/mandaleo-1.jpg'
    ],
    features: [
      '🌟 GÓI VIP 850k – ĐỌC MỌI SÁCH KHÔNG GIỚI HẠN',
      'Sở hữu trọn đời kho Sách & Ebook Tiếng Anh + Tiếng Trung',
      'Truy cập ứng dụng MandaLeo HSK 1-6 & App LEO English',
      'Cập nhật miễn phí 100% tất cả các đầu sách xuất bản mới'
    ],
    includedItems: [
      'Tài khoản VIP Đọc Sách Không Giới Hạn trọn đời',
      'Trọn bộ Ebook PDF Interactive phát ra âm thanh'
    ],
    targetAudience: [
      'Học viên học cả tiếng Anh lẫn tiếng Trung lâu dài'
    ],
    benefits: [
      'Alo thầy qua Zalo 0799713094 để kích hoạt thẻ VIP'
    ],
    lifetimeAccess: true,
    thickness: 50,
    spineColor: '#BF360C',
    coverAccent: '#F5B700'
  },

  // 8. BỘ SÁCH BUSINESS ENGLISH (TẬP 1 - 4)
  {
    id: 'prod-business-english-series',
    name: 'Bộ Sách Business & Giao Tiếp Thương Mại (Tập 1 - 4)',
    slug: 'bo-sach-business-english-mastery',
    category: 'Sách tiếng Anh',
    language: 'English',
    type: 'book',
    description: 'Business & Giao tiếp – 80k/quyển. Mua 4 tặng 2. Mua 10 chỉ còn 400k + TẶNG 2 sách khác loại!',
    fullDescription: 'Bộ 4 tập Business English bao gồm: Viết Email chuyên nghiệp, Đàm phán Hợp đồng, Thuyết trình Dự án và Giao tiếp Nhân sự. Áp dụng ưu đãi mua 4 tặng 2, mua 10 trọn bộ chỉ 400k!',
    originalPrice: 400000,
    salePrice: 80000,
    discount: 80,
    rating: 5.0,
    ratingCount: 640,
    sold: 1450,
    badge: 'Độc quyền',
    zaloCatalogUrl: ZALO_CATALOG_BASE_URL,
    images: [
      '/images/books/BUSINESS 1.jpg',
      '/images/books/BUSINESS 2.jpg',
      '/images/books/BUSINESS 3.jpg',
      '/images/books/BUSINESS 4.jpg'
    ],
    features: [
      'Giá lẻ: 80.000 VNĐ / quyển',
      'Ưu đãi siêu hời: Mua 4 TẶNG 2 quyển',
      'Đặc biệt: Mua 10 quyển chỉ 400.000 VNĐ + TẶNG 2 sách khác loại!',
      'Hơn 200 mẫu email thương mại thực tế có thể copy dùng ngay'
    ],
    includedItems: [
      'Bộ sách in chất lượng cao',
      'Bộ template Email & Slide thuyết trình PowerPoint'
    ],
    targetAudience: [
      'Giám đốc, Quản lý, Trưởng phòng làm việc với nước ngoài',
      'Nhân viên Sales, Marketing, HR công ty đa quốc gia'
    ],
    benefits: [
      'Miễn phí vận chuyển toàn quốc'
    ],
    lifetimeAccess: true,
    thickness: 48,
    spineColor: '#3E2723',
    coverAccent: '#FF8A3D'
  },

  // 9. SÁCH & EBOOK IELTS WRITING MASTERY
  {
    id: 'prod-ielts-writing-mastery',
    name: 'Sách & Ebook IELTS Writing Mastery - Chinh Phục Điểm Cao',
    slug: 'sach-ebook-ielts-writing-mastery',
    category: 'Sách tiếng Anh',
    language: 'English',
    type: 'book',
    description: '🔹 IELTS – Giá chỉ 80k/quyển cho hành trình chinh phục điểm cao! Từ vựng & Cấu trúc ngữ pháp IELTS Task 1 & 2.',
    fullDescription: 'Nâng tầm kỹ năng viết (Writing) IELTS với quy trình 4 bước: Từ vựng band cao -> Cấu trúc ăn điểm -> Liên kết đoạn -> Chỉnh sửa lỗi.',
    originalPrice: 200000,
    salePrice: 80000,
    discount: 60,
    rating: 4.92,
    ratingCount: 830,
    sold: 2100,
    badge: 'Bán chạy',
    zaloCatalogUrl: ZALO_CATALOG_BASE_URL,
    images: [
      '/images/books/WRITING.jpg',
      '/images/books/Bản sao của WRITING (6).png'
    ],
    features: [
      '🔹 IELTS đồng giá siêu mềm: Chỉ 80k/quyển!',
      'Phân tích 50 cấu trúc ngữ pháp ăn điểm IELTS 7.0+',
      'Hơn 100 bài luận mẫu Task 1 & Task 2 có dịch nghĩa'
    ],
    includedItems: [
      'Sách Writing Mastery in màu',
      'Ebook bổ trợ 200 bài luận mẫu chọn lọc'
    ],
    targetAudience: [
      'Học sinh, sinh viên luyện thi IELTS, TOEIC, VSTEP'
    ],
    benefits: [
      'Tặng gói tài liệu từ vựng IELTS'
    ],
    lifetimeAccess: true,
    thickness: 32,
    spineColor: '#C62828',
    coverAccent: '#FF8A3D'
  }
];
