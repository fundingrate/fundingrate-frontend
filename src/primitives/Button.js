import React from "react";
import styled from "styled-components";
import {
  color,
  fontSize,
  space,
  width,
  themeGet,
  textAlign
} from "styled-system";

import theme from "../styles/theme";
import Box from "./Box";

const type = props => {
  switch (props.type) {
    case "primary":
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
      `;
    case "warning":
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
        `;
    case "secondary":
      return `
          box-shadow: 0 2px 0px rgba(0, 0, 0, .5);
          color: ${theme.colorStyles.textOnPrimary.color};
          background-color: ${theme.colors.secondary};

          &:hover,
          &:focus {
              filter: brightness(1.2);
          };
        `;
    case "simple":
      return `
        background-color: rgba(0,0,0,0);
        color: ${props.color || theme.colors.lightGreyBlue};

        &:hover,
        &:focus {
          filter: brightness(1.2);
          color: ${props.disabled ? null : theme.colors.primary};
        };   
      `;
    case "outline":
      return `
        background-color: rgba(0,0,0,0);
        color: ${theme.colors.white};
        border: 1px solid ${props.color || theme.colors.primary};
        box-shadow: 0 2px 0px rgba(0, 0, 0, .5);

        &:hover,
        &:focus {
          filter: brightness(1.2);
        };
      `;
    case "card":
      return `
        background-color: ${theme.colors.card};
        color: ${theme.colors.lightGray};
        box-shadow: 0 2px 0px rgba(0, 0, 0, .5);

        &:hover,
        &:focus {
          filter: brightness(1.2);
        };
    `;
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
      `;
  }
};

const disabled = () => {
  return `
    pointer: not-allowed;
  `;
};

const Button = styled(Box)`
  text-transform: uppercase;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
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

	${color}
	${fontSize}
	${space}
	${width}
  ${type}
  ${textAlign}
`;

// const Button = props => (
//   <StyledButton {...props}>
//     <Text>{props.children}</Text>
//   </StyledButton>
// );

Button.defaultProps = {
  py: 2,
  px: 3
};

Button.displayName = "Button";

export default Button;

// import React from "react";
// import styled from "styled-components";
// import {
//   color,
//   textAlign,
//   fontSize,
//   space,
//   width,
//   themeGet
// } from "styled-system";

// import theme from "../styles/theme";

// import Text from "./Text";
// import Flex from "./Flex";

// // console.log(theme);

// const type = props => {
//   switch (props.type) {
//     case "primary":
//       return `
//           box-shadow: 0 2px 0px rgba(0, 0, 0, .5);
//           background-color: rgba(0,0,0,0);
//           color: ${theme.colorStyles.textOnPrimary.color};
//           border: ${theme.colors.primary} ${theme.borders.normal};
//           background-image: linear-gradient(290deg, ${theme.colors.lightPrimary}, ${theme.colors.primary});

//           :active {
//             transform: scale(0.98);
//             box-shadow: none;
//           };

//           &:hover,
//           &:focus {
//               opacity: 0.8
//           };
//         `;
//     case "attention":
//       return `
//         box-shadow: 0 2px 0px rgba(0, 0, 0, .5);
//         background-color: rgba(0,0,0,0);
//         color: ${theme.colors.darkBacking};
//         border: ${theme.colors.card} ${theme.borders.normal};
//         background-image: linear-gradient(290deg, ${theme.colors.yellow}, ${theme.colors.restricted});

//         :active {
//           transform: scale(0.98);
//           color: ${theme.colors.black};
//           box-shadow: none;
//         };

//         &:hover,
//         &:focus {
//           font-weight: bold;
//           opacity: 0.8
//         };
//       `;
//     case "offwhite":
//       return `
//         box-shadow: 0 2px 0px rgba(0, 0, 0, .5);
//         color: ${theme.colors.backingDark};
//         border: ${theme.colors.offwhiteBorder} ${theme.borders.normal};
//         // background-color: ${theme.colorStyles.textOnPrimary.bgColor};
//         background-image: linear-gradient(290deg, ${theme.colors.offwhiteBorder}, ${theme.colors.offwhite});

//         &:hover,
//         &:focus {
//             opacity: 0.8
//         };
//       `;
//     case "magic":
//       return `
//         background-color: rgba(0,0,0,0);
//         color: ${theme.colors.offwhite};
//         border: ${theme.colors.offwhiteBorder} ${theme.borders.normal};
//         background-image: linear-gradient(290deg, ${theme.colors.covert}, ${theme.colors.restricted});
//         &:hover,
//         &:focus {
//           opacity: 0.8
//         };
//       `;
//     case "warning":
//       return `
//         box-shadow: 0 2px 0px rgba(0, 0, 0, .5);
//         color: ${theme.colorStyles.textOnPrimary.color};
//         border: #f03c3c ${theme.borders.normal};
//         // background-color: ${theme.colorStyles.textOnPrimary.bgColor};
//         background-image: linear-gradient(290deg, #f03c3c, #df1111);
//         &:hover,
//         &:focus {
//             opacity: 0.8
//         };
//       `;
//       case "success":
//         return `
//           box-shadow: 0 2px 0px rgba(0, 0, 0, .5);
//           color: ${theme.colorStyles.textOnPrimary.color};
//           border: #42b142 ${theme.borders.normal};
//           // background-color: ${theme.colorStyles.textOnPrimary.bgColor};
//           background-image: linear-gradient(290deg, #3DDD37, #42b142);
//           &:hover,
//           &:focus {
//               opacity: 0.8
//           };
//         `;
//     case "simple":
//       return `
//         background-color: rgba(0,0,0,0);
//         color: ${theme.colors.lightGray};
//         &:hover,
//         &:focus {
//           box-shadow: 0px 2px 4px -4px ${theme.colors.primary};
//           color: ${props.disabled ? null : theme.colors.primary};
//         };
//     `;
//     case "card":
//       return `
//         background-color: ${theme.colors.card};
//         color: ${theme.colors.lightGray};
//         &:hover,
//         &:focus {
//           box-shadow: 0px 2px 4px -4px ${theme.colors.primary};
//           color: ${props.disabled ? null : theme.colors.primary};
//         };
//     `;
//     case "simple-icon":
//       return `
//         background-color: rgba(0,0,0,0);
//         color: ${theme.colors.lightGray};

//         :active {
//           transform: scale(0.98);
//           color: ${theme.colors.primaryDark};
//           box-shadow: none;
//         };

//         &:hover,
//         &:focus {
//           box-shadow: 0px 2px 4px -4px ${theme.colors.primary};
//           color: ${props.disabled ? null : theme.colors.primary};
//           background-color: ${props.disabled ? null : theme.colors.primary};
//         };
//     `;
//     case "simple-shaded":
//       return `
//         background-color: rgba(0,0,0,0.5);
//         color: ${theme.colors.darkGray};
//         &:hover,
//         &:focus {
//           box-shadow: 0px 2px 4px -4px ${theme.colors.primary};
//           color: ${props.disabled ? null : theme.colors.primary}
//         };
//     `;
//     default:
//       return `
//           background-color: rgba(0,0,0,0);
//           color: ${theme.colors.gray};
//           border: ${theme.colors.lightGray} ${theme.borders.normal};
//           &:hover,
//           &:focus {
//             background-color: ${props.disabled ? null : theme.colors.lightGray}
//           };
//       `;
//     // return `
//     //   &:hover,
//     //   &:focus {
//     //       background-color: ${
//     //         props.disabled ? null : theme.colors.gray
//     //       }
//     //   }
//     // `;
//   }
// };

// const disabled = () => {
//   return `
//     pointer: not-allowed;
//   `;
// };

// const Button = styled(Text)`
//   text-transform: uppercase;
//   cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
//   border-radius: ${theme.radii.normal};
//   border: none;
//   outline: none;
//   letter-spacing: ${theme.letterSpacings.slight};
//   text-align:center;
//   transition: all 0.1s ease-in-out;
//   min-width: min-content;

//   :active {
//     box-shadow: none;
//     // opacity: ${0.85};
//   };

//   opacity: ${p => (p.disabled ? 0.5 : 1)}

//   justify-content: center;
//   align-items: center;

// 	${color}
// 	${fontSize}
// 	${space}
// 	${width}
//   ${type}
//   ${textAlign}
// `;

// // const Button = props => (
// //   <StyledButton {...props}>
// //     <Text>{props.children}</Text>
// //   </StyledButton>
// // );

// Button.defaultProps = {
//   py: 2,
//   px: 3,
//   fontSize: 2
// };

// Button.displayName = "Button";

// export default Button;
