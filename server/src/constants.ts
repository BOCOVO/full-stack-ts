//the number of page to use to build a game
export const GAME_LEVEL_MOVIE_PAGE_COUNT = 1
// the number of quiz in a game session
export const QUIZ_PER_GAME = 10

export default {
  __prod__: process.env.NODE_ENV === "production",
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT as string, 10) || 4000,
  backend_url: process.env.BACK_END_URL || "",
  frontend_url: process.env.FRONT_END_URL || "",
  studio_apollo_graphql_url: process.env.STUDIO_APOLLO_GRAPHQL_URL || "",
  dbConnectionRetries: process.env.DB_CONNECTION_RETRIES || 5,
  timeoutBeforeRetry: process.env.TIMEOUT_BEFORE_RETRY || 5000,
};
