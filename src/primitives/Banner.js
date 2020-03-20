import React from 'react'
import { Box, Flex, Image, Container } from '.'

import bg from '../assets/images/ticks.png'

const Banner = ({
  src=bg,
  opacity = 0.1,
  children,
  ...props
}) => {
  return (
    <Flex
      // flex={1}
      height={"100%"}
      bg="darkBacking"
      {...props}
      position="relative"
      width={1}

      // style={{
      //   boxShadow: "0 2px 0px rgba(0, 0, 0, .25)"
      // }}
    >
      <Image
        // backgroundSize="cover"
        // backgroundPosition="top"
        // backgroundRepeat="repeat"
        src={src}
        style={{
          opacity,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 0,
          position: 'absolute',
          height: '100%',
          width: '100%',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto'
        }}
      />
      <Flex
        style={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'relative',
          height: '100%',
          width: '100%',
        }}
      >
        {children}
      </Flex>
      {/* <Container
        style={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "relative"
        }}
      >
        {children}
      </Container> */}
    </Flex>
  )
}

export default Banner
