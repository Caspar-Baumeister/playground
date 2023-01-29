import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:playground_app/graphql/queries/ticket.dart';
import 'package:playground_app/models/ticket_model.dart';
import 'package:playground_app/pages/ticket_page/ticket_page.dart';
import 'package:playground_app/provider/user_provider.dart';
import 'package:playground_app/utiles/helper_functions.dart';
import 'package:playground_app/utiles/text_styles.dart';
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
                  ticketsOfUser), // this is the query string you just created

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

              List<Ticket>? tickets = [];

              if (result.data?['ticketsOfUser'] != null &&
                  result.data?['ticketsOfUser'].isNotEmpty) {
                tickets = List<Ticket>.from(result.data!['ticketsOfUser']
                    .map((ticketJson) => Ticket.fromJson(ticketJson)));
              } else {
                return const Text('No tickets');
              }

              return Padding(
                padding: const EdgeInsets.all(8.0),
                child: ListView.builder(
                    itemCount: tickets.length,
                    itemBuilder: (context, index) {
                      final ticket = tickets![index];

                      return ListTile(
                        onTap: () => Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: ((context) =>
                                  TicketPage(ticket: ticket))),
                        ),
                        title: Text(
                          ticket.pos!.name!,
                          style: SUB_TITLE,
                        ),
                        subtitle: Text(
                          readableTimeString(ticket.date!),
                          style: SUB_TITLE,
                        ),
                        trailing: Container(
                          decoration: BoxDecoration(
                            borderRadius:
                                const BorderRadius.all(Radius.circular(20)),
                            color: statusToColor(ticket.status!),
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              statusToString(ticket.status!),
                              style: SMALL_TEXT,
                            ),
                          ),
                        ),
                      );
                    }),
              );
            },
          )
        : Container();
  }
}
