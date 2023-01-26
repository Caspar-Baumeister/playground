import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:playground_app/graphql/queries/user.dart';

class MeQuery extends StatelessWidget {
  const MeQuery({super.key});

  @override
  Widget build(BuildContext context) {
    return Query(
      options: QueryOptions(
        document: gql(meQuery), // this is the query string you just created
        pollInterval: const Duration(seconds: 10),
      ),
      // Just like in apollo refetch() could be used to manually trigger a refetch
      // while fetchMore() can be used for pagination purpose
      builder: (QueryResult result,
          {VoidCallback? refetch, FetchMore? fetchMore}) {
        if (result.hasException) {
          print(result.exception.toString());
          return Text(result.exception.toString());
        }

        if (result.isLoading) {
          return const Text('Loading');
        }

        dynamic me = result.data?['me'];

        if (me == null) {
          return const Text('No me');
        }

        return Padding(
            padding: const EdgeInsets.all(8.0), child: Text(me["name"]));
      },
    );
  }
}
