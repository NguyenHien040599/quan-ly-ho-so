import{aR as H,p as V,bK as A,bM as L,g as h,a1 as O,bL as U,A as $,aw as M,C as R,B as P,s as _,c as y,ai as W,aj as j,Q as N,d as t,aT as f,ay as z,m as S,a as w,aU as K,aW as Q,a_ as q,aE as G,aB as J,aC as k,b2 as X,b5 as Y,b9 as Z,aF as p,P as ee,a9 as ae,aD as F,bb as te,al as b,bN as le,b0 as oe}from"./index-af2df877.js";const ve=H("flex-grow-1","div","VSpacer");const ne=V({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...A({origin:"center center",scrollStrategy:"block",transition:{component:L},zIndex:2400})},"VDialog"),me=h()({name:"VDialog",props:ne(),emits:{"update:modelValue":e=>!0},setup(e,u){let{slots:a}=u;const o=O(e,"modelValue"),{scopeId:v}=U(),s=$();function m(i){var r,c;const n=i.relatedTarget,l=i.target;if(n!==l&&((r=s.value)!=null&&r.contentEl)&&((c=s.value)!=null&&c.globalTop)&&![document,s.value.contentEl].includes(l)&&!s.value.contentEl.contains(l)){const d=z(s.value.contentEl);if(!d.length)return;const g=d[0],x=d[d.length-1];n===g?x.focus():g.focus()}}M&&R(()=>o.value&&e.retainFocus,i=>{i?document.addEventListener("focusin",m):document.removeEventListener("focusin",m)},{immediate:!0}),R(o,async i=>{var n,l;await j(),i?(n=s.value.contentEl)==null||n.focus({preventScroll:!0}):(l=s.value.activatorEl)==null||l.focus({preventScroll:!0})});const T=P(()=>_({"aria-haspopup":"dialog","aria-expanded":String(o.value)},e.activatorProps));return y(()=>{const[i]=N.filterProps(e);return t(N,_({ref:s,class:["v-dialog",{"v-dialog--fullscreen":e.fullscreen,"v-dialog--scrollable":e.scrollable},e.class],style:e.style},i,{modelValue:o.value,"onUpdate:modelValue":n=>o.value=n,"aria-modal":"true",activatorProps:T.value,role:"dialog"},v),{activator:a.activator,default:function(){for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return t(f,{root:"VDialog"},{default:()=>{var c;return[(c=a.default)==null?void 0:c.call(a,...l)]}})}})}),W({},s)}});const se=V({text:String,...S(),...w()},"VToolbarTitle"),re=h()({name:"VToolbarTitle",props:se(),setup(e,u){let{slots:a}=u;return y(()=>{const o=!!(a.default||a.text||e.text);return t(e.tag,{class:["v-toolbar-title",e.class],style:e.style},{default:()=>{var v;return[o&&t("div",{class:"v-toolbar-title__placeholder"},[a.text?a.text():e.text,(v=a.default)==null?void 0:v.call(a)])]}})}),{}}}),ie=[null,"prominent","default","comfortable","compact"],ce=V({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:e=>ie.includes(e)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...K(),...S(),...Q(),...q(),...w({tag:"header"}),...G()},"VToolbar"),ge=h()({name:"VToolbar",props:ce(),setup(e,u){var d;let{slots:a}=u;const{backgroundColorClasses:o,backgroundColorStyles:v}=J(k(e,"color")),{borderClasses:s}=X(e),{elevationClasses:m}=Y(e),{roundedClasses:T}=Z(e),{themeClasses:i}=p(e),{rtlClasses:n}=ee(),l=ae(!!(e.extended||(d=a.extension)!=null&&d.call(a))),r=P(()=>parseInt(Number(e.height)+(e.density==="prominent"?Number(e.height):0)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0),10)),c=P(()=>l.value?parseInt(Number(e.extensionHeight)+(e.density==="prominent"?Number(e.extensionHeight):0)-(e.density==="comfortable"?4:0)-(e.density==="compact"?8:0),10):0);return F({VBtn:{variant:"text"}}),y(()=>{var E;const g=!!(e.title||a.title),x=!!(a.image||e.image),B=(E=a.extension)==null?void 0:E.call(a);return l.value=!!(e.extended||B),t(e.tag,{class:["v-toolbar",{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},o.value,s.value,m.value,T.value,i.value,n.value,e.class],style:[v.value,e.style]},{default:()=>[x&&t("div",{key:"image",class:"v-toolbar__image"},[a.image?t(f,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},a.image):t(te,{key:"image-img",cover:!0,src:e.image},null)]),t(f,{defaults:{VTabs:{height:b(r.value)}}},{default:()=>{var C,I,D;return[t("div",{class:"v-toolbar__content",style:{height:b(r.value)}},[a.prepend&&t("div",{class:"v-toolbar__prepend"},[(C=a.prepend)==null?void 0:C.call(a)]),g&&t(re,{key:"title",text:e.title},{text:a.title}),(I=a.default)==null?void 0:I.call(a),a.append&&t("div",{class:"v-toolbar__append"},[(D=a.append)==null?void 0:D.call(a)])])]}}),t(f,{defaults:{VTabs:{height:b(c.value)}}},{default:()=>[t(le,null,{default:()=>[l.value&&t("div",{class:"v-toolbar__extension",style:{height:b(c.value)}},[B])]})]})]})}),{contentHeight:r,extensionHeight:c}}}),ue=V({...S(),...oe({variant:"text"})},"VToolbarItems"),be=h()({name:"VToolbarItems",props:ue(),setup(e,u){let{slots:a}=u;return F({VBtn:{color:k(e,"color"),height:"inherit",variant:k(e,"variant")}}),y(()=>{var o;return t("div",{class:["v-toolbar-items",e.class],style:e.style},[(o=a.default)==null?void 0:o.call(a)])}),{}}});export{me as V,ge as a,ve as b,be as c};
