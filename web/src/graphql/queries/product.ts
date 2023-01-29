import { gql } from "@apollo/client";

export const PRODUCTS_OF_SHOP = gql`
  query {
    productsOfShop {
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

export default PRODUCTS_OF_SHOP;
