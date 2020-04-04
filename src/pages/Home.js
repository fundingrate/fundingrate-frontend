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
import { Flex, Box, Card, Text, Divider, Button, Well, Banner } from "../primitives";
import { useWiring, store } from "../libs/wiring";
import { Utils, Banners } from "../components";

export default p => {
  //const [state, dispatch] = useWiring(["serverTime", "myAlerts"]);


  return (
    <Flex.Column width={1}>
      <Banners.Welcome/>
      
      <Box>
        <Flex.Row justifyContent="space-between" m={'8%'} flexWrap={['wrap', 'nowrap']}>
        <Utils.RenderObject.Prop as={Card} width={[1,1,1, 'auto']} fontSize={[2,4]} label="Alerts Processed:" value={123456789} type="number" />
        <Utils.RenderObject.Prop as={Card} width={[1,1,1, 'auto']} fontSize={[2,4]} label="Trades Executed:" value={123456789} type="number" />
        <Utils.RenderObject.Prop as={Card} width={[1,1,1, 'auto']} fontSize={[2,4]} label="Realized Profit:" value={123456789} type="money" color={'lime'} />
        <Utils.RenderObject.Prop as={Card} width={[1,1,1, 'auto']} fontSize={[2,4]} label="Public Providers:" value={332244} type="number" />
      </Flex.Row>
    

      <Box 
        m={'12%'}
      >
        <Text.Heading color="primary" fontSize={[6,8]}>Automated Trading</Text.Heading>
        <Text color="subtext" wrap fontSize={[3,5]}>Automate trading at FTX, BitMEX, Deribit, Bybit, Bitfinex & Coinbase Pro from your alerts.</Text>
        <Divider my={2}/>

        <Flex.Row flexWrap="wrap" my='5%'>
          <Box width={[1,1,1, 1/2]}>
            <Box p={[3, 4]}>
              <Text.Heading fontSize={[3,4]}>Historical Timeseries Data</Text.Heading>
              <Divider mb={2} width={[1, '50%']}/>
              <Text p={2} wrap color="subtext">
                Ever wonder how your bot is performing now compared to 3 months ago?
                Use the provider dashboard to view a timeseries graph showing a breakdown of trade profitability over time.
              </Text>
            </Box>
            <Box p={[3, 4]}>
              <Text.Heading fontSize={[3,4]}>Testnet & Paper Trading</Text.Heading>
              <Divider mb={2} width={[1, '50%']}/>
              <Text p={2} wrap color="subtext">
                Want to test your strategies on live market conditions? Don't want the risk of losing real money? 
                Use our free paper trading functionality to monitor your alerts without risk.
              </Text>
            </Box>
            <Box p={[3, 4]}>
              <Text.Heading fontSize={[3,4]}>Always On, Dedicated Bot</Text.Heading>
              <Divider mb={2} width={[1, '50%']}/>
              <Text p={2} wrap color="subtext">
                For performance and security reasons, the bot executes your orders on a dedicated and isolated instance. 
                No chome addon to install, no reason to keep your VPS, focus on the strategies let us manage the infrastructure.
              </Text>
            </Box>
          </Box>
          <Banner mx={4} height="480px" src="https://cdn.chips.gg/images/ml_chart01.png" opacity={0.5} width={[1,1,1,1/4]} borderRadius="rounded"/>
        </Flex.Row>
      </Box>
      </Box>
    </Flex.Column>
  );
};

