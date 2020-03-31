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

  const [gState, dispatch] = useWiring(["me", "myTokens"]);
  const user = { ...gState.me, token: gState.token };

  if (!gState.me) {
    history.push("/authenticate");
    return <Text>Redirecting...</Text>;
  }

  const availableTokens = Object.values(gState.myTokens).filter(
    x => x.id !== gState.token
  );

  return (
    <Box width={1} p={4} width={[1,1,1, 2/3]}>
      <Avatar
        mx="auto"
        src={user.avatar}
        size={[64, 128]}
        my={[2,4]}
        border="4px solid"
        borderColor="offwhite"
      />
      <ProfileHeading username={user.username} />
      <Box my={4} />
      <Card.ProfileData user={user}>
        {user.token && <Utils.DownloadJson data={user} />}
        <Box mx="auto" />
        <Button.Logout disabled={!user} mx={2} />
      </Card.ProfileData>
      <Card as={Flex.Column}  my={4} mx="auto">
        <Flex my={2} flexDirection="column">
          <Flex.Row flexWrap="wrap">
            <Text.Heading fontSize={[3,4]}>Available Tokens</Text.Heading>
            <Box mx="auto" />
            <Button.GenerateToken />
          </Flex.Row>

          <Box my={2} />
          <Divider bg="primary" />
        </Flex>
        {!Object.values(gState.myTokens).length ? (
          <Utils.Loading m={2} />
        ) : availableTokens.length ? (
          availableTokens.map(t => {
            return (
              <Flex.Row
                key={t.id}
                // flexWrap="wrap"
                my={2}
                justifyContent="center"
              >
                <Button.DeleteToken tokenid={t.id} />
                <Box m={2} />
                <Inputs.Copy label="ID: " value={t.id} width={1} />
              </Flex.Row>
            );
          })
        ) : (
          <Text m={4} color="subtext">
            You have no additional tokens.
          </Text>
        )}
      </Card>
    </Box>
  );
};

const ProfileHeading = ({ username }) => {
  return (
    <Flex.Column alignItems="center">
      <Text.Heading fontSize={[4, 7]} m={2}>
        Welcome, {username}
      </Text.Heading>
      <Divider />
      <Text wrap color="red" fontSize={[1, 3]} p={3}>
        Please ensure you save this information or risk losing access to your
        account.
      </Text>
    </Flex.Column>
  );
};
