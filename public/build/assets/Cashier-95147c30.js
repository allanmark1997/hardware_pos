import{r as c,y as k,O as s,T as C,o as r,c as S,w as g,a as e,t as d,k as D,x as j,u as _,b as n,d as i,f as y,e as z,g as V,F as $}from"./app-d10659b1.js";import{_ as B}from"./AppLayout-7f5de6f6.js";import{_ as a}from"./Icon-720210fc.js";import"./index-824a8249.js";import"./logo_main-f6fb4bdb.js";import"./_plugin-vue_export-helper-c27b6911.js";const F={class:"font-semibold text-lg text-gray-800 leading-tight"},M={class:"py-5"},P={class:"max-w-7xl mx-auto bg-white rounded mt-5 px-1"},E={class:"grid grid-cols-12 gap-2"},O={class:"col-span-7 p-5"},L={class:"flex items-center"},N=e("label",{for:"Search products",class:"sr-only"},"Search",-1),T={class:"relative w-full"},A={class:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"},Q=e("input",{type:"text",id:"Search products",class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 p-2.5",placeholder:"Search products"},null,-1),q={class:"product_list bg-gray-50 p-1 rounded-lg mt-3 min-h-[60vmin] overflow-auto"},H={key:0,class:"mt-24 flex justify-center"},G={class:"bg-white px-10 py-5 shadow-lg rounded xl"},K={class:"flex justify-center mb-2"},U={class:"col-span-5"},W={class:"bg-white rounded-b-xl shadow-md p-5 flex justify-between max-h-[63vmin]"},I={class:"flex"},J=e("span",{class:"font-bold"},"Cart",-1),R=e("span",{class:"font-bold"}," count: ",-1),X={class:"bg-red-500 ml-1 px-2 text-white rounded-xl w-10 text-center"},Y={key:0},Z={key:1},ee={key:2},te={class:"flex mt-5 mx-5 items-center"},se=e("label",{for:"Search products",class:"sr-only"},"Search",-1),oe={class:"relative w-full"},re={class:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"},ne=e("input",{type:"text",id:"Search products",class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 p-2.5",placeholder:"Search products"},null,-1),ae={type:"submit",class:"inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-yellow-700 rounded-lg border border-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300"},le={class:"relative mt-5 px-2 overflow-x-auto min-h-[45vmin] shadow-md"},ie={class:"w-full text-sm text-left text-gray-500"},ce={class:"bg-white border-b"},de=e("td",{class:"px-6 py-4 font-semibold text-gray-900"}," Wrench ",-1),ue=e("td",{class:"px-6 py-4"},[e("div",{class:"flex items-center space-x-3"},[e("div",null,[e("div",{class:"flex items-center space-x-3"},[e("button",{class:"inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200",type:"button"},[e("span",{class:"sr-only"},"Quantity button"),e("svg",{class:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 18 2"},[e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M1 1h16"})])]),e("div",null,[e("input",{type:"number",id:"first_product",class:"bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"1",required:""})]),e("button",{class:"inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200",type:"button"},[e("span",{class:"sr-only"},"Quantity button"),e("svg",{class:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 18 18"},[e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9 1v16M1 9h16"})])])])])])],-1),pe=e("td",{class:"px-6 py-4 font-semibold text-gray-900"},"$9992",-1),he={class:"px-6 py-4 font-semibold text-gray-900"},fe=e("div",{class:"bg-white flex justify-between item-center p-5"},[e("p",null,[e("span",{class:"font-bold"},"Total:"),y(" 200")]),e("button",{type:"button",class:"focus:outline-none text-white bg-yellow-600 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"}," Charge ")],-1),ve={__name:"Cashier",props:["product","cashier_status","cashier_stat_id"],setup(b){const u=b,l=c(2),x=c(5);c(2),c(),c(),k(()=>{v()});const v=o=>{u.cashier_status=="false"&&document.addEventListener("keydown",t=>{t.keyCode==112&&s.page.component=="Cashier/Cashier"?(console.log("Access the help menu or get assistance on using the POS system."),t.preventDefault()):t.keyCode==113&&s.page.component=="Cashier/Cashier"?(console.log("Sales: Start a new sales transaction or access the sales menu"),t.preventDefault()):t.keyCode==114&&s.page.component=="Cashier/Cashier"?(console.log("Discounts: Apply discounts to items or access the discount menu."),t.preventDefault()):t.keyCode==115&&s.page.component=="Cashier/Cashier"?(console.log(" Void: Void or cancel a transaction or remove items from a sale."),t.preventDefault()):t.keyCode==116&&s.page.component=="Cashier/Cashier"?(console.log("Price Lookup: Look up the price of an item or access the price lookup feature"),t.preventDefault()):t.keyCode==117&&s.page.component=="Cashier/Cashier"?(console.log("Quantity: Adjust the quantity of an item being sold."),t.preventDefault()):t.keyCode==118&&s.page.component=="Cashier/Cashier"?(console.log("Payment: Enter the payment amount or access the payment menu"),t.preventDefault()):t.keyCode==119&&s.page.component=="Cashier/Cashier"?(console.log("Hold: Place a transaction on hold or retrieve a held transaction."),t.preventDefault()):t.keyCode==120&&s.page.component=="Cashier/Cashier"?(console.log("Search: Search for items, customers, or transactions within the POS system."),t.preventDefault()):t.keyCode==121&&s.page.component=="Cashier/Cashier"&&(console.log("Exit: Exit or close the POS system."),t.preventDefault())}),m()},f=o=>o>=1e9?(o/1e9).toFixed(1).replace(/\.0$/,"")+"G":o>=1e6?(o/1e6).toFixed(1).replace(/\.0$/,"")+"M":o>=1e3?(o/1e3).toFixed(1).replace(/\.0$/,"")+"K":o,p=C({search:"",machine:!1}),w=()=>{p.get(route("cashier.index"),{preserveScroll:!0,onSuccess:()=>{}})},m=()=>{s.put(route("cashier_stat.update_status",u.cashier_stat_id))};return(o,t)=>(r(),S(B,{title:"Dashboard"},{header:g(()=>[e("h2",F,"Cashier "+d(u.cashier_status),1)]),default:g(()=>[e("div",M,[D(e("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=h=>_(p).search=h)},null,512),[[j,_(p).search]]),e("button",{onClick:t[1]||(t[1]=h=>w()),class:"bg-red-200"},"scan"),e("div",P,[e("div",E,[e("div",O,[e("form",L,[N,e("div",T,[e("div",A,[n(a,{class:"mr-1",icon:"shopping_bag",size:"xs"})]),Q]),e("button",{onClick:m,type:"submit",class:"inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-yellow-700 rounded-lg border border-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300"},[n(a,{class:"mr-5",icon:"search_icon",size:"xs"})])]),e("div",q,[x.value==0?(r(),i("div",H,[e("div",G,[e("div",K,[n(a,{icon:"shopping_bag",size:"md"})]),y(" Scan a product ")])])):z("",!0)])]),e("div",U,[e("div",W,[e("div",I,[n(a,{icon:"shopping_cart",size:"sm"}),J]),e("div",null,[R,e("span",X,[l.value>=1e3?(r(),i("small",Y,d(f(l.value)),1)):l.value>=100?(r(),i("small",Z,d(f(l.value)),1)):(r(),i("small",ee,d(l.value),1))])])]),e("form",te,[se,e("div",oe,[e("div",re,[n(a,{class:"mr-1",icon:"shopping_bag",size:"xs"})]),ne]),e("button",ae,[n(a,{class:"mr-5",icon:"search_icon",size:"xs"})])]),e("div",le,[e("table",ie,[e("tbody",null,[(r(!0),i($,null,V(l.value,h=>(r(),i("tr",ce,[de,ue,pe,e("td",he,[e("button",null,[n(a,{icon:"close_icon",size:"sm",class:"text-red"})])])]))),256))])])]),fe])])])])]),_:1}))}};export{ve as default};