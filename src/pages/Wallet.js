import React, { useState, useEffect } from "react";
import { Button, Text, Box, Flex, Divider, Input, Image } from "../primitives";
import { Switch, Route, Redirect } from "react-router-dom";
import { Assets, Utils } from "../components";
import { useWiring, store } from "../libs/wiring";

const TitleBar = ({ onClick = x => x, label = "Wallet", children }) => {
  return (
    <Flex
      width={1}
      alignItems="center"
      p={3}
      bg="backingDark"
      borderBottom="2px solid rgba(0, 0, 0, 0.5)"
      // boxShadow='0px 0px 2px 0px rgba(0, 0, 0, 1)'
    >
      <Text onClick={onClick} fontSize={4}>
        {label}
      </Text>
      <Box mx="auto" />
      {children}
    </Flex>
  );
};

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

const Bitcoin = p => {
  const [state, setState] = useWiring(["userid"]);
  const { me, myWallet, commands } = state;

  const [loading, setLoading] = useState(false);
  const [tx, setTx] = useState(null);

  const CreateTransaction = async () => {
    setLoading(true);
    const tx = await state.actions.private("createCryptapiTransaction", {
      ticker: "btc",
      amount: 0.01
    });
    console.log("CREATE TX:", tx);
    setTx(tx);
    setLoading(false);
  };

  return (
    <Flex
      width={1 / 2}
      my={4}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Text.Heading fontSize={8}>Process Transaction</Text.Heading>
      <Divider m={4} bg="offwhite" />
      <Input
        width={1}
        label="Deposit Address:"
        placeholder={"1APT1UoYgA8tJEnN1qe8rcvaN55NoASDju"}
      >
        <Button disabled={loading} type="primary" onClick={CreateTransaction}>
          {loading ? <Utils.LoadingPage /> : "Claim Wallet"}
        </Button>
      </Input>
      {tx && (
        <>
          {commands[tx.id] && (
            <Flex alignItems="center" m={2}>
              {commands[tx.id].tx && (
                <Image m={2} size={250} src={commands[tx.id].tx.qr} />
              )}
              <Utils.RenderObject
                m={2}
                data={commands[tx.id]}
                heading="Transaction Details:"
              />
            </Flex>
          )}
        </>
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
