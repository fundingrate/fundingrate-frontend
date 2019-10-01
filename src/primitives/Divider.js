import React from 'react'
import styled from 'styled-components'
import { space, color } from 'styled-system'

import Box from './Box'

const type = props => {
  switch (props.type) {
    case 'vertical':
      return `
        height: 100%;
        width: 1px;
      `
    default:
      return `
        height: 1px;
        width: 100%;
      `
  }
}

const Divider = styled(Box)`
  /* height: 1px;
  width: 100%; */

  ${color}
  ${space}
  ${type}
`

Divider.propTypes = {
  ...color.propTypes,
  ...space.propTypes,
}

Divider.defaultProps = {
  bg: 'foregroundBacking',
}

Divider.displayName = 'Divider'

export default Divider
