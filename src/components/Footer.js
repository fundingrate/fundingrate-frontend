import React from 'react'
import { Box, Text, Flex, Button } from '../primitives'
import Assets from './Assets'

export default p => {
  const navigateTo = url => {
    window.open(url, '_blank')
  }

  return (
    <Flex
      bg="foregroundBacking"
      p={2}
      boxShadow="0px -2px 2px -2px rgba(0, 0, 0, 0.2)"
      borderTop="1px solid rgba(0, 0, 0, 0.2)"
      zIndex={9001}
      alignItems="center"
    >
      <Button
        as={Flex}
        alignItems="center"
        type="simple"
        onClick={e => navigateTo('https://twitter.com/fundingrateio')}
      >
        <Assets.Social.Twitter mx={2} /> Twitter
      </Button>
      <Button
        as={Flex}
        alignItems="center"
        type="simple"
        onClick={e => navigateTo('https://t.co/tLGaSbxy4b?amp=1')}
      >
        <Assets.Social.Discord mx={2} /> Discord
      </Button>
      <Button
        as={Flex}
        alignItems="center"
        type="simple"
        onClick={e => navigateTo('Support')}
      >
        <Assets.Icons.Help mx={2} bg="consumer" /> Support
      </Button>
      <Box mx="auto" />
      <Button
        as={Flex}
        alignItems="center"
        type="simple"
        onClick={e => navigateTo('https://chips.gg')}
      >
        <Assets.Logos.Chips />
      </Button>
    </Flex>
  )
}
