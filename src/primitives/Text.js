import React from "react";
import styled from "styled-components";
import {
  color,
  fontSize,
  fontWeight,
  lineHeight,
  space,
  textAlign,
  letterSpacing,
  fontFamily,
  style
} from "styled-system";

import theme from "../styles/theme";
import Box from "./Box";
import Flex from "./Flex";

const Text = styled(Box)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: ${p => (p.wrap ? "wrap" : "nowrap")};
  color: white;
  letter-spacing: ${theme.letterSpacings.slight};
  // text-shadow: ${props => (props.color ? "0 0 0.05em" : "none")};
  // vertical-align: middle;
  // line-height: normal;
  // text-align: center;
	${color}
	${fontSize}
	${fontWeight}
	${lineHeight}
	${space}
	${textAlign}
  ${letterSpacing}
  ${fontFamily}
`;

Text.displayName = "Text";

Text.defaultProps = {
  fontSize: [1, 2]
};

Text.Heading = ({ children, bold, ...props }) => {
  return (
    <Text
      fontSize={[6, 7, 9]}
      fontWeight="bold"
      letterSpacing="slight"
      fontFamily={bold ? "TTMussels-Bold" : "TTMussels"}
      {...props}
    >
      {children}
    </Text>
  );
};

Text.Number = ({ bold, money, value, ...props }) => {
  value = money
    ? value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      })
    : value.toLocaleString(undefined, {
        maximumFractionDigits: 0
      });

  return <Text {...props}>{value}</Text>;
};

import CountUp from "react-countup";
Text.StatText = ({ label = "", value = 0, ...p }) => {
  return (
    <Flex.Row {...p}>
      <Text>
        {label.toUpperCase()}: 
      </Text>
      <Box mx={1} />
      <Text color={value > 0 ? "lime" : "red"}>
        <CountUp separator="," end={value} />
      </Text>
    </Flex.Row>
  );
};

const textDecoration = style({
  prop: "textDecoration",
  cssProperty: "textDecoration"
});

Text.Link = styled(Text)`
  // color: 
  transition: all 0.1s ease-in-out;
  text-decoration: none;
  // text-transform: uppercase;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  border-radius: ${theme.radii.normal};
  letter-spacing: ${theme.letterSpacings.slight};
  opacity: ${p => (p.disabled ? 0.5 : 1)}

  &:hover,
  &:focus {
    filter: brightness(1.2);
  };

  :active {
    transform: scale(0.98);
    box-shadow: none;
    opacity: ${0.5};
    color: ${theme.colors.primary}
  };
`;

Text.Link.defaultProps = {
  color: "lightGray",
  fontSize: 1,
  opacity: 1
};

export default Text;
