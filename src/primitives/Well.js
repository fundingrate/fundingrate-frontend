import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Flex, Box, Button, Image } from './index'
import theme from '../styles/theme'

const Well = styled(Box)`
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.5);
  border: ${theme.colors.backingDark} ${theme.borders.normal};
  border-radius: ${theme.radii.rounded};
  border-bottom: 1px solid rgba(255,255,255,0.2);
  overflow: auto;
`

Well.defaultProps = {
  // as: 'code',
  // bg: "foregroundBacking",
  bg: 'darkBacking',
  p: 1,
}

export default Well
