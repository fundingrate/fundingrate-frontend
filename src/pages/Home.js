import React, { useEffect, useState } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'

import Assets from '../components/Assets'
import { Button, Flex, Box, Text, Image, Sidebar } from '../primitives'

const Home = ({ actions, location, router }) => {
  console.log('location', location)

  const cPage = location.pathname

  return (
    <Text>{cPage}</Text>
  )
}

export default Home
