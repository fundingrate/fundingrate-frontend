// import React from 'react'
// import Utils from '../components/Utils'

// export default p => {
//   return (
//     <Utils.MarkdownLink link="https://gist.githubusercontent.com/tacyarg/c7f2cc5574218a008bd59e9a088c1a51/raw/fundingrateio_howto.md" />
//   )
// }

import React from "react";
import { Flex, Box, Text } from "../primitives";
import { useWiring, store } from "../libs/wiring";
import { Utils } from "../components";

export default p => {
  const [state, dispatch] = useWiring(["serverTime", "myAlerts", 'supportedTickers']);

  return (
    <Flex p={4}>
      <Flex.Column>
        <Utils.RenderObject heading="Server State" data={state} />
        <Utils.RenderObject heading="Supported Tickers" data={state.supportedTickers} />
      </Flex.Column>
      <Box mx={4} />
      <Flex.Column>
        {state.myAlerts && Object.values(state.myAlerts).map(a => {
          return <Utils.RenderObject heading="Alert" data={a} key={a.id} />;
        })}
      </Flex.Column>
    </Flex>
  );
};
