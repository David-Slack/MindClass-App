import styles from "./Tools.module.css";
export function ChefTool(){
    return(
        <div className={styles.toolCard}>
            <i className={`${styles.toolIcon} bi bi-basket-fill`}></i>
            <h2>Create a meal</h2>
            <div className={styles.toolContainer}>
                <iframe
                    src={`https://goblin.tools/Chef`}
                    title="Chef Tool"
                    className={styles.tool}
                    allowFullScreen
                />
            </div>
        </div>
    )
}
