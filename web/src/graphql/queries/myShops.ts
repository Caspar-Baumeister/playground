import { gql } from "@apollo/client";

const MY_SHOPS = gql`
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

export default MY_SHOPS;
