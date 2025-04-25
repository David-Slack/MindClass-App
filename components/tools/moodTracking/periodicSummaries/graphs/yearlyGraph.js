// components/tools/moodTracking/periodicSummaries/graphs/yearlyGraph.js
import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import moment from 'moment';
import "chart.js/auto";
import { Row, Button } from 'react-bootstrap';
import styles from './YearlyGraph.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure this import is present

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
        maintainAspectRatio: false, // Prevent auto-resizing issues
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
    }, [offset]);

    const getYears = (yearOffset = 0) => {
        const thisYear = moment().year();
        const offsetYear = thisYear + yearOffset;
        setYear(offsetYear.toString());
        getData(offsetYear);
    };

    const getData = async (currentYear) => {
        const dataSets = [];
        const colors = [
            "rgba(255, 99, 132, 0.4)",
            "rgba(255, 159, 64, 0.4)",
            "rgba(255, 205, 86, 0.4)",
            "rgba(75, 192, 192, 0.4)",
            "rgba(115, 171, 132, 0.4)",
        ];
        const borderColor = [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgba(115, 171, 132)",
        ];
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
        const emojis = ["😢", "🙁", "😐", "🙂", "😄"];
        const values = [1, 2, 3, 4, 5];

        for (let i = 0; i < emojis.length; i++) {
            const data = [];
            for (let j = 0; j < months.length; j++) {
                const month = months[j];
                const monthData = input?.filter(
                    (item) =>
                        moment(item?.date, "DD/MM/YYYY").year() === currentYear &&
                        moment(item?.date, "DD/MM/YYYY").month() === j &&
                        item?.mood === values[i]
                );
                data.push(monthData.length);
            }
            dataSets.push({
                label: emojis[i],
                data: data,
                backgroundColor: colors[i],
                borderColor: borderColor[i],
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
