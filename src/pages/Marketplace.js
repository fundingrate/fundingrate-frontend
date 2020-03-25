import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Flex,
  Box,
  Text,
  Well,
  Card,
  Divider,
  Avatar
} from "../primitives";
import { useWiring, store } from "../libs/wiring";
import { Utils, Modal, Buttons, Banners, Inputs, Editor } from "../components";
import { useHistory, useLocation } from "react-router-dom";

export default p => {
  const [state, dispatch] = useWiring(["publicProviders"]);
  let list = state.publicProviders ? Object.values(state.publicProviders) : [];

  return (
    <Box width={1} p={4}>
      <Flex.Row px={4} width={1} flexWrap="wrap">
        <Text.Heading>Provider Marketplace</Text.Heading>
        <Box mx={(2, "auto")} my={[2, 0]} />
        <Inputs.Search onSearch={console.log} />
      </Flex.Row>
      <Divider m={2} bg="card" />

      <Flex.Column px={4} alignItems="center" width={1}>
        {list.length > 0 ? (
          list
            .sort((a, b) => a.stats.profit - b.stats.profit)
            .map(p => {
              return (
                <Card
                  as={Flex.Column}
                  key={p.id}
                  my={3}
                  p={0}
                  width={[1, 1, 2 / 3]}
                >
                  <ProviderHeading
                    title={p.name}
                    subtitle={p.id}
                    created={p.created}
                    user={p.user}
                  />
                  <Well height="300px" m={2}>
                    <Utils.RenderMarkdown source={p.description} />
                  </Well>
                  <Flex.Column m={3}>
                    <RenderStats stats={p.stats} mt={0} />
                    <Box m={1} />
                    <Flex.Row flexWrap="wrap">
                      <Text fontSize={3} my={1}>
                        Running Since:
                      </Text>
                      <Box mx={1} />
                      <Text color="subtext">
                        {Utils.renderProp(p.created, "time")}
                      </Text>
                    </Flex.Row>
                  </Flex.Column>
                </Card>
              );
            })
        ) : (
          <Text.Heading fontSize={6}>
            No providers, Why not create one?
          </Text.Heading>
        )}
      </Flex.Column>
    </Box>
  );
};

const RenderStats = ({ stats, ...p }) => {
  // useEffect(() => {
  const valueProps = [
    "longs",
    "shorts",
    "totalTrades",
    "longProfit",
    "shortProfit",
    "profit"
  ];

  return (
    <Flex.Row
      // mt={3}
      // mb={0}
      {...p}
      style={{
        overflow: "hidden",
        overflowX: "auto"
      }}
      flexWrap={"wrap"}
    >
      {valueProps
        .map(v => {
          return {
            label: v,
            value: stats[v]
          };
        })
        .map((s, idx) => (
          <Text.StatText
            key={s.label}
            {...s}
            mr={idx + 1 !== valueProps.length ? 2 : 0}
          />
        ))}
    </Flex.Row>
  );
};

const ProviderHeading = ({ title, subtitle, user }) => {
  return (
    <Flex.Row
      flexWrap="wrap"
      p={3}
      bg="backing"
      borderBottom="1px solid rgba(0, 0, 0, 0.5)"
      boxShadow="0px 0px 4px 0px rgba(0, 0, 0, 0.2)"
    >
      <Flex.Column mb={[2, 0]}>
        <Text.Heading fontSize={6}>{title}</Text.Heading>
        <Utils.clickProp fontSize={2} color="subtext" value={subtitle} />
      </Flex.Column>

      <Box mx={[0, "auto"]} />
      <Flex.Row>
        <Text fontSize={3}>{user.username}</Text>
        <Box mx={2} />
        <Avatar
          src={user.avatar}
          size={40}
          border="2px solid"
          borderColor="offwhite"
        />
      </Flex.Row>
    </Flex.Row>
  );
};
