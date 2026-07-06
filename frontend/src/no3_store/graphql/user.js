import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query {
    users {
      id
      username
      age
      email
      city
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      tokenType
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: UserInputType!) {
    createUser(input: $input) {
      id
      username
      age
      email
      city
    }
  }
`;

export const GET_ME = gql`
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