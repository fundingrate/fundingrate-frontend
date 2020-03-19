import React, { useState, useEffect } from "react";
import { Flex, Box, Text, Button, Modal, Divider, Input } from "../primitives";

import Assets from "./Assets";
import Utils from "./Utils";

const Amount = ({ amount = 0 }) => {
  return (
    <>
      <Box mx={1}> | </Box>
      {Utils.parseValue(amount)}
    </>
  );
};

const WiredModal = ({
  children,
  isOpen,
  title = "Ello Moto",
  onSearch,
  onConfirm,
  onClose,
  amount,
  loading,
  hideActions,
  ...p
}) => {
  return (
    <Modal
      isOpen={isOpen}
      width={[1, 2 / 3]}
      m={4}
      onKeyPress={e => {
        if (e.key !== "Enter") return;
        if (onConfirm) onConfirm();
      }}
    >
      <Flex
        width={1}
        p={3}
        alignItems="center"
        bg="backing"
        borderBottom="1px solid rgba(0, 0, 0, 0.5)"
        boxShadow="4px 0px 4px 0px rgba(0, 0, 0, 0.2)"
      >
        <Text.Heading fontSize={6}>{title}</Text.Heading>
        <Box mx="auto" />
        <Assets.Icons.Close
          onClick={onClose}
          clickable
          style={{ cursor: "pointer" }}
        />
      </Flex>
      <Divider />
      <Flex
        m={2}
        width={1}
        justifyContent="center"
        style={{
          overflow: "hidden",
          overflowY: "auto"
        }}
      >
        {children}
      </Flex>
      <Divider />
      {!hideActions && (
        <Flex
          width={1}
          p={3}
          borderTop="1px solid rgba(0, 0, 0, 0.5)"
          boxShadow="-4px 0px 4px 0px rgba(0, 0, 0, 0.2)"
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
      )}
    </Modal>
  );
};

WiredModal.Button = ({
  title = "Some Modal Dialog",
  label = "Open Modal",
  children
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = s => {
    return setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Modal
        title={title}
        isOpen={isModalOpen}
        onConfirm={toggleModal}
        onClose={toggleModal}
      >
        {children}
      </Modal>
      <Button m={2} type="warning" onClick={toggleModal}>
        {label}
      </Button>
    </>
  );
};

WiredModal.FAQ = p => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = s => {
    return setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <WiredModal
        title="Provider FAQ"
        isOpen={isModalOpen}
        onConfirm={toggleModal}
        onClose={toggleModal}
      >
        <Utils.MarkdownLink link="https://gist.githubusercontent.com/tacyarg/ee3ffe27874dcf9505e956bab6ea6f0e/raw/provider_FAQ.md" />
      </WiredModal>
      <Button m={2} type="warning" onClick={toggleModal}>
        Help
      </Button>
    </>
  );
};

WiredModal.CreateProvider = ({ onConfirm }) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, setState] = useState({});
  const [error, setError] = useState(null);

  const setProp = (k, v) => {
    return setState({
      ...state,
      [k]: v
    });
  };

  const toggleModal = s => {
    setState({
      name: '',
      description: ''
    })
    return setIsModalOpen(!isModalOpen);
  };

  const CreateProvider = async p => {
    if (!state.name) return;
    if (!state.description) return;
    if (state.name.length < 3) return;
    if (state.description.length < 10) return;
    setLoading(true);
    await onConfirm(state)
      .then(toggleModal)
      .catch(e => setError(e.message));
    setLoading(false);
  };

  return (
    <>
      <WiredModal
        loading={loading}
        title={"Create New Provider"}
        isOpen={isModalOpen}
        onConfirm={CreateProvider}
        onClose={toggleModal}
      >
        <Flex m={4} width={2 / 3} flexDirection="column" alignItems="center">
          {error && (
            <Text color="red" fontSize={3} p={3}>
              {error}
            </Text>
          )}
          <Input
            disabled={loading}
            label="Name:"
            placeholder="Super Secret Signals #42069"
            onChange={e => setProp("name", e.target.value)}
            value={state.name}
            error={state.name && state.name.length < 3}
          />
          <Box my={1} />
          <Input
            disabled={loading}
            label="Description:"
            placeholder="Uses top secret sauce to provide accurate signals!"
            onChange={e => setProp("description", e.target.value)}
            value={state.description}
            error={state.description && state.description.length < 10}
          />
        </Flex>
      </WiredModal>
      <Button m={2} type="primary" onClick={toggleModal}>
        Create New Provider
      </Button>
    </>
  );
};

export default WiredModal;
