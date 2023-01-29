import { gql } from "@apollo/client";

const CREATE_POINT_OF_SELL = gql`
  mutation CreatePointOfSell($name: String!) {
    createPointOfSell(name: $name) {
      id
      name
    }
  }
`;
export default CREATE_POINT_OF_SELL;
