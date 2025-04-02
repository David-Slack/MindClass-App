import {Container, Row} from "react-bootstrap";
import styles from "./TitleHeader.module.css";

export function TitleHeader({title, subtitle}){
    return(
        <Container fluid className={styles.titleHeader}>
            <Row>
                <h1>{title}
                    <div className={styles.smiley} ></div>
                </h1>
                <p>{subtitle}</p>
            </Row>
        </Container>
    )
}
