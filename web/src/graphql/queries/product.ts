import { gql } from "@apollo/client";

export const PRODUCTS_BY_SHOP_ID = gql`
  query ProductsByShopId($shopId: Float!) {
    productsByShopId(shopId: $shopId) {
      name
      id
      shopId
      amount
      amountType
      price
      updatedAt
      tags {
        id
        name
      }
    }
  }
`;

export const PRODUCT = gql`
  query Product($id: Float!) {
    product(id: $id) {
      name
      id
      shopId
      amount
      amountType
      price
      updatedAt
      tags {
        id
        name
      }
    }
  }
`;

export default PRODUCTS_BY_SHOP_ID;
