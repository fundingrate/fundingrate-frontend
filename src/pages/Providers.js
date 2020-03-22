import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Flex,
  Box,
  Text,
  Well,
  Card,
  Divider
} from "../primitives";
import { useWiring, store } from "../libs/wiring";
import {
  Graphs,
  Utils,
  Modal,
  Buttons,
  Banners,
  Inputs,
  Editor
} from "../components";
import { useHistory, useLocation } from "react-router-dom";

export default p => {
  const [state, dispatch] = useWiring(["myProviders"]);
  let list = state.myProviders ? Object.values(state.myProviders) : [];

  // const handleSearch = st => {
  //   if (!st) return setReducedList(list);
  //   const r = list.filter(o => Utils.searchProps(o, st));
  //   setReducedList(r);
  // };

  const history = useHistory();
  if (!state.userid) {
    history.push("/authenticate");
    return <Text>Redirecting...</Text>;
  }

  return (
    <Box width={1} p={4}>
      <Flex.Column px={4} alignItems="center" width={1}>
        {list.length > 0
          ? [
              <Flex.Row width={1}>
                <Text.Heading>My Providers</Text.Heading>

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
              <Divider m={2} bg="card" />,
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
    Stats: () => <Stats providerid={p.id} />,
    'Trade History': () => <TradeHistory providerid={p.id} />,
    Description: () => <Description providerid={p.id} />,
    Settings: () => <Settings providerid={p.id} />,
    "Alert Log": () => <AlertLog providerid={p.id} />
  };

  const [page, setPage] = useState("Stats");
  const PAGE = pages[page];

  return (
    <Card as={Flex.Column} key={p.id} my={3} p={0} width={[1, 2 / 3]}>
      <ProviderHeading title={p.name} subtitle={p.id} created={p.created} />
      <Flex.Row m={3}>
        {Object.keys(pages).map(k => {
          return (
            <Button
              key={`${k}_${p.id}`}
              onClick={e => setPage(k)}
              type={page === k ? "primary" : "simple"}
              mx={2}
            >
              {k}
            </Button>
          );
        })}
      </Flex.Row>
      <Flex.Column mx={2} mb={2}>
        {<PAGE />}
      </Flex.Column>
    </Card>
  );
});

const RenderStats = ({ stats }) => {
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
    <Flex.Column
      mt={3}
      mb={0}
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
    </Flex.Column>
  );
};

const TradeHistory = React.memo(({ providerid }) => {
  const [state, dispatch] = useWiring(["myProviders", "providerAlerts"]);
  const p = state.myProviders[providerid];

  return [
    <Well as={Flex.Row} minHeight="300px" p={4}>
      <Graphs.LineGraph
        listTrades={e =>
          state.actions.provider('listTrades', {
            providerid: p.id
          })
        }
      />
    </Well>
  ];
});

const Stats = React.memo(({ providerid }) => {
  const [state, dispatch] = useWiring(["myProviders", "providerAlerts"]);
  const p = state.myProviders[providerid];

  return [
    <Well as={Flex.Row} height="300px" p={4}>
      <RenderStats stats={p.stats} />
      <Box mx={"auto"} />
      {p.stats.currentPosition && (
        <Utils.RenderObject
          heading="Current Position"
          data={p.stats.currentPosition}
        />
      )}
    </Well>
  ];
});

const Settings = React.memo(({ providerid }) => {
  const [state, dispatch] = useWiring(["myProviders", "providerAlerts"]);
  const p = state.myProviders[providerid];

  return [
    <Box height="300px">
      <Inputs.SetProviderName providerid={p.id} name={p.name} />
      <Box m={1} />
      <Input disabled value={p.public} label="Listed Publicly: ">
        <ButtonSetPublic isPublic={p.public} id={p.id} />
      </Input>
    </Box>
  ];
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
    // <Well as={Flex.Row}>
    //   {loading ? (
    //     <Utils.LoadingPage message="Refreshing Alert Log..." />
    //   ) : !alerts ? (
    //     <Text m={4}>No alerts found.</Text>
    //   ) : (
    //     alerts.map(a => {
    //       return (
    //         <Utils.RenderObject
    //           heading="Current Position"
    //           key={a.id}
    //           data={a}
    //         />
    //       );
    //     })
    //   )}
    // </Well>,

    <Flex.Row m={3}>
      <Box mx="auto" />
      <Button type="success" onClick={fetchState}>
        {loading ? <Utils.Loading /> : "Refresh Log"}
      </Button>
    </Flex.Row>
  ];
};
