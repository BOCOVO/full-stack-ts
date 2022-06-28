import { NextPage } from "next";
import { Formik, Form } from "formik";
import { Box, Button, Heading, Image, SimpleGrid } from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { FieldError, useRegisterMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import arrayToKeyValueObject from "../utils/arrayToKeyValueObject";
import { Wrapper } from "../components/Wrapper";
import { RANDOM_MOVIE_POSTER } from "../constantes";
import { css } from "@emotion/react";

interface IRegisterProps { }

const Register: NextPage<IRegisterProps> = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <SimpleGrid w="100%" columns={{ base: 1, lg: 2 }}>
      <Wrapper variant="small">
        <Heading mb={5} as='h1' size='4xl'>
          Create new account
        </Heading>
        <Formik
          initialValues={{ username: "", email: "", password: "", firstname: "", lastname: "", password_confirmation: "" }}
          onSubmit={async ({ password_confirmation, ...values }, { setErrors }) => {

            if (password_confirmation !== values.password) {
              setErrors({
                password_confirmation: "must be the same with password field"
              })
            }

            const response = await register({ input: values });
            const errors = response.data?.register.errors;
            const user = response.data?.register.user

            if (errors?.[0]) {
              setErrors(arrayToKeyValueObject<FieldError>(errors, "field", "message"))
            } else if (user) {
              router.push(`user/${user.username}`);
            }

          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
                min={3}
                required
              />
              <Box mt={4}>
                <InputField
                  name="email"
                  placeholder="email"
                  label="Email"
                  type="email"
                  required
                />
              </Box>
              <SimpleGrid mt={4} spacing={5} columns={{ sm: 1, md: 2 }}>
                <InputField
                  name="password"
                  placeholder="password"
                  required
                  label="Password"
                  min={3}
                  type="password"
                  autoComplete="new-password"
                />
                <InputField
                  name="password_confirmation"
                  placeholder="confirm you password"
                  label="Confirm you password"
                  required
                  min={3}
                  type="password"
                  autoComplete="new-password"
                />
              </SimpleGrid>
              <SimpleGrid mt={4} spacing={5} columns={{ sm: 1, md: 2 }}>
                <InputField
                  name="firstname"
                  placeholder="firstname"
                  min={3}
                  label="Your Firstname"
                />
                <InputField
                  name="lastname"
                  placeholder="lastname"
                  min={3}
                  label="Your Lastname"
                />
              </SimpleGrid>
              <Button
                type="submit"
                mt={4}
                isLoading={isSubmitting}
                colorScheme="blue"
              >
                Register
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

export default withUrqlClient(createUrqlClient, { ssr: true })(Register);
