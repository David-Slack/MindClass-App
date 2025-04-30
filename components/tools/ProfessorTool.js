import styles from "./Tools.module.css";
export function ProfessorTool(){
    return(
        <div className={styles.toolCard}>
            <i className={`${styles.toolIcon} bi bi-mortarboard-fill`}></i>
            <h2>Tell me the short version</h2>
            <div className={styles.toolContainer}>
                <iframe
                    src={`https://goblin.tools/Professor`}
                    title="Professor Tool"
                    className={styles.tool}
                    allowFullScreen
                />
            </div>
        </div>
    )
}
