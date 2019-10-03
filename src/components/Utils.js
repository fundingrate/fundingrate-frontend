import React from 'react'

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
    <Flex>
      <Text bold>{label}</Text>
      <Box mx={1} />
      <Text>{value}</Text>
    </Flex>
  )
}

const LoadingPage = p => {
  return (
    <Flex width={1} height="100%" alignItems="center" justifyContent="center" {...p}>
      <Spinner>/</Spinner>
    </Flex>
  )
}

export default {
  RenderObject,
  LoadingPage,
}
