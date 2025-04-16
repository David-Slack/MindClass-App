import { Card, Col, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import styles from "./CounsellorBio.module.css";

export function CounsellorBio({bio}){
    return(
        <>
            <Row className={styles.bioRow}>
                <Col xs={{ span: 12, order: 2 }} xl={{ span: 6, order: 1 }}>
                    <Card className={styles.bioCard}  bg={bio.colour}>
                        <Card.Body>
                            <h2>Get to know me</h2>

                            <p>{bio.beforeReadMore}</p>
                            <p>{bio.bio}</p>
                            <Link
                                className={styles.book}
                                href={bio.meeting_link}
                            >Tap here to book a session</Link>

                        </Card.Body>
                        <span className={`${styles.arrow} cardArrow`}>&rarr;</span>
                        <Link href={bio.meeting_link} className="stretched-link"></Link>
                    </Card>
                </Col>
                <Col xs={{ span: 12, order: 1 }} xl={{ span: 6, order: 2 }}>
                    <Card bg={"white"} className={styles.imgCard}>
                        <Image
                            className={styles.img}
                            src={bio.image}
                            alt={bio.name}
                            width="1600"
                            height="900"
                        />
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xs={12} xl={4}>
                    <h3>Core Specialisms</h3>
                    <ul>
                        {
                            bio.core_specialisms.map((specialism, count) => (
                                <li key={count}>{specialism}</li>
                            ))
                        }
                    </ul>
                </Col>
                <Col xs={12} xl={4}>
                    <h3>Therapy Specialisms</h3>
                    <ul>
                        {
                            bio.therapy_specialisms.map((specialism, count) => (
                                <li key={count}>{specialism}</li>
                            ))
                        }
                    </ul>
                </Col>
                <Col xs={12} xl={4}>
                    <h3>Qualifications</h3>
                    <ul>
                        {
                            bio.training_qualifications.map((qualification, count) => (
                                <li key={count}>{qualification}</li>
                            ))
                        }
                    </ul>
                </Col>
            </Row>
        </>
    )
}