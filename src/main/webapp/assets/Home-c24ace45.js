import{p as x,m as T,a as g,g as y,u as v,b as C,c as b,d as n,e as w,f as k,h as S,o as F,r as M,i as d,j as p,w as o,V as B,k as _,l as u,n as N,q as P,s as z,t as E,v as L,_ as O}from"./index-af2df877.js";import{a as j}from"./authorization-22eeb54a.js";import{V as h}from"./VCard-98977f8b.js";import{V as f,a as D}from"./VRow-bee11424.js";import"./jquery-da988d60.js";const A=x({scrollable:Boolean,...T(),...g({tag:"main"})},"VMain"),K=y()({name:"VMain",props:A(),setup(i,l){let{slots:e}=l;const{mainStyles:c}=v(),{ssrBootStyles:r}=C();return b(()=>n(i.tag,{class:["v-main",{"v-main--scrollable":i.scrollable},i.class],style:[c.value,r.value,i.style]},{default:()=>{var m,s;return[i.scrollable?n("div",{class:"v-main__scroller"},[(m=e.default)==null?void 0:m.call(e)]):(s=e.default)==null?void 0:s.call(e)]}})),{}}}),R={class:"container wrap-content-page"},$={__name:"Home",setup(i){const{mobile:l}=w(),e=k(()=>O(()=>import("./MenuHoSo-3b9447a5.js"),["./MenuHoSo-3b9447a5.js","./index-af2df877.js","./index-04d84f71.css","./hosodvc-ad889d3d.js","./jquery-da988d60.js","./mock-data-4deb64e5.js","./_plugin-vue_export-helper-c27b6911.js","./VTooltip-4cdaab80.js","./VTooltip-8e8b8a24.css","./VCard-98977f8b.js","./VCard-f7bfd9e0.css","./MenuHoSo-f8791d3d.css"],import.meta.url)),c=S(),r=j();return function(){let s={};r.getThongTinTaiKhoan(s).then(function(a){let t={};a&&a.CaNhan&&(t=Object.assign(a.CaNhan,{LoaiDoiTuong:"CaNhan",TenDinhDanh:a.TenDinhDanh,id:a.id})),a&&a.DonViKinhDoanh&&(t=Object.assign(a.DonViKinhDoanh,{LoaiDoiTuong:"DonViKinhDoanh",TenDinhDanh:a.TenDinhDanh,id:a.id})),a&&a.CoQuanDonVi&&(t=Object.assign(a.CoQuanDonVi,{LoaiDoiTuong:"CoQuanDonVi",TenDinhDanh:a.TenDinhDanh,id:a.id})),c.SET_USERINFO(t)}).catch(function(){})}(),F(()=>{}),(s,a)=>{const t=M("router-view");return d(),p(B,null,{default:o(()=>[n(K,null,{default:o(()=>[_("div",R,[u(l)?(d(),p(h,{key:1,class:"mx-auto pa-3",style:{"box-shadow":"none !important"}},{default:o(()=>[n(f,{class:"mx-0 my-0",style:{}},{default:o(()=>[n(N,null,{activator:o(({props:V})=>[n(P,z({size:"small",color:"#1E7D30"},V,{style:{position:"absolute",top:"12px",right:"12px","z-index":"100"}}),{default:o(()=>[n(E,{size:"24",color:"#FFFFFF"},{default:o(()=>[L("mdi-menu")]),_:1})]),_:2},1040)]),default:o(()=>[n(u(e),{style:{"min-width":"350px","max-width":"600px"}})]),_:1})]),_:1}),_("div",null,[n(t)])]),_:1})):(d(),p(h,{key:0,class:"mx-auto pa-3",style:{"box-shadow":"none !important"}},{default:o(()=>[n(f,null,{default:o(()=>[n(D,{style:{"max-width":"300px !important",flex:"0 0 300px"}},{default:o(()=>[n(u(e))]),_:1}),n(D,{style:{"max-width":"calc(100% - 300px) !important",flex:"0 0 calc(100% - 300px)"}},{default:o(()=>[n(t)]),_:1})]),_:1})]),_:1}))])]),_:1})]),_:1})}}};export{$ as default};
