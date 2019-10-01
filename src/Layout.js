import React, { useEffect, useState } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import Assets from './components/Assets'
import { Button, Flex, Box, Text, Image, Sidebar } from './primitives'

const SideNav = ({ links, onClick }) => {
  return (
    <Sidebar>
      <Flex alignItems="center" my={3} onClick={e => onClick('/home')}>
        <Image mr={2} src={Assets.Icons.Popular} size={28} /> Dashboard
      </Flex>
      {links.map(({ label, href }) => {
        return (
          <Button key={label} type="simple" onClick={e => onClick(href)}>
            {label}
          </Button>
        )
      })}
    </Sidebar>
  )
}

const Layout = ({ children, onClick }) => {
  const links = [
    { label: 'Events', href: '/events' },
    { label: 'Trades', href: '/trades' },
    { label: 'Stats', href: '/stats' },
  ]

  return (
    <Flex
      width={1}
      height={'100%'}
      bg="backing"
      // justifyContent="center"
      alignItems="center"
    >
      <SideNav links={links} onClick={onClick} />
      <Flex
        flexDirection="column"
        width={1}
        height={'100%'}
        // bg="backing"
        justifyContent="center"
        // alignItems="center"
      >
        <Header />
        <Flex flex={1}>{children}</Flex>
        <Footer />
      </Flex>
    </Flex>
  )
}

export default Layout
