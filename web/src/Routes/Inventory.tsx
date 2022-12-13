import { Box, Container, Toolbar } from "@mui/material";
import React from "react";
// import { useQuery, gql } from "@apollo/client";
import PrimarySearchAppBar from "../Components/NavBar";
import CustomPaginationActionsTable from "../Components/TableProducts";

// Get the current active Shop

// Get the current active Warehouse

// Get all registered warehouses of the shop (to show a List if the User wants to change the warehouse)

// Set the currently active warehouse (same as user and shop)

// Get all products of a specific warehouse

// Get all the Categories of the corresponding Shop
// {name, category_id}

// Show

// const ALL_PRODUCTS_OF_WAREHOUSE = gql`
//   query {

//   }
// `;

// interface User {
//   name: string;
// }

export default function Inventory() {
  //   var body;
  //   const { loading, error, data } = useQuery(ALL_PRODUCTS_OF_WAREHOUSE);

  //   if (loading) body = <p>Loading...</p>;
  //   if (error) body = <p>Error : {error.message}</p>;

  return (
    <React.Fragment>
      <PrimarySearchAppBar />
      <Box m={3}></Box>
      <CustomPaginationActionsTable />
    </React.Fragment>
  );
}
