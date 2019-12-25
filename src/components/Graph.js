import React, { useEffect, useState } from "react";
import { Card, Button, Flex, Box, Text, Input, Divider } from "../primitives";
import { Utils, Modal } from "../components";
import {
  ReferenceLine,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar
} from "recharts";
import moment from "moment";
import VizSensor from "react-visibility-sensor";
import CountUp from "react-countup";

function reduceDataset(dataset = []) {
  let data = dataset.reduce((memo, t) => {
    if (!t.done || !t.updated || !t.created) return memo;
    const date = moment(t.updated).format("l");

    if (!memo[date]) {
      memo[date] = {
        count: 0,
        date,
        profit: t.profit
        // updated: t.created
      };
    } else {
      memo[date].count += 1;
      memo[date].updated = t.updated;
      memo[date].profit += t.profit;
    }

    return memo;
  }, {});

  //   return data;

  return Object.values(data).sort((x, y) => {
    return x.updated > y.updated ? 1 : -1;
  });
}

const RenderLineGraph = ({ state, props = ["Profit"] }) => {
  return (
    <ResponsiveContainer width="95%" aspect={2}>
      <LineChart data={state}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis name="Date" dataKey="date" />
        <YAxis />
        <Tooltip payload={state} />
        <ReferenceLine y={0} stroke="red" strokeDasharray="3 3" />
        <Legend />
        {props.map(p => {
          return <Line name="Profit" dataKey="profit" fill="#82ca9d" />;
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

const LineGraph = ({ listMyProviderTrades = async x => x }) => {
  const [isVisable, setIsVisable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);

  const PopulateState = () => {
    // if (state.length > 0) return
    setLoading(true);
    listMyProviderTrades()
      .then(reduceDataset)
      .then(setState)
      .then(e => setLoading(false));
  };

  // useEffect(PopulateState, [])

  return (
    <VizSensor
      scrollCheck
      partialVisibility
      onChange={vis => {
        console.log("can see", vis);
        if (vis) PopulateState();
        setIsVisable(vis);
      }}
    >
      {props => {
        if (loading) return <Utils.LoadingPage />;
        return isVisable && state.length > 1 ? (
          <Box height="100%">
            <Text m={2} fontSize={3}>
              Recent Trade History
            </Text>
            <Divider bg="primary" />
            <RenderLineGraph state={state} />

          </Box>
        ) : (
          <Flex
            height="100%"
            width={1}
            justifyContent="center"
            alignItems="center"
          >
            <Text>Nothing to display.</Text>
          </Flex>
        );
      }}
    </VizSensor>
  );
};

export default { LineGraph };
