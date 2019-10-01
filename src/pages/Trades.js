import React, { useEffect, useState } from 'react'
import { Button, Flex, Box, Text, Image, Sidebar } from '../primitives'

const Trades = ({ actions, location }) => {
  const cPage = location.pathname

  return (
    <Box>
      <Text>{cPage}</Text>
    </Box>
  )
}

export default Trades
