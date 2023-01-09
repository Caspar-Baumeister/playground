import { gql } from "@apollo/client";

export const TICKETS_BY_SHOP_ID = gql`
  query TicketsByShopId($shopId: ID!) {
    ticketsByShopId(shopId: $shopId) {
      id
      date
      responsibleUser {
        id
        name
      }
      status
      startMoney
      endMoney
      startComment
      endComment
      pos {
        name
        id
      }
      shopId
      createdAt
      updatedAt
    }
  }
`;

export const TICKET_PRODUCTS = gql`
  query TicketProducts($ticketId: ID!) {
    ticketProducts(ticketId: $ticketId) {
      startAmount
      endAmount
      product {
        amountType
        price
        name
        id
      }
    }
  }
`;
