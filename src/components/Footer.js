import React from 'react'

import { Box, Text, Flex } from '../primitives'

const Footer = () => (
  <Flex bg="foregroundBacking" p={4}>
    <Box mx="auto" />
    <Text.Link as="a" target="_blank" href="https://chips.gg/">
      Maintained by: Chips.gg
    </Text.Link>
  </Flex>
)

export default Footer
