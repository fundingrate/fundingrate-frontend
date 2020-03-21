import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Flex, Box, Button, Image } from './index'

const Sidebar = styled(Flex)`
  position: relative;
  box-shadow: 2px 0px 2px -2px rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);

  // display: ${p => (p.open ? 'flex' : 'none')};
  @media only screen and (max-width: 1024px) {
    // display: none;
  }
`

Sidebar.defaultProps = {
  // bg: "foregroundBacking",
  bg: 'backing',
  p: 3,
  height: '100%',
  flexDirection: 'column',
}

export default Sidebar
