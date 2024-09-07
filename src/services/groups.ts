import { gql } from "@apollo/client";


// Add Group 
export const ADD_GROUP = gql`
  mutation AddTraineeGroup($groupNameAr: String!, $groupNameEn: String!, $courseId: Long!) {
    addTraineeGroup(input: { addTraineeGroupCommand: { groupNameAr: $groupNameAr, groupNameEn: $groupNameEn, courseId: $courseId } }) {
      addTraineeGroupResult {
      courseId
      groupId
    }
    }
  }
`;

// get Trainee Group By Course Id
export const GET_TRAINEE_GROUP_BY_COURSE_ID = gql`
  query GetTraineeGroupByCourseId($courseId: Long!) {
    geTraineeGroupByCourseId(courseId: $courseId) {
   courseId
    courseName
    groupNameEn
    id
    status
    traineeNumbers
    templateDetails
    }
  }
`;

// Update Group
export const UPDATE_GROUP = gql`
  mutation UpdateTraineeGroup($courseId: Long!,$groupNameAr: String!, $groupNameEn: String!, $id: Long!) {
    updateTraineeGroup(input: { updateTraineeGroupCommand: { courseId:$courseId, groupNameAr: $groupNameAr, groupNameEn: $groupNameEn, id: $id } }) {
      boolean
    }
  }
`;

// Delete Group
export const DELETE_GROUP = gql`
  mutation DeleteTraineeGroup($groupId: Long!) {
    deleteTraineeGroup(groupId: $groupId) {
      boolean
    }
  }
`;