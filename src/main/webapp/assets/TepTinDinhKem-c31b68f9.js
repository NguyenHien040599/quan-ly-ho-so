import{e as ae,A as p,h as ne,B as ie,M as P,o as se,i as s,G as T,d as o,w as l,I as A,H as j,l as ue,j as r,k as u,F as v,v as c,D as b,t as d,q as _,s as z,O as D,N as ce,K as de,L as re}from"./index-fe848f2d.js";import{$ as N}from"./jquery-da988d60.js";import{u as pe}from"./hosodvc-bdbcb3b1.js";import{t as E}from"./toastr-b359f669.js";import{_ as fe}from"./_plugin-vue_export-helper-c27b6911.js";import{V as U,a as O}from"./VRow-09778906.js";import{V as M}from"./VTooltip-c084eb72.js";import{V as I,a as R,b as he}from"./VCard-8b59fd30.js";import{V as X,a as q,b as Q,c as W}from"./VToolbarItems-0013b440.js";import{V as Te}from"./VForm-169f16b1.js";const f=C=>(de("data-v-03ad20c7"),C=C(),re(),C),_e={style:{"font-weight":"600",width:"100%"}},ye={key:0,style:{color:"red"}},me=["onClick"],ve={class:"ml-2",style:{"font-size":"14px","text-decoration":"underline",color:"#1E7D30"}},ge=f(()=>u("span",null,"Tải xuống",-1)),De=f(()=>u("span",null,"Xóa",-1)),xe={key:1,style:{width:"100%"}},ke={style:{width:"100%"},class:"pl-3"},we=f(()=>u("span",null,"- ",-1)),be=["onClick"],Ce={class:"ml-2",style:{"font-size":"14px","text-decoration":"underline",color:"#1E7D30"}},Le=f(()=>u("span",null,"Tải xuống",-1)),Se=f(()=>u("span",null,"Xóa",-1)),Ge={style:{width:"100%"}},ze=f(()=>u("span",{style:{"font-size":"14px","text-transform":"none"}},"Tải lên tệp",-1)),Ee=f(()=>u("div",{class:"sub-header-content"}," Tên giấy tờ ",-1)),Me=f(()=>u("div",{class:"triangle-header"},null,-1)),Ve=f(()=>u("div",{class:"sub-header-content"}," Tệp tin đính kèm ",-1)),He=f(()=>u("div",{class:"triangle-header"},null,-1)),Ae=["src"],Ie={__name:"TepTinDinhKem",props:{permission:{type:Boolean,default:!1}},setup(C){E.options={closeButton:!0,timeOut:"5000",positionClass:"toast-top-center"},ae();const x=p("#1E7D30"),y=ne(),V=pe();p(!1);const k=p(!1),L=p(!1),F=p(""),S=p(""),K=p(null),g=p(!1),B=ie(function(){let n=y.thongTinHoSo.ThanhPhanHoSo.filter(function(t){return!t.MaThanhPhanHoSo||t.MaThanhPhanHoSo&&t.MaThanhPhanHoSo.MaMuc.split("_")[0]!=="BMDT"});return n.forEach((t,e)=>{t.HinhThucGiayTo.MaMuc=="true"&&(n[e].items=n.filter(function(i){let a=i.IDGiayTo.split("-");return a[0]=="GTK"&&a[1]==t.IDGiayTo}))}),n.filter(function(t){return String(t.IDGiayTo).split("-")[0]!=="GTK"})}),H=p(null),$=p(null);P([{sortable:!1,title:"Tên giấy tờ",align:"left",key:"tenGiayTo",class:"td-left"},{sortable:!1,title:"Tệp đính kèm",align:"left",key:"tepDinhKem",class:"td-left"}]),P([{sortable:!1,title:"TT",align:"center",key:"index",class:"td-left"},{sortable:!1,title:"Tên giấy tờ",align:"left",key:"tepDinhKem",class:"td-left"}]);const J=function(n,t){H.value=n,$.value=t,document.getElementById("file_upload_tep_dinh_kem").value="",document.getElementById("file_upload_tep_dinh_kem").click()},Y=function(n){console.log("fileUpload",n);let t=n.name?n.name.split("."):"",e=t?t[t.length-1]:"",i=["png","jpg","jpeg","pdf","docx","doc","xls","xlsx","txt","rtf"],a=10;try{a=fileSizeAllowConfig||10}catch{}try{i=fileTypeAllowConfig||["png","jpg","jpeg","pdf","docx","doc","xls","xlsx","txt","rtf"]}catch{}let m=i?i.filter(function(w){return w===String(e).toLocaleLowerCase()}):"",h=!1;return m&&m.length>0?Number(n.size)<=a*1048576?h=!0:(E.error("Tài liệu tải lên dung lượng tối đa là "+a+" MB"),h=!1):(E.error("Tài liệu tải lên chỉ chấp nhận các định dạng "+i.toString()),h=!1),h},Z=function(){let n=N("#file_upload_tep_dinh_kem")[0].files[0];Y(n)&&(H.value.HinhThucGiayTo.MaMuc=="false"?V.uploadTep(n).then(function(e){y.$patch(i=>{i.thongTinHoSo.ThanhPhanHoSo[$.value+1].TepDuLieu=e.resp})}).catch(function(e){}):le())},G=function(n,t){g.value||(g.value=!0,V.taiTep(n).then(function(e){if(g.value=!1,t=="preview")F.value=e,L.value=!0;else{var i=document.createElement("a");document.body.appendChild(i),i.style="display: none",i.href=e,i.download=n.TenTep,i.click()}}).catch(function(e){g.value=!1}))},ee=function(n,t){y.$patch(e=>{e.thongTinHoSo.ThanhPhanHoSo[t+1].TepDuLieu={DinhDangTep:"",DuongDanURL:"",Ext:"unknown",KichThuocTep:0,MaDinhDanh:"",TenTep:""}})},le=function(){S.value="",k.value=!0},oe=function(n,t){y.SET_SHOWCONFIRM(!0);let e={auth:!1,title:"Xóa giấy tờ",message:"Bạn có chắc chắn muốn xóa giấy tờ này",button:{yes:"Có",no:"Không"},callback:()=>{y.$patch(i=>{i.thongTinHoSo.ThanhPhanHoSo[t+1].items.splice(n,1)})}};y.SET_CONFIG_CONFIRM_DIALOG(e)},te=async function(){const{valid:n}=await K.value.validate();if(n){let t=N("#file_upload_tep_dinh_kem")[0].files[0];V.uploadTep(t).then(function(e){k.value=!1;let i={IDGiayTo:"GTK-"+H.value.IDGiayTo,TenGiayTo:S.value,SoBanGiay:0,HinhThucGiayTo:{MaMuc:"",TenMuc:""},NgayBoSung:null,MaThanhPhanHoSo:null,MaGiayToKetQua:null,DaHuyBoThayThe:!1,TinhTrangSoHoa:1,GiayToCaNhanToChuc:{MaDinhDanh:"",TenGiayTo:""},TepDuLieu:e.resp,GiayToLuuTruSo:{MaDinhDanh:"",TenGiayTo:""},DuLieuDienTu:{MaDinhDanh:""}};y.$patch(a=>{a.thongTinHoSo.ThanhPhanHoSo.push(i)}),console.log("tphsAddthanhPhanHoSo",B.value)}).catch(function(e){E.error("Tải lên giấy tờ thất bại")})}};return se(()=>{}),(n,t)=>(s(),T(A,null,[o(I,{class:"pa-0 thanhphanhoso",style:{"box-shadow":"none !important",width:"100%"}},{default:l(()=>[o(U,{class:"mx-0 my-0",style:{"border-top":"1px solid #DADADA","border-left":"1px solid #DADADA"}},{default:l(()=>[(s(!0),T(A,null,j(ue(B),(e,i)=>(s(),r(U,{key:e.IDGiayTo,class:"mx-0 my-0 px-2 py-2",style:{width:"100%","border-bottom":"1px solid #DADADA","border-right":"1px solid #DADADA","align-items":"center","min-height":"42px"}},{default:l(()=>[u("div",_e,[u("span",null,v(i+1)+". ",1),u("span",null,v(e.TenGiayTo),1),c(),e.HinhThucGiayTo.TenMuc=="true"?(s(),T("span",ye,"(*)")):b("",!0)]),e.TepDuLieu.KichThuocTep?(s(),T("div",{key:0,class:"py-1",onClick:a=>G(e.TepDuLieu,"preview"),style:{width:"100%"}},[e.TepDuLieu.Ext==="xls"||e.TepDuLieu.Ext==="xlsx"?(s(),r(d,{key:0,size:"18",color:"green"},{default:l(()=>[c("mdi-file-excel-outline")]),_:1})):e.TepDuLieu.Ext==="doc"||e.TepDuLieu.Ext==="docx"?(s(),r(d,{key:1,size:"18",color:"blue"},{default:l(()=>[c("mdi-file-word-outline")]),_:1})):e.TepDuLieu.Ext==="pdf"?(s(),r(d,{key:2,size:"18",color:"red"},{default:l(()=>[c("mdi-file-pdf-box")]),_:1})):e.TepDuLieu.Ext==="png"||e.TepDuLieu.Ext==="jpg"||e.TepDuLieu.Ext==="jpeg"?(s(),r(d,{key:3,size:"18",color:"blue"},{default:l(()=>[c("mdi-file-image")]),_:1})):(s(),r(d,{key:4,size:"18",color:"#2161b1"},{default:l(()=>[c("mdi-paperclip")]),_:1})),u("a",ve,v(e.TepDuLieu.TenTep)+"."+v(e.TepDuLieu.Ext),1),o(M,{location:"top"},{activator:l(({props:a})=>[o(_,z({icon:"",variant:"flat",size:"small"},a,{class:"mr-0",onClick:D(m=>G(e.TepDuLieu,"download"),["stop"])}),{default:l(()=>[o(d,{size:"18",color:x.value},{default:l(()=>[c("mdi-cloud-download-outline")]),_:1},8,["color"])]),_:2},1040,["onClick"])]),default:l(()=>[ge]),_:2},1024),o(M,{location:"top"},{activator:l(({props:a})=>[o(_,z({icon:"",variant:"flat",size:"small"},a,{class:"mr-2",onClick:D(m=>ee(e,i),["stop"])}),{default:l(()=>[o(d,{size:"18",color:"red"},{default:l(()=>[c("mdi-close")]),_:1})]),_:2},1040,["onClick"])]),default:l(()=>[De]),_:2},1024)],8,me)):b("",!0),e.HinhThucGiayTo.MaMuc=="true"?(s(),T("div",xe,[(s(!0),T(A,null,j(e.items,(a,m)=>(s(),T("div",{key:m},[u("div",ke,[we,u("span",null,v(a.TenGiayTo)+": ",1),a.TepDuLieu.KichThuocTep?(s(),T("span",{key:0,class:"py-1",onClick:h=>G(a.TepDuLieu,"preview")},[a.TepDuLieu.Ext==="xls"||a.TepDuLieu.Ext==="xlsx"?(s(),r(d,{key:0,size:"18",color:"green"},{default:l(()=>[c("mdi-file-excel-outline")]),_:1})):a.TepDuLieu.Ext==="doc"||a.TepDuLieu.Ext==="docx"?(s(),r(d,{key:1,size:"18",color:"blue"},{default:l(()=>[c("mdi-file-word-outline")]),_:1})):a.TepDuLieu.Ext==="pdf"?(s(),r(d,{key:2,size:"18",color:"red"},{default:l(()=>[c("mdi-file-pdf-box")]),_:1})):a.TepDuLieu.Ext==="png"||a.TepDuLieu.Ext==="jpg"||a.TepDuLieu.Ext==="jpeg"?(s(),r(d,{key:3,size:"18",color:"blue"},{default:l(()=>[c("mdi-file-image")]),_:1})):(s(),r(d,{key:4,size:"18",color:"#2161b1"},{default:l(()=>[c("mdi-paperclip")]),_:1})),u("a",Ce,v(a.TepDuLieu.TenTep)+"."+v(a.TepDuLieu.Ext),1),o(M,{location:"top"},{activator:l(({props:h})=>[o(_,z({icon:"",variant:"flat",size:"small"},h,{class:"mr-0",onClick:D(w=>G(a.TepDuLieu,"download"),["stop"])}),{default:l(()=>[o(d,{size:"18",color:x.value},{default:l(()=>[c("mdi-cloud-download-outline")]),_:1},8,["color"])]),_:2},1040,["onClick"])]),default:l(()=>[Le]),_:2},1024),o(M,{location:"top"},{activator:l(({props:h})=>[o(_,z({icon:"",variant:"flat",size:"small"},h,{class:"mr-2",onClick:D(w=>oe(m,i),["stop"])}),{default:l(()=>[o(d,{size:"18",color:"red"},{default:l(()=>[c("mdi-close")]),_:1})]),_:2},1040,["onClick"])]),default:l(()=>[Se]),_:2},1024)],8,be)):b("",!0)])]))),128))])):b("",!0),u("div",Ge,[e.HinhThucGiayTo.MaMuc=="true"||e.HinhThucGiayTo.MaMuc=="false"&&!e.TepDuLieu.KichThuocTep?(s(),r(_,{key:0,class:"mx-0 ml-2 mt-2",size:"small",variant:"outlined",color:"#1E7D30",onClick:D(a=>J(e,i),["stop"]),height:"28px",width:"120px"},{default:l(()=>[o(d,{size:"22",color:"#1E7D30",class:"mr-2"},{default:l(()=>[c("mdi-cloud-upload-outline")]),_:1}),ze]),_:2},1032,["onClick"])):b("",!0)])]),_:2},1024))),128))]),_:1}),u("input",{type:"file",id:"file_upload_tep_dinh_kem",multiple:!1,onInput:t[0]||(t[0]=e=>Z()),style:{display:"none"}},null,32)]),_:1}),o(W,{"max-width":"900",modelValue:k.value,"onUpdate:modelValue":t[3]||(t[3]=e=>k.value=e),persistent:""},{default:l(()=>[o(I,null,{default:l(()=>[o(X,{dark:"",color:x.value,class:"px-0"},{default:l(()=>[o(O,{class:"sub-header d-flex align-center justify-start py-0 px-0"},{default:l(()=>[Ee,Me]),_:1}),o(q),o(Q,null,{default:l(()=>[o(_,{variant:"flat",size:"small",icon:"",color:"#E9FFF2",onClick:t[1]||(t[1]=e=>k.value=!1)},{default:l(()=>[o(d,{size:"20"},{default:l(()=>[c("mdi-close")]),_:1})]),_:1})]),_:1})]),_:1},8,["color"]),o(R,{class:"mt-2 px-3"},{default:l(()=>[o(Te,{ref_key:"formGiayToKhac",ref:K,"lazy-validation":"",class:"py-0"},{default:l(()=>[o(ce,{modelValue:S.value,"onUpdate:modelValue":t[2]||(t[2]=e=>S.value=e),placeholder:"Nhập tên giấy tờ",dense:"","hide-details":"auto",class:"input-form",clearable:"",required:"",rules:[e=>e!==""&&e!==null&&e!==void 0||"Thông tin bắt buộc"]},null,8,["modelValue","rules"])]),_:1},512)]),_:1}),o(he,{class:"justify-center pb-3 px-3"},{default:l(()=>[o(_,{size:"small",variant:"elevated",loading:g.value,disabled:g.value,color:x.value,"prepend-icon":"mdi-content-save",onClick:D(te,["stop"])},{default:l(()=>[c(" Đồng ý ")]),_:1},8,["loading","disabled","color","onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),o(W,{"max-width":"1000",modelValue:L.value,"onUpdate:modelValue":t[5]||(t[5]=e=>L.value=e),persistent:""},{default:l(()=>[o(I,null,{default:l(()=>[o(X,{dark:"",color:x.value,class:"px-0"},{default:l(()=>[o(O,{class:"sub-header d-flex align-center justify-start py-0 px-0"},{default:l(()=>[Ve,He]),_:1}),o(q),o(Q,null,{default:l(()=>[o(_,{variant:"flat",size:"small",icon:"",color:"#E9FFF2",onClick:t[4]||(t[4]=e=>L.value=!1)},{default:l(()=>[o(d,{size:"20"},{default:l(()=>[c("mdi-close")]),_:1})]),_:1})]),_:1})]),_:1},8,["color"]),o(R,{class:"my-0 px-0 py-0"},{default:l(()=>[u("iframe",{src:F.value,type:"application/pdf",width:"100%",height:"100%",style:{overflow:"auto","min-height":"600px"},frameborder:"0"},`\r
        `,8,Ae)]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}},Xe=fe(Ie,[["__scopeId","data-v-03ad20c7"]]);export{Xe as default};
