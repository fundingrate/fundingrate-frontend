import React from 'react'
import styled from 'styled-components'
import {} from 'styled-system'

import Flex from './Flex'
import theme from '../styles/theme'

const selected = ({ selected }) => {
  return (
    selected &&
    `
      border: ${theme.colors.primary} ${theme.borders.normal};
      background-color: ${theme.colors.lighterBlack};
    `
  )
}

const Card = styled(Flex)`
  position: relative;
  border-radius: ${theme.radii.normal};
  box-shadow: ${p => (!p.flat ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none')};
  border: ${p =>
    p.border ? `${theme.colors.lightCard} ${theme.borders.normal}` : 'none'};
  ${selected}
`

Card.displayName = 'Card'
Card.defaultProps = {
  p: 3,
  bg: 'card',
}

export default Card
