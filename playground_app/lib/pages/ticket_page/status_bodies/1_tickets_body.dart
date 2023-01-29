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

class OneTicketsBody extends StatefulWidget {
  const OneTicketsBody(
      {super.key, required this.ticketProducts, required this.ticket});

  final List<TicketProduct> ticketProducts;
  final Ticket ticket;

  @override
  State<OneTicketsBody> createState() => _OneTicketsBodyState();
}

class _OneTicketsBodyState extends State<OneTicketsBody> {
  late TextEditingController endCommentController;
  late TextEditingController endMoneyController;
  bool loading = false;
  Map ticketProductsEndAmounts = {};

  @override
  void initState() {
    endCommentController = TextEditingController();
    endMoneyController = TextEditingController();
    for (var v in widget.ticketProducts) {
      ticketProductsEndAmounts[v.productId] = 0;
    }
    super.initState();
  }

  @override
  void dispose() {
    endCommentController.dispose();
    endMoneyController.dispose();
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
              0: FractionColumnWidth(.3),
              2: FractionColumnWidth(.25),
              3: FractionColumnWidth(.25),
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
                          'War',
                          style: SUB_TITLE,
                        )),
                    Container(
                        alignment: Alignment.center,
                        child: const Text(
                          'Ist',
                          textAlign: TextAlign.center,
                          style: SUB_TITLE,
                        ))
                  ]),
              ...widget.ticketProducts.map((ticketProduct) {
                String type =
                    ticketProduct.product!.amountType == 1 ? "Kg " : "Stk";

                num? price = ticketProduct.product?.price;

                return TableRow(children: [
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: GestureDetector(
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
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Padding(
                      padding: EdgeInsets.symmetric(
                          vertical: TABLE_VERTICAL_PADDING),
                      child: Container(
                        alignment: Alignment.centerRight,
                        child: Text(
                          "${price?.toStringAsFixed(2)}€",
                          style: STANDART_TEXT,
                        ),
                      ),
                    ),
                  ),
                  TableCell(
                    verticalAlignment: TableCellVerticalAlignment.middle,
                    child: Padding(
                      padding: EdgeInsets.symmetric(
                          vertical: TABLE_VERTICAL_PADDING),
                      child: Container(
                          alignment: Alignment.centerRight,
                          child: Text(
                            "${ticketProduct.startAmount} $type",
                            style: STANDART_TEXT,
                          )),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(
                        bottom: 6, left: 6.0, top: 6, right: 2),
                    child: Container(
                        alignment: Alignment.centerRight,
                        child: NumberInputFieldStandart(
                          onChange: (value) {
                            setState(() => ticketProductsEndAmounts[
                                ticketProduct.productId] = value);
                          },
                          hintText: ticketProduct.product!.amountType == 1
                              ? "   in Kg "
                              : "   in Stk",
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
                  "Kasse Ende:",
                  style: SUB_TITLE,
                ),
                const SizedBox(width: 5),
                SizedBox(
                    width: 90,
                    height: 35,
                    child: NumberInputFieldStandart(
                        controller: endMoneyController))
              ],
            ),
          ),
          TextInputFieldStandart(
            controller: endCommentController,
            hintText: "End Kommentar",
          ),
          const SizedBox(height: 15),
          Mutation(
            options: MutationOptions(
              document: gql(
                  updateTicketProductsOfTicket), // this is the mutation string you just created
              // you can update the cache based on results
              update:
                  (GraphQLDataProxy cache, QueryResult<Object?>? result) async {
                return;
              },
              // or do something with the result.data on completion
              onCompleted: (dynamic resultData) {
                print("finisehd updateing all ticketproducts");
                print(resultData);
                setState(() {
                  loading = false;
                });
                Navigator.of(context).pop();
              },
            ),
            builder: (
              RunMutation runUpdateTicketProductsMutation,
              QueryResult<Object?>? updateTicketProductsresult,
            ) {
              return Mutation(
                options: MutationOptions(
                  document: gql(
                      updateTicket), // this is the mutation string you just created
                  // you can update the cache based on results
                  update: (GraphQLDataProxy cache,
                      QueryResult<Object?>? result) async {
                    return;
                  },
                  // or do something with the result.data on completion
                  onCompleted: (dynamic resultData) {
                    print("inside oncomplete ticket change mutation");
                    print(resultData["updateTicket"]);
                    runUpdateTicketProductsMutation({
                      "productIds": ticketProductsEndAmounts.keys.toList(),
                      "ticketId": widget.ticket.id,
                      "endAmounts": ticketProductsEndAmounts.values.toList()
                    });
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
                        'status': 2,
                        'endComment': endCommentController.text,
                        'endMoney': double.parse(endMoneyController.text)
                      });
                    },
                    isFilled: true,
                    loading: loading,
                  );
                },
              );
            },
          )
        ],
      ),
    );
  }
}
