import {Badge, Card, Col, Container, Row} from "react-bootstrap";
import styles from "./CourseCards.module.css";
import Link from "next/link";
import {minutesToHoursMinutes} from "@/helpers/minutesToHoursMinutes";

export function CourseCards({ collection }) {

    return (
        <Container fluid>
            <Row>
                {collection.map((card) => (
                    <Col
                        className={`${styles.col}`}
                        key={card.id}
                        lg={3}
                    >
                        <Card className={`mx-auto ${styles.card}`}>
                            <Card.Img src={card.image} className={styles.img} />
                            <Card.Body className={styles.body}>
                                <Card.Title className={styles.title}>{card.title}</Card.Title>
                                <Badge className={styles.lessons} pill>
                                    {
                                        // We do not have lessons in the DB
                                        card?.lessons > 1
                                            ? `${card?.lessons} lessons`
                                            : `1 lesson`
                                    }
                                </Badge>
                                <span className={styles.arrow}>&rarr;</span>
                                <Card.Text className={styles.cardText}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                                    </svg>&nbsp;
                                    {
                                        // We do not have a duration in the DB
                                        card?.duration > 59
                                            ? minutesToHoursMinutes( card?.duration )
                                            : `1h 15m`
                                    }
                                </Card.Text>
                            </Card.Body>
                            <Link href={`/courses/${card.id}`} className="stretched-link"></Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
