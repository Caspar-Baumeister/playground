import 'package:flutter/material.dart';
import 'package:playground_app/graphql/login_api.dart';
import 'package:playground_app/pages/home/home.dart';
import 'package:playground_app/preferences/login_credentials_preferences.dart';
import 'package:playground_app/provider/user_provider.dart';
import 'package:playground_app/utiles/text_styles.dart';
import 'package:playground_app/widgets/buttons/standart_button.dart';
import 'package:playground_app/widgets/text_fields/standart_text_field.dart';
import 'package:provider/provider.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  bool loading = false;
  String error = '';

  late TextEditingController emailController;
  late TextEditingController passwordController;

  @override
  void initState() {
    emailController = TextEditingController(text: "a@b.de");
    passwordController = TextEditingController(text: "penis123");
    super.initState();
  }

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          // mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const SizedBox(height: 10),
            Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Center(
                      child: Text(
                    "Welcome back",
                    style: SUB_TITLE,
                  )),
                  const SizedBox(height: 20),
                  StandartTextField(
                      hintText: "Username", controller: emailController),
                  const SizedBox(height: 15),
                  StandartTextField(
                      hintText: "Password", controller: passwordController),
                  const SizedBox(height: 20),
                  StandartButton(
                    text: "Einloggen",
                    onPressed: () => onSignin(),
                    isFilled: true,
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  // triggert when login is pressed
  void onSignin() async {
    setState(() {
      error = '';
      loading = true;
    });

    // get the token trough the credentials
    // (invalid credentials) return false
    dynamic response =
        await loginApi(emailController.text, passwordController.text);

    if (response?["data"]?["login"]?["errors"] != null) {
      setState(() {
        error = response["data"]["login"]["errors"][0].toString();
        loading = false;
        return;
      });
    }

    if (response?["data"]?["login"]?["accessToken"] == null) {
      setState(() {
        error = "Unexpected error, no accessToken";
        loading = false;
        return;
      });
    }
    String token = response["data"]["login"]["accessToken"];

    print("response after login");
    print(response);
    print(token);

    // safe the credentials to shared preferences
    CredentialPreferences.setEmail(emailController.text);
    CredentialPreferences.setPassword(passwordController.text);

    // safe the user to provider
    await Provider.of<UserProvider>(context, listen: false)
        .setUserFromToken(token);

    // send to UserCommunities
    Navigator.of(context)
        .push(MaterialPageRoute(builder: (context) => const Home()));

    setState(() {
      loading = false;
    });
  }
}
