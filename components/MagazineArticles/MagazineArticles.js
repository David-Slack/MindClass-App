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

                <Col className={styles.col} key={item.id} lg={count > 1 ? "3" : "6"}>
                    <Card className={styles.card} bg={item.colour}>
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                {item.type}
                            </Card.Text>
                        </Card.Body>
                        <Card.Img src={item.image} className={styles.img} />
                    </Card>
                </Col>

            ))}

        </Row>
    );
}
