import React from 'react'
import { Button, Text, Box, Flex, Divider } from '../primitives'

export default ({ history }) => {
  setTimeout(history.goBack, 1000)
  // window.location.reload()
  return (
    <Box m={4}>
      <Text.Heading>404</Text.Heading>
      <Text>Redirecting...</Text>
    </Box>
  )
}
