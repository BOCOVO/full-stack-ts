import { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Timeout from "./Timeout";

interface DashboardProps {
  cScore: string | number, // current score
  bScore: string | number // best score
  delay: number,
  outCallback: Function
}

type ScoreItemProps = {
  des: string,
  score: string | number
}

const ScoreItem: FC<ScoreItemProps> = ({ des, score }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      mx={3}
    >
      <Text mr={2} fontWeight="bold">{des}</Text>
      <Box
        borderRadius="md"
        py={2}
        px={4}
        bg="red.600"
        color="red.100"
      >
        <Text fontWeight="bold">{score}</Text>
      </Box>
    </Box>
  )
}

export const Dashboard: FC<DashboardProps> = ({ cScore, bScore, delay, outCallback }) => {

  return (
    <Box
      display="flex"
      py={2}
      w="full"
      bg="red.100"
    >
      <Flex
        alignItems="center"
        mx="auto"
      >
        <ScoreItem score={cScore} des="🎮 Current Score" />
        <ScoreItem score={bScore} des="🏆 Your Best Score" />
        <Timeout outCallback={outCallback} delay={delay} />
      </Flex>
    </Box>
  );
};
