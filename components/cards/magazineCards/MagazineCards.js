import {Badge, Card, Col, Row} from "react-bootstrap";
import styles from "./MagazineCards.module.css";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export function MagazineCards({ magazineArticles, simple=false }) {
    const allCategories = ["All", ...new Set(magazineArticles.map((article) => article.type))];
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredMagazineArticles =
        activeFilter === "All"
            ? magazineArticles
            : magazineArticles.filter((article) => article.type.includes(activeFilter));

    return (
        <>
            {!simple &&
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
            }

            <Row className={styles.articleRow}>
                {magazineArticles.map((article, count) => (
                    <Col
                        className={`
                            NOTmx-auto 
                            ${styles.col} 
                            ${ filteredMagazineArticles.includes(article) ? styles.filteredIn : styles.filteredOut }
                        `}
                        key={article.id}
                        lg={
                            !simple && count <= 1 ?
                                 "6" // No XL card
                                //count === 6 ? 12 : "3" // An XL card
                                : "3"
                        }
                    >
                        <Card className={`mx-auto ${styles.card}`} bg={article.colour}>
                            <Card.Body className={styles.body}>
                                <Card.Title className={styles.title}>{article.title}</Card.Title>
                                <Card.Text>
                                    <Badge className={styles.badge} pill>
                                        {article.type}
                                    </Badge>
                                    <span className={`${styles.arrow} cardArrow`}>&rarr;</span>
                                </Card.Text>
                            </Card.Body>
                            <Image
                                src={article.image}
                                alt={article.title}
                                className={styles.img}
                                width={655}
                                height={374}
                                priority={magazineArticles.indexOf(article) < 2} // Prioritise the first few
                            />
                            <Link href={`/magazine/${article.id}`} className="stretched-link"></Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}
