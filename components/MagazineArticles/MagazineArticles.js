import {Card, Col, Row} from "react-bootstrap";
import styles from "./MagazineArticles.module.css";


export function MagazineArticles({ magazineArticles }) {

    return (
        <Row>

            { magazineArticles.map((item, count) => (

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
