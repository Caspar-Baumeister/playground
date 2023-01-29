import { gql } from "@apollo/client";

export const MY_SHOPS = gql`
  query MyShops {
    myShops {
      id
      name
      creatorId
      createdAt
      updatedAt
    }
  }
`;

export const SHOP_WITH_USERS = gql`
  query {
    shopWithUsers {
      users {
        id
        email
        name
        role
      }
    }
  }
`;
