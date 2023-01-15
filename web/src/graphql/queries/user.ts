import { gql } from "@apollo/client";

export const USERS_WITH_SHOPS = gql`
  query UsersWithShops {
    usersWithShops {
      name
      id
      shopUsers {
        shop {
          id
          name
        }
      }
    }
  }
`;
