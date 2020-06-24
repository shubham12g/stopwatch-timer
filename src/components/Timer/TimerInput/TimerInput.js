import React from "react";

import classes from "./TimerInput.module.css";

const timerInput = (props) => {
  return (
    <div className={classes.TimerDiv}>
      <input
        className={classes.TimerInput}
        type="text"
        value={props.value}
        onChange={props.changed}
      />
      <p style={{ fontSize: "25%", textTransform: "capitalize" }}>
        {props.timeName}
      </p>
    </div>
  );
};

export default timerInput;
