import React, { useEffect, useState } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import Assets from './components/Assets'
import {
  Button,
  Flex,
  Box,
  Text,
  Image,
  Sidebar,
  Page,
  Divider,
} from './primitives'

import Pages from './pages'

const SideNav = ({ links, onClick }) => {
  return (
    <Sidebar>
      <Flex
        alignItems="center"
        justifyContent="center"
        my={3}
        onClick={e => onClick('/home')}
      >
        <Image mr={2} src={Assets.Icons.Popular} size={28} /> Dashboard
      </Flex>
      <Divider />
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

const Layout = ({ user, children, onClick }) => {
  // const links = [
  //   { label: 'Events', href: '/events' },
  //   { label: 'Trades', href: '/trades' },
  //   { label: 'Stats', href: '/stats' },
  // ]

  const links = Object.keys(Pages).reduce((memo, k) => {
    if (k === 'NotFound') return memo
    memo.push({ label: k, href: `/${k}` })
    return memo
  }, [])

  console.log(links)

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
        <Header>
          {user ? <Text>{user.username}</Text> : <Text>Nobody</Text>}
        </Header>
        <Page flex={1}>{children}</Page>
        <Footer />
      </Flex>
    </Flex>
  )
}

export default Layout
