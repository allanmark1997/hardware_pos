import{A as a,y as r,B as t,u as c,c as s,e as n,o as _}from"./app-d2f9e8ec.js";import d from"./BarcodeSVG-d5c2d3a7.js";const p={__name:"Barcode",setup(m){const e=a("barcode");return r(async()=>{const o=await t.get(route("cashier.generateCode"));e.code_generator=o.data.code}),(o,u)=>c(e).code_generator!=""?(_(),s(d,{key:0})):n("",!0)}};export{p as default};