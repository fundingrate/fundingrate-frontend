import React from 'react'
import styled, { keyframes } from 'styled-components'
// import { FaCog } from 'react-icons/fa'
import Box from './Box'
import { maxWidth, space } from 'styled-system'

const rotation = keyframes`
  from {
      -webkit-transform: rotate(0deg);
  }
  to {
      -webkit-transform: rotate(359deg);
  }
`

const Spinner = styled(Box)`
  animation: ${rotation} 1s ease infinite;
  // font-size: 2em;
`

// const Spinner = props => <Styled as={FaCog} {...props} />

Spinner.displayName = 'Spinner'

export default Spinner
