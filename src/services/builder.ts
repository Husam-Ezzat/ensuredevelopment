import { gql } from "@apollo/client";


export const GENERATE_TEMPLATE_BY_GROUP_ID = gql`
mutation AddCertificateGenerator($details: JSON, $groupId: Long!, $name: String!) {
  addCertificateGenerator(input: { addCertificateGeneratorCommand: { details: $details, groupId: $groupId, name: $name } }) {
    boolean
  }
}`;