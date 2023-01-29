import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import Users from "./Routes/Users";
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
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: "include",
});
// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql",
//   cache: new InMemoryCache(),
//   credentials: "include",
// });

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
      // {
      //   path: "/",
      //   element: <Users />,
      // },
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

  // {
  //   path: "/register",
  //   element: <Register />,
  // },
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
