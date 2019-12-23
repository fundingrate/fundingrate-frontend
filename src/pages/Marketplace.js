import React, { useEffect, useState } from 'react'
import { Card, Button, Flex, Box, Text, Divider } from '../primitives'
import { Utils } from '../components'
import moment from 'moment'

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
        // console.log('Error Subscribing:', e.message)
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
  // console.log(provider)

  return (
    <Card
      flexDirection="column"
      key={provider}
      m={2}
      width={[1, 2 / 5]}
      justifyContent="space-evenly"
    >
      <Flex>
        <Text.Heading fontSize={4}>{provider.username}</Text.Heading>
        <Box mx="auto" />
        <Utils.RenderObject.Prop
          color={provider.stats.profit > 0 ? 'lime' : 'red'}
          label="Overall Profit:"
          value={provider.stats.profit}
          type="money"
        />
      </Flex>
      <Divider bg="primary" my={2} />
      <Flex flexDirection="column">
        <Utils.RenderObject.Prop
          label="Running Since:"
          value={moment(provider.created).calendar()}
        />
        {provider.stats.updated && (
          <Utils.RenderObject.Prop
            label="Last Updated:"
            value={moment(provider.stats.updated).fromNow()}
          />
        )}
        <Utils.RenderObject.Prop
          label="Total Trades:"
          value={provider.stats.totalTrades}
        />

        {provider.stats.position && (
          <>
            <Utils.RenderObject.Prop
              label="Last Position Entry:"
              value={`${provider.stats.position.type} @ ${provider.stats.position.price}`}
            />
            {/* <Utils.RenderObject.Prop
              label="Last Trade:"
              value={moment(provider.stats.position.created).fromNow()}
            /> */}
          </>
        )}

        <Box my={2} bg="darkBacking">
          <Text fontSize={2} p={2}>
            Description
          </Text>
          <Divider />
          <Box p={3}>{provider.description}</Box>
        </Box>
      </Flex>
      <Box m={1} />
      {children}
    </Card>
  )
}

const Marketplace = ({ actions, location }) => {
  const cPage = location.pathname

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState([])

  useEffect(() => {
    actions
      .listProviders()
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
    <Utils.LoadingPage />
  ) : (
    <Flex
      // flexDirection="column"
      p={4}
      width={1}
      justifyContent="space-evenly"
      flexWrap="wrap"
    >
      {/* <Heading>Public Providers</Heading> */}
      {state.length > 0 ? (
        state
          .sort((x, y) => {
            return x.stats.profit > y.stats.profit ? -1 : 1
          })
          .map(provider => {
            console.log(provider)
            return (
              <ProviderCard provider={provider}>
                <SubscribeButton actions={actions} providerid={provider.id} />
              </ProviderCard>
            )
          })
      ) : (
        <Text>No providers are available right now.</Text>
      )}
    </Flex>
  )
}

export default Marketplace
