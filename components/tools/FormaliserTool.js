import styles from "./Tools.module.css";

export function FormaliserTool(){
    return(
        <div className={styles.toolCard}>
            <i className={`${styles.toolIcon} bi bi-threads`}></i>
            <h2>Add your thoughts</h2>
            <div className={styles.toolContainer}>
                <iframe
                    src={`https://goblin.tools/Formalizer`}
                    title="Formaliser Tool"
                    className={styles.tool}
                    allowFullScreen
                />
            </div>
        </div>
    )
}
