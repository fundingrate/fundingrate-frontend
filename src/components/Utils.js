import React, { useState, useEffect, useLayoutEffect } from "react";

import {
  Card,
  Button,
  Flex,
  Box,
  Text,
  Image,
  Sidebar,
  Spinner,
  Divider,
  Well
} from "../primitives";
import Editor from "./Editor";
import Assets from "./Assets";

import axios from "axios";
import ReactMarkdown from "react-markdown";
import assert from "assert";
import moment from "moment";
import copy from "clipboard-copy";

const RenderError = ({
  color,
  message = "Nothing happen yet, check back later."
}) => {
  return (
    <Card flexDirection="column" m={2}>
      <Text color={color}>{message}</Text>
    </Card>
  );
};

// render shallow object.
const RenderObject = ({ heading, data, children, ...p }) => {
  const valid = !data || typeof data !== "object" ? false : true;

  // console.log('RenderObject', data)
  return (
    <Flex.Column {...p}>
      {heading && (
        <Flex my={2} flexDirection="column">
          <Text.Heading fontSize={[2, 4]}>{heading}</Text.Heading>
          <Box my={1} />
          <Divider bg="primary" />
        </Flex>
      )}
      {valid ? (
        <>
          {Object.keys(data).map(k => {
            return (
              <RenderObject.Prop
                key={k}
                label={`${k.toUpperCase()}:`}
                value={data[k]}
                type={k === "created" || k === "updated" ? "time" : null}
              />
            );
          })}
          {children && <Box my={2} width={1} />}
          {children}
          {/* <Divider  my={1} bg="primary"/> */}
        </>
      ) : (
        <Text p={2}>Nothing to show yet, check back later.</Text>
      )}
    </Flex.Column>
  );
};

const renderProp = (value, type) => {
  // console.log('render', typeof value, value)
  switch (type || typeof value) {
    case "function":
      return "[function]";
    case "object":
      return "[object]";
    case "time":
      return moment(value).calendar();
    case "boolean":
      return Boolean(value) ? "yes" : "no";
    case "number":
      return value.toLocaleString(undefined, {
        maximumFractionDigits: 2
      });
    case "money":
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });
    default:
      return value;
  }
};

RenderObject.Prop = React.memo(
  ({ label, value, type, color = "subtext", ...p }) => {
    return (
      <Flex
        flexWrap="wrap"
        flexDirection={["column", "row"]}
        //alignItems={['center', 'end']}
        alignItems="center"
        m={1}
        {...p}
      >
        <Text bold fontSize={p.fontSize}>{label}</Text>
        <Box mx={1} />
        <Text.Link fontSize={p.fontSize} onClick={e => copy(value)} color={color}>
          {renderProp(value, type)}
        </Text.Link>
      </Flex>
    );
  }
);

const LoadingPage = p => {
  return (
    <Loading
      as={Flex}
      p={4}
      width={1}
      height="100%"
      alignItems="center"
      justifyContent="center"
      {...p}
    />
  );
};

const Loading = ({ message = "Loading...", ...p }) => {
  return (
    <Flex.Row {...p}>
      <Spinner>/</Spinner>
      <Box mx={2} />
      {message}
    </Flex.Row>
  );
};

import Highlight from "react-highlight.js";

const MarkdownLink = ({ link }) => {
  const [state, setState] = useState(null);

  const getMarkdown = async link => {
    const { data } = await axios(link).catch(console.error);
    return setState(data);
  };

  useLayoutEffect(() => {
    getMarkdown(link);
  }, []);

  return state ? (
    <Box p={4} width={1}>
      <ReactMarkdown
        source={state}
        renderers={{
        image: p => <Image {...p} height={300} width={1} />,
          code: ({ value, ...p }) => {
            return <Well {...p} p={4}>{value}</Well>
            // return <Editor {...p} height='120px' data={value} readOnly={true} />
            // return <Highlight {...p}>{value}</Highlight>;
          }
        }}
      />
    </Box>
  ) : (
    <LoadingPage />
  );
};

const generateCSV = data => {
  const { parse } = require("json2csv");
  const fields = data[0]
    ? Object.keys(data[0])
    : ["id", "price", "closingPrice", "profit", "change"];
  return parse(data, {
    fields,
    flatten: true
  });
};

const downloadFile = async (filename, data) => {
  assert(filename, "filename required");
  assert(data, "data required");

  let link = document.createElement("a");
  link.id = "download-csv";
  link.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(data)
  );
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  document.querySelector("#download-csv").click();
  // var encodedUri = encodeURI(csv)
  // console.log('URI:', encodedUri)
  // return window.open(encodedUri)
};

const DownloadCSV = ({ filename = "list.csv", data = [] }) => (
  <Button
    type="simple"
    onClick={e => {
      const csv = generateCSV(data);
      downloadFile(filename, csv);
    }}
  >
    <Flex alignItems="center" justifyContent="center">
      <Assets.Icons.Trusted />
      <Box mx={1} />
      Download .csv
    </Flex>
  </Button>
);

const DownloadJson = ({ filename = "row.json", data = {} }) => {
  return (
    <Button
      type="simple"
      onClick={e => {
        data = JSON.stringify(data, null, 2);
        downloadFile(filename, data);
      }}
    >
      <Flex alignItems="center" justifyContent="center">
        <Assets.Icons.Trusted />
        <Box mx={1} />
        Download .json
      </Flex>
    </Button>
  );
};

function DayOfWeek(index = 0) {
  var d = new Date();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  return weekday[index];
}

function GetDateFormatted(ts) {
  const date = new Date(ts);
  const d = date.getDay();
  const m = date.getMonth();
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

const searchProps = (o, st) => {
  return Object.values(o).find(p => {
    if (!p) return false;
    if (typeof p === "object") return searchProps(p);
    return p.toString().includes(st);
  });
};

export default {
  useDebounce,
  RenderError,
  RenderObject,
  renderProp,
  LoadingPage,
  MarkdownLink,
  RenderMarkdown({ as, ...p }) {
    return (
      <Box as={as} p={2}>
        <ReactMarkdown {...p} />
      </Box>
    );
  },
  Loading,
  DownloadCSV,
  DownloadJson,
  DayOfWeek,
  GetDateFormatted,
  clickProp({ value, type, color, ...p }) {
    return (
      <Text.Link onClick={e => copy(value)} color={color} {...p}>
        {renderProp(value, type)}
      </Text.Link>
    );
  },
  searchProps
};
