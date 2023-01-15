import { useLazyQuery } from "@apollo/client";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Box, DialogContent, IconButton, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { TICKET_PRODUCTS } from "../graphql/queries/ticket";
import { TicketData } from "./TableTickets";
import Paper from "@mui/material/Paper";

type propsType = {
  ticket: TicketData;
};

type ticketProductData = {
  startAmount: number;
  endAmount: number;
  product: {
    amountType: number;
    amount: number;
    price: number;
    name: string;
    if: number;
  };
};

export const TicketDetailsPopUp: React.FC<propsType> = (props) => {
  const [
    getProducts,
    { loading: loadingProducts, error: errorProducts, data: dataProducts },
  ] = useLazyQuery(TICKET_PRODUCTS, {
    variables: { ticketId: props.ticket.id },
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    getProducts();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [ticketProducts, setTicketProducts] = React.useState<
    ticketProductData[]
  >([]);

  React.useEffect(() => {
    if (dataProducts && dataProducts.ticketProducts) {
      console.log(dataProducts.ticketProducts);
      setTicketProducts(dataProducts.ticketProducts);
    }
  }, [dataProducts]);

  return (
    <>
      <IconButton size="small" onClick={handleClickOpen}>
        <RemoveRedEyeOutlinedIcon sx={{ fontSize: "18px" }} />
      </IconButton>
      <Dialog
        scroll={"body"}
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        {ticketProducts && ticketProducts.length > 0 ? (
          <Box>
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <Typography sx={{ ml: 2 }} variant="h6">
                  {props.ticket.pos.name}
                </Typography>
                <Box sx={{ flex: 1 }}></Box>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <DialogContent>
              <Box
                noValidate
                component="form"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: "auto",
                  width: "fit-content",
                }}
              >
                {/* <DialogTitle>{props.ticket.pos.name}</DialogTitle>{" "} */}
                <TableContainer component={Paper}>
                  <Table
                    sx={{
                      maxWidth: 810,
                      minWidth: 600,
                    }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Preis</TableCell>
                        <TableCell align="right">Menge Start</TableCell>
                        <TableCell align="right">Menge Ende</TableCell>
                        <TableCell align="right">Verkauft</TableCell>
                        <TableCell align="right">Umsatz</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ticketProducts.map((row) => (
                        <TableRow
                          key={row.product.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.product.name}
                          </TableCell>
                          <TableCell align="right">
                            {row.product.price + " €"}
                          </TableCell>
                          <TableCell align="right">
                            {row.startAmount +
                              (row.product.amountType ? " Stk" : " Kg")}
                          </TableCell>
                          <TableCell align="right">
                            {row.endAmount
                              ? row.endAmount +
                                (row.product.amountType ? " Stk" : " Kg")
                              : "-"}
                          </TableCell>
                          <TableCell align="right">
                            {row.endAmount
                              ? row.startAmount -
                                row.endAmount +
                                (row.product.amountType ? " Stk" : " Kg")
                              : "-"}
                          </TableCell>
                          <TableCell align="right">
                            {row.endAmount
                              ? (row.startAmount - row.endAmount) *
                                row.product.price *
                                (row.product.amountType ? 10 : 1)
                              : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>{" "}
            </DialogContent>
          </Box>
        ) : (
          <Box flex={1} justifyContent={"center"} m={4}>
            Keine Produkte
          </Box>
        )}

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Schließen</Button>
          {/* <Button type="submit">Bestätigen</Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};
