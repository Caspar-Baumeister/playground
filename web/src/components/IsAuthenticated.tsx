import React from "react";
import { useQuery } from "@apollo/client";
import { Navigate } from "react-router-dom";
import ME_QUERY from "../graphql/queries/me";

interface Props {
  children?: React.ReactNode;
}

export default function IsAuthenticated({ children }: Props) {
  const { loading, error, data } = useQuery(ME_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data.me) {
    return <Navigate to={"/landing-page"} />;
  }
  return <>{children}</>;
}
