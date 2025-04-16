import styles from "./MagazineArticle.module.css";
import {Row} from "react-bootstrap";
export function MagazineArticle({ article }) {

    let msec = Date.parse(article.publish_date);
    const d = new Date(msec);
    const formattedDate = `Published ${d.getDate()} ${d.toLocaleString('default', { month: 'long' })} ${d.getFullYear()}`;

    return(
        <Row className={styles.article}>
            <p>{formattedDate}</p>
            <div
                dangerouslySetInnerHTML={{__html: article.body}}
            />
        </Row>
    )
}
