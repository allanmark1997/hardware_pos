import{r as f,d as c,a as e,b as o,p as w,e as q,F as y,g as k,t as l,O as g,o as r,f as n}from"./app-2f54e3ea.js";import{_ as p}from"./Icon-b88412fa.js";import{_ as E}from"./Pagination2-aa1a25bb.js";import{_ as V}from"./TextInput-25b3422d.js";import{_ as F}from"./Input-1313ecd3.js";import{h as T}from"./moment-fbc5633a.js";import"./index-d6344bfc.js";const Y={class:"flex justify-between mt-2"},$={class:"flex gap-2"},B={class:"flex gap-2"},C={class:"flex"},H=e("span",{class:"text-md mt-2 mr-2"},"From",-1),L={class:"flex"},M=e("span",{class:"text-md mt-2 mr-2"},"To",-1),O={class:"flex"},I=["href"],R={class:"text-gray-600 bg-white rounded-lg py-5 px-3 mb-5 mt-2"},A={class:"container mx-auto"},G={class:"relative overflow-x-auto"},J={class:"w-full text-sm text-left text-gray-500"},Q=e("thead",{class:"text-xs text-white uppercase bg-yellow-500"},[e("tr",null,[e("th",{scope:"col",class:"px-6 py-3"},"Supplier name"),e("th",{scope:"col",class:"px-6 py-3"},"Receive by"),e("th",{scope:"col",class:"px-6 py-3"},"Status"),e("th",{scope:"col",class:"px-6 py-3"},"Products"),e("th",{scope:"col",class:"px-6 py-3"},"Total Success"),e("th",{scope:"col",class:"px-6 py-3"},"Total Unsuccess"),e("th",{scope:"col",class:"px-6 py-3"},"Created at")])],-1),W={class:"px-6 py-4"},X=["src","alt"],Z={class:"px-6 py-4"},ee=["src","alt"],te={class:"px-6 py-4"},se={key:0,class:"bg-green-400 rounded-md p-1 text-white flex"},oe={key:1,class:"bg-red-400 rounded-md p-1 text-white flex"},ae={scope:"row",class:"px-2 py-1 text-gray-900 whitespace-nowrap"},ce={class:"w-full text-xs text-left text-gray-500"},le=e("thead",{class:"text-xs text-gray-700 uppercase bg-gray-100"},[e("tr",null,[e("th",{scope:"col",class:"px-1 py-1"},"Product"),e("th",{scope:"col",class:"px-1 py-1"},"No."),e("th",{scope:"col",class:"px-1 py-1"},"Price"),e("th",{scope:"col",class:"px-1 py-1"},"Status"),e("th",{scope:"col",class:"px-1 py-1"},"Sub-total")])],-1),re={class:"px-1 py-1 flex pt-2 font-bold"},ne={class:"px-1 py-1"},ie={class:"px-1 py-1"},de={class:"px-1 py-1"},pe={key:0,class:"bg-green-400 rounded-md p-1 text-white flex gap-1"},ue={key:1,class:"bg-red-400 rounded-md p-1 text-white flex gap-1"},_e={class:"px-1 py-1"},me={class:"px-6 py-4"},he={class:"px-6 py-4"},xe={class:"px-6 py-4 flex gap-2"},fe={class:"flex items-center justify-between"},ye={class:"mt-6 text-sm text-gray-500"},ze={__name:"DeliveryList",props:["deliveries","date_from","date_to","search"],setup(x){const m=x,i=f(m.date_from),d=f(m.date_to),_=f(m.search),S=a=>T(a).format("MM/DD/YYYY, h:mm:ss a"),h=a=>{const s=new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"});return s.format(a),s.format(a)},z=()=>{g.get(route("deliveries.index",{date_from:i.value,date_to:d.value}))},P=()=>{g.get(route("deliveries.index",{search:_.value,date_from:i.value,date_to:d.value}))},D=()=>{g.get(route("deliveries.index",{date_from:null,date_to:null,search:null}))},N=a=>{let s=0;return a.forEach(t=>{t.status==1&&(s+=t.quantity*t.price.price)}),s},U=a=>{let s=0;return a.forEach(t=>{t.status==0&&(s+=t.quantity*t.price.price)}),s};return(a,s)=>(r(),c(y,null,[e("div",Y,[e("div",$,[e("div",B,[e("div",C,[H,o(V,{id:"date_from",modelValue:i.value,"onUpdate:modelValue":s[0]||(s[0]=t=>i.value=t),type:"date",class:"mt-1 block w-full"},null,8,["modelValue"])]),e("div",L,[M,o(V,{id:"date_to",modelValue:d.value,"onUpdate:modelValue":s[1]||(s[1]=t=>d.value=t),type:"date",class:"mt-1 block w-full",onKeyup:w(z,["enter"])},null,8,["modelValue","onKeyup"])]),e("div",O,[o(F,{modelValue:_.value,"onUpdate:modelValue":s[2]||(s[2]=t=>_.value=t),class:"rounded-lg w-[30vmin]",type:"text",label:"Search delivery",onKeyup:w(P,["enter"])},null,8,["modelValue","onKeyup"])]),i.value||d.value||_.value?(r(),c("button",{key:0,class:"h-10 my-auto mt-5",onClick:D},[o(p,{icon:"close_icon",size:"sm"})])):q("",!0)])]),e("a",{href:a.route("deliveries.export",{date_from:i.value,date_to:d.value}),class:"bg-green-400 hover:bg-green-600 hover:text-white rounded-lg my-auto p-2"},"Export Delivery",8,I)]),e("section",R,[e("div",A,[e("div",G,[e("table",J,[Q,e("tbody",null,[(r(!0),c(y,null,k(x.deliveries.data,(t,K)=>{var v;return r(),c("tr",{key:K,class:"bg-white border-"},[e("td",W,[e("img",{class:"h-8 w-8 rounded-full object-cover",src:t.supplier.image,alt:t.supplier.supplier_name},null,8,X),n(" "+l(t.supplier.supplier_name),1)]),e("td",Z,[e("img",{class:"h-8 w-8 rounded-full object-cover",src:t.user_receiver.profile_photo_url,alt:t.user_receiver.supplier_name},null,8,ee),n(" "+l(((v=t.user_receiver)==null?void 0:v.name)??"Pending"),1)]),e("td",te,[t.status==1?(r(),c("span",se,[o(p,{icon:"check",size:"sm"}),n(" Success ")])):(r(),c("span",oe,[o(p,{icon:"wrong",size:"sm"}),n(" Unuccess ")]))]),e("td",ae,[e("table",ce,[le,e("tbody",null,[(r(!0),c(y,null,k(t.details,(u,j)=>{var b;return r(),c("tr",{key:j,class:"bg-white border-"},[e("td",re,[o(p,{icon:"shopping_cart",size:"xs"}),n(" "+l((b=u.product)==null?void 0:b.name),1)]),e("td",ne,l(u.quantity),1),e("td",ie,l(h(u.price.price)),1),e("td",de,[u.status==1?(r(),c("small",pe,[o(p,{icon:"check",size:"sm"}),n(" Success ")])):(r(),c("small",ue,[o(p,{icon:"wrong",size:"xs"}),n(" Unsuccess ")]))]),e("td",_e,[e("small",null,l(h(u.quantity*u.price.price)),1)])])}),128))])])]),e("td",me,l(h(N(t.details))),1),e("td",he,l(h(U(t.details))),1),e("td",xe,[o(p,{icon:"calendar",size:"md"}),n(" "+l(S(t.created_at)),1)])])}),128))])])]),e("div",fe,[o(E,{links:m.deliveries.links,date_from:i.value,date_to:d.value,search:_.value},null,8,["links","date_from","date_to","search"]),e("p",ye," Showing "+l(x.deliveries.data.length)+" Deliveries ",1)])])])],64))}};export{ze as default};
