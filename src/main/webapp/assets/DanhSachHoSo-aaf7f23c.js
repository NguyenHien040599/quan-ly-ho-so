import{e as ct,A as i,z as it,x as ht,f as dt,_ as pt,M as O,h as yt,y as _t,B as ft,C as gt,o as vt,r as mt,i as n,j as d,w as t,l as p,d as s,k as u,G as h,q as V,O as Z,t as _,v as r,E as y,F as f,I as St,H as Tt,J as kt,D as S,n as H,s as tt,W as et,X as C,Y as M,K as wt,L as Ct}from"./index-fa19424d.js";import{u as Mt}from"./hosodvc-313d9caf.js";import{j as at}from"./mock-data-49c5f96f.js";import{_ as xt}from"./_plugin-vue_export-helper-c27b6911.js";import{V as P,a as I}from"./VRow-75f849c9.js";import{V as Dt}from"./VCard-e9c79ce7.js";import"./jquery-da988d60.js";const m=$=>(wt("data-v-9a3f6ae6"),$=$(),Ct(),$),bt=m(()=>u("div",{class:"header-content",style:{"text-transform":"uppercase"}}," Danh sách hồ sơ ",-1)),Et=m(()=>u("div",{class:"triangle-header"},null,-1)),Ot={class:"text-sub-header pl-2",style:{"text-transform":"uppercase"}},Pt=m(()=>u("span",{style:{"padding-top":"2px"}},"Thêm mới hồ sơ",-1)),It=m(()=>u("div",{class:"header-content",style:{"text-transform":"uppercase"}}," Danh sách hồ sơ ",-1)),$t=m(()=>u("div",{class:"triangle-header"},null,-1)),zt=["onClick"],Ft=["width"],Nt={key:0},Lt={class:"text-sub-header mx-0 px-0 mb-2",style:{"text-transform":"uppercase"}},Vt=m(()=>u("span",null,"Số lượng hồ sơ: ",-1)),At=m(()=>u("span",{style:{"padding-top":"2px"}},"Thêm mới hồ sơ",-1)),Kt=["onClick"],Rt={class:"td-center"},Bt={class:"pt-2"},Gt={class:"mb-1",style:{color:"#1E7D30"}},jt={class:"mb-1"},Ut=m(()=>u("span",null,"Mã hồ sơ: ",-1)),Xt={class:"mb-1"},qt=m(()=>u("span",null,"Ngày tạo: ",-1)),Wt={style:{color:"#1E7D30"}},Yt={class:"mb-1"},Jt=m(()=>u("span",null,"Trạng thái: ",-1)),Qt={style:{color:"#1E7D30"}},Zt={width:"30"},Ht={__name:"DanhSachHoSo",setup($){const{mobile:z}=ct(),A=Mt(),T=i("#1E7D30"),x=it(),D=ht(),G=dt(()=>pt(()=>import("./Pagination-3cb9e654.js"),["./Pagination-3cb9e654.js","./VRow-75f849c9.js","./index-fa19424d.js","./index-fc0f5fcf.css","./VRow-37f80755.css","./VAutocomplete-4af304a5.js","./VAutocomplete-af217798.css"],import.meta.url)),K=O(at.menuHoSo),g=yt(),{cookies:ot}=_t(),c=ft(()=>g.getMenuSelected);if(x&&x.params.hasOwnProperty("thutuc")&&x.params.thutuc){let o=K.find(function(l){return l.to.split("/")[1]===x.params.thutuc});g.SET_MENU_SELECTED(o)}else if(x.name=="ThongBao"){let o=K.find(function(l){return l.id==="thongbao"});g.SET_MENU_SELECTED(o)}else g.SET_MENU_SELECTED(K[0]);i(!1),O({required:o=>!!o&&!Array.isArray(o)||Array.isArray(o)&&o.length||"Thông tin bắt buộc"}),i(""),i(""),i(!1),i(!1),i(null),i(null),O({}),i({}),O([]);const st=O([{sortable:!1,title:"STT",align:"center",key:"stt",type:"index",class:"td-center",width:30},{sortable:!1,title:"Thông tin hồ sơ",align:"left",key:"MaDinhDanh",class:"td-left"},{sortable:!1,title:" ",align:"center",key:"action",width:30}]),F=i([]),k=i(20),R=i(!1);i(!1);const N=i(0),w=i(0),b=i(0),j=function(){let o=at.thuTucHanhChinh.find(function(l){return l.maThuTuc==c.value.thuTuc.maThuTuc});if(o&&o.thongTinHoSo){let l={data:Object.assign(o.thongTinHoSo,{TrangThaiDuLieu:{MaMuc:"01",TenMuc:"Sơ bộ"},DonViXuLy:{MaDinhDanh:"G01.105",TenGoi:"Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao"}})};A.themMoiHoSo(l).then(function(v){let a=v.resp;D.push({path:`/nop-ho-so${c.value.to}/${a.primKey}`})}).catch(function(){alert("Thêm mới hồ sơ thất bại")})}},B=function(){if(c.value&&c.value.thuTuc&&c.value.thuTuc.maThuTuc){let o={params:{page:N.value,size:k.value,thuTucHanhChinh_MaMuc:c.value.thuTuc.maThuTuc,trangThaiDuLieu_MaMuc:"01,02"}};R.value=!0,A.getDanhSachHoSo(o).then(function(l){R.value=!1,F.value=l.content,b.value=l.totalElements,w.value=l.totalPages}).catch(function(){R.value=!1,F.value=[],b.value=0,w.value=0})}};B();const U=function(o){D.push({path:"/thong-tin-ho-so/"+o.primKey})},X=function(o){D.push({path:`/nop-ho-so${c.value.to}/${o.primKey}`})},q=function(o){g.SET_SHOWCONFIRM(!0);let l={auth:!1,title:"Xóa hồ sơ",message:"Bạn có chắc chắn muốn xóa hồ sơ này",button:{yes:"Có",no:"Không"},callback:()=>{let v={data:o};A.xoaHoSo(v).then(function(a){B()}).catch(function(){})}};g.SET_CONFIG_CONFIRM_DIALOG(l)},W=function(o){g.SET_SHOWCONFIRM(!0);let l={auth:!1,title:"Xóa hồ sơ",message:"Bạn có chắc chắn muốn rút hồ sơ này",button:{yes:"Có",no:"Không"},callback:()=>{}};g.SET_CONFIG_CONFIRM_DIALOG(l)},Y=function(o){D.push({path:`/nop-ho-so${c.value.to}/${o.primKey}`,query:{id_update:o.primKey}})},J=function(o){console.log("page_pagination",o)},lt=function(o){if(!o)return"";let l=new Date(o);return`${l.getDate().toString().padStart(2,"0")}/${(l.getMonth()+1).toString().padStart(2,"0")}/${l.getFullYear()}`},nt=function(o){return o?(o/1).toFixed(0).replace(".",",").toString().replace(/\B(?=(\d{3})+(?!\d))/g,"."):""},Q=function(o){let l=new Date(o);return`${l.getDate().toString().padStart(2,"0")}/${(l.getMonth()+1).toString().padStart(2,"0")}/${l.getFullYear()} ${l.getHours().toString().padStart(2,"0")}:${l.getMinutes().toString().padStart(2,"0")}`},ut=function(o,l){let v="";return l&&(v=Array.from(l,function(a){return a[o.mapping]})),v=v.toString().replace(/,/g,", "),v};return gt(c,async o=>{B()}),vt(()=>{ot.get("Token")?g.SET_ISSIGNED(!0):(g.SET_ISSIGNED(!1),g.SET_USERINFO(""),D.push({path:"/login"}))}),(o,l)=>{const v=mt("v-data-table");return n(),d(Dt,{class:"mx-auto pa-0",style:{"box-shadow":"none !important",overflow:"inherit"}},{default:t(()=>[p(z)?y("",!0):(n(),d(P,{key:0,class:"my-0 mb-5 mx-0"},{default:t(()=>[s(I,{class:"row-header d-flex align-center justify-start py-0 px-0",style:{border:"none"}},{default:t(()=>[bt,Et,u("div",Ot,h(p(c).dossierName),1)]),_:1}),s(V,{size:"small",color:T.value,onClick:Z(j,["stop"]),class:"mx-0"},{default:t(()=>[s(_,{size:"20",class:"mr-2"},{default:t(()=>[r("mdi-plus")]),_:1}),Pt]),_:1},8,["color","onClick"])]),_:1})),p(z)?(n(),d(P,{key:1,class:"my-0 mb-5 mx-0"},{default:t(()=>[s(I,{class:"row-header d-flex align-center justify-start py-0 px-0",style:{border:"none"}},{default:t(()=>[It,$t]),_:1})]),_:1})):y("",!0),p(z)?y("",!0):(n(),d(P,{key:2,class:"mx-0 my-0"},{default:t(()=>[s(I,{cols:"12",class:"px-0 py-0"},{default:t(()=>[s(v,{headers:p(c).headerTable,items:F.value,"items-per-page":k.value,"onUpdate:itemsPerPage":l[0]||(l[0]=a=>k.value=a),"item-value":"primKey","hide-default-footer":"",class:"table-base","no-data-text":"Không có hồ sơ nào"},{item:t(({item:a,index:L})=>[u("tr",{onClick:e=>U(a.raw)},[(n(!0),f(St,null,Tt(p(c).headerTable,(e,rt)=>(n(),f("td",{key:rt,class:kt(e.class),width:e.hasOwnProperty("width")?e.width:""},[e.type=="index"?(n(),f("div",Nt,[k.value?(n(),f("div",{key:0,style:S(e.hasOwnProperty("style")?e.style:"")},h(L+1),5)):(n(),f("div",{key:1,style:S(e.hasOwnProperty("style")?e.style:"")},h(L+1),5))])):e.type=="date"?(n(),f("div",{key:1,style:S(e.hasOwnProperty("style")?e.style:"")},h(a.raw.hasOwnProperty(e.key)?lt(a.raw[e.key]):""),5)):e.type=="datetime"?(n(),f("div",{key:2,style:S(e.hasOwnProperty("style")?e.style:"")},h(a.raw.hasOwnProperty(e.key)?Q(a.raw[e.key]):""),5)):e.type=="object"?(n(),f("div",{key:3,style:S(e.hasOwnProperty("style")?e.style:"")},h(a.raw.hasOwnProperty(e.key)?a.raw[e.key][e.mapping]:""),5)):e.type=="money"?(n(),f("div",{key:4,style:S(e.hasOwnProperty("style")?e.style:"")},h(a.raw.hasOwnProperty(e.key)?nt(a.raw[e.key]):""),5)):e.type=="array"?(n(),f("div",{key:5,style:S(e.hasOwnProperty("style")?e.style:"")},h(a.raw.hasOwnProperty(e.key)?ut(e,a.raw[e.key]):""),5)):e.type=="action"?(n(),f("div",{key:6,style:S(e.hasOwnProperty("style")?e.style:"")},[s(H,null,{activator:t(({props:E})=>[s(V,tt({icon:"",variant:"flat",size:"small"},E),{default:t(()=>[s(_,{size:"24",color:T.value},{default:t(()=>[r("mdi-filter-variant")]),_:1},8,["color"])]),_:2},1040)]),default:t(()=>[s(et,null,{default:t(()=>[a.raw.TrangThaiHoSo.MaMuc=="00"?(n(),d(C,{key:0,onClick:E=>X(a.raw)},{default:t(()=>[s(M,null,{default:t(()=>[s(_,{size:"24",color:T.value,class:"mr-2"},{default:t(()=>[r("mdi-playlist-edit")]),_:1},8,["color"]),r(" Sửa hồ sơ ")]),_:1})]),_:2},1032,["onClick"])):y("",!0),a.raw.TrangThaiHoSo.MaMuc=="00"?(n(),d(C,{key:1,onClick:E=>q(a.raw)},{default:t(()=>[s(M,null,{default:t(()=>[s(_,{size:"22",color:"#FF0000",class:"mr-2"},{default:t(()=>[r("mdi-close")]),_:1}),r(" Xóa hồ sơ ")]),_:1})]),_:2},1032,["onClick"])):y("",!0),a.raw.TrangThaiHoSo.MaMuc=="01"?(n(),d(C,{key:2,onClick:E=>W(a.raw)},{default:t(()=>[s(M,null,{default:t(()=>[s(_,{size:"22",color:"#FF0000",class:"mr-2"},{default:t(()=>[r("mdi-file-refresh-outline")]),_:1}),r("Rút hồ sơ ")]),_:1})]),_:2},1032,["onClick"])):y("",!0),a.raw.TrangThaiHoSo.MaMuc=="09"&&(p(c).id=="xulydulieu"||p(c).id=="chuyendulieu")?(n(),d(C,{key:3,onClick:E=>Y(a.raw)},{default:t(()=>[s(M,null,{default:t(()=>[s(_,{size:"20",color:T.value,class:"mr-2"},{default:t(()=>[r("mdi-file-document-plus-outline")]),_:1},8,["color"]),r(" Lập hồ sơ thay đổi ")]),_:1})]),_:2},1032,["onClick"])):y("",!0)]),_:2},1024)]),_:2},1024)],4)):(n(),f("div",{key:7,style:S(e.hasOwnProperty("style")?e.style:"")},h(a.raw[e.key]),5))],10,Ft))),128))],8,zt)]),_:1},8,["headers","items","items-per-page"]),w.value&&w.value>1?(n(),d(p(G),{key:0,pageInput:N.value+1,pageCount:w.value,total:b.value,onChangePage:J,style:{"margin-bottom":"50px"}},null,8,["pageInput","pageCount","total"])):y("",!0)]),_:1})]),_:1})),p(z)?(n(),d(P,{key:3,class:"mx-0 my-0"},{default:t(()=>[s(I,{cols:"12",class:"px-0 py-0"},{default:t(()=>[u("div",Lt,h(p(c).dossierName),1),s(P,{class:"mx-0 my-0",style:{"justify-content":"flex-end"}},{default:t(()=>[s(I,{class:"px-0 py-0 pt-1",style:{"font-weight":"600",color:"#1E7D30"}},{default:t(()=>[Vt,u("span",null,h(b.value),1)]),_:1}),s(V,{size:"small",color:T.value,onClick:Z(j,["stop"]),class:"mx-0 mb-2"},{default:t(()=>[s(_,{size:"18",class:""},{default:t(()=>[r("mdi-plus")]),_:1}),At]),_:1},8,["color","onClick"])]),_:1}),s(v,{headers:st,items:F.value,"items-per-page":k.value,"onUpdate:itemsPerPage":l[1]||(l[1]=a=>k.value=a),"item-value":"primKey","hide-default-footer":"",class:"table-base","no-data-text":"Không có hồ sơ nào"},{item:t(({item:a,index:L})=>[u("tr",{onClick:e=>U(a.raw)},[u("td",Rt,[u("div",null,h((N.value+1)*k.value-k.value+L+1),1)]),u("td",Bt,[u("div",Gt,h(a.raw.MaDinhDanh),1),u("div",jt,[Ut,r(h(a.raw.MaDinhDanh),1)]),u("div",Xt,[qt,u("span",Wt,h(Q(a.raw.ThoiGianTao)),1)]),u("div",Yt,[Jt,u("span",Qt,h(a.raw.TrangThaiHoSo.TenMuc),1)])]),u("td",Zt,[s(H,null,{activator:t(({props:e})=>[s(V,tt({icon:"",variant:"flat",size:"small"},e),{default:t(()=>[s(_,{size:"24",color:T.value},{default:t(()=>[r("mdi-filter-variant")]),_:1},8,["color"])]),_:2},1040)]),default:t(()=>[s(et,null,{default:t(()=>[a.raw.TrangThaiHoSo.MaMuc=="00"?(n(),d(C,{key:0,onClick:e=>X(a.raw)},{default:t(()=>[s(M,null,{default:t(()=>[s(_,{size:"24",color:T.value,class:"mr-2"},{default:t(()=>[r("mdi-playlist-edit")]),_:1},8,["color"]),r(" Sửa hồ sơ ")]),_:1})]),_:2},1032,["onClick"])):y("",!0),a.raw.TrangThaiHoSo.MaMuc=="00"?(n(),d(C,{key:1,onClick:e=>q(a.raw)},{default:t(()=>[s(M,null,{default:t(()=>[s(_,{size:"22",color:"#FF0000",class:"mr-2"},{default:t(()=>[r("mdi-close")]),_:1}),r(" Xóa hồ sơ ")]),_:1})]),_:2},1032,["onClick"])):y("",!0),a.raw.TrangThaiHoSo.MaMuc=="01"?(n(),d(C,{key:2,onClick:e=>W(a.raw)},{default:t(()=>[s(M,null,{default:t(()=>[s(_,{size:"22",color:"#FF0000",class:"mr-2"},{default:t(()=>[r("mdi-file-refresh-outline")]),_:1}),r("Rút hồ sơ ")]),_:1})]),_:2},1032,["onClick"])):y("",!0),a.raw.TrangThaiHoSo.MaMuc=="09"&&(p(c).id=="xulydulieu"||p(c).id=="chuyendulieu")?(n(),d(C,{key:3,onClick:e=>Y(a.raw)},{default:t(()=>[s(M,null,{default:t(()=>[s(_,{size:"20",color:T.value,class:"mr-2"},{default:t(()=>[r("mdi-file-document-plus-outline")]),_:1},8,["color"]),r(" Lập hồ sơ thay đổi ")]),_:1})]),_:2},1032,["onClick"])):y("",!0)]),_:2},1024)]),_:2},1024)])],8,Kt)]),_:1},8,["headers","items","items-per-page"]),w.value&&w.value>1?(n(),d(p(G),{key:0,pageInput:N.value+1,pageCount:w.value,total:b.value,onChangePage:J,style:{"margin-bottom":"50px"}},null,8,["pageInput","pageCount","total"])):y("",!0)]),_:1})]),_:1})):y("",!0)]),_:1})}}},ue=xt(Ht,[["__scopeId","data-v-9a3f6ae6"]]);export{ue as default};
