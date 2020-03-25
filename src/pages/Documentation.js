import React from "react";
import Utils from "../components/Utils";
import { Flex, Box, Text, Well, Divider } from "../primitives";

export default p => {
  return (
    <Flex.Column width={1}>
      <Flex.Row p={4} width={1}>
        <Text.Heading>API Documentation</Text.Heading>
      </Flex.Row>
      <Divider m={2} bg="card" />
      <Utils.MarkdownLink link="https://gist.githubusercontent.com/tacyarg/9d9de95d1eb84dd9b2d9a91938fed625/raw/5e168a52180b495ec7ef0327a20bbee3dc0dbf72/frDocs.md" />
    </Flex.Column>
  );
};

// import React from 'react'
// import { Flex, Box, Text } from '../primitives'
// import { useWiring, store } from '../libs/wiring'
// import { Utils } from '../components'

// export default p => {
//   const [state, dispatch] = useWiring(['serverTime', 'myAlerts'])

//   return (
//     <Flex p={4}>
//       <Flex.Column>
//         <Utils.RenderObject heading="Server State" data={state} />
//         {/* <Utils.RenderObject heading="Supported Tickers" data={state.supportedTickers} /> */}
//       </Flex.Column>
//       <Box mx={4} />
//       <Flex.Column>
//         {state.myAlerts &&
//           Object.values(state.myAlerts).map(a => {
//             return <Utils.RenderObject heading="Alert" data={a} key={a.id} />
//           })}
//       </Flex.Column>
//     </Flex>
//   )
// }
