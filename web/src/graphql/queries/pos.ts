import { gql } from "@apollo/client";

const POS_OF_SHOP = gql`
  query {
    posOfShop {
      id
      name
    }
  }
`;

export default POS_OF_SHOP;
