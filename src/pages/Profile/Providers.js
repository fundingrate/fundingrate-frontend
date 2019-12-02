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
import { VictoryChart, VictoryTheme, VictoryLine } from "victory";
import { ReferenceLine, LabelList, BarChart, LineChart, XAxis, YAxis, Legend, Bar, Line, CartesianGrid, Tooltip } from 'recharts'
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

const ProviderEventHistory = ({ listMyProviderTrades = async x => x }) => {

  const [loading, setLoading] = useState(true)
  const [state, setState] = useState([])

  useEffect(() => {
    listMyProviderTrades().then(trades => {
      console.log('t', trades)

      let data = trades.reduce((memo, t) => {
        if(!t.done) return memo
        const date = moment(t.updated).format('l');

        if(!memo[date]){
          memo[date] = {

            date,
            profit: t.profit,
            // updated: t.created
          }
        } else {
          memo[date].updated = t.created
          memo[date].profit += t.profit
        }

        return memo
      }, {})

      // let data = trades.map(t => {
      //   const date = moment(t.updated).format('l');
      //   return {
      //     date,
      //     profit: t.profit,
      //     updated: t.created
      //   }
      // })

      data = Object.values(data).sort((x, y) => {
        return x.updated > y.updated ? 1 : -1
      })
      // .slice(0,6)

      console.log('d', data)

      setState(data)
      setLoading(false)
    })
  }, [])

  return <Box>
  <Text m={2} fontSize={3}>Recent Trade History</Text>
  <Divider bg="primary" />
  <Flex
    height="100%"
    width={1}
    justifyContent='center'
    alignItems="center"
  >
    {loading ? <Utils.LoadingPage />
      :
      <LineChart
        width={900}
        height={420}
        data={
          state
          // [
          // {
          //   "name": "Page A",
          //   "uv": 4000,
          //   "pv": 2400,
          //   "amt": 2400
          // }
          // ]
        }>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis name="Date" dataKey="date" />
        <YAxis />
        <Tooltip payload={state} />
        <ReferenceLine y={0} stroke="red" strokeDasharray="3 3" />
        <Legend />
        {/* <Bar dataKey="count" fill="#8884d8" /> */}
        <Line name="Profit" dataKey="profit" fill="#82ca9d" >
          {/* <LabelList dataKey="profit" position="top"  /> */}
        </Line>
      </LineChart>
    }
  </Flex>
  </Box>

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
                  >
                    <ProviderEventHistory listMyProviderTrades={e => actions.listMyProviderTrades({ providerid: data.id })} />
                  </ Utils.RenderObject>
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
