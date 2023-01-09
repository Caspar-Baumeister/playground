import { gql } from "@apollo/client";

const CREATE_POINT_OF_SELL = gql`
  mutation CreatePointOfSell($name: String!, $shopId: Float!) {
    createPointOfSell(name: $name, shopId: $shopId) {
      id
      name
    }
  }
`;
export default CREATE_POINT_OF_SELL;
