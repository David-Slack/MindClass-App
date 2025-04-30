import styles from "./Tools.module.css";
export function EstimatorTool(){
    return(
        <div className={styles.toolCard}>
            <i className={`${styles.toolIcon} bi bi-patch-question-fill`}></i>
            <h2>Add the next task</h2>
            <div className={styles.toolContainer}>
                <iframe
                    src={`https://goblin.tools/Estimator`}
                    title="Estimator Tool"
                    className={styles.tool}
                    allowFullScreen
                />
            </div>
        </div>
    )
}
