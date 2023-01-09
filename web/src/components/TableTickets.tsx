import { useMutation, useQuery } from "@apollo/client";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { alpha, Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { DELETE_PRODUCT } from "../graphql/mutations/product";
import { TICKETS_BY_SHOP_ID } from "../graphql/queries/ticket";
import { ShopContext } from "../utiles/ShopContext";
import CreatePosPopUpForm from "./CreatePosPopUpForm";
import CreateProductPopUpForm from "./CreateProductPopUpForm";
import CreateTagPopUpForm from "./CreateTagPopUpForm";
import { TicketDetailsPopUp } from "./TicketDetailsPopUp";

export interface PosData {
  id: number;
  name: string;
}

export interface ResponsibleUserData {
  id: number;
  name: string;
}

interface DisplayData {
  id: number;
  namePos: string;
  nameResponsibleUser: string;
  status: number;
  date: string;
  updatedAt: string;
}

export interface TicketData {
  pos: PosData;
  id: number;
  shopId: number;
  updatedAt: string;
  date: string;
  responsibleUser: ResponsibleUserData;
  status: number;
  startMoney: number;
  endMoney: number | null;
  startComment: string | null;
  endComment: string | null;
}

interface Column {
  id: "namePos" | "nameResponsibleUser" | "date" | "status" | "id";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "namePos", label: "Ort", minWidth: 50 },
  {
    id: "nameResponsibleUser",
    label: "Verantwortlicher",
    minWidth: 15,
  },
  {
    id: "date",
    label: "Datum",
    minWidth: 15,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 15,
    align: "right",
    format: (value: number) => value.toLocaleString("de-DE"),
  },

  {
    id: "id",
    label: "",
    minWidth: 170,
    align: "right",
    format: (value: number) => "",
  },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  // width: "100%",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function EnhancedTableToolbar() {
  const navigate = useNavigate();
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      {
        <Grid container>
          <Grid item>
            <Tooltip title="Filter list">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={0}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Grid>
        </Grid>
      }
      {
        <Box width={400}>
          <Grid container style={{ gap: 20 }}>
            <Grid>
              <Tooltip title="Filter list">
                <Button
                  onClick={() => navigate("/create-tickets")}
                  sx={{ borderRadius: 10 }}
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  Tickets
                </Button>
              </Tooltip>
            </Grid>
            <Grid>
              <Tooltip title="Filter list">
                <CreatePosPopUpForm />
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      }
    </Toolbar>
  );
}

export default function TicketsTable() {
  const shopState = React.useContext(ShopContext);

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { loading, error, data } = useQuery(TICKETS_BY_SHOP_ID, {
    variables: { shopId: shopState?.shop?.id },
  });

  const [
    deleteProduct,
    { error: errorDeleteProduct, data: dataDeleteProduct },
  ] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [
      {
        query: TICKETS_BY_SHOP_ID,
        variables: { shopId: shopState?.shop?.id },
      },
    ],
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const rawData: TicketData[] = data.ticketsByShopId;
  console.log("data:", data);
  console.log("rawData:", rawData);

  const rows: DisplayData[] = rawData.map((_data) => ({
    id: _data.id,
    namePos: _data.pos.name,
    nameResponsibleUser: _data.responsibleUser.name,
    date: _data.date,
    status: _data.status,
    updatedAt: _data.updatedAt,
  }));
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            stickyHeader
            aria-label="sticky table"
            size={dense ? "small" : "medium"}
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        const item = row;

                        if (column.id === "id") {
                          const rawTicket = rawData.find(
                            (ticket) => ticket.id === value
                          );
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              height={1}
                            >
                              {rawTicket ? (
                                <Grid>
                                  <TicketDetailsPopUp ticket={rawTicket} />
                                </Grid>
                              ) : (
                                <Box />
                              )}
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="kompackte Ansicht"
      />
    </Box>
  );
}
