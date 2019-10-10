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
  Divider,
} from '../../primitives'
import Utils from '../../components/Utils'
import Banners from '../../components/Banners'

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

const HeadingCard = ({ heading, message, ...p }) => {
  return (
    <Box>
      <Text.Heading fontSize={3}>{heading}</Text.Heading>
      <Card flexDirection="column" m={2}>
        <Text>{message}</Text>
      </Card>
    </Box>
  )
}

const MARKDOWN = `
- As a Provider you are responsible for producing reliable buy/sell typed events for your subscribers. 
- Currently you have a 100 provider limit, so please use them wisely.
- All data below is updated in realtime as alerts are consumed.
`

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
      <Heading>My Providers</Heading>
      <Banners.Notice>
        <Utils.RenderMarkdown source={MARKDOWN} />
      </Banners.Notice>
      {state.length > 0 ? (
        state.map(data => {
          console.log(data.id, data.stats.id, data.stats.position)
          return (
            <Box
              width={1}
              my={2}
              key={data.id}
              // bg="darkBacking"
              // borderRadius={2}
            >
              <Flex flex={1}>
                <Utils.RenderObject
                  heading={data.username.toUpperCase()}
                  data={data}
                  flex={1}
                />
                <Box>
                  <Utils.RenderObject
                    heading="Current Stats"
                    data={data.stats}
                    flex={1}
                  />
                  <Utils.RenderObject
                    heading="Current Position"
                    data={data.stats.position}
                    flex={1}
                  />
                </Box>
              </Flex>
            </Box>
          )
        })
      ) : (
        <Card flexDirection="column" m={2}>
          <Text>No providers are available right now.</Text>
        </Card>
      )}
    </Flex>
  )
}

export default Providers
