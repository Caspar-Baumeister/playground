import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/inputField";
import { useRegisterMutation } from "../generated/graphql/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {}
interface FormValues {
  email: string;
  name: string;
  password: string;
}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const initialValues: FormValues = { email: "", name: "", password: "" };
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values: FormValues, { setErrors }) => {
          const response = await register(values);

          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/");
          }
          return response;
        }}
      >
        {(props) => (
          <Form>
            <InputField name="email" label="Email" />
            <Box mt={4}>
              <InputField name="name" label="Name" />
            </Box>
            <Box mt={4}>
              <InputField name="password" label="Password" type="password" />
            </Box>
            <Button
              type="submit"
              colorScheme="teal"
              isLoading={props.isSubmitting}
              mt={4}
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
