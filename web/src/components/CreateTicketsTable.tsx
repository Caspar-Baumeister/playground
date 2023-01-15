import { Box, TextField } from "@mui/material";
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
              ))}{" "}
              <TableCell align="right">Im Lager</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.allProd.map((prod) => (
              <TableRow
                key={prod.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {prod.name}
                </TableCell>
                {props.tickets.map((ticket, index) => (
                  <TableCell align="left">
                    <TextField />
                  </TableCell>
                ))}

                <TableCell align="right">{prod.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
