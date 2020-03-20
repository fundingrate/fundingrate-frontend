// import React from 'react'
// import Utils from '../components/Utils'

// export default p => {
//   return (
//     <Utils.MarkdownLink link="https://gist.githubusercontent.com/tacyarg/c7f2cc5574218a008bd59e9a088c1a51/raw/fundingrateio_howto.md" />
//   )
// }

import React, { useEffect, useState } from "react";
import { Flex, Box, Text, Well, Card, Divider } from "../primitives";
import { useWiring, store } from "../libs/wiring";
import { Utils, Modal, Buttons, Inputs, Editor } from "../components";

export default p => {
  const [state, dispatch] = useWiring(["myProviders", "providerAlerts"]);

  const myProviders = state.myProviders ? Object.values(state.myProviders) : [];
  const [filteredList, setFiltered] = useState(myProviders);

  // if the state changes while searching, hydrate the shortlist
  useEffect(() => {
    // if (filteredList.length < 1) return;
    setFiltered(
      filteredList.map(r => {
        return state.myProviders[r.id];
      })
    );
  }, [state.myProviders]);

  const handleSearch = st => {
    console.log("searching for:", st);
    if (!st) return setFiltered(myProviders);
    const r = myProviders.filter(o => Utils.searchProps(o, st));
    console.log("search results:", r);
    setFiltered(r);
  };

  // const list = filteredList.length > 0 ? filteredList : myProviders;

  return (
    <Box width={1} px={4} py={4}>
      <Flex.Row>
        <Inputs.Search onSearch={handleSearch} flexGrow={0} />
        <Box mx={4} />
        <Flex>
          <Modal.CreateProvider
            onConfirm={params =>
              state.actions.private("createProvider", params)
            }
          />
          {/* <Modal.FAQ /> */}
        </Flex>
      </Flex.Row>
      <Box my={4} />
      <Flex.Column px={4}>
        {filteredList.map(p => {
          const alerts = state.providerAlerts
            ? state.providerAlerts[p.id]
            : null;

          return (
            <Card as={Flex.Column} key={p.id} my={3} p={0}>
              <ProviderHeading
                title={p.name}
                subtitle={p.id}
                created={p.created}
              />

              <Box m={4}>
                {alerts ? (
                  <AlertLog alerts={alerts} />
                ) : (
                  <Utils.RenderMarkdown source={p.description} />
                )}
              </Box>

              <Flex.Row m={4} mt={0}>
                <Box mx={"auto"} />
                <ButtonAlertsShowLog isHidden={alerts} id={p.id} />
                <Box mx={2} />
                <ButtonSetPublic isPublic={p.public} id={p.id} />
              </Flex.Row>
            </Card>
          );
        })}
      </Flex.Column>
    </Box>
  );
};

const ButtonAlertsShowLog = ({ isHidden, id }) => {
  return isHidden ? (
    <Buttons.hideProviderAlerts providerid={id} />
  ) : (
    <Buttons.listProviderAlerts providerid={id} />
  );
};

const ButtonSetPublic = ({ isPublic, id }) => {
  return isPublic ? (
    <Buttons.setProviderPrivate providerid={id} />
  ) : (
    <Buttons.setProviderPublic providerid={id} />
  );
};

const ProviderHeading = ({ title, subtitle, created }) => {
  return (
    <Flex.Row
      p={2}
      bg="backing"
      borderBottom="1px solid rgba(0, 0, 0, 0.5)"
      boxShadow="0px 0px 4px 0px rgba(0, 0, 0, 0.2)"
    >
      <Flex.Column>
        <Text.Heading fontSize={6}>{title}</Text.Heading>
        <Utils.clickProp fontSize={2} color="subtext" value={subtitle} />
      </Flex.Column>

      <Box mx="auto" />
      <Text>{Utils.renderProp(created, "time")}</Text>
    </Flex.Row>
  );
};

const AlertLog = ({ alerts }) => {
  return (
    <Flex.Column height="300px" as={Well} bg="darkBacking">
      {alerts.length > 0 ? (
        <Editor data={alerts} readOnly lang="json" height="300px" />
      ) : (
        <Text.Link m={2}>No Alerts Found, Start by using our API!</Text.Link>
      )}
    </Flex.Column>
  );
};
