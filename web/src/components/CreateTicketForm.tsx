import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { CreateTicketData } from "../Routes/CreateTickets";
import SecectPos from "./SelectPos";
import SelectResponsibleUser from "./SelectResponsibleUser";

interface CreateTicketFormPropType {
  index: number;
  data: CreateTicketData;
  setData(index: number, field: string, value: any): void;
  removeItem(index: number): void;
  isLast: boolean;
}

export default function CreateTicketForm(props: CreateTicketFormPropType) {
  return (
    // select User
    // select Position
    // datepicker Date
    // number field startMoney
    // text field startCommend

    <Box
      p={4}
      m={4}
      pt={0}
      sx={{
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: "white",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        {props.isLast ? (
          <IconButton
            onClick={() => {
              props.removeItem(props.index);
            }}
            style={{ position: "relative", left: "99%", top: "2%" }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <SecectPos
              handlePosChange={({ name, id }) => {
                console.log("set pos", id, name);

                return props.setData(props.index, "pos", { id, name });
              }}
              initialPos={props.data.pos?.id ?? undefined}
            />
          </Grid>
          <Grid item xs={3}>
            <DatePicker
              onChange={(value) => {
                if (value) {
                  return props.setData(props.index, "date", value);
                }
                return null;
              }}
              label="Verkaufstag"
              value={props.data.date}
              renderInput={(props) => <TextField {...props} />}
            />
          </Grid>
          <Grid item xs={9}>
            <SelectResponsibleUser
              handleUserChange={({ name, id }) => {
                console.log("set user", id, name);
                return props.setData(props.index, "user", { id, name });
              }}
              initialUser={props.data.user?.id ?? undefined}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              margin="none"
              fullWidth
              id="startMoney"
              name="startMoney"
              label={"Wechselgeld"}
              type="number"
              value={props.data.startMoney}
              onChange={(e) =>
                props.setData(
                  props.index,
                  e.target.name,
                  Number.parseFloat(e.target.value)
                )
              }
            />
          </Grid>
        </Grid>
      </Box>
      <TextField
        multiline
        margin="dense"
        fullWidth
        id="startComment"
        name="startComment"
        label={"Kommentar"}
        type="text"
        value={props.data.startComment}
        onChange={(e) =>
          props.setData(props.index, e.target.name, e.target.value)
        }
      />
    </Box>
  );
}
