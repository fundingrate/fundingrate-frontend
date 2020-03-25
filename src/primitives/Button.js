import React from 'react'
import styled from 'styled-components'
import {
  color,
  fontSize,
  space,
  width,
  themeGet,
  textAlign,
} from 'styled-system'

import theme from '../styles/theme'
import { Box, Flex } from '.'

const type = props => {
  switch (props.type) {
    case 'primary':
      return `
        box-shadow: 0 2px 0px rgba(0, 0, 0, .5);
        color: ${theme.colorStyles.textOnPrimary.color};
        border: #ff7e24 ${theme.borders.normal};
        // background-color: ${theme.colorStyles.textOnPrimary.bgColor};
        background-image: linear-gradient(290deg, #ff7e24, #FB6C2B);
        // background-color: ${theme.colors.primary};

        &:hover,
        &:focus {
          filter: brightness(1.2);
        };
      `
    case 'warning':
      return `
          box-shadow: 0 2px 0px rgba(0, 0, 0, .5);
          color: ${theme.colorStyles.textOnPrimary.color};
          border: #f03c3c ${theme.borders.normal};
          background-color: ${theme.colorStyles.textOnPrimary.bgColor};
          background-image: linear-gradient(290deg, #f03c3c, #df1111);

          &:hover,
          &:focus {
              filter: brightness(1.2);
          };
        `
    case 'success':
      return `
        box-shadow: 0 2px 0px rgba(0, 0, 0, .5);
        color: ${theme.colorStyles.textOnPrimary.color};
        border: #42b142 ${theme.borders.normal};
        background-color: ${theme.colorStyles.textOnPrimary.bgColor};
        background-image: linear-gradient(290deg, #3DDD37, #42b142);

        &:hover,
          &:focus {
              filter: brightness(1.2);
          };
      `
    case 'secondary':
      return `
          box-shadow: 0 2px 0px rgba(0, 0, 0, .5);
          color: ${theme.colorStyles.textOnPrimary.color};
          background-color: ${theme.colors.secondary};

          &:hover,
          &:focus {
              filter: brightness(1.2);
          };
        `
    case 'simple':
      return `
        background-color: rgba(0,0,0,0);
        color: ${props.color || theme.colors.lightGreyBlue};

        &:hover,
        &:focus {
          filter: brightness(1.2);
          color: ${props.disabled ? null : theme.colors.primary};
        };   
      `
    case 'outline':
      return `
        background-color: rgba(0,0,0,0);
        color: ${theme.colors.white};
        border: 1px solid ${props.color || theme.colors.primary};
        box-shadow: 0 2px 0px rgba(0, 0, 0, .5);

        &:hover,
        &:focus {
          filter: brightness(1.2);
        };
      `
    case 'card':
      return `
        background-color: ${theme.colors.card};
        color: ${theme.colors.lightGray};
        box-shadow: 0 2px 0px rgba(0, 0, 0, .5);

        &:hover,
        &:focus {
          filter: brightness(1.2);
        };
    `
    default:
      return `
          background-color: rgba(0,0,0,0);
          color: ${theme.colors.gray};
          border: ${theme.colors.lightGray} ${theme.borders.normal};
          box-shadow: 0 2px 0px rgba(0, 0, 0, .5);

          &:hover,
          &:focus {
            filter: brightness(1.2);
            color: ${props.disabled ? null : theme.colors.primary};
          };       
      `
  }
}

const disabled = () => {
  return `
    pointer: not-allowed;
  `
}

const Button = styled(Box)`
  // text-transform: uppercase;
  // cursor: pointer;
  white-space: ${p => (p.wrap ? "wrap" : "nowrap")};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  border-radius: ${props => props.borderRadius || theme.radii.normal};
  border: none;
  outline: none;   
  letter-spacing: ${theme.letterSpacings.slight};
  text-align: center;
  transition: all 0.1s ease-in-out;
  min-width: min-content;


  :active {
    transform: scale(0.98);
    box-shadow: none;
    opacity: ${0.5};
  };
  
  opacity: ${p => (p.disabled ? 0.5 : 1)}

  justify-content: center;
  align-items: center;

  // font-weight: bold;

	${color}
	${fontSize}
	${space}
	${width}
  ${type}
  ${textAlign}
`

Button.defaultProps = {
  py: 2,
  px: 3,
  fontSize: [1,2]
}

Button.displayName = 'Button'

export default Button
