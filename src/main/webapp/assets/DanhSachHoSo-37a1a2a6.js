import{n as ref,G as useRoute,l as useRouter,e as defineAsyncComponent,_ as __vitePreload,f as useAppStore,q as useCookies,s as computed,t as reactive,H as watch,o as onMounted,r as resolveComponent,h as openBlock,i as createBlock,w as withCtx,d as createVNode,j as createBaseVNode,B as toDisplayString,k as unref,K as VBtn,L as withModifiers,z as VIcon,v as createTextVNode,x as createElementBlock,F as Fragment,y as renderList,A as normalizeClass,C as normalizeStyle,X as VMenu,M as mergeProps,T as VList,U as VListItem,W as VListItemTitle,I as createCommentVNode,D as pushScopeId,E as popScopeId}from"./index-4c35af64.js";import{u as useHosoDvcStore}from"./hosodvc-72a37b7f.js";import{j as jsondata}from"./mock-data-a5bf1551.js";import{_ as _export_sfc}from"./_plugin-vue_export-helper-c27b6911.js";import{V as VRow,a as VCol}from"./VRow-9bbff3db.js";import{c as VDialog,V as VToolbar,a as VSpacer,b as VToolbarItems}from"./VToolbarItems-0ab373ee.js";import{V as VCard,a as VCardText,b as VCardActions}from"./VCard-0356f14d.js";import"./jquery-da988d60.js";const DanhSachHoSo_vue_vue_type_style_index_0_scoped_0a48e0f6_lang="",_withScopeId=t=>(pushScopeId("data-v-0a48e0f6"),t=t(),popScopeId(),t),_hoisted_1=_withScopeId(()=>createBaseVNode("div",{class:"header-content",style:{"text-transform":"uppercase"}}," Danh sách hồ sơ ",-1)),_hoisted_2=_withScopeId(()=>createBaseVNode("div",{class:"triangle-header"},null,-1)),_hoisted_3={class:"text-sub-header pl-2",style:{"text-transform":"uppercase"}},_hoisted_4=_withScopeId(()=>createBaseVNode("span",{style:{"padding-top":"2px"}},"Thêm mới hồ sơ",-1)),_hoisted_5=["onClick"],_hoisted_6=["width"],_hoisted_7={key:0},_hoisted_8=_withScopeId(()=>createBaseVNode("div",{class:"sub-header-content"}," Thêm mới hồ sơ ",-1)),_hoisted_9=_withScopeId(()=>createBaseVNode("div",{class:"triangle-header"},null,-1)),_sfc_main={__name:"DanhSachHoSo",setup(__props){const hosoDvcStore=useHosoDvcStore(),baseColor=ref("#1E7D30");useRoute();const router=useRouter(),Pagination=defineAsyncComponent(()=>__vitePreload(()=>import("./Pagination-341b149c.js"),["./Pagination-341b149c.js","./VRow-9bbff3db.js","./index-4c35af64.js","./index-99c5db5f.css","./VRow-37f80755.css","./VAutocomplete-74c51d3c.js","./VAutocomplete-af217798.css"],import.meta.url)),appStore=useAppStore(),{cookies}=useCookies(),menuSelected=computed(()=>appStore.getMenuSelected);ref(!1),reactive({required:t=>!!t&&!Array.isArray(t)||Array.isArray(t)&&t.length||"Thông tin bắt buộc"}),ref(""),ref("");const dialog=ref(!1);ref(!1),ref(null);const crudFormReference=ref(null);reactive({}),ref({}),reactive([]);const dsHoSo=ref([]),itemsPerPage=ref(20),loadingData=ref(!1),loading=ref(!1),page=ref(0),pageCount=ref(0),total=ref(0),themMoiHoSo=function(){let t=jsondata.thuTucHanhChinh.find(function(o){return o.maThuTuc==menuSelected.value.thuTuc.maThuTuc});if(t&&t.thongTinHoSo){let o={data:t.thongTinHoSo};hosoDvcStore.themMoiHoSo(o).then(function(l){let a=l.resp;router.push({path:`/nop-ho-so${menuSelected.value.to}/${a.primKey}`})}).catch(function(){alert("Thêm mới hồ sơ thất bại")})}},getDanhSachHoSo=function(){if(menuSelected.value&&menuSelected.value.thuTuc&&menuSelected.value.thuTuc.maThuTuc){let t={params:{page:page.value,size:itemsPerPage.value,thuTucHanhChinh_MaMuc:menuSelected.value.thuTuc.maThuTuc}};loadingData.value=!0,hosoDvcStore.getDanhSachHoSo(t).then(function(o){loadingData.value=!1,dsHoSo.value=o.content,total.value=o.totalElements,pageCount.value=o.totalPages}).catch(function(){loadingData.value=!1,dsHoSo.value=[],total.value=0,pageCount.value=0})}};getDanhSachHoSo();const redirectThongTinHoSo=function(t){router.push({path:"/thong-tin-ho-so/"+t.primKey})},suaHoSo=function(t){router.push({path:`/nop-ho-so${menuSelected.value.to}/${t.primKey}`})},xoaHoSo=function(t){appStore.SET_SHOWCONFIRM(!0);let o={auth:!1,title:"Xóa hồ sơ",message:"Bạn có chắc chắn muốn xóa hồ sơ này",button:{yes:"Có",no:"Không"},callback:()=>{let l={data:t};hosoDvcStore.xoaHoSo(l).then(function(a){getDanhSachHoSo()}).catch(function(){})}};appStore.SET_CONFIG_CONFIRM_DIALOG(o)},rutHoSo=function(t){console.log("ruthoso",t),appStore.SET_SHOWCONFIRM(!0);let o={auth:!1,title:"Xóa hồ sơ",message:"Bạn có chắc chắn muốn rút hồ sơ này",button:{yes:"Có",no:"Không"},callback:()=>{}};appStore.SET_CONFIG_CONFIRM_DIALOG(o)},lapHoSoThayDoi=function(t){router.push({path:`/nop-ho-so${menuSelected.value.to}/${t.primKey}`,query:{id_update:t.primKey}})},submitFormCrud=async function(){let t=await crudFormReference.value.validateForm();if(console.log("validForm",t),t){let o=crudFormReference.value.submit();console.log("dataOutputCrud",o)}},changePage=function(t){console.log("page_pagination",t)},dateLocale=function(t){if(!t)return"";let o=new Date(t);return`${o.getDate().toString().padStart(2,"0")}/${(o.getMonth()+1).toString().padStart(2,"0")}/${o.getFullYear()}`},currency=function(t){return t?(t/1).toFixed(0).replace(".",",").toString().replace(/\B(?=(\d{3})+(?!\d))/g,"."):""},dateLocaleTime=function(t){let o=new Date(t);return`${o.getDate().toString().padStart(2,"0")}/${(o.getMonth()+1).toString().padStart(2,"0")}/${o.getFullYear()} ${o.getHours().toString().padStart(2,"0")}:${o.getMinutes().toString().padStart(2,"0")}`},convertDataView=function(itemHeader,item){let output="";try{let calu=itemHeader.calculator.replace(/dataInput/g,"item");output=eval(calu)}catch(t){output=""}return output},convertDataArray=function(t,o){let l="";return o&&(l=Array.from(o,function(a){return a[t.mapping]})),l=l.toString().replace(/,/g,", "),l};return watch(menuSelected,async t=>{console.log("run watch-routes menuSelected:",t),getDanhSachHoSo()}),onMounted(()=>{cookies.get("Token")?appStore.SET_ISSIGNED(!0):(appStore.SET_ISSIGNED(!1),appStore.SET_USERINFO(""),router.push({path:"/login"}))}),(t,o)=>{const l=resolveComponent("v-data-table");return openBlock(),createBlock(VCard,{class:"mx-auto pa-0",style:{"box-shadow":"none !important",overflow:"inherit"}},{default:withCtx(()=>[createVNode(VRow,{class:"my-0 mb-5 mx-0"},{default:withCtx(()=>[createVNode(VCol,{class:"row-header d-flex align-center justify-start py-0 px-0",style:{border:"none"}},{default:withCtx(()=>[_hoisted_1,_hoisted_2,createBaseVNode("div",_hoisted_3,toDisplayString(unref(menuSelected).dossierName),1)]),_:1}),createVNode(VBtn,{size:"small",color:baseColor.value,onClick:withModifiers(themMoiHoSo,["stop"]),class:"mx-0"},{default:withCtx(()=>[createVNode(VIcon,{size:"20",class:"mr-2"},{default:withCtx(()=>[createTextVNode("mdi-plus")]),_:1}),_hoisted_4]),_:1},8,["color","onClick"])]),_:1}),createVNode(VRow,{class:"mx-0 my-0"},{default:withCtx(()=>[createVNode(VCol,{cols:"12",class:"px-0 py-0"},{default:withCtx(()=>[createVNode(l,{headers:unref(menuSelected).headerTable,items:dsHoSo.value,"items-per-page":itemsPerPage.value,"onUpdate:itemsPerPage":o[0]||(o[0]=a=>itemsPerPage.value=a),"item-value":"primKey","hide-default-footer":"",class:"table-base","no-data-text":"Không có hồ sơ nào"},{item:withCtx(({item:a,index:r})=>[createBaseVNode("tr",{onClick:e=>redirectThongTinHoSo(a.raw)},[(openBlock(!0),createElementBlock(Fragment,null,renderList(unref(menuSelected).headerTable,(e,s)=>(openBlock(),createElementBlock("td",{key:s,class:normalizeClass(e.class),width:e.hasOwnProperty("width")?e.width:""},[e.type=="index"?(openBlock(),createElementBlock("div",_hoisted_7,[itemsPerPage.value?(openBlock(),createElementBlock("div",{key:0,style:normalizeStyle(e.hasOwnProperty("style")?e.style:"")},toDisplayString(r+1),5)):(openBlock(),createElementBlock("div",{key:1,style:normalizeStyle(e.hasOwnProperty("style")?e.style:"")},toDisplayString(r+1),5))])):e.type=="date"?(openBlock(),createElementBlock("div",{key:1,style:normalizeStyle(e.hasOwnProperty("style")?e.style:"")},toDisplayString(a.raw.hasOwnProperty(e.key)?dateLocale(a.raw[e.key]):""),5)):e.type=="datetime"?(openBlock(),createElementBlock("div",{key:2,style:normalizeStyle(e.hasOwnProperty("style")?e.style:"")},toDisplayString(a.raw.hasOwnProperty(e.key)?dateLocaleTime(a.raw[e.key]):""),5)):e.type=="object"?(openBlock(),createElementBlock("div",{key:3,style:normalizeStyle(e.hasOwnProperty("style")?e.style:"")},toDisplayString(a.raw.hasOwnProperty(e.key)?a.raw[e.key][e.mapping]:""),5)):e.type=="money"?(openBlock(),createElementBlock("div",{key:4,style:normalizeStyle(e.hasOwnProperty("style")?e.style:"")},toDisplayString(a.raw.hasOwnProperty(e.key)?currency(a.raw[e.key]):""),5)):e.type=="array"?(openBlock(),createElementBlock("div",{key:5,style:normalizeStyle(e.hasOwnProperty("style")?e.style:"")},toDisplayString(a.raw.hasOwnProperty(e.key)?convertDataArray(e,a.raw[e.key]):""),5)):e.type=="calculator"?(openBlock(),createElementBlock("div",{key:6,style:normalizeStyle(e.hasOwnProperty("style")?e.style:"")},toDisplayString(convertDataView(e,a.raw)),5)):e.type=="action"?(openBlock(),createElementBlock("div",{key:7,style:normalizeStyle(e.hasOwnProperty("style")?e.style:"")},[createVNode(VMenu,null,{activator:withCtx(({props:n})=>[createVNode(VBtn,mergeProps({icon:"",variant:"flat",size:"small"},n),{default:withCtx(()=>[createVNode(VIcon,{size:"24",color:baseColor.value},{default:withCtx(()=>[createTextVNode("mdi-filter-variant")]),_:1},8,["color"])]),_:2},1040)]),default:withCtx(()=>[createVNode(VList,null,{default:withCtx(()=>[a.raw.TrangThaiHoSo.MaMuc=="00"?(openBlock(),createBlock(VListItem,{key:0,onClick:n=>suaHoSo(a.raw)},{default:withCtx(()=>[createVNode(VListItemTitle,null,{default:withCtx(()=>[createVNode(VIcon,{size:"24",color:baseColor.value,class:"mr-2"},{default:withCtx(()=>[createTextVNode("mdi-playlist-edit")]),_:1},8,["color"]),createTextVNode(" Sửa hồ sơ ")]),_:1})]),_:2},1032,["onClick"])):createCommentVNode("",!0),a.raw.TrangThaiHoSo.MaMuc=="00"?(openBlock(),createBlock(VListItem,{key:1,onClick:n=>xoaHoSo(a.raw)},{default:withCtx(()=>[createVNode(VListItemTitle,null,{default:withCtx(()=>[createVNode(VIcon,{size:"22",color:"#FF0000",class:"mr-2"},{default:withCtx(()=>[createTextVNode("mdi-close")]),_:1}),createTextVNode(" Xóa hồ sơ ")]),_:1})]),_:2},1032,["onClick"])):createCommentVNode("",!0),a.raw.TrangThaiHoSo.MaMuc=="01"?(openBlock(),createBlock(VListItem,{key:2,onClick:n=>rutHoSo(a.raw)},{default:withCtx(()=>[createVNode(VListItemTitle,null,{default:withCtx(()=>[createVNode(VIcon,{size:"22",color:"#FF0000",class:"mr-2"},{default:withCtx(()=>[createTextVNode("mdi-file-refresh-outline")]),_:1}),createTextVNode("Rút hồ sơ ")]),_:1})]),_:2},1032,["onClick"])):createCommentVNode("",!0),a.raw.TrangThaiHoSo.MaMuc=="09"&&(unref(menuSelected).id=="xulydulieu"||unref(menuSelected).id=="chuyendulieu")?(openBlock(),createBlock(VListItem,{key:3,onClick:n=>lapHoSoThayDoi(a.raw)},{default:withCtx(()=>[createVNode(VListItemTitle,null,{default:withCtx(()=>[createVNode(VIcon,{size:"20",color:baseColor.value,class:"mr-2"},{default:withCtx(()=>[createTextVNode("mdi-file-document-plus-outline")]),_:1},8,["color"]),createTextVNode(" Lập hồ sơ thay đổi ")]),_:1})]),_:2},1032,["onClick"])):createCommentVNode("",!0)]),_:2},1024)]),_:2},1024)],4)):(openBlock(),createElementBlock("div",{key:8,style:normalizeStyle(e.hasOwnProperty("style")?e.style:"")},toDisplayString(a.raw[e.key]),5))],10,_hoisted_6))),128))],8,_hoisted_5)]),_:1},8,["headers","items","items-per-page"]),pageCount.value&&pageCount.value>1?(openBlock(),createBlock(unref(Pagination),{key:0,pageInput:page.value+1,pageCount:pageCount.value,total:total.value,onChangePage:changePage,style:{"margin-bottom":"50px"}},null,8,["pageInput","pageCount","total"])):createCommentVNode("",!0)]),_:1})]),_:1}),createVNode(VDialog,{"max-width":"1000",modelValue:dialog.value,"onUpdate:modelValue":o[3]||(o[3]=a=>dialog.value=a),persistent:"",absolute:""},{default:withCtx(()=>[createVNode(VCard,null,{default:withCtx(()=>[createVNode(VToolbar,{dark:"",color:baseColor.value,class:"px-0"},{default:withCtx(()=>[createVNode(VCol,{class:"sub-header d-flex align-center justify-start py-0 px-0"},{default:withCtx(()=>[_hoisted_8,_hoisted_9]),_:1}),createVNode(VSpacer),createVNode(VToolbarItems,null,{default:withCtx(()=>[createVNode(VBtn,{variant:"flat",size:"small",icon:"",color:"#E9FFF2",onClick:o[1]||(o[1]=a=>dialog.value=!1)},{default:withCtx(()=>[createVNode(VIcon,{size:"20"},{default:withCtx(()=>[createTextVNode("mdi-close")]),_:1})]),_:1})]),_:1})]),_:1},8,["color"]),createVNode(VCardText,{class:"mt-2 px-3"}),createVNode(VCardActions,{class:"justify-center pb-3 px-3"},{default:withCtx(()=>[createVNode(VBtn,{size:"small",variant:"elevated",loading:loading.value,disabled:loading.value,color:"error","prepend-icon":"mdi-close",onClick:o[2]||(o[2]=withModifiers(a=>dialog.value=!1,["stop"])),class:"mr-2"},{default:withCtx(()=>[createTextVNode(" Thoát ")]),_:1},8,["loading","disabled"]),createVNode(VBtn,{size:"small",variant:"elevated",loading:loading.value,disabled:loading.value,color:baseColor.value,"prepend-icon":"mdi-content-save",onClick:withModifiers(submitFormCrud,["stop"])},{default:withCtx(()=>[createTextVNode(" Thêm mới ")]),_:1},8,["loading","disabled","color","onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}}},DanhSachHoSo=_export_sfc(_sfc_main,[["__scopeId","data-v-0a48e0f6"]]);export{DanhSachHoSo as default};
