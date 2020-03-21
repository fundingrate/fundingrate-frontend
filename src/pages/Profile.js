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

  return (
    <Flex.Content height={'100%'}>
      <Avatar src={state.user.avatar} size={[64, 128]} mb={2} border="4px solid" borderColor="offwhite" />
      <Box m={2} />
      <ProfileHeading username={state.user.username} />
      <Box my={4} />
      <Card.ProfileData userid={state.user.id} token={state.token}>
        {state.token && <Utils.DownloadJson data={state} />}
        <Box mx="auto" />
        <Button.Logout disabled={!state} mx={2} />
      </Card.ProfileData>
    </Flex.Content>
  );
};

const ProfileHeading = ({ username }) => {
  return <Flex.Column alignItems="center">
    <Text.Heading fontSize={[4, 7]} m={2}>
      Welcome, {username}
    </Text.Heading>
    <Divider />
    <Text color="red" fontSize={[1, 3]} p={3}>
      Please ensure you save this information or risk losing access to your
      account.
    </Text>
  </Flex.Column>
}