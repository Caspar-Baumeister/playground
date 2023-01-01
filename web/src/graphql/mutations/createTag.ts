import { gql } from "@apollo/client";

const CREATE_TAG = gql`
  mutation createProduct(
    $name: String!
    $shopId: Float!
    $description: String
  ) {
    createTag(name: $name, description: $description, shopId: $shopId) {
      id
      name
    }
  }
`;
export default CREATE_TAG;
