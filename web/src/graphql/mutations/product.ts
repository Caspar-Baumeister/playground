import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $tags: [ID!]
    $shopId: Float!
    $amountType: Float!
    $amount: Float!
    $price: Float!
    $name: String!
  ) {
    createProduct(
      shopId: $shopId
      price: $price
      amountType: $amountType
      amount: $amount
      name: $name
      tags: $tags
    ) {
      name
      price
      tags {
        name
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $tags: [ID!]
    $id: ID!
    $amount: Float!
    $amountType: Float!
    $price: Float!
    $name: String!
  ) {
    updateProduct(
      id: $id
      name: $name
      amount: $amount
      amountType: $amountType
      tags: $tags
      price: $price
    ) {
      name
      amountType
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;
