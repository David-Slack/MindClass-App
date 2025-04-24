import {Row} from "react-bootstrap";
import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";
import SimpleBreathing from "@/components/breathingTools/simpleBreathing";

export default function Chef() {

    const title = 'Simple Breathing';
    const description = "Exercise to relearn the basics of breathing";

    return (
        <>
            <Head>
                <title>{`${title} | MindClass`}</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} />

            <Row>
                <SimpleBreathing />
            </Row>
        </>
    );
}
