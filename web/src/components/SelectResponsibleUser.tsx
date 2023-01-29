import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import { SHOP_WITH_USERS } from "../graphql/queries/shop";

interface handleUserChangeProps {
  handleUserChange: (user: UserType) => any;
  initialUser: number | undefined;
}

export type ShopUsers = {
  user: {
    id: number;
    name: string;
  };
};

export type UserType = {
  name: string;
  id: number;
  role: number;
};

export default function SelectResponsibleUser({
  handleUserChange,
  initialUser,
}: handleUserChangeProps) {
  const { loading, error, data } = useQuery(SHOP_WITH_USERS, {});

  const [allUser, setAllUser] = React.useState<UserType[]>([]);
  const [userId, setUserId] = React.useState<number | undefined>(initialUser);

  React.useEffect(() => {
    if (!error && !loading && data.shopWithUsers?.users) {
      setAllUser(data.shopWithUsers.users);
    }
  }, [data, error, loading]);

  React.useEffect(() => {
    if (initialUser) {
      setUserId(initialUser);
    }
  }, [initialUser]);

  const handleChange = (event: SelectChangeEvent<typeof userId>) => {
    if (typeof event.target.value !== "string") {
      setUserId(event.target.value);
      const selectedUser: UserType | undefined = allUser.find(
        (user) => user.id === event.target.value
      );
      if (selectedUser) {
        handleUserChange(selectedUser);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Verantwortlicher</InputLabel>
        <Select
          label="Verantwortlicher"
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
          {allUser.map((tag) => (
            <MenuItem value={tag.id} key={tag.id}>
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
