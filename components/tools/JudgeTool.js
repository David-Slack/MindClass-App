import styles from "./Tools.module.css";
export function JudgeTool(){
    return(
        <div className={styles.toolCard}>
            <i className={`${styles.toolIcon} bi bi-chat-heart`}></i>
            <h2>How does this sound?</h2>
            <div className={styles.toolContainer}>
                <iframe
                    src={`https://goblin.tools/Judge`}
                    title="Judge Tool"
                    className={styles.tool}
                    allowFullScreen
                />
            </div>
        </div>
    )
}
