import React, { useEffect, useState } from 'react'
import { Card, Button, Flex, Box, Text, Heading } from '../primitives'
import Utils from '../components/Utils'

export default ({ actions, location, user, token, history }) => {
  const cPage = location.pathname

  if (!user) {
    history.push('/authenticate')
    return <Text>Redirecting...</Text>
  }

  const [state, setState] = useState(null)

  useEffect(() => {
    actions.listMyTokens({ token }).then(([t]) => {
      console.log(t)
      return setState(t)
    })
  }, [])

  const Logout = () => {
    actions.deleteLocalStorage('token')
    window.location.reload()
  }

  return (
    <Flex
      flexDirection="column"
      width={1}
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        width={1}
        justifyContent="center"
        alignItems="center"
        bg="primary"
        p={4}
      >
        <Text.Heading fontSize={5}>Welcome back, {user.username}</Text.Heading>
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={[1, 4]}
        width={[1, 2 / 3]}
      >
        <Text color="red" fontSize={3} p={3}>
          Please ensure you save this information or risk losing your account.
        </Text>

        <Heading>User</Heading>
        <Utils.RenderObject data={user} />
        <Heading>Token</Heading>
        {!state ? <Utils.LoadingPage /> : <Utils.RenderObject data={state} />}

        <Button disabled={!state} m={3} type="warning" onClick={Logout}>
          LOGOUT
        </Button>
      </Flex>
    </Flex>
  )
}
