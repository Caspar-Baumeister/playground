import { Box } from '@chakra-ui/react';
import React from 'react'

interface WrapperProps {
    children: JSX.Element
    variant?: "small" | "regular"

}

export const Wrapper: React.FC<WrapperProps> = ({children, variant}) => {
        return (<Box mt={8} mx="auto" maxW={variant === "regular" ? '800px' : "400"} w='100%' >{children}</Box>);
}