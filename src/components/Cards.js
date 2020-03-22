import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Flex,
  Box,
  Text,
  Heading,
  Input,
  Divider
} from "../primitives";
import { Utils, Inputs, Buttons } from "../components";
import { useWiring, store } from "../libs/wiring";

Card.ProfileData = ({ user, children, ...p }) => {
  const { username, id, token } = user;
  return (
    <Card flexDirection="column" width={1} {...p}>
      <Inputs.SetMyUsername value={username} />
      <Box my={2} />
      <Inputs.Copy
        label="UserID: "
        placeholder="No value provided..."
        value={id}
      />
      <Box my={2} />
      <Inputs.Copy
        label="Token: "
        placeholder="No value provided..."
        value={token}
      />
      <Box my={3} />
      <Flex alignItems="center">{children}</Flex>
    </Card>
  );
};

Card.InputAmount = ({ ticker, onSubmit = x => x, ...p }) => {
  const [state, setState] = useWiring(["user"]);

  const [amount, setAmount] = useState(0.01);
  const [value, setValue] = useState(0);
  const [loadingExchange, setLoadingExchange] = useState(false);

  useEffect(() => {
    setLoadingExchange(true);
  }, [amount]);

  const debouncedAmount = Utils.useDebounce(amount, 500);
  useEffect(() => {
    if (!ticker) return console.log("WARNING: ticker prop required.");
    state.actions
      .private("getCryptapiTickerPrice", { ticker, amount })
      .then(v => {
        setValue(v || 0);
        setLoadingExchange(false);
      });
  }, [debouncedAmount]);

  return (
    <Card flexDirection="column" alignItems="center" justifyContent="center">
      <Buttons.PresetValues onClick={setAmount} />
      <Box m={2} />
      <Input
        flex={1}
        label="Amount:"
        placeholder="0.01"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      >
        <Button
          disabled={loadingExchange}
          type="primary"
          onClick={e => onSubmit(amount)}
        >
          ${value}
        </Button>
      </Input>
    </Card>
  );
};

Card.QrDeposit = ({ data }) => {
  return (
    <Card m={2} alignItems="center" justifyContent="center">
      <Image size={240} src={data.tx.qr} />
      <Box mx={2} />
      <Flex
        m={2}
        height={"100%"}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Inputs.Copy
          flex={1}
          label="Send Exactly:"
          placeholder="0.01"
          value={data.tx.amount}
        />
        <Box m={2} />
        <Inputs.Copy
          flex={1}
          label="To Address:"
          placeholder="1APT1UoYgA8tJEnN1qe8rcvaN55NoASDju"
          value={data.tx.to}
        />
        <Box my={3} />
        <Text color="subtext" m={2}>
          Current Transaction State: {data.state}.
        </Text>
        <Text fontSize={1} color="subtext" m={1}>
          Last updated @ {Utils.renderProp(data.updated, "time")} with a total
          of {data.tries} attempt(s).
        </Text>
      </Flex>
    </Card>
  );
};

export default Card;
