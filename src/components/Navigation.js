import React, { useEffect, useState } from 'react'
import { NavigationRouter, NavigationLinks } from '../primitives/Navigate'
import { Assets } from '.'
import { Button, Flex, Text, Sidebar, Page, Divider } from '../primitives'

const sidebarVariants = {
  open: {
    width: 'auto',
    // transition: ({ i }) => ({ delay: i * 50 }),
    opacity: 1,
    staggerChildren: 0.07, 
    delayChildren: 0.2,
    x:0
  },
  closed: { 
    x: "-100%",
    width: '0%', 
    opacity: 0,
    staggerChildren: 0.05, 
    staggerDirection: -1
  },
}

const SidebarButton = React.forwardRef(({ href, label, onClick }, innerRef) => {
  return (
    <Button
      key={href}
      textAlign="left"
      fontSize={4}
      type="simple"
      onClick={e => onClick(href)}
      ref={innerRef}
    >
      - {label}
    </Button>
  )
})

const buttonVariants = {
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 },
}

export const SideNav = ({ user, links, onClick }) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!open)

  useEffect(() => {
    if (!open) toggleOpen()
  }, []) //animate on page render

  //useEffect(() => {
  //  setTimeout(toggleOpen, 1000);
  //}, [open]);

  return (
    <Sidebar animate={open ? 'open' : 'closed'} variants={sidebarVariants} >
      <Flex
        p={3}
        alignItems="center"
        justifyContent="center"
        my={3}
        onClick={e => onClick('/home')}
      >
        <Assets.Logos.MainLogoWhite />
      </Flex>
      <Divider />
      <Flex.Column width={1} p={2}>
        <NavigationLinks links={links} variants={sidebarVariants} />
      </Flex.Column>
    </Sidebar>
  )
}
