import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      tokenType
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      username
      age
      email
      city
    }
  }
`;