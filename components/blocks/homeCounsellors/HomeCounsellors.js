import {Col, Row} from "react-bootstrap";
import Link from "next/link";
import styles from "./HomeCounsellors.module.css";
import { useRef } from "react";
import {CounsellorCards} from "@/components/cards/counsellorCards/CounsellorCards";

export default function HomeCounsellors({courses}) {
    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -426,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 426,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className={styles.counsellorsBlock}>
            <Row>
                <Col lg={10}>
                    <h2>Counsellors</h2>
                    <p>Need someone to talk to without judgement? Browse our team of expert therapists</p>
                </Col>
                <Col className="d-flex flex-column align-items-end justify-content-end">
                    <p><Link className="badge rounded-pill bg-primary" href={'/counsellors'}>Find out more</Link></p>
                </Col>
            </Row>
            <Row className={`scrollable-container ${styles.scrollableContainer}`}>
                <button className={`scroll-button ${styles.scrollBtn}`} onClick={scrollLeft}>&lt;</button>
                <Col className="card-group-scroll" ref={scrollContainerRef}>
                    <CounsellorCards collection={courses} />
                </Col>
                <button className={`scroll-button ${styles.scrollBtn}`} onClick={scrollRight}>&gt;</button>
            </Row>
        </div>
    );
}
