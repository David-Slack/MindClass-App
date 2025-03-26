import {Badge, Card, Col, Row} from "react-bootstrap";
import styles from "./MagazineArticles.module.css";
import Link from "next/link";


export function MagazineArticles({ magazineArticles }) {

    return (
        <Row>

            { magazineArticles.map((item, count) => (

                <Col className={`mx-auto ${styles.col}`} key={item.id} lg={count > 1 ? "3" : "6"}>
                    <Card className={`mx-auto ${styles.card}`} bg={item.colour}>
                        <Card.Body  className={styles.body}>
                            <Card.Title className={styles.title}>{item.title}</Card.Title>
                            <Card.Text>
                                <Badge className={styles.badge} pill>{item.type}</Badge>
                                <span className={styles.arrow}>&rarr;</span>
                            </Card.Text>
                        </Card.Body>
                        <Card.Img src={item.image} className={styles.img} />
                        <Link href="/" className="stretched-link"></Link>
                    </Card>
                </Col>

            ))}

        </Row>
    );
}
