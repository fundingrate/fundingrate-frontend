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
  Input,
} from '../primitives'
import Utils from '../components/Utils'

const Profile = ({ actions, location, user, token, history }) => {
  const cPage = location.pathname

  const [state, setState] = useState(null)

  useEffect(() => {
    actions.listMyTokens({ token }).then(([t]) => {
      console.log(t)
      return setState(t)
    })
  }, [])

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
      <Box p={4}>
        <Heading>User</Heading>
        <Utils.RenderObject data={user} />
        <Heading>Token</Heading>
        {!state ? <Utils.LoadingPage /> : <Utils.RenderObject data={state} />}
      </Box>
    </Flex>
  )
}

const Login = ({ actions, location, history }) => {
  const cPage = location.pathname

  const [state, setState] = useState({})
  const [loading, setLoading] = useState(false)

  const handleInput = prop => e => {
    const value = e.target.value
    console.log(prop, value)
    setState({
      ...state,
      [prop]: value,
    })
  }

  const Submit = () => {
    setLoading(true)
    return actions
      .me(state)
      .then(user => {
        setLoading(false)
        actions.setLocalStorage('token', state.token)
        // return history.push('/stats')
        window.location.reload()
      })
      .catch(e => {
        setLoading(false)
        console.error('REGISTER ERROR:', state, e)
      })
  }

  return (
    <Flex
      flexDirection="column"
      width={1}
      p={4}
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Heading> Token Login </Heading>
      <Flex
        flexDirection="column"
        width={1 / 2}
        alignItems="center"
        justifyContent="center"
        p={2}
      >
        <Input
          disabled={loading}
          label="Token: "
          value={state.token}
          onChange={handleInput('token')}
        />
        <Button m={2} type="primary" onClick={Submit}>
          LOGIN
        </Button>
      </Flex>
    </Flex>
  )
}

const Register = ({ actions, location, user, token, history }) => {
  const cPage = location.pathname

  const [state, setState] = useState({})
  const [loading, setLoading] = useState(false)

  const handleInput = prop => e => {
    const value = e.target.value
    console.log(prop, value)
    setState({
      ...state,
      [prop]: value,
    })
  }

  const Submit = () => {
    setLoading(true)
    return actions
      .registerUsername(state)
      .then(({ user, token }) => {
        setLoading(false)
        actions.setLocalStorage('token', token.id)
        // return history.push('/stats')
        window.location.reload()
      })
      .catch(e => {
        setLoading(false)
        console.error('REGISTER ERROR:', state, e)
      })
  }

  return (
    <Flex
      flexDirection="column"
      width={1}
      p={4}
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Heading> Username Registration </Heading>
      <Flex
        flexDirection="column"
        width={1 / 2}
        alignItems="center"
        justifyContent="center"
        p={2}
      >
        <Input
          disabled={loading}
          label="Username: "
          value={state.username}
          onChange={handleInput('username')}
        />
        <Button m={2} type="primary" onClick={Submit}>
          REGISTER
        </Button>
      </Flex>
    </Flex>
  )
}

const Authenticate = p => {
  const r = <Register {...p} />
  const l = <Login {...p} />

  const [page, setPage] = useState(null)

  if (page) return page
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      p={4}
    >
      <Heading>Have you been here before?</Heading>
      <Card flexDirection="column" m={2}>
        <Button type="simple" onClick={e => setPage(r)}>
          I need to register my username.
        </Button>
        <Button type="simple" onClick={e => setPage(l)}>
          I already have a account.
        </Button>
      </Card>
    </Flex>
  )
}

export default p => {
  return !p.user ? <Authenticate {...p} /> : <Profile {...p} />
}
