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
  Editor,
  Providers
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
    <Box width={1} p={'1%'}>
      <Flex.Column alignItems="center" width={1}>
        {list.length > 0
          ? [
              <Flex.Row width={1} flexWrap="wrap">
                <Text.Heading>My Providers</Text.Heading>

                {/* <Inputs.Search onSearch={handleSearch} flexGrow={0} /> */}
                <Box mx="auto" />
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
              <Flex justifyContent="center" flexWrap="wrap">
                {
                  list
                    .sort((a, b) => ((a.stats.profit < b.stats.profit) ? 1 : -1))
                    //.sort((a, b) => (a.stats.totalTrades < b.stats.totalTrades ? 1 : -1))
                    .map(p => <ProviderCard key={p.id} providerid={p.id} />)
                }
              </Flex>
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
  const [page, setPage] = useState("Stats");
  if(!p) return <Text> Provider not available. </Text>

  const pages = {
    Stats: () => <Stats providerid={p.id} />,
    "Trade History": () => <TradeHistory providerid={p.id} />,
    //Description: () => <Description providerid={p.id} />,
    Settings: () => <Settings providerid={p.id} />,
    "Alert Log": () => <AlertLog providerid={p.id} />,
    "Message Creator": () => <MessageCreator providerid={p.id} />
  };

  const PAGE = pages[page];

  return (
    <Card 
      as={Flex.Column} 
      key={p.id} 
      m={'1%'} 
      p={0} 
      //width={[1,1,1, 2 / 3]}
      //width={[1,1,1,1/3]}
      width="45%"
      maxWidth={'640px'}
      minWidth={'350px'}
    >
      <ProviderHeading title={p.name} subtitle={p.id} created={p.created} />
      <Flex.Row p={2} flexWrap="wrap" justifyContent="center" width={1}>
        {Object.keys(pages).map(k => {
          return (
            <Button
              textAlign={['left', 'center']}
              //flex={1}
              my={2}
              width={[1, '20%']}
              key={`${k}_${p.id}`}
              onClick={e => setPage(k)}
              type={page === k ? "primary" : "simple"}
            >
              {k}
            </Button>
          );
        })}
      </Flex.Row>
      <Box mx={2} mb={2}>
        {<PAGE />}
      </Box>
    </Card>
  );
});


const TradeHistory = React.memo(({ providerid }) => {
  const [state, dispatch] = useWiring(["myProviders", "providerAlerts"]);
  const p = state.myProviders[providerid];

  return (
    <Well>
    <Graphs.LineGraph
      listTrades={e =>
        state.actions.provider("listTrades", {
          providerid: p.id
        })
      }
    />
    </Well>
  );
});

const TradeStats = ({ stats }) => {
  const valueProps = [
    "longs",
    "shorts",
    "totalTrades",
    "longProfit",
    "shortProfit",
    "profit",
    "realizedProfit"
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
        .map((s, idx) => (
          <Text.StatText key={s.label} {...s} m={[1, 2]} />
        ))}
    </Flex.Column>
  );
};


const Stats = React.memo(({ providerid }) => {
  const [state, dispatch] = useWiring(["myProviders", "providerAlerts"]);
  const p = state.myProviders[providerid] || {}

  return [
    <Flex.Row flexWrap={"wrap"} justifyContent="center" minHeight="300px">
      <TradeStats stats={p.stats} />
      <Box m={4} />
      <Utils.RenderObject
        m={2}
        heading="Current Position"
        data={p.stats.currentPosition}
      />
    </Flex.Row>
  ];
});

const Settings = React.memo(({ providerid }) => {
  const [state, dispatch] = useWiring(["myProviders", "providerAlerts"]);
  const p = state.myProviders[providerid];

  return [
    <Box height="300px">
      <Inputs.SetProviderName providerid={p.id} name={p.name} />
      <Box m={1} />
      <Inputs.SetMakerFee providerid={p.id} fee={p.makerFee}/>
      <Box m={1} />
      <Input disabled value={p.disableAutoClose} label="Disable Auto Close:">
        <Buttons.SetDisableAutoClose state={p.disableAutoClose} id={p.id} />
      </Input>
      <Box m={1} />
      <Input disabled value={p.public} label="Listed Publicly: ">
        <Buttons.SetPublic isPublic={p.public} id={p.id} />
      </Input>
    </Box>,
    <Description providerid={p.id} />
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
    <Text.Heading m={2} fontSize={2}>
      Description
    </Text.Heading>,
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


const ProviderHeading = ({ title, subtitle, created }) => {
  
  const [isHover, setHover] = useState(false)
  const toggleHover = h => setHover(!isHover)
  
  return (
    <Flex.Row
      overflow="none"
      flexWrap="wrap"
      p={3}
      bg="backing"
      borderBottom="1px solid rgba(0, 0, 0, 0.5)"
      boxShadow="0px 0px 4px 0px rgba(0, 0, 0, 0.2)"
    >
      <Flex.Column mb={[2, 0]}>
        <Text.Heading fontSize={[2, 4, 6]}>{title}</Text.Heading>
        <Utils.clickProp fontSize={[1, 2]} color="subtext" value={subtitle} />
      </Flex.Column>

      <Box mx="auto" />
      <Box onMouseEnter={e => setHover(true)} onMouseLeave={e => setHover(false)}>
        { isHover ? <Buttons.Archive providerid={subtitle} /> : <Text>{Utils.renderProp(created, "time")}</Text> }
      </ Box>
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
    //<Well height="300px">
    //  {loading ? (
    //    <Utils.LoadingPage message="Refreshing Alert Log..." />
    //  ) : (
    //    <Editor
    //      data={alerts}
    //      readOnly
    //      lang="json"
    //      // height="300px"
    //      placeholder="No alerts found."
    //    />
    //  )}
    //</Well>,
    <Well height="300px" as={Flex.Column} >
       {loading ? (
         <Utils.LoadingPage message="Refreshing Alert Log..." />
       ) : !alerts ? (
         <Text m={4}>No alerts found.</Text>
       ) : (
         alerts.map(a => {
           return (
             <Utils.RenderObject
               p={2}
               heading={`[${a.type}] ${a.ticker} @ ${a.price}`}
               key={a.id}
               data={a}
             />
           );
         })
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

const MessageCreator = ({ providerid }) => {
  const [state, dispatch] = useWiring(["myProviders", "providerAlerts", "myTokens"]);
  const t = Object.keys(state.myTokens).find(x => !x.expired);
  const p = state.myProviders[providerid] || {} 
 
  const [type, setType] = useState('LONG')
  const [ticker, setTicker] = useState('BTC')

  const schema = {
    providerid: p.id,
    token: t,
    type,
    ticker
  }

  return <Well>
    <Text.Heading color="red" fontSize={2} p={2}>If no price is provided, we will attempt to obtain one for you.</Text.Heading>
    <Editor
      data={schema}
      //readOnly
      lang="json"
      // height="300px"
      placeholder="No alerts found."
    />
  </Well>
}
