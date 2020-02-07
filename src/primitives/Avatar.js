import React from 'react'
import styled from 'styled-components'
import {
  border
} from 'styled-system'

import Image from './Image'
import theme from '../styles/theme'

const Styled = styled(Image)`
  border-radius: ${theme.radii.circle};
  border: ${theme.colors.backing} ${theme.borders.normal};
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;

  ${border}
`

const Avatar = props => <Styled src={props.image} {...props}/>

Avatar.displayName = 'Avatar'

export default Avatar
