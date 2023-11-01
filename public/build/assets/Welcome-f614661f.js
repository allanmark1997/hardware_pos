import{T as c,d,b as r,u as s,a as e,w as u,t as m,f as t,n as h,F as x,o as g,Z as f,i as p,K as _}from"./app-7f390f71.js";const w={class:"sm:fixed sm:top-0 sm:right-0 p-6 text-right z-10"},b={class:"max-w-7xl mx-auto p-6 lg:p-8"},y=e("div",{class:"flex justify-center"},[e("img",{class:"mx-auto py-auto",src:"",alt:""})],-1),v={class:"mt-16"},k={class:"text-center"},j={class:"mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"},C=e("p",{class:"mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48"},[t(' "The nice thing about teamwork is that you always have others on your side." '),e("br"),t("- Margaret Carty ")],-1),B={class:"flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"},L=["href"],M=e("svg",{class:"w-3.5 h-3.5 ml-2","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 10"},[e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M1 5h12m0 0L9 1m4 4L9 9"})],-1),N=["href"],T=e("svg",{class:"w-3.5 h-3.5 ml-2","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 10"},[e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M1 5h12m0 0L9 1m4 4L9 9"})],-1),z={__name:"Welcome",props:["domain"],setup(n){const l=n,a=c({data:null}),i=()=>{a.post(route("logout"))};return(o,V)=>(g(),d(x,null,[r(s(f),{title:"Welcome"}),e("div",{class:h(`relative sm:flex sm:justify-center sm:items-center min-h-screen bg-center bg-no-repeat bg-[url('${l.domain}/storage/logo/wrenches.jpg')] bg-gray-700 bg-blend-multiply`)},[e("div",w,[r(s(p),{onClick:i,class:"font-semibold text-red-600 hover:text-red-400 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 cursor-pointer"},{default:u(()=>[t(" Logout ")]),_:1})]),e("div",b,[y,e("div",v,[e("div",k,[e("h1",j," Welcome back "+m(s(_)().props.auth.user.name)+"! ",1),C,e("div",B,[e("a",{href:o.route("cashier.index_transaction"),class:"inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"},[t(" Get started "),M],8,L),e("a",{href:o.route("cashier.index_return"),class:"inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300"},[t(" Return Items "),T],8,N)])])])])],2)],64))}};export{z as default};
