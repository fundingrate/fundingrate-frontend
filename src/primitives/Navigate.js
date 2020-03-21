import React, { useState, useEffect } from "react";
import { Button } from ".";

import {
  useHistory,
  useLocation,
  Redirect,
  HashRouter,
  Route,
  Switch
} from "react-router-dom";

// EXAMPLE
//   const navLinks = [
//     { label: "Settings", path: "/account/settings" },
//     { label: "Wallet", path: "/account/wallet" },
//     { label: "Steam Accounts", path: "/account/steam-accounts" },
//     { label: "Sales", path: "/account/sales" },
//     { label: "Purchaces", path: "/account/purchases" },
//     { label: "Listings", path: "/account/listings" }
//   ];

// EXAMPLE
//   const pages = {
//     "/account/settings": Settings,
//     "/account/wallet": Wallet,
//     "/account/steam-accounts": SteamAccounts,
//     "/account/sales": Sales,
//     "/account/purchases": Purchases,
//     "/account/listings": Listings
//   };

export const NavigationLinks = ({
  links,
  pathIndex = 1, //pathindex is the sub path root you are intending to match for.
  root = "",
  onClick,
  ...p
}) => {
  const history = useHistory();
  const location = useLocation();

  return links.map(({ label, path }) => {
    const dest = `/${location.pathname.split("/")[pathIndex]}`;
    const isActive = path === dest;
    // console.log('PATH:', path, 'MATCH INDEX:', dest, 'IS_ACTIVE:', isActive)
    // merge root and path
    path = root + path;

    return (
      <Button
        m={2}
        textAlign="left"
        type={isActive ? "primary" : "simple"}
        {...p}
        key={`${label}_${path}`}
        onClick={e => {
          history.push(path);
          document.title = path + ' | Fundingrate.io'
          if (onClick) onClick(path);
        }}
        // active={true}
        // color={isActive ? "primary" : undefined}
        // opacity={isActive ? 0.8 : undefined}
      >
        {label}
      </Button>
    );
  });
};

export const NavigationRouter = ({
  // root = "/account",
  // defaultRoute = "/account/settings",
  root = '',
  defaultRoute,
  pages = {}
}) => {
  return (
    <Switch>
      <Redirect exact from={root} to={root + defaultRoute} />
      {Object.keys(pages).map(k => {
        const Page = pages[k];
        return <Route key={"page_" + k} path={root + k} component={Page} />;
      })}
      <Redirect to={defaultRoute} />
    </Switch>
  );
};
