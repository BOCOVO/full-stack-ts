import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Game } from "../components/game/Game";

const Play = () => {

  const [play, setPlay] = useState(false)
  return (
    play ? <Game />
      : <Flex alignItems="center" justifyContent="center" h="100vh">
        <Button size="lg" onClick={() => setPlay(!play)} > 🥎 Start ZeMovieQuiz</Button>
      </Flex>
  );
};

export default Play
