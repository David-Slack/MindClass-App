import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";
import {ToolCards} from "@/components/cards/toolCards/ToolCards";
import {Row} from "react-bootstrap";
import {BreathingCards} from "@/components/cards/breathingCards/BreathingCards";
import MoodTracking from "@/components/tools/MoodTracking/MoodTracking";

export default function Tools() {

    const title = 'Tools';
    const description = "Helpful tools and tricks to help you on your journey";

    return (
        <>
            <Head>
                <title>{`${title} | MindClass`}</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} />

            {/*TODO: tabs for each section*/}
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
