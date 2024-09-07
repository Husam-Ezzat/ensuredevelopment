import { gql } from "@apollo/client";


// GET USERS WITH PAGINATION
export const GET_USERS = gql`
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
`;