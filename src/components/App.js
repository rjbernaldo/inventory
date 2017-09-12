import React, { Component } from 'react';

const HOUR = 21;
const MINUTE = 0;
const SECOND = 0;

class App extends Component {
  constructor(props) {
    super(props);

    const deadline = new Date();
    deadline.setHours(HOUR);
    deadline.setMinutes(MINUTE);
    deadline.setSeconds(SECOND);

    const { hh, mm, ss } = getDifference(deadline);

    this.state = {
      deadline,
      hh,
      mm,
      ss,
    };
  }

  componentDidMount() {
    const { deadline } = this.state;

    setInterval(() => {
      this.setState(getDifference(deadline));
    }, 1000);
  }

  render() {
    const { deadline, hh, mm, ss } = this.state;

    return (
      <div>
        <h2>{ formatTime(new Date()) }</h2>
        <h4>{ formatTime(deadline) }</h4>
        <h4>{ hh }:{ mm }:{ ss }</h4>
      </div>
    );
  }
}

export default App;

function formatTime(time) {
  let hh = time.getHours() % 12;
  let mm = time.getMinutes();
  const ap = time.getHours() >= 12 ? 'PM' : 'AM';

  hh = hh === 0 ? '00' : hh;
  mm = mm === 0 ? '00' : mm;

  return `${hh}:${mm}${ap}`;
}

function getDifference(deadline) {
  const now = new Date();

  let msec = deadline - now;

  const hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  const mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  const ss = Math.floor(msec / 1000);
  msec -= ss * 1000;

  return { hh, mm, ss };
}

