import{y as O,U as F,N as T,A as C,i as u,j as s,w as r,d,G as z,I as H,H as M,J as E,k as G,F as P,O as k,D as m,l as b,t as K,v as D,q as L,M as R}from"./index-af2df877.js";import{$ as q}from"./jquery-da988d60.js";import{l as S}from"./main-db17575a.js";import{V as J}from"./VForm-9f550b47.js";import{V as w,a as c}from"./VRow-bee11424.js";import{V as Y}from"./VTextarea-10408bd3.js";import{V as _}from"./VAutocomplete-9f49e379.js";import{V as Q}from"./VCard-98977f8b.js";const{cookies:W}=O(),X=F("timkiemnangcao",{state:()=>({baseURL:"http://119.17.200.66:8023"}),getters:{userInfo:p=>p.userInfo},actions:{async loadDataSource(p){let f=p.api;p.api.indexOf("http")<0&&(f=this.baseURL+p.api);let y={url:f,method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+W.get("Token")},data:{}};return await q.ajax(y)}}}),re={__name:"TimKiemNangCao",props:{mauNhap:{type:Object,default:{}},dataInput:{type:Object,default:{}}},emits:["submitSearch"],setup(p,{expose:f,emit:y}){const V=p,A=X(),i=T(V.mauNhap),B=T(V.dataInput),t=C({}),I=function(n){let a=Object.assign({},t.value);for(let e in i){let l=i[e];if(l.type=="date"&&a[l.name]&&(a[l.name]=$(a[l.name])),l.type=="money"&&a[l.name]&&(a[l.name]=Number(a[l.name].toString().replace(/\./g,""))),l.type=="select"&&a[l.name]){let o=Array.isArray(a[l.name])?a[l.name]:[a[l.name]],j=Array.from(o,function(U){let g={};return g[l.itemText]=U[l.itemText],g[l.itemValue]=U[l.itemValue],g});a[l.name]=j}}y("submitSearch",a)},N=function(n){for(let a in i){let e=i[a];e.type==="select"&&e.hasOwnProperty("api")&&e.api&&(!i[a].dataSource||i[a].dataSource.length==0)&&A.loadDataSource(e).then(function(l){let o=e.responseDataApi?l[e.responseDataApi]:l;i[a].dataSource=o}).catch(function(){})}t.value=B;for(let a in t.value){let e=i.find(function(l){return l.name==a});e&&e.type,e&&e.type==="money"&&(t.value[a]=currency(t.value[a])),e&&e.type==="select"&&!e.multiple&&(t.value[a]=Array.isArray(t.value[a])?t.value[a][0]:t.value[a])}},h=n=>{try{if(n.getDate()){const a=n.getDate(),e=n.getMonth()+1,l=n.getFullYear();return`${a.toString().padStart(2,"0")}/${e.toString().padStart(2,"0")}/${l}`}}catch{}},x=n=>{console.log("dateInput",t.value[n])},v=C({format:"dd/MM/yyyy"}),$=function(n){if(!n)return"";const[a,e,l]=n.split("/");let o=`${l}-${e.padStart(2,"0")}-${a.padStart(2,"0")}`;return new Date(o).getTime()};return f({initForm:N,data:t}),(n,a)=>(u(),s(Q,{class:"mx-auto",style:{overflow:"initial",position:"initial"},flat:""},{default:r(()=>[d(J,{ref:"formTimKiem","lazy-validation":""},{default:r(()=>[d(w,{class:"my-0"},{default:r(()=>[(u(!0),z(H,null,M(p.mauNhap,(e,l)=>(u(),s(c,{key:l,class:E([e.fieldClass,"py-0 mb-2"])},{default:r(()=>[G("label",null,P(e.title),1),e.type==="textfield"?(u(),s(k,{key:0,class:"flex input-form",modelValue:t.value[e.name],"onUpdate:modelValue":o=>t.value[e.name]=o,placeholder:e.placeHolder,solo:"",dense:"","hide-details":"auto",clearable:""},null,8,["modelValue","onUpdate:modelValue","placeholder"])):m("",!0),e.type==="number"?(u(),s(k,{key:1,class:"flex input-form",modelValue:t.value[e.name],"onUpdate:modelValue":o=>t.value[e.name]=o,placeholder:e.placeHolder,solo:"",dense:"","hide-details":"auto",clearable:"",type:"number"},null,8,["modelValue","onUpdate:modelValue","placeholder"])):m("",!0),e.type==="textarea"?(u(),s(Y,{key:2,class:"flex input-form",modelValue:t.value[e.name],"onUpdate:modelValue":o=>t.value[e.name]=o,placeholder:e.placeHolder,solo:"",dense:"","hide-details":"auto",clearable:"",rows:e.hasOwnProperty("rows")?e.rows:3},null,8,["modelValue","onUpdate:modelValue","placeholder","rows"])):m("",!0),e.type==="date"?(u(),s(b(S),{key:3,class:"flex",position:"left","select-text":"Chọn","cancel-text":"Thoát",modelValue:t.value[e.name],"onUpdate:modelValue":o=>t.value[e.name]=o,"text-input":"",format:h,placeholder:"dd/mm/yyyy","text-input-options":v.value,onBlur:o=>x(e.name)},null,8,["modelValue","onUpdate:modelValue","text-input-options","onBlur"])):m("",!0),e.type==="daterange"?(u(),s(w,{key:4},{default:r(()=>[d(c,null,{default:r(()=>[d(b(S),{class:"flex",position:"left","select-text":"Chọn","cancel-text":"Thoát",modelValue:t.value[e.name],"onUpdate:modelValue":o=>t.value[e.name]=o,"text-input":"",format:h,placeholder:"dd/mm/yyyy","text-input-options":v.value,onBlur:o=>x(e.name)},null,8,["modelValue","onUpdate:modelValue","text-input-options","onBlur"])]),_:2},1024),d(c,{class:"px-0",style:{width:"20px","max-width":"20px","padding-top":"15px"}},{default:r(()=>[d(K,{size:"24",color:"#1E7D30"},{default:r(()=>[D("mdi-minus")]),_:1})]),_:1}),d(c,null,{default:r(()=>[d(b(S),{class:"flex",position:"left","select-text":"Chọn","cancel-text":"Thoát",modelValue:t.value[e.nameTo],"onUpdate:modelValue":o=>t.value[e.nameTo]=o,"text-input":"",format:h,placeholder:"dd/mm/yyyy","text-input-options":v.value,onBlur:o=>x(e.nameTo)},null,8,["modelValue","onUpdate:modelValue","text-input-options","onBlur"])]),_:2},1024)]),_:2},1024)):m("",!0),e.type==="money"?(u(),s(k,{key:5,class:"flex input-form",onInput:o=>n.toCurrency(e.name),modelValue:t.value[e.name],"onUpdate:modelValue":o=>t.value[e.name]=o,type:"number",placeholder:e.placeHolder,solo:"",dense:"","hide-details":"auto",clearable:""},null,8,["onInput","modelValue","onUpdate:modelValue","placeholder"])):m("",!0),e.type==="select"&&!e.api?(u(),s(_,{key:6,class:"flex input-form","hide-no-data":"",modelValue:t.value[e.name],"onUpdate:modelValue":o=>t.value[e.name]=o,items:e.dataSource,multiple:e.multiple,"item-title":e.itemText,"item-value":e.itemValue,dense:"",solo:"","hide-details":"auto","return-object":"",clearable:""},null,8,["modelValue","onUpdate:modelValue","items","multiple","item-title","item-value"])):m("",!0),e.type==="select"&&e.api?(u(),s(_,{key:7,class:"flex input-form","hide-no-data":"",modelValue:t.value[e.name],"onUpdate:modelValue":o=>t.value[e.name]=o,items:e.dataSource,multiple:e.multiple,"item-title":e.itemText,"item-value":e.itemValue,dense:"",solo:"","hide-details":"auto","return-object":"",clearable:""},null,8,["modelValue","onUpdate:modelValue","items","multiple","item-title","item-value"])):m("",!0)]),_:2},1032,["class"]))),128)),d(c,{class:"py-2 px-3",cols:"12"},{default:r(()=>[d(L,{size:"small",color:"#1E7D30","prepend-icon":"mdi-magnify",class:"mx-0",style:{float:"right"},onClick:R(I,["stop"])},{default:r(()=>[D(" Tìm kiếm ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},512)]),_:1}))}};export{re as default};
