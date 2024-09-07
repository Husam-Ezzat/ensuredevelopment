import { gql } from '@apollo/client';

export const GET_TRAINEES_BY_GROUP_ID = gql`
  query traineeByGroupId($groupId: Long!, $pageNumber: Int!, $pageSize: Int!) {
  traineeByGroupId(
    getTraineeByGroupIdQuery: { 
      groupId: $groupId, 
      paginatedRequest: { 
        pageNumber: $pageNumber, 
        pageSize: $pageSize 
      } 
    }
  ) {
    groupDetails {
    courseName
      dateRejectionReason
      groupId
      groupName
      groupRejectionReason
      groupStatus
      personRejectionReason
      templateDetails
    }
    traineeDetails {
      currentPage
      hasNextPage
      hasPreviousPage
      pageSize
      totalCount
      totalPages
      data {
        courseName
        dateRejectionReason
        email
        firstName
        fullName
        groupId
        groupName
        groupRejectionReason
        groupStatus
        id
        lastName
        midName
        personRejectionReason
        phoneNumber
        score
        scoreTypeId
        templateDetails
        thirdName
      }
    }
  }
}
`;

// UPLOAD TRAINEES MUTATION
export const UPLOAD_TRAINEES = gql`
  mutation uploadTrainees(
    $email: String!
    $firstName: String!
    $fullName: String!
    $lastName: String!
    $midName: String!
    $phoneNumber: String!
    $thirdName: String!
    $traineeGroupId: Long!
  ) {
    uploadTrainees(
      input: {
        uploadTraineesCommand: {
          addTrainees: {
            email: $email
            firstName: $firstName
            fullName: $fullName
            lastName: $lastName
            midName: $midName
            phoneNumber: $phoneNumber
            thirdName: $thirdName
            traineeGroupId: $traineeGroupId
          }
        }
      }
    ) {
       getTraineeByGroupIdResult {
      groupDetails {
        courseName
        dateRejectionReason
        groupId
        groupName
        groupRejectionReason
        groupStatus
        personRejectionReason
        templateDetails
      }
      traineeDetails {
        currentPage
        hasNextPage
        hasPreviousPage
        messages
        pageSize
        succeeded
        totalCount
        totalPages
         data {
          courseName
          dateRejectionReason
          email
          firstName
          fullName
          groupId
          groupName
          groupRejectionReason
          groupStatus
          id
          lastName
          midName
          personRejectionReason
          phoneNumber
          score
          scoreTypeId
          templateDetails
          thirdName
        }
      }
    }
    }
  }
`;

// DELETE TRAINEE MUTATION
export const DELETE_TRAINEE = gql`
  mutation deleteTrainee($id: Long!) {
    deleteTrainee(input: { id: $id }) {
      boolean
    }
  }
`;

// UPDATE TRAINEE MUTATION
export const UPDATE_TRAINEE = gql`
  mutation updateTrainee(
    $id: Long!
    $email: String!
    $firstName: String!
    $fullName: String!
    $lastName: String!
    $midName: String!
    $phoneNumber: String!
    $thirdName: String!
    $traineeGroupId: Long!
  ) {
    updateTrainee(
      input: {
        updateTraineeCommand: {
          id: $id
          email: $email
          firstName: $firstName
          fullName: $fullName
          lastName: $lastName
          midName: $midName
phoneNumber: $phoneNumber
thirdName: $thirdName
traineeGroupId: $traineeGroupId
}
}
) {
boolean
}
}
`;