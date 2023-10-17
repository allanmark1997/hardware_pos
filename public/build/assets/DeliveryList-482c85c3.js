import{r as _,T as R,d as f,a as e,b as l,p as w,e as D,F as I,g as H,t as v,w as d,O as g,o as h,f as u,u as y,n as L}from"./app-2f54e3ea.js";import{_ as b}from"./Button-af8759b8.js";import{_ as T}from"./Icon-b88412fa.js";import{_ as K}from"./Pagination2-aa1a25bb.js";import{_ as S}from"./TextInput-25b3422d.js";import{_ as k}from"./Input-1313ecd3.js";import j from"./Product-ac0d8cc0.js";import{_ as B}from"./ConfirmationModal-8078f90e.js";import{_ as E}from"./SecondaryButton-194cb57d.js";import{h as G}from"./moment-fbc5633a.js";import{l as r}from"./index-d6344bfc.js";import"./Modal-24022f87.js";const M={class:"flex justify-between mt-2"},U={class:"flex gap-2"},Y={class:"flex gap-2"},q={class:"flex"},W=e("span",{class:"text-md mt-2 mr-2"},"From",-1),J={class:"flex"},Q=e("span",{class:"text-md mt-2 mr-2"},"To",-1),X={class:"flex"},Z={class:"text-gray-600 bg-white rounded-lg py-5 px-3 mb-5 mt-2"},ee={class:"container mx-auto"},te={class:"relative overflow-x-auto"},se={class:"w-full text-sm text-left text-gray-500"},oe=e("thead",{class:"text-xs text-white uppercase bg-yellow-500"},[e("tr",null,[e("th",{scope:"col",class:"px-6 py-3"},"Supplier name"),e("th",{scope:"col",class:"px-6 py-3"},"Products"),e("th",{scope:"col",class:"px-6 py-3"},"Total"),e("th",{scope:"col",class:"px-6 py-3"},"Created at"),e("th",{scope:"col",class:"px-6 py-3"},"Action")])],-1),ae={class:"px-6 py-4"},le=["src","alt"],re={scope:"row",class:"px-2 py-1 text-gray-900 whitespace-nowrap"},ie={class:"px-6 py-4"},ne={class:"px-6 py-4 flex gap-2"},ce={class:"px-6 py-4 gap-2"},de={class:"flex items-center justify-between"},ue={class:"mt-6 text-sm text-gray-500"},me=e("p",{class:"text-red-500"}," Clicking can update the system and it may cause a possible error! ",-1),pe=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-auto",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),Oe={__name:"DeliveryList",props:["deliveries","date_from","date_to","search"],setup(x){const p=x,i=_(p.date_from),n=_(p.date_to),m=_(p.search),c=_(!1),o=R({delivery:!1,status:!1,password:""}),O=a=>G(a).format("MM/DD/YYYY, h:mm:ss a"),V=a=>{const s=new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"});return s.format(a),s.format(a)},N=()=>{g.get(route("deliveries.receive_index",{date_from:i.value,date_to:n.value}))},C=()=>{g.get(route("deliveries.receive_index",{search:m.value,date_from:i.value,date_to:n.value}))},P=()=>{g.get(route("deliveries.receive_index",{date_from:null,date_to:null,search:null}))},$=a=>{let s=0;return a.forEach(t=>{t.status==0&&(s+=t.quantity*t.price.price)}),s},A=a=>{console.log(a);let s=0;a.details.forEach(t=>{t.status==0&&s++}),a.details.length==s&&r.warn("Accepting deliveries without selecting products may return as unsuccessful delivery transactions",{autoClose:3e3,transition:r.TRANSITIONS.FLIP,position:r.POSITION.TOP_RIGHT}),o.delivery=a,c.value=!c.value},z=()=>{o.post(route("authenticate_user.authenticate_user"),{preserveScroll:!0,onSuccess:()=>{r.success("Delivery has been authorized",{autoClose:1e3,transition:r.TRANSITIONS.FLIP,position:r.POSITION.TOP_RIGHT}),o.delivery.status==1?o.status=0:o.status=1,o.put(route("deliveries.authenticate",o.delivery),{preserveScroll:!0,onSuccess:()=>{r.success("Delivery set as delivered",{autoClose:1e3,transition:r.TRANSITIONS.FLIP,position:r.POSITION.TOP_RIGHT}),c.value=!1,o.reset()}})},onError:()=>{r.error(o.errors.message,{autoClose:1e3,transition:r.TRANSITIONS.FLIP,position:r.POSITION.TOP_RIGHT})}})};return(a,s)=>(h(),f(I,null,[e("div",M,[e("div",U,[e("div",Y,[e("div",q,[W,l(S,{id:"date_from",modelValue:i.value,"onUpdate:modelValue":s[0]||(s[0]=t=>i.value=t),type:"date",class:"mt-1 block w-full"},null,8,["modelValue"])]),e("div",J,[Q,l(S,{id:"date_to",modelValue:n.value,"onUpdate:modelValue":s[1]||(s[1]=t=>n.value=t),type:"date",class:"mt-1 block w-full",onKeyup:w(N,["enter"])},null,8,["modelValue","onKeyup"])]),e("div",X,[l(k,{modelValue:m.value,"onUpdate:modelValue":s[2]||(s[2]=t=>m.value=t),class:"rounded-lg w-[30vmin]",type:"text",label:"Search delivery",onKeyup:w(C,["enter"])},null,8,["modelValue","onKeyup"])]),i.value||n.value||m.value?(h(),f("button",{key:0,class:"h-10 my-auto mt-5",onClick:P},[l(T,{icon:"close_icon",size:"sm"})])):D("",!0)])])]),e("section",Z,[e("div",ee,[e("div",te,[e("table",se,[oe,e("tbody",null,[(h(!0),f(I,null,H(x.deliveries.data,(t,F)=>(h(),f("tr",{key:F,class:"bg-white border-"},[e("td",ae,[e("img",{class:"h-8 w-8 rounded-full object-cover",src:t.supplier.image,alt:t.supplier.supplier_name},null,8,le),u(" "+v(t.supplier.supplier_name),1)]),e("td",re,[l(j,{delivery_details:t.details},null,8,["delivery_details"])]),e("td",ie,v(V($(t.details))),1),e("td",ne,[l(T,{icon:"calendar",size:"md"}),u(" "+v(O(t.created_at)),1)]),e("td",ce,[l(b,{onClick:_e=>A(t)},{default:d(()=>[u("Authorize")]),_:2},1032,["onClick"])])]))),128))])])]),e("div",de,[l(K,{links:p.deliveries.links,date_from:i.value,date_to:n.value,search:m.value},null,8,["links","date_from","date_to","search"]),e("p",ue," Showing "+v(x.deliveries.data.length)+" Deliveries ",1)])])]),l(B,{show:c.value,onClose:s[5]||(s[5]=t=>c.value=!1),maxWidth:"2xl"},{title:d(()=>[u(" Are you sure you want to authorize this delivery? ")]),content:d(()=>[me,l(k,{label:"Administrator password",type:"password",modelValue:y(o).password,"onUpdate:modelValue":s[3]||(s[3]=t=>y(o).password=t)},null,8,["modelValue"])]),footer:d(()=>[l(E,{onClick:s[4]||(s[4]=t=>c.value=!1),class:"mr-2"},{default:d(()=>[u(" nevermind ")]),_:1}),l(b,{class:L([{"opacity-25":y(o).processing},"bg-green-200 hover:bg-green-400"]),disabled:y(o).processing,onClick:z},{default:d(()=>[pe,u("  Submit ")]),_:1},8,["class","disabled"])]),_:1},8,["show"])],64))}};export{Oe as default};
