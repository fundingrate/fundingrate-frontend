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
import { Inputs, Assets, Utils } from "../components";
import { useWiring, store } from "../libs/wiring";

const DepositGateways = ({ onClick = x => x }) => {
  return (
    <Flex
      width={1 / 2}
      my={4}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Text.Heading fontSize={8}>Deposit Gateways</Text.Heading>
      <Divider m={4} bg="offwhite" />
      <Flex flexWrap="wrap" justifyContent="center">
        <Button
          type="offwhite"
          m={2}
          width={128}
          height={64}
          onClick={x => onClick("/wallet/btc")}
        >
          <Assets.Processors.Bitcoin_logo height={"100%"} />
        </Button>
        <Button
          m={2}
          type="offwhite"
          width={128}
          height={64}
          onClick={x => onClick("/wallet/eth")}
        >
          <Assets.Processors.eth_logo backgroundSize="170%" height={"100%"} />
        </Button>
        <Button
          m={2}
          type="offwhite"
          width={128}
          height={64}
          onClick={x => onClick("/wallet/bch")}
        >
          <Assets.Processors.bch_logo height={"100%"} />
        </Button>
        <Button
          m={2}
          type="offwhite"
          width={128}
          height={64}
          onClick={x => onClick("/wallet/xmr")}
        >
          <Assets.Processors.Monero_logo height={"100%"} />
        </Button>
        <Button
          m={2}
          type="offwhite"
          width={128}
          height={64}
          onClick={x => onClick("/wallet/teather")}
        >
          <Assets.Processors.teather backgroundSize="150%" height={"100%"} />
        </Button>
        {/* <Button
          m={2}
          type="offwhite"
          width={128}
          height={64}
          onClick={x => onClick("/wallet/waxpeer")}
        >
          <Flex alignItems="center">
            <Assets.Waxpeer size={44} />{" "}
            <Text px={2} color="black">
              WAXPEER
            </Text>
          </Flex>
        </Button>
        <Button
          m={2}
          type="offwhite"
          width={128}
          height={64}
          onClick={x => onClick("/wallet/g2a")}
        >
          <Assets.Processors.g2a_logo height={"100%"} />
        </Button>
        <Button
          m={2}
          type="offwhite"
          width={128}
          height={64}
          onClick={x => onClick("/wallet/steam")}
        >
          <Assets.Processors.steam_logo height={"100%"} />
        </Button>
        <Button
          m={2}
          type="offwhite"
          width={128}
          height={64}
          onClick={x => onClick("/wallet/p2pgg")}
        >
          <Assets.Processors.p2p_logo backgroundSize="120%" height={"100%"} />
        </Button>
        <Button
          m={2}
          type="offwhite"
          width={128}
          height={64}
          onClick={x => onClick("/wallet/chipsgg")}
        >
          <Assets.Chipsgg height={"100%"} width={128} />
        </Button>
        <Button
          m={2}
          type="offwhite"
          width={128}
          height={64}
          onClick={x => onClick("/wallet/paypal")}
        >
          <Assets.Processors.paypal_logo height={"100%"} />
        </Button> */}
      </Flex>
    </Flex>
  );
};

const InputButtons = ({ values = [], onClick = x => x }) => {
  values = [0.1, 0.25, 0.5, 0.75, 1];
  return (
    <Flex bg="darkBacking" p={2} borderRadius="normal">
      {values.map(v => (
        <Button onClick={e => onClick(v)} type="simple" mx={2} flex={0}>
          {v}
        </Button>
      ))}
    </Flex>
  );
};

const Bitcoin = p => {
  const [state, setState] = useWiring(["myWallet", "myCommands"]);
  const { me, myWallet, myCommands } = state;

  const [amount, setAmount] = useState(0.01);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingExchange, setLoadingExchange] = useState(false);
  const [tx, setTx] = useState(null);

  const CreateTransaction = async (amount, ticker = "btc") => {
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

  useEffect(() => {
    setLoadingExchange(true);
  }, [amount]);

  const debouncedAmount = Utils.useDebounce(amount, 500);
  useEffect(() => {
    state.actions
      .private("getCryptapiTickerPrice", { ticker: "btc", amount })
      .then(v => {
        setValue(v || 0);
        setLoadingExchange(false);
      });
  }, [debouncedAmount]);

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
                Please select your desired amount to begin the transaction.
              </Text>

              <Card
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <InputButtons onClick={setAmount} />
                <Box m={2} />
                <Input
                  flex={1}
                  label="Amount:"
                  placeholder="0.01"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                >
                  <Button
                    disabled={loadingExchange}
                    type="primary"
                    onClick={e => CreateTransaction(amount, "btc")}
                  >
                    ${value}
                  </Button>
                </Input>
              </Card>
            </>
          )}
        </>
      ) : (
        <Card m={2} alignItems="center" justifyContent="center">
          <Image size={240} src={cmd.tx.qr} />
          <Box mx={2} />
          <Flex
            m={2}
            height={"100%"}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Inputs.Copy
              flex={1}
              label="Send Exactly:"
              placeholder="0.01"
              value={cmd.tx.amount}
            />
            <Box m={2} />
            <Inputs.Copy
              flex={1}
              label="To Address:"
              placeholder="1APT1UoYgA8tJEnN1qe8rcvaN55NoASDju"
              value={cmd.tx.to}
            />
            <Box my={3} />
            <Text color="subtext" m={2}>
              Current Transaction State: {cmd.state}.
            </Text>
            <Text fontSize={1} color="subtext" m={1}>
              Last updated @ {Utils.renderProp(cmd.updated, "time")} with a
              total of {cmd.tries} attempt(s).
            </Text>
          </Flex>
        </Card>
      )}
    </Flex>
  );
};

const Pages = {
  dg: DepositGateways,
  btc: Bitcoin,
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
  to = "/wallet/dg",
  location,
  history,
  ...p
}) => {
  const cPage = location.pathname;
  const label =
    cPage === "/wallet/dg" ? (
      <Button type="warning">Withdraw</Button>
    ) : (
      <Button type="simple" onClick={x => history.goBack()}>
        Go Back
      </Button>
    );

  const [state, setState] = useWiring(["userid"]);
  const { me, myWallet } = state;

  return (
    <Flex width={1} alignItems="center" flexDirection="column">
      {/* <TitleBar label={label}>
        <Flex alignItems="center" justifyContent="center">
          <Assets.Icons.Wallet mx={2} />
          <Text fontSize={[2, 4]}>
            {Utils.renderProp(myWallet.balance, "money")}
          </Text>
        </Flex>
      </TitleBar> */}
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
    </Flex>
  );
};
