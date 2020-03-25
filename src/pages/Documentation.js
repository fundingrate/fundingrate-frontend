import React from "react";
import Utils from "../components/Utils";
import { Flex, Box, Text, Well, Divider } from "../primitives";

export default p => {
  return (
    <Flex.Column width={1} p={[0, 4]}>
      <Flex.Row p={4} width={1}>
        <Text.Heading>API Documentation</Text.Heading>
      </Flex.Row>
      <Divider m={2} bg="card" />
      <Utils.MarkdownLink link="https://gist.githubusercontent.com/tacyarg/9d9de95d1eb84dd9b2d9a91938fed625/raw/5e168a52180b495ec7ef0327a20bbee3dc0dbf72/frDocs.md" />
    </Flex.Column>
  );
};