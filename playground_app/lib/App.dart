import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:playground_app/pages/authentication/login_wrapper.dart';
import 'package:playground_app/provider/user_provider.dart';
import 'package:playground_app/utiles/theme.dart';
import 'package:provider/provider.dart';

class App extends StatelessWidget {
  const App({Key? key, required this.client}) : super(key: key);

  final ValueNotifier<GraphQLClient> client;

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => UserProvider()),
      ],
      child: GraphQLProvider(
        client: client,
        child: MaterialApp(
          debugShowCheckedModeBanner: false,
          theme: MyThemes.getThemeFromKey(MyThemeKeys.LIGHT),
          home: const LogginWrapper(),
        ),
      ),
    );
  }
}
