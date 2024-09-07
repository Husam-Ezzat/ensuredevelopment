import { gql } from '@apollo/client';

// Add Course
export const ADD_COURSE = gql`
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
`; 

// Edit Course
export const EDIT_COURSE = gql`
  mutation UpdateCourse($courseName: String!, $id: Long!) {
    updateCourse(
      input: { updateCourseCommand: { courseName: $courseName, id: $id } }
    ) {
      boolean
    }
  }
`;

export const GET_COURSES = gql`
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
`;

export const GET_COURSES_STATUS = gql`
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
`;