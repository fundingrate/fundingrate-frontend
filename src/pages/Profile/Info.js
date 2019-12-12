import React, { useEffect, useState } from 'react'
import { Card, Button, Flex, Box, Text, Heading, Input, Divider } from '../../primitives'
import Utils from '../../components/Utils'
import Banners from '../../components/Banners'
import copy from 'clipboard-copy'

const CopyInput = ({value, ...p}) => {

  const [state, setState] = useState(false)

  const CopyValue = p => {
    setState(true)
    copy(value)
    setTimeout(() => setState(false), 1000)
  }

  return <Input
    {...p}
    disabled
    value={value}
  >
    <Button onClick={e => CopyValue(value)} type="simple">{state ? 'Copied!' : 'Copy'}</Button>
  </Input>

}

const Trades = ({ actions }) => {

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState([])

  useEffect(() => {
    actions
      .listMySubscriptions()
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
      flexDirection="column"
      p={4}
      // width={[1, 2 / 3]}
      justifyContent="space-evenly"
    >
      <Utils.DownloadCSV data={state} />
      <Heading>My Subscriptions</Heading>
      {state.length > 0 ? (
        state.map(data => {
          return <Utils.RenderObject data={data} key={data.id} />
        })
      ) : <Utils.RenderError />}
    </Flex>
  )
}

export default ({ actions, location, user, token, history }) => {
  const cPage = location.pathname

  if (!user) {
    history.push('/authenticate')
    return <Text>Redirecting...</Text>
  }

  const [state, setState] = useState({
    user,
    token: null,
  })

  useEffect(() => {
    actions.listMyTokens({ token }).then(([t]) => {
      return setState({
        ...state,
        token: t,
      })
    })
  }, [])

  const Logout = () => {
    actions.deleteLocalStorage('token')
    window.location.reload()
  }

  return (
    <Flex.Content>
      <Text color="red" fontSize={3} p={3}>
        Please ensure you save this information or risk losing access to your account.
      </Text>
      {state.token && <Utils.DownloadJson data={state} />}

      <Divider width={1} bg="backingLight" my={2} />

      <CopyInput label="USERID: " placeholder="c3477d4e-84ea-404b-add7-733a3a161ad6" value={state.user.id} ><Button onClick={e => copy(state.user.id)} type="simple">Copy</Button></CopyInput>
      <Box my={2} />
      {state.token ? <CopyInput label="TOKENID: " placeholder="c3477d4e-84ea-404b-add7-733a3a161ad6" value={state.token.id} ><Button onClick={e => copy(state.token.id)} type="simple">Copy</Button></CopyInput> : <Utils.LoadingPage />}
      <Divider width={1} bg="backingLight" my={2} />

      <Button disabled={!state} m={3} type="warning" onClick={Logout}>
        LOGOUT
      </Button>

      <Trades actions={actions} />
    </Flex.Content>
  )
}
