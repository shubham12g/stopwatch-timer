import React, { Component } from "react";

import Time from "./Time/Time";
import TimerInput from "./TimerInput/TimerInput";
import Button from "../UI/Button/Button";
import Warning from "../Warning/Warning";
import classes from "./Timer.module.css";

class Timer extends Component {
  state = {
    timer: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    controls: {
      startTimer: false,
      setTimer: true,
      timeSelected: false,
      resetTimer: false,
      pauseTimer: false,
      stopTimer: false,
    },
    displayWarning: false,
  };

  startTimerHandler = () => {
    const controls = { ...this.state.controls };
    controls.startTimer = false;
    controls.resetTimer = false;
    controls.stopTimer = true;
    controls.pauseTimer = true;

    this.setState({ controls: controls });

    const startTimer = setInterval(() => {
      const timer = { ...this.state.timer };
      const controls = { ...this.state.controls };

      if (this.state.timer.seconds === 0) {
        if (this.state.timer.minutes === 0) {
          if (this.state.timer.hours === 0) {
            clearInterval(startTimer);
            controls.stopTimer = false;
            controls.pauseTimer = false;
            controls.setTimer = true;
          } else {
            timer.hours = timer.hours - 1;
            timer.minutes = 59;
            timer.seconds = 59;
          }
        } else {
          timer.minutes = timer.minutes - 1;
          timer.seconds = 59;
        }
      } else {
        timer.seconds = timer.seconds - 1;
      }
      this.setState({ timer: timer, controls: controls });
    }, 1000);
  };

  setTimerClickedHandler = () => {
    let controls = { ...this.state.controls };
    controls.timeSelected = true;
    controls.setTimer = false;

    this.setState({ controls: controls });
  };

  timeChangedHandler = (event, id) => {
    const timer = { ...this.state.timer };
    const value = event.target.value;

    console.log(value);

    this.setState({ displayWarning: false });

    if (value === "" || this.isPositiveInteger(value)) {
      timer[id] = +value;
      if (parseInt(value, 10) > 59) {
        this.setState({ displayWarning: true });
      }
    }

    this.setState({ timer: timer });
  };

  setTimerHandler = () => {
    let controls = { ...this.state.controls };
    controls.timeSelected = false;

    if (
      this.state.timer.hours > 0 ||
      this.state.timer.minutes > 0 ||
      this.state.timer.seconds > 0
    ) {
      controls.startTimer = true;
      controls.resetTimer = true;
    } else {
      controls.setTimer = true;
    }

    this.setState({ controls: controls });
  };

  resetTimerHandler = () => {
    const timer = this.resetTime();
    const controls = { ...this.state.controls };

    controls.startTimer = false;
    controls.resetTimer = false;
    controls.setTimer = true;

    this.setState({ timer: timer, controls: controls });
  };

  resetTime = () => {
    const timer = { ...this.state.timer };

    timer.hours = +0;
    timer.minutes = +0;
    timer.seconds = +0;

    return timer;
  };

  stopTimerHandler = () => {
    const timer = this.resetTime();
    this.startTimerHandler();

    const controls = { ...this.state.controls };

    controls.stopTimer = false;
    controls.pauseTimer = false;
    controls.setTimer = true;

    this.setState({ timer: timer, controls: controls });
  };

  isPositiveInteger(value) {
    return value >>> 0 === parseFloat(value);
  }

  render() {
    let timer = [];
    if (this.state.controls.timeSelected) {
      for (let key in this.state.timer) {
        timer.push(
          <TimerInput
            value={this.state.timer[key]}
            key={key}
            changed={(event) => this.timeChangedHandler(event, key)}
            timeName={key}
          />
        );
        timer.push(":");
      }
    } else {
      for (let key in this.state.timer) {
        timer.push(<Time time={this.state.timer[key]} key={key} />);
        timer.push(":");
      }
    }
    timer.pop();

    let controls = [];
    if (this.state.controls.setTimer) {
      controls.push(
        <Button
          key={"setTimer"}
          clicked={this.setTimerClickedHandler}
          name="Set timer"
          color="Orange"
        />
      );
    }
    if (this.state.controls.timeSelected) {
      controls.push(
        <Button
          key={"timeSelected"}
          clicked={this.setTimerHandler}
          name="Ok"
          color="LightBlue"
        />
      );
    }
    if (this.state.controls.startTimer) {
      controls.push(
        <Button
          key={"startTimer"}
          clicked={this.startTimerHandler}
          name="Start timer"
          color="LightBlue"
        />
      );
    }
    if (this.state.controls.resetTimer) {
      controls.push(
        <Button
          key={"resetTimer"}
          clicked={this.resetTimerHandler}
          name="Reset"
          color="Red"
        />
      );
    }
    if (this.state.controls.pauseTimer) {
      controls.push(
        <Button
          key={"pauseTimer"}
          clicked={this.setTimerClickedHandler}
          name="Pause"
          color="Orange"
        />
      );
    }
    if (this.state.controls.stopTimer) {
      controls.push(
        <Button
          key={"stopTimer"}
          clicked={this.stopTimerHandler}
          name="Stop"
          color="LightBlue"
        />
      );
    }

    return (
      <div className={classes.Timer}>
        {this.state.controls.timeSelected && this.state.displayWarning ? (
          <Warning>Don't Exceed Limit!</Warning>
        ) : null}

        <div className={classes.TimerDiv}>{timer}</div>

        <div className={classes.TimerButtons}> {controls} </div>
      </div>
    );
  }
}

export default Timer;
