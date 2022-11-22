import React from "react";
import { NavBar } from "./NavBar";
import { Wrapper, WrapperProps, WrapperVariant } from "./Wrapper";

interface LayoutProps {
  children?: JSX.Element;
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ variant, children }) => {
  return (
    <div>
      <NavBar />
      <Wrapper variant={variant} children={children}></Wrapper>
    </div>
  );
};
