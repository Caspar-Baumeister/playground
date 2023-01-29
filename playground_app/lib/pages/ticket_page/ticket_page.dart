import 'package:flutter/material.dart';
import 'package:playground_app/models/ticket_model.dart';
import 'package:playground_app/pages/ticket_page/ticket_product_query.dart';
import 'package:playground_app/utiles/helper_functions.dart';

class TicketPage extends StatelessWidget {
  const TicketPage({super.key, required this.ticket});

  final Ticket ticket;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "${ticket.pos!.name!} - ${readableTimeString(ticket.date!)}",
        ),
        centerTitle: false,
        automaticallyImplyLeading: true,
      ),
      body: SafeArea(child: TicketProductQuery(ticket: ticket)),
    );
  }
}
