import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import {UserInput, UserResponse } from "../types";
import argon2 from "argon2"
import uniqueDBError from "../utils/uniqueDBError";
import userValidator from "../utils/userValidator";

@Resolver()
export class userResolver {

  @Mutation(() => UserResponse)
  async register(@Arg("input") input: UserInput): Promise<UserResponse | void> {
    // make validation
    const errors = userValidator(input)
    if (errors.length) {
      return { errors }
    }
    // continue saving
    const { password, ...rest } = input
    const hashedPassword = await argon2.hash(password)
    try {
      const user = await User.create({
        password: hashedPassword,
        ...rest
      }).save();
      return { user };

    } catch (error) {
      // handle unique field error
      const uniqueError = uniqueDBError({
        detail: error.detail,
        code: error.code
      }, ["username", "email"]);

      if (uniqueError) {
        return {
          errors: [uniqueError]
        }
      }
    }
  }

  @Query(() => User, { nullable: true })
  async getByUsername(
    @Arg("username") username: string
  ): Promise<User | null> {
    return User.findOne({ where: { username } });
  }
}
