import React from 'react'

import { Text, Flex, Box } from '../primitives'

const Header = ({ children, heading = 'Fundingrate.io' }) => {
  return (
    <Flex bg="foregroundBacking" p={3}>
      <Text.Heading fontSize={4}>{heading}</Text.Heading>
      <Box mx="auto" />
      {children}
    </Flex>
  )
}

export default Header
