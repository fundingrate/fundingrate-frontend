import React, { useEffect, useState } from 'react'
import { Card, Box, Button, Flex, Text, Heading, Input } from '../primitives'
import { Assets } from '../components'

const Login = ({ actions, location, history }) => {
  const cPage = location.pathname

  const [state, setState] = useState({
    token: '',
  })
  const [loading, setLoading] = useState(false)

  const handleInput = prop => e => {
    const value = e.target.value
    // console.log(prop, value)
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
        history.push('/profile')
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
      <Text color="primary" p={2}>
        To protect your identity, we only require your token to login.
      </Text>
      <Flex
        flexDirection="column"
        width={[1, 1 / 2]}
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
        <Button
          disabled={state.token.length < 1}
          m={3}
          type="primary"
          onClick={Submit}
        >
          LOGIN
        </Button>
      </Flex>
    </Flex>
  )
}

const Register = ({ actions, location, user, token, history }) => {
  const cPage = location.pathname

  const [state, setState] = useState({
    username: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleInput = prop => e => {
    const value = e.target.value
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
        history.push('/profile')
        window.location.reload()
      })
      .catch(e => {
        setLoading(false)
        console.error('REGISTER ERROR:', state, e)
        setError(e.message)
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
      <Text color="primary" p={2}>
        {error
          ? error
          : 'To protect your identity, we only require a username to register.'}
      </Text>
      <Flex
        flexDirection="column"
        width={[1, 1 / 2]}
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
        <Button
          disabled={state.username.length < 3}
          m={3}
          type="primary"
          onClick={Submit}
        >
          REGISTER
        </Button>
      </Flex>
    </Flex>
  )
}

const Authenticate = p => {
  if (p.user) {
    p.history.push('/profile')
    return <Text>Redirecting...</Text>
  }

  const r = <Register {...p} />
  const l = <Login {...p} />

  const [page, setPage] = useState(null)

  if (page) return page
  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width={1}>
      <Button
        as={Flex}
        alignItems="center"
        type="card"
        onClick={e => setPage(l)}
      >
        <Assets.Icons.Login mr={3} /> Login
      </Button>
      <Text mx={2} color="subtext" fontSize={1}>
        OR
      </Text>
      <Button
        as={Flex}
        alignItems="center"
        type="card"
        onClick={e => setPage(r)}
      >
        <Assets.Icons.Signup mr={3} /> Signup
      </Button>
    </Flex>
  )
}

export default Authenticate
