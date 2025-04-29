// components/tools/moodTracking/periodicSummaries/pixels/yearlyPixels.js
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-hot-toast';
import {Row, Button, Form, Overlay, Tooltip, Modal, Card} from 'react-bootstrap';
import styles from '../../MoodTracking.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { db } from '@/helpers/firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useUser } from '@/helpers/firebase/userContext';
import { getEmoji, getSaying, DATE_FORMAT } from '../../utils';
import { formatDate } from '@/helpers/formatDate';

const YearPicker = ({ currentYear, onYearSelect, onClose }) => {
    const yearsToShow = Array.from({ length: 11 }, (_, i) => parseInt(currentYear) - 5 + i);

    return (
        <div className={styles.yearPicker}>
            {yearsToShow.map(year => (
                <button
                    key={year}
                    className={`${styles.yearOption} ${year === parseInt(currentYear) ? styles.activeYear : ''}`}
                    onClick={() => { onYearSelect(year); onClose(); }}
                >
                    {year}
                </button>
            ))}
            <div className={styles.pickerCloseButton} onClick={onClose}>
                <i className="bi bi-x-lg"></i>
            </div>
        </div>
    );
};

export default function YearlyPixels (){
    const { userData } = useUser();
    const [calendar, setCalendar] = useState([]);
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
    const targetRefs = useRef({});
    const [showYearPicker, setShowYearPicker] = useState(false);
    const yearPickerRef = useRef(null);

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

    const saveEdit = async () => {
        if (!customerId) {
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
                updatedMoodTracker = currentMoodTracker.map((entry, index) =>
                    index === existingIndex ? newMoodEntry : entry
                );
            } else {
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
    }, [offset, showModal === false, customerId]);

    const fetchMoodData = async () => {
        if (!customerId) {
            return;
        }

        try {
            const customerDocRef = doc(db, 'customers', customerId);
            const customerDocSnap = await getDoc(customerDocRef);

            if (customerDocSnap.exists() && customerDocSnap.data()?.moodTracker) {
                const moodTrackerData = customerDocSnap.data().moodTracker;
                generateCalendarFromMoodTracker(moodTrackerData);
            } else {
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
                date: moment().year(currentYear).dayOfYear(i).format(DATE_FORMAT),
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
            const formattedDate = moment().year(currentYear).dayOfYear(i).format(DATE_FORMAT);
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

    const handleYearClick = () => {
        setShowYearPicker(!showYearPicker);
    };

    const handleYearSelect = (selectedYear) => {
        setYear(selectedYear.toString());
        const currentMoment = moment();
        const selectedMoment = moment(selectedYear, 'YYYY');
        setOffset(selectedMoment.diff(currentMoment, 'years'));
        setShowYearPicker(false);
    };

    const closeYearPicker = () => {
        setShowYearPicker(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (yearPickerRef.current && !yearPickerRef.current.contains(event.target) && showYearPicker) {
                closeYearPicker();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showYearPicker]);

    return (
        <Card.Body>

            <Row className={styles.calendarRow} >
                {calendar?.map((day) => (
                    <div
                        key={day?.date}
                        ref={(el) => (targetRefs.current[day?.date] = el)}
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
                            target={targetRefs.current[day?.date]}
                            show={showTooltip && tooltipTarget === targetRefs.current[day?.date]}
                        >
                            {(props) => (
                                <Tooltip {...props}>{formatDate(moment(day?.date, DATE_FORMAT).toISOString(), false, 'medium')}</Tooltip>
                            )}
                        </Overlay>
                    </div>
                ))}
            </Row>

            <Row className={`align-items-center justify-content-center ${styles.navRow}`} >
                <Button onClick={() => setOffset((prev) => prev - 1)} className={styles.navBtn}>
                    <i className={`bi bi-chevron-left`}></i>
                </Button>
                <div ref={yearPickerRef} className={styles.yearContainer} >
                    <Button
                        className={styles.primaryBtn}
                        onClick={handleYearClick}
                    >{year}</Button>
                    {showYearPicker && (
                        <YearPicker
                            currentYear={year}
                            onYearSelect={handleYearSelect}
                            onClose={closeYearPicker}
                        />
                    )}
                </div>
                <Button onClick={() => setOffset((prev) => prev + 1)} className={styles.navBtn}>
                    <i className={`bi bi-chevron-right`}></i>
                </Button>
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
                                <i className={`bi bi-x-circle-fill`} />
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
        </Card.Body>
    );
};
