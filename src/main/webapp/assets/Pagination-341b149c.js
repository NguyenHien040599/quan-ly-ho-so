import{a as d,V as C}from"./VRow-9bbff3db.js";import{V as N}from"./VAutocomplete-74c51d3c.js";import{n as l,o as k,H as _,h,i as f,w as r,v as T,j as t,B as p,I as B,d as v,A as y}from"./index-4c35af64.js";const D=t("span",{style:{color:"#1E7D30","font-weight":"700"}},"Tổng số:",-1),E={style:{color:"#1E7D30","font-weight":"700"}},I={class:"flex text-center"},U={role:"navigation","aria-label":"Pagination Navigation",style:{position:"initial"}},A={class:"v-pagination theme--light"},j=t("i",{"aria-hidden":"true",class:"v-icon notranslate mdi mdi-chevron-left theme--light"},null,-1),z=[j],H={style:{background:"#1E7D30"},type:"button","aria-current":"true",class:"v-pagination__item v-pagination__item--active primary"},M=t("i",{"aria-hidden":"true",class:"v-icon notranslate mdi mdi-chevron-right theme--light"},null,-1),R=[M],G={__name:"Pagination",props:{pageInput:{type:Number,default:0},pageCount:{type:Number,default:0},total:{type:Number,default:0},showTong:{type:Boolean,default:!0}},emits:["changePage"],setup(m,{emit:x}){const s=m,e=l(0),i=l(1),c=l(s.pageCount),b=l(s.total),g=l([]);l("");const P=function(){e.value-=1,i.value=e.value},w=function(){e.value+=1,i.value=e.value};return k(()=>{e.value=s.pageInput,i.value=e.value;let n=[];for(let a=1;a<=s.pageCount;a++){let o={name:"Trang "+a,value:a};n.push(o)}g.value=n}),_(c,async(n,a)=>{let o=[];for(let u=1;u<=n;u++){let V={name:"Trang "+u,value:u};o.push(V)}g.value=o}),_(i,async(n,a)=>{e.value=n,x("changePage",e)}),(n,a)=>(h(),f(C,{class:"mt-0",style:{"margin-bottom":"30px","align-items":"center"}},{default:r(()=>[m.showTong?(h(),f(d,{key:0,class:"flex",style:{"max-width":"200px"}},{default:r(()=>[D,T("  "),t("span",E,p(b.value),1)]),_:1})):B("",!0),v(d,null,{default:r(()=>[t("div",I,[t("nav",U,[t("ul",A,[t("li",null,[t("button",{onClick:P,type:"button","aria-label":"Previous page",style:{width:"32px",height:"32px"},class:y(e.value==1?"v-pagination__navigation v-pagination__navigation--disabled":"v-pagination__navigation")},z,2)]),t("li",null,[t("button",H,p(e.value)+" / "+p(c.value),1)]),t("li",null,[t("button",{onClick:w,type:"button","aria-label":"Next page",style:{width:"32px",height:"32px"},class:y(e.value==c.value?"v-pagination__navigation v-pagination__navigation--disabled":"v-pagination__navigation")},R,2)])])])])]),_:1}),v(d,{style:{"max-width":"150px"}},{default:r(()=>[v(N,{class:"input-form","hide-no-data":"",items:g.value,modelValue:i.value,"onUpdate:modelValue":a[0]||(a[0]=o=>i.value=o),"item-title":"name","item-value":"value",dense:"",outlined:"","hide-details":"auto",style:{}},null,8,["items","modelValue"])]),_:1})]),_:1}))}};export{G as default};
