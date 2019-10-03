import React, { useEffect, useState } from 'react'
import { Card, Button, Flex, Box, Text, Image, Sidebar } from '../primitives'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import Utils from '../components/Utils'

const Documentation = p => {
  const link =
    'https://gist.githubusercontent.com/tacyarg/d44eef04815d303c182145962e884000/raw/fundingrateio_faq.md'
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
    <Box p={4} width={[1, 2 / 3]}>
      <ReactMarkdown source={state} />
    </Box>
  ) : (
    <Utils.LoadingPage />
  )
}

export default Documentation
