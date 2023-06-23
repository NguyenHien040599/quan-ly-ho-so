import{p as E,m as F,a as O,g as A,P as B,c as K,d as e,Q as G,x as H,h as L,y as j,A as u,o as q,i as x,F as k,w as a,k as l,R as M,v as _,N,S as R,q as b,t as V,E as z,T as D,U as $}from"./index-012aba98.js";import{t as p}from"./toastr-b359f669.js";import{$ as U}from"./jquery-da988d60.js";import{V as m,a as f}from"./VRow-d6ac88c9.js";import{V as J}from"./VForm-0a6600ff.js";const Q=E({fluid:{type:Boolean,default:!1},...F(),...O()},"VContainer"),W=A()({name:"VContainer",props:Q(),setup(s,i){let{slots:r}=i;const{rtlClasses:v}=B();return K(()=>e(s.tag,{class:["v-container",{"v-container--fluid":s.fluid},v.value,s.class],style:s.style},r)),{}}}),Z=G("authorization",{state:()=>({baseURL:"http://119.17.200.66:8023"}),getters:{userInfo:s=>s.userInfo},actions:{async login(s){let i={url:`${this.baseURL}/auth/oauth/token`,method:"POST",headers:{Accept:"application/json","Content-Type":"application/x-www-form-urlencoded"},data:s.data};return await U.ajax(i)},async getThongTinUserDangNhap(s){let i={method:"get",url:`${this.baseURL}/v1/datasharing/canbo/token`,headers:{Accept:"application/json","Content-Type":"application/json",Authorization:s.token},data:{},params:{}};return await U.ajax(i)}}});const X={class:"wrap-login"},Y={class:"container-wrap"},ee={key:0,class:"wrap-form px-4 py-3"},te=l("div",{style:{color:"white"},class:"mb-2"},"Tên đăng nhập",-1),ae=l("div",{style:{color:"white"},class:"mb-2"},"Mật khẩu",-1),se={key:1,class:"wrap-form px-3 py-3"},ne=l("div",{class:"text-login"},"TÀI KHOẢN ĐÃ ĐĂNG NHẬP HỆ THỐNG",-1),oe=l("span",null,"Truy cập hệ thống",-1),le={class:"v-btn__content"},ie=l("span",null,"Đăng xuất",-1),re={class:"text-center"},fe={__name:"Login",setup(s){p.options={closeButton:!0,timeOut:"5000",positionClass:"toast-top-center"};const i=H(),r=L(),v=Z(),{cookies:d}=j(),I=u(!1),o=u(!1),T=u(!0),g=u("admin"),h=u("Thanhtra2022"),c=u(!1),y=function(){if(o.value||!g.value||!h.value)return;o.value=!0;let S={data:{username:g.value,password:h.value,grant_type:"password",client_id:"bvdlcn-client",client_secret:"NgWhFZ8qHsEWz9587n1FOiRPUg3YQC2u3KSf9PZaTAsMvqVXDMl0RGFShhmbnb6C"}};v.login(S).then(function(t){if(o.value=!1,t&&t.access_token){let n=String(t.access_token.split(".")[1]).replace(/_/g,"/"),C=JSON.parse(atob(n));d.set("Token",t.access_token,t.expires_in),d.set("RefreshToken",t.refresh_token,t.refresh_expires_in),d.set("UserInfo",JSON.stringify(C),t.expires_in),$.defaults.headers.Authorization="Bearer "+t.access_token,r.SET_ISSIGNED(!0),r.SET_USERINFO(C),w()}else p.remove(),p.error("Tên đăng nhập hoặc mật khẩu không chính xác")}).catch(function(t){o.value=!1,p.remove(),p.error("Tên đăng nhập hoặc mật khẩu không chính xác")})},P=function(){c.value=!1,r.SET_ISSIGNED(!1),localStorage.setItem("user",null),d.set("Token",""),d.set("RefreshToken","")},w=function(){i.push({path:"/"})};return q(()=>{d.get("Token")?c.value=!0:c.value=!1}),(S,t)=>(x(),k("div",X,[e(W,{id:"login-page",class:"px-0 pt-0",fluid:"",tag:"section"},{default:a(()=>[l("div",Y,[c.value?z("",!0):(x(),k("div",ee,[l("div",null,[e(J,{ref:"form",modelValue:T.value,"onUpdate:modelValue":t[2]||(t[2]=n=>T.value=n),"lazy-validation":"",class:""},{default:a(()=>[e(m,{class:"action-title my-0 mb-2",align:"center",style:{"text-align":"center","font-size":"22px","font-family":"'Roboto Slab'",color:"#fff","font-weight":"700"}},{default:a(()=>[e(f,{class:"py-0"},{default:a(()=>[_("ĐĂNG NHẬP")]),_:1})]),_:1}),e(m,{class:"my-0"},{default:a(()=>[e(f,{class:"py-0"},{default:a(()=>[te,e(N,{dense:"",class:"input-text",modelValue:g.value,"onUpdate:modelValue":t[0]||(t[0]=n=>g.value=n),rules:[n=>!!n||"Tên đăng nhập là bắt buộc"],required:"","prepend-inner-icon":"mdi:mdi-account",onKeyup:R(y,["enter"]),"hide-details":"auto"},null,8,["modelValue","rules","onKeyup"])]),_:1})]),_:1}),e(m,{xs12:"",class:"mb-0"},{default:a(()=>[e(f,{class:"py-0"},{default:a(()=>[ae,e(N,{class:"input-text",dense:"",modelValue:h.value,"onUpdate:modelValue":t[1]||(t[1]=n=>h.value=n),type:"password",rules:[n=>!!n||"Mật khẩu là bắt buộc"],required:"","prepend-inner-icon":"mdi:mdi-key",onKeyup:R(y,["enter"]),"hide-details":"auto"},null,8,["modelValue","rules","onKeyup"])]),_:1})]),_:1}),e(m,{align:"center",class:"wrap-btn-login my-3"},{default:a(()=>[e(f,null,{default:a(()=>[e(b,{class:"my-0 white--text mr-3 btn-login",style:{padding:"0 15px !important"},loading:o.value,disabled:o.value,onClick:y},{default:a(()=>[e(V,{size:"20",icon:"mdi:mdi-login"}),_("  Đăng nhập ")]),_:1},8,["loading","disabled"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])])),c.value?(x(),k("div",se,[ne,e(m,{align:"center",style:{margin:"20px 0","text-align":"center"}},{default:a(()=>[e(f,{cols:"12"},{default:a(()=>[e(b,{small:"",class:"my-0 white--text mr-3 btn-login",style:{padding:"0 15px !important"},loading:o.value,disabled:o.value,onClick:w},{default:a(()=>[e(V,{size:"20",icon:"mdi:mdi-home-circle-outline"}),_("  "),oe]),_:1},8,["loading","disabled"]),e(b,{class:"my-0 white--text mr-3 mt-3 btn-login",small:"",style:{padding:"0 15px !important"},loading:o.value,disabled:o.value,onClick:P},{default:a(()=>[l("div",le,[e(V,{size:"18",icon:"mdi:mdi-logout-variant"}),_("  "),ie])]),_:1},8,["loading","disabled"])]),_:1})]),_:1})])):z("",!0)])]),_:1}),l("div",re,[e(M,{value:I.value},{default:a(()=>[e(D,{indeterminate:"",size:"64"})]),_:1},8,["value"])])]))}};export{fe as default};
