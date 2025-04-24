import React, { useEffect, useRef, useState } from 'react';
import styles from './breathingTools.module.css';
import Timer from './timer/timer';
import {Col} from "react-bootstrap";

const SIMPLE_INITIAL_MESSAGE = 'Simple Breathing';
const SIMPLE_TIMING = 4500;
const SIMPLE_TEXT_EFFECT_TIMING = 3000;
const SIT_CONFORTABLE = 'Ready?';
const START_MESSAGE = "Let's Begin";
const INITIAL_DELAY = 1500;
const BREATH_IN = 'Breathe In';
const BREATH_OUT = 'Breathe Out';

export default function SimpleBreathing() {
    const [muted, setMuted] = useState(false);
    const [breathCounter, setBreathCounter] = useState(0);
    const [started, setStarted] = useState(false); // Initialize to false
    const [startMessage, setStartMessage] = useState(SIMPLE_INITIAL_MESSAGE);
    const [breathMessage, setBreathMessage] = useState(null);
    const [textEffect, setTextEffect] = useState(null);
    const [circleEffect, setCircleEffect] = useState(null);

    const breathInAudioRef = useRef(null);
    const breathOutAudioRef = useRef(null);

    let breathTemp = true;
    let intervalIdRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            breathInAudioRef.current = new Audio('/sound/breath-in.mp3');
            breathOutAudioRef.current = new Audio('/sound/breath-out.mp3');
            breathInAudioRef.current.muted = muted;
            breathOutAudioRef.current.muted = muted;
        }
    }, [muted]);

    const startBreathing = () => {
        setBreathMessage(true);
        intervalIdRef.current = setInterval(() => {
            if (breathTemp) {
                setBreathMessage(false);
                breathTemp = false;
            } else {
                setBreathMessage(true);
                breathTemp = true;
            }
        }, SIMPLE_TIMING);
    };

    useEffect(() => {
        if (breathMessage !== null) {
            setTextEffect(true);
            setTimeout(() => {
                setTextEffect(false);
            }, SIMPLE_TEXT_EFFECT_TIMING);
        }
    }, [breathMessage]);

    useEffect(() => {
        if (breathMessage === true) {
            if(breathInAudioRef.current) {
                breathInAudioRef.current.play().catch(error => console.error('Error playing BREATH_IN_AUDIO:', error));
            }
            setCircleEffect(true);
            setBreathCounter(breathCounter + 1);
        }
        if (breathMessage === false) {
            if(breathOutAudioRef.current) {
                breathOutAudioRef.current.play().catch(error => console.error('Error playing BREATH_OUT_AUDIO:', error));
            }
            setCircleEffect(false);
        }
    }, [breathMessage]);

    useEffect(() => {
        return () => {
            if (intervalIdRef.current) clearInterval(intervalIdRef.current);
        };
    }, []);

    useEffect(() => {
        if (started) {
            setTimeout(() => {
                setStartMessage(SIT_CONFORTABLE);
                setTimeout(() => {
                    setStartMessage(START_MESSAGE);
                    setTimeout(() => {
                        setStartMessage(null);
                        startBreathing();
                    }, INITIAL_DELAY);
                }, INITIAL_DELAY);
            }, 0);
        }
    }, [started]);

    const handleStart = () => {
        setStarted(true);
    };

    const handleStop = () => {
        setStarted(false);
        setStartMessage(SIMPLE_INITIAL_MESSAGE);
        setBreathMessage(null);
        setTextEffect(null);
        setCircleEffect(null);
        breathInAudioRef.current?.pause();
        breathOutAudioRef.current?.pause();
        if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };

    return (
        <Col className={`${styles.breathingContainer}`}>
            <div className={styles.breath_circle}>
                <div
                    className={`${styles.breath_circle_inner} ${
                        circleEffect ? styles.circle_large : styles.circle_small
                    }`}
                ></div>
            </div>

            {started ? (
                <div className={styles.message}>
                    {startMessage ? (
                        startMessage
                    ) : breathMessage ? (
                        <div
                            className={
                                textEffect ? styles.transition_in : styles.transition_out
                            }
                        >
                            {BREATH_IN}
                        </div>
                    ) : (
                        <div
                            className={
                                textEffect ? styles.transition_in : styles.transition_out
                            }
                        >
                            {BREATH_OUT}
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.message}>
                    {SIMPLE_INITIAL_MESSAGE}
                </div>
            )}

            {!started ? (
                <button onClick={handleStart}>Start</button>
            ) : (
                <>
                    {!startMessage &&
                        <>
                            <Timer />
                            <button onClick={handleStop}>Stop</button>

                            <button onClick={() => setMuted(!muted)}>
                                {muted ? 'Muted' : 'Unmuted'}
                            </button>
                        </>
                    }

                </>
            )}
        </Col>
    );
}
