import styled from 'styled-components'
import {
  borderRadius,
  space,
  width,
  height,
  color,
  order,
  position,
  top,
  right,
  bottom,
  left,
  size,
  textAlign,
  minWidth,
  maxWidth,
  maxHeight,
  minHeight,
  border,
  borderRight,
  borderBottom,
  borderTop,
  borderLeft,
  fontFamily,
  boxShadow,
  zIndex
} from 'styled-system'

const Box = styled.div`
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;

  // shadow-bottom: ${p => (p.shadowBottom ? '0px 10px 10px -10px black' : 'none')}
  // shadow-top: ${p => (p.shadowTop ? '0px -10px 10px -10px black' : 'none')}

  ${zIndex}
  ${boxShadow}
	${borderRadius}
  ${border}
  ${borderRight}
  ${borderLeft}
  ${borderTop}
  ${borderBottom}
	${color}
	${order}
	${position}
	${top}
	${right}
	${bottom}
	${left}
	${space}
	${textAlign}
	${size}
  ${width}
  ${height}
  ${minWidth}
  ${maxWidth}
  ${minHeight}
  ${maxHeight}
  ${fontFamily}
`

Box.displayName = 'Box'

export default Box
