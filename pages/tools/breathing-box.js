import {Row} from "react-bootstrap";
import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";
import BoxBreathing from "@/components/tools/breathing/boxBreathing";

export default function Chef() {

    const title = 'Box Breathing';
    const description = "Exercise that adds in a holding your breath";

    return (
        <>
            <Head>
                <title>{`${title} | MindClass`}</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} />

            <Row>
                <BoxBreathing />
            </Row>
        </>
    );
}
