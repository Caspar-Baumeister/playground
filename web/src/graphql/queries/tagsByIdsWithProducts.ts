import { gql } from "@apollo/client";

const TAGS_BY_IDS = gql`
  query TagsByIdsWithProducts($ids: [ID!]!, $shopId: Float!) {
    tagsByIdsWithProducts(ids: $ids, shopId: $shopId) {
      name
      id
      products {
        id
        name
        amount
        price
        amountType
        updatedAt
        tags {
          id
          name
        }
      }
    }
  }
`;

export default TAGS_BY_IDS;
