import { Card, CardGroup } from "react-bootstrap";
import styles from "./CounsellorCards.module.css";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image

export function CounsellorCards({ collection }) {
    return (
        <CardGroup className={styles.cardGroup}>

            {collection.map((counsellor) => (
                <Card className={styles.card}>
                    <Card.Body>
                        <Card.Title>{counsellor.name}</Card.Title>
                        <Card.Text>
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
                    <span className={styles.arrow}>&rarr;</span>
                    <Link href={`/counsellors/${counsellor.id}`} className="stretched-link"></Link>
                </Card>
            ))}

        </CardGroup>
    );
}
