import{u as t,m as i,j as s,N as a}from"./index-99fee549.js";import{L as l}from"./Layout-9e658d82.js";import"./layout-3f1f4a44.js";const u=()=>{const{user:e}=t(r=>r.auth);i();const o=()=>{localStorage.removeItem("user-hunger"),setUser(""),a("/")};return s.jsx(l,{children:s.jsx("div",{className:"profile-main",children:s.jsxs("div",{className:"profile-ovr",children:[s.jsx("img",{width:"150",height:"150",src:"https://cdn-icons-png.flaticon.com/512/1177/1177568.png",alt:"user"}),s.jsx("div",{className:"profile-user",children:e}),s.jsx("div",{className:"logout",onClick:o,children:"Log Out"})]})})})};export{u as default};
