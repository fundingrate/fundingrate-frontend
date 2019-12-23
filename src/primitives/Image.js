import React from 'react'

import styled from 'styled-components'
import {
  width,
  height,
  backgroundPosition,
  backgroundImage,
  backgroundSize,
} from 'styled-system'

import Box from './Box'

const type = props => {
  switch (props.type) {
    case 'steam':
      return `
        filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5)) saturate(123%) contrast(110%);
      `
    // case 'avatar':
    //   return `
    //    border-radius={theme.radii.circle}
    //   `
    default:
      return `
      `
  }
}

const Styled = styled(Box)`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  ${backgroundPosition}
  ${backgroundImage}
  ${backgroundSize}
  ${type}
  ${height}
  ${width}
`

const Image = ({ children, ...props }) => (
  <Styled {...props} backgroundImage={`url(${props.src})`}>
    {children}
  </Styled>
)

Image.displayName = 'Image'

Image.defaultProps = {
  borderRadius: 'normal',
}

export default Image
