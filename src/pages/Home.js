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
import { Utils } from '../components'

export default p => {
  const [state,dispatch] = useWiring()
  return <Utils.RenderObject data={state} />
};
