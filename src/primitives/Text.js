import React from 'react'
import styled from 'styled-components'
import {
  color,
  fontSize,
  fontWeight,
  lineHeight,
  space,
  textAlign,
  letterSpacing,
  fontFamily,
  style
} from 'styled-system'

import theme from '../styles/theme'
import Box from './Box'

const Text = styled(Box)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: ${p => (p.wrap ? 'wrap' : 'nowrap')};
  color: white;

  letter-spacing: ${theme.letterSpacings.slight};
  // text-shadow: ${props => (props.color ? '0 0 0.05em' : 'none')};

	${color}
	${fontSize}
	${fontWeight}
	${lineHeight}
	${space}
	${textAlign}
  ${letterSpacing}
  ${fontFamily}
`

Text.displayName = 'Text'

Text.defaultProps = {
  fontSize: [1, 2],
}

Text.Heading = ({ children, bold, ...props }) => {
  return (
    <Text
      fontSize={[7, 8, 9]}
      fontWeight="bold"
      letterSpacing="slight"
      fontFamily={bold ? 'TTMussels-Bold' : 'TTMussels'}
      {...props}
    >
      {children}
    </Text>
  )
}

Text.Number = ({ bold, money, value, ...props }) => {
  value = money
    ? value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
    : value.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      })

  return <Text {...props}>{value}</Text>
}

const textDecoration = style({
  prop: 'textDecoration',
  cssProperty: 'textDecoration',
})

Text.Link = styled(Text)`
  cursor: pointer;
  text-decoration: none;

  &:hover,
  &:focus {
    opacity: 1;
  }
`

Text.Link.defaultProps = {
  // color: 'link',
  fontSize: 1,
  opacity: 0.5,
}

// Text.Link = ({ children, ...props }) => {
//   return (
//     <Text as={a} fontSize={1} opacity={0.5}>
//       {children}
//     </Text>
//   )
// }

export default Text
