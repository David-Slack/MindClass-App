import { Row } from "react-bootstrap";
import styles from "./TitleHeader.module.css";
import ConfettiExplosion from 'react-confetti-explosion';
import { useState, useEffect } from "react";

export function TitleHeader({ title, subtitle }) {
    const [isExploding, setIsExploding] = useState(false);

    useEffect(() => {
        return () => {
            // Cleanup: Remove the portal's DOM node
            const confettiElements = document.querySelectorAll('.confetti-explosion-wrapper');
            confettiElements.forEach(element => {
                element.remove();
            });
        };
    }, []);

    const handleSmileyClick = () => {
        setIsExploding(true);
    };

    const handleConfettiComplete = () => {
        setIsExploding(false);
    };

    return (
        <Row className={styles.titleHeader}>
            <h1>
                {title}
                <div className={styles.smiley} onClick={handleSmileyClick}>
                    {isExploding && (
                        <ConfettiExplosion
                            force={0.4}
                            duration={2200}
                            particleCount={30}
                            width={400}
                            onComplete={handleConfettiComplete}
                        />
                    )}
                </div>
            </h1>
            <p>{subtitle}</p>
        </Row>
    );
}
