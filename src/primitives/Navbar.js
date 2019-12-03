import React from 'react'
import { Flex, Text } from './index'

const Navbar = ({ links, onClick, cPage, fixedVertical }) => {
  // LINK: { label: 'Home', href: '/home' }
  return (
    <Flex
      flexDirection={ fixedVertical ? 'column' : ['column', 'row']}
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
          <Text.Link
            active={active}
            key={href + label}
            fontSize={[2,4]}
            onClick={e => onClick(href)}
            href={href}
            mx={2}
            p={3}
          >
            {label}
          </Text.Link>
        )
      })}
    </Flex>
  )
}

export default Navbar
