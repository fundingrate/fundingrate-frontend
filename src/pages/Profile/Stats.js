import React, { useEffect, useState } from 'react'
import {
  Card,
  Heading,
  Button,
  Flex,
  Box,
  Text,
  Image,
  Sidebar,
  Spinner,
} from '../../primitives'
import Utils from '../../components/Utils'

const Stats = ({ actions, location }) => {
  const cPage = location.pathname

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState()

  useEffect(() => {
    actions
      .getMyStats()
      .then(s => {
        setStats(s)
        setLoading(false)
      })
      .catch(e => {
        setError(e)
        setLoading(false)
      })
  }, [])

  return loading ? <Utils.LoadingPage /> : (
    <Flex
      flexDirection="column"
      p={4}
      width={[1, 2 / 3]}
      justifyContent="space-evenly"
    >
      <Utils.RenderObject heading="My Stats" data={stats} />
      <Utils.RenderObject heading="Current Position" data={stats.position} />
    </Flex>
  )
}

export default Stats
