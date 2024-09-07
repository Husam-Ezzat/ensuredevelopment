import{l as w,u as x,g as E,j as e,d as h,h as y,w as k,c as N,G as z,n as I,I as f,F as b,B as S,x as L,y as D,p,i as T,o as F,r as m,z as $,D as A,m as M,S as R,P as q,k as G,A as B,T as _,J as C}from"./index-CtChZPOB.js";const Q=w`
  query users($pageNumber: Int!, $pageSize: Int!) {
    users(
      getUserPaginationQuery: {
        paginatedRequest: { pageNumber: $pageNumber, pageSize: $pageSize }
      }
    ) {
      currentPage
      hasNextPage
      hasPreviousPage
      messages
      pageSize
      succeeded
      totalCount
      totalPages
      data {
      email
      id
      role
      userName
      }
    }
  }
`,V=({pageNumber:r=1,pageSize:t=10})=>{var g;const{t:a}=x(),{loading:l,error:d,data:i}=E(Q,{variables:{pageNumber:r,pageSize:t}});if(l)return e.jsx("p",{children:"Loading..."});if(d)return e.jsx("p",{children:"Error loading data"});const n=((g=i==null?void 0:i.users)==null?void 0:g.data)||[],u=s=>{console.log(`Edit trainee with ID: ${s}`)},c=[{header:a("UserName"),accessor:"userName"},{header:a("Email"),accessor:"email"},{header:a("Role"),accessor:"role"},{header:a("Actions"),accessor:"actions",render:s=>e.jsx("div",{children:e.jsx("button",{onClick:()=>u(s.id),children:e.jsx("img",{src:h.edit,alt:"edit"})})})}];return e.jsx(y,{children:n&&e.jsx(k,{columns:c,data:n})})},H=()=>{const{t:r}=x(),{user:t}=N();return e.jsx(e.Fragment,{children:e.jsx(z,{columns:{default:2,sm:1,md:2,lg:2,xl:2,xxl:3},children:e.jsxs(I,{children:[e.jsx(f,{id:"username",variant:"primary",label:r("Email"),type:"text",value:(t==null?void 0:t.Name)||"",height:"large",required:!0,onChange:()=>{}}),e.jsx(f,{id:"password",variant:"primary",label:r("PhoneNumber"),type:"text",height:"large",value:(t==null?void 0:t.PhoneNumber)||"",required:!0,onChange:()=>{}}),e.jsxs(b,{direction:"row",justify:"flex-end",align:"center",gap:16,children:[e.jsx(S,{variant:"tertiary",size:"medium",width:"relative",disabled:!1,type:"submit",children:r("Setanewpassword")}),e.jsx(S,{variant:"primary",size:"medium",width:"relative",disabled:!1,type:"submit",children:r("SaveChanges")})]})]})})})},v=w`
  query {
    signatureList {
      id
      imageUrl
      nameAr
      nameEn
    }
  }
`,J=w`
  mutation AddSignature($imageUrl: String!, $nameAr: String!, $nameEn: String!) {
    addSignature(
      input: { addSignatureCommand: { imageUrl: $imageUrl, nameAr: $nameAr, nameEn: $nameEn } }
    ) {
      boolean
    }
  }
`,U=L(r=>({signs:[],setSigns:t=>r({signs:t})}));function W(r){return D({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"m13.5 8.5-5 5"},child:[]},{tag:"path",attr:{d:"m8.5 8.5 5 5"},child:[]},{tag:"circle",attr:{cx:"11",cy:"11",r:"8"},child:[]},{tag:"path",attr:{d:"m21 21-4.3-4.3"},child:[]}]})(r)}const O=p.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  max-width: 350px;
  width: 100%;
`,X=p.div`
  width: 100%;
`,K=p.div`
  display: flex;
  justify-content: center;
  height: 100%;
  gap: 1rem;
  margin-bottom: 0.5rem;
`,Y=p.h3`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    color: var(--color-rejected-500);
    opacity: 1;
    margin: 1rem 0 0;
 `,Z=({addSignature:r})=>{const{t}=x(),{signs:a,setSigns:l}=U(),d=T.language,{signAMutations:i}=F(),{data:n,loading:u,error:c,refetch:g}=E(v,{onCompleted:s=>{l(s.signatureList)}});return m.useEffect(()=>{g()},[g]),m.useEffect(()=>{n&&l(n==null?void 0:n.signatureList)},[n,l]),u?e.jsx("p",{children:t("Loading...")}):c?e.jsx("p",{children:t("Error loading signatures")}):e.jsxs(O,{children:[!(a!=null&&a.length)&&e.jsxs(Y,{children:[e.jsx(W,{size:20})," ",t("NoSignaturesFound"),"  "]}),a==null?void 0:a.map(s=>e.jsxs(b,{direction:"row",justify:"space-between",align:"flex-end",wrap:"nowrap",gap:16,children:[e.jsx(X,{children:e.jsx(f,{type:"text",variant:"secondary",placeholder:d==="en"?s==null?void 0:s.nameEn:s==null?void 0:s.nameAr,disabled:!0,label:t("SignatureName")})}),e.jsx(K,{children:e.jsx($,{trigger:e.jsx("img",{src:h.dots,alt:"dots"}),content:e.jsxs("div",{children:[e.jsx(A,{onClick:()=>console.log("Edit"),children:t("View")}),e.jsx(A,{onClick:()=>console.log("Delete"),type:"danger",children:t("Delete")})]})})})]},s==null?void 0:s.id)),i()&&e.jsx(b,{direction:"row",justify:"flex-start",gap:16,wrap:"nowrap",children:e.jsx(S,{variant:"tertiary",onClick:r,size:"medium",width:150,icon:e.jsx("img",{src:h.add,alt:"plus"}),children:t("AddNew")})})]})},ee=p.div`
  border: 1px dashed var(--color-grey-300);
  background-color: var(--color-grey-200);
  padding: 0.9rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 0.9rem;
  border-radius: 0.5rem;
  position: relative;
  cursor: pointer;

  span {
    color: var(--color-grey-600);
    font-size: 0.9rem;
  }
