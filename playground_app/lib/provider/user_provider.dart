import 'package:flutter/material.dart';
import 'package:playground_app/graphql/me_api.dart';
import 'package:playground_app/models/user_model.dart';

class UserProvider extends ChangeNotifier {
  User? activeUser;

  Future<bool> setUserFromToken(String? token) async {
    if (token == "" || token == null) {
      activeUser = null;
      return false;
    }

    final response = await meApi(token);

    if (response["data"]?["me"] == null) {
      return false;
    }
    Map user = response["data"]["me"];
    if (user["id"] == null || user["name"] == null) {
      return false;
    }
    activeUser = User.fromJson(user);

    notifyListeners();
    return true;
  }
}
