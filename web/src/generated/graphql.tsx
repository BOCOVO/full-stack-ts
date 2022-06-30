import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Credential = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GameResponse = {
  __typename?: 'GameResponse';
  error?: Maybe<Scalars['String']>;
  questions?: Maybe<Array<Quiz>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  check: SimpleResponse;
  cleanUp: SimpleResponse;
  login: UserResponse;
  register: UserResponse;
};


export type MutationCheckArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  credential: Credential;
};


export type MutationRegisterArgs = {
  input: UserInput;
};

export type Query = {
  __typename?: 'Query';
  getByUsername?: Maybe<User>;
  newGame: GameResponse;
};


export type QueryGetByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryNewGameArgs = {
  level: Scalars['Float'];
};

export type Quiz = {
  __typename?: 'Quiz';
  _id: Scalars['String'];
  actor: Scalars['String'];
  actor_image: Scalars['String'];
  createdAt: Scalars['String'];
  movie: Scalars['String'];
  poster: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type SimpleResponse = {
  __typename?: 'SimpleResponse';
  error?: Maybe<Scalars['String']>;
  result?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['Int'];
  lastname: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: number, email: string, firstname: string, lastname: string, username: string, createdAt: string, updatedAt: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, email: string, firstname: string, lastname: string, username: string, createdAt: string, updatedAt: string } | null };

export type CleanUpMutationVariables = Exact<{ [key: string]: never; }>;


export type CleanUpMutation = { __typename?: 'Mutation', cleanUp: { __typename?: 'SimpleResponse', error?: string | null, result?: boolean | null } };

export type CheckMutationVariables = Exact<{
  checkId: Scalars['String'];
}>;


export type CheckMutation = { __typename?: 'Mutation', check: { __typename?: 'SimpleResponse', result?: boolean | null, error?: string | null } };

export type LoginMutationVariables = Exact<{
  credential: Credential;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, email: string, firstname: string, lastname: string, username: string, createdAt: string, updatedAt: string } | null } };

export type RegisterMutationVariables = Exact<{
  input: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, email: string, firstname: string, lastname: string, username: string, createdAt: string, updatedAt: string } | null } };

export type GetByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetByUsernameQuery = { __typename?: 'Query', getByUsername?: { __typename?: 'User', id: number, username: string, firstname: string, lastname: string, email: string, createdAt: string, updatedAt: string } | null };

export type NewGameQueryVariables = Exact<{
  level: Scalars['Float'];
}>;


export type NewGameQuery = { __typename?: 'Query', newGame: { __typename?: 'GameResponse', error?: string | null, questions?: Array<{ __typename?: 'Quiz', _id: string, actor: string, actor_image: string, movie: string, poster: string }> | null } };

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  email
  firstname
  lastname
  username
  createdAt
  updatedAt
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const CleanUpDocument = gql`
    mutation CleanUp {
  cleanUp {
    error
    result
  }
}
    `;

export function useCleanUpMutation() {
  return Urql.useMutation<CleanUpMutation, CleanUpMutationVariables>(CleanUpDocument);
};
export const CheckDocument = gql`
    mutation Check($checkId: String!) {
  check(id: $checkId) {
    result
    error
  }
}
    `;

export function useCheckMutation() {
  return Urql.useMutation<CheckMutation, CheckMutationVariables>(CheckDocument);
};
export const LoginDocument = gql`
    mutation Login($credential: Credential!) {
  login(credential: $credential) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($input: UserInput!) {
  register(input: $input) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const GetByUsernameDocument = gql`
    query GetByUsername($username: String!) {
  getByUsername(username: $username) {
    id
    username
    firstname
    lastname
    email
    createdAt
    updatedAt
  }
}
    `;

export function useGetByUsernameQuery(options: Omit<Urql.UseQueryArgs<GetByUsernameQueryVariables>, 'query'>) {
  return Urql.useQuery<GetByUsernameQuery>({ query: GetByUsernameDocument, ...options });
};
export const NewGameDocument = gql`
    query NewGame($level: Float!) {
  newGame(level: $level) {
    questions {
      _id
      actor
      actor_image
      movie
      poster
    }
    error
  }
}
    `;

export function useNewGameQuery(options: Omit<Urql.UseQueryArgs<NewGameQueryVariables>, 'query'>) {
  return Urql.useQuery<NewGameQuery>({ query: NewGameDocument, ...options });
};