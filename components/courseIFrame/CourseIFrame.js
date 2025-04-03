import { useState, useEffect } from 'react';
import styles from './CourseIFrame.module.css';
import {LoadingSpinner} from "@/components/loadingSpinner/LoadingSpinner";

export function CourseIFrame({ course }) {
    const [loading, setLoading] = useState(true);
    const [iframeSrc, setIframeSrc] = useState(null);

    useEffect(() => {
        function fetchCourse() {
            fetch(`/api/course/${course.id}/index.html`)
                .then((response) => {
                    if (response.ok) {
                        setIframeSrc(`/api/course/${course.id}/index.html`);
                    } else {
                        console.error('Error fetching course data:', response.statusText);
                    }
                })
                .catch((error) => {
                    console.error('Error in fetchCourse:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        fetchCourse();
    }, [course.id]);

    return (
        <div className={styles.iFrameContainer}>
            {loading ? (
                <LoadingSpinner/>
            ) : iframeSrc ? (
                <iframe
                    key={course.id}
                    className={styles.iFrame}
                    src={iframeSrc}
                    width="100%"
                    height="600"
                    allowFullScreen
                />
            ) : (
                <p>Error loading course.</p>
            )}
        </div>
    );
}