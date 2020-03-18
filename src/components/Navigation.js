import React, { useEffect, useState } from "react";
import { NavigationRouter, NavigationLinks } from "../primitives/Navigate";
import { Assets } from ".";
import { Button, Flex, Text, Sidebar, Page, Divider } from "../primitives";
import posed from "react-pose";

const PosedSidebar = posed(Sidebar)({
  open: {
    width: "auto",
    delayChildren: 100,
    staggerChildren: 100,
    // transition: ({ i }) => ({ delay: i * 50 }),
    opacity: 1
  },
  closed: { width: "0%", opacity: 0 }
});

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
  );
});

const PosedSidebarButton = posed(SidebarButton)({
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 }
});

export const SideNav = ({ user, links, onClick }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  useEffect(() => {
    if (!open) toggleOpen();
  }, []); //animate on page render

  // useEffect(() => {
  //   setTimeout(toggleOpen, 5000);
  // }, [open]);

  return (
    <PosedSidebar p={open ? 3 : 0} pose={open ? "open" : "closed"}>
      <Flex
        alignItems="center"
        justifyContent="center"
        my={3}
        onClick={e => onClick("/home")}
      >
        <Assets.Logos.MainLogoWhite />
        {/* <Assets.Icons.Popular mr={2} size={28} /> Dashboard */}
      </Flex>
      <Divider />
      <Flex.Column width={1} p={2}>
        <NavigationLinks links={links} />
      </Flex.Column>
    </PosedSidebar>
  );
};
