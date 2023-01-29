import 'dart:convert';
import 'package:http/http.dart';
import 'package:playground_app/graphql/queries/user.dart';
import 'package:playground_app/utiles/urls.dart';

Future meApi(String token) async {
  Uri uri = Uri.http(DATABASE_HOST, UNENCODED_PATH);
  try {
    final response = await post(uri,
        headers: {
          'content-type': 'application/json',
          'authorization': 'bearer $token'
        },
        body: json.encode({'query': meQuery}));

    return jsonDecode(response.body.toString());
  } catch (e) {
    print(e.toString());
  }
  return null;
}
