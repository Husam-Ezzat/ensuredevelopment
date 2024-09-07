import{p as r,j as e,d as i}from"./index-CtChZPOB.js";const s=r.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    width: 80%;
    margin: 0 auto;
`,a=r.h1`
    font-size: 3rem;
    font-weight: 700;
    margin: 0 0 1.5rem;
    color: var(--color-black-500);
`,c=r.p`
    font-size: 1.5rem;
    margin: 0;
    color: var(--color-grey-600);
`,d=r.img`
    width: calc(50% - 2rem);
`,l=({image:o,title:t,subtitle:n})=>e.jsxs(s,{children:[e.jsx(d,{src:o,alt:"Error"}),e.jsxs("div",{children:[e.jsx(a,{children:t}),e.jsx(c,{children:n})]})]}),g=()=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"container",children:e.jsx(l,{image:i.notFound,title:"Page Not Found!",subtitle:"The page you are looking for was moved,removed,renamed or might never have existed."})})});export{g as default};
