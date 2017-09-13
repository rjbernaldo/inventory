import React, { Component } from 'react';

const HOUR = 21;
const MINUTE = 0;
const SECOND = 0;

class App extends Component {
  constructor(props) {
    super(props);

    const deadline = generateDeadline(HOUR, MINUTE, SECOND);
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

    const hours = hh !== 0 ? `${hh}h` : '';
    const minutes = hh !== 0 || mm !== 0 ? `${mm}m` : '';
    const seconds = `${ss}s`;

    const display = hh > 0
      ? (
        <div>
          <strong>{ hours } { minutes } { seconds }</strong>
          <span> before </span>
          <strong>{ formatTime(deadline) }</strong>
        </div>
      )
      : (
        <span>Its already { formatTime(deadline) }</span>
      );

    return (
      <div style={{ width: '150px' }}>
        { display }
      </div>
    );
  }
}

export default App;

function generateDeadline(hour, minute, second) {
  const deadline = new Date();

  deadline.setHours(hour);
  deadline.setMinutes(minute);
  deadline.setSeconds(second);

  return deadline;
}

function formatTime(time) {
  let hh = time.getHours() % 12;
  let mm = time.getMinutes();
  const ap = time.getHours() >= 12 ? 'pm' : 'am';

  hh = hh === 0 ? '00' : hh;
  mm = mm === 0 ? '00' : mm;

  return `${hh}:${mm} ${ap}`;
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

