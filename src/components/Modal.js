import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Button,
  Modal,
  Divider,
  Input,
  Well
} from "../primitives";

import Assets from "./Assets";
import Utils from "./Utils";
import Editor from "./Editor";

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
  subtitle = "Call me maybe...",
  onSearch,
  onConfirm,
  onClose,
  amount,
  loading,
  disabled,
  hideActions,
  ...p
}) => {
  return (
    <Modal
      // width={[1, 2 / 3]}
      {...p}
      m={4}
      isOpen={isOpen}
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
        <Box>
          <Text.Heading fontSize={6}>{title}</Text.Heading>
          <Box m={2} />
          <Text color="subtext">{subtitle}</Text>
        </Box>
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
      {!hideActions && [
        <Divider />,
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
            disabled={disabled || loading}
          >
            {loading ? <Utils.Loading /> : "Confirm"}
            {amount > 0 && <Amount amount={amount} />}
          </Button>
          <Button mx={1} type="warning" onClick={onClose}>
            Cancel
          </Button>
        </Flex>
      ]}
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
        hideActions={true}
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
      name: "",
      description: ""
    });
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

  const ready = state.name && state.description;

  return (
    <>
      <WiredModal
        width={1 / 2}
        disabled={!ready}
        loading={loading}
        title={"Create New Provider"}
        subtitle={
          "Please fill out the form below, the editor allows you to use markdown."
        }
        isOpen={isModalOpen}
        onConfirm={CreateProvider}
        onClose={toggleModal}
      >
        <Flex.Column mx={4} width={1}>
          <Box mx="auto" my={2}>
            {error ? (
              <Text color="red">{error}</Text>
            ) : (
              <Text color="primary"></Text>
            )}
          </Box>
          <Input
            disabled={loading}
            label="Name:"
            placeholder="Super Secret Signals #42069"
            onChange={e => setProp("name", e.target.value)}
            value={state.name}
            error={state.name && state.name.length < 3}
          />
          <Divider my={2} />

          <Well p={2} bg="darkBacking">
            <Editor
              lang="md"
              data={`# Hello World`}
              onChange={e => setProp("description", e)}
            />
          </Well>

          {/* <Input
            // type="textarea"
            disabled={loading}
            label="Description:"
            placeholder="Uses top secret sauce to provide accurate signals!"
            onChange={e => setProp("description", e.target.value)}
            value={state.description}
            error={state.description && state.description.length < 10}
          /> */}
        </Flex.Column>
      </WiredModal>
      <Button disabled={isModalOpen} m={2} type="primary" onClick={toggleModal}>
        Create New Provider
      </Button>
    </>
  );
};

export default WiredModal;
