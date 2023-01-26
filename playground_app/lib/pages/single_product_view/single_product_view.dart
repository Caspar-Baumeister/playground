import 'package:flutter/material.dart';
import 'package:playground_app/pages/single_product_view/widgets/single_product_query.dart';

class SingleProduct extends StatelessWidget {
  const SingleProduct({super.key, this.productName, required this.productId});

  final String? productName;
  final num productId;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: true,
        title: Text(productName.toString()),
        centerTitle: true,
      ),
      body: SafeArea(
          child: SingleProductQuery(
        productId: productId,
      )),
    );
  }
}
