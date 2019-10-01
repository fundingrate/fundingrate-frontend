import React, { useEffect, useState } from 'react'
import { Button, Flex, Box, Text, Image, Sidebar } from '../primitives'

const Events = ({ actions, location }) => {
  const cPage = location.pathname

  return (
    <Box p={4}>
      <Text>{cPage}</Text>
    </Box>
  )
}

export default Events
