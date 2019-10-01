import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'

import Actions from './libs/actions'
import App from './App'
import Theme from './Theme'

const START = async p => {
  const actions = await Actions('http://localhost:9001')
  console.log(actions)

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