import{_ as p}from"./AppLayout-e959ee04.js";import{c as n,w as s,o as e,a as r,d as a,b as t,e as i}from"./app-1d2e6a6e.js";import{S as m}from"./SectionBorder-63fdbdfb.js";import c from"./UpdatePasswordForm-81238df3.js";import l from"./UpdateProfileInformationForm-0ffb7807.js";import"./logo_main-f6fb4bdb.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./Icon-7841912a.js";import"./ActionMessage-4773c38d.js";import"./FormSection-63ac755d.js";import"./SectionTitle-f4437e91.js";import"./InputError-2d73d193.js";import"./InputLabel-f66f71df.js";import"./PrimaryButton-e5732f84.js";import"./TextInput-d602c319.js";import"./SecondaryButton-493a758e.js";const d=r("h2",{class:"font-semibold text-xl text-gray-800 leading-tight"}," Profile ",-1),_={class:"max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"},f={key:0},u={key:1},E={__name:"Show",props:{confirmsTwoFactorAuthentication:Boolean,sessions:Array},setup(h){return(o,x)=>(e(),n(p,{title:"Profile"},{header:s(()=>[d]),default:s(()=>[r("div",null,[r("div",_,[o.$page.props.jetstream.canUpdateProfileInformation?(e(),a("div",f,[t(l,{user:o.$page.props.auth.user},null,8,["user"]),t(m)])):i("",!0),o.$page.props.jetstream.canUpdatePassword?(e(),a("div",u,[t(c,{class:"mt-10 sm:mt-0"}),t(m)])):i("",!0)])])]),_:1}))}};export{E as default};
