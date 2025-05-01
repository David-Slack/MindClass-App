// components/tools/moodTracking/periodicSummaries/graphs/monthlyGraph.js
import React, { useEffect, useState } from 'react';
import {Bar} from "react-chartjs-2";
import moment from 'moment';
import "chart.js/auto";
import {Row, Button, Col} from 'react-bootstrap';
import styles from '../../MoodTracking.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { DATE_FORMAT, MOOD_COLORS_BACKGROUND, MOOD_COLORS_BORDER, EMOJI_INITIAL_STATE } from '../../utils';

export default function MonthlyGraph({ input }) {
    const [data, setData] = useState({ labels: [], datasets: [] });
    const [month, setMonth] = useState(moment().format("MMMM"));
    const [offset, setOffset] = useState(0);

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: true,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    maxTicksLimit: 31,
                    precision: 0,
                },
            },
        },
    };

    const getMonths = (monthOffset = 0) => {
        const today = moment().add(monthOffset, "months");
        setMonth(today.format("MMMM"));
        const startOfMonth = today.startOf("month").dayOfYear();
        const endOfMonth = today.endOf("month").dayOfYear();
        const year = today.year();

        getData(startOfMonth, endOfMonth, year);
    };

    useEffect(() => {
        getMonths(offset);
    }, [offset, input, getMonths]);

    const getData = async (startOfMonth, endOfMonth, year) => {
        const tempData = [0, 0, 0, 0, 0];

        const dates = input?.filter((item) => {
            const date = moment(item.date, DATE_FORMAT);
            const dayOfYear = date.dayOfYear();
            const yearHere = date.year();
            return dayOfYear >= startOfMonth && dayOfYear <= endOfMonth && yearHere === year;
        });

        dates.forEach((item) => {
            tempData[item?.mood - 1] += 1;
        });

        setData({
            labels: EMOJI_INITIAL_STATE.slice(1), // Use EMOJI_INITIAL_STATE and remove the first empty element
            datasets: [
                {
                    data: tempData,
                    borderWidth: 1,
                    label: "Monthly Stat",
                    fill: true,
                    backgroundColor: MOOD_COLORS_BACKGROUND,
                    borderColor: MOOD_COLORS_BORDER,
                },
            ],
        });
    };

    return (
        <>
            <Row className={styles.header}>
                <Col>{month}</Col>
                <Col  xs="auto">
                    <Button onClick={() => setOffset((prev) => prev - 1)} className={styles.navBtn}>
                        <i className={`bi bi-chevron-left ${styles.navIcon}`}></i>
                    </Button>
                </Col>
                <Col  xs="auto">
                    <Button onClick={() => setOffset(0)} className={styles.primaryBtn}>Now</Button>
                </Col>
                <Col  xs="auto">
                    <Button onClick={() => setOffset((prev) => prev + 1)} className={styles.navBtn}>
                        <i className={`bi bi-chevron-right ${styles.navIcon}`}></i>
                    </Button>
                </Col>
            </Row>

            <Row className={styles.chartContainer}>
                <Bar options={options} data={data} />
            </Row>
        </>
    );
}
