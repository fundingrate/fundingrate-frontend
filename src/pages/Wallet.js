import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  Box,
  Flex,
  Divider,
  Input,
  Image,
  Card
} from "../primitives";
import { Switch, Route, Redirect } from "react-router-dom";
import { Inputs, Assets, Utils, Buttons, Cards } from "../components";
import { useWiring, store } from "../libs/wiring";

const GatewayLayout = ({ children }) => {
  return (
    <Flex
      width={1 / 2}
      my={4}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Text.Heading fontSize={7} m={2}>
        Deposit Options
      </Text.Heading>
      <Divider />
      <Text color="subtext" fontSize={3} p={3}>
        Please choose your prefered deposit method below.
      </Text>
      <Flex flexWrap="wrap" justifyContent="center">
        {children}
      </Flex>
    </Flex>
  );
};

const LoadingGateway = ({ onClick = x => x }) => {
  const [loading, setLoading] = useState(true);
  const [tickers, setTickers] = useState([]);

  const [state, setState] = useWiring(["myWallet", "myCommands"]);
  const { me, myWallet, myCommands } = state;

  useEffect(() => {
    state.actions.private("listCryptapiSupportedTickers").then(t => {
      setTickers(t);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Utils.LoadingPage />
  ) : (
    <GatewayLayout>
      {tickers.reduce((memo, t) => {
        const BTN = Buttons[t.toUpperCase()];
        if (!BTN) {
          console.log(
            "WARNING: missing button asset to display supported gateway."
          );
          return memo;
        }
        memo.push(
          <BTN key={t} onClick={x => onClick(`/wallet/deposit/${t}`)} />
        );
        return memo;
      }, [])}
    </GatewayLayout>
  );
};



const Deposit = ({ ticker }) => {
  const [{ myCommands, ...state }, setState] = useWiring([
    "myWallet",
    "myCommands"
  ]);
  const [loading, setLoading] = useState(false);
  const [tx, setTx] = useState(null);

  const CreateTransaction = async amount => {
    amount = Number(amount);

    console.log("CreateTransaction:", amount, ticker);

    setLoading(true);
    const tx = await state.actions.private("createCryptapiTransaction", {
      ticker,
      amount
    });
    console.log("CREATE TX:", tx);
    setTx(tx);
    setLoading(false);
  };

  const cmd = tx ? (myCommands[tx.id].tx ? myCommands[tx.id] : null) : null;
  console.log("cmd", cmd);

  return (
    <Flex
      width={[1, 2 / 3]}
      my={4}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Text.Heading fontSize={8}>Wallet Transaction</Text.Heading>
      <Divider m={2} bg="offwhite" />
      {!cmd ? (
        <>
          {loading ? (
            <Utils.LoadingPage />
          ) : (
            <>
              <Text m={3} color="subtext">
                Please enter or select your desired amount of {ticker.toUpperCase()} to begin the transaction.
              </Text>
              <Cards.InputAmount
                ticker={ticker}
                onSubmite={CreateTransaction}
              />
            </>
          )}
        </>
      ) : (
        <Cards.QrDeposit data={cmd} />
      )}
    </Flex>
  );
};

const Pages = {
  gateway: LoadingGateway,
  deposit: ({ location }) => {
    const ticker = location.pathname.split("/")[3];
    switch (ticker) {
      default:
        return <Deposit ticker={ticker} />;
    }
  },
  NotFound: ({ history }) => {
    setTimeout(history.goBack, 1000);
    // window.location.reload()
    return (
      <Box m={4}>
        <Text.Heading>404</Text.Heading>
        <Text>Redirecting...</Text>
      </Box>
    );
  }
};

export default ({
  prefix = "/wallet",
  from = "/wallet",
  to = "/wallet/gateway",
  location,
  history,
  ...p
}) => {
  // const cPage = location.pathname;
  // const label =
  //   cPage === "/wallet/dg" ? (
  //     <Button type="warning">Withdraw</Button>
  //   ) : (
  //     <Button type="simple" onClick={x => history.goBack()}>
  //       Go Back
  //     </Button>
  //   );

  return (
    <Flex.Content>
      <Switch>
        <Redirect exact from={from} to={to} />
        {Object.keys(Pages).map(k => {
          const Page = Pages[k];
          const path = `${prefix}/${k}`;
          const key = `page_${prefix}_${k}`;

          if (k === "NotFound")
            return (
              <Route
                key={key}
                render={props => {
                  return <Page {...props} {...p} onClick={history.push} />;
                }}
              />
            );

          return (
            <Route
              key={key}
              path={path}
              render={props => {
                return <Page {...props} {...p} onClick={history.push} />;
              }}
            />
          );
        })}
      </Switch>
    </Flex.Content>
  );
};
