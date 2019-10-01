import React from "react";
import styled from 'styled-components'
import {
  alignItems,
  flex,
  flexDirection,
  flexWrap,
  justifyContent,
  alignSelf,
  justifySelf
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

export default Flex
