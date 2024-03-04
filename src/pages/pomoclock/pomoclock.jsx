import React, { useState, useEffect } from 'react';
import './pomoclock.css';
import videoJob from './98087a379cf04a1389c971f0ac43a122.mov';

function PomoClock() {
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [cycles, setCycles] = useState(1);
  const [minutes, setMinutes] = useState(focusDuration);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('Focus');

  useEffect(() => {
    setMinutes(focusDuration);
  }, [focusDuration]);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(intervalId);
            if (currentPhase === 'Focus') {
              setCurrentPhase('Break');
              setMinutes(breakDuration);
            } else {
              setCurrentPhase('Focus');
              setCycles(cycles + 1);
              setMinutes(focusDuration);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, minutes, seconds, focusDuration, breakDuration, cycles, currentPhase]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentPhase('Focus');
    setCycles(1);
    setMinutes(focusDuration);
    setSeconds(0);
  };

  return (
    <div className="PomoClockContainer">
      <video className="pomo-video" autoPlay loop muted controls={false} preload='auto'>
        <source src={videoJob} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="PomoClockContent">
        <div className="Timer">
          <p className="TimerDisplay">
            {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
          </p>
          <p className="Cycles">Cycles: {cycles}</p>
          <p className="Phase">Phase: {currentPhase}</p>
        </div>
        <div className="Settings">
          <label>
            Focus Duration (minutes):
            <input type="number" value={focusDuration} onChange={(e) => setFocusDuration(parseInt(e.target.value))} />
          </label>
          <label>
            Break Duration (minutes):
            <input type="number" value={breakDuration} onChange={(e) => setBreakDuration(parseInt(e.target.value))} />
          </label>
          <label>
            Cycles:
            <input type="number" value={cycles} onChange={(e) => setCycles(parseInt(e.target.value))} />
          </label>
        </div>
        <div className="Controls">
          {!isRunning ? <button className='StartButton' onClick={startTimer}>Start</button> : <button onClick={pauseTimer}>Pause</button>}
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default PomoClock;
