import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
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
        <Box color="white" mr={2}>
          {data!.me!.email}
        </Box>

        <Button color="white" variant="link">
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
