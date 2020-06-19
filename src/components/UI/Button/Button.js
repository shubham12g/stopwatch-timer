import React from "react";

import classes from "./Button.module.css";

const button = (props) => (
  <button
    className={classes.Button}
    onClick={props.clicked}
    disabled={props.disabled}
  >
    {props.name}
  </button>
);

export default button;
