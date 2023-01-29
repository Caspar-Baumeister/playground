import { gql } from "@apollo/client";

const TAGS_OF_SHOP = gql`
  query {
    tagsByShopId {
      id
      name
    }
  }
`;

export default TAGS_OF_SHOP;
