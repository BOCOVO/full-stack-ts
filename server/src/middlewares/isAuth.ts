import { ApolloContext } from "../types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<ApolloContext> = ({ context: { req } }, next) => {
  if(!req.session.userId){
    throw new Error("Not authenticated")
  }
  return next()
}

export default isAuth