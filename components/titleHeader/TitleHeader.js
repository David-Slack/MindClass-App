import {Badge, Col, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import styles from "./TitleHeader.module.css";
import ConfettiExplosion from 'react-confetti-explosion';
import { useState, useEffect } from "react";
import Link from "next/link";

export function TitleHeader({ title, subtitle, tags }) {
    const [isExploding, setIsExploding] = useState(false);

    useEffect(() => {
        return () => {
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
            <h1 className={styles.h1}>
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
            <p className={styles.subtitle}>{subtitle}</p>
            <Col>
                { tags && tags.map((tag, count) => (
                    <OverlayTrigger
                        key={count}
                        placement="top"
                        overlay={<Tooltip id={`tooltip-tags-${count}`}>{tag.desc}</Tooltip>}
                        delay={{ show: 200, hide: 100 }}
                    >
                        <Badge className={`${styles.tag}`} pill>
                            <Link className={styles.tagLink} href={tag.url}>{tag.title}</Link>
                        </Badge>
                    </OverlayTrigger>
                ))}
            </Col>
        </Row>
    );
}
