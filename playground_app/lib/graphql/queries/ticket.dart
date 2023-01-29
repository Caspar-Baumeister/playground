String ticketsOfUser = """
query {
    ticketsOfUser{
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
  }""";

String ticketProducts = """
query TicketProducts(\$ticketId: ID!) {
    ticketProducts(ticketId: \$ticketId) {
      startAmount
      endAmount
      productId
      product {
        amountType
        price
        name
        id
        amount
      }
    }
  }""";
