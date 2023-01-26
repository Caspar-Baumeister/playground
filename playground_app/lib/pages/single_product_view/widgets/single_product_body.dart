import 'package:flutter/material.dart';
import 'package:playground_app/utiles/text_styles.dart';

class SingleProductBody extends StatelessWidget {
  const SingleProductBody({super.key, this.product});

  final dynamic product;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          product?["description"] != null
              ? Container(
                  padding: const EdgeInsets.all(8.0),
                  child: Text(
                    product["description"].toString(),
                    style: STANDART_TEXT,
                  ),
                )
              : Container(),
        ],
      ),
    );
  }
}
