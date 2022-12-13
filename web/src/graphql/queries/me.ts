import { gql } from "@apollo/client";

const ME_QUERY = gql`
  query {
    me {
      _id
    }
  }
`;

export default ME_QUERY;
