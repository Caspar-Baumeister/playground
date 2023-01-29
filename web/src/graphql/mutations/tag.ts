import { gql } from "@apollo/client";

const CREATE_TAG = gql`
  mutation createTag($name: String!, $description: String) {
    createTag(name: $name, description: $description) {
      id
      name
    }
  }
`;
export default CREATE_TAG;
