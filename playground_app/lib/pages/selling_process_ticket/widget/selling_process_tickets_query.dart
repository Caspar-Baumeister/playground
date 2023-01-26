import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:playground_app/graphql/queries/ticket.dart';
import 'package:playground_app/pages/selling_process_ticket/widget/selling_process_tickets_body.dart';

class SellingProcessTicketsQuery extends StatelessWidget {
  const SellingProcessTicketsQuery({super.key, this.ticket});

  final dynamic ticket;

  @override
  Widget build(BuildContext context) {
    return Query(
      options: QueryOptions(
        document:
            gql(ticketProducts), // this is the query string you just created
        variables: {'ticketId': ticket["id"]},
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

        List? ticketProducts = result.data?['ticketProducts'];

        if (ticketProducts == null) {
          return const Text('No products');
        }

        return SellingProcessTicketsBody(
          ticketProducts: ticketProducts,
          ticket: ticket,
        );
      },
    );
  }
}
