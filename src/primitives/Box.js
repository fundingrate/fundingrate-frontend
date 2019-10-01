import styled from 'styled-components';
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
    fontFamily
} from 'styled-system';

const Box = styled.div`
  box-sizing: border-box;

	${borderRadius}
  ${border}
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
`;

Box.displayName = 'Box';

export default Box;
