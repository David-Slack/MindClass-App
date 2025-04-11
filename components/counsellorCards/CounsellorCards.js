import { Card, Row } from "react-bootstrap";
import styles from "./CounsellorCards.module.css";
import Link from "next/link";
import Image from "next/image";

export function CounsellorCards({ collection }) {
    const counsellorsPerRow = 3;
    const counsellorGroups = [];
    let currentGroup = [];

    collection.forEach((counsellor, index) => {
        currentGroup.push(
            <Card className={styles.card} bg={counsellor.colour} key={counsellor.id}>
                <Card.Body>
                    <Card.Title>{counsellor.name}</Card.Title>
                    <Card.Text className={styles.cardText}>
                        {counsellor.homepageText}
                    </Card.Text>
                </Card.Body>
                <Image
                    src={counsellor.image}
                    alt={counsellor.name}
                    className={styles.img}
                    width={655}
                    height={374}
                    priority={collection.indexOf(counsellor) < 2} // Prioritize the first few
                />
                <span className={`${styles.arrow} cardArrow`}>&rarr;</span>
                <Link href={`/counsellors/${counsellor.id}`} className="stretched-link"></Link>
            </Card>
        );

        if ((index + 1) % counsellorsPerRow === 0 || index === collection.length - 1) {
            counsellorGroups.push(
                <Row md={3} key={`group-${index}`} className={styles.cardGroup}>
                    {currentGroup}
                </Row>
            );
            currentGroup = [];
        }
    });

    return <>{counsellorGroups}</>;
}
