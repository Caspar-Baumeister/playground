import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import CreateUserPopUpForm from "../Components/CreateUserPopUpForm";
import { SHOP_WITH_USERS } from "../graphql/queries/shop";

type UserType = {
  id: number;
  name: string;
  role: number;
};

export type ShopUsers = {
  user: {
    id: number;
    name: string;
  };
};

export default function Users() {
  const { loading, error, data } = useQuery(SHOP_WITH_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  if (!data?.shopWithUsers?.users) {
    return (
      <Box mt={8}>
        <CreateUserPopUpForm />
      </Box>
    );
  }

  let creator: UserType = data.shopWithUsers.users.find(
    (e: UserType) => e.role === 0
  );

  return (
    <div>
      <Box mt={2}>Geschäftsführer:</Box>
      <Box mb={2}>{creator.name ?? ""}</Box>
      <Box mt={4}>Mit Berechtigung zum Planen:</Box>
      {data.shopWithUsers.users
        .filter((user: UserType) => user.role === 1)
        .map((user: UserType) => {
          return <Box>{user.name}</Box>;
        })}
      <Box mt={4}>Ohne zusätzliche Berechtigungen:</Box>
      {data.shopWithUsers.users
        .filter((user: UserType) => user.role === 2)
        .map((user: UserType) => {
          return <Box>{user.name}</Box>;
        })}
      <Box mt={8}>
        <CreateUserPopUpForm />
      </Box>
    </div>
  );
}
