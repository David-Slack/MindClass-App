// components/tools/moodTracking/periodicSummaries/graphs/monthlyGraph.js
import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import moment from 'moment';
import "chart.js/auto";
import { Row, Button } from 'react-bootstrap';
import styles from './MonthlyGraph.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure this import is present

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
        maintainAspectRatio: false, // Prevent auto-resizing issues
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

    useEffect(() => {
        getMonths(offset);
    }, [offset]);

    const getMonths = (monthOffset = 0) => {
        const today = moment().add(monthOffset, "months");
        setMonth(today.format("MMMM"));
        const startOfMonth = today.startOf("month").dayOfYear();
        const endOfMonth = today.endOf("month").dayOfYear();
        const year = today.year();

        getData(startOfMonth, endOfMonth, year);
    };

    const getData = async (startOfMonth, endOfMonth, year) => {
        const tempData = [0, 0, 0, 0, 0];

        const dates = input?.filter((item) => {
            const date = moment(item.date, "DD/MM/YYYY");
            const dayOfYear = date.dayOfYear();
            const yearHere = date.year();
            return dayOfYear >= startOfMonth && dayOfYear <= endOfMonth && yearHere === year;
        });

        dates.forEach((item) => {
            tempData[item?.mood - 1] += 1;
        });

        setData({
            labels: ["😢", "🙁", "😐", "🙂", "😄"],
            datasets: [
                {
                    data: tempData,
                    borderWidth: 1,
                    label: "Monthly Stat",
                    fill: true,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.4)",
                        "rgba(255, 159, 64, 0.4)",
                        "rgba(255, 205, 86, 0.4)",
                        "rgba(75, 192, 192, 0.4)",
                        "rgba(115, 171, 132, 0.4)",
                    ],
                    borderColor: [
                        "rgb(255, 99, 132)",
                        "rgb(255, 159, 64)",
                        "rgb(255, 205, 86)",
                        "rgb(75, 192, 192)",
                        "rgba(115, 171, 132)",
                    ],
                },
            ],
        });
    };

    return (
        <div className={styles.container}>
            <Row className={styles.header}>
                <Button onClick={() => setOffset((prev) => prev - 1)} className={styles.navButton}>
                    <i className={`bi bi-chevron-left ${styles.navIcon}`}></i>
                </Button>
                <div className={styles.monthLabel}>{month}</div>
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
