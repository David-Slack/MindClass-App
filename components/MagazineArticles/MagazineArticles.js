import {Badge, Card, Col, Row} from "react-bootstrap";
import styles from "./MagazineArticles.module.css";
import Link from "next/link";
import {useEffect} from "react";

// TODO: Get an array of tags

export function MagazineArticles({ magazineArticles }) {

    useEffect(()=>{

        // Remove active from the filter links
        // Make the link active

        // Create a backup of the magazineArticles
        // Pass in the filter
        // Find all cards with the filter as a tag
        // Remove them from magazineArticles
        // Update the map

    });

    return (
        <>
            <Row className={styles.filter}>Filter by:</Row>
            <Row className={styles.filter}>

                <Badge className={`${styles.active} ${styles.badge}`} pill>All</Badge>
                <Badge className={styles.badge} pill>Tags</Badge>
                <Badge className={styles.badge} pill>Interviews</Badge>
            </Row>

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
        </>
    );
}
