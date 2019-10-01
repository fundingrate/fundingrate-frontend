import React, { useEffect, useState } from 'react'
import { Button, Flex, Box, Text, Image, Sidebar } from '../primitives'

const Stats = ({ actions, location }) => {
  const cPage = location.pathname

  const [stats, setStats] = useState({
    profit: 0,
  })

  useEffect(() => {
    actions.getStats().then(setStats)
    // .catch(setError)
  }, [])

  return (
    <Box>
      <Text>{cPage}</Text>
      <Text>${stats.profit}</Text>
    </Box>
  )
}

export default Stats
