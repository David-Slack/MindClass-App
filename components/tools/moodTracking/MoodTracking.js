// components/tools/MoodTracking/MoodTracking.js
import React, { useEffect, useRef, useState } from "react";
import {Col, Row, Button, Form, FloatingLabel, Card} from "react-bootstrap";
import toast from "react-hot-toast";
import ConfettiExplosion from 'react-confetti-explosion';
import YearlyPixels from "./periodicSummaries/pixels/yearlyPixels";
import WeeklyGraph from "./periodicSummaries/graphs/weeklyGraph";
import MonthlyGraph from "./periodicSummaries/graphs/monthlyGraph";
import YearlyGraph from "./periodicSummaries/graphs/yearlyGraph";
import styles from "./MoodTracking.module.css";
import { db } from '@/helpers/firebase/firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useUser } from '@/helpers/firebase/userContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { getEmoji, getSaying, DEFAULT_MOOD_VALUE, DATE_FORMAT } from './utils';
import moment from 'moment';

const defaultMood = () => DEFAULT_MOOD_VALUE;

export default function MoodTracking() {
    const { userData } = useUser();
    const [currentMood, setCurrentMood] = useState(defaultMood());
    const [currentNote, setCurrentNote] = useState('');
    const textAreaRef = useRef(null);
    const [moodEntries, setMoodEntries] = useState([]);
    const [explode, setExplode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const customerId = userData?.customerData?.uid;

    const presentNotificationToast = (message) => {
        toast(message, {
            id: 'notificationToast',
            icon: getEmoji(currentMood),
        });
    };

    useEffect(() => {
        const fetchMoodData = async () => {
            if (!customerId) {
                return;
            }
            try {
                const customerDocRef = doc(db, 'customers', customerId);
                const customerDocSnap = await getDoc(customerDocRef);
                if (customerDocSnap.exists() && customerDocSnap.data()?.moodTracker) {
                    setMoodEntries(customerDocSnap.data().moodTracker);
                } else {
                    setMoodEntries([]);
                }
            } catch (error) {
                console.error("Error fetching mood data:", error);
                setMoodEntries([]);
            }
        };

        fetchMoodData();
    }, [customerId]);

    useEffect(() => {
        if (moodEntries?.length > 0) {
            const today = moment().format(DATE_FORMAT);
            const todayEntry = moodEntries.find((entry) => entry?.date === today);
            if (todayEntry) {
                setCurrentMood(todayEntry?.mood);
                setCurrentNote(todayEntry?.note);
            } else {
                setCurrentMood(defaultMood());
                setCurrentNote('');
            }
        } else {
            setCurrentMood(defaultMood());
            setCurrentNote('');
        }
    }, [moodEntries]);

    const saveMood = async () => {
        if (!customerId || isSaving) {
            return;
        }

        setIsSaving(true);
        setExplode(true);
        presentNotificationToast('Mood saved');

        try {
            const customerDocRef = doc(db, 'customers', customerId);
            const today = moment().format(DATE_FORMAT);
            const newMoodEntry = { date: today, mood: currentMood, note: currentNote };

            const customerDocSnap = await getDoc(customerDocRef);
            const existingMoodTracker = customerDocSnap.data()?.moodTracker || [];
            const existingIndex = existingMoodTracker.findIndex(entry => entry.date === today);

            if (existingIndex > -1) {
                const updatedMoodTracker = existingMoodTracker.map((entry, index) =>
                    index === existingIndex ? newMoodEntry : entry
                );
                await updateDoc(customerDocRef, { moodTracker: updatedMoodTracker });
            } else {
                await updateDoc(customerDocRef, { moodTracker: arrayUnion(newMoodEntry) });
            }

            const updatedDocSnap = await getDoc(customerDocRef);
            if (updatedDocSnap.exists() && updatedDocSnap.data()?.moodTracker) {
                setMoodEntries(updatedDocSnap.data().moodTracker);
            }

            setSaveMessage('Mood saved! Come back tomorrow to save again.');
            setTimeout(() => {
                setSaveMessage('');
                setIsSaving(false);
                setExplode(false);
            }, 3000);

        } catch (error) {
            console.error("Error saving mood:", error);
            toast.error("Failed to save mood.");
            setIsSaving(false);
            setExplode(false);
        }
    };

    const scrollMood = (value) => {
        const newMood = currentMood + value;
        if (newMood > 5) {
            setCurrentMood(5);
        } else if (newMood < 1) {
            setCurrentMood(1);
        } else {
            setCurrentMood(newMood);
        }
    };

    return (
        <>
            <Col md={6}>
                <Card className={`align-items-center justify-content-center ${styles.card}`}>
                    <Card.Body>
                        {/*<Card.Title><h3>Update your current mood</h3></Card.Title>*/}

                            <Row className="align-items-center justify-content-center">
                                <Col xs="auto">
                                    <Button onClick={() => scrollMood(-1)} className={styles.navBtn}>
                                        <i className="bi bi-chevron-left"></i>
                                    </Button>
                                </Col>
                                <Col xs="auto" className="text-center">
                                    <div style={{ fontSize: '90px' }}>{getEmoji(currentMood)}</div>
                                </Col>
                                <Col xs="auto">
                                    <Button onClick={() => scrollMood(1)} className={styles.navBtn}>
                                        <i className="bi bi-chevron-right"></i>
                                    </Button>
                                </Col>
                            </Row>

                            <Row className="align-items-center justify-content-center">
                                <h4 className={styles.h4}>{getSaying(currentMood)} today{currentNote ? ', because' : ''}</h4>
                            </Row>

                        <Row className={`align-items-center justify-content-center ${styles.noteRow}`}>
                            <Col xs="auto">
                            {!currentNote ? (

                                    <Button
                                        className={styles.noteBtn}
                                        onClick={() => setCurrentNote(' ')}
                                    >
                                        Add a note <i className="bi bi-plus-square-fill ms-2" style={{ fontSize: '18px' }}></i>
                                    </Button>

                            ) : (
                                <>
                                    <FloatingLabel controlId="floatingTextarea" label="What made you feel this way?">
                                        <Form.Control
                                            as="textarea"
                                            ref={textAreaRef}
                                            placeholder="What made you feel this way?"
                                            autoCorrect="on"
                                            autoCapitalize="sentences"
                                            value={currentNote}
                                            onChange={(e) => setCurrentNote(e.target.value)}
                                            rows={3}
                                            className={styles.noteTextarea}
                                        />
                                    </FloatingLabel>
                                    {currentNote && (
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            className={styles.noteBtn}
                                            onClick={() =>
                                                setCurrentNote('')}>
                                            <i className="bi bi-x-circle-fill me-2" style={{ fontSize: '18px' }}></i> Clear note
                                        </Button>
                                    )}
                                </>
                            )}
                            </Col>
                        </Row>

                        <Row className="align-items-center justify-content-center">

                            <div className={styles.confettiWrapper}>
                                {explode && (
                                    <ConfettiExplosion
                                        active={explode.toString()}
                                        config={{
                                            duration: 2000,
                                            width: 200,
                                            height: 200,
                                            particleCount: 150,
                                            x: 0.5,
                                            y: 0.5,
                                        }}
                                    />
                                )}
                            </div>
                            <Button
                                onClick={saveMood}
                                disabled={isSaving}
                                className={styles.primaryBtn}
                            >
                                {isSaving ? 'Saving...' : 'Save mood'}
                            </Button>

                            {saveMessage && <p className="mt-3 text-center text-success">{saveMessage}</p>}
                        </Row>
                    </Card.Body>
                </Card>

                {/*Year Pixels */}
                <Card className={`${styles.card} ${styles.cardPixels}`}>
                    <Card.Body>
                        {/*<h2>Your year in pixels</h2>*/}
                        <YearlyPixels />
                        <p>Your year in pixels - each square represents one day. Click a day to change it.</p>
                    </Card.Body>
                </Card>
            </Col>

            {/*Graphs*/}
{/*            <Col md={6}>
                <Card>
                    <Card.Body>
                        <h2>Weekly</h2>
                        <WeeklyGraph input={moodEntries} />

                        <div className="my-4"></div>
                        <h2>Monthly</h2>
                        <MonthlyGraph input={moodEntries} />

                        <div className="my-4"></div>
                        <h2>Yearly</h2>
                        <YearlyGraph input={moodEntries} />

                    </Card.Body>
                </Card>
            </Col>*/}

        </>
    );
}
