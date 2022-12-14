import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/inputField";
import { useMutation } from "urql";
import {
  EmailAndPassword,
  useLoginMutation,
} from "../generated/graphql/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const initialValues: FormValues = { email: "", password: "" };
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values: EmailAndPassword, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              router.push("/");
            }
          }
          return response;
        }}
      >
        {(props) => (
          <Form>
            <InputField name="email" label="Email" />
            <Box mt={4}>
              <InputField name="password" label="Password" type="password" />
            </Box>
            <Flex mt={2}>
              <NextLink href="/forgot-password">
                <Link ml="auto">forgot password?</Link>
              </NextLink>
            </Flex>
            <Button
              type="submit"
              colorScheme="teal"
              isLoading={props.isSubmitting}
              mt={4}
            >
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
