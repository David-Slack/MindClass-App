import {Badge, Card, Col, Container, Row} from "react-bootstrap";
import styles from "./MagazineCards.module.css";
import Link from "next/link";
import { useState } from "react";

export function MagazineCards({ magazineArticles }) {
    const allCategories = ["All", ...new Set(magazineArticles.map((article) => article.type))];
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredMagazineArticles =
        activeFilter === "All"
            ? magazineArticles
            : magazineArticles.filter((article) => article.type.includes(activeFilter));

    return (
        <Container fluid>
            <Row className={styles.filter}>
                <div>
                {allCategories.map((category) => (
                    <Badge
                        key={category}
                        onClick={() => setActiveFilter(category)}
                        className={`${styles.badge} ${activeFilter === category ? styles.active : ""}`}
                        pill
                    >
                        {category}
                    </Badge>
                ))}
                </div>
            </Row>

            <Row className={styles.articleRow}>
                {magazineArticles.map((article, count) => ( // iterate over magazineArticles
                    <Col
                        className={`
                            NOTmx-auto 
                            ${styles.col} 
                            ${ filteredMagazineArticles.includes(article) ? styles.filteredIn : styles.filteredOut }
                        `}
                        key={article.id}
                        lg={count > 1 ? "3" : "6"}
                    >
                        <Card className={`mx-auto ${styles.card}`} bg={article.colour}>
                            <Card.Body className={styles.body}>
                                <Card.Title className={styles.title}>{article.title}</Card.Title>
                                <Card.Text>
                                    <Badge className={styles.badge} pill>
                                        {article.type}
                                    </Badge>
                                    <span className={styles.arrow}>&rarr;</span>
                                </Card.Text>
                            </Card.Body>
                            <Card.Img src={article.image} className={styles.img} />
                            <Link href={`/magazine/${article.id}`} className="stretched-link"></Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
