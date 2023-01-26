import { Box, Container, Toolbar } from "@mui/material";
import React from "react";
import CustomPaginationActionsTable from "../Components/TableProducts";

export default function Inventory() {
  return (
    <React.Fragment>
      <Box m={3}></Box>
      <CustomPaginationActionsTable />
    </React.Fragment>
  );
}
