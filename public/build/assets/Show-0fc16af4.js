import{_ as p}from"./AppLayout-5a3a99a6.js";import{c as n,w as s,o as e,a as r,d as a,b as t,e as i}from"./app-2f54e3ea.js";import{S as m}from"./SectionBorder-3ba0afb2.js";import c from"./UpdatePasswordForm-5204c5d0.js";import l from"./UpdateProfileInformationForm-548e6fbb.js";import"./logo_main-f6fb4bdb.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./Icon-b88412fa.js";import"./ActionMessage-6257cf22.js";import"./FormSection-95df1f11.js";import"./SectionTitle-d9511960.js";import"./InputError-4521e450.js";import"./InputLabel-92cd29d0.js";import"./PrimaryButton-23b233c3.js";import"./TextInput-25b3422d.js";import"./SecondaryButton-194cb57d.js";const d=r("h2",{class:"font-semibold text-xl text-gray-800 leading-tight"}," Profile ",-1),_={class:"max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"},f={key:0},u={key:1},E={__name:"Show",props:{confirmsTwoFactorAuthentication:Boolean,sessions:Array},setup(h){return(o,x)=>(e(),n(p,{title:"Profile"},{header:s(()=>[d]),default:s(()=>[r("div",null,[r("div",_,[o.$page.props.jetstream.canUpdateProfileInformation?(e(),a("div",f,[t(l,{user:o.$page.props.auth.user},null,8,["user"]),t(m)])):i("",!0),o.$page.props.jetstream.canUpdatePassword?(e(),a("div",u,[t(c,{class:"mt-10 sm:mt-0"}),t(m)])):i("",!0)])])]),_:1}))}};export{E as default};