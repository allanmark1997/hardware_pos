import{r as h,T as J,y as Q,d as n,a as s,F as I,g as O,b as a,t as c,w as u,o as d,e as v,f as m,u as o,n as R,j as K,G as X}from"./app-33456085.js";import{h as M}from"./moment-fbc5633a.js";import{_ as Z}from"./Pagination2-ac64f6eb.js";import{_ as F}from"./ConfirmationModal-40f2973a.js";import{_ as V}from"./SecondaryButton-6fde8c8e.js";import{_ as L}from"./Button-edbdb13c.js";import{_ as P}from"./InputError-8596ab87.js";import{_ as b}from"./Input-fcfaccfb.js";import{_ as H}from"./DialogModal-e138dcb4.js";import{_}from"./Icon-0bc4b434.js";import{l as i}from"./index-65c1f31e.js";import"./Modal-88305cf4.js";const ee={class:"text-gray-600 bg-white rounded-lg py-5 px-3 mb-5"},te={class:"container mx-auto"},se={class:"flex flex-wrap -m-4"},oe={key:0,class:"mx-auto"},le=s("h1",{class:"text-4xl font-bold mt-6"},"No products found!",-1),ae=[le],re={class:"h-full border-2 border-gray-100 shadow-md rounded-lg overflow-hidden group"},ie={class:"relative"},ne=["src","alt"],de=["alt"],ce={class:"absolute hidden group-hover:block top-0 right-0 text-white p-2 rounded"},ue=["onClick"],me=["onClick"],pe=["onClick"],_e=["onClick"],ge=s("div",{class:"flex justify-between -mt-5 relative"},null,-1),ve={class:"p-4"},fe={class:"title-font text-lg capitalize font-bold text-gray-900 mt-2"},he={key:0,class:"italic text-xs text-red-500"},be={class:"tracking-widest text-lg title-font font-bold text-gray-500"},ye={class:"text-xs text-green-400"},xe={class:"tracking-widest text-sm title-font font-bold text-yellow-500"},we={class:"flex gap-2"},ke={class:"leading-relaxed text-xs flex gap-2 mb-2"},Ce=["src","alt"],Se={class:"leading-relaxed text-xs flex gap-2 mb-2"},Ie=["src","alt"],Pe={class:"gap-1"},Te=["title"],Oe={class:"ml-1"},Ve=["title"],Ne={class:"ml-1"},$e={class:"flex items-center justify-between"},Re={class:"mt-6 text-sm text-gray-500"},Le=s("p",{class:"text-red-500"}," This action can update the system and this is not reversible! ",-1),ze=s("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-auto",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),je=s("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-auto",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),De={class:"grid grid-cols-5"},Me={id:"imageContent",class:"border-r border-yellow-500 col-span-2 p-2"},Fe=["src"],He={class:"text-gray-900 font-bold uppercase text-yellow-700 mt-5 mb-1"},Ge={class:"font-bold"},Ue={id:"textContent",class:"col-span-3 p-2"},Ae=s("span",{class:"font-bold mb-5 uppercase text-yellow-700"},[m(" Details:"),s("br")],-1),Be={style:{"white-space":"pre-line"},class:"text-gray-900 overflow-auto max-h-80"},qe={class:"grid grid-cols-12 gap-1"},Ye={class:"col-span-6"},Ee={class:"col-span-5"},We={key:0,class:"absolute z-50 w-60 bg-white rounded shadow"},Je={class:"overflow-y-auto py-1 h-[20vmin] text-gray-700","aria-labelledby":"dropdownUsersButton"},Qe=["onClick"],Ke=["src"],Xe=s("div",{class:"flex justify-center"},[s("small",null,"Results")],-1),Ze={class:"col-span-1 my-auto flex"},et={class:"col-span-6"},tt={class:"col-span-5"},st={key:0,class:"absolute z-50 w-60 bg-white rounded shadow"},ot={class:"overflow-y-auto py-1 h-[20vmin] text-gray-700","aria-labelledby":"dropdownUsersButton"},lt=["onClick"],at=["src"],rt=s("div",{class:"flex justify-center"},[s("small",null,"Results")],-1),it={class:"col-span-1 my-auto flex"},nt={class:"col-span-full"},dt={class:"col-span-12"},ct=s("option",{selected:"",value:""},"Choose a category",-1),ut=["value"],mt=s("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-auto",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})],-1),It={__name:"ProductList",props:["products","search","category","categories","product_lists","suppliers"],setup(f){const N=f,y=h(!1),x=h(!1),T=h(!1),w=h(!1),k=h(!1),C=h(!1),g=h({ProdTitle:"",ProdSpec:"",ProdDetail:"",ProdIMG:""}),t=J({product:!1,product_id:"",product_name:"",supplier_id:"",supplier_name:"",category:"",price:"",quantity:"",remarks:""}),G=r=>{t.reset(),t.product=r,x.value=!x.value},U=r=>{t.product=r,t.product_id=r.product.id,t.product_name=r.product.name,t.supplier_id=r.supplier_id,t.supplier_name=r.supplier.supplier_name,t.category=r.supplier_category_id,t.price=r.price.price,w.value=!w.value},A=()=>{t.product_id==0||t.product_id==""||t.product_id==null?i.error("Looks like there's no product selected, please select first",{autoClose:1e3,transition:i.TRANSITIONS.FLIP,position:i.POSITION.TOP_RIGHT}):t.supplier_id==0||t.supplier_id==""||t.supplier_id==null?i.error("Looks like there's no supplier selected, please select first",{autoClose:1e3,transition:i.TRANSITIONS.FLIP,position:i.POSITION.TOP_RIGHT}):t.put(route("supplier_products.update",{product:t.product}),{preserveScroll:!0,onSuccess:()=>{i.success("Product successfully amended!",{autoClose:1e3,transition:i.TRANSITIONS.FLIP,position:i.POSITION.TOP_RIGHT}),w.value=!1,t.reset()},onError:r=>{i.error("Something went wrong "+r,{autoClose:1e3,transition:i.TRANSITIONS.FLIP,position:i.POSITION.TOP_RIGHT})}})},B=(r,l,e,p)=>{T.value=!T.value,g.value.ProdTitle=l,g.value.ProdDetail=r,g.value.ProdSpec=e,g.value.ProdIMG=p},q=r=>{t.product=r,y.value=!y.value},Y=()=>{t.post(route("supplier_products.remove",t.product),{preserveScroll:!0,onSuccess:()=>{i.success("Product successfully removed!",{autoClose:1e3,transition:i.TRANSITIONS.FLIP,position:i.POSITION.TOP_RIGHT}),y.value=!1,t.reset()},onError:r=>{i.error("Something went wrong "+r,{autoClose:1e3,transition:i.TRANSITIONS.FLIP,position:i.POSITION.TOP_RIGHT})}})},E=()=>{t.post(route("cart.order",t.product),{preserveScroll:!0,onSuccess:()=>{i.success("Product successfully ordered!",{autoClose:1e3,transition:i.TRANSITIONS.FLIP,position:i.POSITION.TOP_RIGHT}),x.value=!1,t.reset()},onError:r=>{i.error("Something went wrong "+r,{autoClose:1e3,transition:i.TRANSITIONS.FLIP,position:i.POSITION.TOP_RIGHT})}})},$=r=>{let p=new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP",minimumFractionDigits:2,maximumFractionDigits:20,minimumSignificantDigits:1,maximumSignificantDigits:20}).format(r).split("."),D=String(p[1]).slice(0,2),W=D=="un"?"00":D;return String(p[0])+"."+W},z=r=>M(r).format("MM/DD/YYYY, h:mm:ss a"),j=r=>M(r).fromNow();return Q(()=>{JsBarcode(".barcode").init()}),(r,l)=>(d(),n(I,null,[s("div",null,[s("section",ee,[s("div",te,[s("div",se,[f.products.data.length<=0?(d(),n("div",oe,ae)):(d(!0),n(I,{key:1},O(f.products.data,(e,p)=>(d(),n("div",{class:"p-4 md:w-1/4",key:p},[s("div",re,[s("div",ie,[e.product.product_image?(d(),n("img",{key:0,class:"lg:h-36 md:h-36 w-full object-scale-down object-center bg-gray-100",src:e.product.product_image,alt:e.product.name},null,8,ne)):v("",!0),e.product.product_image?v("",!0):(d(),n("img",{key:1,class:"lg:h-36 md:h-36 w-full object-scale-down object-center bg-gray-100",src:"https://dummyimage.com/720x400",alt:e.product.name},null,8,de)),s("div",ce,[s("button",{onClick:S=>G(e),class:"p-2 bg-orange-400 rounded-lg hover:bg-orange-600 w-auto mt-2 mr-2",title:"Send to order list"},[a(_,{icon:"shopping_bag",size:"sm"})],8,ue),s("button",{onClick:S=>B(e.product.description.details,e.product.name,e.product.description.specification,e.product.product_image),class:"p-2 bg-gray-400 rounded-lg hover:bg-gray-600 mr-2 w-auto"},[a(_,{icon:"docs"})],8,me),s("button",{onClick:S=>U(e),class:"p-2 bg-orange-400 rounded-lg hover:bg-orange-600 w-auto mt-2 mr-2",title:"Update product"},[a(_,{icon:"pencil",size:"sm"})],8,pe),s("button",{onClick:S=>q(e),class:"p-2 bg-red-400 rounded-lg hover:bg-red-600 w-auto mt-2"},[a(_,{icon:"trash",size:"sm"})],8,_e)])]),ge,s("div",ve,[s("h1",fe,[m(c(e.product.name)+" ",1),e.product.quantity==0?(d(),n("span",he,"- (Out of stocks)")):v("",!0)]),s("h2",be,[m(c($(e.price.price))+" ",1),s("span",ye,"(Profit "+c($(e.product.current_price.price-e.price.price))+")",1)]),s("h2",xe," Selling price at "+c($(e.product.current_price.price)),1),s("div",we,[a(_,{icon:"store",size:"md"}),s("p",ke,[s("img",{class:"w-10 h-10 rounded-full",src:e.supplier.image,alt:e.supplier.supplier_name},null,8,Ce),m(" "+c(e.supplier.supplier_name),1)])]),s("p",Se,[a(_,{icon:"administrator",size:"md"}),s("img",{class:"w-8 h-8 rounded-full",src:e.product.user.profile_photo_url,alt:e.product.user.name},null,8,Ie),m(" "+c(e.product.user.name),1)]),s("div",Pe,[s("p",{class:"flex leading-relaxed text-xs break-words",title:j(e.updated_at)},[a(_,{class:"mr-1",icon:"clock",size:"sm"}),s("time",Oe,c(j(e.updated_at)),1)],8,Te),s("p",{class:"flex leading-relaxed mt-2 mb-1 text-xs break-words",title:z(e.created_at)},[a(_,{class:"mr-1",icon:"calendar_plus",size:"xs"}),s("time",Ne,c(z(e.created_at)),1)],8,Ve)])])])]))),128))]),s("div",$e,[a(Z,{links:N.products.links,search:N.search,category:f.category},null,8,["links","search","category"]),s("p",Re," Showing "+c(f.products.data.length)+" Products ",1)])])])]),a(F,{show:y.value,onClose:l[1]||(l[1]=e=>y.value=!1),maxWidth:"2xl"},{title:u(()=>[m(" Are you sure you want to remove this product("+c(o(t).product.product.name)+")?",1)]),content:u(()=>[Le]),footer:u(()=>[a(V,{onClick:l[0]||(l[0]=e=>y.value=!1),class:"mr-2"},{default:u(()=>[m(" Cancel ")]),_:1}),a(L,{class:R([{"opacity-25":o(t).processing},"bg-green-200 hover:bg-green-400"]),disabled:o(t).processing,onClick:Y},{default:u(()=>[ze,m(" Submit ")]),_:1},8,["class","disabled"])]),_:1},8,["show"]),a(F,{show:x.value,onClose:l[5]||(l[5]=e=>x.value=!1),maxWidth:"2xl"},{title:u(()=>[m(" You are about to order ("+c(o(t).product.product.name)+") to your supplier ("+c(o(t).product.supplier.supplier_name)+"). Please input your desired quantity.",1)]),content:u(()=>[a(b,{type:"number",label:"Product Quantity",modelValue:o(t).quantity,"onUpdate:modelValue":l[2]||(l[2]=e=>o(t).quantity=e)},null,8,["modelValue"]),a(P,{message:o(t).errors.quantity,class:"mt-2"},null,8,["message"]),a(b,{type:"text",label:"Remarks",modelValue:o(t).remarks,"onUpdate:modelValue":l[3]||(l[3]=e=>o(t).remarks=e)},null,8,["modelValue"]),a(P,{message:o(t).errors.remarks,class:"mt-2"},null,8,["message"])]),footer:u(()=>[a(V,{onClick:l[4]||(l[4]=e=>x.value=!1),class:"mr-2"},{default:u(()=>[m(" Cancel ")]),_:1}),a(L,{class:R([{"opacity-25":o(t).processing},"bg-green-200 hover:bg-green-400"]),disabled:o(t).processing,onClick:E},{default:u(()=>[je,m(" Submit ")]),_:1},8,["class","disabled"])]),_:1},8,["show"]),a(H,{show:T.value,onClose:l[7]||(l[7]=e=>T.value=!1),maxWidth:"2xl"},{title:u(()=>[m(c(g.value.ProdTitle),1)]),content:u(()=>[s("div",De,[s("div",Me,[s("img",{class:"rounded-lg max-w-sx",src:g.value.ProdIMG},null,8,Fe),s("p",He,c(g.value.ProdSpec.spec_title)+": ",1),(d(!0),n(I,null,O(g.value.ProdSpec.spec_details,e=>(d(),n("div",null,[s("span",Ge,c(e.spec_name)+": ",1),s("span",null,c(e.spec_details),1)]))),256))]),s("div",Ue,[Ae,s("p",Be,c(g.value.ProdDetail),1)])])]),footer:u(()=>[a(V,{onClick:l[6]||(l[6]=e=>T.value=!1),class:"mr-2"},{default:u(()=>[m(" close ")]),_:1})]),_:1},8,["show"]),a(H,{show:w.value,onClose:l[21]||(l[21]=e=>w.value=!1),maxWidth:"2xl"},{title:u(()=>[m(" Update product here!")]),content:u(()=>[s("div",qe,[s("div",Ye,[a(b,{type:"text",label:"Product name view",modelValue:o(t).product_name,"onUpdate:modelValue":l[8]||(l[8]=e=>o(t).product_name=e),disabled:""},null,8,["modelValue"]),a(P,{message:o(t).errors.product_id,class:"mt-2"},null,8,["message"])]),s("div",Ee,[a(b,{disabled:k.value!=!0,type:"text",label:"Search product name",modelValue:o(t).product_name,"onUpdate:modelValue":l[9]||(l[9]=e=>o(t).product_name=e)},null,8,["disabled","modelValue"]),k.value==!0?(d(),n("div",We,[s("ul",Je,[(d(!0),n(I,null,O(f.product_lists,(e,p)=>(d(),n("li",{key:p},[e.name.toLowerCase().includes(o(t).product_name.toLowerCase())?(d(),n("a",{key:0,class:"flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer",onClick:S=>(o(t).product_name=e.name,o(t).product_id=e.id,k.value=!1)},[s("img",{class:"mr-2 w-6 h-6 rounded-full",src:e.product_image},null,8,Ke),m(" "+c(e.name),1)],8,Qe)):v("",!0)]))),128))]),Xe,s("a",{onClick:l[10]||(l[10]=e=>(k.value=!1,o(t).product_name="",o(t).product_id=!1)),class:"flex items-center p-3 text-sm font-medium text-blue-600 bg-gray-50 border-t border-gray-200 hover:bg-gray-100 hover:underline"}," clear search ")])):v("",!0)]),s("div",Ze,[o(t).product_id?(d(),n("button",{key:0,class:"h-10 my-auto mt-5",onClick:l[11]||(l[11]=e=>(k.value=!1,o(t).product_name="",o(t).product_id=!1))},[a(_,{icon:"close_icon",size:"sm"})])):v("",!0),s("button",{onClick:l[12]||(l[12]=e=>k.value=!0),class:"bg-yellow-400 text-sm lg:text-xs font-bold rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center mt-4"},[a(_,{icon:"search_icon",size:"sm"})])]),s("div",et,[a(b,{type:"text",label:"Supplier name view",modelValue:o(t).supplier_name,"onUpdate:modelValue":l[13]||(l[13]=e=>o(t).supplier_name=e),disabled:""},null,8,["modelValue"]),a(P,{message:o(t).errors.supplier_id,class:"mt-2"},null,8,["message"])]),s("div",tt,[a(b,{disabled:C.value!=!0,type:"text",label:"Search supplier's name",modelValue:o(t).supplier_name,"onUpdate:modelValue":l[14]||(l[14]=e=>o(t).supplier_name=e)},null,8,["disabled","modelValue"]),C.value==!0?(d(),n("div",st,[s("ul",ot,[(d(!0),n(I,null,O(f.suppliers,(e,p)=>(d(),n("li",{key:p},[e.supplier_name.toLowerCase().includes(o(t).supplier_name.toLowerCase())?(d(),n("a",{key:0,class:"flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer",onClick:S=>(o(t).supplier_name=e.supplier_name,o(t).supplier_id=e.id,C.value=!1)},[s("img",{class:"mr-2 w-6 h-6 rounded-full",src:e.image},null,8,at),m(" "+c(e.supplier_name),1)],8,lt)):v("",!0)]))),128))]),rt,s("a",{onClick:l[15]||(l[15]=e=>(C.value=!1,o(t).supplier_name="",o(t).supplier_id=!1)),class:"flex items-center p-3 text-sm font-medium text-blue-600 bg-gray-50 border-t border-gray-200 hover:bg-gray-100 hover:underline"}," clear search ")])):v("",!0)]),s("div",it,[o(t).supplier_id?(d(),n("button",{key:0,class:"h-10 my-auto mt-5",onClick:l[16]||(l[16]=e=>(C.value=!1,o(t).supplier_name="",o(t).supplier_id=!1))},[a(_,{icon:"close_icon",size:"sm"})])):v("",!0),s("button",{onClick:l[17]||(l[17]=e=>C.value=!0),class:"bg-yellow-400 text-sm lg:text-xs font-bold rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center mt-4"},[a(_,{icon:"search_icon",size:"sm"})])]),s("div",nt,[a(b,{type:"number",label:"Product price",modelValue:o(t).price,"onUpdate:modelValue":l[18]||(l[18]=e=>o(t).price=e)},null,8,["modelValue"]),a(P,{message:o(t).errors.price,class:"mt-2"},null,8,["message"])]),s("div",dt,[K(s("select",{class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full h-10 my-auto mt-5","onUpdate:modelValue":l[19]||(l[19]=e=>o(t).category=e)},[ct,(d(!0),n(I,null,O(N.categories,(e,p)=>(d(),n("option",{key:p,value:e.id},c(e.name),9,ut))),128))],512),[[X,o(t).category]]),a(P,{message:o(t).errors.category,class:"mt-2"},null,8,["message"])])])]),footer:u(()=>[a(V,{onClick:l[20]||(l[20]=e=>(w.value=!1,o(t).reset())),class:"mr-2 hover:bg-red-500"},{default:u(()=>[m(" Cancel ")]),_:1}),a(L,{class:R([{"opacity-25":o(t).processing},"bg-green-200 hover:bg-green-400"]),disabled:o(t).processing,onClick:A},{default:u(()=>[mt,m(" Submit ")]),_:1},8,["class","disabled"])]),_:1},8,["show"])],64))}};export{It as default};
