import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React, { useContext } from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql/graphql";
import { isServer } from "../utils/isServer";
import { ShopContext } from "./ShopContext";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const shopState = useContext(ShopContext);

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  // data is loading
  if (fetching) {
  }

  // user not logged in
  else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">Register</Link>
        </NextLink>
      </>
    );
  }

  // user is logget in
  else {
    body = (
      <Flex>
        <Box color="white" mr={6}>
          {shopState?.value?.name}
        </Box>

        <Box color="white" mr={6}>
          {data!.me!.name}
        </Box>

        <Button
          onClick={() => {
            logout({});
          }}
          isLoading={logoutFetching}
          color="white"
          variant="link"
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex p={4} bg="blue">
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
