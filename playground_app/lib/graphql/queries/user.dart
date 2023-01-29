String meQuery = """
query {
  me {
    id
    name
    email
    shop{
      name
    }
  }
}
""";
