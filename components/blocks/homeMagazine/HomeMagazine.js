import {Col, Row} from "react-bootstrap";
import Link from "next/link";
import {MagazineCards} from "@/components/cards/magazineCards/MagazineCards";
import styles from "./HomeMagazine.module.css";
import { useRef } from "react";

export default function HomeMagazine({articles}) {
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
        <div className={styles.magazineBlock}>
            <Row>
                <Col>
                    <h2>Latest Magazine articles </h2>
                    <p>From interviews, to articles, tips and insights - grab a brew and read it through</p>
                </Col>
                <Col className="d-flex flex-column align-items-end justify-content-end">
                    <p><Link href={'/magazine'}>View all</Link></p>
                </Col>
            </Row>
            <div className="scrollable-container">
                <button className="scroll-button" onClick={scrollLeft}>&lt;</button>
                <div className="card-group-scroll" ref={scrollContainerRef}>
                    <MagazineCards magazineArticles={articles} simple={true} />
                </div>
                <button className="scroll-button" onClick={scrollRight}>&gt;</button>
            </div>
        </div>
    );
}
