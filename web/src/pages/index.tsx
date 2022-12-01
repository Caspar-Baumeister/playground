import { Box, Flex, Heading, Link, Spacer, Stack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { FC, useState } from "react";
import { ShopContext, ShopType } from "../components/ShopContext";
import { useMeQuery, useShopsQuery } from "../generated/graphql/graphql";
import MainLayout from "../layouts/mainLayout";
import PageWithLayoutType from "../types/pageWithLayoutType";
import { createUrqlClient } from "../utils/createUrqlClient";
import { isServer } from "../utils/isServer";
import { AppLayoutProps } from "./_app";

const Index: React.FC = () => {
  const [value, setValue] = useState<ShopType | null>(null);
  const [{ data: shopData }] = useShopsQuery({ variables: { limit: 5 } });
  const [{ data: meData, fetching }] = useMeQuery({
    pause: isServer(),
  });

  return (
    <ShopContext.Provider value={{ value, setValue }}>
      {/* <Layout> */}
      {meData?.me ? (
        <>
          <Flex align="center">
            <Heading>Your Shops</Heading>
            <Spacer />
            <NextLink href="/create-shop">
              <Link ml="auto">create shop</Link>
            </NextLink>
          </Flex>
          <br />
          {!shopData ? (
            <div>loading...</div>
          ) : (
            <Stack spacing={8}>
              {shopData.shops.map((shop) => (
                <Box
                  onClick={() => {
                    setValue({ name: shop.name, id: shop._id });
                  }}
                  key={shop._id}
                  p={10}
                  shadow="md"
                  borderWidth="1px"
                >
                  <Heading fontSize="xl">{shop.name}</Heading>
                </Box>
              ))}
            </Stack>
          )}
        </>
      ) : (
        <>
          <Flex align="center">
            <NextLink href="/login">
              <Link ml="auto">Login here</Link>
            </NextLink>
            <Spacer />
            <NextLink href="/register">
              <Link ml="auto">or create an account</Link>
            </NextLink>
          </Flex>
        </>
      )}
      {/* </Layout> */}
    </ShopContext.Provider>
  );
};

(Index as PageWithLayoutType).layout = MainLayout;

// export default withUrqlClient(createUrqlClient, { ssr: false })(Index);

// import React from "react";
// import Head from "next/head";
// import PageWithLayoutType from "../types/pageWithLayoutType";

// import MainLayout from "../layouts/mainLayout";
// import { createUrqlClient } from "../utils/createUrqlClient";
// import { withUrqlClient } from "next-urql";
// import { NextPage } from "next";

// const Home: React.FC = () => {
//   return (
//     <div>
//       <Head>
//         <title>Create Next App</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main>
//         <h1>
//           Welcome to <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <p>
//           Get started by editing <code>pages/index.js</code>
//         </p>
//       </main>
//     </div>
//   );
// };

// (Home as PageWithLayoutType).layout = MainLayout;

export default withUrqlClient(createUrqlClient, { ssr: false })(
  Index as PageWithLayoutType
);
