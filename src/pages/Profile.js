import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Flex,
  Box,
  Text,
  Heading,
  Input,
  Divider,
  Avatar
} from "../primitives";
import { Utils, Inputs, Buttons } from "../components";
import { useWiring, store } from "../libs/wiring";

export default ({ actions, location, token, history }) => {
  const cPage = location.pathname;

  const [gState, dispatch] = useWiring(["me"]);
  const user = gState.me;

  if (!user) {
    history.push("/authenticate");
    return <Text>Redirecting...</Text>;
  }

  const [state, setState] = useState({
    user,
    token: gState.token
  });

  console.log('s', state)

  return (
    <Flex.Content height={'100%'}>
      <Avatar src={state.user.avatar} size={128} mb={4} border="4px solid" borderColor="offwhite" />
      <Flex my={2} flexDirection="column" alignItems="center">
        <Text.Heading fontSize={7} m={2}>
          Welcome, {state.user.username}
        </Text.Heading>
        <Divider />
        <Text color="red" fontSize={3} p={3}>
          Please ensure you save this information or risk losing access to your
          account.
        </Text>
      </Flex>
      <Box my={2} />
      <Card.ProfileData userid={state.user.id} token={state.token}>
        {state.token && <Utils.DownloadJson data={state} />}
        <Box mx="auto" />
        <Button.Logout disabled={!state} mx={2}>
          LOGOUT
        </Button.Logout>
      </Card.ProfileData>
    </Flex.Content>
  );
};
