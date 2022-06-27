import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { ApolloContext, Credential, UserInput, UserResponse } from "../types";
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

  @Query(() => UserResponse)
  async login(
    @Arg("credential") credential: Credential,
    @Ctx() {req}:ApolloContext
  ): Promise<UserResponse | void> {
    const user = await User.findOne(
      credential.usernameOrEmail.includes("@")
        ? { where: { email: credential.usernameOrEmail } }
        : { where: { username: credential.usernameOrEmail } }
    );
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "user not found"
          }
        ]
      }
    }
    const correctPass = await argon2.verify(user.password, credential.password)
    if (!correctPass) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password or usernameOrEmail"
          }
        ]
      }
    }
    req.session.userId = user.id
    return {user}
  }

  @Query(() => User, { nullable: true })
  async getByUsername(
    @Arg("username") username: string
  ): Promise<User | null> {
    return User.findOne({ where: { username } });
  }
}
