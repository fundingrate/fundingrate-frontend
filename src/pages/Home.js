import React from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

import { Flex, Box, Text } from '../primitives'

const SideNav = ({ links }) => {
  return (
    <Sidebar>
      {links.map(({ label, href }) => {
        return (
          <Text.Link key={label} href={href}>
            label
          </Text.Link>
        )
      })}
    </Sidebar>
  )
}

const Home = p => {
  const links = [
    { label: 'Events', href: '/events' },
    { label: 'Trades', href: '/trades' },
    { label: 'Stats', href: '/Stats' },
  ]

  return (
    <Flex
      width={1}
      height={'100%'}
      bg="backing"
      justifyContent="center"
      alignItems="center"
    >
      {/* <SideNav links={links} /> */}
      {/* <Header /> */}
      Hello World!
      {/* <Footer /> */}
    </Flex>
  )
}

export default Home
