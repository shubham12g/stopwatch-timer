import React, { Fragment } from "react";

const time = (props) => {
  let time = props.time;
  if (props.time < 10) time = "0" + time;

  return <Fragment>{time}</Fragment>;
};

export default time;
