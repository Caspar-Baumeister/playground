import 'package:flutter/material.dart';
import 'package:playground_app/pages/authentication/login_page.dart';
import 'package:playground_app/pages/home/home.dart';
import 'package:playground_app/pages/utiles_pages/error_page.dart';
import 'package:playground_app/pages/utiles_pages/loading_page.dart';
import 'package:playground_app/provider/auth_provider.dart';
import 'package:playground_app/provider/user_provider.dart';
import 'package:provider/provider.dart';

class LogginWrapper extends StatefulWidget {
  const LogginWrapper({Key? key}) : super(key: key);

  // checkes if there are credentials
  // sends a login request with the credentials
  // updates the user provider or sends to login

  @override
  State<LogginWrapper> createState() => _LogginWrapperState();
}

class _LogginWrapperState extends State<LogginWrapper> {
  bool? credentials;
  Future<void>? initCredentials;

  @override
  void initState() {
    super.initState();
    initCredentials = _initCredentials();
  }

  Future<void> _initCredentials() async {
    credentials = await checkCredentials();
    return;
  }

  Future<void> _refreshCredentials() async {
    final value = await checkCredentials();
    setState(() {
      credentials = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: initCredentials,
      builder: ((context, snapshot) {
        if (snapshot.hasError) {
          return ErrorPage(error: "loggin_wrapper error: ${snapshot.error}");
        }
        if (snapshot.connectionState == ConnectionState.done) {
          if (credentials != true) {
            return const LoginPage();
          }
          return const Home();
        } else if (snapshot.connectionState == ConnectionState.waiting) {
          return LoadingPage(onRefresh: _refreshCredentials);
        }
        return ErrorPage(
            error: "connectionState: ${snapshot.connectionState.toString()}");
      }),
    );
  }

  Future<bool> checkCredentials() async {
    // try to get an existing or new token
    String? token = await AuthProvider.fetchToken();
    if (token == null) {
      return false;
    }
    // if success, fetch the user and go to home
    await Provider.of<UserProvider>(context, listen: false)
        .setUserFromToken(token);
    return true;
  }
}
