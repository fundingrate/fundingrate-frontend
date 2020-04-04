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
function reduceDataset(dataset = [], format = "l") {
  let data = dataset.reduce((memo, t) => {
    if (!t) return memo;
    if (!t.done) return memo;
    const date = moment(t.created).format(format);

    //console.log(t)

    if (!memo[date]) {
      memo[date] = {
        count: 0,
        date,
        profit: t.profit,
        realized: t.profit - t.fee,
        //updated: t.updated,
        //created: t.created
      };
    } else {
      memo[date].count += 1;
      memo[date].updated = t.updated;
      memo[date].profit += t.profit;
      memo[date].realized += t.profit - t.fee;
    }

    return memo;
  }, {});

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

import { createChart, LineStyle } from 'lightweight-charts';

const RenderLineGraph = ({ data = [], props = ["Profit"] }) => {
  const ref = useRef(null);

  const [chart, setChart] = useState(null)
  const [state, setState] = useState({
    width: 0,
    height: 0,
    autoScale: true,
  });
  const updateSize = p => {
    setState({
      ...state,
      width: ref.current.parentElement.offsetWidth,
      height: ref.current.parentElement.offsetHeight
    });
    console.log("RenderLineGraph.updateSize", state, ref);
  };

  useEffect(() => {
    const { width, height } = state
    if(chart) {
      chart.resize(width, height)
      chart.timeScale().fitContent()
    }
  }, [state])

  useEffect(() => {
    const l = window.addEventListener("resize", updateSize);

    // hacky fix to ensure the node is in the dom tree.
    if (!ref.current) return;
    if (!ref.current.parentElement) return;

    // setup lightweight chart
    if(!chart) initChart()
    updateSize()

    // destory listener when graph is hidden.
    return () => window.removeEventListener("resize", l);
  }, [ref.current]);

  const initChart = () => {
    const chart = createChart(ref.current, {
      ...state,
      layout: {
        textColor: '#d1d4dc',
        backgroundColor: '#171C20'
      },
      priceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25
        }
      },
      crosshair: {
        vertLine: {
          width:  5,
          color: 'rgba(224,227,235,0.1)',
          style: 0
        },
        horzLine: {
          visible: false,
          //labelVisible: false
        }
      },
      grid: {
        vertLines: {
          color: 'rgba(42,46,57,0)'
        },
        horzLines: {
          color: 'rgba(42,46,57,0)'
        }
      }
      //timescale: { visable: true }
    });

    const lineSeries = chart.addAreaSeries({
      title: 'Realized',
      //topColor: 'rgba(33, 150, 243, 0.56)',
      //bottomColor: 'rgba(33, 150, 243, 0.04)',
      //lineColor: 'rgba(33, 150, 243, 1)',
      color: 'rgba(33, 150, 243, 1)',
      lineWidth: 2,
    });

    const areaSeries = chart.addAreaSeries({
      title: 'Profit',
      topColor:'rgba(38,198,218,0.56)',
      bottomColor: 'rgba(38,198,218,0.04)',
      lineColor: 'rgba(38,198,218,1)',
      lineWidth: 2,
      crossHairMarkerVisable: false
    });

    areaSeries.setData([
      ...data.map(x => { return { time: x.date, value: x.profit } })
      //{ time: '2019-04-12', value: 96.63 },
    ]);
    
    lineSeries.setData([
      ...data.map(x => { return { time: x.date, value: x.realized } })
    ])
    
    //const avg = data.reduce((memo, v) => memo+=v, 0) / data.length
    areaSeries.createPriceLine({ price: 0, lineStyle: LineStyle.Dashed, color: 'red' })
    chart.timeScale().fitContent()
    setChart(chart)
  }

  return (
    <div ref={ref}/>
  );
};


const OLD_CHART = p => {
      return <LineChart {...state} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis name="Date" dataKey="date" />
        <YAxis />
        <Tooltip payload={state} />
        <ReferenceLine y={0} stroke="red" strokeDasharray="3 3" />
        <Legend />
        {props.map(p => {
          return (
            <Line
              key={"line_" + p}
              name="Profit"
              dataKey="profit"
              fill="#82ca9d"
            />
          );
        })}
      </LineChart>
}

const LineGraph = ({ listTrades = async x => x }) => {
  const [isVisable, setIsVisable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);

  const PopulateState = () => {
    // if (state.length > 0) return
    setLoading(true);
    listTrades()
      .then(e => {
        console.log('GRAPH_DATA', e)
        return e
      })
      .then(reduceDataset)
      .then(setState)
      .then(e => setLoading(false))
      .catch(console.log)
  };

  //useEffect(PopulateState, []);

  //return loading ? (
  //  <Utils.LoadingPage />
  //) : (
  //  <Box height="300px" width={1}>
  //    <RenderLineGraph data={state} />
  //  </Box>
  //);

  return <VizSensor
    scrollCheck
    partialVisibility
    onChange={vis => {
      if(vis) PopulateState()
      setIsVisable(vis)
    }}
  >
    {props => {
      return <Box height="300px" width={1}>
        { loading ? <Utils.LoadingPage /> : <RenderLineGraph data={state} /> }
      </Box>
    }}
  </VizSensor>


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
