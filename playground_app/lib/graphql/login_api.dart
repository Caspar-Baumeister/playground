import 'dart:convert';
import 'package:http/http.dart';
import 'package:playground_app/utiles/urls.dart';

Future loginApi(String email, String password) async {
  Uri uri = Uri.http(DATABASE_HOST, UNENCODED_PATH);
  try {
    final response = await post(uri,
        headers: {
          'content-type': 'application/json',
        },
        body: json.encode({
          'query': """mutation {
            login(email: "$email", password: "$password") {
              errors {
                field
                message
              }
              accessToken
            }
          }"""
        }));

    return jsonDecode(response.body.toString());
  } catch (e) {
    print(e.toString());
  }
  return null;
}
