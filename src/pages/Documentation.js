import React, { useEffect, useState } from 'react'
import {Card, Button, Flex, Box, Text, Image, Sidebar } from '../primitives'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import Utils from '../components/Utils'

const Documentation = p => {
  const link =
    'https://raw.githubusercontent.com/tacyarg/tradingview-listener/master/README.md'
  const [state, setState] = useState(null)

  const getMarkdown = async link => {
    const { data } = await axios(link).catch(console.error)
    console.log(data)
    return setState(data)
  }

  useEffect(() => {
    getMarkdown(link)
  }, [])

  return state ? (
    <Flex flexDirection="column" alignItems="center">
      <Box p={4} width={[1, 2 / 3]}>
        <ReactMarkdown source={state} />
      </Box>
    </Flex>
  ) : (
    <Utils.LoadingPage />
  )
}

export default Documentation
