// components/tools/MoodTracking/MoodTracking.js
import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Button, Form, FloatingLabel } from "react-bootstrap";
import toast from "react-hot-toast";
import ConfettiExplosion from 'react-confetti-explosion';
import YearlyPixels from "./periodicSummaries/pixels/yearlyPixels";
import WeeklyGraph from "./periodicSummaries/graphs/weeklyGraph";
import MonthlyGraph from "./periodicSummaries/graphs/monthlyGraph";
import YearlyGraph from "./periodicSummaries/graphs/yearlyGraph";
import styles from "./MoodTracking.module.css";
import { db } from '@/helpers/firebase/firebase'; // Import the Firestore database instance
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'; // Import Firestore functions
import { useUser } from '@/helpers/firebase/userContext'; // Import the userContext hook
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure this import is present

const defaultMood = () => 4;
const defaultNote = () => '';

function getEmoji(mood) {
    if (mood === -1) return "🤔";
    const emoji = [
        "😢", "🙁", "😐", "🙂", "😄"
    ];
    return emoji[mood - 1];
}

function getSaying(mood) {
    if (mood === -1) return "No mood recorded yet";
    const saying = [
        "Feeling awful",
        "Feeling down",
        "Feeling fine",
        "Feeling good",
        "Feeling great"
    ];
    return saying[mood - 1];
}

export default function MoodTracking() {
    const { userData } = useUser(); // Use the userContext hook to get userData
    const [filter, setFilter] = useState("Today");
    const [currentMood, setCurrentMood] = useState(defaultMood());
    const [currentNote, setCurrentNote] = useState(defaultNote());
    const textAreaRef = useRef(null);
    const [hoverTag, setHoverTag] = useState(null);
    const [moodEntries, setMoodEntries] = useState([]);
    const [explode, setExplode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const customerId = userData?.customerData?.uid; // Assuming UID is nested here

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
            const today = new Date().toLocaleDateString("en-GB");
            const todayEntry = moodEntries.find((entry) => entry?.date === today);
            if (todayEntry) {
                setCurrentMood(todayEntry?.mood);
                setCurrentNote(todayEntry?.note);
            } else {
                setCurrentMood(defaultMood());
                setCurrentNote(defaultNote());
            }
        } else {
            setCurrentMood(defaultMood());
            setCurrentNote(defaultNote());
        }
    }, [moodEntries, filter]);

    const saveMood = async () => {
        if (!customerId || isSaving) { // Disable if saving or no customerId
            return;
        }

        setIsSaving(true);
        setExplode(true); // Trigger confetti
        presentNotificationToast('Mood saved');

        try {
            const customerDocRef = doc(db, 'customers', customerId);
            const today = new Date().toLocaleDateString("en-GB");
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

            // Re-fetch data
            const updatedDocSnap = await getDoc(customerDocRef);
            if (updatedDocSnap.exists() && updatedDocSnap.data()?.moodTracker) {
                setMoodEntries(updatedDocSnap.data().moodTracker);
            }

            setSaveMessage('Mood saved! Come back tomorrow to save again.');
            setTimeout(() => {
                setSaveMessage('');
                setIsSaving(false);
            }, 3000); // Clear message and enable button after 3 seconds

        } catch (error) {
            console.error("Error saving mood:", error);
            toast.error("Failed to save mood.");
            setIsSaving(false); // Re-enable button on error
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
            <Row className="mb-4 mt-3 mt-md-5 justify-content-center">
                {["Today", "My Year", "Insights"].map((localFilter) => (
                    <Col xs="auto" key={localFilter} className="px-0">
                        <Button
                            onClick={() => setFilter(localFilter)}
                            onMouseEnter={() => setHoverTag(localFilter)}
                            onMouseLeave={() => setHoverTag(null)}
                            className={`${styles.filterTag} ${filter === localFilter ? styles.active : ''} ${hoverTag === localFilter ? styles.hover : ''}`}
                        >
                            {localFilter.toUpperCase()}
                        </Button>
                    </Col>
                ))}
            </Row>

            {filter === "Today" && (
                <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={5} className="mt-3 position-relative">
                        <div className={styles.moodCard}>
                            <h2 className="mb-3">Update your current mood</h2>
                            <Row className="align-items-center justify-content-center mb-3">
                                <Col xs="auto">
                                    <Button variant="light" className={styles.moodButton} onClick={() => scrollMood(-1)}>
                                        <i className="bi bi-chevron-left" style={{ fontSize: '24px', color: '#000' }}></i>
                                    </Button>
                                </Col>
                                <Col xs="auto" className="text-center">
                                    <div style={{ fontSize: '90px' }}>{getEmoji(currentMood)}</div>
                                </Col>
                                <Col xs="auto">
                                    <Button variant="light" className={styles.moodButton} onClick={() => scrollMood(1)}>
                                        <i className="bi bi-chevron-right" style={{ fontSize: '24px', color: '#000' }}></i>
                                    </Button>
                                </Col>
                            </Row>
                            <p className="text-center mb-2">
                                {getSaying(currentMood)} today{currentNote ? ', because' : ''}
                            </p>
                            {!currentNote ? (
                                <Button variant="outline-secondary" className="w-50 rounded-pill mx-auto mt-3 mb-3" onClick={() => setCurrentNote(' ')}>
                                    Add a note <i className="bi bi-plus-square-fill ms-2" style={{ fontSize: '1.2em' }}></i>
                                </Button>
                            ) : (
                                <div className="mb-3">
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
                                        <Button variant="outline-secondary" size="sm" className="mt-2" onClick={() => setCurrentNote('')}>
                                            <i className="bi bi-x-circle-fill me-2" style={{ fontSize: '16px' }}></i> Clear note
                                        </Button>
                                    )}
                                </div>
                            )}
                            <div className={styles.confettiWrapper}>

                                    {explode && (
                                        <ConfettiExplosion
                                            active={explode}
                                            setActive={setExplode}
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
                                variant="primary"
                                onClick={saveMood}
                                className="w-100 rounded-pill"
                            >
                                {isSaving ? 'Saving...' : 'Save mood'}
                            </Button>
                            {saveMessage && <p className="mt-3 text-center text-success">{saveMessage}</p>}
                        </div>
                    </Col>
                </Row>
            )}

            {filter === "My Year" && (
                <Row className="justify-content-center mt-3">
                    <Col md={8} lg={6} xl={5}>
                        <div className={styles.periodicCard}>
                            <h2>Your year in pixels</h2>
                            <YearlyPixels input={moodEntries} />
                        </div>
                    </Col>
                </Row>
            )}

            {filter === "Insights" && (
                <Row className="justify-content-center mt-3">
                    <Col md={8} lg={6} xl={5}>
                        <div className={styles.periodicCard}>
                            <h2>Weekly</h2>
                            <WeeklyGraph input={moodEntries} />
                            <div className="my-4"></div>
                            <h2>Monthly</h2>
                            <MonthlyGraph input={moodEntries} />
                            <div className="my-4"></div>
                            <h2>Yearly</h2>
                            <YearlyGraph input={moodEntries} />
                            <div className="my-4"></div>
                        </div>
                    </Col>
                </Row>
            )}
        </>
    );
}