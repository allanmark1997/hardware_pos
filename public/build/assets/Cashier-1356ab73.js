import{l as pe,o as m,d as h,j as K,m as me,a as e,q as he,r as u,y as J,v as V,F as L,g as F,f,t as n,e as j,x as X,T as fe,O as _,i as Y,z as _e,b as x,u as i,w as k,Z as ve,k as ge,s as xe,n as q,K as ye}from"./app-87951b6a.js";import{_ as M}from"./Icon-14e9e985.js";import{_ as W}from"./ConfirmationModal-2e36cdf6.js";import{_ as be}from"./DialogModal-aa4fb71c.js";import{_ as z}from"./SecondaryButton-941150ed.js";import{_ as Z}from"./Input-42db7c6c.js";import{_ as U}from"./Button-656f33a0.js";import we from"./Barcode-bd583adb.js";import{h as Q}from"./moment-fbc5633a.js";import{l as a}from"./index-0c8ca922.js";import"./Modal-c66d27cc.js";import"./BarcodeSVG-712954a8.js";const Ce={class:"inline-flex relative items-center mb-2 cursor-pointer"},ke=["value"],Te=e("div",{class:"w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"},null,-1),Ie={class:"ml-2 text-sm font-medium text-gray-900"},Se={__name:"Switch",props:{checked:{type:[Array,Boolean],default:!1},value:{type:String,default:null}},emits:["update:checked"],setup(v,{emit:b}){const O=v,p=pe({get(){return O.checked},set(w){b("update:checked",w)}});return(w,y)=>(m(),h("label",Ce,[K(e("input",{type:"checkbox",class:"sr-only peer",value:v.value,"onUpdate:modelValue":y[0]||(y[0]=d=>p.value=d)},null,8,ke),[[me,p.value]]),Te,e("span",Ie,[he(w.$slots,"default")])]))}},Pe={key:0,id:"defaultModal",tabindex:"-1","aria-hidden":"true",class:"fixed top-0 left-0 right-0 backdrop-blur-sm z-50 pt-52 flex justify-center item-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"},Oe={class:"relative w-full max-w-3xl max-h-full"},Ne={class:"relative bg-white rounded-lg shadow"},$e=e("div",{class:"flex items-start justify-between p-4 border-b rounded-t"},[e("h3",{class:"text-xl font-semibold text-gray-900"}," Look Up ")],-1),Ae={class:"p-6 space-y-6"},Re={class:"max-h-md"},Le={key:0,role:"status",class:"space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"},De=X('<div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96"><svg class="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18"><path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"></path></svg></div><div class="w-full"><div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div><div class="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div><div class="h-2 bg-gray-200 rounded-full mb-2.5"></div><div class="h-2 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div><div class="h-2 bg-gray-200 rounded-full max-w-[460px] mb-2.5"></div><div class="h-2 bg-gray-200 rounded-full max-w-[360px]"></div></div><span class="sr-only">Loading...</span>',3),Ke=[De],Fe={key:1,role:"status",class:"space-y-1 md:space-y-0 md:space-x-1 md:flex md:items-center"},je=["onClick"],He=["src"],Me=e("br",null,null,-1),Ve={class:"flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b"},Be={key:0,role:"status",class:"space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"},qe=X('<div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96"><svg class="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18"><path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"></path></svg></div><div class="w-full"><div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div><div class="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div><div class="h-2 bg-gray-200 rounded-full mb-2.5"></div><div class="h-2 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div><div class="h-2 bg-gray-200 rounded-full max-w-[460px] mb-2.5"></div><div class="h-2 bg-gray-200 rounded-full max-w-[360px]"></div></div><span class="sr-only">Loading...</span>',3),ze=[qe],Ue={key:1,class:"flex flex-col justify-center"},Ge={class:"relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white"},Ee={class:"w-full md:w-1/3 bg-white grid place-items-center"},Ye=["src"],We={class:"w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3"},Ze={class:"flex justify-between item-center"},Qe={class:"text-gray-500 font-medium hidden md:block"},Je={class:"flex gap-1"},Xe={class:"bg-red-500 px-3 py-1 rounded-full text-xs font-medium text-white"},et={class:"font-black text-gray-800 md:text-3xl text-xl"},tt={class:"md:text-lg text-gray-500 text-base"},st=e("p",{class:"md:text-lg text-gray-500 text-base"},[e("strong",null,"Details:")],-1),ot={class:"md:text-lg text-gray-500 text-base"},lt={class:"md:text-lg text-orange-800 text-base"},at={class:"text-xl flex justify-end font-black text-gray-800"},nt={__name:"SKU",props:["SKULookup","products"],setup(v){const b=v,O=u("");u([{name:"AF1",imgSrc:"https://th.bing.com/th/id/OIP.gskj3fuAc3TMy9_NLV4-swHaJ4?pid=ImgDet&rs=1",price:2e3},{name:"kobe IV",imgSrc:"https://th.bing.com/th/id/R.c0b464ee5bf466b0774fd958cd49d671?rik=4BKsxct35mNq%2fg&riu=http%3a%2f%2fcontents.spin.ph%2fimage%2fresize%2fimage%2f2019%2f02%2f23%2fnike-kobe-iv-protro-1550916244.webp&ehk=HWW%2b6sYFBuz%2fZMO%2b2yAwK5n%2fujbgm5fG%2fEBuFgcVPyU%3d&risl=&pid=ImgRaw&r=0",price:3e3},{name:"SB freedy",imgSrc:"https://th.bing.com/th/id/OIP.PpVn4AnJf178qD-1dZGs5AHaEc?pid=ImgDet&rs=1",price:2300},{name:"J1 blacktoe",imgSrc:"https://sneakernews.com/wp-content/uploads/2019/02/air-jordan-1-low-black-toe-553558-116-2.jpg",price:2023}]);const p=u({name:"",imgSrc:"",price:null}),w=y=>{p.value=y,console.log(p.value)};return J(()=>{p.value=""}),(y,d)=>b.SKULookup?(m(),h("div",Pe,[e("div",Oe,[e("div",Ne,[$e,e("div",Ae,[K(e("input",{type:"text","onUpdate:modelValue":d[0]||(d[0]=T=>O.value=T),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",placeholder:"SKU Lookup"},null,512),[[V,O.value]]),e("div",Re,[O.value?(m(),h("div",Fe,[(m(!0),h(L,null,F(b.products,T=>(m(),h("div",null,[T.name.toLocaleLowerCase().includes(O.value.toLocaleLowerCase())?(m(),h("button",{key:0,type:"button",onClick:S=>w(T),class:"inline-flex items-center px-1 py-1 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 overflow-hidden"},[e("img",{src:T.product_image,class:"max-w-2xl w-10 rounded-lg mr-2 object-contain max-h-auto h-10"},null,8,He),f(" "+n(T.name),1),Me,f("₱ "+n(T.current_price.price),1)],8,je)):j("",!0)]))),256))])):(m(),h("div",Le,Ke))])]),e("div",Ve,[p.value.name?(m(),h("div",Ue,[e("div",Ge,[e("div",Ee,[e("img",{src:p.value.product_image,alt:"tailwind logo",class:"rounded-xl"},null,8,Ye)]),e("div",We,[e("div",Ze,[e("p",Qe,"Stocks: "+n(p.value.quantity),1),e("div",Je,[e("div",Xe,n(p.value.current_discount.discount)+"% Discount",1)])]),e("h3",et,n(p.value.name),1),e("p",tt,[e("strong",null,"Barcode:"+n(p.value.barcode),1)]),st,e("p",ot,n(p.value.description.details),1),e("p",lt,[e("strong",null,n(p.value.description.specification.spec_title),1)]),(m(!0),h(L,null,F(p.value.description.specification.spec_details,T=>(m(),h("p",null,[e("strong",null,n(T.spec_name)+": ",1),f(" "+n(T.spec_details),1)]))),256)),e("div",at," ₱ "+n(p.value.current_price.price),1)])])])):(m(),h("div",Be,ze))])])])])):j("",!0)}};const it={class:"py-5"},rt={class:"fixed m-[50%] z-[-1000]"},dt={class:"flex max-w-7xl mx-auto justify-end"},ct={class:"sm:fixed sm:top-0 sm:left-0 p-6 text-right z-10"},ut={class:"flex max-w-7xl mx-auto justify-end mt-6"},pt={class:"px-2 py-1.5 text-2xl font-semibold text-white bg-yellow-700 border rounded-lg"},mt={class:"flex max-w-7xl mx-auto justify-start"},ht={class:"text-2xl text-gray-800"},ft=e("span",{class:"font-bold"},"Barcode:",-1),_t={class:"text-3xl font-bold animate-ping"},vt={class:"flex max-w-7xl mx-auto justify-start"},gt={class:"text-4xl text-gray-800"},xt=e("span",{class:"font-bold"},"Grand Total:",-1),yt={class:"text-5xl font-bold"},bt={class:"max-w-7xl mx-auto bg-white rounded mt-5 px-1"},wt={class:"grid grid-cols-12 gap-2"},Ct={class:"col-span-7 p-5"},kt={class:"product_list bg-gray-50 p-1 rounded-lg mt-3 min-h-[60vmin] overflow-auto"},Tt={class:"mt-24 flex max-w-lg mx-auto max-h-lg justify-center"},It=["src"],St={class:"col-span-5"},Pt={class:"bg-white rounded-b-xl shadow-md p-5 flex justify-between max-h-[63vmin]"},Ot={class:"flex"},Nt=e("span",{class:"font-bold"},"Cart",-1),$t={key:0},At={class:"italic ml-1 text-white flex bg-red-600 p-1 rounded-lg"},Rt=e("span",{class:"font-bold"}," Items: ",-1),Lt={class:"bg-red-500 ml-1 px-2 text-white rounded-xl w-10 text-center"},Dt={class:"relative mt-5 px-2 overflow-x-auto min-h-[45vmin] shadow-md"},Kt={class:"w-full text-sm text-left text-gray-500"},Ft={class:"bg-white border-b"},jt=e("td",{class:"px-6 py-4 font-semibold text-gray-900"},"Wrench",-1),Ht=e("td",{class:"px-6 py-4"},[e("div",{class:"flex items-center space-x-3"},[e("div",null,[e("div",{class:"flex items-center space-x-3"},[e("button",{class:"inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200",type:"button"},[e("span",{class:"sr-only"},"Quantity button"),e("svg",{class:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 18 2"},[e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M1 1h16"})])]),e("div",null,[e("input",{type:"number",id:"first_product",class:"bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"1",required:""})]),e("button",{class:"inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200",type:"button"},[e("span",{class:"sr-only"},"Quantity button"),e("svg",{class:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 18 18"},[e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9 1v16M1 9h16"})])])])])])],-1),Mt=e("td",{class:"px-6 py-4 font-semibold text-gray-900"},null,-1),Vt={class:"px-6 py-4 font-semibold text-gray-900"},Bt={key:0,class:"mx-auto text-center text-xs"},qt={key:1,class:"w-full"},zt={class:"flow-root max-h-[50vmin] overflow-auto p-2",id:"addedCartScrll"},Ut={class:"py-3 sm:py-4"},Gt={class:"flex items-center space-x-4"},Et={class:"flex-shrink-0"},Yt=["src"],Wt={class:"flex-1 min-w-0"},Zt={class:"text-sm font-medium text-gray-900 truncate"},Qt={class:"inline-flex items-center text-base font-semibold text-gray-900 text-xs"},Jt={class:"inline-flex items-center text-base font-semibold text-gray-900"},Xt=["onClick"],es=["onClick"],ts={class:"inline-flex items-center text-base font-semibold text-gray-900 text-xs"},ss={class:"inline-flex items-center text-base font-semibold text-gray-900 text-xs bg-red-400 text-white p-2 rounded-lg hover:bg-red-500"},os=["onClick"],ls={class:"item-center p-5"},as={class:"font-bold"},ns={class:"font-bold"},is=e("span",{class:"font-bold"},"Sub-Total (Excluding VAT):",-1),rs=e("span",{class:"font-bold"},"Sub-Total:",-1),ds={class:"justify-end flex"},cs={key:0,id:"defaultModal",tabindex:"-1","aria-hidden":"true",class:"fixed top-0 left-0 right-0 backdrop-blur-sm z-50 pt-52 flex justify-center item-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"},us={class:"relative w-full max-w-2xl max-h-full"},ps={class:"relative bg-white rounded-lg shadow"},ms={class:"flex items-start justify-between p-4 border-b rounded-t"},hs=e("h3",{class:"text-xl font-semibold text-gray-900"},"Delete All?",-1),fs=e("svg",{class:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14"},[e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})],-1),_s=e("span",{class:"sr-only"},"Close modal",-1),vs=[fs,_s],gs=e("div",{class:"p-6 space-y-6"},[e("p",{class:"text-base leading-relaxed text-gray-500"}," Are you sure you want to delete all transactions? ")],-1),xs={class:"flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b"},ys=["onKeyup"],bs=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-auto",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),ws=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-auto",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),Cs={class:"text-justify overflow-auto p-3 relative"},ks={id:"toPrint",class:"text-justify overflow-auto p-3 relative border bg-white flex-wrap hidden"},Ts={class:""},Is=e("thead",null,[e("tr",{class:"border mb-2"},[e("th",null,[e("small",null,"CRISBODS HARDWARE AND CONSTRUCTION SUPPLY")])]),e("tr",{class:"border mb-2"},[e("th",null,[e("small",{style:{"font-size":"10px"}},"Dologon, Busco, Quezon Rd., Maramag, Bukidnon, 8714")])])],-1),Ss={class:"border"},Ps=e("tr",null,[e("td",null,[e("small",null,"TIN: 487-279-975-00001")])],-1),Os=e("tr",null,[e("td",null,[e("small",{style:{"font-size":"10px"}},"*************************************")])],-1),Ns=e("small",null,"Customer Name:",-1),$s=e("small",null,"Customer Address:",-1),As={style:{"font-size":"10px"}},Rs=e("tr",null,[e("td",null,[e("small",{style:{"font-size":"10px"}},"*************************************")])],-1),Ls={class:""},Ds=e("thead",null,[e("tr",{class:"border mb-2"},[e("th",null,[e("small",null,"Retail")]),e("th",null,[e("small",null,"QTY")]),e("th",null,[e("small",null,"TOTAL")])])],-1),Ks={class:"border"},Fs={style:{width:"20px"}},js={style:{"font-size":"10px","word-break":"break-all"}},Hs={style:{width:"60px"}},Ms={id:"totalPrice",style:{"font-size":"10px !important","word-break":"break-all"}},Vs={class:""},Bs={class:"border"},qs=e("tr",null,[e("td",null,[e("small",{style:{"font-size":"10px"}},"*************************************")])],-1),zs=e("tr",null,[e("td",null,[e("small",{style:{"font-size":"10px"}},"*************************************")])],-1),Us={class:""},Gs={class:"border mb-2"},Es={class:"border mb-2"},Ys={class:"border mb-2"},Ws={class:"border"},Zs=e("tr",null,[e("td",null,[e("small",{style:{"font-size":"10px"}},"*************************************")])],-1),Qs=e("tr",null,[e("td",null,[e("small",null," This serve as an OFFICIAL RECEIPT "),e("small",null,"Thank You, Come Again")])],-1),Js=e("tr",null,[e("td",null,[e("small",{style:{"font-size":"10px"}},"*************************************")])],-1),Xs={class:"grid grid-cols-12 gap-2"},eo={class:"col-span-full"},to={class:"text-2xl"},so={class:"text-4xl font-bold"},oo={class:"col-span-full"},lo={class:"text-2xl"},ao={class:"text-4xl font-bold"},no={class:"col-span-full"},io={class:"text-sm"},ro={class:"font-bold"},co={class:"col-span-full"},uo={class:"text-sm"},po={class:"font-bold"},mo=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-auto",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),So={__name:"Cashier",props:["product","cashier_status","cashier_stat_id","tax","special_discount","code"],setup(v){const b=v,O=u(0);u(5),u(2),u(),u();const p=u(!1),w=u(!1),y=u(!1),d=u(!1),T=u(!1),S=u(""),N=u(""),I=u(1),B=u(0),g=u(0),D=u(!1);u(0),u(0),u(!1);const R=u(!1);u({exe:!1,pass:0});const o=fe({products:[],search:"",tax_id:b.tax.id,special_discount_id:d.value==!0?b.special_discount.id:null,cash:null,print_show:!1,print_status:!1,customer_name:"",customer_address:"",code_generator:""});J(()=>{document.onkeydown=s=>{(s.key=="F12"||s.key==123)&&s.preventDefault(),(s.key=="F5"||s.key==116)&&s.preventDefault(),s.ctrlKey&&s.shiftKey&&s.key=="I"&&s.preventDefault(),s.ctrlKey&&s.shiftKey&&s.key=="C"&&s.preventDefault(),s.ctrlKey&&s.shiftKey&&s.key=="J"&&s.preventDefault(),s.ctrlKey&&s.key=="U"&&s.preventDefault()},document.addEventListener("contextmenu",s=>s.preventDefault()),ee()});const ee=s=>{b.cashier_status=="false"&&document.addEventListener("keydown",t=>{t.keyCode==112&&_.page.component=="Cashier/Cashier"?(console.log("Start transaction."),t.preventDefault()):t.ctrlKey&&t.keyCode==68&&_.page.component=="Cashier/Cashier"?(console.log("Discount"),d.value=!d.value,d.value?a.success("Special discount has been applied!",{autoClose:1e3,transition:a.TRANSITIONS.FLIP,position:a.POSITION.TOP_RIGHT}):a.error("Special discount has been removed!",{autoClose:1e3,transition:a.TRANSITIONS.FLIP,position:a.POSITION.TOP_RIGHT}),t.preventDefault()):t.keyCode==114&&_.page.component=="Cashier/Cashier"?(console.log("Transaction ."),t.preventDefault()):t.keyCode==115&&_.page.component=="Cashier/Cashier"?(console.log("Change Quantity."),t.preventDefault()):t.keyCode==117&&_.page.component=="Cashier/Cashier"?(console.log("Description."),t.preventDefault()):t.keyCode==118&&_.page.component=="Cashier/Cashier"?(console.log("Delete Item "),t.preventDefault()):t.ctrlKey&&t.keyCode==68&&_.page.component=="Cashier/Cashier"?(T.value||(w.value=!w.value),t.preventDefault()):t.ctrlKey&&t.shiftKey&&t.keyCode==70&&_.page.component=="Cashier/Cashier"?(console.log("SKU Look up"),w.value||(T.value=!T.value),t.preventDefault()):t.keyCode==121&&_.page.component=="Cashier/Cashier"?(console.log("Sales Return."),t.preventDefault()):t.ctrlKey&&t.keyCode==66&&_.page.component=="Cashier/Cashier"?se():t.ctrlKey&&t.keyCode==38&&_.page.component=="Cashier/Cashier"?E(!0,!1):t.ctrlKey&&t.keyCode==40&&_.page.component=="Cashier/Cashier"?E(!1,!0):t.ctrlKey&&t.keyCode==13&&_.page.component=="Cashier/Cashier"?G():p.value==!0&&t.ctrlKey&&t.keyCode==78&&_.page.component=="Cashier/Cashier"?p.value=!p.value:t.ctrlKey&&t.altKey&&t.keyCode==80&&_.page.component=="Cashier/Cashier"?(oe(),y.value=!y.value):y.value==!0&&t.ctrlKey&&t.altKey&&t.keyCode==70&&_.page.component=="Cashier/Cashier"?le():y.value==!0&&t.ctrlKey&&t.altKey&&t.keyCode==89&&_.page.component=="Cashier/Cashier"?H():y.value==!0&&t.ctrlKey&&t.altKey&&t.keyCode==78&&_.page.component=="Cashier/Cashier"?y.value=!y.value:w.value==!0&&t.ctrlKey&&t.altKey&&t.keyCode==89&&_.page.component=="Cashier/Cashier"?(o.products=[],N.value="",w.value=!1):w.value==!0&&t.ctrlKey&&t.altKey&&t.keyCode==78&&_.page.component=="Cashier/Cashier"&&(w.value=!1)}),te()};Y(()=>o.products,(s,t)=>{let l=0,c=0,P=0;s.forEach(A=>{g.value=0,B.value=0,P=0,l=l+A.cashier_quantity,P=C(A.current_price.price,A.current_discount.discount).discountedPrice*A.cashier_quantity,c=c+P}),B.value=l,g.value=c},{deep:!0}),Y(()=>R.value,s=>{s==!0&&(o.customer_name="Walk-in Customer",o.customer_address="Walk-in Customer")},{deep:!0});const C=(s,t)=>{if(t<0||t>100)return s;const l=s-s*(t/100);return{...s,discountedPrice:l.toFixed(2)}},$=s=>{let t=0,l=0,c=b.tax.tax/100;return l=parseFloat(s)*c,t=parseFloat(s)+l,t},G=()=>{let s=b.product.find(t=>t.barcode==S.value);if(s==null)a.error("Product not available!",{autoClose:1e3,transition:a.TRANSITIONS.FLIP,position:a.POSITION.TOP_RIGHT}),S.value="",I.value=1;else if(s!=null)if(s.quantity<=0)a.error("Product is out of stock!",{autoClose:1e3,transition:a.TRANSITIONS.FLIP,position:a.POSITION.TOP_RIGHT}),S.value="",I.value=1;else{let t=o.products.find(c=>c.barcode==s.barcode),l=o.products.findIndex(c=>c.barcode==s.barcode);if(t==null)s.cashier_quantity=I.value,o.products.push(s),N.value=s.product_image,a.success("Product added to cart!",{autoClose:1e3,transition:a.TRANSITIONS.FLIP,position:a.POSITION.TOP_RIGHT}),S.value="",I.value=1;else{let c=o.products[l].cashier_quantity+I.value;o.products[l].cashier_quantity=c,N.value=s.product_image,N.value=s.product_image,a.success("Product added to cart!",{autoClose:1e3,transition:a.TRANSITIONS.FLIP,position:a.POSITION.TOP_RIGHT}),S.value="",I.value=1}}},r=s=>{let c=new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP",minimumFractionDigits:2,maximumFractionDigits:20,minimumSignificantDigits:1,maximumSignificantDigits:20}).format(s).split("."),A=String(c[1]).slice(0,2),ue=A=="un"?"00":A;return String(c[0])+"."+ue},te=()=>{_.put(route("cashier_stat.update_status",b.cashier_stat_id))},H=()=>{let s=$(C(g.value,d.value==!0?b.special_discount.discount:0).discountedPrice);parseFloat(o.cash)<parseFloat(s)?a.error("Inputed cash is insuficient",{autoClose:1e3,transition:a.TRANSITIONS.FLIP,position:a.POSITION.TOP_RIGHT}):parseFloat(o.cash)==0||o.cash==""||o.cash==null?a.error("Please input cash first to proceed!",{autoClose:1e3,transition:a.TRANSITIONS.FLIP,position:a.POSITION.TOP_RIGHT}):o.products.length<=0?a.error("Opps looks like there's no products in the cart, please add them first!",{autoClose:1e3,transition:a.TRANSITIONS.FLIP,position:a.POSITION.TOP_RIGHT}):o.customer_name==""||o.customer_name==null?a.error("Please input customer's name before can proceed",{autoClose:1e3,transition:a.TRANSITIONS.FLIP,position:a.POSITION.TOP_RIGHT}):o.customer_address==""||o.customer_address==null?a.error("Please input customer's address before can proceed",{autoClose:1e3,transition:a.TRANSITIONS.FLIP,position:a.POSITION.TOP_RIGHT}):(y.value=!1,D.value=!0,o.print_status==!0&&o.post(route("cashier.store"),{preserveScroll:!0,onSuccess:()=>{a.success("Print print",{autoClose:1e3,transition:a.TRANSITIONS.FLIP,position:a.POSITION.TOP_RIGHT}),ae(),R.value=!1,o.reset(),o.products=[],D.value=!1,N.value="",y.value=!1},onError:()=>{a.error(o.errors.transaction_validation,{autoClose:1e3,transition:a.TRANSITIONS.FLIP,position:a.POSITION.TOP_RIGHT})}}))},se=()=>{document.querySelector("#prodBarcodeInput").focus(),a.success("Scanner is ready!",{autoClose:1e3,transition:a.TRANSITIONS.FLIP,position:a.POSITION.TOP_RIGHT}),S.value=""},oe=()=>{document.querySelector("#prodBarcodeInput").blur(),a.success("Scanner is disconnected!",{autoClose:1e3,transition:a.TRANSITIONS.FLIP,position:a.POSITION.TOP_RIGHT}),S.value=""},le=()=>{document.querySelector("#prodBarcodeInput").blur(),document.querySelector("#inputCash").focus()},E=(s,t)=>{s?I.value++:t&&I.value!=1&&I.value--};_e("barcode",o);const ae=()=>{var s=document.createElement("iframe");s.style.display="none",document.body.appendChild(s);var t=document.getElementById("toPrint").cloneNode(!0),l=s.contentWindow.document;l.open(),l.appendChild(t),l.close(),s.contentWindow.print(),document.body.removeChild(s)},ne=()=>{o.print_status=!0,o.print_show=!1,H()},ie=(s,t)=>{const l="…";var c,P;return s.length<=t?s:(c=Math.ceil(t/2),P=s.length-Math.floor(t/2)+1,s.substr(0,c)+l+s.substring(P))},re=s=>{s>-1&&o.products.splice(s,1)},de=s=>{s>-1&&(o.products[s].cashier_quantity+=1)},ce=s=>{s>-1&&(o.products[s].cashier_quantity==1?a.error("Selected item cannot be zero!",{autoClose:1e3,transition:a.TRANSITIONS.FLIP,position:a.POSITION.TOP_RIGHT}):o.products[s].cashier_quantity-=1)};return(s,t)=>(m(),h(L,null,[x(i(ve),{title:"Cashier"}),e("div",it,[e("div",rt,[K(e("input",{id:"prodBarcodeInput","onUpdate:modelValue":t[0]||(t[0]=l=>S.value=l),onChange:G},null,544),[[V,S.value]]),K(e("input",{type:"number",class:"border-0 bg-transparent w-11","onUpdate:modelValue":t[1]||(t[1]=l=>I.value=l)},null,512),[[V,I.value]])]),e("div",dt,[e("div",ct,[x(i(ge),{href:s.route("cashier.index"),class:"font-semibold text-gray-600 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"},{default:k(()=>[f(" Dashboard ")]),_:1},8,["href"])])]),e("div",ut,[e("kbd",pt,"Purchase Quantity: "+n(I.value),1)]),e("div",mt,[e("p",ht,[ft,e("span",_t,n(S.value),1)])]),e("div",vt,[e("p",gt,[xt,e("span",yt,n(i(o).products.length==0?r(0):r($(C(g.value,d.value==!0?v.special_discount.discount:0).discountedPrice))),1)])]),e("div",bt,[e("div",wt,[e("div",Ct,[e("div",kt,[e("div",Tt,[N.value?(m(),h("img",{key:0,class:"object-contain h-48 w-96",src:N.value},null,8,It)):j("",!0)])])]),e("div",St,[e("div",Pt,[e("div",Ot,[x(M,{icon:"shopping_cart",size:"sm"}),Nt,d.value?(m(),h("span",$t,[e("small",At,[x(M,{class:"text-white",size:"xs",icon:"wheelchair"}),f(" (Special Discount) ")])])):j("",!0)]),e("div",null,[Rt,e("span",Lt,[e("small",null,n(B.value),1)])])]),e("div",Dt,[e("table",Kt,[e("tbody",null,[(m(!0),h(L,null,F(O.value,l=>(m(),h("tr",Ft,[jt,Ht,Mt,e("td",Vt,[e("button",null,[x(M,{icon:"close_icon",size:"sm",class:"text-red"})])])]))),256))])]),i(o).products.length===0?(m(),h("div",Bt," Scan a product ")):(m(),h("div",qt,[e("div",zt,[(m(!0),h(L,null,F(i(o).products,(l,c)=>(m(),h("ul",{role:"addedlist",key:c,class:"divide-y divide-gray-200"},[e("li",Ut,[e("div",Gt,[e("div",Et,[e("img",{class:"w-8 h-8 rounded-full",src:l.product_image,alt:"Neil image"},null,8,Yt)]),e("div",Wt,[e("p",Zt,n(l.name),1)]),e("div",Qt,n(r(l.current_price.price)),1),e("div",Jt,[e("a",{class:"bg-red-400 text-white hover:bg-red-500 cursor-pointer rounded-l-lg p-1 mr-2",onClick:P=>ce(c)},"-",8,Xt),e("small",null,"x"+n(l.cashier_quantity),1),e("a",{class:"bg-green-400 text-white hover:bg-green-500 cursor-pointer rounded-r-lg p-1 ml-2",onClick:P=>de(c)},"+",8,es)]),e("div",ts,n(r(C(l.current_price.price,l.current_discount.discount).discountedPrice*l.cashier_quantity)),1),e("div",ss,[e("a",{class:"cursor-pointer",onClick:P=>re(c)},[x(M,{icon:"trash",size:"xs"})],8,os)])])])]))),128))])]))]),e("div",ls,[e("div",null,[e("p",null,[e("span",as,"VAT("+n(v.tax.tax)+"%): ",1),f(" "+n(i(o).products.length==0?r(0):r($(C(g.value,d.value==!0?v.special_discount.discount:0).discountedPrice)-C(g.value,d.value==!0?v.special_discount.discount:0).discountedPrice)),1)]),e("p",null,[e("span",ns,"Special Discount("+n(d.value==!0?v.special_discount.discount:0)+"%): ",1),f(" "+n(i(o).products.length==0?r(0):r(g.value-C(g.value,d.value==!0?v.special_discount.discount:0).discountedPrice)),1)]),e("p",null,[is,f(" "+n(i(o).products.length==0?r(0):r(g.value)),1)]),e("p",null,[rs,f(" "+n(i(o).products.length==0?r(0):r(C(g.value,d.value==!0?v.special_discount.discount:0).discountedPrice)),1)]),e("div",ds,[e("button",{onClick:t[2]||(t[2]=l=>y.value=!0),type:"button",class:"focus:outline-none text-white bg-yellow-600 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"}," Check out ")])])])])])])]),w.value?(m(),h("div",cs,[e("div",us,[e("div",ps,[e("div",ms,[hs,e("button",{onClick:t[3]||(t[3]=l=>w.value=!1),type:"button",class:"text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center","data-modal-hide":"defaultModal"},vs)]),gs,e("div",xs,[e("button",{onClick:t[4]||(t[4]=l=>(i(o).products=[],N.value="",w.value=!1)),"data-modal-hide":"defaultModal",type:"button",class:"text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"}," Delete All (CTRL + ALT + Y) "),e("button",{onClick:t[5]||(t[5]=l=>w.value=!1),"data-modal-hide":"defaultModal",type:"button",class:"text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"}," Decline (CTRL + ALT + N) ")])])])])):j("",!0),x(W,{show:y.value,onClose:t[11]||(t[11]=l=>y.value=!1),maxWidth:"2xl"},{title:k(()=>[f(" You are going to check out this trasaction, please input Amount cash. Payable amount is "+n(r($(C(g.value,d.value==!0?v.special_discount.discount:0).discountedPrice))),1)]),content:k(()=>[x(Se,{checked:R.value,"onUpdate:checked":t[6]||(t[6]=l=>R.value=l)},{default:k(()=>[f("Walk-in")]),_:1},8,["checked"]),x(Z,{id:"inputCustomerName",class:"rounded-lg w-full mb-2",type:"text",modelValue:i(o).customer_name,"onUpdate:modelValue":t[7]||(t[7]=l=>i(o).customer_name=l),autofocus:"",label:"Customer's Name",disabled:R.value==!0},null,8,["modelValue","disabled"]),x(Z,{id:"inputCustomerAddress",class:"rounded-lg w-full mb-2",type:"text",label:"Customer's Address",modelValue:i(o).customer_address,"onUpdate:modelValue":t[8]||(t[8]=l=>i(o).customer_address=l),disabled:R.value==!0},null,8,["modelValue","disabled"]),K(e("input",{id:"inputCash",class:"rounded-lg w-full mb-2",type:"number","onUpdate:modelValue":t[9]||(t[9]=l=>i(o).cash=l),onKeyup:xe(H,["enter"])},null,40,ys),[[V,i(o).cash]])]),footer:k(()=>[x(z,{onClick:t[10]||(t[10]=l=>y.value=!1),class:"mr-2"},{default:k(()=>[f(" Cancel (CTRL + ALT + N) ")]),_:1}),x(U,{class:q([{"opacity-25":i(o).processing},"bg-green-200 hover:bg-green-400"]),disabled:i(o).processing,onClick:H},{default:k(()=>[bs,f("   Proceed (CTRL + ALT + Y) ")]),_:1},8,["class","disabled"])]),_:1},8,["show"]),x(nt,{SKULookup:T.value,products:b.product},null,8,["SKULookup","products"]),x(W,{show:p.value,onClose:t[13]||(t[13]=l=>p.value=!1),maxWidth:"2xl"},{title:k(()=>[f(" Are you sure you want to log-out?")]),content:k(()=>[]),footer:k(()=>[x(z,{onClick:t[12]||(t[12]=l=>p.value=!1),class:"mr-2"},{default:k(()=>[f(" Cancel (CTRL + ALT + N) ")]),_:1}),x(U,{class:q([{"opacity-25":i(o).processing},"bg-green-200 hover:bg-green-400"]),disabled:i(o).processing,onClick:s.logout_confirm},{default:k(()=>[ws,f(" Proceed (CTRL + ALT + Y) ")]),_:1},8,["class","disabled","onClick"])]),_:1},8,["show"]),x(be,{show:D.value==!0,onClose:t[16]||(t[16]=l=>D.value=!1),maxWidth:"2xl"},{content:k(()=>[e("div",Cs,[e("div",ks,[e("table",Ts,[Is,e("tbody",Ss,[Ps,e("tr",null,[e("td",null,[e("small",null,"Date: "+n(i(Q)().format("MMMM Do YYYY")),1)])]),e("tr",null,[e("td",null,[e("small",null,"Time: "+n(i(Q)().format("h:mm:ss a")),1)])]),e("tr",null,[e("td",null,[e("small",null,"Cashier: "+n(i(ye)().props.auth.user.name),1)])]),Os,e("tr",null,[e("td",null,[Ns,e("small",null,n(i(o).customer_name),1)])]),e("tr",null,[e("td",null,[$s,e("small",As,n(i(o).customer_address),1)])]),Rs])]),e("table",Ls,[Ds,e("tbody",Ks,[(m(!0),h(L,null,F(i(o).products,(l,c)=>(m(),h("tr",{key:c},[e("td",null,[e("small",null,n(ie(l.name,18)),1)]),e("td",Fs,[e("small",js,n(l.cashier_quantity),1)]),e("td",Hs,[e("small",Ms,n(r(C(l.current_price.price,l.current_discount.discount).discountedPrice*l.cashier_quantity)),1)])]))),128))])]),e("table",Vs,[e("tbody",Bs,[qs,e("tr",null,[e("td",null,[e("small",null,"Special Discount("+n(b.special_discount.discount)+"%): "+n(i(o).products.length==0?r(0):r(g.value-C(g.value,d.value==!0?b.special_discount.discount:0).discountedPrice)),1)])]),e("tr",null,[e("td",null,[e("small",null,"VAT ("+n(b.tax.tax)+"%): "+n(i(o).products.length==0?r(0):r($(C(g.value,d.value==!0?v.special_discount.discount:0).discountedPrice)-C(g.value,d.value==!0?v.special_discount.discount:0).discountedPrice)),1)])]),e("tr",null,[e("td",null,[e("small",null," Subtotal (Excluding VAT): "+n(i(o).products.length==0?r(0):r(g.value)),1)])]),e("tr",null,[e("td",null,[e("small",null,"Subtotal Amount: "+n(i(o).products.length==0?r(0):r(C(g.value,d.value==!0?v.special_discount.discount:0).discountedPrice)),1)])]),zs])]),e("table",Us,[e("thead",null,[e("tr",Gs,[e("td",null,[e("small",null,"TOTAL AMOUNT: "+n(i(o).products.length==0?r(0):r($(C(g.value,d.value==!0?v.special_discount.discount:0).discountedPrice))),1)])]),e("tr",Es,[e("td",null,[e("small",null,"CASH: "+n(r(i(o).cash)),1)])]),e("tr",Ys,[e("td",null,[e("small",null,"CHANGE: "+n(r(i(o).cash-(i(o).products.length==0?0:$(C(g.value,d.value==!0?v.special_discount.discount:0).discountedPrice)))),1)])])]),e("tbody",Ws,[Zs,Qs,e("tr",null,[e("td",null,[x(we,{code:b.code,style:{width:"60vmin",height:"35vmin"}},null,8,["code"])])]),Js])])]),e("div",Xs,[e("div",eo,[e("p",to,[f("Money Rendered: "),e("span",so,n(r(i(o).cash)),1)])]),e("div",oo,[e("p",lo,[f("Change: "),e("span",ao,n(r(i(o).cash-(i(o).products.length==0?0:$(C(g.value,d.value==!0?v.special_discount.discount:0).discountedPrice)))),1)])]),e("div",no,[e("p",io,[f("Customer name: "),e("span",ro,n(i(o).customer_name),1)])]),e("div",co,[e("p",uo,[f("Customer Address: "),e("span",po,n(i(o).customer_address),1)])])])])]),footer:k(()=>[x(z,{onClick:t[14]||(t[14]=l=>D.value=!1),class:"mr-2"},{default:k(()=>[f(" Cancel (CTRL + ALT + N) ")]),_:1}),x(U,{class:q([{"opacity-25":i(o).processing},"bg-green-200 hover:bg-green-400"]),disabled:i(o).processing,onClick:t[15]||(t[15]=l=>ne())},{default:k(()=>[mo,f(" Proceed (CTRL + ALT + Y) ")]),_:1},8,["class","disabled"])]),_:1},8,["show"])],64))}};export{So as default};