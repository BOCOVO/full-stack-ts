import { NextPage } from "next";
import { Formik, Form } from "formik";
import { Box, Button, Heading, Image, SimpleGrid } from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { FieldError, useLoginMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import arrayToKeyValueObject from "../utils/arrayToKeyValueObject";
import { Wrapper } from "../components/Wrapper";
import { RANDOM_MOVIE_POSTER } from "../constantes";
import { css } from "@emotion/react";

interface ILoginProps { }

const Login: NextPage<ILoginProps> = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <SimpleGrid w="100%" columns={{ base: 1, lg: 2 }}>
      <Wrapper variant="small">
        <Heading mb={5} as='h1' size='4xl'>
          Login
        </Heading>
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {

            const response = await login({ credential: values });
            const errors = response.data?.login.errors;
            const user = response.data?.login.user

            if (errors?.[0]) {
              setErrors(arrayToKeyValueObject<FieldError>(errors, "field", "message"))
            } else if (user) {
              router.push(`play`);
            }

          }}
        >
          {({ isSubmitting }) => (
            <Form >
              <InputField
                name="usernameOrEmail"
                placeholder="username"
                label="Username or Email"
                min={3}
                autoComplete="username"
                required
              />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </Box>
              <Button
                type="submit"
                mt={4}
                isLoading={isSubmitting}
                colorScheme="orange"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
      <Box display={{ base: "none", lg: "block" }}>
        <Image
          css={css`
            height:100vh;
            width:100%;
            object-fit:cover;
            `}
          alt="Movie image"
          src={RANDOM_MOVIE_POSTER} />
      </Box>
    </SimpleGrid>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false, })(Login);