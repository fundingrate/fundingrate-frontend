// import React from "react";
// import Utils from "../components/Utils";
// import { Flex, Box, Text, Well, Divider } from "../primitives";

// export default p => {
//   return (
//     <Flex.Column p={4}>
//       <Flex.Row px={4} width={1}>
//         <Text.Heading>Developer API</Text.Heading>
//       </Flex.Row>
//       <Divider m={2} bg="card" />
//       <Utils.MarkdownLink
//         link="https://gist.githubusercontent.com/tacyarg/9d9de95d1eb84dd9b2d9a91938fed625/raw/5e168a52180b495ec7ef0327a20bbee3dc0dbf72/frDocs.md"
//       />
//     </Flex.Column>
//   );
// };

import React from "react";
import { Flex, Box, Text, Divider } from "../primitives";
import { useWiring, store } from "../libs/wiring";
import { Utils } from "../components";

export default p => {
  const [state, dispatch] = useWiring(["serverTime", "myAlerts"]);

  return (
    <Flex.Column width={[1, 2/3]} p={4}>
      <Flex.Row px={4} >
        <Text.Heading>Fundingrate.IO</Text.Heading>
      </Flex.Row>
      <Divider m={2} bg="card" />
      <Utils.RenderObject heading="Server State" data={state} />
    </Flex.Column>
  );
};
