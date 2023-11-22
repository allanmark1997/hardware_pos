import{r as f,T as L,d as v,a as e,b as a,s as I,e as K,F as b,g as j,t as h,w as d,O as w,o as y,f as u,u as g,n as B}from"./app-87951b6a.js";import{_ as T}from"./Button-656f33a0.js";import{_ as k}from"./Icon-14e9e985.js";import{_ as E}from"./Pagination2-78677a0b.js";import{_ as O}from"./TextInput-fad836ab.js";import{_ as V}from"./Input-42db7c6c.js";import G from"./Product-9d9a90c1.js";import{_ as M}from"./ConfirmationModal-2e36cdf6.js";import{_ as U}from"./SecondaryButton-941150ed.js";import{h as Y}from"./moment-fbc5633a.js";import{l}from"./index-0c8ca922.js";import"./Modal-c66d27cc.js";const q={class:"flex justify-between mt-2"},W={class:"flex gap-2"},J={class:"flex gap-2"},Q={class:"flex"},X=e("span",{class:"text-md mt-2 mr-2"},"From",-1),Z={class:"flex"},ee=e("span",{class:"text-md mt-2 mr-2"},"To",-1),te={class:"flex"},se={class:"text-gray-600 bg-white rounded-lg py-5 px-3 mb-5 mt-2"},oe={class:"container mx-auto"},ae={class:"relative overflow-x-auto"},le={class:"w-full text-sm text-left text-gray-500"},ie=e("thead",{class:"text-xs text-white uppercase bg-yellow-500"},[e("tr",null,[e("th",{scope:"col",class:"px-6 py-3"},"Supplier name"),e("th",{scope:"col",class:"px-6 py-3"},"Products"),e("th",{scope:"col",class:"px-6 py-3"},"Total"),e("th",{scope:"col",class:"px-6 py-3"},"Created at"),e("th",{scope:"col",class:"px-6 py-3"},"Action")])],-1),re={class:"px-6 py-4"},ne=["src","alt"],ce={scope:"row",class:"px-2 py-1 text-gray-900"},de={class:"px-6 py-4"},ue={class:"px-6 py-4 flex gap-2"},me={class:"px-6 py-4 gap-2"},_e={class:"flex items-center justify-between"},pe={class:"mt-6 text-sm text-gray-500"},fe=e("p",{class:"text-red-500"}," Clicking can update the system and it may cause a possible error! ",-1),ve=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-auto",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),Ce={__name:"DeliveryList",props:["deliveries","date_from","date_to","search"],setup(x){const _=x,r=f(_.date_from),n=f(_.date_to),m=f(_.search),c=f(!1),o=L({delivery:!1,status:!1,password:""}),N=i=>Y(i).format("MM/DD/YYYY, h:mm:ss a"),C=i=>{let p=new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP",minimumFractionDigits:2,maximumFractionDigits:20,minimumSignificantDigits:1,maximumSignificantDigits:20}).format(i).split("."),S=String(p[1]).slice(0,2),H=S=="un"?"00":S;return String(p[0])+"."+H},P=()=>{w.get(route("deliveries.receive_index",{date_from:r.value,date_to:n.value}))},D=()=>{w.get(route("deliveries.receive_index",{search:m.value,date_from:r.value,date_to:n.value}))},$=()=>{w.get(route("deliveries.receive_index",{date_from:null,date_to:null,search:null}))},F=i=>{let s=0;return i.forEach(t=>{t.status==0&&(s+=t.quantity*t.price.price)}),s},A=i=>{console.log(i);let s=0;i.details.forEach(t=>{t.status==0&&s++}),i.details.length==s&&l.warn("Accepting deliveries without selecting products may return as unsuccessful delivery transactions",{autoClose:3e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}),o.delivery=i,c.value=!c.value},z=()=>{o.post(route("authenticate_user.authenticate_user"),{preserveScroll:!0,onSuccess:()=>{l.success("Delivery has been authorized",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}),o.delivery.status==1?o.status=0:o.status=1,o.put(route("deliveries.authenticate",o.delivery),{preserveScroll:!0,onSuccess:()=>{l.success("Delivery set as delivered",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}),c.value=!1,o.reset()}})},onError:()=>{l.error(o.errors.message,{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT})}})};return(i,s)=>(y(),v(b,null,[e("div",q,[e("div",W,[e("div",J,[e("div",Q,[X,a(O,{id:"date_from",modelValue:r.value,"onUpdate:modelValue":s[0]||(s[0]=t=>r.value=t),type:"date",class:"mt-1 block w-full"},null,8,["modelValue"])]),e("div",Z,[ee,a(O,{id:"date_to",modelValue:n.value,"onUpdate:modelValue":s[1]||(s[1]=t=>n.value=t),type:"date",class:"mt-1 block w-full",onKeyup:I(P,["enter"])},null,8,["modelValue","onKeyup"])]),e("div",te,[a(V,{modelValue:m.value,"onUpdate:modelValue":s[2]||(s[2]=t=>m.value=t),class:"rounded-lg w-[30vmin]",type:"text",label:"Search delivery",onKeyup:I(D,["enter"])},null,8,["modelValue","onKeyup"])]),r.value||n.value||m.value?(y(),v("button",{key:0,class:"h-10 my-auto mt-5",onClick:$},[a(k,{icon:"close_icon",size:"sm"})])):K("",!0)])])]),e("section",se,[e("div",oe,[e("div",ae,[e("table",le,[ie,e("tbody",null,[(y(!0),v(b,null,j(x.deliveries.data,(t,p)=>(y(),v("tr",{key:p,class:"bg-white border-"},[e("td",re,[e("img",{class:"h-8 w-8 rounded-full object-cover",src:t.supplier.image,alt:t.supplier.supplier_name},null,8,ne),u(" "+h(t.supplier.supplier_name),1)]),e("td",ce,[a(G,{delivery_details:t.details},null,8,["delivery_details"])]),e("td",de,h(C(F(t.details))),1),e("td",ue,[a(k,{icon:"calendar",size:"md"}),u(" "+h(N(t.created_at)),1)]),e("td",me,[a(T,{onClick:R=>A(t)},{default:d(()=>[u("Authorize")]),_:2},1032,["onClick"])])]))),128))])])]),e("div",_e,[a(E,{links:_.deliveries.links,date_from:r.value,date_to:n.value,search:m.value},null,8,["links","date_from","date_to","search"]),e("p",pe," Showing "+h(x.deliveries.data.length)+" Deliveries ",1)])])]),a(M,{show:c.value,onClose:s[5]||(s[5]=t=>c.value=!1),maxWidth:"2xl"},{title:d(()=>[u(" Are you sure you want to authorize this delivery? ")]),content:d(()=>[fe,a(V,{label:"Administrator password",type:"password",modelValue:g(o).password,"onUpdate:modelValue":s[3]||(s[3]=t=>g(o).password=t)},null,8,["modelValue"])]),footer:d(()=>[a(U,{onClick:s[4]||(s[4]=t=>c.value=!1),class:"mr-2"},{default:d(()=>[u(" nevermind ")]),_:1}),a(T,{class:B([{"opacity-25":g(o).processing},"bg-green-200 hover:bg-green-400"]),disabled:g(o).processing,onClick:z},{default:d(()=>[ve,u("  Submit ")]),_:1},8,["class","disabled"])]),_:1},8,["show"])],64))}};export{Ce as default};