import 'package:flutter/material.dart';
import 'package:playground_app/pages/home/widgets/user_tickets_query.dart';
import 'package:playground_app/provider/user_provider.dart';
import 'package:playground_app/utiles/text_styles.dart';
import 'package:provider/provider.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: [
          PopupMenuButton(
            offset: const Offset(0, 45),
            color: Colors.white,
            itemBuilder: (BuildContext context) => <PopupMenuEntry>[
              PopupMenuItem(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 0),
                onTap: () {
                  Navigator.of(context).pop();
                  // logout
                },
                child: const ListTile(
                  visualDensity: VisualDensity.compact,
                  minVerticalPadding: 0,
                  contentPadding: EdgeInsets.all(0),
                  title: Text(
                    'Ausloggen',
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
            ],
            // visualDensity: VisualDensity.compact,
            padding: const EdgeInsets.all(0),
            // onPressed: () {},
            icon: const Icon(
              Icons.more_vert,
              color: Colors.white,
            ),
          )
        ],
        title: Consumer<UserProvider>(
          builder: ((context, userProvider, child) => Text(
                "${userProvider.activeUser?.name.toString()} - ${userProvider.activeUser?.shopName.toString()}",
                style: STANDART_TEXT,
              )),
        ),
        centerTitle: false,
        automaticallyImplyLeading: false,
      ),
      body: const SafeArea(
        child: UserTicketsQuery(),
      ),
    );
  }
}
