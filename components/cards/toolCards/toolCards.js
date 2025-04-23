import {Card, Row} from "react-bootstrap";
import Link from "next/link";

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
        <Row md={4}>
            {tools.map((tool) => (

                <Card style={{ backgroundColor: `var(--${tool.colour})`}}>
                    <Card.Img src={tool.img} alt="Card image" />
                    <Card.ImgOverlay>
                        <Card.Title>{tool.title}</Card.Title>
                        <Card.Text>
                            {tool.subTitle}
                        </Card.Text>
                        <Link href={tool.url} className="stretched-link">{tool.title} tool</Link>
                    </Card.ImgOverlay>
                </Card>

            ))}
        </Row>
    )
}
