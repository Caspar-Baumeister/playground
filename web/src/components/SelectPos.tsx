import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import POS_BY_SHOP_ID from "../graphql/queries/pos";
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

interface handlePosChangeProps {
  handlePosChange: (pos: number | undefined) => any;
  initialPos: number | undefined;
}

export type PosType = {
  name: string;
  id: number;
};

export default function SecectPos({
  handlePosChange,
  initialPos,
}: handlePosChangeProps) {
  const shopState = React.useContext(ShopContext);

  const { loading, error, data } = useQuery(POS_BY_SHOP_ID, {
    variables: { shopId: shopState?.shop?.id },
  });

  React.useEffect(() => {
    if (!error && !loading) {
      setAllPos(data.posByShopId);
    }
  }, [data, error, loading]);

  React.useEffect(() => {
    if (initialPos && initialPos) {
      setPosId(initialPos);
    }
  }, [initialPos]);

  const [allPos, setAllPos] = React.useState<PosType[]>([]);
  const [posId, setPosId] = React.useState<number | undefined>(initialPos);

  const handleChange = (event: SelectChangeEvent<typeof posId>) => {
    console.log("event", event);
    if (typeof event.target.value !== "string") {
      setPosId(event.target.value);
      handlePosChange(event.target.value);
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
          value={posId}
          native={false}
          renderValue={(posId) => {
            const selectedPos = allPos.find((pos) => pos.id === posId);
            console.log("selectedPos", selectedPos);

            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selectedPos ? selectedPos.name : ""}
              </Box>
            );
          }}
          onChange={handleChange}
        >
          {allPos.map((tag) => (
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
          value={posId}
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
              <Checkbox checked={posId.indexOf(id) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
    </div>
  );
}
