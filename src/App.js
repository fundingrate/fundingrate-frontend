import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import NotFound from './pages/NotFound'
import Home from './pages/Home'

const App = ({ actions }) => (
  <>
    <Header />
    <Switch>
      <Redirect exact from="/" to="/home" />

      <Route
        path="/home"
        render={props => {
          return <Home actions={actions} />
        }}
      />

      <Route component={NotFound} />
    </Switch>
    <Footer />
  </>
)

export default App
