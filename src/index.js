import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'

import Actions from './libs/actions'
import App from './App'
import Theme from './Theme'

const START = async p => {
  // const token = 'b2543a11-d9b3-404a-9388-19650eb7bf2a'

  // const actions = await Actions('http://localhost:9001', user.token)
  // const actions = await Actions('https://tradebot.chips.gg', user.token)
  let actions = await Actions('https://api.fundingrate.io', null)

  // if we have a token saved authenticate the user.
  const token = await actions.getLocalStorage('token')
  let user = null
  if(token) {
    actions = await Actions('https://api.fundingrate.io', token)
    user = await actions.me() // authenticate the user
  }

  ReactDOM.render(
    <Theme>
      <HashRouter>
        <App actions={actions} user={user} token={token} />
      </HashRouter>
    </Theme>,
    document.getElementById('app')
  )
}

START()
