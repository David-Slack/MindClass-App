import styles from "./Tools.module.css";
export function CompilerTool(){
    return(
        <div className={styles.toolCard}>
            <i className={`${styles.toolIcon} bi bi-list-task`}></i>
            <h2>Make a list</h2>
            <div className={styles.toolContainer}>
                <iframe
                    src={`https://goblin.tools/Compiler`}
                    title="Compiler Tool"
                    className={styles.tool}
                    allowFullScreen
                />
            </div>
        </div>
    )
}
