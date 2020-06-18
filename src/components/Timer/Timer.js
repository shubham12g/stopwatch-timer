import React, { Component } from "react";

import classes from "./Timer.module.css";

class Timer extends Component {
  state = {
    counter: 30,
  };

  countDownHandler = () => {
    const count = setInterval(() => {
      if (this.state.counter === 0) clearInterval(count);
      else {
        const counter = this.state.counter - 1;
        this.setState({ counter: counter });
      }
    }, 1000);
  };

  render() {
    return (
      <div className={classes.Timer}>
        <div>{this.state.counter}</div>
        <button onClick={this.countDownHandler}>Click Me!</button>
      </div>
    );
  }
}

export default Timer;
