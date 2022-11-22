import { Box, Flex, Heading, Link, Spacer, Stack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { Layout } from "../components/Layout";
import { useShopsQuery } from "../generated/graphql/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = useShopsQuery({ variables: { limit: 5 } });
  console.log("data", data);
  return (
    <Layout>
      <>
        <Flex align="center">
          <Heading>Your Shops</Heading>
          <Spacer />
          <NextLink href="/create-shop">
            <Link ml="auto">create shop</Link>
          </NextLink>
        </Flex>
        <br />
        {!data ? (
          <div>loading...</div>
        ) : (
          <Stack spacing={8}>
            {data.shops.map((shop) => (
              <Box key={shop._id} p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{shop.name}</Heading>
              </Box>
            ))}
          </Stack>
        )}
      </>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
