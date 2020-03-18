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
import { Utils, Modal } from "../components";

export default p => {
  const [state, dispatch] = useWiring(["myProviders"]);

  return (
    <Box p={4} width={1}>
      <Flex.Row>
        <Flex flex={1} />
        <Modal.CreateProvider
          onConfirm={params => state.actions.private("createProvider", params)}
        />
      </Flex.Row>
      <Flex
        // flexDirection="column"
        p={4}
        width={1}
        justifyContent="space-evenly"
        flexWrap="wrap"
      >
        {state.myProviders &&
          Object.values(state.myProviders).map(p => {
            return <Utils.RenderObject heading={p.name} data={p} />;
          })}
      </Flex>
    </Box>
  );
};
