import React from 'react'
import { Text, Flex } from '../primitives'
import { useHistory, useLocation } from 'react-router-dom'

export default p => {
  // setTimeout(history.goBack, 1000)
  // window.location.reload()
  const history = useHistory()

  return (
    <Flex.Column
      m={4}
      alignItems="center"
      justifyContent="center"
      height={'100%'}
    >
      <Text.Heading>404</Text.Heading>
      <Text>What were you looking for?</Text>
      <Text.Link m={4} onClick={e => history.push('/home')}>
        Go Home
      </Text.Link>
    </Flex.Column>
  )
}
