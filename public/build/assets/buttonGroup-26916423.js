import{_ as c}from"./Modal-a896277f.js";import{o as i,c as m,w as n,a as t,m as o}from"./app-d10659b1.js";const r={class:"bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"},d={class:"sm:flex sm:items-start"},f={class:"mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left"},h={class:"text-lg font-medium text-gray-900"},x={class:"mt-4 flex justify-center text-sm text-gray-600"},_={class:"flex flex-row justify-end px-6 py-4 bg-gray-100 text-right"},b={__name:"buttonGroup",props:{show:{type:Boolean,default:!1},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0}},emits:["close"],setup(s,{emit:l}){const a=()=>{l("close")};return(e,u)=>(i(),m(c,{show:s.show,"max-width":s.maxWidth,closeable:s.closeable,onClose:a},{default:n(()=>[t("div",r,[t("div",d,[t("div",f,[t("h3",h,[o(e.$slots,"title")]),t("div",x,[o(e.$slots,"content",{class:"mx-auto"})])])])]),t("div",_,[o(e.$slots,"footer")])]),_:3},8,["show","max-width","closeable"]))}};export{b as _};
