import 'package:playground_app/models/product_model.dart';

class TicketProduct {
  num? startAmount;
  num? endAmount;
  int? productId;
  int? ticketId;
  Product? product;

  TicketProduct(
      {this.startAmount, this.endAmount, this.productId, this.product});

  TicketProduct.fromJson(Map<String, dynamic> json) {
    startAmount = json['startAmount'];
    endAmount = json['endAmount'];
    productId = json['productId'];
    ticketId = json['ticketId'];
    product =
        json['product'] != null ? Product.fromJson(json['product']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['startAmount'] = startAmount;
    data['endAmount'] = endAmount;
    data['productId'] = productId;
    data['ticketId'] = ticketId;
    if (product != null) {
      data['product'] = product!.toJson();
    }
    return data;
  }
}
