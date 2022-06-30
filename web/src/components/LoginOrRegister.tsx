import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { useRouter } from "next/router";

interface Props {
  des?: string,
}

const LoginOrRegister = ({ des }: Props) => {

  const router = useRouter();

  const goToLogin = () => router.push("/login")
  const goToRegister = () => router.push("/register")

  return (
    <Flex h="100vh" flexDirection="column" justifyContent="center" alignItems="center">
      <Text fontWeight="bold">{des}</Text>
      <Box mt={2} >
        <Button onClick={goToLogin} mx={1}>Login</Button>
        <Button onClick={goToRegister} colorScheme="orange" mx={1}>Register</Button>
      </Box>
    </Flex>
  )
}

export default LoginOrRegister
