// components/tools/moodTracking/periodicSummaries/pixels/yearlyPixels.js
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-hot-toast';
import { Row, Button, Form, Overlay, Tooltip, Modal } from 'react-bootstrap';
import styles from './YearlyPixels.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { db } from '@/helpers/firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useUser } from '@/helpers/firebase/userContext';

export default function YearlyPixels ({ input }){
    const { userData } = useUser();
    const [calendar, setCalendar] = useState([]);
    const [daysOfYear] = useState(moment().year() % 400 ? (moment().year() % 100 ? 365 : 366) : 365);
    const [showModal, setShowModal] = useState(false);
    const [modalMood, setModalMood] = useState(-1);
    const [modalDate, setModalDate] = useState("");
    const [modalNotes, setModalNotes] = useState("");
    const textAreaRef = useRef(null);
    const [year, setYear] = useState(moment().year().toString());
    const [offset, setOffset] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [tooltipTarget, setTooltipTarget] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);

    const customerId = userData?.customerData?.uid;

    const presentNotificationToast = (message) => {
        toast(message, {
            id: 'notificationToast',
            icon: getEmoji(modalMood),
        });
    }

    function closeModal() {
        setTimeout(() => {
            setShowModal(false);
            clearTemps();
        }, 10);
    }

    function clearTemps() {
        setModalMood(-1);
        setModalDate("");
        setModalNotes("");
        setIsEditing(false);
    }

    function setTemps(date, mood, notes) {
        setModalDate(date);
        setModalMood(mood);
        setModalNotes(notes);
    }

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
            "You said you felt awful",
            "You said you felt down",
            "You said you felt fine",
            "You said you felt good",
            "You said you felt great"
        ];
        return saying[mood - 1];
    }

    const saveEdit = async () => {
        if (!customerId) {
            console.error("Customer ID not available.");
            return;
        }

        try {
            const customerDocRef = doc(db, 'customers', customerId);
            const customerDocSnap = await getDoc(customerDocRef);
            const currentMoodTracker = customerDocSnap.data()?.moodTracker || [];

            const existingIndex = currentMoodTracker.findIndex(entry => entry.date === modalDate);

            let updatedMoodTracker;
            const newMoodEntry = { date: modalDate, mood: modalMood === -1 ? 1 : modalMood, note: modalNotes };

            if (existingIndex > -1) {
                // Update existing entry
                updatedMoodTracker = currentMoodTracker.map((entry, index) =>
                    index === existingIndex ? newMoodEntry : entry
                );
            } else {
                // Add new entry
                updatedMoodTracker = [...currentMoodTracker, newMoodEntry];
            }

            await updateDoc(customerDocRef, { moodTracker: updatedMoodTracker });
            presentNotificationToast("Mood updated");
            closeModal();
            fetchMoodData();
        } catch (error) {
            console.error("Error updating mood:", error);
            toast.error("Failed to update mood.");
        }
    };

    useEffect(() => {
        const thisYear = moment().year();
        const offsetYear = thisYear + offset;
        setYear(offsetYear?.toString());
        fetchMoodData();
    }, [offset, showModal === false, customerId]); // Added customerId as a dependency

    const fetchMoodData = async () => {
        console.log("Fetching mood data");
        if (!customerId) {
            console.log("Customer ID is not available, skipping fetch.");
            return;
        }

        try {
            const customerDocRef = doc(db, 'customers', customerId);
            const customerDocSnap = await getDoc(customerDocRef);

            console.log("Document snapshot exists:", customerDocSnap.exists());

            if (customerDocSnap.exists()) {
                const data = customerDocSnap.data();
                console.log("Document data:", data);
                if (data?.moodTracker) {
                    const moodTrackerData = data.moodTracker;
                    console.log('moodTracker data found:', moodTrackerData);
                    generateCalendarFromMoodTracker(moodTrackerData); // Call the new function
                } else {
                    console.log("moodTracker data is missing or undefined in the document.");
                    generateEmptyCalendar();
                }
            } else {
                console.log("Document for customer ID does not exist.");
                generateEmptyCalendar();
            }
        } catch (error) {
            console.error("Error fetching mood data:", error);
            generateEmptyCalendar();
        }
    };

    const getColorClass = (moodNumber) => {
        if (moodNumber === -1) return styles['moodPixel-minus-1'];
        return styles[`moodPixel-${moodNumber}`];
    };

    const generateEmptyCalendar = () => {
        const currentYear = moment().year() + offset;
        const daysInCurrentYear = moment([currentYear]).isLeapYear() ? 366 : 365;
        const yearCalendar = [];
        for (let i = 1; i <= daysInCurrentYear; i++) {
            yearCalendar.push({
                date: moment().year(currentYear).dayOfYear(i).format('DD/MM/YYYY'),
                note: "",
                color: -1,
                mood: -1
            });
        }
        setCalendar(yearCalendar);
    };

    const generateCalendarFromMoodTracker = (moodTrackerData) => {
        const yearCalendar = [];
        const currentYear = moment().year() + offset;
        const daysInCurrentYear = moment([currentYear]).isLeapYear() ? 366 : 365;
        const moodsByDate = moodTrackerData.reduce((acc, entry) => {
            acc[entry.date] = entry;
            return acc;
        }, {});

        for (let i = 1; i <= daysInCurrentYear; i++) {
            const formattedDate = moment().year(currentYear).dayOfYear(i).format('DD/MM/YYYY');
            const moodEntry = moodsByDate[formattedDate];
            if (moodEntry) {
                yearCalendar.push({
                    date: formattedDate,
                    note: moodEntry.note || "",
                    color: moodEntry.mood || -1,
                    mood: moodEntry.mood || -1,
                });
            } else {
                yearCalendar.push({
                    date: formattedDate,
                    note: "",
                    color: -1,
                    mood: -1,
                });
            }
        }
        setCalendar(yearCalendar);
    };

    async function scrollMood(value) {
        setIsEditing(true);
        if (modalMood + value > 5) {
            setModalMood(5);
        } else if (modalMood + value < 1) {
            setModalMood(1);
        } else {
            setModalMood(modalMood + value);
        }
    }

    return (
        <div className={styles.container}>
            <Row className={styles.header}>
                <Button onClick={() => setOffset((prev) => prev - 1)} className={styles.navButton}>
                    <i className={`bi bi-chevron-left ${styles.navIcon}`}></i>
                </Button>
                <Button className={styles.yearButton} onClick={() => setOffset(0)}>{year}</Button>
                <Button onClick={() => setOffset((prev) => prev + 1)} className={styles.navButton}>
                    <i className={`bi bi-chevron-right ${styles.navIcon}`}></i>
                </Button>
            </Row>
            <Row className={styles.calendarRow}>
                {calendar?.map((day, i) => (
                    <div
                        key={day?.date}
                        ref={tooltipTarget === day?.date ? setTooltipTarget : null}
                        className={`${styles.dayPixel} ${getColorClass(day?.color)} ${day?.date === moment().format('DD/MM/YYYY') ? styles.todayPixel : ''}`}
                        onMouseEnter={(event) => {
                            setTooltipTarget(event.target);
                            setShowTooltip(true);
                        }}
                        onMouseLeave={() => setShowTooltip(false)}
                        onClick={() => { setTemps(day?.date, day?.mood, day?.note); setShowModal(true) }}
                    >
                        <Overlay
                            placement="top"
                            target={tooltipTarget}
                            show={showTooltip && tooltipTarget === i}
                        >
                            {(props) => (
                                <Tooltip {...props}>{day?.date}</Tooltip>
                            )}
                        </Overlay>
                    </div>
                ))}
            </Row>

            <Modal show={showModal} onHide={() => { setShowModal(false); clearTemps() }} centered>
                <Modal.Body className={styles.modal}>
                    <Row className={styles.modalHeader}>
                        <Button onClick={() => scrollMood(-1)} className={styles.modalNavButton}>
                            <i className={`bi bi-chevron-left ${styles.navIcon}`}></i>
                        </Button>
                        <div className={styles.modalEmoji}>{getEmoji(modalMood)}</div>
                        <Button onClick={() => scrollMood(1)} className={styles.modalNavButton}>
                            <i className={`bi bi-chevron-right ${styles.navIcon}`}></i>
                        </Button>
                    </Row>
                    <div className={styles.modalSaying}>
                        {getSaying(modalMood)}{modalNotes === '' || modalNotes === undefined ? null : ', because'}
                    </div>
                    {modalNotes === "" || modalNotes === undefined ? (
                        <Button className={styles.modalAddNoteButton} onClick={() => setModalNotes(' ')}>
                            Add a note <i className={`bi bi-plus-square-fill ms-2`} style={{ fontSize: '1.2em' }}></i>
                        </Button>
                    ) : (
                        <div style={{ position: 'relative' }}>
                            <Form.Control
                                as="textarea"
                                ref={textAreaRef}
                                placeholder="What made you feel this way?"
                                autoCorrect="on"
                                autoCapitalize="sentences"
                                value={modalNotes}
                                onChange={(e) => setModalNotes(e.target.value)}
                                rows={3}
                                className={styles.modalNoteTextarea}
                            />
                            <Button
                                onClick={() => setModalNotes('')}
                                className={styles.modalClearNoteButton}
                            >
                                <i className={`bi bi-x-circle-fill`} size={20} />
                            </Button>
                        </div>
                    )}

                    {isEditing && (
                        <Button
                            onClick={() => { saveEdit() }}
                            className={styles.modalSaveButton}
                        >
                            Save mood
                        </Button>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};
