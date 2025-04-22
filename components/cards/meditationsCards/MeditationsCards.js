import styles from "./MeditationsCards.module.css";
import {Col} from "react-bootstrap";

export function MeditationsCards({ collection }) {
    return (
        collection.map((card) => (
            <Col
                className={`${styles.col}`}
                key={card.id}
                lg={4}
            >
                { card.videoLink }
            </Col>
        ))

    );
}
