import React from "react";
import { Box, Text, Flex, Button } from "../primitives";
import Assets from "./Assets";

export default p => {
  const navigateTo = url => {
    window.open(url, "_blank");
  };

  return (
    <Flex
      width={1}
      bg="foregroundBacking"
      p={2}
      boxShadow="0px -2px 2px -2px rgba(0, 0, 0, 0.2)"
      borderTop="1px solid rgba(0, 0, 0, 0.2)"
      zIndex={9001}
      alignItems="center"
      justifyContent={["center", "start"]}
      flexWrap="wrap"
    >
      <Flex.Row width={[1, "auto"]}>
        <Button
          width={[1, "auto"]}
          as={Flex}
          alignItems="center"
          type="simple"
          onClick={e => navigateTo("https://twitter.com/fundingrateio")}
          fontSize={1}
        >
          <Assets.Social.Twitter mx={1} /> Twitter
        </Button>
        <Button
          width={[1, "auto"]}
          as={Flex}
          alignItems="center"
          type="simple"
          onClick={e => navigateTo("https://t.co/tLGaSbxy4b?amp=1")}
          fontSize={1}

        >
          <Assets.Social.Discord mx={1} /> Discord
        </Button>
        <Button
          width={[1, "auto"]}
          as={Flex}
          alignItems="center"
          type="simple"
          onClick={e => navigateTo("https://t.me/joinchat/CMPVCleYZAgtL0RWrZsqNg")}
          fontSize={1}

        >
          <Assets.Social.Telegram mx={1} bg="blue" /> Telegram
        </Button>
        {/* <Button
          width={[1, "auto"]}
          as={Flex}
          alignItems="center"
          type="simple"
          onClick={e => navigateTo("https://t.me/joinchat/CMPVCleYZAgtL0RWrZsqNg")}
        >
          <Assets.Icons.Help mx={1} bg="consumer" />
        </Button> */}
      </Flex.Row>
      <Box mx="auto" />
      <Text mt={[2, 0]}>© 2019-2020 Fundingrate.io - All Rights Reserved</Text>

      {/* <Button
        width={[1, "auto"]}
        as={Flex}
        alignItems="center"
        type="simple"
        onClick={e => navigateTo("https://chips.gg")}
      >
        <Assets.Logos.Chips />
      </Button> */}
    </Flex>
  );
};
