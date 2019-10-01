import React from 'react'
import styled from 'styled-components'
import {} from 'styled-system'

import { Text, Flex, Image } from '.'
import theme from '../styles/theme'

const Styled = styled.input`
  background-color: rgba(0, 0, 0, 0);
  font-size: ${theme.fontSizes[3]};
  border: none;
  flex: 1;
  color: white;
  &:focus {
    border: none;
    outline: none;
  }

  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
`

const StyledInput = ({ withWrapper = true, children, icon, error, ...props }) =>
  withWrapper ? (
    <StyledInput.Wrapper width={1} error={error}>
      {icon && <Image src={icon} size={20} mr={2} />}
      <Styled width={1} type="text" {...props} />
      {children}
    </StyledInput.Wrapper>
  ) : (
    <Flex
      // bg="lightCard"
      flex={1}
      p={2}
      borderRadius="rounded"
    >
      <Styled type="text" {...props} />
      {children}
    </Flex>
  )

StyledInput.displayName = 'Input'

StyledInput.Wrapper = styled(Flex)`
  border: ${p => (p.error ? 'red' : theme.colors.lightCard)} ${
  theme.borders.normal
};
  border-radius: ${theme.radii.normal};
  background-color: ${theme.colors.card};
  // opacity: ${p => (p.disabled ? 0.5 : 1)};
`

StyledInput.Wrapper.defaultProps = {
  p: 2,
}

export default StyledInput
