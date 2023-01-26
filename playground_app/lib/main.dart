import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:playground_app/App.dart';
import 'package:playground_app/preferences/login_credentials_preferences.dart';
import 'package:playground_app/provider/auth_provider.dart';
import 'package:playground_app/utiles/urls.dart';

void main() async {
  // We're using HiveStore for persistence,
  // so we need to initialize Hive.
  await initHiveForFlutter();

  final HttpLink httpLink = HttpLink(
    'http://$DATABASE_HOST/$UNENCODED_PATH',
    //     defaultHeaders: {
    //   'Authorization': 'Bearer $YOUR_PERSONAL_ACCESS_TOKEN',
    // }
  );
  await CredentialPreferences.init();
  final AuthLink authLink = AuthLink(
    getToken: () async {
      String? token = await AuthProvider.fetchToken();
      return 'Bearer $token';
    },
  );

  final Link link = authLink.concat(httpLink);

  ValueNotifier<GraphQLClient> client = ValueNotifier(
    GraphQLClient(
      link: link,
      // The default store is the InMemoryStore, which does NOT persist to disk
      cache: GraphQLCache(store: HiveStore()),
    ),
  );

  return runApp(App(client: client));
}
