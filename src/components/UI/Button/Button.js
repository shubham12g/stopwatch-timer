import React from "react";

import classes from "./Button.module.css";

const button = (props) => {
  const btnClass = [classes[props.color], classes.Button];

  return (
    <button
      className={btnClass.join(" ")}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.name}
    </button>
  );
};

export default button;
