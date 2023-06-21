import{u as P}from"./hosodvc-72a37b7f.js";import{l as X}from"./main-aed7216c.js";import{V as $,a as s}from"./VRow-9bbff3db.js";import{t as M,n as m,H as f,h as k,i as j,w as i,d as l,J as u,k as F,j as n,v as c}from"./index-4c35af64.js";import{V as r}from"./VAutocomplete-74c51d3c.js";import{V as E}from"./VForm-25fb07e3.js";import"./jquery-da988d60.js";const w=n("div",{class:"text-label"},[c("Tên tổ chức, doanh nghiệp "),n("span",{style:{color:"red"}},"(*)")],-1),B=n("div",{class:"text-label"},"Tên cơ quan tổ chức chủ quản (nếu có)",-1),I=n("div",{class:"text-label"},[c("Địa chỉ trụ sở chính "),n("span",{style:{color:"red"}},"(*)")],-1),W=n("div",{class:"text-label"},[c("Tỉnh/ thành phố "),n("span",{style:{color:"red"}},"(*)")],-1),L=n("div",{class:"text-label"},[c("Quận/ huyện/ thị xã "),n("span",{style:{color:"red"}},"(*)")],-1),O=n("div",{class:"text-label"},[c("Xã/phường/thị trấn "),n("span",{style:{color:"red"}},"(*)")],-1),Y=n("div",{class:"text-label"},"Địa chỉ giao dịch",-1),z=n("div",{class:"text-label"},"Tỉnh/ thành phố ",-1),A=n("div",{class:"text-label"},"Quận/ huyện/ thị xã ",-1),J=n("div",{class:"text-label"},"Xã/phường/thị trấn ",-1),R=n("div",{class:"text-label"},[c("Số điện thoại "),n("span",{style:{color:"red"}},"(*)")],-1),Z=n("div",{class:"text-label"},"Địa chỉ website",-1),ee=n("div",{class:"text-label",style:{color:"#1E7D30","font-weight":"600"}},"Quyết định thành lập/ Giấy chứng nhận đăng ký doanh nghiệp/ Giấy chứng nhận đăng ký kinh doanh/ Giấy chứng nhận đầu tư",-1),ae=n("div",{class:"text-label"},[c("Số chứng nhận "),n("span",{style:{color:"red"}},"(*)")],-1),le=n("div",{class:"text-label"},[c("Ngày cấp "),n("span",{style:{color:"red"}},"(*)")],-1),te=n("div",{class:"text-label"},[c("Nơi cấp "),n("span",{style:{color:"red"}},"(*)")],-1),oe=n("div",{class:"text-label",style:{color:"#1E7D30","font-weight":"600"}},"Nhân sự chịu trách nhiệm bảo vệ dữ liệu cá nhân",-1),ne=n("div",{class:"text-label"},[c("Họ và tên "),n("span",{style:{color:"red"}},"(*)")],-1),ie=n("div",{class:"text-label"},"Chức danh",-1),se=n("div",{class:"text-label"},"Số điện thoại",-1),ue=n("div",{class:"text-label"},[c("Thư điện tử "),n("span",{style:{color:"red"}},"(*)")],-1),De={__name:"ThongTinDoanhNghiepToChuc",props:{dataInput:{type:Object,default:{}}},emits:["submitForm"],setup(x,{expose:_,emit:de}){const S=x,p=P();M(S.dataInput);const t=M({TenGoi:"",DiaChiHoatDong:{SoNhaChiTiet:"",TinhThanh:{MaMuc:"",TenMuc:""},HuyenQuan:{MaMuc:"",TenMuc:""},XaPhuong:{MaMuc:"",TenMuc:""}},DiaChiGiaoDich:{SoNhaChiTiet:"",TinhThanh:{MaMuc:"",TenMuc:""},HuyenQuan:{MaMuc:"",TenMuc:""},XaPhuong:{MaMuc:"",TenMuc:""}},GiayDangKyKinhDoanh:{SoGiay:"",NgayCap:"",NoiCap:""},SoDienThoai:"",Website:"",TenCoQuanChuQuan:""}),h=M({TenGoi:"",ChucDanh:"",SoDienThoai:"",Email:""}),y=m([]),D=m([]),g=m([]),T=m([]),b=m([]),V=m(null),C=function(o){let a={maDanhMuc:"tinhthanh"};p.getDanhMucCmon(a).then(function(e){y.value=e.content}).catch(function(){})};C();const G=function(o){const a=o.getFullYear(),e=String(o.getMonth()+1).padStart(2,"0"),d=String(o.getDate()).padStart(2,"0"),U=String(o.getHours()).padStart(2,"0"),K=String(o.getMinutes()).padStart(2,"0"),q=String(o.getSeconds()).padStart(2,"0");return`${a}-${e}-${d}T${U}:${K}:${q}`},v=async function(){const{valid:o}=await V.value.validate();return o},H=o=>{try{if(o.getDate()){const a=o.getDate(),e=o.getMonth()+1,d=o.getFullYear();return`${a.toString().padStart(2,"0")}/${e.toString().padStart(2,"0")}/${d}`}}catch{}},N=o=>{t.GiayDangKyKinhDoanh.NgayCap=G(o)},Q=m({format:"dd/MM/yyyy"});return f(()=>t.DiaChiHoatDong.TinhThanh,(o,a)=>{if(console.log("newValue",o.MaMuc),o.MaMuc){let e={maDanhMuc:"huyenquan",params:{thamChieu_maMuc:o.MaMuc}};p.getDanhMucCmon(e).then(function(d){D.value=d.content}).catch(function(){})}else D.value=[]},{deep:!0}),f(()=>t.DiaChiHoatDong.HuyenQuan,(o,a)=>{if(console.log("newValue",o.MaMuc),o.MaMuc){let e={maDanhMuc:"xaphuong",params:{thamChieu_maMuc:o.MaMuc}};p.getDanhMucCmon(e).then(function(d){g.value=d.content}).catch(function(){})}else g.value=[]},{deep:!0}),f(()=>t.DiaChiGiaoDich.TinhThanh,(o,a)=>{if(console.log("newValue",o.MaMuc),o.MaMuc){let e={maDanhMuc:"huyenquan",params:{thamChieu_maMuc:o.MaMuc}};p.getDanhMucCmon(e).then(function(d){T.value=d.content}).catch(function(){})}else T.value=[]},{deep:!0}),f(()=>t.DiaChiGiaoDich.HuyenQuan,(o,a)=>{if(console.log("newValue",o.MaMuc),o.MaMuc){let e={maDanhMuc:"xaphuong",params:{thamChieu_maMuc:o.MaMuc}};p.getDanhMucCmon(e).then(function(d){b.value=d.content}).catch(function(){})}else b.value=[]},{deep:!0}),_({initForm:C,doiTuongThucHien:t,caNhanPhuTrachBVDLCN:h,validateForm:v}),(o,a)=>(k(),j(E,{ref_key:"formThongTinDoanhNghiepToChuc",ref:V,"lazy-validation":"",class:"py-0"},{default:i(()=>[l($,{class:"mx-0 my-0"},{default:i(()=>[l(s,{cols:"12",md:"6",class:"py-0 mb-10"},{default:i(()=>[w,l(u,{class:"flex input-form",modelValue:t.TenGoi,"onUpdate:modelValue":a[0]||(a[0]=e=>t.TenGoi=e),solo:"",dense:"","hide-details":"auto",clearable:"",required:"",rules:[e=>e!==""&&e!==null&&e!==void 0||"Thông tin bắt buộc"]},null,8,["modelValue","rules"])]),_:1}),l(s,{cols:"12",md:"6",class:"py-0 mb-10"},{default:i(()=>[B,l(u,{class:"flex input-form",modelValue:t.TenCoQuanChuQuan,"onUpdate:modelValue":a[1]||(a[1]=e=>t.TenCoQuanChuQuan=e),solo:"",dense:"","hide-details":"auto",clearable:""},null,8,["modelValue"])]),_:1}),l(s,{cols:"12",class:"py-0 mb-10"},{default:i(()=>[I,l(u,{class:"flex input-form",placeholder:"",modelValue:t.DiaChiHoatDong.SoNhaChiTiet,"onUpdate:modelValue":a[2]||(a[2]=e=>t.DiaChiHoatDong.SoNhaChiTiet=e),solo:"",dense:"","hide-details":"auto",clearable:"",required:"",rules:[e=>e!==""&&e!==null&&e!==void 0||"Thông tin bắt buộc"]},null,8,["modelValue","rules"])]),_:1}),l(s,{cols:"12",md:"4",class:"py-0 mb-10"},{default:i(()=>[W,l(r,{class:"flex input-form","hide-no-data":"",modelValue:t.DiaChiHoatDong.TinhThanh,"onUpdate:modelValue":a[3]||(a[3]=e=>t.DiaChiHoatDong.TinhThanh=e),items:y.value,"item-title":"TenMuc","item-value":"MaMuc",dense:"",solo:"","hide-details":"auto","return-object":"",required:"",rules:[e=>e!==""&&e!==null&&e!==void 0&&e.MaMuc!==""||"Thông tin bắt buộc"]},null,8,["modelValue","items","rules"])]),_:1}),l(s,{cols:"12",md:"4",class:"py-0 mb-10"},{default:i(()=>[L,l(r,{class:"flex input-form","hide-no-data":"",modelValue:t.DiaChiHoatDong.HuyenQuan,"onUpdate:modelValue":a[4]||(a[4]=e=>t.DiaChiHoatDong.HuyenQuan=e),items:D.value,"item-title":"TenMuc","item-value":"MaMuc",dense:"",solo:"","hide-details":"auto","return-object":"",required:"",rules:[e=>e!==""&&e!==null&&e!==void 0&&e.MaMuc!==""||"Thông tin bắt buộc"]},null,8,["modelValue","items","rules"])]),_:1}),l(s,{cols:"12",md:"4",class:"py-0 mb-10"},{default:i(()=>[O,l(r,{class:"flex input-form","hide-no-data":"",modelValue:t.DiaChiHoatDong.XaPhuong,"onUpdate:modelValue":a[5]||(a[5]=e=>t.DiaChiHoatDong.XaPhuong=e),items:g.value,"item-title":"TenMuc","item-value":"MaMuc",dense:"",solo:"","hide-details":"auto","return-object":"",required:"",rules:[e=>e!==""&&e!==null&&e!==void 0&&e.MaMuc!==""||"Thông tin bắt buộc"]},null,8,["modelValue","items","rules"])]),_:1}),l(s,{cols:"12",class:"py-0 mb-10"},{default:i(()=>[Y,l(u,{class:"flex input-form",modelValue:t.DiaChiGiaoDich.SoNhaChiTiet,"onUpdate:modelValue":a[6]||(a[6]=e=>t.DiaChiGiaoDich.SoNhaChiTiet=e),solo:"",dense:"","hide-details":"auto",clearable:""},null,8,["modelValue"])]),_:1}),l(s,{cols:"12",md:"4",class:"py-0 mb-10"},{default:i(()=>[z,l(r,{class:"flex input-form","hide-no-data":"",modelValue:t.DiaChiGiaoDich.TinhThanh,"onUpdate:modelValue":a[7]||(a[7]=e=>t.DiaChiGiaoDich.TinhThanh=e),items:y.value,"item-title":"TenMuc","item-value":"MaMuc",dense:"",solo:"","hide-details":"auto","return-object":""},null,8,["modelValue","items"])]),_:1}),l(s,{cols:"12",md:"4",class:"py-0 mb-10"},{default:i(()=>[A,l(r,{class:"flex input-form","hide-no-data":"",modelValue:t.DiaChiGiaoDich.HuyenQuan,"onUpdate:modelValue":a[8]||(a[8]=e=>t.DiaChiGiaoDich.HuyenQuan=e),items:T.value,"item-title":"TenMuc","item-value":"MaMuc",dense:"",solo:"","hide-details":"auto","return-object":""},null,8,["modelValue","items"])]),_:1}),l(s,{cols:"12",md:"4",class:"py-0 mb-10"},{default:i(()=>[J,l(r,{class:"flex input-form","hide-no-data":"",modelValue:t.DiaChiGiaoDich.XaPhuong,"onUpdate:modelValue":a[9]||(a[9]=e=>t.DiaChiGiaoDich.XaPhuong=e),items:b.value,"item-title":"TenMuc","item-value":"MaMuc",dense:"",solo:"","hide-details":"auto","return-object":""},null,8,["modelValue","items"])]),_:1}),l(s,{cols:"12",md:"4",class:"py-0 mb-10"},{default:i(()=>[R,l(u,{class:"flex input-form",modelValue:t.SoDienThoai,"onUpdate:modelValue":a[10]||(a[10]=e=>t.SoDienThoai=e),solo:"",dense:"","hide-details":"auto",clearable:"",required:"",rules:[e=>e!==""&&e!==null&&e!==void 0||"Thông tin bắt buộc"]},null,8,["modelValue","rules"])]),_:1}),l(s,{cols:"12",md:"4",class:"py-0 mb-10"},{default:i(()=>[Z,l(u,{class:"flex input-form",modelValue:t.Website,"onUpdate:modelValue":a[11]||(a[11]=e=>t.Website=e),solo:"",dense:"","hide-details":"auto",clearable:""},null,8,["modelValue"])]),_:1}),l(s,{cols:"12",class:"py-0 mb-10"},{default:i(()=>[ee]),_:1}),l(s,{cols:"12",md:"4",class:"py-0 mb-10"},{default:i(()=>[ae,l(u,{class:"flex input-form",modelValue:t.GiayDangKyKinhDoanh.SoGiay,"onUpdate:modelValue":a[12]||(a[12]=e=>t.GiayDangKyKinhDoanh.SoGiay=e),solo:"",dense:"","hide-details":"auto",clearable:"",required:"",rules:[e=>e!==""&&e!==null&&e!==void 0||"Thông tin bắt buộc"]},null,8,["modelValue","rules"])]),_:1}),l(s,{cols:"12",md:"4",class:"py-0 mb-10"},{default:i(()=>[le,l(F(X),{class:"flex",position:"left","select-text":"Chọn","cancel-text":"Thoát",modelValue:t.GiayDangKyKinhDoanh.NgayCap,"onUpdate:modelValue":[a[13]||(a[13]=e=>t.GiayDangKyKinhDoanh.NgayCap=e),a[14]||(a[14]=e=>N(t.GiayDangKyKinhDoanh.NgayCap))],"text-input":"",format:H,placeholder:"dd/mm/yyyy","text-input-options":Q.value,"auto-apply":"",locale:"vi","day-names":["T2","T3","T4","T5","T6","T7","CN"]},null,8,["modelValue","text-input-options"])]),_:1}),l(s,{cols:"12",md:"4",class:"py-0 mb-10"},{default:i(()=>[te,l(u,{class:"flex input-form",modelValue:t.GiayDangKyKinhDoanh.NoiCap,"onUpdate:modelValue":a[15]||(a[15]=e=>t.GiayDangKyKinhDoanh.NoiCap=e),solo:"",dense:"","hide-details":"auto",clearable:"",required:"",rules:[e=>e!==""&&e!==null&&e!==void 0||"Thông tin bắt buộc"]},null,8,["modelValue","rules"])]),_:1}),l(s,{cols:"12",class:"py-0 mb-10"},{default:i(()=>[oe]),_:1}),l(s,{cols:"12",md:"3",class:"py-0 mb-10"},{default:i(()=>[ne,l(u,{class:"flex input-form",modelValue:h.TenGoi,"onUpdate:modelValue":a[16]||(a[16]=e=>h.TenGoi=e),solo:"",dense:"","hide-details":"auto",clearable:"",required:"",rules:[e=>e!==""&&e!==null&&e!==void 0||"Thông tin bắt buộc"]},null,8,["modelValue","rules"])]),_:1}),l(s,{cols:"12",md:"3",class:"py-0 mb-10"},{default:i(()=>[ie,l(u,{class:"flex input-form",modelValue:h.ChucDanh,"onUpdate:modelValue":a[17]||(a[17]=e=>h.ChucDanh=e),solo:"",dense:"","hide-details":"auto",clearable:""},null,8,["modelValue"])]),_:1}),l(s,{cols:"12",md:"3",class:"py-0 mb-10"},{default:i(()=>[se,l(u,{class:"flex input-form",modelValue:h.SoDienThoai,"onUpdate:modelValue":a[18]||(a[18]=e=>h.SoDienThoai=e),solo:"",dense:"","hide-details":"auto",clearable:""},null,8,["modelValue"])]),_:1}),l(s,{cols:"12",md:"3",class:"py-0 mb-10"},{default:i(()=>[ue,l(u,{class:"flex input-form",modelValue:h.Email,"onUpdate:modelValue":a[19]||(a[19]=e=>h.Email=e),solo:"",dense:"","hide-details":"auto",clearable:"",required:"",rules:[e=>e!==""&&e!==null&&e!==void 0||"Thông tin bắt buộc"]},null,8,["modelValue","rules"])]),_:1})]),_:1})]),_:1},512))}};export{De as default};
