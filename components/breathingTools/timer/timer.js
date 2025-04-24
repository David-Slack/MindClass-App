// components/breathingTools/timer/timer.js
import { useEffect, useState, useRef } from 'react';
import React from 'react';
import styles from "./timer.module.css";

export default function Timer({ timeFeedback }) {
  const [timer, setTimer] = useState('00:00');
  const intervalRef = useRef(null);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsElapsed((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (timeFeedback) {
      timeFeedback(secondsElapsed);
    }
    const mins = Math.floor(secondsElapsed / 60);
    const seconds = secondsElapsed % 60;
    const formattedMinutes = String(mins).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    setTimer(`${formattedMinutes}:${formattedSeconds}`);
  }, [secondsElapsed, timeFeedback]);

  return <div className={styles.timer}>{timer}</div>;
}
