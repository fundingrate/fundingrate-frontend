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
      <Flex.Column px={4}>
        <Text.Heading>Provider Marketplace</Text.Heading>
        <Divider m={2} bg="card" />
      </Flex.Column>
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
                  width={[1, 2 / 3]}
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
                  <Flex.Row mx={3}>
                    <RenderStats stats={p.stats} m={2} mt={0} />
                    <Box mx="auto" />
                    <Flex.Row mx={3} flexWrap="wrap">
                      <Text fontSize={3} color="subtext" my={1}>
                        Running Since:
                      </Text>
                      <Box mx={1} />
                      <Text>{Utils.renderProp(p.created, "time")}</Text>
                    </Flex.Row>
                  </Flex.Row>
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
      mt={3}
      mb={0}
      {...p}
      style={{
        overflow: "hidden",
        overflowX: "auto"
      }}
      flexWrap="wrap"
    >
      {valueProps
        .map(v => {
          return {
            label: v,
            value: stats[v]
          };
        })
        .map(s => (
          <Text.StatText key={s.label} {...s} m={2} />
        ))}
    </Flex.Row>
  );
};

const ProviderHeading = ({ title, subtitle, user }) => {
  return (
    <Flex.Row
      p={3}
      bg="backing"
      borderBottom="1px solid rgba(0, 0, 0, 0.5)"
      boxShadow="0px 0px 4px 0px rgba(0, 0, 0, 0.2)"
    >
      <Flex.Column>
        <Text.Heading fontSize={6}>{title}</Text.Heading>
        <Utils.clickProp fontSize={2} color="subtext" value={subtitle} />
      </Flex.Column>

      <Box mx="auto" />
      <Flex.Row>
        <Avatar
          src={user.avatar}
          size={40}
          border="2px solid"
          borderColor="offwhite"
        />
        <Box m={2} />
        <Flex.Column>
          <Text fontSize={3} color="subtext" my={1}>
            Created By:
          </Text>
          <Text>{user.username}</Text>
        </Flex.Column>
      </Flex.Row>
    </Flex.Row>
  );
};
