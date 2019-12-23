import React from 'react'
import styled from 'styled-components'

import Box from './Box'

const Container = styled(Box)`
  max-width: 1280px;
  margin: 0 auto;
`

Container.defaultProps = {
  width: 1,
  px: [3, 0],
}

Container.displayName = 'Container'

export default Container
