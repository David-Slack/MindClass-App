import { Card, CardGroup } from "react-bootstrap";
import styles from "./CounsellorCards.module.css";
import Link from "next/link";
import Image from "next/image";

export function CounsellorCards({ collection }) {
    return (
        <CardGroup className={styles.cardGroup}>

            {collection.map((counsellor) => (

                <Card className={styles.card} bg={counsellor.colour}>
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

            ))}

        </CardGroup>
    );
}
