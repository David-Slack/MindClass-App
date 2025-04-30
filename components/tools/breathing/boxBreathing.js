import React, { useEffect, useRef, useState } from 'react';
import styles from './breathingTools.module.css';
import Timer from './timer';
import { Col } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons CSS

const BOX_INITIAL_MESSAGE = 'Box Breathing';
const BOX_TIMING = 5500;
const BOX_TEXT_EFFECT_TIMING = 4000;
const SIT_CONFORTABLE = 'Ready?';
const START_MESSAGE = "Let's Begin";
const INITIAL_DELAY = 1500;
const BREATH_IN = 'Breathe In';
const BREATH_OUT = 'Breathe Out';
const HOLD = 'Hold';
const IN_HOLD = 'IN_HOLD';
const OUT_HOLD = 'OUT_HOLD';

let BREATH_IN_AUDIO = null;
let BREATH_OUT_AUDIO = null;
let HOLD_AUDIO = null;

export default function BoxBreathing() {
    const [muted, setMuted] = useState(false);
    const [breathCounter, setBreathCounter] = useState(0);
    const [started, setStarted] = useState(false);
    const [startMessage, setStartMessage] = useState(BOX_INITIAL_MESSAGE);
    const [breathMessage, setBreathMessage] = useState(null);
    const [textEffect, setTextEffect] = useState(null);

    let breathTemp = BREATH_IN;
    let intervalIdRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            BREATH_IN_AUDIO = new Audio('/sound/breath-in.mp3');
            BREATH_OUT_AUDIO = new Audio('/sound/breath-out.mp3');
            HOLD_AUDIO = new Audio('/sound/hold.mp3');
            BREATH_IN_AUDIO.muted = muted;
            BREATH_OUT_AUDIO.muted = muted;
            HOLD_AUDIO.muted = muted;
        }
    }, [muted]);

    const startBreathing = () => {
        setBreathMessage(BREATH_IN);
        intervalIdRef.current = setInterval(() => {
            if (breathTemp === BREATH_IN) {
                setBreathMessage(IN_HOLD);
                breathTemp = IN_HOLD;
            } else if (breathTemp === IN_HOLD) {
                setBreathMessage(BREATH_OUT);
                breathTemp = BREATH_OUT;
            } else if (breathTemp === BREATH_OUT) {
                setBreathMessage(OUT_HOLD);
                breathTemp = OUT_HOLD;
            } else if (breathTemp === OUT_HOLD) {
                setBreathMessage(BREATH_IN);
                breathTemp = BREATH_IN;
            }
        }, BOX_TIMING);
    };

    useEffect(() => {
        // Text transition effects
        if (breathMessage !== null) {
            setTextEffect(true);
            setTimeout(() => {
                setTextEffect(false);
            }, BOX_TEXT_EFFECT_TIMING);
        }

        // For playing audio
        if (breathMessage === BREATH_IN) {
            setBreathCounter(breathCounter + 1);
            if (!muted && BREATH_IN_AUDIO) {
                BREATH_IN_AUDIO.play().catch(error => console.error('Error playing BREATH_IN_AUDIO:', error));
            }
        }
        if (!muted) {
            if (breathMessage === BREATH_OUT && BREATH_OUT_AUDIO) BREATH_OUT_AUDIO.play().catch(error => console.error('Error playing BREATH_OUT_AUDIO:', error));
            if ((breathMessage === IN_HOLD || breathMessage === OUT_HOLD) && HOLD_AUDIO) HOLD_AUDIO.play().catch(error => console.error('Error playing HOLD_AUDIO:', error));
        }
    }, [breathMessage, muted]);

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
        setStartMessage(BOX_INITIAL_MESSAGE);
        setBreathMessage(null);
        setTextEffect(null);
        if (BREATH_IN_AUDIO) BREATH_IN_AUDIO.pause();
        if (BREATH_OUT_AUDIO) BREATH_OUT_AUDIO.pause();
        if (HOLD_AUDIO) HOLD_AUDIO.pause();
        if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };

    const breathMsg = () => {
        switch (breathMessage) {
            case BREATH_IN:
                return BREATH_IN;
            case BREATH_OUT:
                return BREATH_OUT;
            case IN_HOLD:
                return HOLD;
            case OUT_HOLD:
                return HOLD;
            default:
                return '';
        }
    };

    const boxAnimate = () => {
        switch (breathMessage) {
            case BREATH_IN:
                return `${styles.box_in} ${styles.effect}`;
            case BREATH_OUT:
                return `${styles.box_out} ${styles.effect}`;
            case IN_HOLD:
                return `${styles.box_in_hold} ${styles.effect}`;
            case OUT_HOLD:
                return `${styles.box_out_hold} ${styles.effect}`;
            default:
                return '';
        }
    };

    useEffect(() => {
        return () => {
            if (intervalIdRef.current) clearInterval(intervalIdRef.current);
            if (BREATH_IN_AUDIO) BREATH_IN_AUDIO.pause();
            if (BREATH_OUT_AUDIO) BREATH_OUT_AUDIO.pause();
            if (HOLD_AUDIO) HOLD_AUDIO.pause();
        };
    }, []);

    return (
        <Col className={`${styles.breathingContainer} text-center`}> {/* Added text-center for horizontal centering of buttons */}
            <div className={styles.breath_box}>
                {breathMessage && (
                    <div
                        className={`${styles.box_message} ${
                            textEffect ? styles.transition_in : styles.transition_out
                        }`}
                    >
                        {breathMsg()}
                    </div>
                )}
                <div className={`${styles.box_looper} ${boxAnimate()}`}></div>
            </div>

            <div className={styles.message}>{startMessage && startMessage}</div>

            {!started ? (
                <button onClick={handleStart} className={`btn btn-primary ${styles.squareBtn}`}>
                    <i className="bi bi-play-fill"></i>
                    <span className="visually-hidden">Start</span>
                </button>
            ) : (
                !startMessage &&
                <div className="d-flex gap-2 justify-content-center mt-3"> {/* Flex container for buttons */}
                    <Timer />
                    <button onClick={handleStop} className={`btn btn-danger ${styles.squareBtn}`}>
                        <i className="bi bi-stop-fill"></i>
                        <span className="visually-hidden">Stop</span>
                    </button>
                    <button onClick={() => setMuted(!muted)} className={`btn btn-info ${styles.squareBtn}`}>
                        <i className={`bi ${muted ? 'bi-volume-mute-fill' : 'bi-volume-up-fill'}`}></i>
                        <span className="visually-hidden">{muted ? 'Mute' : 'Unmute'}</span>
                    </button>
                </div>
            )}
        </Col>
    );
}
