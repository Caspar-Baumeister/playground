import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React from "react";
import theme from "../theme";
import PageWithLayoutType from "../types/pageWithLayoutType";

export type AppLayoutProps = {
  Component: PageWithLayoutType;
  pageProps: any;
};

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const Layout = Component.layout || ((children) => <>{children}</>);
  return (
    <div>
      {/* <ChakraProvider theme={theme}> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </ChakraProvider> */}
    </div>
  );
}

export default MyApp;
