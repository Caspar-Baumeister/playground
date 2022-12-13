import React from "react";
import { useQuery, gql } from "@apollo/client";

const USERS = gql`
  query {
    users {
      name
    }
  }
`;

interface User {
  name: string;
}

export default function Users() {
  const { loading, error, data } = useQuery(USERS);

  console.log("data");
  console.log(data);
  console.log(error);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.users.map((user: User) => <div>{user.name}</div>);
}
