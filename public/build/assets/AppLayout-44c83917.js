import{o as s,d as r,r as L,j as S,K as f,s as O,n as g,a as t,e as i,t as k,h as M,z as F,I as E,m as v,J as T,u as d,k as z,L as P,b as n,w as a,M as I,c as m,i as C,Z as V,f as u,F as $,g as D,O as A}from"./app-7a28f91d.js";import{_ as R}from"./logo_main-f6fb4bdb.js";import{_ as U}from"./_plugin-vue_export-helper-c27b6911.js";import{_ as j}from"./Icon-6956c443.js";const q={},H={class:"",src:R};function J(c,l){return s(),r("img",H)}const K=U(q,[["render",J]]),Z={class:"max-w-screen-xl mx-auto py-2 px-3 sm:px-6 lg:px-8"},G={class:"flex items-center justify-between flex-wrap"},Q={class:"w-0 flex-1 flex items-center min-w-0"},W={key:0,class:"h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},X=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),Y=[X],ee={key:1,class:"h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},te=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"},null,-1),se=[te],re={class:"ml-3 font-medium text-sm text-white truncate"},oe={class:"shrink-0 sm:ml-3"},ae=t("svg",{class:"h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6 18L18 6M6 6l12 12"})],-1),ne=[ae],ie={__name:"Banner",setup(c){const l=L(!0),o=S(()=>{var e;return((e=f().props.jetstream.flash)==null?void 0:e.bannerStyle)||"success"}),h=S(()=>{var e;return((e=f().props.jetstream.flash)==null?void 0:e.banner)||""});return O(h,async()=>{l.value=!0}),(e,w)=>(s(),r("div",null,[l.value&&h.value?(s(),r("div",{key:0,class:g({"bg-yellow-500":o.value=="success","bg-red-700":o.value=="danger"})},[t("div",Z,[t("div",G,[t("div",Q,[t("span",{class:g(["flex p-2 rounded-lg",{"bg-yellow-600":o.value=="success","bg-red-600":o.value=="danger"}])},[o.value=="success"?(s(),r("svg",W,Y)):i("",!0),o.value=="danger"?(s(),r("svg",ee,se)):i("",!0)],2),t("p",re,k(h.value),1)]),t("div",oe,[t("button",{type:"button",class:g(["-mr-1 flex p-2 rounded-md focus:outline-none sm:-mr-2 transition",{"hover:bg-yellow-600 focus:bg-yellow-600":o.value=="success","hover:bg-red-600 focus:bg-red-600":o.value=="danger"}]),"aria-label":"Dismiss",onClick:w[0]||(w[0]=M(p=>l.value=!1,["prevent"]))},ne,2)])])])],2)):i("",!0)]))}},le={class:"relative"},N={__name:"Dropdown",props:{align:{type:String,default:"right"},width:{type:String,default:"48"},contentClasses:{type:Array,default:()=>["py-1","bg-white"]}},setup(c){const l=c;let o=L(!1);const h=p=>{o.value&&p.key==="Escape"&&(o.value=!1)};F(()=>document.addEventListener("keydown",h)),E(()=>document.removeEventListener("keydown",h));const e=S(()=>({48:"w-48"})[l.width.toString()]),w=S(()=>l.align==="left"?"origin-top-left left-0":l.align==="right"?"origin-top-right right-0":"origin-top");return(p,y)=>(s(),r("div",le,[t("div",{onClick:y[0]||(y[0]=B=>T(o)?o.value=!d(o):o=!d(o))},[v(p.$slots,"trigger")]),z(t("div",{class:"fixed inset-0 z-40",onClick:y[1]||(y[1]=B=>T(o)?o.value=!1:o=!1)},null,512),[[P,d(o)]]),n(I,{"enter-active-class":"transition ease-out duration-200","enter-from-class":"transform opacity-0 scale-95","enter-to-class":"transform opacity-100 scale-100","leave-active-class":"transition ease-in duration-75","leave-from-class":"transform opacity-100 scale-100","leave-to-class":"transform opacity-0 scale-95"},{default:a(()=>[z(t("div",{class:g(["absolute z-50 mt-2 rounded-md shadow-lg",[e.value,w.value]]),style:{display:"none"},onClick:y[2]||(y[2]=B=>T(o)?o.value=!1:o=!1)},[t("div",{class:g(["rounded-md ring-1 ring-black ring-opacity-5",c.contentClasses])},[v(p.$slots,"content")],2)],2),[[P,d(o)]])]),_:3})]))}},ue={key:0,type:"submit",class:"block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"},de=["href"],_={__name:"DropdownLink",props:{href:String,as:String},setup(c){return(l,o)=>(s(),r("div",null,[c.as=="button"?(s(),r("button",ue,[v(l.$slots,"default")])):c.as=="a"?(s(),r("a",{key:1,href:c.href,class:"block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"},[v(l.$slots,"default")],8,de)):(s(),m(d(C),{key:2,href:c.href,class:"block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"},{default:a(()=>[v(l.$slots,"default")]),_:3},8,["href"]))]))}},b={__name:"NavLink",props:{href:String,active:Boolean},setup(c){const l=c,o=S(()=>l.active?"inline-flex items-center px-1 pt-1 border-b-2 border-yellow-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-yellow-700 transition duration-150 ease-in-out":"inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out");return(h,e)=>(s(),m(d(C),{href:c.href,class:g(o.value)},{default:a(()=>[v(h.$slots,"default")]),_:3},8,["href","class"]))}},x={__name:"ResponsiveNavLink",props:{active:Boolean,href:String,as:String},setup(c){const l=c,o=S(()=>l.active?"block w-full pl-3 pr-4 py-2 border-l-4 border-yellow-400 text-left text-base font-medium text-yellow-700 bg-yellow-50 focus:outline-none focus:text-yellow-800 focus:bg-yellow-100 focus:border-yellow-700 transition duration-150 ease-in-out":"block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out");return(h,e)=>(s(),r("div",null,[c.as=="button"?(s(),r("button",{key:0,class:g([o.value,"w-full text-left"])},[v(h.$slots,"default")],2)):(s(),m(d(C),{key:1,href:c.href,class:g(o.value)},{default:a(()=>[v(h.$slots,"default")]),_:3},8,["href","class"]))]))}},ce={class:"min-h-screen bg-gray-100"},pe={class:"bg-white border-b border-gray-100"},he={class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"},fe={class:"flex justify-between h-16"},me={class:"flex"},ge={class:"shrink-0 flex items-center"},ve={class:"hidden space-x-8 sm:-my-px sm:ml-10 sm:flex"},_e={key:0,class:"hidden space-x-8 sm:-my-px sm:ml-10 sm:flex"},ye={key:1,class:"hidden space-x-8 sm:-my-px sm:ml-10 sm:flex"},be={key:2,class:"hidden space-x-8 sm:-my-px sm:ml-10 sm:flex"},we={key:3,class:"hidden space-x-8 sm:-my-px sm:ml-10 sm:flex"},xe={key:4,class:"hidden space-x-8 sm:-my-px sm:ml-10 sm:flex"},ke={key:5,class:"hidden space-x-8 sm:-my-px sm:ml-10 sm:flex"},$e={key:6,class:"hidden space-x-8 sm:-my-px sm:ml-10 sm:flex"},Se={class:"hidden sm:flex sm:items-center sm:ml-6"},je={class:"ml-3 relative"},Me={class:"inline-flex rounded-md"},Ce={type:"button",class:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150"},Te=t("svg",{class:"ml-2 -mr-0.5 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"})],-1),Le={class:"w-60"},Be=t("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Manage Team ",-1),ze=t("div",{class:"border-t border-gray-200"},null,-1),Pe=t("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Switch Teams ",-1),De=["onSubmit"],Ae={class:"flex items-center"},Ne={key:0,class:"mr-2 h-5 w-5 text-green-400",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},Fe=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),Oe=[Fe],Ee={class:"ml-3 relative"},Ie={key:0,class:"flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition"},Ve=["src","alt"],Re={key:1,class:"inline-flex rounded-md"},Ue={type:"button",class:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150"},qe=t("svg",{class:"ml-2 -mr-0.5 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M19.5 8.25l-7.5 7.5-7.5-7.5"})],-1),He=t("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Manage Account ",-1),Je={class:"flex gap-2"},Ke={class:"flex gap-2"},Ze={class:"flex gap-2"},Ge={class:"flex gap-2"},Qe=t("div",{class:"border-t border-gray-200"},null,-1),We=["onSubmit"],Xe={class:"flex"},Ye=t("p",{class:"my-auto"},"Log Out",-1),et={class:"-mr-2 flex items-center sm:hidden"},tt={class:"h-6 w-6",stroke:"currentColor",fill:"none",viewBox:"0 0 24 24"},st={class:"pt-2 pb-3 space-y-1"},rt={class:"pt-4 pb-1 border-t border-gray-200"},ot={class:"flex items-center px-4"},at={key:0,class:"shrink-0 mr-3"},nt=["src","alt"],it={class:"font-medium text-base text-gray-800"},lt={class:"font-medium text-sm text-gray-500"},ut={class:"mt-3 space-y-1"},dt=["onSubmit"],ct=t("div",{class:"border-t border-gray-200"},null,-1),pt=t("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Manage Team ",-1),ht=t("div",{class:"border-t border-gray-200"},null,-1),ft=t("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Switch Teams ",-1),mt=["onSubmit"],gt={class:"flex items-center"},vt={key:0,class:"mr-2 h-5 w-5 text-green-400",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},_t=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),yt=[_t],bt={key:0,class:"bg-white shadow"},wt={class:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"},jt={__name:"AppLayout",props:{title:String},setup(c){F(()=>{localStorage.setItem("qrScanner","")});const l=L(!1),o=e=>{A.put(route("current-team.update"),{team_id:e.id},{preserveState:!1})},h=()=>{A.post(route("logout"))};return(e,w)=>(s(),r("div",null,[n(d(V),{title:c.title},null,8,["title"]),n(ie),t("div",ce,[t("nav",pe,[t("div",he,[t("div",fe,[t("div",me,[t("div",ge,[n(d(C),{href:e.route("dashboard")},{default:a(()=>[n(K,{class:"block h-9 w-auto"})]),_:1},8,["href"])]),t("div",ve,[n(b,{href:e.route("dashboard"),active:e.route().current("dashboard")},{default:a(()=>[u(" Dashboard ")]),_:1},8,["href","active"])]),d(f)().props.auth.user.type!=2?(s(),r("div",_e,[n(b,{href:e.route("products.index"),active:e.route().current("products.index")},{default:a(()=>[u(" Products ")]),_:1},8,["href","active"])])):i("",!0),d(f)().props.auth.user.type!=2?(s(),r("div",ye,[n(b,{href:e.route("supplier_products.index"),active:e.route().current("supplier_products.index")},{default:a(()=>[u(" Supplier Products ")]),_:1},8,["href","active"])])):i("",!0),d(f)().props.auth.user.type!=2?(s(),r("div",be,[n(b,{href:e.route("deliveries.index"),active:e.route().current("deliveries.index")},{default:a(()=>[u(" Deliveries ")]),_:1},8,["href","active"])])):i("",!0),d(f)().props.auth.user.type!=2?(s(),r("div",we,[n(b,{href:e.route("deliveries.receive_index"),active:e.route().current("deliveries.receive_index")},{default:a(()=>[u(" Accept Deliveries ")]),_:1},8,["href","active"])])):i("",!0),d(f)().props.auth.user.type!=2?(s(),r("div",xe,[n(b,{href:e.route("transactions.index"),active:e.route().current("transactions.index")},{default:a(()=>[u(" Transactions ")]),_:1},8,["href","active"])])):i("",!0),d(f)().props.auth.user.type!=2?(s(),r("div",ke,[n(b,{href:e.route("back_orders.index"),active:e.route().current("back_orders.index")},{default:a(()=>[u(" Back Orders ")]),_:1},8,["href","active"])])):i("",!0),d(f)().props.auth.user.type!=2?(s(),r("div",$e,[n(b,{href:e.route("return.index"),active:e.route().current("return.index")},{default:a(()=>[u(" Return Transactions ")]),_:1},8,["href","active"])])):i("",!0)]),t("div",Se,[t("div",je,[e.$page.props.jetstream.hasTeamFeatures?(s(),m(N,{key:0,align:"right",width:"60"},{trigger:a(()=>[t("span",Me,[t("button",Ce,[u(k(e.$page.props.auth.user.current_team.name)+" ",1),Te])])]),content:a(()=>[t("div",Le,[e.$page.props.jetstream.hasTeamFeatures?(s(),r($,{key:0},[Be,n(_,{href:e.route("teams.show",e.$page.props.auth.user.current_team)},{default:a(()=>[u(" Team Settings ")]),_:1},8,["href"]),e.$page.props.jetstream.canCreateTeams?(s(),m(_,{key:0,href:e.route("teams.create")},{default:a(()=>[u(" Create New Team ")]),_:1},8,["href"])):i("",!0),e.$page.props.auth.user.all_teams.length>1?(s(),r($,{key:1},[ze,Pe,(s(!0),r($,null,D(e.$page.props.auth.user.all_teams,p=>(s(),r("form",{key:p.id,onSubmit:M(y=>o(p),["prevent"])},[n(_,{as:"button"},{default:a(()=>[t("div",Ae,[p.id==e.$page.props.auth.user.current_team_id?(s(),r("svg",Ne,Oe)):i("",!0),t("div",null,k(p.name),1)])]),_:2},1024)],40,De))),128))],64)):i("",!0)],64)):i("",!0)])]),_:1})):i("",!0)]),t("div",Ee,[n(N,{align:"right",width:"48"},{trigger:a(()=>[e.$page.props.jetstream.managesProfilePhotos?(s(),r("button",Ie,[t("img",{class:"h-8 w-8 rounded-full object-cover",src:e.$page.props.auth.user.profile_photo_url,alt:e.$page.props.auth.user.name},null,8,Ve)])):(s(),r("span",Re,[t("button",Ue,[u(k(e.$page.props.auth.user.name)+" ",1),qe])]))]),content:a(()=>[He,n(_,{href:e.route("profile.show")},{default:a(()=>[t("div",Je,[n(j,{icon:"administrator",size:"sm"}),u(" Profile ")])]),_:1},8,["href"]),d(f)().props.auth.user.type!=2?(s(),m(_,{key:0,href:e.route("users.index")},{default:a(()=>[t("div",Ke,[n(j,{icon:"settings",size:"sm"}),u(" User Management ")])]),_:1},8,["href"])):i("",!0),d(f)().props.auth.user.type!=2?(s(),m(_,{key:1,href:e.route("suppliers.index")},{default:a(()=>[t("div",Ze,[n(j,{icon:"settings",size:"sm"}),u(" Supplier Management ")])]),_:1},8,["href"])):i("",!0),d(f)().props.auth.user.type!=2?(s(),m(_,{key:2,href:e.route("cart.index")},{default:a(()=>[t("div",Ge,[n(j,{icon:"shopping_cart",size:"sm"}),u(" Cart ")])]),_:1},8,["href"])):i("",!0),e.$page.props.jetstream.hasApiFeatures?(s(),m(_,{key:3,href:e.route("api-tokens.index")},{default:a(()=>[u(" API Tokens ")]),_:1},8,["href"])):i("",!0),Qe,t("form",{onSubmit:M(h,["prevent"])},[n(_,{as:"button"},{default:a(()=>[t("div",Xe,[n(j,{icon:"logout",size:"md"}),Ye])]),_:1})],40,We)]),_:1})])]),t("div",et,[t("button",{class:"inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out",onClick:w[0]||(w[0]=p=>l.value=!l.value)},[(s(),r("svg",tt,[t("path",{class:g({hidden:l.value,"inline-flex":!l.value}),"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 6h16M4 12h16M4 18h16"},null,2),t("path",{class:g({hidden:!l.value,"inline-flex":l.value}),"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"},null,2)]))])])])]),t("div",{class:g([{block:l.value,hidden:!l.value},"sm:hidden"])},[t("div",st,[n(x,{href:e.route("dashboard"),active:e.route().current("dashboard")},{default:a(()=>[u(" Dashboard ")]),_:1},8,["href","active"])]),t("div",rt,[t("div",ot,[e.$page.props.jetstream.managesProfilePhotos?(s(),r("div",at,[t("img",{class:"h-10 w-10 rounded-full object-cover",src:e.$page.props.auth.user.profile_photo_url,alt:e.$page.props.auth.user.name},null,8,nt)])):i("",!0),t("div",null,[t("div",it,k(e.$page.props.auth.user.name),1),t("div",lt,k(e.$page.props.auth.user.email),1)])]),t("div",ut,[n(x,{href:e.route("profile.show"),active:e.route().current("profile.show")},{default:a(()=>[u(" Profile ")]),_:1},8,["href","active"]),e.$page.props.jetstream.hasApiFeatures?(s(),m(x,{key:0,href:e.route("api-tokens.index"),active:e.route().current("api-tokens.index")},{default:a(()=>[u(" API Tokens ")]),_:1},8,["href","active"])):i("",!0),t("form",{method:"POST",onSubmit:M(h,["prevent"])},[n(x,{as:"button"},{default:a(()=>[u(" Log Out ")]),_:1})],40,dt),e.$page.props.jetstream.hasTeamFeatures?(s(),r($,{key:1},[ct,pt,n(x,{href:e.route("teams.show",e.$page.props.auth.user.current_team),active:e.route().current("teams.show")},{default:a(()=>[u(" Team Settings ")]),_:1},8,["href","active"]),e.$page.props.jetstream.canCreateTeams?(s(),m(x,{key:0,href:e.route("teams.create"),active:e.route().current("teams.create")},{default:a(()=>[u(" Create New Team ")]),_:1},8,["href","active"])):i("",!0),e.$page.props.auth.user.all_teams.length>1?(s(),r($,{key:1},[ht,ft,(s(!0),r($,null,D(e.$page.props.auth.user.all_teams,p=>(s(),r("form",{key:p.id,onSubmit:M(y=>o(p),["prevent"])},[n(x,{as:"button"},{default:a(()=>[t("div",gt,[p.id==e.$page.props.auth.user.current_team_id?(s(),r("svg",vt,yt)):i("",!0),t("div",null,k(p.name),1)])]),_:2},1024)],40,mt))),128))],64)):i("",!0)],64)):i("",!0)])])],2)]),e.$slots.header?(s(),r("header",bt,[t("div",wt,[v(e.$slots,"header")])])):i("",!0),t("main",null,[v(e.$slots,"default")])])]))}};export{jt as _};
