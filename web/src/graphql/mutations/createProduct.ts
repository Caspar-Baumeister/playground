import { gql } from "@apollo/client";

const CREATE_PRODUCT = gql`
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
export default CREATE_PRODUCT;
