import React, { useEffect, useState } from "react";
import { Header, Footer, Assets } from "./components";
import { Button, Flex, Text, Sidebar, Page, Divider } from "./primitives";
import Pages from "./pages";

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

const SideNav = ({ user, links, onClick }) => {
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
      {links.map(({ label, href }) => {
        // console.log(user)
        switch (href) {
          case "/authenticate": {
            if (user) return null;
            return (
              <PosedSidebarButton href={href} label={label} onClick={onClick} />
            );
          }
          case "/profile": {
            if (!user) return null;
            return (
              <PosedSidebarButton href={href} label={label} onClick={onClick} />
            );
          }
          case "/providers": {
            if (!user) return null;
            return (
              <PosedSidebarButton href={href} label={label} onClick={onClick} />
            );
          }
          default:
            return (
              <PosedSidebarButton href={href} label={label} onClick={onClick} />
            );
        }
      })}
    </PosedSidebar>
  );
};

const Layout = ({ user, children, onClick }) => {
  const links = Object.keys(Pages).reduce((memo, k) => {
    if (k === "NotFound") return memo;
    memo.push({ label: k, href: `/${k.toLowerCase()}` });
    return memo;
  }, []);

  return (
    <Flex
      width={1}
      height={"100%"}
      bg="darkBacking"
      // justifyContent="center"
      alignItems="center"
    >
      <SideNav user={user} links={links} onClick={onClick} />
      <Flex
        flexDirection="column"
        width={1}
        height={"100%"}
        // bg="backing"
        justifyContent="center"
        // alignItems="center"
      >
        {/* <Header>
          {user ? (
            <Text fontSize={[2, 4]}>{user.username}</Text>
          ) : (
            <Button type="primary" onClick={e => onClick('/authenticate')}>
              Login / Register
            </Button>
          )}
        </Header> */}
        <Page flex={1}>{children}</Page>
        <Footer />
      </Flex>
    </Flex>
  );
};

export default Layout;
