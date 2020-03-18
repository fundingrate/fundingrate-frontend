import React, { useEffect, useState } from "react";
import { Header, Footer, Assets, Utils } from "./components";
import { SideNav } from "./components/Navigation.js";
import { Button, Flex, Text, Sidebar, Page, Divider } from "./primitives";
import Pages from "./pages";
import { useWiring, store } from "./libs/wiring";

const Infobar = p => {
  const [state, setState] = useWiring(["userid"]);
  const { me, myWallet } = state;

  return (
    <Header heading="v2.0.0">
      {me ? (
        <Flex alignItems="center" justifyContent="center">
          <Assets.Icons.Wallet mx={2} size={20} />
          <Text>{Utils.renderProp(myWallet.balance, "money")}</Text>
        </Flex>
      ) : (
        <Button type="primary" onClick={e => onClick("/authenticate")}>
          Login / Register
        </Button>
      )}
    </Header>
  );
};

const Layout = ({ children, onClick }) => {
  const [state, setState] = useWiring(["userid"]);
  const user = state.me;

  const links = Object.keys(Pages).reduce((memo, k) => {
    if (k === "NotFound") return memo;
    if (user && k === "Authenticate") return memo;
    if (!user && k === "Profile") return memo;

    memo.push({ label: k, path: `/${k.toLowerCase()}` });
    return memo;
  }, []);

  return (
    <Flex
      width={1}
      height={"100%"}
      bg="darkBacking"
      // justifyContent="center"
      alignItems="center"
    >
      <SideNav user={user} links={links} onClick={onClick} />
      <Flex
        flexDirection="column"
        width={1}
        height={"100%"}
        // bg="backing"
        justifyContent="center"
        // alignItems="center"
      >
        <Infobar />
        <Page flex={1}>{children}</Page>
        <Footer />
      </Flex>
    </Flex>
  );
};

export default Layout;
