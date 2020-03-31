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
import { Graphs, Utils, Modal, Buttons, Banners, Inputs, Editor } from "../components";
import { useHistory, useLocation } from "react-router-dom";

export default p => {
  const [state, dispatch] = useWiring(["publicProviders"]);
  let list = state.publicProviders ? Object.values(state.publicProviders) : [];

  return (
    <Box width={1} p={4}>
      <Flex.Row px={4} width={1} flexWrap="wrap">
        <Text.Heading>Provider Marketplace</Text.Heading>
        <Box mx={(2, "auto")} my={2} />
        <Inputs.Search onSearch={console.log} />
      </Flex.Row>
      <Divider m={2} bg="card" />

      <Flex.Column alignItems="center" width={1}>
        {list.length > 0 ? (
          list
            .sort((a, b) => a.stats.profit < b.stats.profit ? 1 : -1)
            .map(p => {
              return (
                <Card
                  as={Flex.Column}
                  key={p.id}
                  my={4}
                  p={0}
                  width={[1, 2 / 3]}
                >
                  <ProviderHeading
                    title={p.name}
                    subtitle={p.id}
                    created={p.created}
                    user={p.user}
                  />
                  <TradeHistory providerid={p.id}/>
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
    //"longs",
    //"shorts",
    "totalTrades",
    //"longProfit",
    //"shortProfit",
    "profit",
    "realizedProfit"
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
            width={[1, 'auto']}
            mr={idx + 1 !== valueProps.length ? 2 : 0}
          />
        ))}
    </Flex.Row>
  );
};

const ProviderHeading = ({ title, subtitle, user }) => {
  return (
    <Flex.Row
      p={2}
      bg="backing"
      borderBottom="1px solid rgba(0, 0, 0, 0.5)"
      boxShadow="0px 0px 4px 0px rgba(0, 0, 0, 0.2)"
    >
      <Text.Heading mx={2} fontSize={[2, 6]}>{title}</Text.Heading>
      <Box mx={'auto'} />
      <Flex.Row>
        <Text fontSize={[2, 3]}>{user.username}</Text>
        <Box mx={1} />
        <Avatar
          src={user.avatar}
          size={[24, 32]}
          border="2px solid"
          borderColor="offwhite"
        />
      </Flex.Row>
    </Flex.Row>
  );
};

const TradeHistory = React.memo(({ providerid }) => {
  const [state, dispatch] = useWiring(["myProviders", "providerAlerts"]);

  return (
    <Graphs.LineGraph
      listTrades={e =>
        state.actions.provider("listTrades", {
          providerid
        })
      }
    />
  );
});
