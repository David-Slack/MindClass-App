import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";
import {ToolCards} from "@/components/cards/toolCards/ToolCards";
import {Row} from "react-bootstrap";
import {BreathingCards} from "@/components/cards/breathingCards/BreathingCards";
import MoodTracking from "@/components/tools/MoodTracking/MoodTracking";

export default function Tools() {

    const title = 'Tools';
    const description = "AI powered tools to aid productivity, relaxation and performance";
    const tags = [
        {
            url: "#MoodTracking",
            title: "Mood Tracking",
            desc: "How are you feeling today?"
        },
        {
            url: "#Breathing",
            title: "Breathing",
            desc: "Practice breathing in a controlled manner"
        },
        {
            url: "#SmartTools",
            title: "Smart tools",
            desc: "AI tools to help you with you with your day"
        },
    ];

    return (
        <>
            <Head>
                <title>{`${title} | MindClass`}</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} tags={tags} />

            <Row>
                <h2>Mood Tracking</h2>
            </Row>

            <Row>
                <MoodTracking />
            </Row>

            <Row>
                <h2>Breathing</h2>
            </Row>

            <Row>
                <BreathingCards />
            </Row>
            <Row>
                <h2>Smart tools</h2>
            </Row>
            <Row>
                <ToolCards />
            </Row>

        </>
    );
}
