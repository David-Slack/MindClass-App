"use server"

import {useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "@/helpers/firebase/firebase";
import {Card, Col, Row} from "react-bootstrap";
import styles from "./MagazineArticles.module.css";

export function MagazineArticles() {
    const collectionType = "resources"; // Magazine articles are called resources in the DB
    const [magazine, setMagazine] = useState([]);

    (async (collectionType) => {
        const querySnapshot = await getDocs(collection(db, collectionType));
        setMagazine(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    })(collectionType);

    return (
        <Row>

            { magazine.map((item, count) => (

                <Col
                    key={item.id}
                    lg={count > 1 ? "3" : "6"}
                    style={{paddingBottom: "24px"}}
                >
                    <Card
                        className={styles.card}
                        bg={item.colour}
                    >
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                {count}
                                &nbsp;
                                {item.type}
                                &nbsp;
                                {item.colour}
                            </Card.Text>
                        </Card.Body>
                        <Card.Img
                            variant="bottom"
                            src={item.image}
                            style={{
                                aspectRatio: "1/1",
                                objectFit: "cover",
                                padding: 12
                            }}
                        />
                    </Card>
                </Col>

            ))}

        </Row>
    );
}
