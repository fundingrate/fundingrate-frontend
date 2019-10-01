import React from 'react'

import styled from 'styled-components'
// import system from 'styled-system'

import { Flex, Box } from './index'

const Sidebar = styled(Flex)`
	border: 2px solid black;
`

Sidebar.defaultProps = {
  p: 4,
  height: '100%',
  flexDirection: 'column',
}

export default Sidebar
