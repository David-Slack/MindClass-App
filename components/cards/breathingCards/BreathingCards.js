import {Card, Col} from "react-bootstrap";
import styles from "@/components/cards/toolCards/ToolCards.module.css";
import Link from "next/link";

// TODO: Move to the DB
const BreathingTools = [
    {
        url: "/tools/breathing-simple",
        title: "Simple Breathing",
        subTitle: "Controlled breathing exercise",
        colour: "blueLight",
        img: "/img/tools/breathing-simple.png",
        type: "breathing"

    },
    {
        url: "/tools/breathing-box",
        title: "Box Breathing",
        subTitle: "Breathing with additional holds",
        colour: "yellowLight",
        img: "/img/tools/breathing-box.png",
        type: "breathing"
    },
];

export function BreathingCards() {
    return (
        BreathingTools.map((tool) => (
            <Col
                key={tool.url}
                lg={6}
            >
                <Card className={styles.card} style={{ backgroundColor: `var(--${tool.colour})`}}>
                    <Card.Img className={styles.cardImg} src={tool.img} alt="Card image" />
                    <Card.Body>
                        <Card.Title>{tool.title}</Card.Title>
                        <Card.Text className={styles.cardText}>
                            {tool.subTitle}
                        </Card.Text>
                        <span className="cardArrow">&rarr;</span>
                        <Link href={tool.url} className={`stretched-link`}></Link>
                    </Card.Body>
                </Card>
            </Col>
        ))
    )
}
