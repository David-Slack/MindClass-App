import {Col, Row} from "react-bootstrap";
import Link from "next/link";
import {MagazineCards} from "@/components/cards/magazineCards/MagazineCards";
import styles from "./HomeMagazine.module.css";

export default function HomeMagazine({articles}) {
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
            <div className="card-group-scroll">
                <MagazineCards magazineArticles={articles} simple={true} className="magazine-cards-flex-row" />
            </div>
        </div>
    );
}
