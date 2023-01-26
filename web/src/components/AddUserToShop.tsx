import { useMutation, useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import { USERS_WITH_SHOPS } from "../graphql/queries/user";
import { ShopContext } from "../utiles/ShopContext";
import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";
import { ADD_EMPLOYEE_TO_SHOP } from "../graphql/mutations/user";
import { SHOP_WITH_USERS } from "../graphql/queries/shop";

export type UserType = {
  name: string;
  id: number;
  shopUsers: ShopUsers[];
};

export type ShopUsers = {
  shop: {
    id: number;
    name: string;
  };
};

interface inputProps {
  shopCreatorId: number;
}

export default function AddUserToShop({ shopCreatorId }: inputProps) {
  const shopState = React.useContext(ShopContext);
  const { loading, error, data } = useQuery(USERS_WITH_SHOPS);

  React.useEffect(() => {
    if (!error && !loading && data.usersWithShops && shopState?.shop?.id) {
      console.log("usersWithShops", data.usersWithShops);
      const filteredUsers: UserType[] = data.usersWithShops.filter(
        (user: UserType) => {
          if (user.id === shopCreatorId) {
            return false;
          }
          if (user.shopUsers.length > 0) {
            var isInShop = false;
            user.shopUsers.forEach((shopUser: ShopUsers) => {
              if (shopUser.shop.id === shopState!.shop!.id) {
                isInShop = true;
              }
            });
            if (isInShop) {
              return false;
            }
          }
          return true;
        }
      );
      setAllUser(filteredUsers);
    }
  }, [data, error, loading]);

  const [allUser, setAllUser] = React.useState<UserType[]>([]);
  const [userId, setUserId] = React.useState<number | undefined>();

  const handleChange = (event: SelectChangeEvent<typeof userId>) => {
    console.log("event", event);
    if (event.target.value && shopState?.shop?.id) {
      addEmployee({
        variables: {
          shopId: shopState?.shop?.id,
          userId: event.target.value,
          role: "employee",
        },
      });
    } else {
      console.log(
        "handleChange error with event.target.value and shopState?.shop?.id ",
        event.target.value,
        shopState?.shop?.id
      );
    }
  };

  const [addEmployee, { error: errorAddMutation, data: dataAddMutation }] =
    useMutation(ADD_EMPLOYEE_TO_SHOP, {
      refetchQueries: [
        {
          query: SHOP_WITH_USERS,
          variables: { shopId: shopState?.shop?.id },
        },
        { query: USERS_WITH_SHOPS },
      ],
    });

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (errorAddMutation)
    return <div>{"add user error " + errorAddMutation.message}</div>;

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Mitarbeiter hinzufügen
        </InputLabel>
        <Select
          label="Mitarbeiter hinzufügen"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={userId}
          native={false}
          renderValue={(userId) => {
            const selectedUser = allUser.find((user) => user.id === userId);

            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selectedUser ? selectedUser.name : ""}
              </Box>
            );
          }}
          onChange={handleChange}
        >
          {allUser.length > 0 ? (
            allUser.map((user) => (
              <MenuItem value={user.id} key={user.id}>
                <Box sx={{ flexGrow: 1, justifyContent: "space-between" }}>
                  <Grid container spacing={2}>
                    <Grid flex={1} item>
                      {user.name}
                    </Grid>
                    <Grid item>
                      <AddIcon />
                    </Grid>
                  </Grid>
                </Box>
              </MenuItem>
            ))
          ) : (
            <MenuItem> Keine weiteren Nutzer</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}
