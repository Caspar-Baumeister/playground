import { gql } from "@apollo/client";

const TAGS_BY_SHOP_ID = gql`
  query TagsByShopId($shopId: Float!) {
    tagsByShopId(shopId: $shopId) {
      id
      name
    }
  }
`;

export default TAGS_BY_SHOP_ID;
