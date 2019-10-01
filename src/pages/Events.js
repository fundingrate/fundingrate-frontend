import React, { useEffect, useState } from 'react'
import { Button, Flex, Box, Text, Image, Sidebar } from '../primitives'

const Events = ({ actions, location }) => {
  const cPage = location.pathname

  return (
    <Box>
      <Text>{cPage}</Text>
    </Box>
  )
}

export default Events
