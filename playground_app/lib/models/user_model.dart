class User {
  String name;
  String email;
  String id;

  User({
    required this.id,
    required this.name,
    required this.email,
  });

  factory User.fromJson(dynamic json) {
    return User(
      id: json['id'],
      email: json["email"],
      name: json["name"],
    );
  }
}
