import { gql } from "@apollo/client";

const CREATE_TAG = gql`
  mutation createTag($name: String!, $shopId: Float!, $description: String) {
    createTag(name: $name, description: $description, shopId: $shopId) {
      id
      name
    }
  }
`;
export default CREATE_TAG;
