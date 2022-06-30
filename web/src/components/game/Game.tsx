import { FC, useEffect, useState } from "react";
import { Box, Button, Flex, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import { Dashboard } from "./Dashboard";
import { Card } from "./Card";
import { useCheckMutation, useCleanUpMutation, useNewGameQuery } from "../../generated/graphql";
import { isAuthError, tmdbImage } from "../../utils/utils";
import { URQL_OPTIONS } from "../../utils/createUrqlClient";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import { QUESTION_TIMEOUT, SCORE_LOCALE_STOREAGE_KEY, UNIT_QUIZ_SCORE } from "../../constantes";
import LoginOrRegister from "../LoginOrRegister";

type UserResponseType = "yes" | "no"

interface GameProps {
}

export const Game: FC<GameProps> = () => {

  const [currentQuiz, setCurrentQuiz] = useState(4)
  const [level, setLevel] = useState(1)
  const [userResponse, setUserResponse] = useState<null | UserResponseType>(null)
  const [quizTimeout, setQuizTimeout] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)

  // muations and queries
  const [, getQuizResponse] = useCheckMutation()
  const [, clearGameOnBackEnd] = useCleanUpMutation()
  const [{ data, error, fetching }] = useNewGameQuery({
    variables: { level },
    context: URQL_OPTIONS,
    requestPolicy: "network-only",
    pause: level === 0
  });

  const toast = useToast()

  useEffect(() => {
    // get best storage
    const storageValue = Number(getLocalStorage(SCORE_LOCALE_STOREAGE_KEY)) || 0
    if (storageValue && storageValue !== bestScore) setBestScore(storageValue)
    // start count down after data is loaded
    if (data) {
      startCountDown()
    }
  }, [data])

  const startCountDown = () => {
    setQuizTimeout(Date.now() + (QUESTION_TIMEOUT * 1000))
  }

  const rePlay = () => {
    setLevel(1)
    setGameOver(false)
    setScore(0)
  }

  if (fetching) {
    return (
      <Flex alignItems="center" h="100vh" justifyContent="center">
        <Text fontSize="2xl" fontWeight="bold">Plase wait ...</Text>
      </Flex>
    )
  } else if (error && isAuthError(error)) {
    return <LoginOrRegister des="You must login to you account to play" />
  } else if (error || !data || data?.newGame.error) {
    return (
      <Flex alignItems="center" h="100vh" justifyContent="center">
        <Text fontSize="2xl" fontWeight="bold">Sorry, something went wrong.</Text>
      </Flex>
    )
  } else if (gameOver) {
    return (
      <Flex alignItems="center" flexDirection="column" h="100vh" justifyContent="center">
        <Text fontSize="3xl" color="red" fontWeight="bold">🎮 Oups Game Over</Text>
        <Text my={4} fontSize="3xl" fontWeight="bold">🏆 Your current score: {score}</Text>
        {bestScore < score
          ? <Text my={4} fontSize="3xl" fontWeight="bold">🥇This is your new best score🥇</Text>
          : null}
        <Button onClick={rePlay} size="lg"> 🥎 Play</Button>
      </Flex>
    )
  }

  // render the quiz
  const quiz = data!.newGame.questions![currentQuiz]

  const userFail = () => {
    setGameOver(true)
    setCurrentQuiz(0)
    setLevel(0)
    // update best score
    if (bestScore < score) {
      setLocalStorage(SCORE_LOCALE_STOREAGE_KEY, String(score))
    }
    clearGameOnBackEnd({}, URQL_OPTIONS)
    setQuizTimeout(0)
  }

  const gotToNextQuiz = () => {
    const newScore = score + UNIT_QUIZ_SCORE
    setScore(newScore)
    // switching next quiz
    if (data.newGame.questions![currentQuiz + 1]) {
      startCountDown()
      setCurrentQuiz(currentQuiz + 1)
    } else {
      setCurrentQuiz(0)
      toast({
        description: `🏆 You are best, you go to the next level ${level + 1}`,
        position: "top",
        status: "success"
      })
      setLevel(level + 1)
    }
  }

  const checkResponse = async (response: UserResponseType) => {
    setUserResponse(response)
    const result = await getQuizResponse({ checkId: quiz._id }, URQL_OPTIONS)
    if (result.error || !result.data || result.data.check.error) {
      setUserResponse(null)
      toast({
        description: "Something went wrong",
        position: "top",
        status: "error"
      })
    } else {
      const rightResult = result.data.check.result ? "yes" : "no"
      if (rightResult === response) {
        gotToNextQuiz()
      } else {
        toast({
          description: "You loose",
          position: "top",
          status: "warning"
        })
        userFail()
      }
    }
    setUserResponse(null)
  }

  return (
    <Box
      w="full"
    >
      {quizTimeout !== 0 ? <Dashboard outCallback={userFail} delay={quizTimeout} cScore={score} bScore={bestScore} /> : null}
      <Text align="center" fontWeight="bold" fontSize={{ base: "2xl", md: "3lx", lg: "4xl" }} mt={4}>Does this actor play in this movie?</Text>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection={{ base: "column", lg: "row" }}
        mx={{ lg: 5 }}
      >
        <Box>
          <SimpleGrid
            mt={4}
            columns={{ base: 1, md: 2 }}
            spacing={5}
            mx="auto"
            maxW={600}
          >
            <Card
              name={quiz.actor}
              image={quiz.actor_image ? tmdbImage(quiz.actor_image) : "https://via.placeholder.com/500x750.png?text=Photo+not+found"}
              hint="Actor"
            />
            <Card
              name={quiz.movie}
              image={tmdbImage(quiz.poster)}
              hint="Movie"
            />
          </SimpleGrid>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection={{ lg: "column" }}
          my={3}
          mx={2}
        >
          <Button
            colorScheme="green"
            minH={{ lg: "6rem" }}
            fontSize={{ lg: "3rem" }}
            minW={{ lg: "10.5rem" }}
            disabled={userResponse != null}
            isLoading={userResponse === "yes"}
            onClick={() => checkResponse("yes")}
            m={2}>👍 Yes</Button>
          <Button
            colorScheme="red"
            minH={{ lg: "6rem" }}
            fontSize={{ lg: "3rem" }}
            minW={{ lg: "10.5rem" }}
            disabled={userResponse != null}
            isLoading={userResponse === "no"}
            onClick={() => checkResponse("no")}
            m={2}>👎 No</Button>
        </Box>
      </Box>
    </Box>
  );
};
