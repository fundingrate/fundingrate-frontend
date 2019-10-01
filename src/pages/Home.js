import React, { useEffect, useState } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'

import Assets from '../components/Assets'
import { Button, Flex, Box, Text, Image, Sidebar } from '../primitives'

const Home = ({ actions, location, router }) => {
  const cPage = location.pathname

  return (
    <Box p={4}>
      <Text>{cPage}</Text>
    </Box>
  )
}

export default Home
