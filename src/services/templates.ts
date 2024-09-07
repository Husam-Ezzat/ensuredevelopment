import { gql } from "@apollo/client";

// Get All Templates

export const GET_PUBLIC_TEMPLATES = gql`
  query publicTemplates($pageNumber: Int!, $pageSize: Int!) {
    publicTemplates(
      getPublicTemplates: {
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
        details
        id
        image
        templateAr
        templateEn
        orientationType
      }
    }
  }
`;



// Assign Template to Group Mutation
export const ASSIGN_TEMPLATE_TO_GROUP = gql`
  mutation assignTemplateToGroup($templateId: Long!, $traineeGroupId: Long!) {
    assignTemplateToGroup(
      input: { assignTemplateToGroup: { templateId: $templateId, traineeGroupId: $traineeGroupId } }
    ) {
      boolean
    }
  }
`;
// Get Template By Group Id
export const GET_TEMPLATE_BY_GROUP_ID = gql`
  query getTemplateByGroupId($groupId: Long!) {
    templateByGroupId(getTemplateByGroupIdQuery: { groupId: $groupId }) {
      details
      id
      image
      orientationType
      templateAr
      templateEn
    }
  }
`;