import React, { useEffect, useState } from 'react'
import { Header, Footer, Assets } from './components'
import { Button, Flex, Text, Sidebar, Page, Divider } from './primitives'
import Pages from './pages'

const SideNav = ({ user, links, onClick }) => {
  return (
    <Sidebar>
      <Flex
        alignItems="center"
        justifyContent="center"
        my={3}
        onClick={e => onClick('/home')}
      >
        <Assets.Logos.MainLogoWhite />
        {/* <Assets.Icons.Popular mr={2} size={28} /> Dashboard */}
      </Flex>
      <Divider />
      {links.map(({ label, href }) => {
        // console.log(user)
        switch (href) {
          case '/authenticate': {
            return <></>
            // if (user) return null
            // return (
            //   <Button key={label} type="primary" onClick={e => onClick(href)}>
            //     {label}
            //   </Button>
            // )
          }
          case '/profile': {
            if (!user) return null
            return (
              <Button
                key={href}
                textAlign="left"
                fontSize={4}
                type="simple"
                onClick={e => onClick(href)}
              >
                - {label}
              </Button>
            )
          }
          case '/providers': {
            if (!user) return null
            return (
              <Button
                key={href}
                textAlign="left"
                fontSize={4}
                type="simple"
                onClick={e => onClick(href)}
              >
                - {label}
              </Button>
            )
          }
          default:
            return (
              <Button
                key={href}
                textAlign="left"
                fontSize={4}
                key={label}
                type="simple"
                onClick={e => onClick(href)}
              >
                - {label}
              </Button>
            )
        }
      })}
    </Sidebar>
  )
}

const Layout = ({ user, children, onClick }) => {
  const links = Object.keys(Pages).reduce((memo, k) => {
    if (k === 'NotFound') return memo
    memo.push({ label: k, href: `/${k.toLowerCase()}` })
    return memo
  }, [])

  return (
    <Flex
      width={1}
      height={'100%'}
      bg="backing"
      // justifyContent="center"
      alignItems="center"
    >
      <SideNav user={user} links={links} onClick={onClick} />
      <Flex
        flexDirection="column"
        width={1}
        height={'100%'}
        // bg="backing"
        justifyContent="center"
        // alignItems="center"
      >
        <Header heading={'v1.2.7-beta'}>
          {user ? (
            <Text fontSize={[2, 4]}>{user.username}</Text>
          ) : (
            <Button type="primary" onClick={e => onClick('/authenticate')}>
              Login / Register
            </Button>
          )}
        </Header>
        <Page flex={1}>{children}</Page>
        <Footer />
      </Flex>
    </Flex>
  )
}

export default Layout
