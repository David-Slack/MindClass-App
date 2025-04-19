import styles from "@/components/user/profileImage.module.css";
import md5 from 'js-md5';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

export function ProfileImage({ size = 40 }) {
    const [gravatarUrl, setGravatarUrl] = useState(null);
    const [hasGravatar, setHasGravatar] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user && user.email) {
            const trimmedEmail = user.email.trim().toLowerCase();
            const hash = md5(trimmedEmail);
            const gravatarBaseUrl = `https://www.gravatar.com/avatar/${hash}`;
            const gravatarTestUrl = `${gravatarBaseUrl}?d=404`;

            fetch(gravatarTestUrl)
                .then(response => {
                    if (response.status !== 404) {
                        setGravatarUrl(`${gravatarBaseUrl}?s=${size}`);
                        setHasGravatar(true);
                    } else {
                        setGravatarUrl(null);
                        setHasGravatar(false);
                    }
                })
                .catch(error => {
                    console.error("Error checking Gravatar:", error);
                    setGravatarUrl(null);
                    setHasGravatar(false);
                });
        } else {
            setGravatarUrl(null);
            setHasGravatar(false);
        }
    }, [size]);

    return (
        <div className={styles.profileImageContainer}>
            {hasGravatar && gravatarUrl ? (
                <>
                    <a
                        href="https://gravatar.com/"
                        title={'Click to go to the Gravatar website where you can update your image'}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={gravatarUrl}
                            alt="Profile"
                            className={styles.profileImage}
                            width={size}
                            height={size}
                            style={{ borderRadius: '50%', border: '6px solid #000' }}
                        />
                    </a>
                    <div className={styles.gravatarInfo}>
                        <small>From <a href="https://gravatar.com/" target="_blank" rel="noopener noreferrer">Gravatar</a></small>
                    </div>
                </>
            ) : (
                <i className={`bi bi-person-circle`} style={{ fontSize: `${size}px` }}></i>
            )}
        </div>
    );
}
