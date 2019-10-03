import React, { useState, useEffect } from 'react'

import {
  Card,
  Button,
  Flex,
  Box,
  Text,
  Image,
  Sidebar,
  Spinner,
} from '../primitives'

import axios from 'axios'
import ReactMarkdown from 'react-markdown'

// render shallow object.
const RenderObject = ({ data }) => {
  return (
    <Card flexDirection="column" m={2}>
      {Object.keys(data).map(k => {
        if (typeof data[k] === 'object') return
        return (
          <RenderObject.Prop label={`${k.toUpperCase()}:`} value={data[k]} />
        )
      })}
    </Card>
  )
}

RenderObject.Prop = ({ label, value }) => {
  return (
    <Flex
      flexDirection={['column', 'row']}
      alignItems={['center', 'end']}
      m={1}
    >
      <Text bold>{label}</Text>
      <Box mx={1} />
      <Text>{value}</Text>
    </Flex>
  )
}

const LoadingPage = p => {
  return (
    <Flex
      width={1}
      height="100%"
      alignItems="center"
      justifyContent="center"
      {...p}
    >
      <Spinner>/</Spinner>
    </Flex>
  )
}

const MarkdownLink = ({ link }) => {
  const [state, setState] = useState(null)

  const getMarkdown = async link => {
    const { data } = await axios(link).catch(console.error)
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
    <LoadingPage />
  )
}

export default {
  RenderObject,
  LoadingPage,
  MarkdownLink,
}
