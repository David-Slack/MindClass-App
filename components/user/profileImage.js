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
        <>
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
                            width={size}
                            height={size}
                            style={{ borderRadius: '50%', border: '6px solid #000' }}
                        />
                    </a>
                </>
            ) : (
                <i className={`bi bi-person-circle`} style={{ fontSize: `${size}px` }}></i>
            )}
        </>
    );
}
