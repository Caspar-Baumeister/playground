/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "mutation changePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    user {\n      _id\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}": types.ChangePasswordDocument,
    "mutation forgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}": types.ForgotPasswordDocument,
    "mutation Login($email: String!, $password: String!) {\n  login(options: {email: $email, password: $password}) {\n    user {\n      _id\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation Register($email: String!, $password: String!) {\n  register(options: {email: $email, password: $password}) {\n    user {\n      _id\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}": types.RegisterDocument,
    "query Me {\n  me {\n    _id\n    email\n    createdAt\n    updatedAt\n  }\n}": types.MeDocument,
};

export function graphql(source: "mutation changePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    user {\n      _id\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"): (typeof documents)["mutation changePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    user {\n      _id\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"];
export function graphql(source: "mutation forgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"): (typeof documents)["mutation forgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"];
export function graphql(source: "mutation Login($email: String!, $password: String!) {\n  login(options: {email: $email, password: $password}) {\n    user {\n      _id\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"): (typeof documents)["mutation Login($email: String!, $password: String!) {\n  login(options: {email: $email, password: $password}) {\n    user {\n      _id\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"];
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
export function graphql(source: "mutation Register($email: String!, $password: String!) {\n  register(options: {email: $email, password: $password}) {\n    user {\n      _id\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"): (typeof documents)["mutation Register($email: String!, $password: String!) {\n  register(options: {email: $email, password: $password}) {\n    user {\n      _id\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"];
export function graphql(source: "query Me {\n  me {\n    _id\n    email\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query Me {\n  me {\n    _id\n    email\n    createdAt\n    updatedAt\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;