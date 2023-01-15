import { useQuery } from "@apollo/client";
import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import CreateTicketForm from "../Components/CreateTicketForm";
import CreateTicketsTable from "../Components/CreateTicketsTable";
import { ProductData } from "../Components/TableProducts";
import PRODUCTS_BY_SHOP_ID from "../graphql/queries/product";
import { ShopContext } from "../utiles/ShopContext";
import AddIcon from "@mui/icons-material/Add";
import { PosData } from "../Components/TableTickets";
import { UserType } from "../Components/SelectUser";

export type CreateTicketData = {
  pos: PosData | null;
  user: UserType | null;
  status: number;
  shopId: number | undefined;
  date: Date;
  startMoney: number | null;
  startAmounts: number[];
  startComment: string | null;
};

export default function CreateTickets() {
  const shopState = React.useContext(ShopContext);

  const [tickets, setTickets] = useState<CreateTicketData[]>([
    {
      pos: null,
      user: null,
      status: 0,
      shopId: shopState?.shop?.id,
      date: new Date(),
      startMoney: 0,
      startAmounts: [],
      startComment: null,
    },
  ]);

  function addTicket() {
    setTickets(
      // Replace the state
      [
        // with a new array
        ...tickets, // that contains all the old items
        {
          pos: null,
          user: null,
          status: 0,
          shopId: shopState?.shop?.id,
          date: new Date(),
          startMoney: 0,
          startAmounts: [],
          startComment: null,
        }, // and one new item at the end
      ]
    );
  }

  function removeItem(index: number) {
    setTickets(tickets.filter((_, i) => i !== index));
  }

  function changeTicketField(index: number, field: string, value: any) {
    console.log("changeTicketField", field, value);
    setTickets(
      [...tickets].map((object, _index) => {
        if (_index === index) {
          return {
            ...object,
            [field]: value,
          };
        } else return object;
      })
    );
  }

  const { loading, error, data } = useQuery(PRODUCTS_BY_SHOP_ID, {
    variables: { shopId: shopState?.shop?.id },
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  const allProd: ProductData[] = data.productsByShopId;

  // list of all openTickets objects

  return (
    <React.Fragment>
      <Box m={3}>
        {tickets.map((ticket, index) => (
          <CreateTicketForm
            data={ticket}
            setData={changeTicketField}
            removeItem={removeItem}
            index={index}
            isLast={index == tickets.length - 1 && index !== 0}
          />
        ))}
        <Box justifyContent="right" display="flex" m={3}>
          <Button
            onClick={() => addTicket()}
            sx={{ borderRadius: 10 }}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Ticket hinzufügen
          </Button>
        </Box>
        <CreateTicketsTable allProd={allProd} tickets={tickets} />
        <Box justifyContent="right" display="flex" m={3}>
          <Button
            onClick={() => console.log("tickets", tickets)}
            sx={{ borderRadius: 10 }}
            variant="contained"
          >
            Bestätigen
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}
