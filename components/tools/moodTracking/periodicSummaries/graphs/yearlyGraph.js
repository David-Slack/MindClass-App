// components/tools/moodTracking/periodicSummaries/graphs/yearlyGraph.js
import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import moment from 'moment';
import "chart.js/auto";
import { Row, Button } from 'react-bootstrap';
import styles from './YearlyGraph.module.css';
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

    useEffect(() => {
        getYears(offset);
    }, [offset, input]);

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

    return (
        <div className={styles.container}>
            <Row className={styles.header}>
                <Button onClick={() => setOffset((prev) => prev - 1)} className={styles.navButton}>
                    <i className={`bi bi-chevron-left ${styles.navIcon}`}></i>
                </Button>
                <div className={styles.yearLabel}>{year}</div>
                <Button onClick={() => setOffset(0)} className={styles.nowButton}>Now</Button>
                <Button onClick={() => setOffset((prev) => prev + 1)} className={styles.navButton}>
                    <i className={`bi bi-chevron-right ${styles.navIcon}`}></i>
                </Button>
            </Row>
            <div className={styles.chartContainer}>
                <Bar options={options} data={data} />
            </div>
        </div>
    );
}
