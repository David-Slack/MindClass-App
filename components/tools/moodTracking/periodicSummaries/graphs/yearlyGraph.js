// components/tools/moodTracking/periodicSummaries/graphs/yearlyGraph.js
import React, { useEffect, useState } from 'react';
import {Bar} from "react-chartjs-2";
import moment from 'moment';
import "chart.js/auto";
import {Row, Button, Col} from 'react-bootstrap';
import styles from '../../MoodTracking.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { getEmoji, MOOD_SCALE, DATE_FORMAT, MOOD_COLORS_BACKGROUND, MOOD_COLORS_BORDER } from '../../utils';

export default function YearlyGraph({ input }) {
    const [data, setData] = useState({ labels: [], datasets: [] });
    const [year, setYear] = useState(moment().year().toString());
    const [offset, setOffset] = useState(0);

    const options = {
        plugins: {
            legend: {
                display: true,
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
                grid: {
                    display: false,
                },
                beginAtZero: true,
                ticks: {
                    maxTicksLimit: 31,
                    precision: 0,
                },
            },
        },
    };

    const getYears = (yearOffset = 0) => {
        const thisYear = moment().year();
        const offsetYear = thisYear + yearOffset;
        setYear(offsetYear.toString());
        getData(offsetYear);
    };

    const getData = async (currentYear) => {
        const dataSets = [];
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        for (let i = 0; i < MOOD_SCALE.length; i++) {
            const moodValue = MOOD_SCALE[i];
            const emoji = getEmoji(moodValue);
            const data = [];
            for (let j = 0; j < months.length; j++) {
                const monthData = input?.filter(
                    (item) =>
                        moment(item?.date, DATE_FORMAT).year() === currentYear &&
                        moment(item?.date, DATE_FORMAT).month() === j &&
                        item?.mood === moodValue
                );
                data.push(monthData.length);
            }
            dataSets.push({
                label: emoji,
                data: data,
                backgroundColor: MOOD_COLORS_BACKGROUND[i],
                borderColor: MOOD_COLORS_BORDER[i],
                borderWidth: 1,
            });
        }

        setData({
            labels:
                window.innerWidth < 500
                    ? months.map((month) => month.slice(0, 1))
                    : months,
            datasets: dataSets,
        });
    };

    useEffect(() => {
        getYears(offset);
    }, [offset, input, getYears]);

    return (
        <>
            <Row className={styles.header}>
                <Col>{year}</Col>
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
