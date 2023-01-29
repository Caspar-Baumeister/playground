class Product {
  int? id;
  int? amountType;
  double? price;
  String? name;
  num? amount;
  String? updatedAt;
  String? description;

  Product(
      {this.id,
      this.amountType,
      this.price,
      this.name,
      this.amount,
      this.description,
      this.updatedAt});

  Product.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    amountType = json['amountType'];
    price = json['price'];
    name = json['name'];
    amount = json['amount'];
    description = json['description'];
    updatedAt = json['updatedAt'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['amountType'] = amountType;
    data['price'] = price;
    data['name'] = name;
    data['amount'] = amount;
    data['description'] = description;
    data['updatedAt'] = updatedAt;
    return data;
  }
}
