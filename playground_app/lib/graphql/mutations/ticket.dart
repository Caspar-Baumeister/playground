String updateTicket = """
mutation updateTicket(
  \$id: ID!
  \$responsibleUserId: ID
  \$status: Float
  \$startMoney: Float
  \$endMoney: Float
  \$startComment: String
  \$midComment: String
  \$endComment: String
  \$posId: ID
) {
  updateTicket(
    id: \$id
    responsibleUserId: \$responsibleUserId
    status: \$status
    startMoney: \$startMoney
    endMoney: \$endMoney
    startComment: \$startComment
    midComment: \$midComment
    endComment: \$endComment
    posId: \$posId
  ) {
    id
  }
}
""";

String updateTicketProductsOfTicket = """
mutation updateTicketProductsOfTicket(
  \$productIds: [ID!]!
  \$ticketId: ID!
  \$endAmounts: [Float!]!
  
) {
  updateTicketProductsOfTicket(
    productIds: \$productIds
    ticketId: \$ticketId
    endAmounts: \$endAmounts
  ) 
}
""";
