import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Pages
import Pages from './pages'

const App = ({ actions }) => (
  <>
    <Switch>
      <Redirect exact from="/" to="/home" />

      {Object.keys(Pages).map(pageKey => {
        const Page = Pages[pageKey]
        if (pageKey === 'NotFound') return <Route key={`page_${pageKey}`} component={Page} />
        return (
          <Route
            key={`page_${pageKey}`}
            path={`/${pageKey}`}
            render={props => {
              return <Page actions={actions} />
            }}
          />
        )
      })}

    </Switch>
  </>
)

export default App
