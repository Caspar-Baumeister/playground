import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:playground_app/graphql/queries/product.dart';
import 'package:playground_app/pages/single_product_view/widgets/single_product_body.dart';

class SingleProductQuery extends StatelessWidget {
  const SingleProductQuery({super.key, required this.productId});

  final num productId;

  @override
  Widget build(BuildContext context) {
    return Query(
      options: QueryOptions(
        document:
            gql(productQuery), // this is the query string you just created
        variables: {'id': productId},
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

        dynamic product = result.data?['product'];

        if (product == null) {
          return const Text('No products');
        }

        return SingleProductBody(product: product);
      },
    );
  }
}
