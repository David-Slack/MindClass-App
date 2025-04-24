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
        type: "smart",

    },
    {
        url: "/tools/compiler",
        title: "Compiler",
        subTitle: "Compile my braindump into tasks",
        colour: "orangeLight",
        img: "/img/tools/compiler.png",
        type: "smart",
    },
    {
        url: "/tools/consultant",
        title: "Consultant",
        subTitle: "But what are the pros and cons?",
        colour: "greenLight",
        img: "/img/tools/consultant.png",
        type: "smart",

    },
    {
        url: "/tools/estimator",
        title: "Estimator",
        subTitle: "How long might this take?",
        colour: "blueLight",
        img: "/img/tools/estimator.png",
        type: "smart",

    },
    {
        url: "/tools/formaliser",
        title: "Formaliser",
        subTitle: "Breaking things down so you don't",
        colour: "yellowLight",
        img: "/img/tools/formaliser.png",
        type: "smart",

    },
    {
        url: "/tools/judge",
        title: "Judge",
        subTitle: "Am I misreading the tone of this?",
        colour: "redLight",
        img: "/img/tools/judge.png",
        type: "smart",

    },
    {
        url: "/tools/magic-to-do",
        title: "Magic to do",
        subTitle: "Breaking things down so you don't",
        colour: "orangeLight",
        img: "/img/tools/magictodo.png",
        type: "smart",

    },
    {
        url: "/tools/professor",
        title: "Professor",
        subTitle: "Give me the crash course",
        colour: "blue",
        img: "/img/tools/professor.png",
        type: "smart",
    },
];

export function ToolCards() {
    return (
        tools.map((tool) => (

            <Col
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
