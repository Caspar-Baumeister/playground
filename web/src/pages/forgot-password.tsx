import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/inputField";
import { useMutation } from "urql";
import {
  EmailAndPassword,
  useForgotPasswordMutation,
  useLoginMutation,
} from "../generated/graphql/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface FormValues {
  email: string;
}

const ForgotPassword: React.FC<{}> = ({}) => {
  const router = useRouter();
  const initialValues: FormValues = { email: "" };
  const [sendTo, setSendTo] = useState("");
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values: FormValues, { setErrors }) => {
          await forgotPassword(values);
          setSendTo(values.email);
        }}
      >
        {(props) =>
          sendTo ? (
            <Box>
              we sended an email to {sendTo}. Click the link in the email to
              update your password
            </Box>
          ) : (
            <Form>
              <InputField name="email" label="Email" />

              <Button
                type="submit"
                colorScheme="teal"
                isLoading={props.isSubmitting}
                mt={4}
              >
                Send
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
