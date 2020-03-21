import React from 'react'
import styled from 'styled-components'
import { flexbox } from 'styled-system'

import Box from './Box'

const Flex = styled(Box)`
  display: flex;
  ${flexbox}
`

Flex.displayName = 'Flex'

Flex.Column = p => {
  return <Flex {...p} flexDirection="column" />
}

Flex.Row = p => {
  return <Flex {...p} flexDirection="row" alignItems="center" />
}

Flex.RowMobile = p => {
  return <Flex {...p} flexDirection={['column', 'row']} alignItems="center" />
}

Flex.Content = ({ children, ...p }) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={[1, 4]}
      width={[1, 2 / 3]}
      {...p}
    >
      {children}
    </Flex>
  )
}

export default Flex
