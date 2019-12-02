import Stats from './Stats'
import Trades from './Trades'
import Events from './Events'
import Subscriptions from './Subscriptions'
import Providers from './Providers'
import Info from './Info'
// import Filters from './Filters'

const Pages = {
  Info,
  // Filters,
  Subscriptions,
  Providers,
  Events,
  Trades,
  Stats,
}

import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Flex, Text, Navbar } from '../../primitives'
import Banners from '../../components/Banners'

const Layout = ({
  history,
  user,
  children,
  location,
}) => {
  const cPage = location.pathname

  const links = Object.keys(Pages).reduce((memo, k) => {
    memo.push({ label: k, href: `/profile/${k.toLowerCase()}` })
    return memo
  }, [])

  return (
    <Flex
      flexDirection="column"
      width={1}
      alignItems="center"
      justifyContent="center"
    >
      <Banners.ColorBar>
        <Text.Heading fontSize={5}>Welcome back, {user ? user.username : ''}</Text.Heading>
      </Banners.ColorBar>

      <Navbar
        cPage={cPage}
        links={links}
        onClick={href => {
          history.push(href)
        }}
      />
      {children}
    </Flex>
  )
}

// take all pages and create routes for them.
export default ({
  prefix = '/profile',
  from = '/profile',
  to = '/profile/info',
  ...p
}) => {
  // console.log(p.location.pathname)
  return (
    <Layout {...p}>
      <Switch>
        <Redirect exact from={from} to={to} />
        {Object.keys(Pages).map(k => {
          const Page = Pages[k]
          const path = `${prefix}/${k}`
          const key = `page_${prefix}_${k}`
          // console.log(k, path, key)
          return (
            <Route
              key={key}
              path={path}
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
