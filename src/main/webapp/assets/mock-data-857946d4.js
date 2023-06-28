const n=[{icon:"mdi:mdi-badge-account-horizontal-outline",title:"Hồ sơ ĐGTĐ xử lý DLCN",class:"xu-ly-tab",id:"xulydulieu",to:"/xu-ly-du-lieu",counter:0,headerTable:[{sortable:!1,title:"STT",align:"center",key:"stt",type:"index",class:"td-center",width:50},{sortable:!1,title:"Mã hồ sơ",align:"center",key:"MaDinhDanh",class:"td-left",width:200},{sortable:!1,title:"Tên hồ sơ",align:"center",key:"TrichYeuHoSo",class:"td-left"},{sortable:!1,title:"Ngày tạo",align:"center",key:"ThoiGianTao",class:"td-left",type:"datetime",width:150},{sortable:!1,title:"Tình trạng hồ sơ",align:"center",key:"TrangThaiHoSo",class:"td-center",type:"object",mapping:"TenMuc",width:150},{sortable:!1,title:"Thao tác",align:"center",key:"thaotac",type:"action",class:"td-center",width:120}],dossierName:"Đánh giá tác động xử lý dữ liệu cá nhân",thuTuc:{maThuTuc:"DGTD_XLDLCN",tenThuTuc:"Hồ sơ đánh giá tác động xử lý dữ liệu"},thuTucThayDoi:{maThuTuc:"TDND_DGTD_XLDLCN",tenThuTuc:"Thay đổi nội dung hồ sơ đánh giá tác động xử lý dữ liệu"}},{icon:"mdi:mdi-ballot-recount-outline",title:"Hồ sơ ĐGTĐ chuyển DLCN ra nước ngoài",class:"chuyen-du-lieu-tab",id:"chuyendulieu",to:"/chuyen-du-lieu",counter:0,headerTable:[{sortable:!1,title:"STT",align:"center",key:"stt",type:"index",class:"td-center",width:50},{sortable:!1,title:"Mã hồ sơ",align:"center",key:"MaDinhDanh",class:"td-left",width:200},{sortable:!1,title:"Tên hồ sơ",align:"center",key:"TrichYeuHoSo",class:"td-left"},{sortable:!1,title:"Ngày tạo",align:"center",key:"ThoiGianTao",class:"td-left",type:"datetime",width:150},{sortable:!1,title:"Tình trạng hồ sơ",align:"center",key:"TrangThaiHoSo",class:"td-center",type:"object",mapping:"TenMuc",width:150},{sortable:!1,title:"Thao tác",align:"center",key:"thaotac",type:"action",class:"td-center",width:120}],dossierName:"Đánh giá tác động chuyển dữ liệu cá nhân ra nước ngoài",thuTuc:{maThuTuc:"DGTD_CDLCN",tenThuTuc:"Hồ sơ đánh giá tác động chuyển dữ liệu cá nhân ra nước ngoài"},thuTucThayDoi:{maThuTuc:"TDND_DGTD_CDLCN",tenThuTuc:"Thay đổi nội dung hồ sơ đánh giá tác động chuyển dữ liệu cá nhân ra nước ngoài"}},{icon:"mdi:mdi-message-badge-outline",title:"Thông báo vi phạm xử lý DLCN",class:"thong-bao-tab",id:"thongbaovipham",to:"/thong-bao-vi-pham",counter:0,headerTable:[{sortable:!1,title:"STT",align:"center",key:"stt",type:"index",class:"td-center",width:50},{sortable:!1,title:"Mã hồ sơ",align:"center",key:"MaDinhDanh",class:"td-left",width:200},{sortable:!1,title:"Tên hồ sơ",align:"center",key:"TrichYeuHoSo",class:"td-left"},{sortable:!1,title:"Ngày tạo",align:"center",key:"ThoiGianTao",class:"td-left",type:"datetime",width:150},{sortable:!1,title:"Tình trạng hồ sơ",align:"center",key:"TrangThaiHoSo",class:"td-center",type:"object",mapping:"TenMuc",width:150},{sortable:!1,title:"Thao tác",align:"center",key:"thaotac",type:"action",class:"td-center",width:120}],dossierName:"Thông báo vi phạm xử lý dữ liệu cá nhân",thuTuc:{maThuTuc:"TBVP",tenThuTuc:"Thông báo vi phạm quy định về bảo vệ dữ liệu cá nhân"}},{icon:"mdi:mdi-bell-badge-outline",title:"Tin nhắn, thông báo",class:"thong-bao-tab",id:"thongbao",to:"/thong-bao",counter:0,headerTable:[],dossierName:""}],a=[{maThuTuc:"TBVP",tenThuTuc:"Thông báo vi phạm quy định về bảo vệ dữ liệu cá nhân",mauEform:"",mauHienThiBieuMau:{thongTinChuHoSo:{group:!0,title:"Thông tin tổ chức, cá nhân thực hiện thông báo vi phạm",content:[{title:"- Tên gọi của cá nhân, tổ chức",value:"TenGoi",mapping:"",class:"v-col-12 py-0 pt-2 px-0",type:""},{title:"- Số giấy chứng nhận cá nhân, tổ chức",value:"GiayChungNhan",mapping:"SoGiay",class:"v-col-12 py-0 pt-2 px-0",type:"object"},{title:"- Ngày cấp giấy chứng nhận",value:"GiayChungNhan",mapping:"NgayCap",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0",type:"obj-date"},{title:"- Nơi cấp giấy chứng nhận",value:"GiayChungNhan",mapping:"NoiCap",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0",type:"object"},{title:"- Địa chỉ trụ sở chính / đăng ký thường trú",value:"DiaChiHoatDong",mapping:"",type:"fulladdress",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Địa chỉ trụ sở giao dịch / địa chỉ nơi ở hiện nay",value:"DiaChiLienHe",mapping:"",type:"fulladdress",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Số điện thoại",value:"SoDienThoai",mapping:"",type:"",class:"v-col-12 v-col-md-4 py-0 pt-2 px-0"},{title:"- Email",value:"Email",mapping:"",type:"",class:"v-col-12 v-col-md-4 py-0 pt-2 px-0"},{title:"- Website",value:"Website",mapping:"",type:"",class:"v-col-12 v-col-md-4 py-0 pt-2 px-0"}],class:"v-col-12 py-0 px-0 pt-2"},nguoiLienHe:{group:!0,title:"Thông tin cá nhân phụ trách/ người liên hệ",content:[{title:"- Họ và tên",value:"HoVaTen",type:"",mapping:"",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0"},{title:"- Chức danh",value:"ChucDanh",type:"",mapping:"",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0"},{title:"- Email",value:"Email",type:"",mapping:"",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0"},{title:"- Số điện thoại",value:"SoDienThoai",type:"",mapping:"",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0"}],class:"v-col-12 py-0 px-0 pt-2"},noiDungDanhGia:{group:!0,title:"Nội dung thông báo vi phạm xử lý dữ liệu cá nhân",content:[{title:"- Nội dung báo cáo vi phạm",value:"NoiDungViPham",mapping:"TenMuc",type:"danhmucNdvp",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Thời gian vi phạm",value:"ThoiGianViPham",mapping:"",type:"date",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Địa điểm vi phạm",value:"DiaDiemViPham",mapping:"",type:"",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Tổ chức, cá nhân liên quan",value:"ToChucCaNhanLienQuan",mapping:"",type:"",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Loại dữ liệu cá nhân cơ bản vi phạm liên quan",value:"LoaiDLCNCoBan",mapping:"TenMuc",type:"danhmuc",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Loại dữ liệu cá nhân nhạy cảm vi phạm liên quan",value:"LoaiDLCNNhayCam",mapping:"TenMuc",type:"danhmuc",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Số lượng dữ liệu vi phạm liên quan",value:"SoLuongDuLieu",mapping:"",type:"",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Hậu quả xảy ra",value:"HauQuaXayRa",mapping:"",type:"",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Biện pháp áp dụng",value:"BienPhapApDung",mapping:"",type:"",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Vi phạm đã xảy ra trước 72 tại thời điểm thông báo?",value:"ThongBaoSau72H",mapping:"",type:"boolean",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Lý do chậm muộn thực hiện thông báo sau 72h",value:"LyDoChamMuon",mapping:"",type:"",class:"v-col-12 py-0 pt-2 px-0"}],class:"v-col-12 py-0 px-0 pt-2"}},thongTinHoSo:{ThuTucHanhChinh:{MaMuc:"TBVP",TenMuc:"Thông báo vi phạm quy định về bảo vệ dữ liệu cá nhân"},LinhVucThuTuc:[],KenhThucHienHoSo:{},ChuHoSo:{MaDinhDanh:"",LoaiDoiTuong:{MaMuc:"",TenMuc:""},MaDoiTuong:"",TenGoi:"",ThongTinKhac:"",DanhBaLienLac:{SoFax:"",ThuDienTu:"",SoDienThoai:""},DiaChi:{SoNhaChiTiet:"",TinhThanh:{MaMuc:"",TenMuc:""},HuyenQuan:{MaMuc:"",TenMuc:""},XaPhuong:{MaMuc:"",TenMuc:""}}},NguoiNopHoSo:{MaDinhDanh:"",TenGoi:"",ThongTinKhac:"",DanhBaLienLac:{SoFax:"",ThuDienTu:"",SoDienThoai:""},DiaChi:{SoNhaChiTiet:"",TinhThanh:{MaMuc:"",TenMuc:""},HuyenQuan:{MaMuc:"",TenMuc:""},XaPhuong:{MaMuc:"",TenMuc:""}}},TrichYeuHoSo:"",MaDinhDanh:"",NgayNopHoSo:"",NgayTiepNhan:"",NgayHenTra:"",NgayTra:"",ThongTinTra:"",HinhThucTraHoSo:{ThoiGianTao:"",ThoiGianCapNhat:"",TrangThaiDuLieu:{MaMuc:"",TenMuc:""},MaMuc:"",TenMuc:"",MaPhienBan:"",MaDinhDanh:""},NgayKetThucXuLy:"",NgayTuChoi:"",ThoiGianGiaiQuyet:"",SoNgayChamHan:"",LyDoChamHan:"",DonViXuLy:{MaMuc:"G01.105",TenMuc:"Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao"},TrangThaiHoSo:{MaMuc:"00",TenMuc:"Chưa gửi"},GhiChuKetQua:"",MaTruongHop:"",HoSoCoThanhPhanSoHoa:!0,ThanhPhanHoSo:[{IDGiayTo:"BMDT_TBVP",TenGiayTo:"Biểu mẫu điện tử",SoBanGiay:0,HinhThucGiayTo:{ThoiGianTao:"",ThoiGianCapNhat:"",TrangThaiDuLieu:{MaMuc:"",TenMuc:""},MaMuc:"",TenMuc:"",MaPhienBan:"",MaDinhDanh:""},NgayBoSung:"",MaThanhPhanHoSo:{MaMuc:"BMDT_TBVP",TenMuc:"Thành phần biểu mẫu điện tử"},MaGiayToKetQua:{MaMuc:"",TenMuc:""},DaHuyBoThayThe:!1,TinhTrangSoHoa:1,GiayToLuuTruSo:{MaDinhDanh:"",TenGiayTo:""},TepDuLieu:{MaDinhDanh:"",TenTep:"",DinhDangTep:"",KichThuocTep:0,DuongDanURL:""},BieuMauDienTu:{MaMuc:"",TenMuc:""},IDBanGhi:""},{IDGiayTo:"TBVP_TP1",TenGiayTo:"Tài liệu kèm theo (hình ảnh, tài liệu, văn bản liên quan tới hành vi vi phạm)",SoBanGiay:0,HinhThucGiayTo:{MaMuc:"true",TenMuc:"false"},NgayBoSung:"",MaThanhPhanHoSo:{MaMuc:"TBVP_TP1",TenMuc:"Mã thành phần 1"},MaGiayToKetQua:{MaMuc:"",TenMuc:""},DaHuyBoThayThe:!1,TinhTrangSoHoa:1,GiayToLuuTruSo:{MaDinhDanh:"",TenGiayTo:""},TepDuLieu:{MaDinhDanh:"",TenTep:"",DinhDangTep:"",KichThuocTep:0,DuongDanURL:""},BieuMauDienTu:{MaMuc:"",TenMuc:""},IDBanGhi:""}],GiaHanHenTra:[],BoSungHoSo:[],PhiLePhi:[],GiayToKetQua:[],TrangThaiDuLieu:{MaMuc:"",TenMuc:""},PhanVungDuLieu:{MaMuc:"",TenMuc:""},HoSoLuuTruSo:{MaDinhDanh:""},NhatKyHoSo:[]}},{maThuTuc:"DGTD_XLDLCN",tenThuTuc:"Hồ sơ đánh giá tác động xử lý dữ liệu",mauEform:"",mauHienThiBieuMau:{thongTinChuHoSo:{group:!0,title:"Thông tin tổ chức, cá nhân thực hiện đánh giá tác động xử lý dữ liệu cá nhân",content:[{title:"- Tên gọi của cá nhân, tổ chức nộp hồ sơ",value:"TenGoi",mapping:"",class:"v-col-12 py-0 pt-2 px-0",type:""},{title:"- Số giấy chứng nhận cá nhân, tổ chức",value:"GiayChungNhan",mapping:"SoGiay",class:"v-col-12 py-0 pt-2 px-0",type:"object"},{title:"- Ngày cấp giấy chứng nhận",value:"GiayChungNhan",mapping:"NgayCap",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0",type:"obj-date"},{title:"- Nơi cấp giấy chứng nhận",value:"GiayChungNhan",mapping:"NoiCap",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0",type:"object"},{title:"- Địa chỉ trụ sở chính / đăng ký thường trú",value:"DiaChiHoatDong",mapping:"",type:"fulladdress",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Địa chỉ trụ sở giao dịch / địa chỉ nơi ở hiện nay",value:"DiaChiLienHe",mapping:"",type:"fulladdress",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Số điện thoại",value:"SoDienThoai",mapping:"",type:"",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0"},{title:"- Website",value:"Website",mapping:"",type:"",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0"}],class:"v-col-12 py-0 px-0 pt-2"},nguoiLienHe:{group:!0,title:"Thông tin cá nhân phụ trách/ người liên hệ",content:[{title:"- Họ và tên",value:"HoVaTen",type:"",mapping:"",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0"},{title:"- Chức danh",value:"ChucDanh",type:"",mapping:"",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0"},{title:"- Email",value:"Email",type:"",mapping:"",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0"},{title:"- Số điện thoại",value:"SoDienThoai",type:"",mapping:"",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0"}],class:"v-col-12 py-0 px-0 pt-2"},noiDungDanhGia:{group:!0,title:"Nội dung đánh giá tác động xử lý dữ liệu cá nhân",content:[{title:"- Loại đánh giá tác động",value:"LoaiHinhDGTD",mapping:"TenMuc",type:"object",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Mục đích xử lý hoặc chuyển dữ liệu cá nhân",value:"MucDichDLCN",mapping:"",type:"",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Hoạt động xử lý hoặc chuyển dữ liệu cá nhân",value:"HoatDongDLCN",mapping:"",type:"",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Phạm vi xử lý các loại dữ liệu cá nhân cơ bản",value:"LoaiDLCNCoBan",mapping:"TenMuc",type:"danhmuc",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Phạm vi xử lý các loại dữ liệu cá nhân nhạy cảm",value:"LoaiDLCNNhayCam",mapping:"TenMuc",type:"danhmuc",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Số lượng xử lý dữ liệu",value:"SoLuongDuLieu",mapping:"",type:"",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Có sự đồng ý của chủ thể dữ liệu không?",value:"DongYChuTheDLCN",mapping:"",type:"boolean",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Thời gian bắt đầu",value:"ThoiGianBatDau",mapping:"",type:"date",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Thời gian kết thúc",value:"ThoiGianKetThuc",mapping:"",type:"date",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Biện pháp bảo vệ dữ liệu cá nhân được áp dụng",value:"LoaiBienPhapBVDLCN",mapping:"TenMuc",type:"danhmuc",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Các loại đánh giá tác động đã thực hiện",value:"LoaiDanhGiaTacDong",type:"danhmuc",mapping:"TenMuc",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Có lấy ý kiến đánh giá tác động không?",value:"LayYKienDanhGia",mapping:"",type:"boolean",class:"v-col-12 py-0 pt-2 px-0"}],class:"v-col-12 py-0 px-0 pt-2"}},thongTinHoSo:{ThuTucHanhChinh:{MaMuc:"DGTD_XLDLCN",TenMuc:"Hồ sơ đánh giá tác động xử lý dữ liệu cá nhân"},LinhVucThuTuc:[],KenhThucHienHoSo:{},ChuHoSo:{MaDinhDanh:"",LoaiDoiTuong:{MaMuc:"",TenMuc:""},MaDoiTuong:"",TenGoi:"",ThongTinKhac:"",DanhBaLienLac:{SoFax:"",ThuDienTu:"",SoDienThoai:""},DiaChi:{SoNhaChiTiet:"",TinhThanh:{MaMuc:"",TenMuc:""},HuyenQuan:{MaMuc:"",TenMuc:""},XaPhuong:{MaMuc:"",TenMuc:""}}},NguoiNopHoSo:{MaDinhDanh:"",TenGoi:"",ThongTinKhac:"",DanhBaLienLac:{SoFax:"",ThuDienTu:"",SoDienThoai:""},DiaChi:{SoNhaChiTiet:"",TinhThanh:{MaMuc:"",TenMuc:""},HuyenQuan:{MaMuc:"",TenMuc:""},XaPhuong:{MaMuc:"",TenMuc:""}}},TrichYeuHoSo:"",MaDinhDanh:"",NgayNopHoSo:"",NgayTiepNhan:"",NgayHenTra:"",NgayTra:"",ThongTinTra:"",HinhThucTraHoSo:{ThoiGianTao:"",ThoiGianCapNhat:"",TrangThaiDuLieu:{MaMuc:"",TenMuc:""},MaMuc:"",TenMuc:"",MaPhienBan:"",MaDinhDanh:""},NgayKetThucXuLy:"",NgayTuChoi:"",ThoiGianGiaiQuyet:"",SoNgayChamHan:"",LyDoChamHan:"",DonViXuLy:{MaMuc:"G01.105",TenMuc:"Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao"},TrangThaiHoSo:{MaMuc:"00",TenMuc:"Chưa gửi"},GhiChuKetQua:"",MaTruongHop:"",HoSoCoThanhPhanSoHoa:!0,ThanhPhanHoSo:[{IDGiayTo:"BM_DGTDDLCN",TenGiayTo:"Biểu mẫu điện tử",SoBanGiay:0,HinhThucGiayTo:{ThoiGianTao:"",ThoiGianCapNhat:"",TrangThaiDuLieu:{MaMuc:"",TenMuc:""},MaMuc:"",TenMuc:"",MaPhienBan:"",MaDinhDanh:""},NgayBoSung:"",MaThanhPhanHoSo:{MaMuc:"BMDT_DGTD_XLDLCN",TenMuc:"Thành phần biểu mẫu điện tử"},MaGiayToKetQua:{MaMuc:"",TenMuc:""},DaHuyBoThayThe:!1,TinhTrangSoHoa:1,GiayToLuuTruSo:{MaDinhDanh:"",TenGiayTo:""},TepDuLieu:{MaDinhDanh:"",TenTep:"",DinhDangTep:"",KichThuocTep:0,DuongDanURL:""},BieuMauDienTu:{MaMuc:"",TenMuc:""},IDBanGhi:""},{IDGiayTo:"DGTD_XLDLCN_TP1",TenGiayTo:"Bản chính thuyết minh đánh giá tác động xử lý dữ liệu cá nhân",SoBanGiay:0,HinhThucGiayTo:{MaMuc:"false",TenMuc:"true"},NgayBoSung:"",MaThanhPhanHoSo:{MaMuc:"DGTD_XLDLCN_TP1",TenMuc:"Mã thành phần 1"},MaGiayToKetQua:{MaMuc:"",TenMuc:""},DaHuyBoThayThe:!1,TinhTrangSoHoa:1,GiayToLuuTruSo:{MaDinhDanh:"",TenGiayTo:""},TepDuLieu:{MaDinhDanh:"",TenTep:"",DinhDangTep:"",KichThuocTep:0,DuongDanURL:""},BieuMauDienTu:{MaMuc:"",TenMuc:""},IDBanGhi:""},{IDGiayTo:"DGTD_XLDLCN_TP2",TenGiayTo:"Giấy chứng nhận đăng kí hoạt động hoặc quyết định thành lập của tổ chức; căn cước công dân, chứng minh thư hoặc hộ chiếu của cá nhân",SoBanGiay:0,HinhThucGiayTo:{MaMuc:"false",TenMuc:"true"},NgayBoSung:"",MaThanhPhanHoSo:{MaMuc:"DGTD_XLDLCN_TP2",TenMuc:"Mã thành phần 2"},MaGiayToKetQua:{MaMuc:"",TenMuc:""},DaHuyBoThayThe:!1,TinhTrangSoHoa:1,GiayToLuuTruSo:{MaDinhDanh:"",TenGiayTo:""},TepDuLieu:{MaDinhDanh:"",TenTep:"",DinhDangTep:"",KichThuocTep:0,DuongDanURL:""},BieuMauDienTu:{MaMuc:"",TenMuc:""},IDBanGhi:""},{IDGiayTo:"DGTD_XLDLCN_TP3",TenGiayTo:"Quyết định hoặc giấy tờ liên quan đến phân công bộ phận phụ trách bảo vệ dữ liệu cá nhân của tổ chức",SoBanGiay:0,HinhThucGiayTo:{MaMuc:"false",TenMuc:"false"},NgayBoSung:"",MaThanhPhanHoSo:{MaMuc:"DGTD_XLDLCN_TP3",TenMuc:"Mã thành phần 3"},MaGiayToKetQua:{MaMuc:"",TenMuc:""},DaHuyBoThayThe:!1,TinhTrangSoHoa:1,GiayToLuuTruSo:{MaDinhDanh:"",TenGiayTo:""},TepDuLieu:{MaDinhDanh:"",TenTep:"",DinhDangTep:"",KichThuocTep:0,DuongDanURL:""},BieuMauDienTu:{MaMuc:"",TenMuc:""},IDBanGhi:""},{IDGiayTo:"DGTD_XLDLCN_TP4",TenGiayTo:"Hợp đồng hoặc văn bản thỏa thuận liên quan đến xử lý dữ liệu cá nhân và/hoặc chuyển dữ liệu cá nhân ra nước ngoài với các bên (nếu có)",SoBanGiay:0,HinhThucGiayTo:{MaMuc:"true",TenMuc:"false"},NgayBoSung:"",MaThanhPhanHoSo:{MaMuc:"DGTD_XLDLCN_TP4",TenMuc:"Mã thành phần 4"},MaGiayToKetQua:{MaMuc:"",TenMuc:""},DaHuyBoThayThe:!1,TinhTrangSoHoa:1,GiayToLuuTruSo:{MaDinhDanh:"",TenGiayTo:""},TepDuLieu:{MaDinhDanh:"",TenTep:"",DinhDangTep:"",KichThuocTep:0,DuongDanURL:""},BieuMauDienTu:{MaMuc:"",TenMuc:""},IDBanGhi:""},{IDGiayTo:"DGTD_XLDLCN_TP5",TenGiayTo:"Giấy tờ khác (các phụ lục bảng biểu tính toán chi phí, lợi ích của các giải pháp)",SoBanGiay:0,HinhThucGiayTo:{MaMuc:"true",TenMuc:"false"},NgayBoSung:"",MaThanhPhanHoSo:{MaMuc:"DGTD_XLDLCN_TP5",TenMuc:"Mã thành phần 5"},MaGiayToKetQua:{MaMuc:"",TenMuc:""},DaHuyBoThayThe:!1,TinhTrangSoHoa:1,GiayToLuuTruSo:{MaDinhDanh:"",TenGiayTo:""},TepDuLieu:{MaDinhDanh:"",TenTep:"",DinhDangTep:"",KichThuocTep:0,DuongDanURL:""},BieuMauDienTu:{MaMuc:"",TenMuc:""},IDBanGhi:""}],GiaHanHenTra:[],BoSungHoSo:[],PhiLePhi:[],GiayToKetQua:[],TrangThaiDuLieu:{MaMuc:"",TenMuc:""},PhanVungDuLieu:{MaMuc:"",TenMuc:""},HoSoLuuTruSo:{MaDinhDanh:""},NhatKyHoSo:[]}},{maThuTuc:"TDND_DGTD_XLDLCN",tenThuTuc:"Thay đổi nội dung hồ sơ đánh giá tác động xử lý dữ liệu",mauEform:"",mauHienThi:[{}]},{maThuTuc:"DGTD_CDLCN",tenThuTuc:"Hồ sơ đánh giá tác động chuyển dữ liệu cá nhân ra nước ngoài",mauEform:"",mauHienThiBieuMau:{thongTinChuHoSo:{group:!0,title:"Thông tin tổ chức, cá nhân thực hiện đánh giá tác động chuyển dữ liệu cá nhân ra nước ngoài",content:[{title:"- Tên gọi của cá nhân, tổ chức nộp hồ sơ",value:"TenGoi",mapping:"",class:"v-col-12 py-0 pt-2 px-0",type:""},{title:"- Số giấy chứng nhận cá nhân, tổ chức",value:"GiayChungNhan",mapping:"SoGiay",class:"v-col-12 py-0 pt-2 px-0",type:"object"},{title:"- Ngày cấp giấy chứng nhận",value:"GiayChungNhan",mapping:"NgayCap",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0",type:"obj-date"},{title:"- Nơi cấp giấy chứng nhận",value:"GiayChungNhan",mapping:"NoiCap",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0",type:"object"},{title:"- Địa chỉ trụ sở chính / đăng ký thường trú",value:"DiaChiHoatDong",mapping:"",type:"fulladdress",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Địa chỉ trụ sở giao dịch / địa chỉ nơi ở hiện nay",value:"DiaChiLienHe",mapping:"",type:"fulladdress",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Số điện thoại",value:"SoDienThoai",mapping:"",type:"",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0"},{title:"- Website",value:"Website",mapping:"",type:"",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0"}],class:"v-col-12 py-0 px-0 pt-2"},nguoiLienHe:{group:!0,title:"Thông tin cá nhân phụ trách/ người liên hệ",content:[{title:"- Họ và tên",value:"HoVaTen",type:"",mapping:"",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0"},{title:"- Chức danh",value:"ChucDanh",type:"",mapping:"",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0"},{title:"- Email",value:"Email",type:"",mapping:"",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0"},{title:"- Số điện thoại",value:"SoDienThoai",type:"",mapping:"",class:"v-col-12 v-col-md-6 py-0 pt-2 px-0"}],class:"v-col-12 py-0 px-0 pt-2"},noiDungDanhGia:{group:!0,title:"Nội dung đánh giá tác động chuyển dữ liệu cá nhân ra nước ngoài",content:[{title:"- Mục đích chuyển dữ liệu cá nhân ra nước ngoài",value:"MucDichDLCN",mapping:"",type:"",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Hoạt động chuyển dữ liệu cá nhân ra nước ngoài",value:"HoatDongDLCN",mapping:"",type:"",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Phạm vi xử lý các loại dữ liệu cá nhân cơ bản",value:"LoaiDLCNCoBan",mapping:"TenMuc",type:"danhmuc",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Phạm vi xử lý các loại dữ liệu cá nhân nhạy cảm",value:"LoaiDLCNNhayCam",mapping:"TenMuc",type:"danhmuc",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Số lượng dữ liệu chuyển ra nước ngoài",value:"SoLuongDuLieu",mapping:"",type:"",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Có sự đồng ý của chủ thể dữ liệu không?",value:"DongYChuTheDLCN",mapping:"",type:"boolean",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Thời gian bắt đầu",value:"ThoiGianBatDau",mapping:"",type:"date",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Thời gian kết thúc",value:"ThoiGianKetThuc",mapping:"",type:"date",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Biện pháp bảo vệ dữ liệu cá nhân được áp dụng",value:"LoaiBienPhapBVDLCN",mapping:"TenMuc",type:"danhmuc",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Các loại đánh giá tác động đã thực hiện",value:"LoaiDanhGiaTacDong",type:"danhmuc",mapping:"TenMuc",class:"v-col-12 py-0 pt-2 px-0"},{title:"- Có lấy ý kiến đánh giá tác động không?",value:"LayYKienDanhGia",mapping:"",type:"boolean",class:"v-col-12 py-0 pt-2 px-0"}],class:"v-col-12 py-0 px-0 pt-2"}},thongTinHoSo:{ThuTucHanhChinh:{MaMuc:"DGTD_CDLCN",TenMuc:"Hồ sơ đánh giá tác động chuyển dữ liệu cá nhân ra nước ngoài"},LinhVucThuTuc:[],KenhThucHienHoSo:{},ChuHoSo:{MaDinhDanh:"",LoaiDoiTuong:{MaMuc:"",TenMuc:""},MaDoiTuong:"",TenGoi:"",ThongTinKhac:"",DanhBaLienLac:{SoFax:"",ThuDienTu:"",SoDienThoai:""},DiaChi:{SoNhaChiTiet:"",TinhThanh:{MaMuc:"",TenMuc:""},HuyenQuan:{MaMuc:"",TenMuc:""},XaPhuong:{MaMuc:"",TenMuc:""}}},NguoiNopHoSo:{MaDinhDanh:"",TenGoi:"",ThongTinKhac:"",DanhBaLienLac:{SoFax:"",ThuDienTu:"",SoDienThoai:""},DiaChi:{SoNhaChiTiet:"",TinhThanh:{MaMuc:"",TenMuc:""},HuyenQuan:{MaMuc:"",TenMuc:""},XaPhuong:{MaMuc:"",TenMuc:""}}},TrichYeuHoSo:"",MaDinhDanh:"",NgayNopHoSo:"",NgayTiepNhan:"",NgayHenTra:"",NgayTra:"",ThongTinTra:"",HinhThucTraHoSo:{ThoiGianTao:"",ThoiGianCapNhat:"",TrangThaiDuLieu:{MaMuc:"",TenMuc:""},MaMuc:"",TenMuc:"",MaPhienBan:"",MaDinhDanh:""},NgayKetThucXuLy:"",NgayTuChoi:"",ThoiGianGiaiQuyet:"",SoNgayChamHan:"",LyDoChamHan:"",DonViXuLy:{MaMuc:"G01.105",TenMuc:"Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao"},TrangThaiHoSo:{MaMuc:"00",TenMuc:"Chưa gửi"},GhiChuKetQua:"",MaTruongHop:"",HoSoCoThanhPhanSoHoa:!0,ThanhPhanHoSo:[{IDGiayTo:"BM_DGTDDLCN",TenGiayTo:"Biểu mẫu điện tử",SoBanGiay:0,HinhThucGiayTo:{ThoiGianTao:"",ThoiGianCapNhat:"",TrangThaiDuLieu:{MaMuc:"",TenMuc:""},MaMuc:"",TenMuc:"",MaPhienBan:"",MaDinhDanh:""},NgayBoSung:"",MaThanhPhanHoSo:{MaMuc:"BMDT_DGTD_CDLCN",TenMuc:"Thành phần biểu mẫu điện tử"},MaGiayToKetQua:{MaMuc:"",TenMuc:""},DaHuyBoThayThe:!1,TinhTrangSoHoa:1,GiayToLuuTruSo:{MaDinhDanh:"",TenGiayTo:""},TepDuLieu:{MaDinhDanh:"",TenTep:"",DinhDangTep:"",KichThuocTep:0,DuongDanURL:""},BieuMauDienTu:{MaMuc:"",TenMuc:""},IDBanGhi:""},{IDGiayTo:"DGTD_CDLCN_TP1",TenGiayTo:"Bản chính thuyết minh đánh giá tác động chuyển dữ liệu cá nhân là công dân việt nam ra nước ngoài",SoBanGiay:0,HinhThucGiayTo:{MaMuc:"false",TenMuc:"true"},NgayBoSung:"",MaThanhPhanHoSo:{MaMuc:"DGTD_XLDLCN_TP1",TenMuc:"Mã thành phần 1"},MaGiayToKetQua:{MaMuc:"",TenMuc:""},DaHuyBoThayThe:!1,TinhTrangSoHoa:1,GiayToLuuTruSo:{MaDinhDanh:"",TenGiayTo:""},TepDuLieu:{MaDinhDanh:"",TenTep:"",DinhDangTep:"",KichThuocTep:0,DuongDanURL:""},BieuMauDienTu:{MaMuc:"",TenMuc:""},IDBanGhi:""},{IDGiayTo:"DGTD_CDLCN_TP2",TenGiayTo:"Giấy chứng nhận đăng kí hoạt động hoặc quyết định thành lập của tổ chức; căn cước công dân, chứng minh thư hoặc hộ chiếu của cá nhân",SoBanGiay:0,HinhThucGiayTo:{MaMuc:"false",TenMuc:"true"},NgayBoSung:"",MaThanhPhanHoSo:{MaMuc:"DGTD_CDLCN_TP2",TenMuc:"Mã thành phần 2"},MaGiayToKetQua:{MaMuc:"",TenMuc:""},DaHuyBoThayThe:!1,TinhTrangSoHoa:1,GiayToLuuTruSo:{MaDinhDanh:"",TenGiayTo:""},TepDuLieu:{MaDinhDanh:"",TenTep:"",DinhDangTep:"",KichThuocTep:0,DuongDanURL:""},BieuMauDienTu:{MaMuc:"",TenMuc:""},IDBanGhi:""},{IDGiayTo:"DGTD_CDLCN_TP3",TenGiayTo:"Quyết định hoặc giấy tờ liên quan đến phân công bộ phận phụ trách bảo vệ dữ liệu cá nhân của tổ chức",SoBanGiay:0,HinhThucGiayTo:{MaMuc:"false",TenMuc:"false"},NgayBoSung:"",MaThanhPhanHoSo:{MaMuc:"DGTD_CDLCN_TP3",TenMuc:"Mã thành phần 3"},MaGiayToKetQua:{MaMuc:"",TenMuc:""},DaHuyBoThayThe:!1,TinhTrangSoHoa:1,GiayToLuuTruSo:{MaDinhDanh:"",TenGiayTo:""},TepDuLieu:{MaDinhDanh:"",TenTep:"",DinhDangTep:"",KichThuocTep:0,DuongDanURL:""},BieuMauDienTu:{MaMuc:"",TenMuc:""},IDBanGhi:""},{IDGiayTo:"DGTD_CDLCN_TP4",TenGiayTo:"Hợp đồng hoặc văn bản thỏa thuận liên quan đến chuyển dữ liệu cá nhân ra nước ngoài",SoBanGiay:0,HinhThucGiayTo:{MaMuc:"true",TenMuc:"false"},NgayBoSung:"",MaThanhPhanHoSo:{MaMuc:"DGTD_CDLCN_TP4",TenMuc:"Mã thành phần 4"},MaGiayToKetQua:{MaMuc:"",TenMuc:""},DaHuyBoThayThe:!1,TinhTrangSoHoa:1,GiayToLuuTruSo:{MaDinhDanh:"",TenGiayTo:""},TepDuLieu:{MaDinhDanh:"",TenTep:"",DinhDangTep:"",KichThuocTep:0,DuongDanURL:""},BieuMauDienTu:{MaMuc:"",TenMuc:""},IDBanGhi:""},{IDGiayTo:"DGTD_CDLCN_TP5",TenGiayTo:"Giấy tờ khác (các phụ lục bảng biểu tính toán chi phí, lợi ích của các giải pháp)",SoBanGiay:0,HinhThucGiayTo:{MaMuc:"true",TenMuc:"false"},NgayBoSung:"",MaThanhPhanHoSo:{MaMuc:"DGTD_CDLCN_TP5",TenMuc:"Mã thành phần 5"},MaGiayToKetQua:{MaMuc:"",TenMuc:""},DaHuyBoThayThe:!1,TinhTrangSoHoa:1,GiayToLuuTruSo:{MaDinhDanh:"",TenGiayTo:""},TepDuLieu:{MaDinhDanh:"",TenTep:"",DinhDangTep:"",KichThuocTep:0,DuongDanURL:""},BieuMauDienTu:{MaMuc:"",TenMuc:""},IDBanGhi:""}],GiaHanHenTra:[],BoSungHoSo:[],PhiLePhi:[],GiayToKetQua:[],TrangThaiDuLieu:{MaMuc:"",TenMuc:""},PhanVungDuLieu:{MaMuc:"",TenMuc:""},HoSoLuuTruSo:{MaDinhDanh:""},NhatKyHoSo:[]}},{maThuTuc:"TDND_DGTD_CDLCN",tenThuTuc:"Thay đổi nội dung hồ sơ đánh giá tác động chuyển dữ liệu cá nhân ra nước ngoài",mauEform:"",mauHienThi:[{}]}],i={MaThamChieu:"string",MaDinhDanh:"A290d2X9412",ThuTucHanhChinh:{MaMuc:"thongbaovipham",TenMuc:"Thông báo vi phạm quy định bảo vệ dữ liệu cá nhân"},LinhVucThuTuc:[{MaMuc:"string",TenMuc:"string"}],KenhThucHienHoSo:{MaMuc:"string",TenMuc:"string"},ChuHoSo:{"@type":"string",MaDinhDanh:"string",LoaiDoiTuong:{"@type":"string",MaMuc:"string",TenMuc:"string"},MaDoiTuong:"string",TenGoi:"string",ThongTinKhac:"string",DanhBaLienLac:{"@type":"string",SoFax:"string",ThuDienTu:"string",SoDienThoai:"string"},DiaChi:{"@type":"string",SoNhaChiTiet:"string",TinhThanh:{"@type":"string",MaMuc:"string",TenMuc:"string"},HuyenQuan:{"@type":"string",MaMuc:"string",TenMuc:"string"},XaPhuong:{"@type":"string",MaMuc:"string",TenMuc:"string"}}},NguoiNopHoSo:{"@type":"string",MaDinhDanh:"string",TenGoi:"string",ThongTinKhac:"string",DanhBaLienLac:{"@type":"string",SoFax:"string",ThuDienTu:"string",SoDienThoai:"string"},DiaChi:{"@type":"string",SoNhaChiTiet:"string",TinhThanh:{"@type":"string",MaMuc:"string",TenMuc:"string"},HuyenQuan:{"@type":"string",MaMuc:"string",TenMuc:"string"},XaPhuong:{"@type":"string",MaMuc:"string",TenMuc:"string"}}},TrichYeuHoSo:"string",NgayNopHoSo:"2023-06-14T01:43:48.577Z",NgayTiepNhan:"2023-06-14T01:43:48.577Z",NgayHenTra:"2023-06-14T01:43:48.577Z",NgayTra:"2023-06-14T01:43:48.577Z",ThongTinTra:"string",HinhThucTraHoSo:{primKey:"string","@type":"string",ThoiGianTao:"2023-06-14T01:43:48.577Z",ThoiGianCapNhat:"2023-06-14T01:43:48.577Z",TrangThaiDuLieu:{"@type":"string",MaMuc:"string",TenMuc:"string"},MaMuc:"string",TenMuc:"string",MaPhienBan:"string"},NgayKetThucXuLy:"2023-06-14T01:43:48.577Z",NgayTuChoi:"2023-06-14T01:43:48.577Z",ThoiGianGiaiQuyet:0,SoNgayChamHan:0,LyDoChamHan:"string",DonViXuLy:{MaMuc:"G01.105",TenMuc:"Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao"},TrangThaiHoSo:{MaMuc:"string",TenMuc:"string"},GhiChuKetQua:"string",MaTruongHop:"string",HoSoCoThanhPhanSoHoa:!0,ThanhPhanHoSo:[{"@type":"string",IDGiayTo:"string",TenGiayTo:"Thông báo gửi hồ sơ đánh giá tác động xử lý dữ liệu cá nhân",SoBanGiay:0,HinhThucGiayTo:{primKey:"string","@type":"string",ThoiGianTao:"2023-06-14T01:43:48.577Z",ThoiGianCapNhat:"2023-06-14T01:43:48.577Z",TrangThaiDuLieu:{"@type":"string",MaMuc:"string",TenMuc:"string"},MaMuc:"string",TenMuc:"string",MaPhienBan:"string"},NgayBoSung:"2023-06-14T01:43:48.577Z",MaThanhPhanHoSo:{"@type":"string",MaMuc:"string",TenMuc:"string"},MaGiayToKetQua:{"@type":"string",MaMuc:"string",TenMuc:"string"},DaHuyBoThayThe:!0,TinhTrangSoHoa:1,GiayToLuuTruSo:{"@type":"string",MaDinhDanh:"string",TenGiayTo:"string"},TepDuLieu:[{"@type":"string",MaDinhDanh:"string",TenTep:"Thongbaovipham_dinhkem",DinhDangTep:"pdf",KichThuocTep:0,DuongDanURL:"string"},{"@type":"string",MaDinhDanh:"string",TenTep:"Ảnh vi phạm",DinhDangTep:"png",KichThuocTep:0,DuongDanURL:"string"}],BieuMauDienTu:{"@type":"string",MaMuc:"string",TenMuc:"string"},IDBanGhi:"string"}],GiaHanHenTra:[{"@type":"string",SoHieuVanBan:"string",NgayGiaHan:"2023-06-14T01:43:48.577Z",NgayHenTraTruoc:"2023-06-14T01:43:48.577Z",NgayHenTraMoi:"2023-06-14T01:43:48.577Z",TepDuLieu:{"@type":"string",MaDinhDanh:"string",TenTep:"string",DinhDangTep:"string",KichThuocTep:0,DuongDanURL:"string"}}],BoSungHoSo:[{"@type":"string",SoHieuVanBan:"string",NgayBoSung:"2023-06-14T01:43:48.577Z",NoiDungBoSung:"string",NgayTiepNhan:"2023-06-14T01:43:48.577Z",NgayHenTraTruoc:"2023-06-14T01:43:48.577Z",NgayHenTraMoi:"2023-06-14T01:43:48.577Z",TrangThaiBoSung:!0,TepDuLieu:{"@type":"string",MaDinhDanh:"string",TenTep:"string",DinhDangTep:"string",KichThuocTep:0,DuongDanURL:"string"}}],PhiLePhi:[{"@type":"string",MaPhiLePhi:{"@type":"string",MaMuc:"string",TenMuc:"string"},TenPhiLePhi:"string",SoTien:0,NgayYeuCau:"2023-06-14T01:43:48.577Z",NgayThanhToan:"2023-06-14T01:43:48.577Z",SoChungTu:"string",HinhThucThanhToan:{primKey:"string","@type":"string",ThoiGianTao:"2023-06-14T01:43:48.577Z",ThoiGianCapNhat:"2023-06-14T01:43:48.577Z",TrangThaiDuLieu:{"@type":"string",MaMuc:"string",TenMuc:"string"},MaMuc:"string",TenMuc:"string",MaPhienBan:"string"},TrangThaiThanhToan:!0}],GiayToKetQua:[{"@type":"string",IDGiayTo:"string",MaGiayToKetQua:{"@type":"string",MaMuc:"string",TenMuc:"string"},TenGiayTo:"string",SoHieuVanBan:"string",NgayBanHanh:"2023-06-14T01:43:48.577Z",ThoiHanHieuLuc:"2023-06-14T01:43:48.577Z",CoQuanBanHanh:{"@type":"string",MaDinhDanh:"string",TenGoi:"string"},GiayToLuuTruSo:{"@type":"string",MaDinhDanh:"string",TenGiayTo:"string"},TepDuLieu:{"@type":"string",MaDinhDanh:"string",TenTep:"string",DinhDangTep:"string",KichThuocTep:0,DuongDanURL:"string"},DuocKySo:!0}],TrangThaiDuLieu:{"@type":"string",MaMuc:"string",TenMuc:"string"},PhanVungDuLieu:{"@type":"string",MaMuc:"string",TenMuc:"string"},HoSoLuuTruSo:{"@type":"string",MaDinhDanh:"string"},NhatKyHoSo:[{"@type":"string",NguoiXuLy:"string",ChucDanh:"string",ThoiDiemXuLy:"2023-06-14T01:43:48.577Z",PhongBanXuLy:"string",NoiDungXuLy:"string",TrangThai:"string",NgayBatDau:"2023-06-14T01:43:48.577Z",NgayKetThucTheoQuyDinh:"2023-06-14T01:43:48.577Z"}],ThoiGianBatDau:"2023-06-14T01:43:48.577Z",ThoiGianKetThuc:"2023-06-14T01:43:48.577Z"},h={menuHoSo:n,thuTucHanhChinh:a,thongTinHoSo:i};export{h as j};
