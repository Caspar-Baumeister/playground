import 'package:flutter/material.dart';
import 'package:playground_app/pages/single_product_view/single_product_view.dart';
import 'package:playground_app/utiles/constants.dart';
import 'package:playground_app/utiles/text_styles.dart';

class SellingProcessTicketsBody extends StatelessWidget {
  const SellingProcessTicketsBody(
      {super.key, required this.ticketProducts, this.ticket});

  final List ticketProducts;
  final dynamic ticket;

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
              ...ticketProducts.map((ticketProduct) {
                String type =
                    ticketProduct["product"]['amountType'] == 1 ? "Kg " : "Stk";

                num? price = ticketProduct?["product"]?['price'];

                return TableRow(children: [
                  GestureDetector(
                    onTap: () => Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: ((context) => SingleProduct(
                              productId: ticketProduct["product"]["id"],
                              productName: ticketProduct?["product"]
                                  ?['name']))),
                    ),
                    child: Padding(
                      padding: EdgeInsets.symmetric(
                          vertical: TABLE_VERTICAL_PADDING),
                      child: Text(
                        ticketProduct["product"]['name'].toString(),
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
                          "${ticketProduct['startAmount']} $type",
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
                  "${ticket["startMoney"]}€",
                  style: STANDART_TEXT,
                ),
              ],
            ),
          ),
          Container(
            alignment: Alignment.centerLeft,
            padding: const EdgeInsets.all(8.0).copyWith(bottom: 0),
            child: const Text(
              "Kommentar:",
              style: SUB_TITLE,
            ),
          ),
          Container(
            alignment: Alignment.centerLeft,
            padding: const EdgeInsets.all(8.0).copyWith(top: 2),
            child: Row(
              children: [
                Text(
                  ticket["startComment"].toString(),
                  style: STANDART_TEXT,
                ),
              ],
            ),
          ),
          const SizedBox(height: 6),
          Container(
            width: 300,
            decoration: BoxDecoration(
                border: Border.all(),
                borderRadius: const BorderRadius.all(Radius.circular(12))),
            alignment: Alignment.centerLeft,
            padding: const EdgeInsets.all(8.0),
            child: const Center(
              child: Padding(
                padding: EdgeInsets.all(4.0),
                child: Text("Bestätigen"),
              ),
            ),
          )
        ],
      ),
    );
  }
}
