import React, { Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Pages
import Pages from './pages'
import Layout from './Layout'
// import { LoadingPage } from './components/Utils'

// The main app
const App = ({ location, history, ...p }) => {
  return (
    <Layout cPage={location.pathname} onClick={history.push} {...p}>
      <Switch>
        <Redirect exact from="/" to="/authenticate" />

        {/* list all pages and wire routing. */}
        {Object.keys(Pages).map(pageKey => {
          const Page = Pages[pageKey]
          if (pageKey === 'NotFound')
            return <Route key={`page_${pageKey}`} component={Page} />
          return (
            <Route
              key={`page_${pageKey}`}
              path={`/${pageKey}`}
              render={props => {
                return <Page {...props} {...p} />
              }}
            />
          )
        })}
      </Switch>
    </Layout>
  )
}

export default App
