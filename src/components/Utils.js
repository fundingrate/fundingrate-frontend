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

const renderProp = value => {
  console.log('render', typeof value, value)
  switch (typeof value) {
    case 'boolean':
      return Boolean(value) ? 'yes' : 'no'
    case 'number':
      return <Text.Number value={value} />
    default:
      return value
  }
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
      <Text>{renderProp(value)}</Text>
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

const generateCSV = data => {
  const { parse } = require('json2csv')
  const fields = data[0]
    ? Object.keys(data[0])
    : ['id', 'price', 'closingPrice', 'profit', 'change']
  return parse(data, {
    fields,
    flatten: true,
  })
}

const downloadCSV = async (data = []) => {
  const csv = generateCSV(data)
  let link = document.createElement('a')
  link.id = 'download-csv'
  link.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(csv)
  )
  link.setAttribute('download', `list_${Date.now()}.csv`)
  document.body.appendChild(link)
  document.querySelector('#download-csv').click()
  // var encodedUri = encodeURI(csv)
  // console.log('URI:', encodedUri)
  // return window.open(encodedUri)
}

const DownloadCSV = ({ data = [] }) => (
  <Button type="simple" onClick={e => downloadCSV(data)}>
    Download CSV
  </Button>
)

export default {
  RenderObject,
  LoadingPage,
  MarkdownLink,
  DownloadCSV,
}
