import{p as m,bv as k,g as V,c as f,d as a,s as n,bw as b,Z as C,$ as A,bx as O,ad as c,a3 as h,B as x,a1 as U,a4 as F,a5 as p,I as N,by as _,bz as w}from"./index-7ff11648.js";const z=m({...k({falseIcon:"$radioOff",trueIcon:"$radioOn"})},"VRadio"),T=V()({name:"VRadio",props:z(),setup(e,o){let{slots:s}=o;return f(()=>a(b,n(e,{class:["v-radio",e.class],style:e.style,type:"radio"}),s)),{}}});const B=m({height:{type:[Number,String],default:"auto"},...C(),...A(O(),["multiple"]),trueIcon:{type:c,default:"$radioOn"},falseIcon:{type:c,default:"$radioOff"},type:{type:String,default:"radio"}},"VRadioGroup"),Z=V()({name:"VRadioGroup",inheritAttrs:!1,props:B(),emits:{"update:modelValue":e=>!0},setup(e,o){let{attrs:s,slots:t}=o;const y=h(),i=x(()=>e.id||`radio-group-${y}`),l=U(e,"modelValue");return f(()=>{const[v,I]=F(s),[g,D]=p.filterProps(e),[R,L]=b.filterProps(e),r=t.label?t.label({label:e.label,props:{for:i.value}}):e.label;return a(p,n({class:["v-radio-group",e.class],style:e.style},v,g,{modelValue:l.value,"onUpdate:modelValue":d=>l.value=d,id:i.value}),{...t,default:d=>{let{id:u,messagesId:P,isDisabled:G,isReadonly:$}=d;return a(N,null,[r&&a(_,{id:u.value},{default:()=>[r]}),a(w,n(R,{id:u.value,"aria-describedby":P.value,defaultsTarget:"VRadio",trueIcon:e.trueIcon,falseIcon:e.falseIcon,type:e.type,disabled:G.value,readonly:$.value,"aria-labelledby":r?u.value:void 0,multiple:!1},I,{modelValue:l.value,"onUpdate:modelValue":S=>l.value=S}),t)])}})}),{}}});export{Z as V,T as a};
