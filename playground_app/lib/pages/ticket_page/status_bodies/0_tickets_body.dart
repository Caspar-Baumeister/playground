import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:playground_app/graphql/mutations/ticket.dart';
import 'package:playground_app/models/ticket_model.dart';
import 'package:playground_app/models/ticket_product_model.dart';
import 'package:playground_app/pages/single_product_view/single_product_view.dart';
import 'package:playground_app/utiles/constants.dart';
import 'package:playground_app/utiles/text_styles.dart';
import 'package:playground_app/widgets/buttons/standart_button.dart';
import 'package:playground_app/widgets/input_fields/input_field.dart';

class ZeroTicketsBody extends StatefulWidget {
  const ZeroTicketsBody(
      {super.key, required this.ticketProducts, required this.ticket});

  final List<TicketProduct> ticketProducts;
  final Ticket ticket;

  @override
  State<ZeroTicketsBody> createState() => _ZeroTicketsBodyState();
}

class _ZeroTicketsBodyState extends State<ZeroTicketsBody> {
  late TextEditingController endCommentController;
  bool loading = false;

  @override
  void initState() {
    endCommentController = TextEditingController();
    super.initState();
  }

  @override
  void dispose() {
    endCommentController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Table(
            border: const TableBorder(
                horizontalInside: BorderSide(
              width: 1,
              color: Colors.grey,
              style: BorderStyle.solid,
            )),
            columnWidths: const {
              0: FractionColumnWidth(.5),
              3: FractionColumnWidth(.1),
            },
            children: [
              TableRow(
                  decoration:
                      const BoxDecoration(border: Border(bottom: BorderSide())),
                  children: [
                    const Text(
                      'Name',
                      style: SUB_TITLE,
                    ),
                    Container(
                      alignment: Alignment.centerRight,
                      child: const Text(
                        'Preis',
                        style: SUB_TITLE,
                      ),
                    ),
                    Container(
                        alignment: Alignment.centerRight,
                        child: const Text(
                          'Menge',
                          style: SUB_TITLE,
                        ))
                  ]),
              ...widget.ticketProducts.map((ticketProduct) {
                String type =
                    ticketProduct.product?.amountType == 1 ? "Kg " : "Stk";

                num? price = ticketProduct.product?.price;

                return TableRow(children: [
                  GestureDetector(
                    onTap: () => Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: ((context) => SingleProduct(
                              productId: ticketProduct.product!.id!,
                              productName: ticketProduct.product?.name))),
                    ),
                    child: Padding(
                      padding: EdgeInsets.symmetric(
                          vertical: TABLE_VERTICAL_PADDING),
                      child: Text(
                        ticketProduct.product!.name.toString(),
                        style: STANDART_TEXT,
                      ),
                    ),
                  ),
                  Padding(
                    padding:
                        EdgeInsets.symmetric(vertical: TABLE_VERTICAL_PADDING),
                    child: Container(
                      alignment: Alignment.centerRight,
                      child: Text(
                        "${price?.toStringAsFixed(2)}€",
                        style: STANDART_TEXT,
                      ),
                    ),
                  ),
                  Padding(
                    padding:
                        EdgeInsets.symmetric(vertical: TABLE_VERTICAL_PADDING),
                    child: Container(
                        alignment: Alignment.centerRight,
                        child: Text(
                          "${ticketProduct.startAmount} $type",
                          style: STANDART_TEXT,
                        )),
                  )
                ]);
              }),
            ],
          ),
          Container(
            alignment: Alignment.centerRight,
            padding: const EdgeInsets.all(8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                const Text(
                  "Wechselgeld:",
                  style: SUB_TITLE,
                ),
                const SizedBox(width: 5),
                Text(
                  "${widget.ticket.startMoney}€",
                  style: STANDART_TEXT,
                ),
              ],
            ),
          ),
          Container(
            alignment: Alignment.centerLeft,
            padding: const EdgeInsets.all(8.0).copyWith(top: 2),
            child: Text(
              widget.ticket.startComment.toString(),
              style: STANDART_TEXT,
            ),
          ),
          const SizedBox(height: 15),
          TextInputFieldStandart(
            controller: endCommentController,
            hintText: "Dein Kommentar",
          ),
          const SizedBox(height: 15),
          Mutation(
            options: MutationOptions(
              document: gql(
                  updateTicket), // this is the mutation string you just created
              // you can update the cache based on results
              update:
                  (GraphQLDataProxy cache, QueryResult<Object?>? result) async {
                return;
              },
              // or do something with the result.data on completion
              onCompleted: (dynamic resultData) {
                setState(() {
                  loading = false;
                });
                print(resultData);
                Navigator.of(context).pop();
              },
            ),
            builder: (
              RunMutation runMutation,
              QueryResult<Object?>? result,
            ) {
              return StandartButton(
                text: "Bestätigen",
                onPressed: () {
                  setState(() {
                    loading = true;
                  });
                  runMutation({
                    'id': widget.ticket.id,
                    'status': 1,
                    'midComment': endCommentController.text
                  });
                },
                isFilled: true,
                loading: loading,
              );
            },
          )
        ],
      ),
    );
  }
}
