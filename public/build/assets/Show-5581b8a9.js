import{_ as p}from"./AppLayout-3d98283d.js";import{c as n,w as s,o as e,a as r,d as a,b as t,e as i}from"./app-4f3b5cda.js";import{S as m}from"./SectionBorder-f9021145.js";import c from"./UpdatePasswordForm-11c3c762.js";import l from"./UpdateProfileInformationForm-c2087c1e.js";import"./logo_main-f6fb4bdb.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./Icon-d8a90f1c.js";import"./ActionMessage-70fe9d8a.js";import"./FormSection-3b16786a.js";import"./SectionTitle-fbf70898.js";import"./InputError-98f7dbf8.js";import"./InputLabel-b7431bc2.js";import"./PrimaryButton-1ef84c76.js";import"./TextInput-86faf3cf.js";import"./SecondaryButton-b2f1844a.js";const d=r("h2",{class:"font-semibold text-xl text-gray-800 leading-tight"}," Profile ",-1),_={class:"max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"},f={key:0},u={key:1},E={__name:"Show",props:{confirmsTwoFactorAuthentication:Boolean,sessions:Array},setup(h){return(o,x)=>(e(),n(p,{title:"Profile"},{header:s(()=>[d]),default:s(()=>[r("div",null,[r("div",_,[o.$page.props.jetstream.canUpdateProfileInformation?(e(),a("div",f,[t(l,{user:o.$page.props.auth.user},null,8,["user"]),t(m)])):i("",!0),o.$page.props.jetstream.canUpdatePassword?(e(),a("div",u,[t(c,{class:"mt-10 sm:mt-0"}),t(m)])):i("",!0)])])]),_:1}))}};export{E as default};
