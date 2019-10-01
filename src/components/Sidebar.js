import React from 'react'

import { Flex, Box } from '../primitives'

const Sidebar = ({ children, ...p }) => {
  return (
    <Flex flexDirection="column" {...p}>
      {children}
    </Flex>
  )
}

export default Sidebar
