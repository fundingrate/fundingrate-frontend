import React from 'react'
import { Flex, Divider, Text } from './index'

const Heading = props => (
  <Flex py={2} justifyContet="center" alignItems="center" width={1}>
    <Divider />
    <Text minWidth="fit-content" fontSize={6} mx={4}>
      {props.children}
    </Text>
    <Divider />
  </Flex>
)

Heading.displayName = 'Heading'

export default Heading
