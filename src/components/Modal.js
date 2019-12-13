import React, { useState, useEffect } from 'react'
import { Flex, Box, Text, Button, Modal, Divider } from '../primitives'

import Assets from './Assets'
import Utils from './Utils'

const Amount = ({ amount = 0 }) => {
  return (
    <>
      <Box mx={1}> | </Box>
      {Utils.parseValue(amount)}
    </>
  )
}

const WiredModal = ({
  children,
  isOpen,
  title = 'Ello Moto',
  onSearch,
  onConfirm,
  onClose,
  amount,
  loading,
  ...p
}) => {
  return (
    <Modal isOpen={isOpen} width={[1, 2 / 3]} m={4}>
      <Flex
        width={1}
        p={3}
        alignItems="center"
        bg="backing"
        borderBottom="1px solid rgba(0, 0, 0, 0.5)"
        boxShadow='4px 0px 4px 0px rgba(0, 0, 0, 0.2)'
      >
        <Text.Heading fontSize={6}>{title}</Text.Heading>
        <Box mx="auto" />
        <Assets.Icons.Close onClick={onClose} clickable style={{cursor: 'pointer'}}/>
      </Flex>
      <Divider />
      {children}
      <Divider />
      <Flex
        width={1}
        p={3}
        borderTop="1px solid rgba(0, 0, 0, 0.5)"
        boxShadow='-4px 0px 4px 0px rgba(0, 0, 0, 0.2)'
      >
        {onSearch && <Search onSearch={onSearch} />}
        <Box mx="auto" />
        <Button
          as={Flex}
          alignItems="center"
          mx={1}
          type="primary"
          onClick={onConfirm}
          disabled={loading}
        >
          Confirm {amount > 0 && <Amount amount={amount} />}
        </Button>
        <Button disabled={loading} mx={1} type="warning" onClick={onClose}>
          Cancel
        </Button>
      </Flex>
    </Modal>
  )
}

export default WiredModal
