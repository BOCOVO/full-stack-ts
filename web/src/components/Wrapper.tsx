import { FC } from "react";
import { Box } from "@chakra-ui/react";

interface IWrapperProps {
  variant?: "small" | "regular" | "";
}

export const Wrapper: FC<IWrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      p={{base:10,md:0}}
      mt={8}
      mx="auto"
      my='auto'
      maxW={variant === "regular" ? "850px" : "450px"}
      w="full"
    >
      {children}
    </Box>
  );
};
