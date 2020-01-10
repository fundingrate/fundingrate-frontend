import React, { useEffect, useState } from "react";
import { Button, Flex } from "../primitives";
import { useWiring, store } from "../libs/wiring";
import { Inputs, Assets, Utils, Buttons } from "../components";

Button.Logout = p => {
  const [state, dispatch] = useWiring(["me"]);
  console.log(state);
  const Logout = async s => {
    await state.actions.auth("logout", {});
    actions.deleteLocalStorage("token");
    window.location.reload();
  };

  return (
    <Button {...p} onClick={Logout} type="warning">
      LOGOUT
    </Button>
  );
};

Button.Gateway = ({ children, ...p }) => {
  return (
    <Button
      {...p}
      type="offwhite"
      m={2}
      width={128}
      height={64}
      // onClick={x => onClick("/wallet/btc")}
    >
      {children}
      {/* <Assets.Processors.Bitcoin_logo height={"100%"} /> */}
    </Button>
  );
};

Button.BTC = p => {
  return (
    <Button.Gateway {...p}>
      <Assets.Processors.Bitcoin_logo height={"100%"} />
    </Button.Gateway>
  );
};

Button.ETH = p => {
  return (
    <Button.Gateway {...p}>
      <Assets.Processors.eth_logo backgroundSize="170%" height={"100%"} />
    </Button.Gateway>
  );
};

Button.BCH = p => {
  return (
    <Button.Gateway {...p}>
      <Assets.Processors.bch_logo height={"100%"} />
    </Button.Gateway>
  );
};

Button.XMR = p => {
  return (
    <Button.Gateway {...p}>
      <Assets.Processors.Monero_logo height={"100%"} />
    </Button.Gateway>
  );
};

Button.LTC = p => {
  return (
    <Button.Gateway {...p}>
      <Assets.Processors.litecoin_logo backgroundSize="100%" height={"100%"} />
    </Button.Gateway>
  );
};

Button.Tether = p => {
  return (
    <Button.Gateway {...p}>
      <Assets.Processors.tether backgroundSize="150%" height={"100%"} />
    </Button.Gateway>
  );
};

Button.G2A = p => {
  return (
    <Button.Gateway {...p}>
      <Assets.Processors.g2a_logo height={"100%"} />
    </Button.Gateway>
  );
};

Button.STEAM = p => {
  return (
    <Button.Gateway {...p}>
      <Assets.Processors.steam_logo height={"100%"} />
    </Button.Gateway>
  );
};

Button.P2P = p => {
  return (
    <Button.Gateway {...p}>
      <Assets.Processors.p2p_logo backgroundSize="120%" height={"100%"} />
    </Button.Gateway>
  );
};

Button.CHIPS = p => {
  return (
    <Button.Gateway {...p}>
      <Assets.Chips height={"100%"} width={128} />
    </Button.Gateway>
  );
};

Button.PAYPAL = p => {
  return (
    <Button.Gateway {...p}>
      <Assets.Processors.paypal_logo height={"100%"} />
    </Button.Gateway>
  );
};

Button.PresetValues = ({ values = [], onClick = x => x }) => {
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

export default Button;
