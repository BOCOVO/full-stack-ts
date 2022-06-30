// Api's types

export interface PageResponse {
  page: number;
  results: PopularMovieResponse[];
  total_pages: number;
  total_results: number;
}

export interface PopularMovieResponse {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface CastResponse {
  id: number;
  cast: Cast[];
  crew: Cast[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: string;
  job?: string;
}

// custom types

export type MovieCast = {
  name: string,
  profile_path: null | string
}

export type Movie = {
  id: number,
  title: string,
  poster_path: string,
  casting: MovieCast[]
}