import{l as ye,o as h,d as v,j as D,m as be,a as e,q as we,r as u,y as ne,v as q,F as j,g as E,f as p,t as n,e as K,x as Z,T as Te,O as k,i as ee,z as Ce,b as g,u as i,w as b,Z as Ie,k as ke,s as te,n as U,K as Se}from"./app-2fe710aa.js";import{_ as W}from"./Icon-853350b0.js";import{_ as se}from"./ConfirmationModal-55ce303f.js";import{_ as oe}from"./DialogModal-b4da59e0.js";import{_ as Y}from"./SecondaryButton-7a6c4b39.js";import{_ as le}from"./Input-27e9f7e5.js";import{_ as G}from"./Button-313963a4.js";import Pe from"./Barcode-f27b1b08.js";import{h as ae}from"./moment-fbc5633a.js";import{l}from"./index-116dcf65.js";import"./Modal-a8c5370d.js";import"./BarcodeSVG-15eda050.js";const Oe={class:"inline-flex relative items-center mb-2 cursor-pointer"},Ne=["value"],Re=e("div",{class:"w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"},null,-1),Ae={class:"ml-2 text-sm font-medium text-gray-900"},Le={__name:"Switch",props:{checked:{type:[Array,Boolean],default:!1},value:{type:String,default:null}},emits:["update:checked"],setup(x,{emit:C}){const O=x,r=ye({get(){return O.checked},set(w){C("update:checked",w)}});return(w,m)=>(h(),v("label",Oe,[D(e("input",{type:"checkbox",class:"sr-only peer",value:x.value,"onUpdate:modelValue":m[0]||(m[0]=R=>r.value=R)},null,8,Ne),[[be,r.value]]),Re,e("span",Ae,[we(w.$slots,"default")])]))}},$e={key:0,id:"defaultModal",tabindex:"-1","aria-hidden":"true",class:"fixed top-0 left-0 right-0 backdrop-blur-sm z-50 pt-52 flex justify-center item-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"},Fe={class:"relative w-full max-w-3xl max-h-full"},De={class:"relative bg-white rounded-lg shadow"},Ke=e("div",{class:"flex items-start justify-between p-4 border-b rounded-t"},[e("h3",{class:"text-xl font-semibold text-gray-900"}," Look Up ")],-1),He={class:"p-6 space-y-6"},qe={class:"max-h-md"},je={key:0,role:"status",class:"space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"},Ve=Z('<div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96"><svg class="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18"><path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"></path></svg></div><div class="w-full"><div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div><div class="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div><div class="h-2 bg-gray-200 rounded-full mb-2.5"></div><div class="h-2 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div><div class="h-2 bg-gray-200 rounded-full max-w-[460px] mb-2.5"></div><div class="h-2 bg-gray-200 rounded-full max-w-[360px]"></div></div><span class="sr-only">Loading...</span>',3),Be=[Ve],Me={key:1,role:"status",class:"space-y-1 md:space-y-0 md:space-x-1 md:flex md:items-center"},Ge=["onClick"],Ee=["src"],ze=e("br",null,null,-1),Ue={class:"flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b"},We={key:0,role:"status",class:"space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"},Ye=Z('<div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96"><svg class="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18"><path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"></path></svg></div><div class="w-full"><div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div><div class="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div><div class="h-2 bg-gray-200 rounded-full mb-2.5"></div><div class="h-2 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div><div class="h-2 bg-gray-200 rounded-full max-w-[460px] mb-2.5"></div><div class="h-2 bg-gray-200 rounded-full max-w-[360px]"></div></div><span class="sr-only">Loading...</span>',3),Ze=[Ye],Je={key:1,class:"flex flex-col justify-center"},Qe={class:"relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white"},Xe={class:"w-full md:w-1/3 bg-white grid place-items-center"},et=["src"],tt={class:"w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3"},st={class:"flex justify-between item-center"},ot={class:"text-gray-500 font-medium hidden md:block"},lt={class:"flex gap-1"},at={class:"bg-red-500 px-3 py-1 rounded-full text-xs font-medium text-white"},nt={class:"font-black text-gray-800 md:text-3xl text-xl"},it={class:"md:text-lg text-gray-500 text-base"},rt=e("p",{class:"md:text-lg text-gray-500 text-base"},[e("strong",null,"Details:")],-1),dt={class:"md:text-lg text-gray-500 text-base"},ct={class:"md:text-lg text-orange-800 text-base"},ut={class:"text-xl flex justify-end font-black text-gray-800"},pt={__name:"SKU",props:["SKULookup","products"],setup(x){const C=x,O=u("");u([{name:"AF1",imgSrc:"https://th.bing.com/th/id/OIP.gskj3fuAc3TMy9_NLV4-swHaJ4?pid=ImgDet&rs=1",price:2e3},{name:"kobe IV",imgSrc:"https://th.bing.com/th/id/R.c0b464ee5bf466b0774fd958cd49d671?rik=4BKsxct35mNq%2fg&riu=http%3a%2f%2fcontents.spin.ph%2fimage%2fresize%2fimage%2f2019%2f02%2f23%2fnike-kobe-iv-protro-1550916244.webp&ehk=HWW%2b6sYFBuz%2fZMO%2b2yAwK5n%2fujbgm5fG%2fEBuFgcVPyU%3d&risl=&pid=ImgRaw&r=0",price:3e3},{name:"SB freedy",imgSrc:"https://th.bing.com/th/id/OIP.PpVn4AnJf178qD-1dZGs5AHaEc?pid=ImgDet&rs=1",price:2300},{name:"J1 blacktoe",imgSrc:"https://sneakernews.com/wp-content/uploads/2019/02/air-jordan-1-low-black-toe-553558-116-2.jpg",price:2023}]);const r=u({name:"",imgSrc:"",price:null}),w=m=>{r.value=m,console.log(r.value)};return ne(()=>{r.value=""}),(m,R)=>C.SKULookup?(h(),v("div",$e,[e("div",Fe,[e("div",De,[Ke,e("div",He,[D(e("input",{type:"text","onUpdate:modelValue":R[0]||(R[0]=f=>O.value=f),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",placeholder:"SKU Lookup"},null,512),[[q,O.value]]),e("div",qe,[O.value?(h(),v("div",Me,[(h(!0),v(j,null,E(C.products,f=>(h(),v("div",null,[f.name.toLocaleLowerCase().includes(O.value.toLocaleLowerCase())?(h(),v("button",{key:0,type:"button",onClick:S=>w(f),class:"inline-flex items-center px-1 py-1 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 overflow-hidden"},[e("img",{src:f.product_image,class:"max-w-2xl w-10 rounded-lg mr-2 object-contain max-h-auto h-10"},null,8,Ee),p(" "+n(f.name),1),ze,p("₱ "+n(f.current_price.price),1)],8,Ge)):K("",!0)]))),256))])):(h(),v("div",je,Be))])]),e("div",Ue,[r.value.name?(h(),v("div",Je,[e("div",Qe,[e("div",Xe,[e("img",{src:r.value.product_image,alt:"tailwind logo",class:"rounded-xl"},null,8,et)]),e("div",tt,[e("div",st,[e("p",ot,"Stocks: "+n(r.value.quantity),1),e("div",lt,[e("div",at,n(r.value.current_discount.discount)+"% Discount",1)])]),e("h3",nt,n(r.value.name),1),e("p",it,[e("strong",null,"Barcode:"+n(r.value.barcode),1)]),rt,e("p",dt,n(r.value.description.details),1),e("p",ct,[e("strong",null,n(r.value.description.specification.spec_title),1)]),(h(!0),v(j,null,E(r.value.description.specification.spec_details,f=>(h(),v("p",null,[e("strong",null,n(f.spec_name)+": ",1),p(" "+n(f.spec_details),1)]))),256)),e("div",ut," ₱ "+n(r.value.current_price.price),1)])])])):(h(),v("div",We,Ze))])])])])):K("",!0)}};const mt={class:"py-5 relative"},_t={class:"fixed m-[50%] z-[-1000]"},ht={class:"-mt-4 flex justify-between"},vt={class:"ml-2"},ft={class:"flex max-w-7xl"},gt={class:"text-2xl text-gray-800"},xt=e("span",{class:"font-bold"},"Barcode:",-1),yt={class:"text-3xl font-bold animate-ping"},bt={class:"flex max-w-7xl mx-auto"},wt={class:"text-3xl text-gray-800"},Tt=e("span",{class:"font-bold"},"Grand Total:",-1),Ct={class:"text-4xl font-bold"},It={class:"flex max-w-7xl mx-auto justify-end"},kt={class:"mr-4 mt-2"},St={class:"flex max-w-7xl mt-"},Pt={class:"px-2 py-1.5 text-xl font-semibold text-white bg-yellow-700 border rounded-lg"},Ot={class:"justify-end flex"},Nt={class:"max-w-7xl mx-auto bg-white rounded mt-1 px-1"},Rt={class:"grid grid-cols-12 gap-2"},At={class:"col-span-5 p-5"},Lt={class:"product_list bg-gray-50 p-1 rounded-lg mt-3 min-h-[50vmin] overflow-auto"},$t={class:"mt-10 flex max-w-lg mx-auto max-h-lg justify-center"},Ft=["src"],Dt={class:"col-span-7 text-xs"},Kt={class:"bg-white rounded-b-xl shadow-md p-5 flex justify-between max-h-[63vmin]"},Ht={class:"flex"},qt=e("span",{class:"font-bold"},"Cart",-1),jt={key:0},Vt={class:"italic ml-1 text-white flex bg-red-600 p-1 rounded-lg"},Bt=e("span",{class:"font-bold"}," Items: ",-1),Mt={class:"bg-red-500 ml-1 px-2 text-white rounded-xl w-10 text-center"},Gt={class:"relative mt-5 px-2 overflow-x-auto min-h-[40vmin] shadow-md"},Et={key:0,class:"mx-auto text-center text-xs"},zt={key:1,class:"w-full"},Ut={class:"flow-root max-h-[50vmin] overflow-auto p-2",id:"addedCartScrll"},Wt={class:"py-3 sm:py-4"},Yt={class:"flex items-center space-x-4"},Zt={class:"flex-shrink-0"},Jt=["src"],Qt={class:"flex-1 min-w-0"},Xt={class:"text-sm font-medium text-gray-900 truncate"},es={class:"flex justify-between"},ts={class:"flex gap-4"},ss={class:"inline-flex items-center text-base font-semibold text-gray-900 text-xs"},os={class:"inline-flex items-center text-base font-semibold text-gray-900"},ls=["onClick"],as=["onClick"],ns={class:"inline-flex items-center text-base font-semibold text-gray-900 text-xs"},is={class:"inline-flex items-center text-base font-semibold text-gray-900 text-xs bg-red-400 text-white p-2 rounded-lg hover:bg-red-500"},rs=["onClick"],ds={class:"item-center p-5"},cs={class:"font-bold"},us={class:"font-bold"},ps=e("span",{class:"font-bold"},"Sub-Total (Excluding VAT):",-1),ms=e("span",{class:"font-bold"},"Sub-Total:",-1),_s=Z('<div class="fixed bottom-0 text-center text-xs mb-2 w-full"><div class="grid grid-cols-12 gap-2 text-center bg-gray-200 p-2"><div class="col-span-2"><p><strong>CTRL + B</strong><span class="text-xs"> - Scanner Ready</span></p><p><strong>INSERT</strong> - Input Barcode or Product name </p></div><div class="col-span-2"><p><strong>CTRL + Shift + F</strong> - Open/Close search product </p></div><div class="col-span-2"><p><strong>CTRL + Arrow up</strong> - Add quantity to purchase </p><p><strong>CTRL + Arrow down</strong> - Deduct quantity to purchase </p></div><div class="col-span-2"><p><strong>END</strong> - Check out </p></div><div class="col-span-2"><p><strong>CTRL + D</strong> - Add/Remove Special Discount </p></div><div class="col-span-2"><p><strong>DELETE</strong> - Delete all scanned items </p></div></div></div>',1),hs={key:0,id:"defaultModal",tabindex:"-1","aria-hidden":"true",class:"fixed top-0 left-0 right-0 backdrop-blur-sm z-50 pt-52 flex justify-center item-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"},vs={class:"relative w-full max-w-2xl max-h-full"},fs={class:"relative bg-white rounded-lg shadow"},gs={class:"flex items-start justify-between p-4 border-b rounded-t"},xs=e("h3",{class:"text-xl font-semibold text-gray-900"},"Delete All?",-1),ys=e("svg",{class:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14"},[e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})],-1),bs=e("span",{class:"sr-only"},"Close modal",-1),ws=[ys,bs],Ts=e("div",{class:"p-6 space-y-6"},[e("p",{class:"text-base leading-relaxed text-gray-500"}," Are you sure you want to delete all transactions? ")],-1),Cs={class:"flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b"},Is=["onKeyup"],ks=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-auto",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),Ss=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-auto",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),Ps={class:"flex gap-2"},Os=e("span",{title:"Clear Search",class:"bg-red-400 rounded-lg m-2 p-2"},"x",-1),Ns={class:"h-[50vmin] overflow-auto mt-2"},Rs={key:0,class:"flex justify-between"},As={class:"flex"},Ls=["src"],$s={class:"w-full truncate"},Fs={key:1},Ds=e("p",null,"No Search found!",-1),Ks=[Ds],Hs=e("div",{class:"flex justify-between gap-2 text-xs text-center"},[e("p",null,[e("strong",null,"CTRL + ALT + F "),p(" - Focus Search box ")]),e("p",null,[e("strong",null,"CTRL + Enter "),p(" - Add searched product ")]),e("p",null,[e("strong",null,"ESC"),p(" - Close input Barcode and Product name ")])],-1),qs={class:"text-justify overflow-auto p-3 relative"},js={id:"toPrint",class:"text-justify overflow-auto p-3 relative border bg-white flex-wrap hidden"},Vs={class:""},Bs=e("thead",null,[e("tr",{class:"border mb-2"},[e("th",null,[e("small",null,"CRISBODS HARDWARE AND CONSTRUCTION SUPPLY")])]),e("tr",{class:"border mb-2"},[e("th",null,[e("small",{style:{"font-size":"10px"}},"Dologon, Busco, Quezon Rd., Maramag, Bukidnon, 8714")])])],-1),Ms={class:"border"},Gs=e("tr",null,[e("td",null,[e("small",null,"TIN: 487-279-975-00001")])],-1),Es=e("tr",null,[e("td",null,[e("small",{style:{"font-size":"10px"}},"*************************************")])],-1),zs=e("small",null,"Customer Name:",-1),Us=e("small",null,"Customer Address:",-1),Ws={style:{"font-size":"10px"}},Ys=e("tr",null,[e("td",null,[e("small",{style:{"font-size":"10px"}},"*************************************")])],-1),Zs={class:""},Js=e("thead",null,[e("tr",{class:"border mb-2"},[e("th",null,[e("small",null,"Retail")]),e("th",null,[e("small",null,"TOTAL")])])],-1),Qs={class:"border"},Xs=e("br",null,null,-1),eo={style:{"font-size":"10px","word-break":"break-all"}},to={style:{width:"60px"}},so={id:"totalPrice",style:{"font-size":"10px !important","word-break":"break-all"}},oo={class:""},lo={class:"border"},ao=e("tr",null,[e("td",null,[e("small",{style:{"font-size":"10px"}},"*************************************")])],-1),no=e("tr",null,[e("td",null,[e("small",{style:{"font-size":"10px"}},"*************************************")])],-1),io={class:""},ro={class:"border mb-2"},co={class:"border mb-2"},uo={class:"border mb-2"},po={class:"border"},mo=e("tr",null,[e("td",null,[e("small",{style:{"font-size":"10px"}},"*************************************")])],-1),_o=e("tr",null,[e("td",null,[e("small",null," This serve as an OFFICIAL RECEIPT "),e("small",null,"Thank You, Come Again")])],-1),ho=e("tr",null,[e("td",null,[e("small",{style:{"font-size":"10px"}},"*************************************")])],-1),vo={class:"grid grid-cols-12 gap-2"},fo={class:"col-span-full"},go={class:"text-2xl"},xo={class:"text-4xl font-bold"},yo={class:"col-span-full"},bo={class:"text-2xl"},wo={class:"text-4xl font-bold"},To={class:"col-span-full"},Co={class:"text-sm"},Io={class:"font-bold"},ko={class:"col-span-full"},So={class:"text-sm"},Po={class:"font-bold"},Oo=e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-auto",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),Bo={__name:"Cashier",props:["product","cashier_status","cashier_stat_id","tax","special_discount","code"],setup(x){const C=x;u(0),u(5),u(2),u(),u();const O=u(!1),r=u(!1),w=u(!1),m=u(!1),R=u(!1),f=u(""),S=u(""),T=u(1),z=u(0),y=u(0),H=u(!1),L=u(!1),$=u(""),_=u("");u(0),u(0),u(!1);const F=u(!1);u({exe:!1,pass:0});const o=Te({products:[],search:"",tax_id:C.tax.id,special_discount_id:m.value==!0?C.special_discount.id:null,cash:null,print_show:!1,print_status:!1,customer_name:"",customer_address:"",code_generator:""});ne(()=>{document.onkeydown=s=>{(s.key=="F12"||s.key==123)&&s.preventDefault(),(s.key=="F5"||s.key==116)&&s.preventDefault(),s.ctrlKey&&s.shiftKey&&s.key=="I"&&s.preventDefault(),s.ctrlKey&&s.shiftKey&&s.key=="C"&&s.preventDefault(),s.ctrlKey&&s.shiftKey&&s.key=="J"&&s.preventDefault(),s.ctrlKey&&s.key=="U"&&s.preventDefault()},document.addEventListener("contextmenu",s=>s.preventDefault()),ie()});const ie=s=>{C.cashier_status=="false"&&document.addEventListener("keydown",t=>{t.ctrlKey&&t.keyCode==68&&k.page.component=="Cashier/Cashier"?(console.log("Discount"),m.value=!m.value,m.value?l.success("Special discount has been applied!",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}):l.error("Special discount has been removed!",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}),t.preventDefault()):t.keyCode==46&&k.page.component=="Cashier/Cashier"?(R.value||(r.value=!r.value),t.preventDefault()):t.keyCode==45&&k.page.component=="Cashier/Cashier"?(L.value=!0,t.preventDefault()):t.ctrlKey&&t.shiftKey&&t.keyCode==70&&k.page.component=="Cashier/Cashier"?(console.log("SKU Look up"),r.value||(R.value=!R.value),t.preventDefault()):t.ctrlKey&&t.keyCode==66&&k.page.component=="Cashier/Cashier"?de():t.ctrlKey&&t.keyCode==38&&k.page.component=="Cashier/Cashier"?(Q(!0,!1),l.success("Added purchase quantity to "+T.value,{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT})):t.ctrlKey&&t.keyCode==40&&k.page.component=="Cashier/Cashier"?(Q(!1,!0),l.success("Minus purchase quantity to "+T.value,{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT})):L.value==!0&&t.ctrlKey&&t.keyCode==13?X():L.value==!0&&t.ctrlKey&&t.altKey&&t.keyCode==70?pe():t.ctrlKey&&t.keyCode==13&&k.page.component=="Cashier/Cashier"?J():t.keyCode==35&&k.page.component=="Cashier/Cashier"?(ce(),w.value=!w.value):w.value==!0&&t.ctrlKey&&t.altKey&&t.keyCode==70&&k.page.component=="Cashier/Cashier"?ue():w.value==!0&&t.ctrlKey&&t.altKey&&t.keyCode==89&&k.page.component=="Cashier/Cashier"?V():w.value==!0&&t.ctrlKey&&t.altKey&&t.keyCode==78&&k.page.component=="Cashier/Cashier"?w.value=!w.value:r.value==!0&&t.ctrlKey&&t.altKey&&t.keyCode==89&&k.page.component=="Cashier/Cashier"?(o.products=[],S.value="",r.value=!1):r.value==!0&&t.ctrlKey&&t.altKey&&t.keyCode==78&&k.page.component=="Cashier/Cashier"&&(r.value=!1)}),re()};ee(()=>o.products,(s,t)=>{let a=0,c=0,P=0;s.forEach(N=>{y.value=0,z.value=0,P=0,a=a+N.cashier_quantity,P=I(N.current_price.price,N.current_discount.discount).discountedPrice*N.cashier_quantity,c=c+P}),z.value=a,y.value=c},{deep:!0}),ee(()=>F.value,s=>{s==!0&&(o.customer_name="Walk-in Customer",o.customer_address="Walk-in Customer")},{deep:!0});const I=(s,t)=>{if(t<0||t>100)return s;const a=s-s*(t/100);return{...s,discountedPrice:a.toFixed(2)}},A=s=>{let t=0,a=0,c=C.tax.tax/100;return a=parseFloat(s)*c,t=parseFloat(s)+a,t},J=()=>{let s=C.product.find(t=>t.barcode==f.value);if(s==null)l.error("Product not available!",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}),f.value="",T.value=1;else if(s!=null)if(s.quantity<=0)l.error("Product is out of stock!",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}),f.value="",T.value=1;else{let t=o.products.find(c=>c.barcode==s.barcode),a=o.products.findIndex(c=>c.barcode==s.barcode);if(t==null)s.cashier_quantity=T.value,o.products.push(s),S.value=s.product_image,l.success("Product added to cart!",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}),f.value="",T.value=1;else{let c=o.products[a].cashier_quantity+T.value;o.products[a].cashier_quantity=c,S.value=s.product_image,S.value=s.product_image,l.success("Product added to cart!",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}),f.value="",T.value=1}}},d=s=>{let c=new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP",minimumFractionDigits:2,maximumFractionDigits:20,minimumSignificantDigits:1,maximumSignificantDigits:20}).format(s).split("."),N=String(c[1]).slice(0,2),B=N=="un"?"00":N;return String(c[0])+"."+B},re=()=>{k.put(route("cashier_stat.update_status",C.cashier_stat_id))},V=()=>{let s=A(I(y.value,m.value==!0?C.special_discount.discount:0).discountedPrice);parseFloat(o.cash)<parseFloat(s)?l.error("Inputed cash is insuficient",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}):parseFloat(o.cash)==0||o.cash==""||o.cash==null?l.error("Please input cash first to proceed!",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}):o.products.length<=0?l.error("Opps looks like there's no products in the cart, please add them first!",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}):o.customer_name==""||o.customer_name==null?l.error("Please input customer's name before can proceed",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}):o.customer_address==""||o.customer_address==null?l.error("Please input customer's address before can proceed",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}):(w.value=!1,H.value=!0,o.print_status==!0&&o.post(route("cashier.store"),{preserveScroll:!0,onSuccess:()=>{l.success("Print print",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}),me(),F.value=!1,o.reset(),o.products=[],H.value=!1,S.value="",w.value=!1},onError:()=>{l.error(o.errors.transaction_validation,{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT})}}))},de=()=>{document.querySelector("#prodBarcodeInput").focus(),l.success("Scanner is ready!",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}),f.value=""},ce=()=>{document.querySelector("#prodBarcodeInput").blur(),l.success("Scanner is disconnected!",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}),f.value=""},ue=()=>{document.querySelector("#prodBarcodeInput").blur(),document.querySelector("#inputCash").focus()},pe=()=>{document.querySelector("#prodBarcodeInput").blur(),document.querySelector("#search_input_product_barcode").focus()},Q=(s,t)=>{s?T.value++:t&&T.value!=1&&T.value--};Ce("barcode",o);const me=()=>{var s=document.createElement("iframe");s.style.display="none",document.body.appendChild(s);var t=document.getElementById("toPrint").cloneNode(!0),a=s.contentWindow.document;a.open(),a.appendChild(t),a.close(),s.contentWindow.print(),document.body.removeChild(s)},_e=()=>{o.print_status=!0,o.print_show=!1,V()},he=(s,t)=>{const a="…";var c,P;return s.length<=t?s:(c=Math.ceil(t/2),P=s.length-Math.floor(t/2)+1,s.substr(0,c)+a+s.substring(P))},ve=s=>{s>-1&&o.products.splice(s,1),S.value=""},fe=s=>{s>-1&&(o.products[s].cashier_quantity+=1)},ge=s=>{s>-1&&(o.products[s].cashier_quantity==1?l.error("Selected item cannot be zero!",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}):o.products[s].cashier_quantity-=1)},xe=()=>{console.log(_!=null||_!="");let s=C.product.find(t=>t.barcode===$.value||t.name.toLowerCase()===$.value.toLowerCase());_.value=s},X=()=>{if(_.value==""&&_.value==null)l.error("No search found!",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT});else if(_.value.quantity<=0)l.error("Product is out of stock!",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}),$.value="",T.value=1;else{let s=o.products.find(a=>a.barcode==_.value.barcode),t=o.products.findIndex(a=>a.barcode==_.value.barcode);if(s==null)_.value.cashier_quantity=T.value,o.products.push(_.value),S.value=_.value.product_image,l.success("Product added to cart!",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}),$.value="",T.value=1,L.value=!1,_.value="";else{let a=o.products[t].cashier_quantity+T.value;o.products[t].cashier_quantity=a,S.value=_.value.product_image,S.value=_.value.product_image,l.success("Product added to cart!",{autoClose:1e3,transition:l.TRANSITIONS.FLIP,position:l.POSITION.TOP_RIGHT}),$.value="",T.value=1,L.value=!1,_.value=""}}};return(s,t)=>(h(),v(j,null,[g(i(Ie),{title:"Cashier"}),e("div",mt,[e("div",_t,[D(e("input",{id:"prodBarcodeInput","onUpdate:modelValue":t[0]||(t[0]=a=>f.value=a),onChange:J},null,544),[[q,f.value]]),D(e("input",{type:"number",class:"border-0 bg-transparent w-11","onUpdate:modelValue":t[1]||(t[1]=a=>T.value=a)},null,512),[[q,T.value]])]),e("div",ht,[e("div",vt,[e("div",ft,[e("p",gt,[xt,e("span",yt,n(f.value),1)])]),e("div",bt,[e("p",wt,[Tt,e("span",Ct,n(i(o).products.length==0?d(0):d(A(I(y.value,m.value==!0?x.special_discount.discount:0).discountedPrice))),1)])])]),e("div",null,[e("div",It,[e("div",kt,[g(i(ke),{href:s.route("cashier.index"),class:"font-semibold text-gray-600 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"},{default:b(()=>[p(" Dashboard ")]),_:1},8,["href"])])]),e("div",St,[e("kbd",Pt,"Purchase Quantity: "+n(T.value),1)]),e("div",Ot,[e("button",{onClick:t[2]||(t[2]=a=>w.value=!0),type:"button",class:"focus:outline-none text-white bg-yellow-600 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"}," Check out ")])])]),e("div",Nt,[e("div",Rt,[e("div",At,[e("div",Lt,[e("div",$t,[S.value?(h(),v("img",{key:0,class:"object-scale-down w-[35vmin] h-[35vmin]",src:S.value},null,8,Ft)):K("",!0)])])]),e("div",Dt,[e("div",Kt,[e("div",Ht,[g(W,{icon:"shopping_cart",size:"sm"}),qt,m.value?(h(),v("span",jt,[e("small",Vt,[g(W,{class:"text-white",size:"xs",icon:"wheelchair"}),p(" (Special Discount) ")])])):K("",!0)]),e("div",null,[Bt,e("span",Mt,[e("small",null,n(z.value),1)])])]),e("div",Gt,[i(o).products.length===0?(h(),v("div",Et," Scan a product ")):(h(),v("div",zt,[e("div",Ut,[(h(!0),v(j,null,E(i(o).products,(a,c)=>(h(),v("ul",{role:"addedlist",key:c,class:"divide-y divide-gray-200"},[e("li",Wt,[e("div",Yt,[e("div",Zt,[e("img",{class:"w-8 h-8 rounded-full",src:a.product_image,alt:"Neil image"},null,8,Jt)]),e("div",Qt,[e("p",Xt,n(a.name),1),e("div",es,[e("div",ts,[e("div",ss,n(d(a.current_price.price)),1),e("div",os,[e("a",{class:"bg-red-400 text-white hover:bg-red-500 cursor-pointer rounded-l-lg p-1 mr-2",onClick:P=>ge(c)},"-",8,ls),e("small",null,"x"+n(a.cashier_quantity),1),e("a",{class:"bg-green-400 text-white hover:bg-green-500 cursor-pointer rounded-r-lg p-1 ml-2",onClick:P=>fe(c)},"+",8,as)])]),e("div",ns,n(d(I(a.current_price.price,a.current_discount.discount).discountedPrice*a.cashier_quantity)),1)])]),e("div",is,[e("a",{class:"cursor-pointer",onClick:P=>ve(c)},[g(W,{icon:"trash",size:"xs"})],8,rs)])])])]))),128))])]))]),e("div",ds,[e("div",null,[e("p",null,[e("span",cs,"VAT("+n(x.tax.tax)+"%): ",1),p(" "+n(i(o).products.length==0?d(0):d(A(I(y.value,m.value==!0?x.special_discount.discount:0).discountedPrice)-I(y.value,m.value==!0?x.special_discount.discount:0).discountedPrice)),1)]),e("p",null,[e("span",us,"Special Discount("+n(m.value==!0?x.special_discount.discount:0)+"%): ",1),p(" "+n(i(o).products.length==0?d(0):d(y.value-I(y.value,m.value==!0?x.special_discount.discount:0).discountedPrice)),1)]),e("p",null,[ps,p(" "+n(i(o).products.length==0?d(0):d(y.value)),1)]),e("p",null,[ms,p(" "+n(i(o).products.length==0?d(0):d(I(y.value,m.value==!0?x.special_discount.discount:0).discountedPrice)),1)])])])])])]),_s]),r.value?(h(),v("div",hs,[e("div",vs,[e("div",fs,[e("div",gs,[xs,e("button",{onClick:t[3]||(t[3]=a=>r.value=!1),type:"button",class:"text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center","data-modal-hide":"defaultModal"},ws)]),Ts,e("div",Cs,[e("button",{onClick:t[4]||(t[4]=a=>(i(o).products=[],S.value="",r.value=!1)),"data-modal-hide":"defaultModal",type:"button",class:"text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"}," Delete All (CTRL + ALT + Y) "),e("button",{onClick:t[5]||(t[5]=a=>r.value=!1),"data-modal-hide":"defaultModal",type:"button",class:"text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"}," Decline (CTRL + ALT + N) ")])])])])):K("",!0),g(se,{show:w.value,onClose:t[11]||(t[11]=a=>w.value=!1),maxWidth:"2xl"},{title:b(()=>[p(" You are going to check out this trasaction, please input Amount cash. Payable amount is "+n(d(A(I(y.value,m.value==!0?x.special_discount.discount:0).discountedPrice))),1)]),content:b(()=>[g(Le,{checked:F.value,"onUpdate:checked":t[6]||(t[6]=a=>F.value=a)},{default:b(()=>[p("Walk-in")]),_:1},8,["checked"]),g(le,{id:"inputCustomerName",class:"rounded-lg w-full mb-2",type:"text",modelValue:i(o).customer_name,"onUpdate:modelValue":t[7]||(t[7]=a=>i(o).customer_name=a),autofocus:"",label:"Customer's Name",disabled:F.value==!0},null,8,["modelValue","disabled"]),g(le,{id:"inputCustomerAddress",class:"rounded-lg w-full mb-2",type:"text",label:"Customer's Address",modelValue:i(o).customer_address,"onUpdate:modelValue":t[8]||(t[8]=a=>i(o).customer_address=a),disabled:F.value==!0},null,8,["modelValue","disabled"]),D(e("input",{id:"inputCash",class:"rounded-lg w-full mb-2",type:"number","onUpdate:modelValue":t[9]||(t[9]=a=>i(o).cash=a),onKeyup:te(V,["enter"])},null,40,Is),[[q,i(o).cash]])]),footer:b(()=>[g(Y,{onClick:t[10]||(t[10]=a=>w.value=!1),class:"mr-2"},{default:b(()=>[p(" Cancel (CTRL + ALT + N) ")]),_:1}),g(G,{class:U([{"opacity-25":i(o).processing},"bg-green-200 hover:bg-green-400"]),disabled:i(o).processing,onClick:V},{default:b(()=>[ks,p("   Proceed (CTRL + ALT + Y) ")]),_:1},8,["class","disabled"])]),_:1},8,["show"]),g(pt,{SKULookup:R.value,products:C.product},null,8,["SKULookup","products"]),g(se,{show:O.value,onClose:t[13]||(t[13]=a=>O.value=!1),maxWidth:"2xl"},{title:b(()=>[p(" Are you sure you want to log-out?")]),content:b(()=>[]),footer:b(()=>[g(Y,{onClick:t[12]||(t[12]=a=>O.value=!1),class:"mr-2"},{default:b(()=>[p(" Cancel (CTRL + ALT + N) ")]),_:1}),g(G,{class:U([{"opacity-25":i(o).processing},"bg-green-200 hover:bg-green-400"]),disabled:i(o).processing,onClick:s.logout_confirm},{default:b(()=>[Ss,p(" Proceed (CTRL + ALT + Y) ")]),_:1},8,["class","disabled","onClick"])]),_:1},8,["show"]),g(oe,{show:L.value==!0,onClose:t[17]||(t[17]=a=>L.value=!1),maxWidth:"2xl"},{title:b(()=>[p(" Find product ")]),content:b(()=>{var a,c,P,N,B;return[e("div",Ps,[D(e("input",{class:"rounded-lg w-full mb-2",type:"text","onUpdate:modelValue":t[14]||(t[14]=M=>$.value=M),id:"search_input_product_barcode",onKeydown:t[15]||(t[15]=te(M=>xe(),["enter"]))},null,544),[[q,$.value]]),Os]),e("div",Ns,[_.value!=""&&_.value!=null?(h(),v("div",Rs,[e("div",null,[e("div",As,[e("img",{src:(a=_.value)==null?void 0:a.product_image,class:"max-w-2xl w-10 rounded-lg mr-2 object-contain max-h-auto h-10"},null,8,Ls),e("p",$s,n((c=_.value)==null?void 0:c.name),1)]),e("p",null,"₱"+n((N=(P=_.value)==null?void 0:P.current_price)==null?void 0:N.price),1),e("p",null,"Qty: "+n((B=_.value)==null?void 0:B.quantity),1)]),e("div",null,[g(G,{onClick:t[16]||(t[16]=M=>X()),class:"text-lg"},{default:b(()=>[p("+")]),_:1})])])):_.value==""||_.value==null?(h(),v("div",Fs,Ks)):K("",!0)])]}),footer:b(()=>[Hs]),_:1},8,["show"]),g(oe,{show:H.value==!0,onClose:t[20]||(t[20]=a=>H.value=!1),maxWidth:"2xl"},{content:b(()=>[e("div",qs,[e("div",js,[e("table",Vs,[Bs,e("tbody",Ms,[Gs,e("tr",null,[e("td",null,[e("small",null,"Date: "+n(i(ae)().format("MMMM Do YYYY")),1)])]),e("tr",null,[e("td",null,[e("small",null,"Time: "+n(i(ae)().format("h:mm:ss a")),1)])]),e("tr",null,[e("td",null,[e("small",null,"Cashier: "+n(i(Se)().props.auth.user.name),1)])]),Es,e("tr",null,[e("td",null,[zs,e("small",null,n(i(o).customer_name),1)])]),e("tr",null,[e("td",null,[Us,e("small",Ws,n(i(o).customer_address),1)])]),Ys])]),e("table",Zs,[Js,e("tbody",Qs,[(h(!0),v(j,null,E(i(o).products,(a,c)=>(h(),v("tr",{key:c},[e("td",null,[e("small",null,n(he(a.name,25)),1),Xs,e("small",eo,n(a.cashier_quantity),1)]),e("td",to,[e("small",so,n(d(I(a.current_price.price,a.current_discount.discount).discountedPrice*a.cashier_quantity)),1)])]))),128))])]),e("table",oo,[e("tbody",lo,[ao,e("tr",null,[e("td",null,[e("small",null,"Special Discount("+n(C.special_discount.discount)+"%): "+n(i(o).products.length==0?d(0):d(y.value-I(y.value,m.value==!0?C.special_discount.discount:0).discountedPrice)),1)])]),e("tr",null,[e("td",null,[e("small",null,"VAT ("+n(C.tax.tax)+"%): "+n(i(o).products.length==0?d(0):d(A(I(y.value,m.value==!0?x.special_discount.discount:0).discountedPrice)-I(y.value,m.value==!0?x.special_discount.discount:0).discountedPrice)),1)])]),e("tr",null,[e("td",null,[e("small",null," Subtotal (Excluding VAT): "+n(i(o).products.length==0?d(0):d(y.value)),1)])]),e("tr",null,[e("td",null,[e("small",null,"Subtotal Amount: "+n(i(o).products.length==0?d(0):d(I(y.value,m.value==!0?x.special_discount.discount:0).discountedPrice)),1)])]),no])]),e("table",io,[e("thead",null,[e("tr",ro,[e("td",null,[e("small",null,"TOTAL AMOUNT: "+n(i(o).products.length==0?d(0):d(A(I(y.value,m.value==!0?x.special_discount.discount:0).discountedPrice))),1)])]),e("tr",co,[e("td",null,[e("small",null,"CASH: "+n(d(i(o).cash)),1)])]),e("tr",uo,[e("td",null,[e("small",null,"CHANGE: "+n(d(i(o).cash-(i(o).products.length==0?0:A(I(y.value,m.value==!0?x.special_discount.discount:0).discountedPrice)))),1)])])]),e("tbody",po,[mo,_o,e("tr",null,[e("td",null,[g(Pe,{code:C.code,style:{width:"60vmin",height:"35vmin"}},null,8,["code"])])]),ho])])]),e("div",vo,[e("div",fo,[e("p",go,[p("Money Rendered: "),e("span",xo,n(d(i(o).cash)),1)])]),e("div",yo,[e("p",bo,[p("Change: "),e("span",wo,n(d(i(o).cash-(i(o).products.length==0?0:A(I(y.value,m.value==!0?x.special_discount.discount:0).discountedPrice)))),1)])]),e("div",To,[e("p",Co,[p("Customer name: "),e("span",Io,n(i(o).customer_name),1)])]),e("div",ko,[e("p",So,[p("Customer Address: "),e("span",Po,n(i(o).customer_address),1)])])])])]),footer:b(()=>[g(Y,{onClick:t[18]||(t[18]=a=>H.value=!1),class:"mr-2"},{default:b(()=>[p(" Cancel (CTRL + ALT + N) ")]),_:1}),g(G,{class:U([{"opacity-25":i(o).processing},"bg-green-200 hover:bg-green-400"]),disabled:i(o).processing,onClick:t[19]||(t[19]=a=>_e())},{default:b(()=>[Oo,p(" Proceed (CTRL + ALT + Y) ")]),_:1},8,["class","disabled"])]),_:1},8,["show"])],64))}};export{Bo as default};
