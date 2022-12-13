/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type EmailAndPassword = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  changePassword: UserResponse;
  createProduct: Product;
  createShop: Shop;
  deleteProduct: Scalars["Boolean"];
  deleteShop: Scalars["Boolean"];
  forgotPassword: Scalars["Boolean"];
  login: UserResponse;
  logout: Scalars["Boolean"];
  register: UserResponse;
  updateProduct?: Maybe<Product>;
  updateShop?: Maybe<Shop>;
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars["String"];
  token: Scalars["String"];
};

export type MutationCreateProductArgs = {
  name: Scalars["String"];
};

export type MutationCreateShopArgs = {
  name: Scalars["String"];
};

export type MutationDeleteProductArgs = {
  id: Scalars["Float"];
};

export type MutationDeleteShopArgs = {
  id: Scalars["Float"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationLoginArgs = {
  options: EmailAndPassword;
};

export type MutationRegisterArgs = {
  options: NameEmailAndPassword;
};

export type MutationUpdateProductArgs = {
  id: Scalars["Float"];
  name?: InputMaybe<Scalars["String"]>;
};

export type MutationUpdateShopArgs = {
  id: Scalars["Float"];
  name?: InputMaybe<Scalars["String"]>;
};

export type NameEmailAndPassword = {
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
};

export type Product = {
  __typename?: "Product";
  _id: Scalars["Float"];
  createdAt: Scalars["String"];
  name: Scalars["String"];
  shopId: Scalars["Float"];
  updatedAt: Scalars["String"];
  usualPrice: Scalars["Float"];
};

export type Query = {
  __typename?: "Query";
  me?: Maybe<User>;
  product?: Maybe<Product>;
  products: Array<Product>;
  shop?: Maybe<Shop>;
  shops: Array<Shop>;
};

export type QueryProductArgs = {
  id: Scalars["Float"];
};

export type QueryShopArgs = {
  id: Scalars["Float"];
};

export type QueryShopsArgs = {
  limit: Scalars["Int"];
};

export type Shop = {
  __typename?: "Shop";
  _id: Scalars["Float"];
  createdAt: Scalars["String"];
  creatorId: Scalars["Float"];
  name: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type User = {
  __typename?: "User";
  _id: Scalars["Float"];
  createdAt: Scalars["String"];
  email: Scalars["String"];
  name: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars["String"];
  newPassword: Scalars["String"];
}>;

export type ChangePasswordMutation = {
  __typename?: "Mutation";
  changePassword: {
    __typename?: "UserResponse";
    user?: {
      __typename?: "User";
      _id: number;
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    } | null;
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
  };
};

export type CreateShopMutationVariables = Exact<{
  name: Scalars["String"];
}>;

export type CreateShopMutation = {
  __typename?: "Mutation";
  createShop: {
    __typename?: "Shop";
    _id: number;
    createdAt: string;
    updatedAt: string;
    creatorId: number;
    name: string;
  };
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type ForgotPasswordMutation = {
  __typename?: "Mutation";
  forgotPassword: boolean;
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "UserResponse";
    user?: {
      __typename?: "User";
      _id: number;
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    } | null;
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "UserResponse";
    user?: {
      __typename?: "User";
      _id: number;
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    } | null;
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "User";
    _id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ShopsQueryVariables = Exact<{
  limit: Scalars["Int"];
}>;

export type ShopsQuery = {
  __typename?: "Query";
  shops: Array<{
    __typename?: "Shop";
    _id: number;
    name: string;
    creatorId: number;
    createdAt: string;
    updatedAt: string;
  }>;
};

export const ChangePasswordDocument = gql`
  mutation changePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword) {
      user {
        _id
        name
        email
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useChangePasswordMutation() {
  return Urql.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument);
}
export const CreateShopDocument = gql`
  mutation createShop($name: String!) {
    createShop(name: $name) {
      _id
      createdAt
      updatedAt
      creatorId
      name
    }
  }
`;

export function useCreateShopMutation() {
  return Urql.useMutation<CreateShopMutation, CreateShopMutationVariables>(
    CreateShopDocument
  );
}
export const ForgotPasswordDocument = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export function useForgotPasswordMutation() {
  return Urql.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument);
}
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(options: { email: $email, password: $password }) {
      user {
        _id
        name
        email
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  );
}
export const RegisterDocument = gql`
  mutation Register($email: String!, $name: String!, $password: String!) {
    register(options: { email: $email, name: $name, password: $password }) {
      user {
        _id
        name
        email
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
export const MeDocument = gql`
  query Me {
    me {
      _id
      name
      email
      createdAt
      updatedAt
    }
  }
`;

export function useMeQuery(
  options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query">
) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
    ...options,
  });
}
export const ShopsDocument = gql`
  query Shops($limit: Int!) {
    shops(limit: $limit) {
      _id
      name
      creatorId
      createdAt
      updatedAt
    }
  }
`;

export function useShopsQuery(
  options: Omit<Urql.UseQueryArgs<ShopsQueryVariables>, "query">
) {
  return Urql.useQuery<ShopsQuery, ShopsQueryVariables>({
    query: ShopsDocument,
    ...options,
  });
}
