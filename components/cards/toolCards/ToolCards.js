import {Card, Col} from "react-bootstrap";
import Link from "next/link";
import styles from "@/components/cards/toolCards/ToolCards.module.css";

// TODO: Move to the DB
const tools = [
    {
        url: "/tools/chef",
        title: "Chef",
        subTitle: "What's for dinner?",
        colour: "yellowLight",
        img: "/img/tools/chef.png",

    },
    {
        url: "/tools/compiler",
        title: "Compiler",
        subTitle: "Compile my braindump into tasks",
        colour: "orangeLight",
        img: "/img/tools/compiler.png",
    },
];
export function ToolCards() {
    return (
        tools.map((tool) => (

            <Col
                className={`${styles.col}`}
                key={tool.url}
                lg={3}
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
