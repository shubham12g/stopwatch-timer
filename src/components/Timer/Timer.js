import React, { Component } from "react";

import Time from "./Time/Time";
import Button from "../UI/Button/Button";
import classes from "./Timer.module.css";

class Timer extends Component {
  state = {
    timer: {
      hours: 0,
      minutes: 1,
      seconds: 10,
    },
    disabled: false,
  };

  startTimerHandler = () => {
    this.setState({ disabled: true });
    const startTimer = setInterval(() => {
      const timer = { ...this.state.timer };

      if (this.state.timer.seconds === 0) {
        if (this.state.timer.minutes === 0) {
          if (this.state.timer.hours === 0) {
            clearInterval(startTimer);
            this.setState({ disabled: false });
          } else {
            timer.hours = timer.hours - 1;
            timer.minutes = 59;
            timer.seconds = 59;
            this.setState({ timer: timer });
          }
        } else {
          timer.minutes = timer.minutes - 1;
          timer.seconds = 59;
          this.setState({ timer: timer });
        }
      } else {
        timer.seconds = timer.seconds - 1;
        this.setState({ timer: timer });
      }
    }, 1000);
  };

  render() {
    let timer = [];
    for (let key in this.state.timer) {
      timer.push(<Time time={this.state.timer[key]} key={key} />);
      timer.push(":");
    }
    timer.pop();

    return (
      <div className={classes.Timer}>
        <div>{timer}</div>
        <Button
          clicked={this.startTimerHandler}
          name="Start Timer"
          disabled={this.state.disabled}
        />
      </div>
    );
  }
}

export default Timer;
