import {Col, Row} from "react-bootstrap";
import Link from "next/link";
import styles from "./HomeCourses.module.css";
import { useRef } from "react";
import {CourseCards} from "@/components/cards/courseCards/CourseCards";

export default function HomeCourses({courses}) {
    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -400,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 400,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className={styles.coursesBlock}>
            <Row>
                <Col lg={10}>
                    <h2>Latest Courses </h2>
                    <p>From Mental Health Awareness, to ADHD, Sleep and the Menopause, we’ve got you covered</p>
                </Col>
                <Col className="d-flex flex-column align-items-end justify-content-end">
                    <p><Link className="badge rounded-pill bg-primary" href={'/courses'}>View all</Link></p>
                </Col>
            </Row>
            <Row className="scrollable-container">
                <button className="scroll-button" onClick={scrollLeft}>&lt;</button>
                <Col className="card-group-scroll" ref={scrollContainerRef}>
                    <Row style={{position: 'relative'}}>
                        <CourseCards collection={courses} />
                    </Row>
                </Col>
                <button className="scroll-button" onClick={scrollRight}>&gt;</button>
            </Row>
        </div>
    );
}
