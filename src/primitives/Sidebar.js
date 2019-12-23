import React, { useState } from 'react'

import styled from 'styled-components'
// import system from 'styled-system'

import { Flex, Box, Button, Image } from './index'
import Assets from '../components/Assets'

import theme from '../styles/theme'

const Sidebar = styled(Flex)`
  border-right: 1px solid rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 1024px) {
    display: none;
    // display: ${p => (p.open ? 'block' : 'none')};
  }
`

Sidebar.defaultProps = {
  p: 3,
  height: '100%',
  flexDirection: 'column',
  boxShadow: "2px 0px 2px -2px rgba(0, 0, 0, 0.2)",
  zIndex: 9001
  // width: '100%',
  // flex: 1
}

Sidebar.ToggleButton = styled(Button)`
  border: 2px solid black;
  position: 'absolute';
  // position: ${p => (p.open ? 'relative' : 'absolute')};

  @media only screen and (min-width: 1024px) {
    display: none;
  }
`

Sidebar.ToggleButton.defaultProps = {
  type: 'simple-shaded',
  alt: 'Toggle Sidebar',
}

export default ({ children, ...p }) => {
  const [open, setOpen] = useState(true)

  return (
    <>
      <Sidebar {...p} open={open}>
        {children}
      </Sidebar>
      {/* <Sidebar.ToggleButton
        open={open}
        onClick={e => {
          setOpen(!open)
        }}
      >
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Assets.Icons.Popular size={32} />
          Toggle
        </Flex>
      </Sidebar.ToggleButton> */}
    </>
  )
}
