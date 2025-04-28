import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import { BsPlusCircle } from "react-icons/bs";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22", sm: "32" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, blue.500, cyan.400)"}
        >
          <Link to={"/"}>Your Product</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <BsPlusCircle size={20} />
           </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon size="20"/> : <LuSun size="20"/> }
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
