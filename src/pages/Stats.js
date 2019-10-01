import React, { useEffect, useState } from 'react'
import { Button, Flex, Box, Text, Image, Sidebar, Spinner } from '../primitives'

const Stats = ({ actions, location }) => {
  const cPage = location.pathname

  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    profit: 0,
  })

  useEffect(() => {
    actions.getStats().then(setStats)
    // .catch(setError)
  }, [])

  return loading ? (
    <Flex width={1} alignItems="center" justifyContent="center">
      <Spinner>/</Spinner>
    </Flex>
  ) : (
    <Box p={4}>
      <Text>{cPage}</Text>
      <Text>${stats.profit}</Text>
    </Box>
  )
}

export default Stats
