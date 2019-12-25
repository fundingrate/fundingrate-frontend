import React from "react";
import { Box, Text, Flex, Button } from "../primitives";
import Assets from "./Assets";

export default p => {
  const navigateTo = url => {
    window.open(url, "_blank");
  };

  return (
    <Flex
      bg="foregroundBacking"
      p={3}
      boxShadow="0px -2px 2px -2px rgba(0, 0, 0, 0.2)"
      borderTop="1px solid rgba(0, 0, 0, 0.2)"
      zIndex={9001}
      alignItems="center"
    >
      <Button
        as={Flex}
        alignItems="center"
        type="simple"
        onClick={e => navigateTo("https://twitter.com/fundingrateio")}
      >
        <Assets.Social.Twitter mx={2} /> Twitter
      </Button>
      <Button
        as={Flex}
        alignItems="center"
        type="simple"
        onClick={e => navigateTo("https://t.co/tLGaSbxy4b?amp=1")}
      >
        <Assets.Social.Discord mx={2} /> Discord
      </Button>
      <Box mx="auto" />
      <Text.Link as="a" target="_blank" href="https://tacyarg.com/">
        Tacyarg.com
      </Text.Link>
      {/* <Text.Link as="a" target="_blank" href="https://chips.gg/">
    Maintained by: Chips.gg
  </Text.Link> */}
    </Flex>
  );
};
