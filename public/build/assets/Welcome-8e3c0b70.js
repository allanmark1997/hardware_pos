import{_ as l}from"./Icon-6956c443.js";import{T as f,d as h,b as o,u as r,a as e,w as i,t as x,f as t,n as g,F as p,o as _,Z as w,i as a,K as b}from"./app-7a28f91d.js";const v={class:"sm:fixed sm:top-0 sm:right-0 p-6 text-right z-10 gap-4"},y={class:"max-w-7xl mx-auto p-6 lg:p-8"},k=e("div",{class:"flex justify-center"},[e("img",{class:"mx-auto py-auto",src:"",alt:""})],-1),j={class:"mt-16"},C={class:"text-center"},L={class:"mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"},B=e("p",{class:"mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48"},[t(' "The nice thing about teamwork is that you always have others on your side." '),e("br"),t("- Margaret Carty ")],-1),z={class:"flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"},M=["href"],N=e("svg",{class:"w-3.5 h-3.5 ml-2","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 10"},[e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M1 5h12m0 0L9 1m4 4L9 9"})],-1),T=["href"],V=e("svg",{class:"w-3.5 h-3.5 ml-2","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 10"},[e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M1 5h12m0 0L9 1m4 4L9 9"})],-1),F={__name:"Welcome",props:["domain"],setup(c){const u=c,n=f({data:null}),d=()=>{n.post(route("logout"))},m=()=>{n.get(route("profile.show"))};return document.addEventListener("contextmenu",s=>s.preventDefault()),(s,W)=>(_(),h(p,null,[o(r(w),{title:"Welcome"}),e("div",{class:g(`relative sm:flex sm:justify-center sm:items-center min-h-screen bg-center bg-no-repeat bg-[url('${u.domain}/storage/logo/wrenches.jpg')] bg-gray-700 bg-blend-multiply`)},[e("div",v,[o(r(a),{onClick:m,class:"font-semibold text-green-600 hover:text-green-400 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 cursor-pointer flex"},{default:i(()=>[o(l,{icon:"user",size:"sm"}),t(" Profile ")]),_:1}),o(r(a),{onClick:d,class:"font-semibold text-red-600 hover:text-red-400 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 cursor-pointer flex"},{default:i(()=>[o(l,{icon:"logout",size:"md"}),t(" Logout ")]),_:1})]),e("div",y,[k,e("div",j,[e("div",C,[e("h1",L," Welcome back "+x(r(b)().props.auth.user.name)+"! ",1),B,e("div",z,[e("a",{href:s.route("cashier.index_transaction"),class:"inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"},[t(" Get started "),N],8,M),e("a",{href:s.route("cashier.index_return"),class:"inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300"},[t(" Return Items "),V],8,T)])])])])],2)],64))}};export{F as default};
