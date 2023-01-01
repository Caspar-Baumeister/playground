import { gql } from "@apollo/client";

const ME_QUERY = gql`
  query {
    me {
      id
    }
  }
`;

export default ME_QUERY;
