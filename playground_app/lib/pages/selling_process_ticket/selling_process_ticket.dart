import 'package:flutter/material.dart';
import 'package:playground_app/pages/selling_process_ticket/widget/selling_process_tickets_query.dart';

class SellingProcessTicket extends StatelessWidget {
  const SellingProcessTicket({super.key, required this.ticket});

  final dynamic ticket;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(ticket["pos"]["name"] + " / " + ticket["date"]),
        centerTitle: false,
        automaticallyImplyLeading: true,
      ),
      body: SafeArea(child: SellingProcessTicketsQuery(ticket: ticket)),
    );
  }
}
