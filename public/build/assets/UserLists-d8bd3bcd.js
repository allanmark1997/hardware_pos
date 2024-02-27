import{_ as S}from"./logo_main-f6fb4bdb.js";import{_ as I}from"./Pagination2-ac64f6eb.js";import{r as y,o as e,d as o,a as t,f as v,t as l,e as g,O as T,T as N,F as b,g as O,b as n,w as x,n as j,u as k}from"./app-33456085.js";import{_ as z}from"./ConfirmationModal-40f2973a.js";import{_ as A}from"./SecondaryButton-6fde8c8e.js";import{_ as M}from"./Button-edbdb13c.js";import{_ as f}from"./Icon-0bc4b434.js";import{l as u}from"./index-65c1f31e.js";import{h as P}from"./moment-fbc5633a.js";import"./Modal-88305cf4.js";const V={class:"col-span-4 relative"},B=t("svg",{class:"w-2.5 h-2.5 ml-2.5","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 10 6"},[t("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m1 1 4 4 4-4"})],-1),F={key:0,id:"dropdown",class:"z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute"},R={class:"py-2 text-sm text-gray-700"},D={__name:"CustomDropdownPosition",props:["status","id"],setup(w){const i=w,a=y(!1),c=y(i.status==1?"Administrator":"Cashier"),d=()=>{a.value=!a.value},p=h=>{h==1?c.value="Administrator":c.value="Cashier",T.put(route("users.update_user_position",{type:h,id:i.id})),a.value=!a.value};return(h,_)=>(e(),o("div",V,[t("button",{onClick:d,class:"text-gray-500 bg-white focus:ring-1 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center border border-gray-300 w-full",type:"button"},[v(l(c.value)+" ",1),B]),a.value?(e(),o("div",F,[t("ul",R,[t("li",null,[t("a",{onClick:_[0]||(_[0]=r=>p(1)),class:"block px-4 py-2 hover:bg-gray-100 cursor-pointer"},"Staff Administrator "),t("a",{onClick:_[1]||(_[1]=r=>p(2)),class:"block px-4 py-2 hover:bg-gray-100 cursor-pointer"},"Cashier ")])])])):g("",!0)]))}},L={class:"container px-4 mx-auto"},Y={class:"flex flex-col mt-6"},H={class:"-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"},U={class:"text-gray-600 p-10"},E={class:"container px-5 mx-auto"},G={class:"flex flex-wrap -m-4"},W={class:"bg-gray-50 border border-1 border-yellow-400 shadow-xl p-6 rounded-lg"},q={key:0,class:"h-40 rounded max-w- object-fit object-center mb-6 mx-auto",src:S,alt:"user image"},J=["src","alt"],K={class:"tracking-widest text-indigo-500 text-xs font-medium title-font"},Q={class:"text-lg text-gray-900 font-medium title-font mb-4"},X={class:"flex mt-4 gap-1"},Z={class:"text-sm font-medium"},tt={class:"flex mt-1 gap-1 mb-1"},st={class:"text-gray-700 text-sm"},et={class:"flex mt-1 gap-2"},ot={class:"text-sm"},at={class:"flex mt-1 gap-2"},nt={class:"text-xs"},it={key:2,class:"leading-relaxed font-bold mt-5 mb-2 text-base"},rt={key:3,class:"text-sm whitespace-nowrap"},lt={key:4,class:"text-sm mt-3 whitespace-nowrap"},ct={class:"flex my-auto gap-1"},dt=t("p",{class:"text-sm text-gray-700 text-center font-bold"}," Root admin ",-1),_t={key:5,class:"text-sm mt-2 flex justify-center w-100 whitespace-nowrap"},mt=["onClick"],ut=["onClick"],pt={key:0,class:"mx-auto text-center"},ht=t("p",{class:"text-4xl text-gray-700"},"No users!",-1),xt=[ht],ft={class:"flex items-center justify-between my-6"},gt={class:"mt-6 text-sm text-gray-500"},vt=t("p",{class:"text-red-500"}," Clicking can update the system and may cause possible error! ",-1),yt=t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-auto",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),jt={__name:"UserLists",props:["users","search"],setup(w){const i=w,a=y(!1),c=y(""),d=N({status:null,type:!0}),p=(r,m)=>{d.status=r,c.value=m,a.value=!a.value},h=r=>P(r).format("MMMM Do YYYY"),_=()=>{d.put(route("users.update_user",{user:c.value}),{preserveScroll:!0,onSuccess:()=>{u.success("User successfully updated!",{autoClose:1e3,transition:u.TRANSITIONS.FLIP,position:u.POSITION.TOP_RIGHT}),a.value=!a.value,d.reset(),c.value.reset()},onError:r=>{u.error("Somthing went wrong "+r,{autoClose:1e3,transition:u.TRANSITIONS.FLIP,position:u.POSITION.TOP_RIGHT})}})};return(r,m)=>(e(),o(b,null,[t("section",L,[t("div",Y,[t("div",H,[t("section",U,[t("div",E,[t("div",G,[(e(!0),o(b,null,O(i.users.data.filter(s=>s.type!=0&&i.users.data.length!=0),(s,C)=>(e(),o("div",{key:C,class:"xl:w-1/3 md:w-1/2 p-4"},[t("div",W,[s.profile_photo_path==null?(e(),o("img",q)):(e(),o("img",{key:1,class:"h-40 rounded max-w- object-fit object-center mb-6 mx-auto",src:s.profile_photo_url,alt:s.name},null,8,J)),t("h3",K,l(s.email),1),t("h2",Q,l(s.name),1),t("div",X,[n(f,{icon:"sex",size:"sm"}),t("p",Z,l(s.sex==0?"Female":"Male"),1)]),t("div",tt,[n(f,{icon:"birthday",size:"sm"}),t("h4",st,l(h(s.bday)),1)]),t("div",et,[n(f,{icon:"mobile",size:"sm"}),t("p",ot,l(s.contact_no),1)]),t("div",at,[n(f,{icon:"location",size:"sm"}),t("p",nt,l(s.address),1)]),s.type!=0?(e(),o("p",it," Controls ")):g("",!0),s.type!=0?(e(),o("div",rt,[n(D,{status:s.type,id:s.id},null,8,["status","id"])])):(e(),o("div",lt,[t("div",ct,[n(f,{icon:"administrator",size:"sm"}),dt])])),s.type!=0?(e(),o("div",_t,[s.status==0&&s.type!=0?(e(),o("button",{key:0,onClick:$=>p(!0,s),class:"p-2 bg-green-400 rounded-lg hover:bg-green-600"}," Activate ",8,mt)):s.status==1&&s.type!=0?(e(),o("button",{key:1,onClick:$=>p(!1,s),class:"p-2 bg-red-400 rounded-lg hover:bg-red-600"}," Deactivate ",8,ut)):g("",!0)])):g("",!0)])]))),128)),i.users.data.length==0?(e(),o("div",pt,xt)):g("",!0)])])])])]),t("div",ft,[n(I,{links:i.users.links,search:i.search},null,8,["links","search"]),t("p",gt," Showing "+l(i.users.data.length)+" Users ",1)])]),n(z,{show:a.value,onClose:m[1]||(m[1]=s=>a.value=!1),maxWidth:"2xl"},{title:x(()=>[v(" Are you sure you want to update this user's status?")]),content:x(()=>[vt]),footer:x(()=>[n(A,{onClick:m[0]||(m[0]=s=>a.value=!1),class:"mr-2"},{default:x(()=>[v(" Cancel ")]),_:1}),n(M,{class:j([{"opacity-25":k(d).processing},"bg-green-200 hover:bg-green-400"]),disabled:k(d).processing,onClick:_},{default:x(()=>[yt,v(" Submit ")]),_:1},8,["class","disabled"])]),_:1},8,["show"])],64))}};export{jt as default};