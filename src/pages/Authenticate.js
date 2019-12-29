import React, { useEffect, useState } from "react";
import { Card, Box, Button, Flex, Text, Heading, Input } from "../primitives";
import { Assets } from "../components";

const Login = ({ actions, location, history }) => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    login: "",
    password: ""
  });

  const handleInput = prop => e => {
    const value = e.target.value;
    // console.log(prop, value)
    setState({
      ...state,
      [prop]: value
    });
  };

  const Submit = () => {
    setLoading(true);
    return actions
      .me(state)
      .then(user => {
        setLoading(false);
        history.push("/profile");
        // window.location.reload()
      })
      .catch(e => {
        setLoading(false);
        console.error("REGISTER ERROR:", state, e);
      });
  };

  return (
    <Flex
      flexDirection="column"
      width={[1, 2 / 3]}
      p={4}
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Heading> Account Login </Heading>
      <Text color="primary" p={2}>
        Welcome back, please enter your account credentials.
      </Text>
      <Card
        flexDirection="column"
        width={[1, 1 / 2]}
        alignItems="center"
        justifyContent="center"
        p={3}
        m={4}
      >
        <Input
          disabled={loading}
          label="Login: "
          value={state.login}
          onChange={handleInput("login")}
          placeholder="kyle@fr.io"
        />
        <Box my={2} />
        <Input
          type="password"
          disabled={loading}
          label="Password: "
          value={state.password}
          onChange={handleInput("password")}
          placeholder="********************"
        />
        <Button
          disabled={state.login.length < 5 && state.password.length < 8}
          mt={3}
          type="primary"
          onClick={Submit}
        >
          LOGIN
        </Button>
      </Card>
    </Flex>
  );
};

const Register = ({ actions, location, user, token, history }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [state, setState] = useState({
    login: "",
    password: "",
    verifyPassword: ""
  });

  const handleInput = prop => e => {
    const value = e.target.value;
    setState({
      ...state,
      [prop]: value
    });
  };

  const Submit = () => {
    setLoading(true);
    return actions
      .registerUsername(state)
      .then(({ user, token }) => {
        setLoading(false);
        actions.setLocalStorage("token", token.id);
        history.push("/profile");
        window.location.reload();
      })
      .catch(e => {
        setLoading(false);
        console.error("REGISTER ERROR:", state, e);
        setError(e.message);
      });
  };

  useEffect(() => {
    if (state.password.length < 8)
      return setError("Password needs to be at least 8 characters.");
    if (state.password !== state.verifyPassword)
      return setError("Passwords do not match.");
    setError(null);
  }, [state]);

  return (
    <Flex
      flexDirection="column"
      width={[1, 2 / 3]}
      p={4}
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Heading> Account Registration </Heading>
      <Text color={error ? "red" : "primary"} p={2}>
        {error ? error : "Hello, please enter your desired credentials below."}
      </Text>
      <Card
        flexDirection="column"
        width={[1, 1 / 2]}
        alignItems="center"
        justifyContent="center"
        p={3}
        m={4}
      >
        <Input
          disabled={loading}
          label="Login: "
          value={state.login}
          onChange={handleInput("login")}
          placeholder="kyle@fr.io"
        />
        <Box my={2} />
        <Input
          type="password"
          disabled={loading}
          label="Password: "
          value={state.password}
          onChange={handleInput("password")}
          placeholder="********************"
        />
        <Box my={2} />
        <Input
          type="password"
          disabled={loading}
          label="Verify Password: "
          value={state.verifyPassword}
          onChange={handleInput("verifyPassword")}
          placeholder="********************"
        />
        <Button disabled={error} mt={3} type="primary" onClick={Submit}>
          REGISTER
        </Button>
      </Card>
    </Flex>
  );
};

const Authenticate = p => {
  if (p.user) {
    p.history.push("/profile");
    return <Text>Redirecting...</Text>;
  }

  const r = <Register {...p} />;
  const l = <Login {...p} />;

  const [page, setPage] = useState(null);

  if (page) return page;
  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width={1}>
      <Button
        as={Flex}
        alignItems="center"
        type="card"
        onClick={e => setPage(l)}
      >
        <Assets.Icons.Login mr={3} /> Login
      </Button>
      <Text mx={2} color="subtext" fontSize={1}>
        OR
      </Text>
      <Button
        as={Flex}
        alignItems="center"
        type="card"
        onClick={e => setPage(r)}
      >
        <Assets.Icons.Signup mr={3} /> Signup
      </Button>
    </Flex>
  );
};

export default Authenticate;
