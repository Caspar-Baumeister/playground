String ticketsByShopIdAndUserId = """
query ticketsByShopIdAndUserId(\$shopId: ID!, \$userId: ID!) {
    ticketsByShopIdAndUserId(shopId: \$shopId,userId: \$userId) {
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
      product {
        amountType
        price
        name
        id
      }
    }
  }""";
