class User {
  String name;
  String email;
  num id;
  String shopName;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.shopName,
  });

  factory User.fromJson(dynamic json) {
    return User(
      id: json['id'],
      email: json["email"],
      name: json["name"],
      shopName: json["shop"]["name"],
    );
  }
}
