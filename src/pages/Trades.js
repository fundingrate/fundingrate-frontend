import React, { useEffect, useState } from 'react'
import {
  Card,
  Button,
  Flex,
  Box,
  Text,
  Image,
  Heading,
  Sidebar,
  Spinner,
} from '../primitives'
import Utils from '../components/Utils'

const Trades = ({ actions, location }) => {
  const cPage = location.pathname

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState([])

  useEffect(() => {
    actions
      .listMyTrades()
      .then(s => {
        setState(s)
        setLoading(false)
      })
      .catch(e => {
        setError(e)
        setLoading(false)
      })
  }, [])

  return loading ? (
    <Flex width={1} height="100%" alignItems="center" justifyContent="center">
      <Spinner>/</Spinner>
    </Flex>
  ) : (
    <Flex flexDirection="column" p={4} justifyContent="space-evenly">
      <Heading>My Trades</Heading>
      {state.map(data => {
        return <Utils.RenderObject data={data} key={data.id} />
      })}
    </Flex>
  )
}

export default Trades
