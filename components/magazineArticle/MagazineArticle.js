import styles from "./MagazineArticle.module.css";
export function MagazineArticle({ article }) {
    let msec = Date.parse(article.publish_date);
    const d = new Date(msec);
    const formattedDate = `Published ${d.getDate()} ${d.toLocaleString('default', { month: 'long' })} ${d.getFullYear()}`;
    return(
        <article className={styles.article}>
            {formattedDate}
            <div
                dangerouslySetInnerHTML={{__html: article.body}}
            />
        </article>
    )
}
