import 'package:flutter/material.dart';
import 'package:playground_app/pages/home/widgets/user_tickets_query.dart';
import 'package:playground_app/provider/user_provider.dart';
import 'package:provider/provider.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: const [
          Center(
              child: Padding(
            padding: EdgeInsets.only(right: 8.0),
            child: Text("Alpine Feinkost"),
          ))
        ],
        title: Consumer<UserProvider>(
            builder: ((context, userProvider, child) =>
                Text(userProvider.activeUser?.name.toString() ?? ""))),
        centerTitle: false,
        automaticallyImplyLeading: false,
      ),
      body: const SafeArea(
        child: UserTicketsQuery(),
      ),
    );
  }
}
