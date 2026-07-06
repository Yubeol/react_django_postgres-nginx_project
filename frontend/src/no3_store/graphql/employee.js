import { gql } from '@apollo/client';

export const GET_EMPLOYEES = gql`
  query {
    employees {
      id
      name
      email
      job
      pay
    }
  }
`;

export const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployee($id: Int!) {
    employee(id: $id) {
      id
      name
      email
      job
      pay
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($input: EmployeeInputGQL!) {
    createEmployee(input: $input) {
      id
      name
      email
      job
      pay
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: Int!, $input: EmployeeInputGQL!) {
    updateEmployee(id: $id, input: $input) {
      id
      name
      email
      job
      pay
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: Int!) {
    deleteEmployee(id: $id)
  }
`;