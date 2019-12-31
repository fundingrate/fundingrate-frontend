import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Flex,
  Box,
  Text,
  Heading,
  Input,
  Divider
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

  return (
    <Flex.Content>
      <Flex my={2} flexDirection="column" alignItems="center">
        <Text.Heading m={2}>Welcome, {state.user.username}</Text.Heading>
        <Divider />
        <Text color="red" fontSize={3} p={3}>
          Please ensure you save this information or risk losing access to your
          account.
        </Text>
      </Flex>
      <Box my={2} />
      <Heading>User Details</Heading>
      <Card flexDirection="column" width={1} m={2}>
        <Inputs.Copy
          label="USERID: "
          placeholder="c3477d4e-84ea-404b-add7-733a3a161ad6"
          value={state.user.id}
        />
        <Box my={2} />
        <Inputs.Copy
          label="TOKENID: "
          placeholder="c3477d4e-84ea-404b-add7-733a3a161ad6"
          value={state.token}
        />
        <Box my={2} />
        <Flex alignItems="center">
          {state.token && <Utils.DownloadJson data={state} />}
          <Box mx="auto" />
          <Button.Logout disabled={!state} m={3}>
            LOGOUT
          </Button.Logout>
        </Flex>
      </Card>

      {/* <Trades actions={actions} /> */}
    </Flex.Content>
  );
};
