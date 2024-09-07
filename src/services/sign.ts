import { gql } from '@apollo/client';

// Get all signatures
export const GET_SIGNATURE_LIST = gql`
  query {
    signatureList {
      id
      imageUrl
      nameAr
      nameEn
    }
  }
`;

// Add new signature
export const ADD_SIGNATURE = gql`
  mutation AddSignature($imageUrl: String!, $nameAr: String!, $nameEn: String!) {
    addSignature(
      input: { addSignatureCommand: { imageUrl: $imageUrl, nameAr: $nameAr, nameEn: $nameEn } }
    ) {
      boolean
    }
  }
`;