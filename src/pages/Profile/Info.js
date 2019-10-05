import React, { useEffect, useState } from 'react'
import { Card, Button, Flex, Box, Text, Heading } from '../../primitives'
import Utils from '../../components/Utils'
import Banners from '../../components/Banners'

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
        Please ensure you save this information or risk losing your account.
      </Text>
      {state.token && <Utils.DownloadJson data={state} />}

      <Heading>User</Heading>
      <Utils.RenderObject data={state.user} filename={state.user.id} />
      <Heading>Token</Heading>
      {!state.token ? (
        <Utils.LoadingPage />
      ) : (
        <Utils.RenderObject data={state.token} />
      )}

      <Button disabled={!state} m={3} type="warning" onClick={Logout}>
        LOGOUT
      </Button>
    </Flex.Content>
  )
}
