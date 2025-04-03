import styles from "./CourseIFrame.module.css";

export function CourseIFrame({ course }){
    return(
        <div className={styles.iFrameContainer} >
            <iframe className={styles.iFrame}
                    src={`/api/course/${course.id}/index.html`}
                    width="100%"
                    height="600"
                    allowFullScreen
            />
        </div>
    )
}
