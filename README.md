# ZeMovieQuiz

A simple movie game created with a backend and a frontend designed with modern TypeScript tools.
The main source code is provided by this [repository](https://github.com/Valentino-Houessou/typescript-fullstack-starter/tree/develop#docs)

# Tools
### overall

- [typescript](https://www.typescriptlang.org/)
- [graphql](https://graphql.org/)
- [docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)
- [Ben Awad](https://www.youtube.com/watch?v=I6ypD7qv3Z8)

### front

- [Next Js](https://nextjs.org/)
- [urql](https://formidable.com/open-source/urql/)
- [graphql-codegen](https://www.graphql-code-generator.com/)
- [Chakra UI](https://chakra-ui.com/)
- [Formik](https://formik.org/)

### back

- [express](https://expressjs.com/)
- [Apollo server](https://www.apollographql.com/docs/apollo-server/)
- [type-graphql](https://typegraphql.com/)
- [Typeorm](https://typeorm.io/)

## Requirements

you need the followings tool installed in your environment

- docker
- docker-compose
- node `16.13.1` and bigger
- yarn

## Set up

:warning: If your are working on windows system, you will need to create your own entrypoint.sh (in server folder) with the command inside the provided, then delete the provided.This is because windows end of line character (and others) are different from linux one.

### Server

- cd `server` directory
- create `dbdata` directory. It is the volume that will be use by Postgres
- create `.env.development` file adapt it to your environment (see exemple in `.env.exemple`)
- create `.env.database` file and add the following variables (adapt to your environment).

```
POSTGRES_PASSWORD=valery
POSTGRES_USER=valentino
POSTGRES_DB=starter-dev
```

- Make sure you have the same environment variables for database in both env file
- run `yarn`
- run `yarn build`

### Web

- cd `web` directory
- create `.env.local` file and add the following variables (adapt to your environment)

```
# back-end URL
NEXT_PUBLIC_BACK_END_URL=http://localhost:4000/graphql
```

- run `yarn`

## Launch

- run `sudo docker-compose up`. The sudo is needed only for the first launch
- all your updates are reflected to the container. You can code peacefully

### server

- go to `https://studio.apollographql.com/sandbox/explorer`

### web

- go to `http://localhost:3000/register` to create account 
- go to `http://localhost:3000/play` to play the game
