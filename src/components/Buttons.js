import React, { useEffect, useState } from "react";
import { Button, Flex, Spinner, Box } from "../primitives";
import { useWiring, store } from "../libs/wiring";
import { Inputs, Assets, Utils, Buttons } from "../components";
import { useHistory, useLocation } from "react-router-dom";

Button.Close = p => {
  return (
    <Button {...p} type="simple" p={0}>
      <Assets.Icons.Close />
    </Button>
  );
};

Button.AuthenticateRedirect = p => {
  const history = useHistory();

  return (
    <Button type="primary" onClick={e => history.push("/authenticate")}>
      Login / Register
    </Button>
  );
};

Button.Process = p => {
  const [state, dispatch] = useWiring(["me"]);
  const [loading, setLoading] = useState(false);

  const onClick = async s => {
    setLoading(true);
    // do somthing
    // setLoading(false);
  };

  return (
    <Button {...p} onClick={onClick} type="simple" disabled={loading}>
      {loading ? <Utils.Loading message="Processing..." /> : "Start Processing"}
    </Button>
  );
};

Button.Toggle = ({ options = ["Stop", "Start"], onClick = x => x, ...p }) => {
  const [state, setState] = useState(false);

  const tOptions = state ? options[0] : options[1];

  return (
    <Button
      onClick={e => {
        setState(!state);
        onClick(state);
      }}
      type={"simple"}
      mx={2}
    >
      {tOptions}
    </Button>
  );
};

Button.Logout = p => {
  const [state, dispatch] = useWiring(["me"]);
  const [loading, setLoading] = useState(false);

  const onClick = async s => {
    setLoading(true);

    await state.actions.auth("logout", {});
    // state.actions.deleteLocalStorage("token");
    setLoading(false);
    window.location.reload();
  };

  return (
    <Button {...p} onClick={onClick} type="warning">
      {loading ? <Utils.Loading /> : "Logout"}
    </Button>
  );
};

Button.listProviderAlerts = ({ providerid, ...p }) => {
  const [state, dispatch] = useWiring(["me"]);
  const [loading, setLoading] = useState(false);

  const onClick = async s => {
    setLoading(true);

    await state.actions
      .provider("listAlerts", {
        providerid
      })
      .then(a => dispatch("updateProp", ["providerAlerts", providerid], a));
    setLoading(false);
  };

  return (
    <Button {...p} disabled={loading} onClick={onClick} type="primary">
      {loading ? <Utils.Loading /> : "View Alerts"}
    </Button>
  );
};

Button.hideProviderAlerts = ({ providerid, ...p }) => {
  const [state, dispatch] = useWiring(["me"]);
  const [loading, setLoading] = useState(false);

  const onClick = async s => {
    setLoading(true);
    dispatch("updateProp", ["providerAlerts", providerid], null);
    setLoading(false);
  };

  return (
    <Button {...p} disabled={loading} onClick={onClick} type="warning">
      {loading ? <Utils.Loading /> : "Hide Alerts"}
    </Button>
  );
};

Button.setProviderPublic = ({ providerid, ...p }) => {
  const [state, dispatch] = useWiring(["me"]);
  const [loading, setLoading] = useState(false);

  const onClick = async s => {
    setLoading(true);

    await state.actions.provider("setPublic", {
      providerid
    });
    setLoading(false);
  };

  return (
    <Button {...p} disabled={loading} onClick={onClick} type="success">
      {loading ? <Utils.Loading /> : "Set Public"}
    </Button>
  );
};

Button.setProviderPrivate = ({ providerid, ...p }) => {
  const [state, dispatch] = useWiring(["me"]);
  const [loading, setLoading] = useState(false);

  const onClick = async s => {
    setLoading(true);
    await state.actions.provider("setPrivate", {
      providerid
    });
    setLoading(false);
  };

  return (
    <Button {...p} disabled={loading} onClick={onClick} type="warning">
      {loading ? <Utils.Loading /> : "Set Private"}
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
