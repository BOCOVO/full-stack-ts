import { InputType, Field, ObjectType } from "type-graphql";
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
