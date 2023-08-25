import{r,j as e,F as o,m as y,o as N,c as S,d as w,e as j,n as f,p as E,f as b}from"./index-b7eb906e.js";import{N as k}from"./layout-c1635b93.js";const F=()=>{var g;const[c,a]=r.useState([]),[l,m]=r.useState({}),[n,d]=r.useState(""),[h,u]=r.useState((g=c[0])==null?void 0:g.type),x=async()=>{try{const{data:s}=await j.get(`/api/recommended/types?search=${n}`);a(s)}catch{f.error("Error while searching foods")}},p=async()=>{try{const{data:s}=await j.get(`/api/recommended/all?search=${n}`),i={};s.forEach(t=>{i[t.type]||(i[t.type]=[]),i[t.type].push(t)}),m(i)}catch{f.error("error in recommended foods")}};r.useEffect(()=>{p(),x()},[]),r.useEffect(()=>{let s;return n?s=setTimeout(()=>{p(),x()},500):(p(),x()),()=>{clearTimeout(s)}},[n]);const v=s=>{s.forEach(i=>{i.isIntersecting&&u(i.target.id)})};return r.useEffect(()=>{if(window.innerWidth>440){const s=new IntersectionObserver(v,{root:null,threshold:.8});return c.forEach(i=>{const t=document.getElementById(i.type);t&&s.observe(t)}),()=>{s.disconnect()}}},[c]),r.useEffect(()=>{const s=document.getElementById(h);s&&s.scrollIntoView({behavior:"smooth"})},[h]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"similar-products-container",children:[e.jsx("div",{className:"types-list",children:c==null?void 0:c.map((s,i)=>e.jsx("div",{className:`${h===s.type?"active":""}`,children:e.jsxs("div",{className:"btn p-0 m-2 ",onClick:()=>u(s.type),children:[s.type," (",s.count,")"]})},i))}),e.jsxs("div",{className:"recommended-foods-list",children:[e.jsxs("div",{className:"search-cnt",children:[e.jsxs("div",{className:"ms-3",children:[e.jsx("h2",{children:"Order Online"}),e.jsxs("div",{className:"search-head",children:[e.jsx(o,{icon:y})," Live track your order |"," ",e.jsx(o,{icon:N})," 33 min"]})]}),e.jsxs("div",{className:"search-in-menu",children:[e.jsx(o,{icon:S}),e.jsx("input",{onChange:s=>d(s.target.value.toLowerCase()),className:"ms-2",type:"text",placeholder:"Search within menu",value:n}),e.jsx(o,{icon:w,onClick:()=>d("")})]})]}),c==null?void 0:c.map(s=>{var i;return e.jsxs("div",{id:s.type,className:"ms-3",children:[e.jsx("h4",{className:"mb-3",children:s.type}),(i=l[s.type])==null?void 0:i.map(t=>e.jsxs("div",{className:"d-flex mb-4",children:[e.jsx("img",{width:"130",height:"130",src:t.imgSrc,alt:t.type,style:{borderRadius:"8px",border:"none"}}),e.jsxs("div",{className:"pd-dt",children:[e.jsx("h5",{children:t.title},t.id),e.jsxs("div",{style:{fontSize:"14px",color:"#4f4f4f"},children:["₹",t.price]}),e.jsx("div",{style:{fontSize:"14px",color:"#4f4f4f"},children:t.description})]})]},t.id))]},s.id)})]})]})})};const L=({pathname:c="restaurants"})=>{const[a,l]=r.useState({}),{slug:m}=E(),n=async()=>{try{const{data:d}=await j.get(`/api/${c}?slug=${m}`);l(d.data[0])}catch{f.error("Error while fetching data")}};return r.useEffect(()=>{n()},[]),e.jsxs(e.Fragment,{children:[e.jsx(k,{}),e.jsxs("div",{className:"prod-detail",children:[e.jsxs("div",{className:"grid-container",children:[e.jsx("div",{className:"grid-item",children:e.jsx("img",{src:a.imgSrc,alt:"food",width:"655",height:"370"})}),e.jsx("div",{className:"grid-item",children:e.jsx("img",{src:a.imgSrc,width:"355",height:"180",alt:"food"})}),e.jsx("div",{className:"grid-item",children:e.jsx("img",{src:a.imgSrc,width:"355",height:"180",alt:"food"})})]}),e.jsxs("div",{className:"prodDetails-body",children:[e.jsxs("h1",{className:"pd-title d-flex justify-content-between",children:[a.title,e.jsxs("div",{className:"btn btn-success",children:[a.rating," ",e.jsx(o,{icon:b})]})]}),e.jsx("div",{className:"fd-type",children:a.type}),e.jsxs("div",{className:"fd-price",children:["₹",a.price," for one"]})]}),e.jsx(F,{})]})]})};export{L as default};
