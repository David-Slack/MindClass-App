import {Row} from "react-bootstrap";
import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";
import {JudgeTool} from "@/components/tools/JudgeTool";


export default function Judge() {

    const title = 'Judge';
    const description = "Am I misreading the tone of this?";

    return (
        <>
            <Head>
                <title>{`${title} | MindClass`}</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} />

            <Row>
                <JudgeTool />
            </Row>
        </>
    );
}
