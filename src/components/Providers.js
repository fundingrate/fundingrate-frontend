import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
} from "../primitives";

export const Stats = ({ stats }) => {
  const valueProps = [
    "longs",
    "shorts",
    "totalTrades",
    "longProfit",
    "shortProfit",
    "profit",
    "realizedProfit"
  ];

  return (
    <Flex.Column
      mt={3}
      mb={0}
      style={{
        overflow: "hidden",
        overflowX: "auto"
      }}
      flexWrap="wrap"
    >
      {valueProps
        .map(v => {
          return {
            label: v,
            value: stats[v]
          };
        })
        .map((s, idx) => (
          <Text.StatText key={s.label} {...s} m={[1, 2]} />
        ))}
    </Flex.Column>
  );
};

