import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import POS_BY_SHOP_ID from "../graphql/queries/pos";
import { ShopContext } from "../utiles/ShopContext";

interface handleUserChangeProps {
  handleUserChange: (User: number | undefined) => any;
  initialUser: number | undefined;
}

export type UserType = {
  name: string;
  id: number;
};

export default function SecectUser({
  handleUserChange,
  initialUser,
}: handleUserChangeProps) {
  const shopState = React.useContext(ShopContext);

  const { loading, error, data } = useQuery(POS_BY_SHOP_ID, {
    variables: { shopId: shopState?.shop?.id },
  });

  React.useEffect(() => {
    if (!error && !loading) {
      setAllUser(data.UserByShopId);
    }
  }, [data, error, loading]);

  React.useEffect(() => {
    if (initialUser && initialUser) {
      setUserId(initialUser);
    }
  }, [initialUser]);

  const [allUser, setAllUser] = React.useState<UserType[]>([]);
  const [UserId, setUserId] = React.useState<number | undefined>(initialUser);

  const handleChange = (event: SelectChangeEvent<typeof UserId>) => {
    console.log("event", event);
    if (typeof event.target.value !== "string") {
      setUserId(event.target.value);
      handleUserChange(event.target.value);
    }
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Verkaufsort</InputLabel>
        <Select
          label="Verkaufsort"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={UserId}
          native={false}
          renderValue={(UserId) => {
            const selectedUser = allUser.find((User) => User.id === UserId);
            console.log("selectedUser", selectedUser);

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
      {/* <FormControl style={{ minWidth: 150, marginTop: 8 }}>
        <InputLabel id="select-tags-label">Tags</InputLabel>
        <Select
          labelId="select-tags-label"
          id="select-tags"
          multiple
          value={UserId}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selectedIds) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {allTags
                .filter((tag) => selectedIds.indexOf(tag.id) > -1)
                .map((tag) => (
                  <Chip key={tag.id} label={tag.name} />
                ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {allTags.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              <Checkbox checked={UserId.indexOf(id) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
    </div>
  );
}
