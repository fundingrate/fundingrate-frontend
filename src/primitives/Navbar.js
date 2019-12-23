import React from 'react'
import { Flex, Button, Text } from './index'

const Navbar = ({ links, onClick, cPage, fixedVertical }) => {
  // LINK: { label: 'Home', href: '/home' }
  return (
    <Flex
      flexDirection={fixedVertical ? 'column' : ['column', 'row']}
      width={1}
      bg="foregroundBacking"
      justifyContent="space-evenly"
      boxShadow="0px 2px 2px -2px rgba(0, 0, 0, 0.2)"
      borderBottom="1px solid rgba(0, 0, 0, 0.2)"
      zIndex={9001}
      // flexWrap="wrap"
      // alignItems="center"
    >
      {links.map(({ href, label }) => {
        const active = cPage === href
        return (
          <Button
            type="simple"
            active={active}
            key={href + label}
            fontSize={3}
            onClick={e => onClick(href)}
            href={href}
            mx={2}
            p={2}
          >
            {label}
          </Button>
        )
      })}
    </Flex>
  )
}

export default Navbar
