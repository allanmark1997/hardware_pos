import{_ as p}from"./AppLayout-7dc859fa.js";import{c as n,w as s,o as e,a as r,d as a,b as t,e as i}from"./app-87951b6a.js";import{S as m}from"./SectionBorder-c3070d04.js";import c from"./UpdatePasswordForm-0664212f.js";import l from"./UpdateProfileInformationForm-922cfbaf.js";import"./logo_main-f6fb4bdb.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./Icon-14e9e985.js";import"./ActionMessage-1b9dc57e.js";import"./FormSection-d07e5c59.js";import"./SectionTitle-209877c7.js";import"./InputError-ed0783c2.js";import"./InputLabel-c3e521db.js";import"./PrimaryButton-ce19d684.js";import"./TextInput-fad836ab.js";import"./SecondaryButton-941150ed.js";const d=r("h2",{class:"font-semibold text-xl text-gray-800 leading-tight"}," Profile ",-1),_={class:"max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"},f={key:0},u={key:1},E={__name:"Show",props:{confirmsTwoFactorAuthentication:Boolean,sessions:Array},setup(h){return(o,x)=>(e(),n(p,{title:"Profile"},{header:s(()=>[d]),default:s(()=>[r("div",null,[r("div",_,[o.$page.props.jetstream.canUpdateProfileInformation?(e(),a("div",f,[t(l,{user:o.$page.props.auth.user},null,8,["user"]),t(m)])):i("",!0),o.$page.props.jetstream.canUpdatePassword?(e(),a("div",u,[t(c,{class:"mt-10 sm:mt-0"}),t(m)])):i("",!0)])])]),_:1}))}};export{E as default};