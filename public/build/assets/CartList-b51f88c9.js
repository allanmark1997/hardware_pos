import{r as v,T as q,i as B,d as _,F as g,g as N,a as e,f as i,t as l,u as n,b as a,w as r,x as L,o as h,j as M,m as z,n as O}from"./app-5fb2289d.js";import{_ as $}from"./Icon-87c675dc.js";import{_ as S}from"./Button-c80a60ee.js";import{_ as V}from"./ConfirmationModal-f7a04037.js";import{_ as F}from"./SecondaryButton-799a6b49.js";import G from"./QuantityUpdate-bbf2f663.js";import{l as c}from"./index-d292f4f4.js";import"./Modal-c6cda4f8.js";const E=L('<div class="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mt-2"><div class="border-b-2 border-neutral-100 px-6 py-3"><div class="grid grid-cols-12 gap-1 text-sm text-left text-gray-500"><div class="col-span-2 px-1 py-1">Product</div><div class="col-span-2 px-1 py-1">Remarks</div><div class="col-span-2 px-1 py-1">Unit Price</div><div class="col-span-2 px-1 py-1">Quantity</div><div class="col-span-2 px-1 py-1">Total Price</div><div class="col-span-2 px-1 py-1">Actions</div></div></div></div>',1),U={class:"border-b-2 border-neutral-100 px-6 py-3 text-left flex gap-2"},W={class:"my-auto"},Q={class:"p-6"},J={class:"grid grid-cols-12 gap-1 text-sm text-left text-gray-500"},K={class:"col-span-2 flex gap-2 ml-2"},X=["value"],Y=["src","alt"],Z={class:"my-auto text-md font-bold"},ee={class:"col-span-2 px-1 py-1"},te={class:"my-auto text-xs break-words w-10"},se={class:"col-span-2 px-1 py-1"},oe={class:"my-auto"},re={class:"col-span-2 px-1 py-1"},ae={class:"col-span-2 px-1 py-1"},ce={class:"my-auto"},ie={class:"col-span-2 px-1 py-1"},le={class:"my-auto"},ne=["onClick"],de={class:"fixed bg-white border border-gray-200 rounded-md bottom-0 sm:w-[885px] md:w[1150px] lg:w-[1180px] xl:w-[1200px] 2xl:w-[1200px] p-2 gap-2 block rounded-lg text-right mt-2"},pe={class:"text-right text-md justify-right"},ue={class:"text-lg font-bold text-red-500"},fe=e("p",{class:"text-red-500"}," This action can update the system and this is not reversible! ",-1),me=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-auto",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),_e=e("p",{class:"text-red-500"}," This action can update the system and this is not reversible! ",-1),he=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-auto",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),Ce={__name:"CartList",props:["group_suppliers"],setup(D){const d=v(!1),p=v(!1);v(0);const k=v(0),t=q({order:"",selected_product:[]}),y=u=>{let m=new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP",minimumFractionDigits:2,maximumFractionDigits:20,minimumSignificantDigits:1,maximumSignificantDigits:20}).format(u).split("."),x=String(m[1]).slice(0,2),b=x=="un"?"00":x;return String(m[0])+"."+b};B(()=>t.selected_product,u=>{k.value=0,u.forEach(s=>{k.value+=s.price.price*s.quantity})});const H=u=>{t.order=u,d.value=!d.value},R=()=>{t.delete(route("cart.remove",t.order),{preserveScroll:!0,onSuccess:()=>{c.success("Successfully removed",{autoClose:1e3,transition:c.TRANSITIONS.FLIP,position:c.POSITION.TOP_RIGHT}),d.value=!1,t.reset()}})},A=()=>{t.selected_product.length<=0?c.error("Cannot check out if there's no products selected",{autoClose:1e3,transition:c.TRANSITIONS.FLIP,position:c.POSITION.TOP_RIGHT}):p.value=!p.value},j=()=>{t.post(route("deliveries.store"),{preserveScroll:!0,onSuccess:()=>{c.success("Successfully added in deliveries",{autoClose:1e3,transition:c.TRANSITIONS.FLIP,position:c.POSITION.TOP_RIGHT}),p.value=!1,t.reset()}})};return(u,s)=>(h(),_(g,null,[E,(h(!0),_(g,null,N(D.group_suppliers,(f,m)=>(h(),_("div",{key:m,class:"block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mt-2"},[e("div",U,[a($,{icon:"store",size:"md"}),e("p",W,l(m),1)]),e("div",Q,[e("div",J,[(h(!0),_(g,null,N(f,(o,x)=>{var b,w,C,T,I;return h(),_(g,{key:x},[e("div",K,[M(e("input",{class:"my-auto relative -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent",type:"checkbox",value:o,"onUpdate:modelValue":s[0]||(s[0]=P=>n(t).selected_product=P),id:"checkboxChecked"},null,8,X),[[z,n(t).selected_product]]),e("img",{class:"w-24 h-24 object-scale-down",src:(b=o.product)==null?void 0:b.product_image,alt:(w=o.product)==null?void 0:w.product_image},null,8,Y),e("p",Z,l((C=o.product)==null?void 0:C.name),1)]),e("div",ee,[e("span",te,l(o.remarks),1)]),e("div",se,[e("span",oe,l(y((T=o.price)==null?void 0:T.price)),1)]),e("div",re,[a(G,{order:o,quantity:o.quantity},null,8,["order","quantity"])]),e("div",ae,[e("span",ce,l(y(((I=o.price)==null?void 0:I.price)*o.quantity)),1)]),e("div",ie,[e("span",le,[e("a",{onClick:P=>H(o),class:"cursor-pointer"},[a($,{icon:"trash",size:"sm"})],8,ne)])])],64)}),128))])])]))),128)),e("div",de,[e("p",pe,[i(" Total ("+l(n(t).selected_product.length)+" "+l(n(t).selected_product.length<=1?" item":" items")+"): ",1),e("span",ue,l(y(k.value)),1)]),a(S,{onClick:A,class:"pt-1 pb-1 pl-4 pr-4 hover:bg-green-400 hover:text-white mt-2"},{default:r(()=>[i("Check Out")]),_:1})]),a(V,{show:d.value,onClose:s[2]||(s[2]=f=>d.value=!1),maxWidth:"2xl"},{title:r(()=>[i(" Are you sure you want to remove this item?")]),content:r(()=>[fe]),footer:r(()=>[a(F,{onClick:s[1]||(s[1]=f=>d.value=!1),class:"mr-2"},{default:r(()=>[i(" Cancel ")]),_:1}),a(S,{class:O([{"opacity-25":n(t).processing},"bg-green-200 hover:bg-green-400"]),disabled:n(t).processing,onClick:R},{default:r(()=>[me,i(" Submit ")]),_:1},8,["class","disabled"])]),_:1},8,["show"]),a(V,{show:p.value,onClose:s[4]||(s[4]=f=>p.value=!1),maxWidth:"2xl"},{title:r(()=>[i(" Are you sure you want to deliver this item/s?")]),content:r(()=>[_e]),footer:r(()=>[a(F,{onClick:s[3]||(s[3]=f=>p.value=!1),class:"mr-2"},{default:r(()=>[i(" Cancel ")]),_:1}),a(S,{class:O([{"opacity-25":n(t).processing},"bg-green-200 hover:bg-green-400"]),disabled:n(t).processing,onClick:j},{default:r(()=>[he,i(" Submit ")]),_:1},8,["class","disabled"])]),_:1},8,["show"])],64))}};export{Ce as default};
