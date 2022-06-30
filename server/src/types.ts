import { Request, Response } from "express";
import { InputType, Field, ObjectType } from "type-graphql";
import { Quiz } from "./entities/Quiz";
import { User } from "./entities/User";

@InputType()
export class UserInput {
  @Field(() => String)
  username!: string;
  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;

  @Field(() => String)
  firstname!: string;

  @Field(() => String)
  lastname!: string;
}

/* A part of the message object returned 
by a failed insertion in the database. It is used 
to send the error message to the user
*/

export type DBInsertionError = {
  code?: string,
  detail?: string
}

/*
The type of return message for an invalid user input.
*/
@ObjectType()
export class FieldError {
  @Field()
  field: string

  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User
}

@InputType()
export class Credential {
  @Field(() => String)
  usernameOrEmail: string

  @Field(() => String)
  password: string
}

export type ApolloContext = {
  res: Response,
  req: Request
}
declare module "express-session" {
  interface SessionData {
    userId: any
  }
}

export type MovieQuestion = {
  movie: string,
  actor: string,
  poster: string,
  actor_image: string,
  response: boolean
}

export type StringKeyObject = {
  [key: string]: string
}

@ObjectType()
export class GameResponse {
  @Field(() => [Quiz], { nullable: true })
  questions?: Quiz[]

  @Field(() => String, { nullable: true })
  error?: string
}

@ObjectType()
export class SimpleResponse{
  @Field({ nullable: true })
  result?: Boolean

  @Field(() => String, { nullable: true })
  error?: string
}