// import React from 'react'
// import Utils from '../components/Utils'

// export default p => {
//   return (
//     <Utils.MarkdownLink link="https://gist.githubusercontent.com/tacyarg/c7f2cc5574218a008bd59e9a088c1a51/raw/fundingrateio_howto.md" />
//   )
// }

import React, { useEffect, useState } from "react";
import { Button, Flex, Box, Text, Well, Card, Divider } from "../primitives";
import { useWiring, store } from "../libs/wiring";
import { Utils, Modal, Buttons, Inputs, Editor } from "../components";

export default p => {
  const [state, dispatch] = useWiring(["myProviders"]);
  let list = state.myProviders ? Object.values(state.myProviders) : [];

  // const handleSearch = st => {
  //   if (!st) return setReducedList(list);
  //   const r = list.filter(o => Utils.searchProps(o, st));
  //   setReducedList(r);
  // };

  return (
    <Box width={1} p={4}>
      <Flex.Column px={4}>
        {list.length > 0
          ? [
              <Flex.Row>
                {/* <Inputs.Search onSearch={handleSearch} flexGrow={0} /> */}
                <Box mx={"auto"} />
                <Flex>
                  <Modal.CreateProvider
                    onConfirm={params =>
                      state.actions.private("createProvider", params)
                    }
                  />
                  <Modal.FAQ />
                </Flex>
              </Flex.Row>,
              <Box my={2} />,
              list.map(p => <ProviderCard providerid={p.id} />)
            ]
          : [
              <Text.Heading fontSize={6}>
                No providers, Why not create one?
              </Text.Heading>,
              <Box m={4} />,
              <Modal.CreateProvider
                type="simple"
                onConfirm={params =>
                  state.actions.private("createProvider", params)
                }
              />
            ]}
      </Flex.Column>
    </Box>
  );
};

const ProviderCard = React.memo(({ providerid }) => {
  const [state, dispatch] = useWiring(["myProviders"]);

  const p = state.myProviders[providerid];

  const pages = {
    Description: () => <Description providerid={p.id} />,
    "Alert Log": () => <AlertLog providerid={p.id} />
  };

  const [page, setPage] = useState("Description");
  const PAGE = pages[page];

  return (
    <Card as={Flex.Column} key={p.id} my={3} p={0}>
      <ProviderHeading title={p.name} subtitle={p.id} created={p.created} />
      <Flex.Row m={3}>
        {Object.keys(pages).map(k => {
          return (
            <Button
              onClick={e => setPage(k)}
              type={page === k ? "primary" : "simple"}
              mx={2}
            >
              {k}
            </Button>
          );
        })}
        <Box mx="auto" />
        <ButtonSetPublic isPublic={p.public} id={p.id} />
      </Flex.Row>
      <Flex.Column mx={2} mb={2}>
        {<PAGE />}
      </Flex.Column>
    </Card>
  );
});

const Description = React.memo(({ providerid }) => {
  const [state, dispatch] = useWiring(["myProviders", "providerAlerts"]);
  const [isEditing, setEditing] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const toggle = p => setEditing(!isEditing);
  const p = state.myProviders[providerid];

  const [data, setData] = useState(p.description);

  return [
    <Well height="300px">
      {isEditing ? (
        isLoading ? (
          <Utils.LoadingPage message="Saving Description..." />
        ) : (
          <Editor data={p.description} lang="markdown" onChange={setData} />
        )
      ) : (
        <Utils.RenderMarkdown source={p.description} />
      )}
    </Well>,
    <Flex.Row m={3}>
      <Box mx="auto" />
      {!isEditing ? (
        <Button type="primary" onClick={toggle}>
          Edit Description
        </Button>
      ) : (
        <Button
          type="success"
          onClick={async e => {
            setLoading(true);
            await state.actions.provider("setDescription", {
              providerid: p.id,
              description: data
            });
            setLoading(false);
            toggle();
          }}
        >
          {isLoading ? <Utils.Loading /> : "SaveDescription"}
        </Button>
      )}
    </Flex.Row>
  ];
});

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
      <Text>{Utils.renderProp(created, "time")}</Text>
    </Flex.Row>
  );
};

const AlertLog = ({ providerid }) => {
  const [state, dispatch] = useWiring(["myProviders", "providerAlerts"]);

  const alerts = state.providerAlerts ? state.providerAlerts[providerid] : [];
  const [loading, setLoading] = useState(false);

  const fetchState = async () => {
    setLoading(true);
    await state.actions
      .provider("listAlerts", {
        providerid
      })
      .then(a => dispatch("updateProp", ["providerAlerts", providerid], a));
    setLoading(false);
  };

  useEffect(() => {
    fetchState();
  }, []);

  return [
    <Well height="300px">
      {loading ? (
        <Utils.LoadingPage message="Refreshing Alert Log..." />
      ) : (
        <Editor
          data={alerts}
          readOnly
          lang="json"
          height="300px"
          placeholder="No alerts found."
        />
      )}
    </Well>,

    <Flex.Row m={3}>
      <Box mx="auto" />
      <Button type="success" onClick={fetchState}>
        {loading ? <Utils.Loading /> : "Refresh Log"}
      </Button>
    </Flex.Row>
  ];
};
