import React, { useState } from 'react'

import styled from 'styled-components'
// import system from 'styled-system'

import { Flex, Box, Button, Image } from './index'
import Assets from '../components/Assets'

const Sidebar = styled(Flex)`
  border: 2px solid black;

  @media only screen and (max-width: 600px) {
    display: ${p => (p.open ? 'block' : 'none')};
  }
`

Sidebar.defaultProps = {
  p: 4,
  height: '100%',
  flexDirection: 'column',
  // width: '100%',
  // flex: 1
}

Sidebar.ToggleButton = styled(Button)`
  border: 2px solid black;
  position: ${p => (p.open ? 'relative' : 'absolute')};

  @media only screen and (min-width: 600px) {
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
      <Sidebar.ToggleButton
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
          <Image src={Assets.Icons.Popular} size={32} />
          Toggle
        </Flex>
      </Sidebar.ToggleButton>
    </>
  )
}
