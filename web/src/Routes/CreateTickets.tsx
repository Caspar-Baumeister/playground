import { Box } from "@mui/material";
import React from "react";
import CreateTicketForm from "../Components/CreateTicketForm";
import { ShopContext } from "../utiles/ShopContext";

export type createTicketData = {
  posId: number | null;
  responsibleUserId: number | null;
  status: number;
  shopId: number | undefined;
  date: string | null;
  startMoney: number | null;
  startAmounts: number[];
  productIds: number[];
  startComment: string | null;
};

export default function CreateTickets() {
  // create product mutation

  const shopState = React.useContext(ShopContext);

  const initialValues: createTicketData = {
    posId: null,
    responsibleUserId: null,
    status: 0,
    shopId: shopState?.shop?.id,
    date: null,
    startMoney: 0,
    startAmounts: [],
    productIds: [],
    startComment: null,
  };

  return (
    <React.Fragment>
      <Box m={3}>
        <CreateTicketForm data={initialValues} setData={(input) => true} />
      </Box>
    </React.Fragment>
  );
}
