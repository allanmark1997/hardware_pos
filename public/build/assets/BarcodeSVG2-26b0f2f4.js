import{z as a,d as c,o as s}from"./app-7f390f71.js";const r=["jsbarcode-value"],l={__name:"BarcodeSVG2",props:["code"],setup(o){const e=o;return a(()=>{JsBarcode(".barcode").init()}),(t,n)=>(s(),c("svg",{class:"barcode w-[50vmin] h-[20vmin] mx-auto","jsbarcode-format":"CODE128","jsbarcode-value":e.code,"jsbarcode-textmargin":"0","jsbarcode-fontoptions":"bold"},null,8,r))}};export{l as default};
