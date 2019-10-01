import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'

// import Actions from './libs/actions'
import App from './App'
import Theme from './Theme'

ReactDOM.render(
  <Theme>
    <HashRouter>
      <App />
    </HashRouter>
  </Theme>,
  document.getElementById('app')
)