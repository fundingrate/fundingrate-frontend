import React, { Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Pages
import Pages from './pages'
import Layout from './Layout'
// import { LoadingPage } from './components/Utils'

const App = ({ actions, user, token }) => {
  return (
    <>
      <Switch>
        <Redirect exact from="/" to="/authenticate" />

        {Object.keys(Pages).map(pageKey => {
          const Page = Pages[pageKey]
          if (pageKey === 'NotFound')
            return <Route key={`page_${pageKey}`} component={Page} />
          return (
            <Route
              key={`page_${pageKey}`}
              path={`/${pageKey}`}
              render={props => {
                // render layout and page
                return (
                  <Layout
                    {...props}
                    cPage={props.location.pathname}
                    onClick={props.history.push}
                    actions={actions}
                    user={user}
                  >
                    <Page
                      {...props}
                      actions={actions}
                      user={user}
                      token={token}
                    />
                  </Layout>
                )
              }}
            />
          )
        })}
      </Switch>
    </>
  )
}

export default App
