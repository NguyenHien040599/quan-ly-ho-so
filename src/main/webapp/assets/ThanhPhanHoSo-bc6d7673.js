import{n as d,f as b,s as k,t as S,o as V,r as L,h as s,i,w as e,d as o,j as t,z as n,v as l,k as z,B as f,x as C,K as H,M,L as P,I as B,D as I,E as K}from"./index-7fb0df29.js";import{_ as j}from"./_plugin-vue_export-helper-c27b6911.js";import{V as _,a as E}from"./VRow-6b7fefad.js";import{V as N}from"./VTooltip-5377d49a.js";import{V as F}from"./VCard-94fb6d50.js";const p=r=>(I("data-v-cf8e3548"),r=r(),K(),r),G={class:"sub-header-content"},$=p(()=>t("div",{class:"triangle-header"},null,-1)),A=p(()=>t("div",{class:"text-sub-header"},"Thành phần hồ sơ",-1)),R={class:"align-left"},U={class:"align-center",width:"350"},q={class:"ml-2",style:{"font-size":"14px","text-decoration":"underline",color:"#1E7D30"}},J=p(()=>t("span",null,"Tải xuống",-1)),O={__name:"ThanhPhanHoSo",setup(r){const T=d("#1E7D30"),D=b(),g=d(!1);d(!1);const m=k(function(){return D.thongTinHoSo.ThanhPhanHoSo.filter(function(c){return!c.MaThanhPhanHoSo||c.MaThanhPhanHoSo&&c.MaThanhPhanHoSo.MaMuc.split("_")[0]!=="BMDT"})}),w=S([{sortable:!1,title:"Tên giấy tờ",align:"center",key:"tenGiayTo",class:"td-left"},{sortable:!1,title:"Tệp đính kèm",align:"center",key:"tepDinhKem",class:"td-left"}]),x=function(){},v=function(){};return V(()=>{}),(c,u)=>{const y=L("v-data-table");return s(),i(F,{class:"pa-0 thanhphanhoso",style:{"box-shadow":"none !important",width:"100%"}},{default:e(()=>[o(_,{class:"mx-0 my-0 mt-3"},{default:e(()=>[o(E,{class:"sub-header d-flex align-center justify-start py-0 px-0"},{default:e(()=>[t("div",G,[o(n,{size:"22",color:"#ffffff"},{default:e(()=>[l("mdi-view-dashboard-outline")]),_:1})]),$,A]),_:1})]),_:1}),o(_,{class:"mx-0 my-0 mt-2"},{default:e(()=>[o(y,{headers:w,items:z(m),"items-per-page":"20","item-value":"primKey","hide-default-footer":"",class:"table-base","no-data":"Không có dữ liệu",loading:g.value,"loading-text":"Đang tải... "},{item:e(({item:a})=>[t("tr",null,[t("td",R,f(a.raw.TenGiayTo),1),t("td",U,[a.raw.TepDuLieu.KichThuocTep?(s(),C("div",{key:0,class:"py-1",onClick:u[0]||(u[0]=h=>x())},[a.raw.TepDuLieu.DinhDangTep==="xls"||a.raw.TepDuLieu.DinhDangTep==="xlsx"?(s(),i(n,{key:0,size:"18",color:"green"},{default:e(()=>[l("mdi-file-excel-outline")]),_:1})):a.raw.TepDuLieu.DinhDangTep==="doc"||a.raw.TepDuLieu.DinhDangTep==="docx"?(s(),i(n,{key:1,size:"18",color:"blue"},{default:e(()=>[l("mdi-file-word-outline")]),_:1})):a.raw.TepDuLieu.DinhDangTep==="pdf"?(s(),i(n,{key:2,size:"18",color:"red"},{default:e(()=>[l("mdi-file-pdf-box")]),_:1})):a.raw.TepDuLieu.DinhDangTep==="png"||a.raw.TepDuLieu.DinhDangTep==="jpg"||a.raw.TepDuLieu.DinhDangTep==="jpeg"?(s(),i(n,{key:3,size:"18",color:"blue"},{default:e(()=>[l("mdi-file-image")]),_:1})):(s(),i(n,{key:4,size:"18",color:"#2161b1"},{default:e(()=>[l("mdi-paperclip")]),_:1})),t("a",q,f(a.raw.TepDuLieu.TenTep),1),o(N,{location:"top"},{activator:e(({props:h})=>[o(H,M({icon:"",variant:"flat",size:"small"},h,{class:"mr-2",onClick:P(Q=>v(a.raw.TepDuLieu),["stop"])}),{default:e(()=>[o(n,{size:"18",color:T.value},{default:e(()=>[l("mdi-cloud-download-outline")]),_:1},8,["color"])]),_:2},1040,["onClick"])]),default:e(()=>[J]),_:2},1024)])):B("",!0)])])]),_:1},8,["headers","items","loading"])]),_:1})]),_:1})}}},ae=j(O,[["__scopeId","data-v-cf8e3548"]]);export{ae as default};
