import styles from "./MagazineArticle.module.css";
export function MagazineArticle({ article }) {
    return(
        <article
            className={styles.article}
            dangerouslySetInnerHTML={{__html: article.body}}
        />
    )
}
