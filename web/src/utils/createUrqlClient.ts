import { dedupExchange, fetchExchange } from '@urql/core';
import { cacheExchange } from '@urql/exchange-graphcache';

import { LoginMutation, MeQuery, MeDocument, LogoutMutation, RegisterMutation } from '../generated/graphql/graphql';
import { betterUpdateQuery } from './betterUpdateQuery';
import { pipe, tap } from 'wonka';
import {Exchange} from 'urql'
import Router from 'next/router'

// handle all global error handling logic here
const errorExchange: Exchange = ({ forward }) => ops$ => {
  return pipe(
    forward(ops$),
    tap(({error}) => {
      if (error) {
        if(error.message.includes("not authenticated")) {
          Router.replace("/login")
        }
      }
    })
  );
};

export const createUrqlClient = (ssrExchange: any) => ({
    url: "http://localhost:4000/graphql",
    fetchOptions: { credentials: "include" as const },
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            login: (_result, args, cache, info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return { me: result.login.user };
                  }
                }
              );
            },
            logout: (_result, args, cache, info) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => {
                  return { me: null };
                }
              );
            },
            register: (_result, args, cache, info) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return { me: result.register.user };
                  }
                }
              );
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
});