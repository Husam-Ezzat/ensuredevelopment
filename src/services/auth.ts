import { gql } from '@apollo/client';


// Login User

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(
      input: { signInCommand: { email: $email, password: $password } }
    ) {
      signInResponse {
        accessToken
        refreshToken {
          expireAt
          tokenString
          userName
        }
      }
    }
  }
`;