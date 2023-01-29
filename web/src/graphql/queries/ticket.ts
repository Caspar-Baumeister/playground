import { gql } from "@apollo/client";

export const TICKETS_OF_SHOP = gql`
  query {
    ticketsOfShop {
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
