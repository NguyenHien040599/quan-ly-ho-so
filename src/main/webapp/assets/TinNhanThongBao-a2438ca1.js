import{A as o,e as I,h as M,z as F,C as K,o as $,r as j,i as h,G as p,d as t,w as e,E as A,l as B,I as y,k as a,J as G,D as z,H as L,q as b,t as v,v as _,M as H,s as R,K as O,L as P}from"./index-af2df877.js";import{u as J}from"./hosodvc-ad889d3d.js";import{_ as U}from"./_plugin-vue_export-helper-c27b6911.js";import{V as N,a as X,b as Q}from"./VCard-98977f8b.js";import{V as W,a as Y,b as Z,c as ee}from"./VToolbarItems-34e8de7b.js";import{V as T,a as d}from"./VRow-bee11424.js";import{V as te}from"./VTooltip-4cdaab80.js";import"./jquery-da988d60.js";const s=m=>(O("data-v-d1037bf5"),m=m(),P(),m),ae=s(()=>a("div",{class:"header-content",style:{"text-transform":"uppercase"}}," Danh sách tin nhắn, thông báo ",-1)),se=s(()=>a("div",{class:"triangle-header"},null,-1)),oe={key:0,style:{height:"45px",padding:"10px 0"}},ne=s(()=>a("div",{class:"time-label"},[a("span",null,"20/08/2023 08:20")],-1)),le=s(()=>a("div",{class:"title-label"},[a("span",null,"Thông báo xác nhận kết quả gửi hồ sơ ")],-1)),ie=s(()=>a("div",{class:"content-label"},[a("span",null,"Hồ sơ 000.00.04.H40-230414-0002 đã gửi thành công. Cán bộ cơ quan đã tiếp nhận hồ sơ và đang xử lý. ")],-1)),ce=s(()=>a("span",null,"Đánh dấu đã đọc",-1)),de=s(()=>a("div",{class:"time-label"},[a("span",null,"20/08/2023 08:20")],-1)),ue=s(()=>a("div",{class:"title-label"},[a("span",null,"Thông báo xác nhận kết quả gửi hồ sơ ")],-1)),re=s(()=>a("div",{class:"content-label"},[a("span",{style:{color:"#707070"}},"Hồ sơ 000.00.04.H40-230414-0002 đã gửi thành công. Cán bộ cơ quan đã tiếp nhận hồ sơ và đang xử lý. ")],-1)),he={key:0,class:"mt-3"},pe=s(()=>a("div",{class:"sub-header-content"}," Tin nhắn, thông báo ",-1)),_e=s(()=>a("div",{class:"triangle-header"},null,-1)),me=s(()=>a("div",{style:{color:"#000","font-size":"24px","font-family":"Roboto","font-style":"normal","font-weight":"700"}}," Thông báo xác nhận kết quả gửi hồ sơ ",-1)),fe=s(()=>a("i",{style:{color:"grey"}},"(20/08/2023 10:20)",-1)),ve=s(()=>a("div",{class:"mt-2"}," Hồ sơ 000.00.04.H40-230414-0002 đã nộp thành công. Cán bộ cơ quan đã tiếp nhận hồ sơ và đang xử lý. Vui lòng chờ kết quả phản hồi trong thời hạn quy định 5 - 7 ngày. Mọi thắc mắc vui lòng gửi phản hồi sau thời gian xử lý! Xin cảm ơn! ",-1)),ge={__name:"TinNhanThongBao",setup(m){o("");const{mobile:V}=I();M();const D=J(),S=F(),C=o(0),g=o(!1),u=o([]);o(0);const f=o(0),q=o(0),r=o(!1),E=o(),k=function({done:n}){let l={params:{page:C.value,size:15,trangThaiHoSo_MaMuc:"02"}};g.value=!0,D.getTraCuuHoSo(l).then(function(i){g.value=!1,i.content.length&&(C.value+=1),u.value=u.value.concat(i.content),f.value=i.totalElements,q.value=i.totalPages,u.value.length<=i.totalElements?n("empty"):n("ok")}).catch(function(){g.value=!1,u.value=[],f.value=0,n("empty")})},w=function(n){E.value=n,r.value=!0};return K(S,async n=>{k()}),$(()=>{}),(n,l)=>{const i=j("v-infinite-scroll");return h(),p(y,null,[t(N,{class:"mx-auto pa-0",style:A([{overflow:"inherit"},B(V)?"box-shadow: none !important":""])},{default:e(()=>[a("div",null,[t(T,{class:"my-0 mb-5 mx-0"},{default:e(()=>[t(d,{class:"row-header d-flex align-center justify-start py-0 px-0",style:{border:"none"}},{default:e(()=>[ae,se]),_:1})]),_:1}),a("div",{class:G(B(V)?"px-0":"px-3")},[f.value?z("",!0):(h(),p("div",oe,"KHÔNG CÓ THÔNG BÁO NÀO")),t(i,{height:550,items:u.value,onLoad:k},{empty:e(()=>[f.value?(h(),p("div",he,"Không còn thông báo nào!")):z("",!0)]),default:e(()=>[(h(!0),p(y,null,L(u.value,c=>(h(),p(y,{key:c.primKey},[t(T,{class:"mx-0 my-0 px-3 mb-3 item-thongbao active",onClick:H(x=>w(c),["stop"])},{default:e(()=>[t(d,{class:"px-0 py-0",style:{"max-width":"50px"}},{default:e(()=>[t(v,{size:"34",color:"#1E7D30",class:""},{default:e(()=>[_("mdi-message-badge")]),_:1})]),_:1}),t(d,{class:"py-0"},{default:e(()=>[ne,le,ie]),_:1}),t(d,{class:"px-0 py-0",style:{"max-width":"40px"}},{default:e(()=>[t(te,{location:"top"},{activator:e(({props:x})=>[t(b,R({icon:"",variant:"flat",size:"small"},x),{default:e(()=>[t(v,{size:"26",color:"#1E7D30"},{default:e(()=>[_("mdi-checkbox-marked-outline")]),_:1})]),_:2},1040)]),default:e(()=>[ce]),_:1})]),_:1})]),_:2},1032,["onClick"]),t(T,{class:"mx-0 my-0 px-3 mb-2 item-thongbao",onClick:H(x=>w(c),["stop"])},{default:e(()=>[t(d,{class:"px-0 py-0",style:{"max-width":"50px"}},{default:e(()=>[t(v,{size:"34",color:"#979797",class:""},{default:e(()=>[_("mdi-message-check-outline")]),_:1})]),_:1}),t(d,{class:"py-0"},{default:e(()=>[de,ue,re]),_:1})]),_:2},1032,["onClick"])],64))),128))]),_:1},8,["items"])],2)])]),_:1},8,["style"]),t(W,{"max-width":"900",modelValue:r.value,"onUpdate:modelValue":l[2]||(l[2]=c=>r.value=c),persistent:""},{default:e(()=>[t(N,null,{default:e(()=>[t(Y,{dark:"",color:n.baseColor,class:"px-0"},{default:e(()=>[t(d,{class:"sub-header d-flex align-center justify-start py-0 px-0"},{default:e(()=>[pe,_e]),_:1}),t(Z),t(ee,null,{default:e(()=>[t(b,{variant:"flat",size:"small",icon:"",color:"#E9FFF2",onClick:l[0]||(l[0]=c=>r.value=!1)},{default:e(()=>[t(v,{size:"20"},{default:e(()=>[_("mdi-close")]),_:1})]),_:1})]),_:1})]),_:1},8,["color"]),t(X,{class:"px-3"},{default:e(()=>[me,fe,ve]),_:1}),t(Q,{class:"justify-center pb-3 px-3"},{default:e(()=>[t(b,{size:"small",variant:"elevated",color:"red","prepend-icon":"mdi-close",onClick:l[1]||(l[1]=c=>r.value=!1)},{default:e(()=>[_(" Thoát ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}}},Be=U(ge,[["__scopeId","data-v-d1037bf5"]]);export{Be as default};
