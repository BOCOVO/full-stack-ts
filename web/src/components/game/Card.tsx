import { FC } from "react";
import { Badge, Box, Image, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";

interface CardProps {
  name: string,
  image: string,
  hint: string
}

export const Card: FC<CardProps> = ({ name, image, hint }) => {
  return (
    <Box
      position="relative"
    >
      <Box
        position="relative"
        borderRadius="lg"
        overflow="hidden"
        shadow="xl"
      >
        <Image
          width="100%"
          fallbackSrc=""
          objectPosition="top"
          objectFit="cover"
          alt={name}
          src={image} />
        <Text
          css={css`
        backdrop-filter:blur(5px);
        `}
          py={3}
          fontSize="xl"
          bg="#ffffff59"
          w="100%"
          bottom="0"
          position="absolute"
          align="center"
          fontWeight="bold" >{name}</Text>
      </Box>
      <Badge
        position="absolute"
        top={1}
        left={-1}
        variant="solid"
        colorScheme="orange">{hint}</Badge>
    </Box>
  );
};
