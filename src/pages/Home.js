import React, { useEffect, useState } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Assets from '../components/Assets'
import { Button, Flex, Box, Text, Image, Sidebar } from '../primitives'
import ReactMarkdown from 'react-markdown'

const MARKDOWN = `
# Introduction

Fundingrate.io is a software platform that allows the user to easily
manage tradingview webhooks to formulate trade stratagies. Utilizing
these strategies the user can then trigger trade executions on thier
exchange of choice. This allows the user to tailor thier trading
experience however they see fit.

# Features

Fundingrate.io provides a few compelling features and services.

- Alert/Event Tracking
- Alert/Event Filtering
- Alert/Event Triggers
- Alert/Event Replay & Backtesting
- Paper Trading
- Statistical Reporting
- Web Portal / Dashboard
- Secure and Anonoymous
- Authentication
- Follow other userids
- Share Stratagies

# Open Source

All the code supporting Fundingrate.io is open-source.

- [Tradingview-listener](https://github.com/tacyarg/tradingview-listener)
- [Tradingview-dashboard](https://github.com/tacyarg/tradingview-dashboard)
`

const Home = ({ actions, location, router }) => {
  const cPage = location.pathname

  return (
    <Flex flexDirection="column" alignItems="center">
      <Box p={4} width={2 / 3}>
        <ReactMarkdown source={MARKDOWN} />
      </Box>
    </Flex>
  )
}

export default Home
