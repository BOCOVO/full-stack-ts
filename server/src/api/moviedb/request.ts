import axios from "axios"
import { PopularMovieResponse, PageResponse, CastResponse, Movie } from "./types"

const API_ROUTES = {
  popular: "/discover/movie"
}

const TMDb_BASE_URL = "https://api.themoviedb.org/3"

type MovieDbRequestParams = {
  sort_by?: "popularity.desc",
  page?: number
}

const request = <T>(path: string, params: MovieDbRequestParams = {}) => {
  return axios.get<T>(`${TMDb_BASE_URL}${path}`, {
    params: {
      api_key: process.env.TMDB_API_KEY,
      ...params
    }
  })
}


const getPopularMovies = async (page: number) => {
  const result = await request<PageResponse>(API_ROUTES.popular, {
    sort_by: "popularity.desc",
    page
  })
  return result.data.results
}

const getCasting = async (movieId: number) => {
  const { data: { cast } } = await request<CastResponse>(`/movie/${movieId}/credits`)
  return cast.map(({ name, profile_path }) => ({ name, profile_path }))
}

export const getPopularFromPage = async (from: number, pageCount: number): Promise<Movie[]> => {
  let result: PopularMovieResponse[] = []
  for (let index = 1; index <= pageCount; index++) {
    const pageResult = await getPopularMovies(from + index)
    result = result.concat(pageResult)
  }
  const resultWithCast: Movie[] = []
  for (let index = 0; index < result.length; index++) {
    const { id, title, poster_path } = result[index];
    const casting = await getCasting(id)
    resultWithCast.push(
      {
        id,
        title,
        poster_path,
        casting
      }
    )
  }
  return resultWithCast
}