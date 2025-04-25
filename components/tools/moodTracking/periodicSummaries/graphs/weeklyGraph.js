// components/tools/moodTracking/periodicSummaries/graphs/weeklyGraph.js
import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import moment from "moment";
import "chart.js/auto";
import { Row, Button } from 'react-bootstrap';
import styles from './WeeklyGraph.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { DATE_FORMAT, WEEKLY_GRAPH_BACKGROUND_COLOR, WEEKLY_GRAPH_BORDER_COLOR } from '../../utils';

export default function WeeklyGraph({ input }) {
    const [data, setData] = useState({ labels: [], datasets: [] });
    const [week, setWeek] = useState("");
    const [xLabels, setXLabels] = useState([]);
    const [yLabels] = useState(["", "😢", "🙁", "😐", "🙂", "😄"]);
    const [offset, setOffset] = useState(0);

    const options = {
        clip: false,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    callback: function (value) {
                        return window.innerWidth < 500
                            ? xLabels[value]?.slice(0, 5)
                            : xLabels[value];
                    },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                min: 0,
                max: 5,
                labels: yLabels,
                ticks: {
                    stepSize: 1,
                    callback: function (value) {
                        return yLabels[value];
                    },
                },
            },
        },
    };

    useEffect(() => {
        getDates(offset);
    }, [offset, input]);

    const getDates = (weekOffsets = 0) => {
        let tempDays = [];
        const tempDates = [];
        let today = moment().day();
        for (let i = 0; i <= today; i++) {
            const date = moment()
                .add(weekOffsets * 7, "days")
                .subtract(i, "days");
            tempDays.unshift(date.dayOfYear());
            tempDates.unshift(date.format(DATE_FORMAT));
        }
        for (let i = today, j = 1; i < 6; i++, j++) {
            const date = moment().add(j + weekOffsets * 7, "days");
            tempDays.push(date.dayOfYear());
            tempDates.push(date.format(DATE_FORMAT));
        }
        setWeek(
            `${tempDates[0]?.slice(0, 5)} - ${tempDates[tempDates.length - 1]?.slice(
                0,
                5
            )}`
        );
        const year = moment(tempDates[0], DATE_FORMAT).year();
        setXLabels(tempDates);
        getData(tempDays, tempDates, year);
    }

    const getData = async (dates, tempDates, year) => {
        const tempData = [];
        dates.forEach((date) => {
            const temp = input?.filter((item) =>
                moment(item?.date, DATE_FORMAT).dayOfYear() === date &&
                moment(item?.date, DATE_FORMAT).year() === year
            );

            tempData.push(temp?.length > 0 ? temp[0]?.mood : 0);
        });

        setData({
            labels: tempDates,
            datasets: [
                {
                    data: tempData,
                    borderWidth: 1,
                    label: "Weekly Stat",
                    fill: true,
                    tension: 0.4,
                    backgroundColor: WEEKLY_GRAPH_BACKGROUND_COLOR,
                    borderColor: WEEKLY_GRAPH_BORDER_COLOR,
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
                <div className={styles.weekLabel}>{week}</div>
                <Button onClick={() => setOffset(0)} className={styles.nowButton}>Now</Button>
                <Button onClick={() => setOffset((prev) => prev + 1)} className={styles.navButton}>
                    <i className={`bi bi-chevron-right ${styles.navIcon}`}></i>
                </Button>
            </Row>
            <div className={styles.chartContainer}>
                <Line options={options} data={data} />
            </div>
        </div>
    );
}
