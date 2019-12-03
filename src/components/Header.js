import React from 'react'

import { Text, Flex, Box } from '../primitives'

const Header = ({ children, heading = 'Fundingrate.io' }) => {
  return (
    <Flex
      bg="foregroundBacking"
      p={3}
      boxShadow="0px 2px 2px -2px rgba(0, 0, 0, 0.2)"
      borderBottom="1px solid rgba(0, 0, 0, 0.2)"
      zIndex={9001}
    >
      {/* <Text.Heading fontSize={4}>{heading}</Text.Heading> */}
      <Box mx="auto" />
      {children}
    </Flex>
  )
}

export default Header
