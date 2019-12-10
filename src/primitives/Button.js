import React from 'react'
import styled from 'styled-components'
import { color, textAlign, fontSize, space, width, themeGet } from 'styled-system'

import theme from '../styles/theme'

import Text from './Text'
import Flex from './Flex'

// console.log(theme);

const type = props => {
  switch (props.type) {
    case 'primary':
      return `
          box-shadow: 0 2px 0px rgba(0, 0, 0, .5);
          background-color: rgba(0,0,0,0);
          color: ${theme.colorStyles.textOnPrimary.color};
          border: ${theme.colors.primary} ${theme.borders.normal};
          background-image: linear-gradient(290deg, ${theme.colors.lightPrimary}, ${theme.colors.primary});

          :active {
            transform: scale(0.98);
            box-shadow: none;
          };

          &:hover,
          &:focus {
              opacity: 0.8
          };
        `
    case 'attention':
      return `
        box-shadow: 0 2px 0px rgba(0, 0, 0, .5);
        background-color: rgba(0,0,0,0);
        color: ${theme.colors.darkBacking};
        border: ${theme.colors.card} ${theme.borders.normal};
        background-image: linear-gradient(290deg, ${theme.colors.yellow}, ${theme.colors.restricted});
        
        :active {
          transform: scale(0.98);
          color: ${theme.colors.black};
          box-shadow: none;
        };

        &:hover,
        &:focus {
          font-weight: bold;
          opacity: 0.8
        };

        
      `
    case 'magic':
      return `
        background-color: rgba(0,0,0,0);
        color: ${theme.colors.offwhite};
        border: ${theme.colors.offwhiteBorder} ${theme.borders.normal};
        background-image: linear-gradient(290deg, ${theme.colors.covert}, ${theme.colors.restricted});
        &:hover,
        &:focus {
          opacity: 0.8
        };
      `
    case 'warning':
      return `
        box-shadow: 0 2px 0px rgba(0, 0, 0, .5);
        color: ${theme.colorStyles.textOnPrimary.color};
        border: #f03c3c ${theme.borders.normal};
        // background-color: ${theme.colorStyles.textOnPrimary.bgColor};
        background-image: linear-gradient(290deg, #f03c3c, #df1111);
        &:hover,
        &:focus {
            opacity: 0.8
        };
      `
    case 'simple':
      return `
        background-color: rgba(0,0,0,0);
        color: ${theme.colors.lightGray};
        &:hover,
        &:focus {
          box-shadow: 0px 2px 4px -4px ${theme.colors.primary};
          color: ${props.disabled ? null : theme.colors.primary}
        };
    `
    case 'simple-shaded':
      return `
        background-color: rgba(0,0,0,0.5);
        color: ${theme.colors.darkGray};
        &:hover,
        &:focus {
          box-shadow: 0px 2px 4px -4px ${theme.colors.primary};
          color: ${props.disabled ? null : theme.colors.primary}
        };
    `
    default:
      return `
          background-color: rgba(0,0,0,0);
          color: ${theme.colors.gray};
          border: ${theme.colors.lightGray} ${theme.borders.normal};
          &:hover,
          &:focus {
            background-color: ${props.disabled ? null : theme.colors.lightGray}
          };
      `
    // return `
    //   &:hover,
    //   &:focus {
    //       background-color: ${
    //         props.disabled ? null : theme.colors.gray
    //       }
    //   }
    // `;
  }
}

const disabled = () => {
  return `
    pointer: not-allowed;
  `
}

const Button = styled(Text)`
  text-transform: uppercase;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  border-radius: ${theme.radii.normal};
  border: none;
  outline: none;   
  letter-spacing: ${theme.letterSpacings.slight};
  text-align:center;
  transition: all 0.1s ease-in-out;
  min-width: min-content;

  :active {
    box-shadow: none;
    // opacity: ${0.85};
  };
  
  opacity: ${p => (p.disabled ? 0.5 : 1)}

  justify-content: center;
  align-items: center;

	${color}
	${fontSize}
	${space}
	${width}
  ${type}
  ${textAlign}
`

// const Button = props => (
//   <StyledButton {...props}>
//     <Text>{props.children}</Text>
//   </StyledButton>
// );

Button.defaultProps = {
  py: 2,
  px: 3,
  fontSize: 3
}

Button.displayName = 'Button'

export default Button
