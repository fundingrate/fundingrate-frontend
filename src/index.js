import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Theme from "./Theme";
import Utils from "./components/Utils";

import { useWiring, store } from "./libs/wiring";
import Client from "ws-api-client";

async function Authenticate(actions, tokenid) {
  if (tokenid == null) {
    return Authenticate(actions, await actions.auth("token"));
  }
  return actions
    .auth("authenticate", tokenid)
    .then(userid => {
      window.localStorage.setItem("tokenid", tokenid);
      return { userid, tokenid };
    })
    .catch(err => {
      console.log(err);
      return Authenticate(actions);
    });
}

async function init() {
  const config = {
    version: "2.0.0"
    // languages: ["us", "cn"],
    // language: window.localStorage.getItem("language") || "us",
    // translations: JSON.parse(
    //   window.localStorage.getItem("translations") || "{}"
    // ),
    // appid: "570" //dota
    // appid:'730' //csgo
  };

  const channels = ["public", "private", "auth", "admin"];

  let { actions, connect } = await Client(
    WebSocket,
    {
      host: process.env.SOCKET,
      channels,
      keepAlive: 10000
    },
    (type, state) => {

      console.log('socket', type, state)

      if (type == "change") {
        return store.dispatch("setState", state, channels);
      }
      if (type == "close") {
        return connect().catch(err =>
          store.dispatch("showError", new Error("Server Offline"))
        );
      }
      if (type == "reconnect") {
        store.dispatch('showSuccess','Server Online')
        Authenticate(actions, window.localStorage.getItem("tokenid"))
          .then(result => {
            console.log('authenticated', result)
            store.dispatch("setAuth", result);
          })
          .catch(store.curry("showError"));
      }
    }
  );

  const { userid, tokenid } = await Authenticate(
    actions,
    window.localStorage.getItem("tokenid")
  );

  return { userid, token: tokenid, actions, Authenticate, config };
}

// RENDER LOADER WHILE THE SERVER FETCHES STATE.
ReactDOM.render(
  <Theme>
    <Utils.LoadingPage bg="backing" />
  </Theme>,
  document.getElementById("app")
);

init()
  .then(store.curry("init"))
  .then(libs => {
    console.log('libs', libs)
    return ReactDOM.render(
      <Theme>
        <BrowserRouter>
          <Route render={App} />
        </BrowserRouter>
      </Theme>,
      document.getElementById("app")
    );
  });
