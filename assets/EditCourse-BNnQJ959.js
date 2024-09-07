import{l as v,u as N,a as G,i as T,m as P,r as p,J as _,j as e,n as q,I,B as D,S as O,T as R,p as B,o as F,q as E,g as U,G as y,s as V,C as H,t as L,D as z,d as A,v as Q}from"./index-CtChZPOB.js";const J=v`
  mutation AddCourse($groupName: String!, $name: String!) {
    addCourse(
      input: { addCourseCommand: { groupName: $groupName, name: $name } }
    ) {
     addCourseResult {
      courseId
      groupId
    }
    }
  }
`,M=v`
  mutation UpdateCourse($courseName: String!, $id: Long!) {
    updateCourse(
      input: { updateCourseCommand: { courseName: $courseName, id: $id } }
    ) {
      boolean
    }
  }
`,K=v`
  query GetCourses(
    $pageNumber: Int!
    $pageSize: Int!
    $name: String!
    $certificateIssuedStatuses: CertificateIssuedStatuses!
  ) {
    courses(
      getCoursesQuery: {
        paginatedRequest: { pageNumber: $pageNumber, pageSize: $pageSize }
        name: $name
        certificateIssuedStatuses: $certificateIssuedStatuses
      }
    ) {
      coursesResults {
        hasNextPage
        totalCount
        totalPages
        data {
          groupNameEn
          groupsCount
          id
          name
          status
          templateDetails
        }
      }
    }
  }
`,Z=v`
  query GetCourses(
    $pageNumber: Int!
    $pageSize: Int!
    $name: String!
    $certificateIssuedStatuses: CertificateIssuedStatuses!
  ) {
    courses(
      getCoursesQuery: {
        paginatedRequest: { pageNumber: $pageNumber, pageSize: $pageSize }
        name: $name
        certificateIssuedStatuses: $certificateIssuedStatuses
      }
    ) {
      coursesResults {
        totalCount
      }
        coursesStatusesResults {
        issued
        pending
        rejected
}
    }
  }
`,ee=()=>{const{t:a}=N(),r=G(),i=T.language,[m,{data:d,loading:C,error:o}]=P(J),[n,x]=p.useState(""),[u,l]=p.useState(""),[h,f]=p.useState(!1),c=({target:{value:g}})=>{x(g)},t=({target:{value:g}})=>{l(g)},$=async g=>{g.preventDefault(),await m({variables:{name:n,groupName:u}})};p.useEffect(()=>{if(d){const{courseId:g,groupId:j}=d.addCourse.addCourseResult;r(`/courses/${g}/groups/${j}/trainees`,{state:{isNewCourse:!0}})}o&&_.warning(a("Somethingwentwrong"))},[d,o,r]);const S=()=>{f((n==null?void 0:n.trim())!==""&&(u==null?void 0:u.trim())!=="")};return p.useEffect(()=>{S()},[n,u]),e.jsxs(e.Fragment,{children:[e.jsxs(q,{onSubmit:$,children:[e.jsx(I,{id:"course",variant:"secondary",label:a("CourseName"),type:"text",value:n,placeholder:a("AddCourseName"),height:"medium",required:!0,onChange:c}),e.jsx(I,{id:"group",variant:"secondary",label:a("GroupName"),type:"text",height:"medium",value:u,placeholder:a("AddGroupName"),required:!0,onChange:t}),e.jsx(D,{variant:h?"primary":"secondary",size:"medium",width:"full",disabled:!h||C,type:"submit",children:C?e.jsx(O,{size:"1.5rem"}):a("AddCourse")})]}),e.jsx(R,{richColors:!0,closeButton:!0,position:"top-center",dir:i==="ar"?"rtl":"ltr",toastOptions:{style:{background:"var(--color-rejected-100)",color:"var(--color-rejected-500)"}}})]})},W=B.button`
  box-sizing: border-box;
  min-height: 200px;
  border: 1px solid var(--color-black-500);
  background-color: var(--color-grey-0);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.5rem;
  transition: all 0.1s ease-in-out;
  &:hover {
    border-color:  var(--color-blue-500);
    background-color: var(--color-blue-100);
  }

  & p{
    color: var(--color-black-500);
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 1rem;
  }
   & span{
    color: var(--color-black-500);
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0
  }
  @media (width < 768px) {
    p {
      font-size: 0.9rem;
    }
    span{
        font-size: 0.75rem;
    }
}
    @media (width < 470px) {
      padding: 1rem;
      p {
        font-size: 0.75rem;
        margin: 0 0 0.9rem;
      }
      span{
            font-size: 0.6rem;
      }
    }
`,X=({onClick:a,value:r})=>{const{t:i}=N(),m=()=>{a()};return e.jsxs(W,{onClick:m,children:[e.jsx("p",{children:`+${r}`}),e.jsx("span",{children:i("ViewAll")})]})},se=({pageNumber:a=1,pageSize:r=7,onClick:i,handleDelete:m,handleEdit:d,name:C="",certificateIssuedStatuses:o="NONE",pagination:n=!1,onNextClick:x,onPrevClick:u})=>{const{t:l}=N(),h=G(),{courseActions:f}=F(),c=E(s=>s.setCoursesResults),t=E(s=>s.coursesResults),$={pageNumber:a,pageSize:r,name:C,certificateIssuedStatuses:o},{loading:S,error:g,refetch:j}=U(K,{variables:$,notifyOnNetworkStatusChange:!0,onCompleted:s=>{c(s.courses.coursesResults)}});return p.useEffect(()=>{j()},[a,r,C,o,j]),S?e.jsx(y,{columns:{default:2,sm:2,md:2,lg:3,xl:4,xxl:5},children:Array.from({length:8}).map((s,b)=>e.jsx(V,{},b))}):g?e.jsx("p",{children:l("error_loading_data")}):(console.log(t),e.jsxs(e.Fragment,{children:[e.jsxs(y,{columns:{default:2,sm:2,md:2,lg:3,xl:4,xxl:5},children:[f()&&e.jsx(H,{title:l("CreateCourseName"),onClick:i||(()=>{})}),!S&&(t==null?void 0:t.data.map(s=>{var b,w,k;return e.jsx(L,{courseName:s==null?void 0:s.name,statusCount:s==null?void 0:s.groupsCount,status:(k=s==null?void 0:s.status)==null?void 0:k.split(" ")[((w=(b=s==null?void 0:s.status)==null?void 0:b.split(" "))==null?void 0:w.length)-1].toLowerCase(),numberOfGroups:s==null?void 0:s.groupsCount,onClick:()=>h(`/courses/${s.id}/groups`),actions:f(),details:s==null?void 0:s.templateDetails,actionsContent:e.jsx(e.Fragment,{children:d&&e.jsxs(e.Fragment,{children:[e.jsxs(z,{onClick:()=>d&&d(s.id),children:[e.jsx("img",{src:A.edit,alt:"edit"}),e.jsx("span",{children:l("EditCourseName")})]}),e.jsxs(z,{onClick:()=>m&&m(s.id),children:[e.jsx("img",{src:A.del,alt:"delete"}),e.jsx("span",{children:l("DeleteCourse")})]})]})})},s==null?void 0:s.id)})),!n&&(t==null?void 0:t.hasNextPage)&&e.jsx(X,{value:(t==null?void 0:t.totalCount)-r||l("more"),onClick:()=>h("/courses")})]}),e.jsx(y,{columns:{default:1},children:n&&(t==null?void 0:t.totalPages)!==void 0&&t.totalPages>1&&e.jsx(Q,{currentPage:a,totalPages:(t==null?void 0:t.totalPages)||1,onNextClick:x,onPrevClick:u})})]}))},te=({courseId:a,onEdit:r})=>{const{t:i}=N(),m=E(c=>c.updateCourse),[d,{loading:C}]=P(M,{onCompleted:()=>{r("success")},onError:()=>{r("faild")}}),[o,n]=p.useState(""),[x,u]=p.useState(!1),l=({target:{value:c}})=>{n(c)},h=async c=>{c.preventDefault(),x&&(m({id:a,name:o}),await d({variables:{courseName:o,id:a}}))},f=()=>{u(o.trim()!=="")};return p.useEffect(()=>{f()},[o]),e.jsx(e.Fragment,{children:e.jsxs(q,{onSubmit:h,children:[e.jsx(I,{id:"courseName",variant:"secondary",label:i("CourseName"),height:"medium",type:"text",autoComplete:"off",value:o,placeholder:i("EditCourseName"),required:!0,onChange:l}),e.jsx(D,{variant:x?"primary":"secondary",size:"medium",width:"full",disabled:!x||C,type:"submit",children:C?e.jsx(O,{size:"1.5rem"}):i("EditCourseName")})]})})};export{ee as A,se as C,te as E,Z as G};
