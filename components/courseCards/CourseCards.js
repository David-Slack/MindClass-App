import {Badge, Card, Col, Container, Row} from "react-bootstrap";
import styles from "./CourseCards.module.css";
import Link from "next/link";

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
                        <Card className={`mx-auto ${styles.card}`} bg={card.colour}>
                            <Card.Body className={styles.body}>
                                <Card.Title className={styles.title}>{card.title}</Card.Title>
                                <Card.Text>
                                    <Badge className={styles.badge} pill>
                                        {card.type}
                                    </Badge>
                                    <span className={styles.arrow}>&rarr;</span>
                                </Card.Text>
                            </Card.Body>
                            <Card.Img src={card.image} className={styles.img} />
                            <Link href={`/courses/${card.id}`} className="stretched-link"></Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
