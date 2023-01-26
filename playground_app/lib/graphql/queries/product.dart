String productsByShopId = """
   query ProductsByShopId(\$shopId: Float!) {
    productsByShopId(shopId: \$shopId) {
      name
      id
      shopId
      amount
      amountType
      price
      updatedAt
      tags {
        id
        name
      }
    }
  }
""";

String productQuery = """
query product(\$id: Float!) {
    product(id: \$id) {
      id
      name
      price
      amount
      amountType
      tags {
        id
        name
        description
      }
    }
  }
""";
