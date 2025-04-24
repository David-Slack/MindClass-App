import {Row} from "react-bootstrap";
import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";
import {ConsultantTool} from "@/components/tools/ConsultantTool";


export default function Chef() {

    const title = 'The Consultant';
    const description = "But what are the pros and cons?";

    return (
        <>
            <Head>
                <title>{`${title} | MindClass`}</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} />

            <Row>
                <ConsultantTool />
            </Row>
        </>
    );
}
