import { gql } from "@apollo/client";

const MY_SHOPS = gql`
  query MyShops($limit: Int!) {
    myShops(limit: $limit) {
      id
      name
      creatorId
      createdAt
      updatedAt
    }
  }
`;

export default MY_SHOPS;
