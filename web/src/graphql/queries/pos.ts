import { gql } from "@apollo/client";

const POS_BY_SHOP_ID = gql`
  query PosByShopId($shopId: Float!) {
    posByShopId(shopId: $shopId) {
      id
      name
    }
  }
`;

export default POS_BY_SHOP_ID;
