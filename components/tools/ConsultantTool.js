import styles from "./Tools.module.css";
export function ConsultantTool(){
    return(
        <div className={`${styles.consultant} ${styles.toolCard}`}>
            <i className={`${styles.toolIcon} bi bi-check2-all`}></i>
            <h2>Unbiased opinion</h2>
            <div className={styles.toolContainer}>
                <iframe
                    src={`https://goblin.tools/Consultant`}
                    title="Consultant Tool"
                    className={styles.tool}
                    allowFullScreen
                />
            </div>
        </div>
    )
}
