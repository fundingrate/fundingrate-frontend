import React, { forwardRef } from 'react'
import styled from 'styled-components'
import {} from 'styled-system'
import { Box, Flex } from '.'
import theme from '../styles/theme'
import posed from 'react-pose'

const Container = styled.div`
  // display: flex;
  z-index: 99999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.8);
  perspective: 500px;
  transform: translateZ(0);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* pointer-events: none; */
`

const Shade = posed(Container)({
  enter: {
    applyAtStart: { display: 'flex' },
    opacity: 1,
    // beforeChildren: true,
    transition: { duration: 200, ease: 'linear' },
  },
  exit: {
    applyAtEnd: { display: 'none' },
    opacity: 0,
    // afterChildren: true,
    transition: { duration: 200, ease: 'linear' },
  },
})

const Modal = styled(Flex)`
  max-height: 80%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-shadow: 0 2px 2px black;
  // padding: 20px;
  transform: translateZ(0);

  background: ${theme.colors.card};
  border-radius: ${theme.radii.normal};
  /* pointer-events: none; */
`
Modal.defaultProps = {
  // p: 2
}

const PosedModal = posed(Modal)({
  enter: { opacity: 1, z: 0 },
  exit: { opacity: 0, z: -150 },
})

export default ({ isOpen = true, children, ...p }) => {
  return (
    <Shade pose={isOpen ? 'enter' : 'exit'}>
      <PosedModal pose={isOpen ? 'enter' : 'exit'} {...p}>
        {children}
      </PosedModal>
    </Shade>
  )
}
