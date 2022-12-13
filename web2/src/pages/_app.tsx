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
  console.log("Component");
  console.log(Component);
  console.log(Object.keys(Component));
  const Layout =
    Component.layout ||
    (({ children }) => {
      console.log("children");
      console.log(children);
      return <>{children}</>;
    });
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
