import React, { useEffect, useState } from "react";
import {
  Button,
} from "../primitives";
import { useWiring, store } from "../libs/wiring";

Button.Logout = p => {
  const [state, dispatch] = useWiring(["me"]);
    console.log(state)
    const Logout = async s => {
        await state.actions.auth('logout', {})
        actions.deleteLocalStorage('token')
        window.location.reload()
    }

  return (
    <Button {...p} onClick={Logout} type="warning">
      LOGOUT
    </Button>
  );
};

export default Button;
