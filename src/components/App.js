import React, { Component } from 'react';

import GApp from 'grommet/components/App';
import GBox from 'grommet/components/Box';
import GSplit from 'grommet/components/Split';
import GHeading from 'grommet/components/Heading';

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

    const hours = (`0${hh}`).slice(-2);
    const minutes = (`0${mm}`).slice(-2);
    const seconds = (`0${ss}`).slice(-2);

    const display = hh > 0 || mm > 0
      ? (
        <GSplit>
          <GBox pad="medium">
            <GBox align="start" style={{ paddingBottom: '15px' }}>
              <GHeading tag="h4">
                Time Capsule
              </GHeading>
            </GBox>
            <GBox align="start">Side Project</GBox>
            <GBox align="start">Freelance</GBox>
          </GBox>
          <GBox pad="medium">
            <GBox align="end" style={{ paddingBottom: '15px' }}>
              <GHeading tag="h4">
                <strong>{ hours }:{ minutes }:{ seconds }</strong>
              </GHeading>
            </GBox>
            <GBox align="end">02:00:00</GBox>
            <GBox align="end">01:00:00</GBox>
          </GBox>
        </GSplit>
      )
      : (
        <span>Its already { formatTime(deadline) }</span>
      );

    return (
      <GApp appCentered={true}>
        { display }
      </GApp>
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

