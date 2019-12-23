import React from 'react'
import styled from 'styled-components'
import {
  alignItems,
  flex,
  flexDirection,
  flexWrap,
  justifyContent,
  alignSelf,
  justifySelf,
} from 'styled-system'

import Box from './Box'

const Flex = styled(Box)`
  display: flex;

	${alignItems}
  ${flex}
  ${flexDirection}
  ${flexWrap}
  ${justifyContent}
  ${alignSelf}
  ${justifySelf}
`

Flex.displayName = 'Flex'

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
