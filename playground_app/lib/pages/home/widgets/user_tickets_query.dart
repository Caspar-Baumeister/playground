import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:playground_app/graphql/queries/ticket.dart';
import 'package:playground_app/pages/selling_process_ticket/selling_process_ticket.dart';
import 'package:playground_app/provider/user_provider.dart';
import 'package:provider/provider.dart';

class UserTicketsQuery extends StatelessWidget {
  const UserTicketsQuery({super.key});

  @override
  Widget build(BuildContext context) {
    UserProvider userProvider = Provider.of<UserProvider>(context);
    return userProvider.activeUser != null
        ? Query(
            options: QueryOptions(
              document: gql(
                  ticketsByShopIdAndUserId), // this is the query string you just created
              variables: {
                'shopId': 2, //userProvider.activeUser.shopId,
                'userId': userProvider.activeUser!.id,
              },
              pollInterval: const Duration(seconds: 10),
            ),
            // Just like in apollo refetch() could be used to manually trigger a refetch
            // while fetchMore() can be used for pagination purpose
            builder: (QueryResult result,
                {VoidCallback? refetch, FetchMore? fetchMore}) {
              if (result.hasException) {
                print(result.exception.toString());
                return Text(result.exception.toString());
              }

              if (result.isLoading) {
                return const Text('Loading');
              }

              List? tickets = result.data?['ticketsByShopIdAndUserId'];

              if (tickets == null) {
                return const Text('No tickets');
              }

              return Padding(
                padding: const EdgeInsets.all(8.0),
                child: ListView.builder(
                    itemCount: tickets.length,
                    itemBuilder: (context, index) {
                      final ticket = tickets[index];

                      return ListTile(
                        onTap: () => Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: ((context) =>
                                  SellingProcessTicket(ticket: ticket))),
                        ),
                        title: Text(ticket['pos']?["name"] ?? ''),
                        subtitle: Text(ticket["date"]),
                        trailing: Text(ticket['status'].toString()),
                      );
                    }),
              );
            },
          )
        : Container();
  }
}
