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

import Assets from './Assets'

import axios from 'axios'
import ReactMarkdown from 'react-markdown'

import assert from 'assert'

// render shallow object.
const RenderObject = ({ data = {}, ...p }) => {
  console.log("RenderObject", data)
  return (
    <Card flexDirection="column" m={2} {...p}>
      {Object.keys(data).map(k => {
        if (typeof data[k] === 'object') return
        // if (!data[k]) return

        return (
          <RenderObject.Prop
            key={k}
            label={`${k.toUpperCase()}:`}
            value={data[k]}
          />
        )
      })}
    </Card>
  )
}

const renderProp = value => {
  // console.log('render', typeof value, value)
  switch (typeof value) {
    case 'boolean':
      return Boolean(value) ? 'yes' : 'no'
    // case 'number':
    //   return <Text.Number value={value} />
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

const downloadFile = async (filename, data) => {
  assert(filename, 'filename required')
  assert(data, 'data required')

  let link = document.createElement('a')
  link.id = 'download-csv'
  link.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(data)
  )
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  document.querySelector('#download-csv').click()
  // var encodedUri = encodeURI(csv)
  // console.log('URI:', encodedUri)
  // return window.open(encodedUri)
}

const DownloadCSV = ({ filename = 'list.csv', data = [] }) => (
  <Button
    type="simple"
    onClick={e => {
      const csv = generateCSV(data)
      downloadFile(filename, csv)
    }}
  >
    <Flex alignItems="center" justifyContent="center">
      <Image src={Assets.Icons.Trusted} size={24} />
      <Box mx={1} />
      Download .csv
    </Flex>
  </Button>
)

const DownloadJson = ({ filename = 'row.json', data = {} }) => {
  return (
    <Button
      type="simple"
      onClick={e => {
        data = JSON.stringify(data, null, 2)
        downloadFile(filename, data)
      }}
    >
      <Flex alignItems="center" justifyContent="center">
        <Image src={Assets.Icons.Trusted} size={24} />
        <Box mx={1} />
        Download .json
      </Flex>
    </Button>
  )
}

export default {
  RenderObject,
  LoadingPage,
  MarkdownLink,
  DownloadCSV,
  DownloadJson,
}
