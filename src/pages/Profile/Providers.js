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
} from '../../primitives'
import Utils from '../../components/Utils'

const SubscribeButton = ({ actions, providerid }) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [subscribed, setSubscribed] = useState(false)
  const disabled = subscribed || loading

  const isSubbed = async () => {
    const subbed = await actions.isSubscribed({
      providerid,
    })
    setSubscribed(subbed)
    setLoading(false)
  }

  useEffect(() => {
    isSubbed()
  }, [])

  const subscribe = async () => {
    if (disabled) return
    setLoading(true)

    return actions
      .createSubscription({
        providerid,
      })
      .then(s => {
        setSubscribed(true)
      })
      .catch(e => {
        console.log('Error Subscribing:', e.message)
        setError(e.message)
        // setLoading(false)
      })
  }

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      {error ? (
        <Text color="red" fontSize={1}>
          {error}
        </Text>
      ) : (
        <Button disabled={disabled} type="primary" onClick={subscribe}>
          {subscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}
        </Button>
      )}
    </Flex>
  )
}

const ProviderCard = ({ provider, children }) => {
  return (
    <Card flexDirection="column" key={provider} m={2}>
      <Flex flexDirection="column">
        <Utils.RenderObject.Prop label="Provider:" value={provider.username} />
        <Utils.RenderObject.Prop label="Userid:" value={provider.userid} />
        {/* <Utils.RenderObject.Prop label="Events Recorded:" value={count} /> */}
      </Flex>
      {children && <Box m={2} />}
      {children}
    </Card>
  )
}

const Providers = ({ actions, location }) => {
  const cPage = location.pathname

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState([])

  useEffect(() => {
    actions
      .listMyProviders()
      .then(s => {
        setState(s)
        setLoading(false)
      })
      .catch(e => {
        setError(e)
        setLoading(false)
      })
  }, [])

  return loading ? <Utils.LoadingPage /> : (
    <Flex
      // flexDirection="column"
      p={4}
      width={1}
      justifyContent="space-evenly"
      flexWrap="wrap"
    >
      <Heading>My Providers</Heading>
      {state.length > 0 ? (
        state.map(provider => {
          return (
            <ProviderCard provider={provider}>
              {/* <SubscribeButton actions={actions} providerid={provider.id} /> */}
            </ProviderCard>
          )
        })
      ) : (
        <Text>No providers are available right now.</Text>
      )}
    </Flex>
  )
}

export default Providers
