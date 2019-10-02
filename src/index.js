import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'

import Actions from './libs/actions'
import App from './App'
import Theme from './Theme'

const START = async p => {
  const actions = await Actions('https://tradebot.chips.gg', 'b2543a11-d9b3-404a-9388-19650eb7bf2a')

  ReactDOM.render(
    <Theme>
      <HashRouter>
        <App actions={actions}/>
      </HashRouter>
    </Theme>,
    document.getElementById('app')
  )
}

START();