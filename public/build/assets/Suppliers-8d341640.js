import{r as _,T as R,c as j,w as u,o as p,a as e,b as a,s as $,d as m,e as x,f as v,u as o,K as g,t as k,F as B,g as A,h as y,n as U,O as S}from"./app-b9add7c4.js";import{_ as F}from"./AppLayout-c2aa5b21.js";import G from"./SupplierList-6a6db541.js";import{_ as h}from"./Input-caad3ae7.js";import{_ as D}from"./DialogModal-bc08e151.js";import{_ as H}from"./SecondaryButton-705ac5c3.js";import{_ as E}from"./Button-90989a45.js";import{_ as f}from"./InputError-dd96eea1.js";import{l as r}from"./index-4741046d.js";import"./logo_main-f6fb4bdb.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./Icon-c3abb7e2.js";import"./Pagination2-32e58041.js";import"./ConfirmationModal-1851b942.js";import"./Modal-111f6a19.js";import"./moment-fbc5633a.js";const K=e("h2",{class:"font-semibold text-lg text-gray-800 leading-tight"}," Supplier Management ",-1),z={class:"py-"},J={class:"max-w-7xl mx-auto sm:px-6 lg:px-8"},W={class:"flex justify-between"},X={class:"flex"},q=e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6 text-red-500"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})],-1),Q=[q],Y={class:"bg-white overflow-hidden shadow-xl sm:rounded-lg"},Z={class:"flex-shrink-0"},ee=["src","alt"],se={class:"flex-1 min-w-0"},te={class:"text-sm font-medium text-gray-900 truncate"},oe={class:"text-sm text-gray-500 truncate"},le={class:"grid grid-cols-12 gap-2"},ae={key:0,class:"col-span-12 mx-auto"},re=["src"],ne=["onClick"],ie=e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[e("path",{class:"text-red-500","stroke-linecap":"round","stroke-linejoin":"round",d:"M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"})],-1),de=e("span",{class:"text-red-500"},"Remove",-1),ue=[ie,de],ce=e("div",{class:"flex flex-col items-center justify-center pt-5 pb-6"},[e("svg",{"aria-hidden":"true",class:"w-8 h-8 mb-1 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"})]),e("p",{class:"mb-1 text-sm text-gray-500 dark:text-gray-400"},[e("span",{class:"font-semibold"},"Click to upload"),v(" or drag and drop ")]),e("p",{class:"text-xs text-gray-500 dark:text-gray-400"}," PNG, JPG or JPEG (MAX.1024kb) ")],-1),pe=e("input",{id:"profile_photo",type:"file",accept:"image/png, image/gif, image/jpeg",class:"hidden"},null,-1),me=[ce,pe],_e={class:"col-span-12"},ge={class:"col-span-12"},he={class:"col-span-12"},fe=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-auto",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),je={__name:"Suppliers",props:["suppliers","search"],setup(C){const w=C,i=_(!1),I=_("Select Status"),c=_([]),d=_(w.search),t=R({supplier_name:"",address:"",mobile_no:"",status:1,image:[]}),T=()=>{i.value=!i.value},V=()=>{t.post(route("suppliers.add_supplier"),{preserveScroll:!0,onSuccess:()=>{r.success("Supplier successfully added!",{autoClose:1e3,transition:r.TRANSITIONS.FLIP,position:r.POSITION.TOP_RIGHT}),i.value=!i.value,t.reset(),I.value.reset(),type_label.value.reset()},onError:()=>{r.error("Please fill out fields ",{autoClose:1e3,transition:r.TRANSITIONS.FLIP,position:r.POSITION.TOP_RIGHT})}})},O=()=>{S.get(route("suppliers.index",{search:d.value}))},N=()=>{d.value="",S.get(route("suppliers.index",{search:d.value}))},P=()=>{let n=document.getElementById("profile_photo");n.click(),n.onchange=s=>{c.value.push(window.URL.createObjectURL(s.target.files[0])),t.image=s.target.files[0]}},L=n=>{n.preventDefault();for(const l of n.dataTransfer.files){var s=URL.createObjectURL(l);c.value.push(s),t.image=l}},M=n=>{c.value.splice(n,1),t.image=null,r.warn("Image remove",{autoClose:1e3,transition:r.TRANSITIONS.FLIP,position:r.POSITION.TOP_RIGHT})};return(n,s)=>(p(),j(F,{title:"Supplier Management"},{header:u(()=>[K]),default:u(()=>[e("div",z,[e("div",J,[e("div",W,[e("div",X,[a(h,{modelValue:d.value,"onUpdate:modelValue":s[0]||(s[0]=l=>d.value=l),class:"rounded-lg mb-2 w-[30vmin]",type:"text",label:"Search supplier",onKeyup:$(O,["enter"])},null,8,["modelValue","onKeyup"]),d.value?(p(),m("button",{key:0,class:"p-2 h-10 my-auto mt-5",onClick:N},Q)):x("",!0)]),e("button",{onClick:T,class:"bg-yellow-400 p-2 mb-2 mt-5 rounded-lg w-[20vmin] hover:bg-yellow-500"}," Add Supplier ")]),e("div",Y,[a(G,{suppliers:w.suppliers,search:d.value},null,8,["suppliers","search"])])])]),a(D,{show:i.value,onClose:s[7]||(s[7]=l=>i.value=!1),maxWidth:"2xl"},{title:u(()=>[v(" Add Supplier ")]),content:u(()=>[e("div",Z,[e("img",{class:"w-10 h-10 rounded-full",src:o(g)().props.auth.user.profile_photo_url,alt:o(g)().props.auth.user.name},null,8,ee)]),e("div",se,[e("p",te,k(o(g)().props.auth.user.name),1),e("p",oe,k(o(g)().props.auth.user.email),1)]),e("div",le,[c.value.length!=0?(p(),m("div",ae,[(p(!0),m(B,null,A(c.value,(l,b)=>(p(),m("div",{key:b,class:"flex-shrink-0"},[e("img",{class:"w-16 h-16 rounded-full",src:l},null,8,re),e("button",{onClick:ve=>M(b),class:"flex text-gray-400 hover:text-gray-600"},ue,8,ne)]))),128))])):x("",!0),c.value.length!=1?(p(),m("div",{key:1,class:"col-span-12",onDragover:s[1]||(s[1]=y(()=>{},["prevent"])),onDrop:s[2]||(s[2]=y(()=>{},["prevent"]))},[e("label",{onDrop:L,onClick:P,for:"dropzone-file",class:"flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"},me,32),a(f,{message:o(t).errors.image,class:"mt-2"},null,8,["message"])],32)):x("",!0),e("div",_e,[a(h,{label:"Supplier's name",type:"text",class:"mt-1 block w-full",modelValue:o(t).supplier_name,"onUpdate:modelValue":s[3]||(s[3]=l=>o(t).supplier_name=l),autofocus:""},null,8,["modelValue"]),a(f,{message:o(t).errors.supplier_name,class:"mt-2"},null,8,["message"])]),e("div",ge,[a(h,{label:"Contact No",type:"text",class:"block w-full",modelValue:o(t).mobile_no,"onUpdate:modelValue":s[4]||(s[4]=l=>o(t).mobile_no=l),autofocus:""},null,8,["modelValue"]),a(f,{message:o(t).errors.mobile_no,class:"mt-2"},null,8,["message"])]),e("div",he,[a(h,{label:"Supplier's Address",type:"text",class:"block w-full",modelValue:o(t).address,"onUpdate:modelValue":s[5]||(s[5]=l=>o(t).address=l),autofocus:""},null,8,["modelValue"]),a(f,{message:o(t).errors.address,class:"mt-2"},null,8,["message"])])])]),footer:u(()=>[a(H,{onClick:s[6]||(s[6]=l=>i.value=!1),class:"mr-2"},{default:u(()=>[v(" Cancel ")]),_:1}),a(E,{class:U([{"opacity-25":o(t).processing},"bg-yellow-200 hover:bg-yellow-400"]),disabled:o(t).processing,onClick:V},{default:u(()=>[fe,v(" Save ")]),_:1},8,["class","disabled"])]),_:1},8,["show"])]),_:1}))}};export{je as default};
