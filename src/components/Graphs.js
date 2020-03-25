import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { Card, Button, Flex, Box, Text, Input, Divider } from "../primitives";
import { Utils, Modal } from ".";
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

//group by day, total trades, total profit
function reduceDataset(dataset = []) {
  let data = dataset.reduce((memo, t) => {
    if (!t.done) return memo;
    const date = moment(t.updated).format("l");

    if (!memo[date]) {
      memo[date] = {
        count: 0,
        date,
        profit: t.profit,
        updated: t.updated
      };
    } else {
      memo[date].count += 1;
      memo[date].updated = t.updated;
      memo[date].profit += t.profit;
    }

    return memo;
  }, {});

  console.log("GRAPH_DATA", data);

  return Object.values(data).sort((x, y) => {
    return x.updated > y.updated ? 1 : -1;
  });
}

// const RenderLineGraph = ({ state, props = ["Profit"] }) => {
//   return (
//     <ResponsiveContainer width="95%" height={"100px"} aspect={4}>
//       <LineChart data={state}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis name="Date" dataKey="date" />
//         <YAxis />
//         <Tooltip payload={state} />
//         <ReferenceLine y={0} stroke="red" strokeDasharray="3 3" />
//         <Legend />
//         {props.map(p => {
//           return <Line name="Profit" dataKey="profit" fill="#82ca9d" />;
//         })}
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

const RenderLineGraph = ({ data = [], props = ["Profit"] }) => {
  const ref = useRef(null);

  const [state, setState] = useState({
    width: 0,
    height: 0
  });

  const updateSize = p => {
    if (!ref.current) return;
    if (!ref.current.parentElement) return;
    setState({
      width: ref.current.parentElement.offsetWidth,
      height: ref.current.parentElement.offsetHeight
    });
  };

  useLayoutEffect(() => {
    const l = window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", l);
  }, [ref.current]);

  return (
    <div ref={ref}>
      <LineChart {...state} data={data}>
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
    </div>
  );
};

const LineGraph = ({ listTrades = async x => x }) => {
  const [isVisable, setIsVisable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);

  const PopulateState = () => {
    // if (state.length > 0) return
    setLoading(true);
    listTrades()
      // .then(reduceDataset)
      .then(setState)
      .then(e => setLoading(false));
  };

  useEffect(PopulateState, []);

  return loading ? (
    <Utils.LoadingPage />
  ) : (
    <Box height="100%" width={1}>
      <RenderLineGraph data={state} />
    </Box>
  );

  // return (
  //   <VizSensor
  //     scrollCheck
  //     partialVisibility
  //     onChange={vis => {
  //       console.log("can see", vis);
  //       if (vis) PopulateState();
  //       setIsVisable(vis);
  //     }}
  //   >
  //     {props => {
  //       if (loading) return <Utils.LoadingPage />;
  //       return isVisable && state.length > 1 ? (
  //         <Box height="100%" width={1}>
  //           <RenderLineGraph data={state} />
  //         </Box>
  //       ) : (
  //         <Flex
  //           height="100%"
  //           width={1}
  //           justifyContent="center"
  //           alignItems="center"
  //         >
  //           <Text>Nothing to display.</Text>
  //         </Flex>
  //       );
  //     }}
  //   </VizSensor>
  // );
};

export default { LineGraph };
