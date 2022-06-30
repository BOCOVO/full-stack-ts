import { ApolloContext, GameResponse, SimpleResponse } from "../types";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../entities/User";
import { Game } from "../entities/Game";
import createGame from "../utils/createGame";
import hashids from "../utils/hashid";
import isAuth from "../middlewares/isAuth";
import { Quiz } from "../entities/Quiz";

@Resolver()
export class gameResolver {

  @Query(() => GameResponse)
  @UseMiddleware(isAuth)
  async newGame(
    @Arg("level") level: number,
    @Ctx() { req }: ApolloContext
  ): Promise<GameResponse> {
    const user = await User.findOne({
      where: { id: req.session.userId },
      relations: { game: true }
    })

    if (user) {
      // delete old game
      if (user.game) {
        await user.game.remove()
      }
      // create new game
      try {
        const newGame = await Game.create({
          level,
          user,
        }).save()
        const quizs = await createGame(level, newGame)
        await Quiz.save(quizs)
        // adding hash
        quizs.forEach(quiz => {
          quiz._id = hashids.encode(quiz.id)
        })
        return {
          questions: quizs
        }
      } catch (error) {
        console.log(error)
        return { error: "Something went wrong" }
      }

    }
    return { error: "Not authenticated" }
  }

  // get quiz answer
  @Mutation(() => SimpleResponse)
  @UseMiddleware(isAuth)
  async check(
    @Arg("id") id: string,
    @Ctx() { req }: ApolloContext
  ): Promise<SimpleResponse> {

    try {
      const quizId = Number(hashids.decode(id))
      const quiz = await Quiz.findOne({
        where: { id: quizId },
        relations: {
          game: true
        }
      })
      if (quiz) {
        const user = await User.findOne({
          where: { id: req.session.userId },
          relations: { game: true }
        })
        if (user?.game.id === quiz.game.id) {
          return {
            result: quiz.response
          }
        }
      }
    } catch (error) {
      console.log(error)
      return {
        error: "Something went wrong"
      }
    }
    return {
      error: "Not found"
    }
  }

  // clean all data about the game
  @Mutation(() => SimpleResponse)
  @UseMiddleware(isAuth)
  async cleanUp(
    @Ctx() { req }: ApolloContext
  ): Promise<SimpleResponse> {

    try {
      const user = await User.findOne({
        where: { id: req.session.userId },
        relations: { game: true }
      })
      if (user && user.game) {
        await Quiz.createQueryBuilder()
          .delete()
          .where("gameId = :gameId", { gameId: user.game.id })
        user.game.remove()
        return {
          result: true
        }
      }
    } catch (error) {
      console.log(error)
      return {
        error: "Something went wrong"
      }
    }
    return {
      error: "Not found"
    }
  }
}
