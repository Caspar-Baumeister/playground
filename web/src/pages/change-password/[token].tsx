import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import router, { useRouter } from "next/router";
import React, { useState } from "react";
import { OperationResult } from "urql";
import { InputField } from "../../components/inputField";
import { Wrapper } from "../../components/Wrapper";
import {
  ChangePasswordMutation,
  useChangePasswordMutation,
} from "../../generated/graphql/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import NextLink from "next/link";

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = (await changePassword({
            token:
              typeof router.query.token === "string" ? router.query.token : "",
            newPassword: values.newPassword,
          })) as OperationResult<ChangePasswordMutation>;
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
          return response;
        }}
      >
        {(props) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="newPassword"
                label="New password"
                type="password"
              />
            </Box>
            {tokenError ? (
              <Flex>
                <Box mr={2} color="red">
                  {tokenError}
                </Box>
                <NextLink href="/forgot-password">
                  <Link>click here to get a new one</Link>
                </NextLink>
              </Flex>
            ) : null}
            <Button
              type="submit"
              colorScheme="teal"
              isLoading={props.isSubmitting}
              mt={4}
            >
              Change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ChangePassword);
