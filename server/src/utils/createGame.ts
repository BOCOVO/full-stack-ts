import { getPopularFromPage } from "../api/moviedb/request"
import { Movie } from "../api/moviedb/types"
import { GAME_LEVEL_MOVIE_PAGE_COUNT, QUIZ_PER_GAME } from "../constants"
import { Quiz } from "../entities/Quiz"
import { StringKeyObject } from "../types"
import { Game } from "../entities/Game"

const shuffleArray = <T>(arr: T[]) => {
  // avoid side effect
  const copy = [...arr]
  return copy.sort(() => 0.5 - Math.random())
}

const ramdomItem = <T>(arr: T[], untilIf?: ((item: T) => boolean)): T => {
  const value = arr[Math.floor(Math.random() * arr.length)]
  if (untilIf && !untilIf(value)) {
    for (let index = 0; index < arr.length; index++) {
     if(untilIf(arr[index])) return arr[index];
    }
  }
  return value
}

const getRandomActor = (inList: string[], notIn: Set<string>): string => {
  const radomActor = ramdomItem(inList)
  if (notIn.has(radomActor)) return getRandomActor(inList, notIn)
  return radomActor
}

const getAllCasting = (list: Movie[]) => {
  return list.reduce<StringKeyObject>(
    (reduce, { casting }) => ({
      ...reduce,
      ...casting.reduce<StringKeyObject>((acc, { name, profile_path }) => ({ ...acc, [name]: profile_path! }), {})
    })
    , {})
}

const createGame = async (level: number, game: Game) => {
  const startFrom = (level - 1) * GAME_LEVEL_MOVIE_PAGE_COUNT

  let movies = await getPopularFromPage(startFrom, GAME_LEVEL_MOVIE_PAGE_COUNT)
  movies = shuffleArray(movies)

  // the movies that will be used to create quiz
  const quizMovies = movies.slice(0, QUIZ_PER_GAME)
  // all quizMovies actors name
  const quizMoviesCastings = new Set<string>(Object.keys(getAllCasting(quizMovies)))

  // elseMovies's castings will be used to create wrong actor
  const elseMovies = movies.slice(QUIZ_PER_GAME)

  // all quizMovies actors name
  // Set is used to avoid double name
  const elseMoviesCasting = getAllCasting(elseMovies)
  const elseAactor = Object.keys(elseMoviesCasting)

  // make questions 
  const middle = Math.floor(QUIZ_PER_GAME / 2) // to balance the answers between yes or no
  const quizs: Quiz[] = quizMovies.map<Quiz>((movie, index): Quiz => {
    // with no as response
    if (index < middle) {
      const actor = getRandomActor(elseAactor, quizMoviesCastings)
      return Quiz.create({
        actor,
        actor_image: elseMoviesCasting[actor] || "",
        response: false,
        game: game,
        movie: movie.title,
        poster: movie.poster_path,
      })
    } else {
      // select actor with a profile image
      const actor = ramdomItem(movie.casting, (item) => !!item.profile_path)
      return Quiz.create({
        actor: actor.name,
        actor_image: actor.profile_path || "",
        response: true,
        game: game,
        movie: movie.title,
        poster: movie.poster_path,
      })
    }
  })
  return shuffleArray(quizs)
}

export default createGame