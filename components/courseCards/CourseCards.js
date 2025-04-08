import {Badge, Card, Col, Container, Row} from "react-bootstrap";
import styles from "./CourseCards.module.css";
import Link from "next/link";

export function CourseCards({ collection }) {

    const formatDuration = "1h 20m";

    /*const totalDuration = (modules || [])?.reduce((acc, module) => {
        const duration = module?.estimated_length;
        let totalMinutes = 0;

        if (duration && typeof duration === "string") {
            const parts = duration.split(" ");

            parts.forEach((part) => {
                if (part.includes("h") && !isNaN(parseInt(part))) {
                    totalMinutes += parseInt(part) * 60; // Convert hours to minutes
                } else if (part.includes("m") && !isNaN(parseInt(part))) {
                    totalMinutes += parseInt(part); // Add minutes directly
                }
            });
        }

        return acc + totalMinutes;
    }, 0);

    const formattedDuration = formatDuration(totalDuration);

    const formatDuration = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        let result = "";
        if (hours > 0) {
            result += `${hours}h `;
        }
        if (minutes > 0 || hours === 0) {
            result += `${minutes}m`;
        }

        return result.trim();
    };*/

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
                                <Badge className={styles.sessions} pill>
                                    {
                                        card.modules?.length > 1
                                            ? `${card.modules?.length} sessions`
                                            : `1 session`
                                    }
                                </Badge>
                                <span className={styles.arrow}>&rarr;</span>
                                <Card.Text>
                                    {formatDuration}
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
