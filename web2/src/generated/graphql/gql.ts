/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "mutation changePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    user {\n      _id\n      name\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}": types.ChangePasswordDocument,
    "mutation createShop($name: String!) {\n  createShop(name: $name) {\n    _id\n    createdAt\n    updatedAt\n    creatorId\n    name\n  }\n}": types.CreateShopDocument,
    "mutation forgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}": types.ForgotPasswordDocument,
    "mutation Login($email: String!, $password: String!) {\n  login(options: {email: $email, password: $password}) {\n    user {\n      _id\n      name\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation Register($email: String!, $name: String!, $password: String!) {\n  register(options: {email: $email, name: $name, password: $password}) {\n    user {\n      _id\n      name\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}": types.RegisterDocument,
    "query Me {\n  me {\n    _id\n    name\n    email\n    createdAt\n    updatedAt\n  }\n}": types.MeDocument,
    "query Shops($limit: Int!) {\n  shops(limit: $limit) {\n    _id\n    name\n    creatorId\n    createdAt\n    updatedAt\n  }\n}": types.ShopsDocument,
};

export function graphql(source: "mutation changePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    user {\n      _id\n      name\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"): (typeof documents)["mutation changePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    user {\n      _id\n      name\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"];
export function graphql(source: "mutation createShop($name: String!) {\n  createShop(name: $name) {\n    _id\n    createdAt\n    updatedAt\n    creatorId\n    name\n  }\n}"): (typeof documents)["mutation createShop($name: String!) {\n  createShop(name: $name) {\n    _id\n    createdAt\n    updatedAt\n    creatorId\n    name\n  }\n}"];
export function graphql(source: "mutation forgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"): (typeof documents)["mutation forgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"];
export function graphql(source: "mutation Login($email: String!, $password: String!) {\n  login(options: {email: $email, password: $password}) {\n    user {\n      _id\n      name\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"): (typeof documents)["mutation Login($email: String!, $password: String!) {\n  login(options: {email: $email, password: $password}) {\n    user {\n      _id\n      name\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"];
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
export function graphql(source: "mutation Register($email: String!, $name: String!, $password: String!) {\n  register(options: {email: $email, name: $name, password: $password}) {\n    user {\n      _id\n      name\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"): (typeof documents)["mutation Register($email: String!, $name: String!, $password: String!) {\n  register(options: {email: $email, name: $name, password: $password}) {\n    user {\n      _id\n      name\n      email\n      createdAt\n      updatedAt\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"];
export function graphql(source: "query Me {\n  me {\n    _id\n    name\n    email\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query Me {\n  me {\n    _id\n    name\n    email\n    createdAt\n    updatedAt\n  }\n}"];
export function graphql(source: "query Shops($limit: Int!) {\n  shops(limit: $limit) {\n    _id\n    name\n    creatorId\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query Shops($limit: Int!) {\n  shops(limit: $limit) {\n    _id\n    name\n    creatorId\n    createdAt\n    updatedAt\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;