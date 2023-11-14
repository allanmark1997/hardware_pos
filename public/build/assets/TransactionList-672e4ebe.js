import{r as q,d as c,a as t,b as a,s as E,e as Y,F,g as $,t as l,O as N,o as i,f as P}from"./app-87951b6a.js";import{_ as n}from"./Icon-14e9e985.js";import{_ as W}from"./Pagination2-78677a0b.js";import{_ as j}from"./TextInput-fad836ab.js";import{_ as G}from"./Input-42db7c6c.js";import{h as J}from"./moment-fbc5633a.js";import"./index-0c8ca922.js";const Q={class:"flex justify-between mt-2"},X={class:"flex gap-2"},Z={class:"flex gap-2"},tt={class:"flex"},st=t("span",{class:"text-md mt-2 mr-2"},"From",-1),et={class:"flex"},ot=t("span",{class:"text-md mt-2 mr-2"},"To",-1),lt={class:"flex"},ct=["href"],at={class:"text-gray-600 bg-white rounded-lg py-5 px-3 mb-5 mt-2"},it={class:"container mx-auto"},dt={class:"relative overflow-x-auto"},nt={class:"w-full text-sm text-left text-gray-500"},_t=t("thead",{class:"text-xs text-white uppercase bg-yellow-500"},[t("tr",null,[t("th",{scope:"col",class:"px-6 py-3"},"Transaction ID"),t("th",{scope:"col",class:"px-6 py-3"},"Processed by"),t("th",{scope:"col",class:"px-6 py-3"},"Status"),t("th",{scope:"col",class:"px-6 py-3"}," Payment Method & Customer Type "),t("th",{scope:"col",class:"px-6 py-3"},"Tax & Discount"),t("th",{scope:"col",class:"px-6 py-3"},"Products"),t("th",{scope:"col",class:"px-6 py-3"},"Total Discount & VAT"),t("th",{scope:"col",class:"px-6 py-3"},"Total Paid"),t("th",{scope:"col",class:"px-6 py-3"},"Customer Cash"),t("th",{scope:"col",class:"px-6 py-3"},"Customer Change"),t("th",{scope:"col",class:"px-6 py-3"},"Total Unsuccess"),t("th",{scope:"col",class:"px-6 py-3"},"Created at")])],-1),pt={class:"px-6 py-4"},rt={class:"px-6 py-4"},ut={class:"flex gap-2"},mt=["src","alt"],ht={class:"px-6 py-4"},xt={key:0,class:"flex gap-1"},yt=t("span",{class:"bg-green-400 rounded-md p-1 text-white"}," Success ",-1),ft={key:1,class:"flex gap-1"},gt=t("span",{class:"bg-orange-400 rounded-md p-1 text-white"}," Unsuccess ",-1),vt={class:"px-6 py-4"},bt={class:"flex p-1 w-[8vmin]"},wt={key:0,class:"flex gap-1"},kt=t("small",{class:"bg-green-400 rounded-md p-1 text-white w-full"}," Walk-in ",-1),Vt={key:1,class:"flex gap-1"},St=t("small",{class:"bg-orange-400 rounded-md p-1 text-white"}," Regular ",-1),Tt={class:"flex"},Dt={key:0,class:"flex gap-1"},zt={key:1},Pt={class:"px-6 py-4"},Ct={class:"flex rounded-lg bg-red-400 p-[3px] text-white"},qt=t("small",null,"VAT: ",-1),Ft={class:"flex rounded-lg bg-orange-400 p-[3px] text-white mt-1"},Nt=t("small",null,"SD: ",-1),Ut={scope:"row",class:"px-2 py-1 text-gray-900"},Kt={class:"w-full text-xs text-left text-gray-500"},Et=t("thead",{class:"text-xs text-gray-700 uppercase bg-gray-100"},[t("tr",null,[t("th",{scope:"col",class:"px-1 py-1 flex"},"Product"),t("th",{scope:"col",class:"px-1 py-1"},"No."),t("th",{scope:"col",class:"px-1 py-1"},"Price"),t("th",{scope:"col",class:"px-1 py-1"},"Discount %"),t("th",{scope:"col",class:"px-1 py-1"},"Status"),t("th",{scope:"col",class:"px-1 py-1"},"Total Discount"),t("th",{scope:"col",class:"px-1 py-1"},"Sub-total")])],-1),Yt={class:"px-1 py-1 flex"},$t={class:"w-[20vmin] break-words"},jt={class:"px-1 py-1"},At={class:"px-1 py-1"},Bt={class:"px-1 py-1"},Mt={class:"px-1 py-1"},Ot={key:0,class:"bg-orange-400 rounded-sm p-[1px] text-white"},Rt={key:1,class:"bg-green-400 rounded-sm p-[1px] text-white"},Ht={key:2,class:"bg-orange-400 rounded-sm p-[1px] text-white"},It={key:3,class:"bg-red-400 rounded-sm p-[1px] text-white"},Lt={class:"px-1 py-1"},Wt={class:"px-1 py-1"},Gt={class:"px-6 py-4"},Jt={class:"flex rounded-lg bg-red-400 p-[3px] text-white"},Qt={class:"flex"},Xt={class:"flex rounded-lg bg-orange-400 p-[3px] text-white mt-1"},Zt={class:"flex"},ts={class:"px-6 py-4"},ss={class:"px-6 py-4"},es={class:"px-6 py-4"},os={class:"px-6 py-4"},ls={class:"px-6 py-4 flex gap-2"},cs={class:"flex items-center justify-between"},as={class:"mt-6 text-sm text-gray-500"},ms={__name:"TransactionList",props:["transactions","date_from","date_to","search"],setup(C){const V=C,h=q(V.date_from),x=q(V.date_to),g=q(V.search),A=e=>J(e).format("MM/DD/YYYY, h:mm:ss a"),u=e=>{let d=new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP",minimumFractionDigits:2,maximumFractionDigits:20,minimumSignificantDigits:1,maximumSignificantDigits:20}).format(e).split("."),m=String(d[1]).slice(0,2),y=m=="un"?"00":m;return String(d[0])+"."+y},B=()=>{N.get(route("transactions.index",{date_from:h.value,date_to:x.value}))},M=()=>{N.get(route("transactions.index",{search:g.value,date_from:h.value,date_to:x.value}))},O=()=>{N.get(route("transactions.index",{date_from:null,date_to:null,search:null}))},R=e=>{let o=0,s=e.sale_discount.discount/100;if(e.status==1)for(let d=0;d<e.quantity;d++)o+=e.price.price*s;return o},H=e=>{let o=0,s=0,d=e.sale_discount.discount/100;if(e.status==1||e.status==2)for(let _=0;_<e.quantity;_++)s=e.price.price*d,o+=e.price.price-s;else o+=e.price.price*e.quantity;return o},S=(e,o,s,d)=>{let _=0,m=0,y=0,f=0,v=0,T=o/100,D=s/100;if(e.forEach(p=>{let b=0,w=0,z=p.sale_discount.discount/100;if(p.status==1||p.status==2||p.status==3)for(let k=0;k<p.quantity;k++)w=p.price.price*z,b+=p.price.price-w;_+=b}),f=_*T,m=_-f,v=m*D,y=m+v,d==0)return y;if(d==1)return v;if(d==2)return f},I=e=>{let o=0;return e.forEach(s=>{s.status==0&&(o+=s.price.price*s.quantity)}),o};return(e,o)=>(i(),c(F,null,[t("div",Q,[t("div",X,[t("div",Z,[t("div",tt,[st,a(j,{id:"date_from",modelValue:h.value,"onUpdate:modelValue":o[0]||(o[0]=s=>h.value=s),type:"date",class:"mt-1 block w-full"},null,8,["modelValue"])]),t("div",et,[ot,a(j,{id:"date_to",modelValue:x.value,"onUpdate:modelValue":o[1]||(o[1]=s=>x.value=s),type:"date",class:"mt-1 block w-full",onKeyup:E(B,["enter"])},null,8,["modelValue","onKeyup"])]),t("div",lt,[a(G,{modelValue:g.value,"onUpdate:modelValue":o[2]||(o[2]=s=>g.value=s),class:"rounded-lg w-[30vmin]",type:"text",label:"Search transaction",onKeyup:E(M,["enter"])},null,8,["modelValue","onKeyup"])]),h.value||x.value||g.value?(i(),c("button",{key:0,class:"h-10 my-auto mt-5",onClick:O},[a(n,{icon:"close_icon",size:"sm"})])):Y("",!0)])]),t("a",{href:e.route("transactions.export",{date_from:h.value,date_to:x.value,search:g.value}),class:"bg-green-400 hover:bg-green-600 hover:text-white rounded-lg my-auto p-2"},"Export Transaction",8,ct)]),t("section",at,[t("div",it,[t("div",dt,[t("table",nt,[_t,t("tbody",null,[(i(!0),c(F,null,$(C.transactions.data,(s,d)=>{var _,m,y,f,v,T,D,p,b,w,z,k,U;return i(),c("tr",{key:d,class:"bg-white border-"},[t("td",pt,l(s.id),1),t("td",rt,[t("small",ut,[t("img",{class:"h-8 w-8 rounded-full object-cover",src:s.accommodate_by.profile_photo_url,alt:s.accommodate_by.name},null,8,mt),P(" "+l(((_=s.accommodate_by)==null?void 0:_.name)??"Pending"),1)])]),t("td",ht,[s.status==1?(i(),c("div",xt,[a(n,{icon:"check",size:"sm"}),yt])):(i(),c("div",ft,[a(n,{icon:"wrong",size:"xs"}),gt]))]),t("td",vt,[t("div",bt,[s.customer_type==0?(i(),c("div",wt,[a(n,{icon:"user",size:"md"}),kt])):(i(),c("div",Vt,[a(n,{icon:"user",size:"md"}),St]))]),t("div",Tt,[s.payment_method==0?(i(),c("small",Dt,[a(n,{icon:"cash",size:"sm"}),P(" Cash ")])):(i(),c("small",zt,"Other"))])]),t("td",Pt,[t("div",Ct,[a(n,{icon:"tax",size:"sm"}),qt,t("small",null,l((m=s.tax)==null?void 0:m.tax)+"% ",1)]),t("div",Ft,[a(n,{icon:"wheelchair",size:"sm"}),Nt,t("small",null,l(((y=s.special_discount)==null?void 0:y.discount)??"0")+"%",1)])]),t("td",Ut,[t("table",Kt,[Et,t("tbody",null,[(i(!0),c(F,null,$(s.transaction_details,(r,L)=>{var K;return i(),c("tr",{key:L,class:"bg-white border-"},[t("td",Yt,[a(n,{icon:"shopping_cart",size:"xs"}),t("p",$t,l((K=r.product)==null?void 0:K.name),1)]),t("td",jt,l(r.quantity),1),t("td",At,l(u(r.price.price)),1),t("td",Bt,l(r.sale_discount.discount)+"% ",1),t("td",Mt,[r.status==0?(i(),c("small",Ot," Unsuccess ")):r.status==1?(i(),c("small",Rt," Success ")):r.status==2?(i(),c("small",Ht," Pending Return ")):r.status==3?(i(),c("small",It," Returned ")):Y("",!0)]),t("td",Lt,[t("small",null,l(u(R(r))),1)]),t("td",Wt,[t("small",null,l(u(H(r))),1)])])}),128))])])]),t("td",Gt,[t("div",Jt,[t("small",Qt,[a(n,{icon:"tax",size:"sm"}),P("VAT: ")]),t("small",null,l(u(S(s.transaction_details,((f=s.special_discount)==null?void 0:f.discount)??0,((v=s.tax)==null?void 0:v.tax)??0,1))),1)]),t("div",Xt,[t("small",Zt,[a(n,{icon:"wheelchair",size:"sm"}),P("SD: ")]),t("small",null,l(u(S(s.transaction_details,((T=s.special_discount)==null?void 0:T.discount)??0,((D=s.tax)==null?void 0:D.tax)??0,2))),1)])]),t("td",ts,l(u(S(s.transaction_details,((p=s.special_discount)==null?void 0:p.discount)??0,((b=s.tax)==null?void 0:b.tax)??0,0))),1),t("td",ss,l(u(s.cash)),1),t("td",es,l(u(s.cash-S(s.transaction_details,((w=s.special_discount)==null?void 0:w.discount)??0,((z=s.tax)==null?void 0:z.tax)??0,0))),1),t("td",os,l(u(I(s.transaction_details,((k=s.special_discount)==null?void 0:k.discount)??0,((U=s.tax)==null?void 0:U.tax)??0))),1),t("td",ls,[a(n,{icon:"calendar",size:"md"}),t("small",null,l(A(s.created_at)),1)])])}),128))])])]),t("div",cs,[a(W,{links:V.transactions.links,date_from:h.value,date_to:x.value,search:g.value},null,8,["links","date_from","date_to","search"]),t("p",as," Showing "+l(C.transactions.data.length)+" Transactions ",1)])])])],64))}};export{ms as default};
