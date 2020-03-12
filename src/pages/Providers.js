import React, { useEffect, useState } from 'react'
import { Card, Flex, Box, Text, Input } from '../primitives'
import { Utils, Modal, Graph } from '../components'
import CountUp from 'react-countup'

const SearchInput = ({ onSearch = x => x }) => {
  const [search, setSearch] = useState('')

  const debouncedSearchTerm = Utils.useDebounce(search, 500)
  useEffect(() => {
    onSearch(search)
  }, [debouncedSearchTerm])

  return (
    <Input
      placeholder="Search..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  )
}

const Providers = ({ actions, location }) => {
  const cPage = location.pathname

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState([])
  const [cache, setCache] = useState([])
  const [stats, setStats] = useState([])

  useEffect(() => {
    actions
      .listMyProviders()
      .then(s => {
        setState(s)
        setCache(s)
        setLoading(false)
      })
      .catch(e => {
        setError(e)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const valueProps = [
      'longs',
      'shorts',
      'totalTrades',
      'longProfit',
      'shortProfit',
      'profit',
    ]
    const memo = state.reduce((memo, data, idx) => {
      if (idx === 0) {
        valueProps.map(v => {
          memo[v] = {
            label: v,
            value: data.stats[v],
          }
        })
      } else {
        valueProps.map(v => {
          memo[v].value += data.stats[v]
        })
      }

      return memo
    }, {})

    console.log('STATS', memo)

    setStats(Object.values(memo))
  }, [state])

  const handleSearch = st => {
    console.log('searching for:', st)
    if (!st) return setState(cache)
    const r = state.filter(o => Utils.searchProps(o, st))
    console.log('search results:', r)
    setState(r)
  }

  return loading ? (
    <Utils.LoadingPage />
  ) : (
    <Flex
      // flexDirection="column"
      p={2}
      width={1}
      justifyContent="space-evenly"
      flexWrap="wrap"
    >
      <Flex
        width={1}
        m={4}
        alignItems="center"
        flexDirection={['column', 'row']}
      >
        <SearchInput onSearch={handleSearch} />
        <Box mx={4} />
        <Flex>
          <Modal.CreateProvider actions={actions} />
          <Modal.FAQ />
          {/* <Modal.FeedbackSurvey /> */}
        </Flex>
      </Flex>
      {/* <Flex
        width={1}
        m={2}
        alignItems="center"
        style={{
          overflowX: 'auto',
        }}
      >
        {stats.map(s => (
          <Flex alignItems="center" mx={2}>
            {s.label.toUpperCase()}: <Box mx={1} />
            <Text color={s.value > 0 ? 'lime' : 'red'}>
              <CountUp separator="," end={s.value} />
            </Text>
          </Flex>
        ))}
      </Flex> */}
      {state.length > 0 ? (
        state
          .sort((x, y) => {
            return x.stats.profit > y.stats.profit ? -1 : 1
          })
          .map((data, idx) => {
            return (
              <Box
                width={1}
                my={2}
                key={data.id}
                // bg="darkBacking"
                // borderRadius={2}
              >
                <Flex flexDirection={['column', 'column', 'column', 'row']}>
                  <Utils.RenderObject
                    heading={data.username.toUpperCase()}
                    data={data}
                    width={[1, 1, 1, 2 / 3]}
                  >
                    <Graph.LineGraph
                      listMyProviderTrades={e =>
                        actions.listMyProviderTrades({ providerid: data.id })
                      }
                    />
                  </Utils.RenderObject>
                  <Flex
                    width={[1, 1, 1, 1 / 3]}
                    flexDirection={['column', 'column', 'row', 'column']}
                  >
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
                  </Flex>
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
