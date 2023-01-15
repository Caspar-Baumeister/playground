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
  query ShopWithUsers($shopId: ID!) {
    shopWithUsers(shopId: $shopId) {
      users {
        user {
          name
          id
        }
      }
      creator {
        name
        id
      }
    }
  }
`;
