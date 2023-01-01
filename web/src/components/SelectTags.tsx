import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Checkbox, ListItemText } from "@mui/material";
import { useQuery } from "@apollo/client";
import TAGS_BY_SHOP_ID from "../graphql/queries/tagsByShopId";
import { ShopContext } from "../utiles/ShopContext";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface handleTagChangeProps {
  handleTagChange: (tags: number[]) => any;
}

export type TagType = {
  name: string;
  id: number;
};

export default function SecectTags({ handleTagChange }: handleTagChangeProps) {
  const shopState = React.useContext(ShopContext);

  // var allTags: TagType[] = data.tagsByShopId;

  const { loading, error, data } = useQuery(TAGS_BY_SHOP_ID, {
    variables: { shopId: shopState?.shop?.id },
  });

  React.useEffect(() => {
    if (!error && !loading) {
      console.log("onCompleted", data);
      setAllTags(data.tagsByShopId);
    }
  }, [data, error, loading]);
  const theme = useTheme();
  const [allTags, setAllTags] = React.useState<TagType[]>([]);
  const [tagId, setTagId] = React.useState<number[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof tagId>) => {
    console.log("event", event.target.value);
    if (typeof event.target.value !== "string") {
      setTagId(event.target.value);
      console.log("tagId", tagId);

      handleTagChange(event.target.value);
    }
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <FormControl style={{ minWidth: 150, marginTop: 8 }}>
        <InputLabel id="select-tags-label">Tags</InputLabel>
        <Select
          labelId="select-tags-label"
          id="select-tags"
          multiple
          value={tagId}
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
              <Checkbox checked={tagId.indexOf(id) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
          {/* {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))} */}
        </Select>
      </FormControl>
    </div>
  );
}
