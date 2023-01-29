import { gql } from "@apollo/client";

export const ADD_EMPLOYEE_TO_SHOP = gql`
  mutation CreateShopUser($userId: ID!, $shopId: ID!, $role: String!) {
    createShopUser(userId: $userId, shopId: $shopId, role: $role) {
      role
    }
  }
`;

export const REGISTER = gql`
  mutation register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      accessToken
      errors {
        field
        message
      }
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation addEmployee(
    $name: String!
    $email: String!
    $password: String!
    $role: Float!
  ) {
    addEmployee(name: $name, email: $email, password: $password, role: $role) {
      accessToken
      errors {
        field
        message
      }
    }
  }
`;
