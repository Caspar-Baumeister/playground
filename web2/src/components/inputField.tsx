import React from 'react'
import {FieldHookConfig, useField} from 'formik'
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

type inputFieldProps = FieldHookConfig<any> & {
    label: string
    name: string
}

export const InputField: React.FC<inputFieldProps> = (props) => {
    const [field, {error}] = useField(props);
        return (<FormControl isInvalid={!!error}>
            <FormLabel>{props.label}</FormLabel>
            <Input {...field} type={props.type} id={field.name}  />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>);
}