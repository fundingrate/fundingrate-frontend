import React from 'react'

import { Box, Text, Flex } from '../primitives'

const Footer = () => (
  <Flex
    bg="foregroundBacking"
    p={4}
    boxShadow="0px -2px 2px -2px rgba(0, 0, 0, 0.2)"
    borderTop="1px solid rgba(0, 0, 0, 0.2)"
    zIndex={9001}
  >
    <Box mx="auto" />
    <Text.Link as="a" target="_blank" href="https://tacyarg.com/">
      Tacyarg.com
    </Text.Link>
    {/* <Text.Link as="a" target="_blank" href="https://chips.gg/">
      Maintained by: Chips.gg
    </Text.Link> */}
  </Flex>
)

export default Footer
