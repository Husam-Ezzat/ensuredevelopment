import{f as E,p as N,j as e,u as v,g as y,r as a,k as R,i as w,h as j,F as A,P as M,I as P,d as U,M as h,T as F,J as f}from"./index-CtChZPOB.js";import{G as O,C as V,A as D,E as G}from"./EditCourse-BNnQJ959.js";const J=E`
  0% {
    border-bottom-color: rgba(200, 200, 200, 0.2);
  }
  50% {
    border-bottom-color: rgba(200, 200, 200, 0.6);
  }
  100% {
    border-bottom-color: rgba(200, 200, 200, 0.2);
  }
`,z=E`
  0% {
    border-bottom-color: rgba(180, 180, 180, 0.2);
  }
  50% {
    border-bottom-color: rgba(180, 180, 180, 0.6);
  }
  100% {
    border-bottom-color: rgba(180, 180, 180, 0.2);
  }
`,_=N.div`
  display: flex;
  border-bottom: 3px solid rgba(180, 180, 180, 0.2); 
  animation: ${z} 2s infinite ease-in-out; 
  column-gap: 1.5rem;
  margin: 1rem 0 2rem;
  width: 100%;
`,C=N.div`
  background: var(--color-grey-200);
  height: 1.5rem;
  width: 100px;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  animation: ${J} 1.5s infinite ease-in-out; 
`,H=()=>e.jsxs(_,{children:[e.jsx(C,{}),e.jsx(C,{}),e.jsx(C,{})]}),L=({onTabClick:r})=>{var l,b,m,g,i,c,p;const{t:o}=v(),x={pageNumber:1,pageSize:1,name:"",certificateIssuedStatuses:"NONE"},{loading:u,error:S,data:s,refetch:d}=y(O,{variables:x});a.useEffect(()=>{d()},[d]);const n=[{id:0,label:`${o("AllCourses")} (${((b=(l=s==null?void 0:s.courses)==null?void 0:l.coursesResults)==null?void 0:b.totalCount)||0})`},{id:1,label:`${o("issued")} (${((g=(m=s==null?void 0:s.courses)==null?void 0:m.coursesStatusesResults)==null?void 0:g.issued)||0})`},{id:2,label:`${o("pending")} (${((c=(i=s==null?void 0:s.courses)==null?void 0:i.coursesStatusesResults)==null?void 0:c.pending)||0})`},{id:3,label:`${o("rejected")} (${((p=s==null?void 0:s.courses.coursesStatusesResults)==null?void 0:p.rejected)||0})`}];return u?e.jsx(H,{}):S?e.jsx("p",{children:o("Error loading data")}):e.jsx(R,{tabs:n,onTabClick:r})},q=()=>{const{t:r}=v(),o=w.language,[x,u]=a.useState(!1),[S,s]=a.useState(""),[d,n]=a.useState(!1),[l,b]=a.useState(null),[m,g]=a.useState("NONE"),[i,c]=a.useState(1),p=["NONE","ISSUED","PENDING","REJECTED"],T=t=>{const $=p[t.id];g($)},k=t=>{b(t),n(!0)},I=t=>{n(!1),t==="success"?f.success(r("CourseNameUpdatedSuccessfully"),{style:{color:"var(--color-blue-500)",background:"var(--color-blue-100)",padding:"1rem"}}):f.error(r("FailedToUpdateCourseName"),{style:{color:"var(--color-rejected-500)",background:"var(--color-rejected-100)",padding:"1rem"}})};return e.jsxs(e.Fragment,{children:[e.jsx(j,{children:e.jsxs(A,{align:"center",justify:"space-between",children:[e.jsx(M,{title:r("Courses"),content:!0}),e.jsx(P,{type:"text",variant:"secondary",width:300,height:"small",placeholder:r("search"),onChange:t=>s(t.target.value),icon:e.jsx("img",{src:U.search,alt:"search"})})]})}),e.jsx(j,{children:e.jsx(L,{onTabClick:T})}),e.jsx(j,{children:e.jsx(V,{certificateIssuedStatuses:m,name:S,pageNumber:i,pageSize:7,handleEdit:k,onClick:()=>u(!0),pagination:!0,onNextClick:()=>c(i+1),onPrevClick:()=>c(i-1)})}),e.jsx(h,{onClose:()=>u(!1),title:r("AddCourseName"),visible:x,children:e.jsx(D,{})}),l&&e.jsx(h,{onClose:()=>n(!1),title:r("EditCourseName"),visible:d,children:e.jsx(G,{courseId:l,onEdit:t=>I(t)})}),e.jsx(F,{position:"top-center",dir:o==="en"?"ltr":"rtl"})]})};export{q as default};