`,re=p.input`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  cursor: pointer;
`,te=p.img`
  width: 100px;
  height: auto;
  margin-top: 1rem;
  border-radius: 0.5rem;
  object-fit: cover;
`,ae=({onImageUpload:r})=>{const{t}=x(),[a,l]=m.useState(null),d=i=>{if(i.target.files&&i.target.files.length>0){const n=i.target.files[0],u=new FileReader;u.onloadend=()=>{const c=u.result;l(c),r(c)},u.readAsDataURL(n)}};return e.jsxs(ee,{children:[e.jsx("img",{src:h.uploadInput,alt:"upload"}),e.jsxs("div",{children:[e.jsx("span",{children:e.jsx("b",{children:t("Clicktoupload")})})," ",e.jsx("span",{children:t("ordraganddrop")})]}),e.jsx(re,{type:"file",accept:"image/*",onChange:d}),a&&e.jsx(te,{src:a,alt:"Preview"})]})},se=({onAddSignature:r})=>{const{t}=x(),[a,l]=m.useState(""),[d,i]=m.useState(null),{setSigns:n}=U(),{refetch:u}=E(v,{skip:!0}),[c,{loading:g}]=M(J,{refetchQueries:[{query:v}],onCompleted:o=>{o.addSignature.boolean&&(u(),n(o==null?void 0:o.signatureList),r&&(r(!0),l(""),i(null)))},onError:o=>{console.error("Error adding signature:",o),r&&r(!1)}}),s=async()=>{try{await c({variables:{imageUrl:d,nameAr:a,nameEn:a}})}catch(o){console.error("Error adding signature:",o)}},j=o=>{i(o)},P=o=>{o.preventDefault(),a&&d&&s()};return e.jsx(e.Fragment,{children:e.jsxs(I,{onSubmit:P,children:[e.jsx(f,{id:"SignatureName",variant:"primary",label:t("SignatureName"),type:"text",height:"medium",width:"100%",placeholder:t("SignatureName"),required:!0,value:a,onChange:o=>l(o.target.value)}),e.jsx(ae,{onImageUpload:j}),e.jsx(b,{justify:"flex-end",gap:10,direction:"row",wrap:"nowrap",children:e.jsx(S,{variant:a&&d?"primary":"secondary",size:"medium",width:160,disabled:!a||!d||g,type:"submit",children:g?e.jsx(R,{size:"1.5rem"}):t("Save")})})]})})},ne=()=>{const{t:r}=x(),{user:t}=N(),[a,l]=m.useState(0),[d,i]=m.useState(!1),n=T.language,u=j=>{j?(C.success(r("SignatureAddedSuccessfully"),{style:{color:"var(--color-blue-500)",background:"var(--color-blue-100)",padding:"1rem"}}),i(!1)):C.error(r("FailedToAddSignature"),{style:{color:"var(--color-rejected-500)",background:"var(--color-rejected-100)",padding:"1rem"}})},c=(t==null?void 0:t.Role)==="Admin",g=[{id:0,label:r(c?"OrganizationProfile":"profile")},{id:1,label:r(c?"ManageTeam":"TeamMembers")},{id:2,label:r("SignaturesList")},{id:3,label:r(c?"ManageSubscriptions":"Subscriptions")}],s=j=>{l(j.id)};return e.jsxs(e.Fragment,{children:[e.jsx(y,{children:e.jsx(q,{title:r("profile")})}),e.jsxs(y,{children:[e.jsx(G,{tabs:g,onTabClick:s}),a===0&&e.jsx(H,{}),a===1&&e.jsxs(e.Fragment,{children:[e.jsxs(b,{direction:"row",justify:"space-between",align:"center",children:[e.jsx(f,{type:"text",variant:"secondary",width:300,height:"small",placeholder:r("search"),icon:e.jsx("img",{src:h.search,alt:"search"})}),e.jsx(S,{variant:"tertiary",size:"small",icon:e.jsx("img",{src:h.plus,alt:"plus"}),children:r("AddNew")})]}),e.jsx(V,{})]}),a===2&&e.jsx(Z,{addSignature:()=>i(!0)})]}),e.jsx(B,{title:r("AddNewSignature"),isvisible:d,onClose:()=>i(!1),children:e.jsx(se,{onAddSignature:u})}),e.jsx(_,{position:"top-center",dir:n==="en"?"ltr":"rtl"})]})};export{ne as default};
