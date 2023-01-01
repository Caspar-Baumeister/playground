import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Users from "./Components/Users";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import IsAuthenticated from "./Components/IsAuthenticated";
import Home from "./Routes/Home";
import Inventory from "./Routes/Inventory";

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
        element: <div>employees</div>,
      },
      {
        path: "/",
        element: <Users />,
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
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
