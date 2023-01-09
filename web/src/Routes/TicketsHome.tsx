import { Box, Container, Toolbar } from "@mui/material";
import React from "react";
import TicketsTable from "../Components/TableTickets";

export default function TicketsHome() {
  return (
    <React.Fragment>
      <Box m={3}></Box>
      <TicketsTable />
    </React.Fragment>
  );
}
