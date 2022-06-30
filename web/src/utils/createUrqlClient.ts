import { cacheExchange } from "@urql/exchange-graphcache";
import { NextUrqlClientConfig } from "next-urql";
import { dedupExchange, fetchExchange, OperationContext } from "urql";

const NEXT_PUBLIC_BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL!

export const URQL_OPTIONS:Partial<OperationContext> = {
  url: NEXT_PUBLIC_BACK_END_URL,
  fetchOptions: { credentials: "include" } // for cookie sending
}

export const createUrqlClient:NextUrqlClientConfig = (ssrExchange: any) => ({
  url: NEXT_PUBLIC_BACK_END_URL,
  fetchOptions: { credentials: "include" },
  exchanges: [dedupExchange, cacheExchange({}), ssrExchange, fetchExchange],
});
