import React from "react";
import { Container, Flex, Box, Text, Banner } from "../primitives";
// import banner01 from "../assets/images/banner01.png";
import Utils from "./Utils";

const Welcome = props => {
  return (
    <Banner {...props} height={["40%", "60%"]}>
      <Flex
        as={Container}
        height={"100%"}
        flexDirection="column"
        justifyContent="center"
        pl={[2, "20%"]}
      >
        <Welcome.Text />
        <Welcome.Summary />
      </Flex>
    </Banner>
  );
};

Welcome.Text = () => {
  return (
    <Flex>
      <Text.Heading>Welcome to</Text.Heading>
      <Box mx={1} />
      <Text.Heading bold color="primary">
        P2P.GG
      </Text.Heading>
    </Flex>
  );
};

Welcome.Summary = () => {
  return (
    <Text opacity={0.5} lineHeight={1.5}>
      <Text>Welcome to our all in one CS:GO peer to peer marketplace.</Text>
      <Text>
        You finally are able to instantly buy and sell items for CS:GO!
      </Text>
      <Text>Create your account, top up, and start trading!</Text>
    </Text>
  );
};

const ColorBar = ({ children, ...p }) => {
  return (
    <Flex
      width={1}
      justifyContent="center"
      alignItems="center"
      bg="primary"
      p={[2, 4]}
      {...p}
    >
      {children}
    </Flex>
  );
};

const Notice = ({ children }) => (
  <ColorBar width={"auto"} m={2} p={2} bg="restricted" borderRadius={2}>
    {children}
  </ColorBar>
);



export default {
  Welcome,
  ColorBar,
  Notice
};
