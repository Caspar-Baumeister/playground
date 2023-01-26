import { gql } from "@apollo/client";

export const CREATE_TICKET = gql`
  mutation CreateTicket(
    $startComment: String
    $date: DateTime!
    $status: Float!
    $shopId: ID!
    $posId: ID!
    $responsibleUserId: ID!
    $startMoney: Float!
  ) {
    createTicket(
      startComment: $startComment
      date: $date
      posId: $posId
      status: $status
      shopId: $shopId
      responsibleUserId: $responsibleUserId
      startMoney: $startMoney
    ) {
      id
    }
  }
`;

export const CREATE_TICKET_PRODUCTS = gql`
  mutation CreateTicketProducts(
    $productIds: [ID!]!
    $ticketId: ID!
    $startAmounts: [Float!]!
  ) {
    createTicketProducts(
      productIds: $productIds
      ticketId: $ticketId
      startAmounts: $startAmounts
    )
  }
`;
