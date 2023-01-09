import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Users from "./Components/Users";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import IsAuthenticated from "./Components/IsAuthenticated";
import Home from "./Routes/Home";
import Inventory from "./Routes/Inventory";
import TicketsHome from "./Routes/TicketsHome";
import CreateTickets from "./Routes/CreateTickets";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

const router = createBrowserRouter([
  {
    element: (
      <IsAuthenticated>
        <Home />
      </IsAuthenticated>
    ),
    children: [
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/user-roles",
        element: <Users />,
      },
      {
        path: "/tickets",
        element: <TicketsHome />,
      },
      {
        path: "/",
        element: <Users />,
      },
      {
        path: "/create-tickets",
        element: <CreateTickets />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <ApolloProvider client={client}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ApolloProvider>
  );
}

export default App;
