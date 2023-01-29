import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:playground_app/graphql/queries/ticket.dart';
import 'package:playground_app/models/ticket_model.dart';
import 'package:playground_app/models/ticket_product_model.dart';
import 'package:playground_app/pages/ticket_page/status_bodies/0_tickets_body.dart';
import 'package:playground_app/pages/ticket_page/status_bodies/1_tickets_body.dart';

class TicketProductQuery extends StatelessWidget {
  const TicketProductQuery({super.key, required this.ticket});

  final Ticket ticket;

  @override
  Widget build(BuildContext context) {
    return Query(
      options: QueryOptions(
        document:
            gql(ticketProducts), // this is the query string you just created
        variables: {'ticketId': ticket.id},
        pollInterval: const Duration(seconds: 10),
      ),
      builder: (QueryResult result,
          {VoidCallback? refetch, FetchMore? fetchMore}) {
        if (result.hasException) {
          print(result.exception.toString());
          return Text(result.exception.toString());
        }

        if (result.isLoading) {
          return const Text('Loading');
        }

        List<TicketProduct> ticketProducts = [];

        if (result.data?['ticketProducts'] != null &&
            result.data?['ticketProducts'].isNotEmpty) {
          ticketProducts = List<TicketProduct>.from(result
              .data!['ticketProducts']
              .map((json) => TicketProduct.fromJson(json)));
        } else {
          return const Text('No products');
        }

        if (ticket.status == 1) {
          return OneTicketsBody(ticketProducts: ticketProducts, ticket: ticket);
        }

        return ZeroTicketsBody(
          ticketProducts: ticketProducts,
          ticket: ticket,
        );
      },
    );
  }
}
