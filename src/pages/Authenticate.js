import React, { useEffect, useState } from 'react'
import { Card, Box, Button, Flex, Text, Heading, Input } from '../primitives'
import { Assets, Utils } from '../components'
import { useWiring, store } from '../libs/wiring'
import { NavigationRouter, NavigationLinks } from '../primitives/Navigate'

import { useHistory, useLocation } from 'react-router-dom'

const Login = ({ onSubmit = x => x }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [state, setState] = useState({
    login: '',
    password: '',
  })
  const history = useHistory()
  const isReady = state.login.length < 5 && state.password.length < 8

  const handleInput = prop => e => {
    const value = e.target.value
    // console.log(prop, value)
    setState({
      ...state,
      [prop]: value,
    })
  }

  const Submit = () => {
    if (isReady) return
    setLoading(true)
    return onSubmit(state)
      .then(r => {
        setLoading(false)
        // history.push('/profile')
        window.location.reload()
      })
      .catch(e => {
        setLoading(false)
        console.error('LOGIN ERROR:', state, e)
        setError('LOGIN ERROR:', e.message)
      })
  }

  return (
    <Flex.Column
      width={1}
      p={4}
      height="100%"
      alignItems="center"
      // justifyContent="center"
      onKeyPress={e => {
        if (e.key !== 'Enter') return
        if (error) return
        Submit()
      }}
    >
      <Heading> Account Login </Heading>
      <Text color={error ? 'red' : 'primary'} p={2}>
        {error ? error : 'Welcome back, please enter your account credentials.'}
      </Text>
      <Flex.Column as={Card} width={[1, 1 / 2]} p={4} m={4}>
        <Input
          disabled={loading}
          label="Login: "
          value={state.login}
          onChange={handleInput('login')}
          placeholder="example@fundingrate.io"
        />
        <Box my={2} />
        <Input
          type="password"
          disabled={loading}
          label="Password: "
          value={state.password}
          onChange={handleInput('password')}
          placeholder="********************"
        />
        <Flex.Row mt={2}>
          <Box mx="auto" />
          <Button disabled={isReady} mt={3} type="primary" onClick={Submit}>
            {loading ? <Utils.Loading /> : 'Login'}
          </Button>
        </Flex.Row>
      </Flex.Column>
      <Text.Link onClick={e => history.push('/authenticate')}>
        Go Back
      </Text.Link>
    </Flex.Column>
  )
}

const Register = ({ onSubmit = x => x }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [state, setState] = useState({
    login: '',
    password: '',
    verifyPassword: '',
  })

  const history = useHistory()

  const handleInput = prop => e => {
    const value = e.target.value
    setState({
      ...state,
      [prop]: value,
    })
  }

  const Submit = () => {
    if (error) return
    setLoading(true)
    return onSubmit(state)
      .then(r => {
        setLoading(false)
        // history.push('/profile')
        window.location.reload()
      })
      .catch(e => {
        setLoading(false)
        console.error('REGISTER ERROR:', state, e)
        setError(e.message)
      })
  }

  useEffect(() => {
    if (state.password.length < 8)
      return setError('Password needs to be at least 8 characters.')
    if (state.password !== state.verifyPassword)
      return setError('Passwords do not match.')
    setError(null)
  }, [state])

  return (
    <Flex.Column
      flexDirection="column"
      width={1}
      p={4}
      height="100%"
      alignItems="center"
      onKeyPress={e => {
        if (e.key !== 'Enter') return
        if (error) return
        Submit()
      }}
    >
      <Heading> Account Registration </Heading>
      <Text color={error ? 'red' : 'primary'} p={2}>
        {error ? error : 'Hello, please enter your desired credentials below.'}
      </Text>
      <Flex.Column as={Card} width={[1, 1 / 2]} p={4} m={4}>
        <Input
          disabled={loading}
          label="Login: "
          value={state.login}
          onChange={handleInput('login')}
          placeholder="example@fundingrate.io"
        />
        <Box my={2} />
        <Input
          type="password"
          disabled={loading}
          label="Password: "
          value={state.password}
          onChange={handleInput('password')}
          placeholder="********************"
        />
        <Box my={2} />
        <Input
          type="password"
          disabled={loading}
          label="Verify: "
          value={state.verifyPassword}
          onChange={handleInput('verifyPassword')}
          placeholder="********************"
        />
        <Flex.Row mt={2}>
          <Box mx="auto" />
          <Button disabled={error} mt={3} type="primary" onClick={Submit}>
            {loading ? <Utils.Loading /> : 'Register'}
          </Button>
        </Flex.Row>
      </Flex.Column>
      <Text.Link onClick={e => history.push('/authenticate')}>
        Go Back
      </Text.Link>
    </Flex.Column>
  )
}

export default p => {
  const [state, dispatch] = useWiring(['userid'])
  const history = useHistory()
  if (state.userid) {
    history.push('/home')
    return <Text>Redirecting...</Text>
  }

  const pages = {
    '/signup': r,
    '/login': l,
    '/home': Home,
  }

  return (
    <NavigationRouter
      pages={pages}
      root="/authenticate"
      defaultRoute="/authenticate/home"
    />
  )
}

const r = p => {
  const [state, dispatch] = useWiring(['userid'])


  return (
    <Register
      {...p}
      onSubmit={s => state.actions.auth('signup', { ...s, token: state.token })}
    />
  )
}

const l = p => {
  const [state, dispatch] = useWiring(['userid'])

  return (
    <Login
      {...p}
      onSubmit={s => state.actions.auth('login', { ...s, token: state.token })}
    />
  )
}

const Home = p => {
  const history = useHistory()

  const setPage = p => history.push(p)

  return (
    <Flex.Row justifyContent="center" height="100%" width={1}>
      <Button
        fontSize={4}
        as={Flex.Row}
        alignItems="center"
        type="card"
        onClick={e => setPage('/authenticate/login')}
      >
        <Assets.Icons.Login mr={3} size={32} /> Login
      </Button>
      <Text mx={4} color="subtext" fontSize={1}>
        OR
      </Text>
      <Button
        fontSize={4}
        as={Flex.Row}
        alignItems="center"
        type="card"
        onClick={e => setPage('/authenticate/signup')}
      >
        <Assets.Icons.Signup mr={3} size={32} /> Signup
      </Button>
    </Flex.Row>
  )
}
