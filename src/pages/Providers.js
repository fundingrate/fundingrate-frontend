// import React from 'react'
// import Utils from '../components/Utils'

// export default p => {
//   return (
//     <Utils.MarkdownLink link="https://gist.githubusercontent.com/tacyarg/c7f2cc5574218a008bd59e9a088c1a51/raw/fundingrateio_howto.md" />
//   )
// }

import React, { useEffect, useState } from "react";
import { Flex, Box, Text, Well } from "../primitives";
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
    <Box width={1} px={4} py={2}>
      <Flex.Row>
        <Inputs.Search onSearch={handleSearch} flexGrow={0} />
        <Box mx={4} />
        <Flex>
          <Modal.CreateProvider
            onConfirm={params =>
              state.actions.private("createProvider", params)
            }
          />
          <Modal.FAQ />
        </Flex>
      </Flex.Row>
      <Box my={4} />
      <Flex.Column px={4}>
        {filteredList.map(p => {
          const alerts = state.providerAlerts
            ? state.providerAlerts[p.id]
            : null;

          return (
            <Utils.RenderObject heading={p.name} data={p} key={p.id}>
              {alerts && [
                <Flex.Column as={Well} p={2} bg="darkBacking">
                  {alerts.length > 0 ? (
                    <Editor data={alerts} readOnly />
                  ) : (
                    <Text color="red">No alerts yet.</Text>
                  )}
                </Flex.Column>,
                <Box my={2} />
              ]}
              <Flex.Row>
                <Box mx={"auto"} />
                {alerts ? (
                  <Buttons.hideProviderAlerts providerid={p.id} />
                ) : (
                  <Buttons.listProviderAlerts providerid={p.id} />
                )}
                <Box mx={2} />
                {p.public ? (
                  <Buttons.setProviderPrivate providerid={p.id} />
                ) : (
                  <Buttons.setProviderPublic providerid={p.id} />
                )}
              </Flex.Row>
            </Utils.RenderObject>
          );
        })}
      </Flex.Column>
    </Box>
  );
};
