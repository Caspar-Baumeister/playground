import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/inputField";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { useCreateShopMutation } from "../generated/graphql/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

interface FormValues {
  name: string;
}

const CreateShop: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const initialValues: FormValues = { name: "" };
  const [, createShop] = useCreateShopMutation();
  return (
    <Layout variant="small">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values: FormValues, { setErrors }) => {
          console.log(values);
          const response = await createShop(values);
          if (response.data?.createShop.name) {
            router.push("/");
          }

          return response;
        }}
      >
        {(props) => (
          <Form>
            <InputField name="name" label="Name" />
            <Button
              type="submit"
              colorScheme="teal"
              isLoading={props.isSubmitting}
              mt={4}
            >
              create new shop
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateShop);
