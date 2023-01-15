import { gql } from "@apollo/client";

export const ADD_EMPLOYEE_TO_SHOP = gql`
  mutation CreateShopUser($userId: ID!, $shopId: ID!, $role: String!) {
    createShopUser(userId: $userId, shopId: $shopId, role: $role) {
      role
    }
  }
`;
