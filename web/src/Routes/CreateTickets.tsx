import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import CreateTicketForm from "../Components/CreateTicketForm";
import CreateTicketsTable from "../Components/CreateTicketsTable";
import { ProductData } from "../Components/TableProducts";
import PRODUCTS_BY_SHOP_ID from "../graphql/queries/product";
import { ShopContext } from "../utiles/ShopContext";
import AddIcon from "@mui/icons-material/Add";
import { PosData } from "../Components/TableTickets";
import { useNavigate } from "react-router-dom";
import { UserType } from "../Components/SelectUser";
import {
  CREATE_TICKET,
  CREATE_TICKET_PRODUCTS,
} from "../graphql/mutations/ticket";
import { TICKETS_BY_SHOP_ID } from "../graphql/queries/ticket";

export type CreateTicketData = {
  id: undefined | null | number;
  pos: PosData | null;
  user: UserType | null;
  status: number;
  shopId: number | undefined;
  date: Date;
  startMoney: number | null;
  startAmounts: ticketProductData[];
  startComment: string | null;
};

type ticketProductData = {
  productId: number;
  startAmount: number;
};

export default function CreateTickets() {
  const navigate = useNavigate();
  const shopState = React.useContext(ShopContext);
  const [errorMessage, setErrorMessage] = React.useState<String>("");
  const [confirmError, setConfirmError] = React.useState<Boolean>(false);
  const [loading, setLoading] = useState(false);

  // use mutatios: create ticket, create ticket products
  const [createTicket, { error: createTicketError, data: createTicketData }] =
    useMutation(CREATE_TICKET, {
      // refetchQueries: [
      //   {
      //     query: TICKETS_BY_SHOP_ID,
      //     variables: { shopId: shopState?.shop?.id },
      //   },
      // ],
    });
  // use mutatios:  create ticket products
  const [
    createTicketProducts,
    { error: createTicketProductError, data: createTicketProductData },
  ] = useMutation(CREATE_TICKET_PRODUCTS, {
    refetchQueries: [
      {
        query: TICKETS_BY_SHOP_ID,
        variables: { shopId: shopState?.shop?.id },
      },
    ],
  });

  // function that on confirm creates all tickets, safes the ids and then for all tickets and all products, creates the ticketproducts
  const createTickets = async (): Promise<boolean> => {
    // check if all ticket informations are complete, if not return error message
    setLoading(true);

    tickets.forEach((ticket, index) => {
      setConfirmError(false);
      if (!ticket.pos) {
        setConfirmError(true);
        setErrorMessage("Wähle eine Position für Ticket " + index);
        return;
      } else if (!ticket.user) {
        setConfirmError(true);
        setErrorMessage(
          "Wähle einen Verantwortlichen für die Postion " + ticket.pos.name
        );
        return;
      } else if (!ticket.startMoney) {
        setConfirmError(true);
        setErrorMessage(
          "Gib " +
            ticket.user.name +
            " doch ein wenig Geld mit an die Position " +
            ticket.pos.name
        );
        return;
      }
      if (confirmError) {
        setLoading(false);
        return false;
      }
    });
    // await useMutation create tickets and safe the ticket ids
    // var ticketIds: number[] = [];
    tickets.forEach(async (ticket, index) => {
      const createTicketResponse = await createTicket({
        variables: {
          startComment: ticket.startComment,
          date: ticket.date,
          posId: ticket.pos!.id,
          status: ticket.status,
          shopId: ticket.shopId,
          responsibleUserId: ticket.user!.id,
          startMoney: ticket.startMoney,
        },
      });
      console.log("createTicketResponse.data", createTicketResponse.data);
      if (createTicketResponse.data.createTicket.id) {
        // create products for the ticket it

        var productIds: number[] = [];
        var startAmounts: number[] = [];
        ticket.startAmounts.forEach(({ productId, startAmount }) => {
          productIds.push(productId);
          startAmounts.push(startAmount);
        });

        const createTicketProductsResponse = await createTicketProducts({
          variables: {
            ticketId: createTicketResponse.data.createTicket.id,
            productIds,
            startAmounts,
          },
        });

        if (!createTicketProductsResponse.data.createTicketProducts) {
          setConfirmError(true);
          setErrorMessage(
            "Beim eintragen der Produkte in die Tickets ist ein Fehler aufgetreten"
          );
        }
      } else {
        setConfirmError(true);
        setErrorMessage(
          "Beim erstellen der tickets ist ein Fehler aufgetreten"
        );
        return;
      }
    });
    console.log("tickets with ids", tickets);
    if (confirmError) {
      setLoading(false);
      return false;
    }

    // if success, go back to ticket screen
    navigate("/tickets");
    setLoading(false);
    return true;
  };

  const [tickets, setTickets] = useState<CreateTicketData[]>([
    {
      id: null,
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
          id: null,
          pos: null,
          user: null,
          status: 0,
          shopId: shopState?.shop?.id,
          date: tickets[0].date,
          startMoney: 0,
          startAmounts: allProd.map((product) => {
            return { productId: product.id, startAmount: 0 };
          }),
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

  function setInitialTicketProducts(index: number, allProducts: ProductData[]) {
    setTickets(
      [...tickets].map((object, _index) => {
        if (_index === index) {
          return {
            ...object,
            startAmounts: allProducts.map((product) => {
              return { productId: product.id, startAmount: 0 };
            }),
          };
        } else return object;
      })
    );
  }

  function setTicketProduct(index: number, productId: number, amount: number) {
    setTickets(
      [...tickets].map((object, _index) => {
        if (_index === index) {
          return {
            ...object,
            startAmounts: [...object.startAmounts].map((product) => {
              if (productId === product.productId) {
                return { productId: productId, startAmount: amount };
              } else return product;
            }),
          };
        } else return object;
      })
    );
  }

  const {
    loading: loadingQuery,
    error,
    data,
  } = useQuery(PRODUCTS_BY_SHOP_ID, {
    variables: { shopId: shopState?.shop?.id },
  });

  React.useEffect(() => {
    if (!error && !loading && data.productsByShopId) {
      const allProd: ProductData[] = data.productsByShopId;
      setInitialTicketProducts(0, allProd);
    }
  }, [data, error, loading]);

  if (loading || loadingQuery) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  const allProd: ProductData[] = data.productsByShopId;

  // list of all openTickets objects

  if (createTicketError) {
    return <div>{createTicketError.message}</div>;
  }

  if (createTicketProductError) {
    return <div>{createTicketProductError.message}</div>;
  }

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
        <CreateTicketsTable
          allProd={allProd}
          tickets={tickets}
          setTicketProduct={setTicketProduct}
        />
        <Box justifyContent="right" display="flex" m={3}>
          <Button
            onClick={() => createTickets()}
            sx={{ borderRadius: 10 }}
            variant="contained"
          >
            Bestätigen
          </Button>
        </Box>
        <Box m={4}>
          <Typography color="red">
            {confirmError ? errorMessage : null}{" "}
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
}
