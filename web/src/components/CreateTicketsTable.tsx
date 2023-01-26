import { Box, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CreateTicketData } from "../Routes/CreateTickets";
import { ProductData } from "./TableProducts";

interface CreateTicketsTablePropsType {
  allProd: ProductData[];
  tickets: CreateTicketData[];
  setTicketProduct(index: number, productId: number, amount: number): void;
}
export default function CreateTicketsTable(props: CreateTicketsTablePropsType) {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Produkte</TableCell>
              {props.tickets.map((ticket, index) => (
                <TableCell align="left">
                  {ticket.pos?.name ?? "Ticket " + index}
                </TableCell>
              ))}
              <TableCell align="right">Bestand</TableCell>
              <TableCell align="right">Bleibt im Lager</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.allProd.map((prod) => {
              var alreadyGone = 0;
              props.tickets.forEach((ticket) => {
                let product = ticket.startAmounts.find(
                  (sa) => sa.productId === prod.id
                );
                if (product?.startAmount) alreadyGone += product.startAmount;
              });
              return (
                <TableRow
                  key={prod.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" width="20%">
                    {prod.name + (prod.amountType === 1 ? " (Kg)" : " (Stk)")}
                  </TableCell>
                  {props.tickets.map((ticket, index) => (
                    <TableCell align="left" size="small">
                      <TextField
                        size="small"
                        type={"number"}
                        value={
                          ticket.startAmounts.find(
                            (tp) => tp.productId == prod.id
                          )?.startAmount
                        }
                        onChange={(e) =>
                          props.setTicketProduct(
                            index,
                            prod.id,
                            Number.parseFloat(e.target.value)
                          )
                        }
                      />
                    </TableCell>
                  ))}

                  <TableCell align="right">
                    {prod.amount.toLocaleString("de-DE", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    }) +
                      " " +
                      (prod.amountType === 1 ? "Kg" : "Stk")}
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      color={prod.amount - alreadyGone < 0 ? "red" : "black"}
                    >
                      {(prod.amount - alreadyGone).toLocaleString("de-DE", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }) +
                        " " +
                        (prod.amountType === 1 ? "Kg" : "Stk")}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
