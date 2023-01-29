import 'package:jwt_decode/jwt_decode.dart';
import 'package:playground_app/graphql/login_api.dart';
import 'package:playground_app/preferences/login_credentials_preferences.dart';

class AuthProvider {
  static String? token;

  static bool isTokenExpired() {
    if (token == null) {
      return true;
    }
    final DateTime? expirationDate = Jwt.getExpiryDate(token!)?.toLocal();
    if (expirationDate != null) {
      return expirationDate.difference(DateTime.now()) <
          const Duration(minutes: 1);
    } else {
      return false;
    }
  }

  static Future<String?> fetchToken() async {
    // if the token is expired, there is no token or there are no valid credentials, return null
    // otherwise if neccessary, fetch a new token and/or return the valid token
    if (isTokenExpired()) {
      String? email = CredentialPreferences.getEmail();
      String? password = CredentialPreferences.getPassword();
      print("credentials inside fetchToken");
      print(email);
      print(password);
      if (email == null || password == null) {
        return null;
      }
      dynamic response = await loginApi(email, password);

      if (response?["data"]?["login"]?["accessToken"] != null) {
        token = response["data"]["login"]["accessToken"];
      }
    }
    return token;
  }
}
