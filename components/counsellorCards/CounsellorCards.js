import { Card, CardGroup, Container, Row } from "react-bootstrap";
import styles from "./CounsellorCards.module.css";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image

export function CounsellorCards({ collection }) {
    return (
        <Container fluid>
            <Row>
                <CardGroup>

                    {collection.map((counsellor) => (
                        <Card>
                            <Card.Body>
                                <Card.Title>{counsellor.name}</Card.Title>
                                <Card.Text>
                                    {counsellor.homepageText}
                                </Card.Text>
                            </Card.Body>
                            <Image
                                src={counsellor.image}
                                alt={counsellor.name}
                                className={styles.img}
                                fill={true}
                                priority={collection.indexOf(counsellor) < 2} // Prioritize the first few
                            />
                            <span className={styles.arrow}>&rarr;</span>
                            <Link href={`/counsellors/${counsellor.id}`} className="stretched-link"></Link>
                        </Card>
                    ))}

                </CardGroup>
            </Row>
        </Container>
    );
}
