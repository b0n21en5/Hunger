import{r as e,q as f,j as s,I as v,L as u,x as b,F as n,c as S,y as N,z as V,A as k,U as C,B as I,S as L,D as U,E as w}from"./index-14bf2ca3.js";const M=()=>{const[g,l]=e.useState(""),[c,o]=e.useState(!1),[j,i]=e.useState(!1),[m,a]=e.useState(!1),[r,h]=e.useState(!1),[p,d]=e.useState(!1),{user:x}=f();return s.jsxs("div",{className:"nav",children:[s.jsx(v,{position:"top-right",gutter:24}),s.jsxs("div",{className:"nav-left",children:[s.jsx(u,{to:"/",className:"logo",children:s.jsx("img",{width:"126",height:"27",src:b,alt:"logo"})}),s.jsxs("div",{className:"search-bar",children:[s.jsx(n,{icon:S}),s.jsx("input",{onChange:t=>l(t.target.value),onClick:()=>o(!0),type:"text",placeholder:"Search for resturant, cuisine or dish"})]})]}),s.jsx("div",{className:"nav-left",children:s.jsx("div",{className:"user-auth",children:x?s.jsxs("div",{className:"user-info",onClick:()=>h(t=>!t),children:[s.jsx(u,{to:"/profile",children:s.jsx("img",{className:"mb-user-img",width:"30",height:"30",src:"https://cdn-icons-png.flaticon.com/512/1177/1177568.png",alt:"user"})}),s.jsxs("div",{className:"user-det",children:[s.jsx("img",{width:"40",height:"40",src:"https://cdn-icons-png.flaticon.com/512/1177/1177568.png",alt:"user"}),s.jsx("div",{children:x}),s.jsx(n,{icon:r?V:k})]})]}):s.jsxs(s.Fragment,{children:[s.jsx(n,{className:"mb-user-login",icon:N,onClick:()=>i(!0)}),s.jsx("div",{className:"link",onClick:()=>i(!0),children:"Log in"}),s.jsx("div",{className:"link",onClick:()=>a(!0),children:"sign up"})]})})}),r&&s.jsx(C,{setUserModalVisible:h}),j&&s.jsx(I,{setForPassVis:d,setIsLoginVisible:i,setIsSignupVisible:a}),m&&s.jsx(L,{setIsLoginVisible:i,setIsSignupVisible:a}),p&&s.jsx(U,{setForPassVis:d,setIsLoginVisible:i}),c&&s.jsx(w,{isVisible:c,setIsVisible:o,searchText:g,setSearchText:l})]})};export{M as N};