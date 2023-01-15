import React from "react";
import { useQuery, gql } from "@apollo/client";
import { SHOP_WITH_USERS } from "../graphql/queries/shop";
import { Box } from "@mui/material";
import { ShopContext } from "../utiles/ShopContext";
import AddUserToShop from "../Components/AddUserToShop";

interface User {
  name: string;
  id: number;
}

export type ShopUsers = {
  user: {
    id: number;
    name: string;
  };
};

export default function Users() {
  const shopState = React.useContext(ShopContext);
  const { loading, error, data } = useQuery(SHOP_WITH_USERS, {
    variables: { shopId: shopState?.shop?.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <Box mt={2}>Geschäftsführer:</Box>
      <Box mb={2}>{data.shopWithUsers.creator.name}</Box>
      <Box mt={4}>Mitarbeiter:</Box>
      {data.shopWithUsers.users.map((shopUser: ShopUsers) => {
        return <Box>{shopUser.user.name}</Box>;
      })}
      <Box mt={2} width={500}>
        <AddUserToShop shopCreatorId={data.shopWithUsers.creator.id} />
      </Box>
    </div>
  );
}
