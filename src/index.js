import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'
import './static/scss/app.scss'

import Actions from './libs/actions'
import App from './App';

const main = async () => {
  // const actions = await Actions('http://localhost:9001/')
  return ReactDOM.render(
    <HashRouter>
      <App actions={actions} />
    </HashRouter>,
    document.getElementById('app')
  )
}

main()
