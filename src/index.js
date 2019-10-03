import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'

import Actions from './libs/actions'
import App from './App'
import Theme from './Theme'

import Utils from './components/Utils'

const START = async p => {

  // render the loading page for now...
  ReactDOM.render(
    <Theme>
      <Utils.LoadingPage bg='backing'/>
    </Theme>,
    document.getElementById('app')
  )

  let actions = await Actions('https://api.fundingrate.io', null)

  // if we have a token saved authenticate the user.
  const token = await actions.getLocalStorage('token')
  let user = null
  if (token) {
    actions = await Actions('https://api.fundingrate.io', token)
    user = await actions.me() // authenticate the user
  }

  // start the main react app.
  return ReactDOM.render(
    <Theme>
      <HashRouter>
        <App actions={actions} user={user} token={token} />
      </HashRouter>
    </Theme>,
    document.getElementById('app')
  )
}

START();