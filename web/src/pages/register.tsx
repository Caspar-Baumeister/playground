import React from 'react'
import {Formik, Form} from 'formik'
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/inputField';
import { useMutation } from 'urql'
import { useRegisterMutation } from '../generated/graphql/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

interface registerProps {
}
interface FormValues {
    email: string;
    password: string;
  }


const Register: React.FC<registerProps> = ({}) =>  {
  const router = useRouter();
    const initialValues: FormValues = { email: "", password: "" };
    const [, register] = useRegisterMutation();
    return (
    <Wrapper variant='small'>
      <Formik 
        initialValues={initialValues} 
        onSubmit={async (values: FormValues, {setErrors})  => {
          console.log(values);
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors))
          } else if (response.data?.register.admin) {
            router.push("/");
          }
         return response;
        }}
      >
        {(props) => (
        <Form>
          <InputField name='email' label='Email'/>
          <Box mt={4}>
            <InputField name='password' label='Password' type='password'/>
          </Box> 
          <Button 
            type='submit' 
            colorScheme='teal'
            isLoading={props.isSubmitting}   
            mt={4}>
              register
            </Button>
        </Form>)}
      </Formik>
    
    </Wrapper>);
}


export default Register;