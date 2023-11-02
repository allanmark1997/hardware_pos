import{r as q,d as c,a as s,b as a,q as F,e as Y,F as N,g as $,t as l,O as U,o as d,f as V}from"./app-7f390f71.js";import{_ as n}from"./Icon-9324afd6.js";import{_ as W}from"./Pagination2-d66d04c1.js";import{_ as j}from"./TextInput-4e29b1d4.js";import{_ as G}from"./Input-51ffcca1.js";import{h as J}from"./moment-fbc5633a.js";import"./index-6dabe31e.js";const Q={class:"flex justify-between mt-2"},X={class:"flex gap-2"},Z={class:"flex gap-2"},ss={class:"flex"},ts=s("span",{class:"text-md mt-2 mr-2"},"From",-1),es={class:"flex"},os=s("span",{class:"text-md mt-2 mr-2"},"To",-1),ls={class:"flex"},cs=["href"],as={class:"text-gray-600 bg-white rounded-lg py-5 px-3 mb-5 mt-2"},ds={class:"container mx-auto"},ns={class:"relative overflow-x-auto"},is={class:"w-full text-sm text-left text-gray-500"},_s=s("thead",{class:"text-xs text-white uppercase bg-yellow-500"},[s("tr",null,[s("th",{scope:"col",class:"px-6 py-3"},"Transaction ID"),s("th",{scope:"col",class:"px-6 py-3"},"Processed by"),s("th",{scope:"col",class:"px-6 py-3"},"Status"),s("th",{scope:"col",class:"px-6 py-3"}," Payment Method & Customer Type "),s("th",{scope:"col",class:"px-6 py-3"},"Tax & Discount"),s("th",{scope:"col",class:"px-6 py-3"},"Products"),s("th",{scope:"col",class:"px-6 py-3"},"Total Discount & VAT"),s("th",{scope:"col",class:"px-6 py-3"},"Total Paid"),s("th",{scope:"col",class:"px-6 py-3"},"Customer Cash"),s("th",{scope:"col",class:"px-6 py-3"},"Customer Change"),s("th",{scope:"col",class:"px-6 py-3"},"Total Unsuccess"),s("th",{scope:"col",class:"px-6 py-3"},"Created at")])],-1),ps={class:"px-6 py-4"},us={class:"px-6 py-4"},rs={class:"flex gap-2"},ms=["src","alt"],hs={class:"px-6 py-4"},xs={key:0,class:"flex gap-1"},ys=s("span",{class:"bg-green-400 rounded-md p-1 text-white"}," Success ",-1),fs={key:1,class:"flex gap-1"},gs=s("span",{class:"bg-orange-400 rounded-md p-1 text-white"}," Unsuccess ",-1),vs={class:"px-6 py-4"},bs={class:"flex p-1 w-[8vmin]"},ws={key:0,class:"flex gap-1"},ks=s("small",{class:"bg-green-400 rounded-md p-1 text-white w-full"}," Walk-in ",-1),Vs={key:1,class:"flex gap-1"},Ts=s("small",{class:"bg-orange-400 rounded-md p-1 text-white"}," Regular ",-1),zs={class:"flex"},Ps={key:0,class:"flex gap-1"},Ds={key:1},Ss={class:"px-6 py-4"},Cs={class:"flex rounded-lg bg-red-400 p-[3px] text-white"},qs=s("small",null,"VAT: ",-1),Ns={class:"flex rounded-lg bg-orange-400 p-[3px] text-white mt-1"},Us=s("small",null,"SD: ",-1),Ks={scope:"row",class:"px-2 py-1 text-gray-900 whitespace-nowrap"},Es={class:"w-full text-xs text-left text-gray-500"},Fs=s("thead",{class:"text-xs text-gray-700 uppercase bg-gray-100"},[s("tr",null,[s("th",{scope:"col",class:"px-1 py-1 flex"},"Product"),s("th",{scope:"col",class:"px-1 py-1"},"No."),s("th",{scope:"col",class:"px-1 py-1"},"Price"),s("th",{scope:"col",class:"px-1 py-1"},"Discount %"),s("th",{scope:"col",class:"px-1 py-1"},"Status"),s("th",{scope:"col",class:"px-1 py-1"},"Total Discount"),s("th",{scope:"col",class:"px-1 py-1"},"Sub-total")])],-1),Ys={class:"px-1 py-1 flex"},$s={class:"px-1 py-1"},js={class:"px-1 py-1"},As={class:"px-1 py-1"},Bs={class:"px-1 py-1"},Ms={key:0,class:"bg-orange-400 rounded-sm p-[1px] text-white"},Os={key:1,class:"bg-green-400 rounded-sm p-[1px] text-white"},Rs={key:2,class:"bg-orange-400 rounded-sm p-[1px] text-white"},Hs={key:3,class:"bg-red-400 rounded-sm p-[1px] text-white"},Is={class:"px-1 py-1"},Ls={class:"px-1 py-1"},Ws={class:"px-6 py-4"},Gs={class:"flex rounded-lg bg-red-400 p-[3px] text-white"},Js={class:"flex"},Qs={class:"flex rounded-lg bg-orange-400 p-[3px] text-white mt-1"},Xs={class:"flex"},Zs={class:"px-6 py-4"},st={class:"px-6 py-4"},tt={class:"px-6 py-4"},et={class:"px-6 py-4"},ot={class:"px-6 py-4 flex gap-2"},lt={class:"flex items-center justify-between"},ct={class:"mt-6 text-sm text-gray-500"},rt={__name:"TransactionList",props:["transactions","date_from","date_to","search"],setup(C){const T=C,m=q(T.date_from),h=q(T.date_to),x=q(T.search),A=e=>J(e).format("MM/DD/YYYY, h:mm:ss a"),u=e=>{const o=new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"});return o.format(e),o.format(e)},B=()=>{U.get(route("transactions.index",{date_from:m.value,date_to:h.value}))},M=()=>{U.get(route("transactions.index",{search:x.value,date_from:m.value,date_to:h.value}))},O=()=>{U.get(route("transactions.index",{date_from:null,date_to:null,search:null}))},R=e=>{let o=0,t=e.sale_discount.discount/100;if(e.status==1)for(let i=0;i<e.quantity;i++)o+=e.price.price*t;return o},H=e=>{let o=0,t=0,i=e.sale_discount.discount/100;if(e.status==1||e.status==2)for(let r=0;r<e.quantity;r++)t=e.price.price*i,o+=e.price.price-t;else o+=e.price.price*e.quantity;return o},z=(e,o,t,i)=>{let r=0,y=0,v=0,f=0,g=0,P=o/100,D=t/100;if(e.forEach(_=>{let b=0,w=0,S=_.sale_discount.discount/100;if(_.status==1||_.status==2||_.status==3)for(let k=0;k<_.quantity;k++)w=_.price.price*S,b+=_.price.price-w;r+=b}),f=r*P,y=r-f,g=y*D,v=y+g,i==0)return v;if(i==1)return g;if(i==2)return f},I=e=>{let o=0;return e.forEach(t=>{t.status==0&&(o+=t.price.price*t.quantity)}),o};return(e,o)=>(d(),c(N,null,[s("div",Q,[s("div",X,[s("div",Z,[s("div",ss,[ts,a(j,{id:"date_from",modelValue:m.value,"onUpdate:modelValue":o[0]||(o[0]=t=>m.value=t),type:"date",class:"mt-1 block w-full"},null,8,["modelValue"])]),s("div",es,[os,a(j,{id:"date_to",modelValue:h.value,"onUpdate:modelValue":o[1]||(o[1]=t=>h.value=t),type:"date",class:"mt-1 block w-full",onKeyup:F(B,["enter"])},null,8,["modelValue","onKeyup"])]),s("div",ls,[a(G,{modelValue:x.value,"onUpdate:modelValue":o[2]||(o[2]=t=>x.value=t),class:"rounded-lg w-[30vmin]",type:"text",label:"Search transaction",onKeyup:F(M,["enter"])},null,8,["modelValue","onKeyup"])]),m.value||h.value||x.value?(d(),c("button",{key:0,class:"h-10 my-auto mt-5",onClick:O},[a(n,{icon:"close_icon",size:"sm"})])):Y("",!0)])]),s("a",{href:e.route("transactions.export",{date_from:m.value,date_to:h.value,search:x.value}),class:"bg-green-400 hover:bg-green-600 hover:text-white rounded-lg my-auto p-2"},"Export Transaction",8,cs)]),s("section",as,[s("div",ds,[s("div",ns,[s("table",is,[_s,s("tbody",null,[(d(!0),c(N,null,$(C.transactions.data,(t,i)=>{var r,y,v,f,g,P,D,_,b,w,S,k,K;return d(),c("tr",{key:i,class:"bg-white border-"},[s("td",ps,l(t.id),1),s("td",us,[s("small",rs,[s("img",{class:"h-8 w-8 rounded-full object-cover",src:t.accommodate_by.profile_photo_url,alt:t.accommodate_by.name},null,8,ms),V(" "+l(((r=t.accommodate_by)==null?void 0:r.name)??"Pending"),1)])]),s("td",hs,[t.status==1?(d(),c("div",xs,[a(n,{icon:"check",size:"sm"}),ys])):(d(),c("div",fs,[a(n,{icon:"wrong",size:"xs"}),gs]))]),s("td",vs,[s("div",bs,[t.customer_type==0?(d(),c("div",ws,[a(n,{icon:"user",size:"md"}),ks])):(d(),c("div",Vs,[a(n,{icon:"user",size:"md"}),Ts]))]),s("div",zs,[t.payment_method==0?(d(),c("small",Ps,[a(n,{icon:"cash",size:"sm"}),V(" Cash ")])):(d(),c("small",Ds,"Other"))])]),s("td",Ss,[s("div",Cs,[a(n,{icon:"tax",size:"sm"}),qs,s("small",null,l((y=t.tax)==null?void 0:y.tax)+"% ",1)]),s("div",Ns,[a(n,{icon:"wheelchair",size:"sm"}),Us,s("small",null,l(((v=t.special_discount)==null?void 0:v.discount)??"0")+"%",1)])]),s("td",Ks,[s("table",Es,[Fs,s("tbody",null,[(d(!0),c(N,null,$(t.transaction_details,(p,L)=>{var E;return d(),c("tr",{key:L,class:"bg-white border-"},[s("td",Ys,[a(n,{icon:"shopping_cart",size:"xs"}),V(" "+l((E=p.product)==null?void 0:E.name),1)]),s("td",$s,l(p.quantity),1),s("td",js,l(u(p.price.price)),1),s("td",As,l(p.sale_discount.discount)+"% ",1),s("td",Bs,[p.status==0?(d(),c("small",Ms," Unsuccess ")):p.status==1?(d(),c("small",Os," Success ")):p.status==2?(d(),c("small",Rs," Pending Return ")):p.status==3?(d(),c("small",Hs," Returned ")):Y("",!0)]),s("td",Is,[s("small",null,l(u(R(p))),1)]),s("td",Ls,[s("small",null,l(u(H(p))),1)])])}),128))])])]),s("td",Ws,[s("div",Gs,[s("small",Js,[a(n,{icon:"tax",size:"sm"}),V("VAT: ")]),s("small",null,l(u(z(t.transaction_details,((f=t.special_discount)==null?void 0:f.discount)??0,((g=t.tax)==null?void 0:g.tax)??0,1))),1)]),s("div",Qs,[s("small",Xs,[a(n,{icon:"wheelchair",size:"sm"}),V("SD: ")]),s("small",null,l(u(z(t.transaction_details,((P=t.special_discount)==null?void 0:P.discount)??0,((D=t.tax)==null?void 0:D.tax)??0,2))),1)])]),s("td",Zs,l(u(z(t.transaction_details,((_=t.special_discount)==null?void 0:_.discount)??0,((b=t.tax)==null?void 0:b.tax)??0,0))),1),s("td",st,l(u(t.cash)),1),s("td",tt,l(u(t.cash-z(t.transaction_details,((w=t.special_discount)==null?void 0:w.discount)??0,((S=t.tax)==null?void 0:S.tax)??0,0))),1),s("td",et,l(u(I(t.transaction_details,((k=t.special_discount)==null?void 0:k.discount)??0,((K=t.tax)==null?void 0:K.tax)??0))),1),s("td",ot,[a(n,{icon:"calendar",size:"md"}),s("small",null,l(A(t.created_at)),1)])])}),128))])])]),s("div",lt,[a(W,{links:T.transactions.links,date_from:m.value,date_to:h.value,search:x.value},null,8,["links","date_from","date_to","search"]),s("p",ct," Showing "+l(C.transactions.data.length)+" Transactions ",1)])])])],64))}};export{rt as default};