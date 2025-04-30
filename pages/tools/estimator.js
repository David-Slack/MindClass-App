import {Row} from "react-bootstrap";
import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";
import {EstimatorTool} from "@/components/tools/EstimatorTool";


export default function Estimator() {

    const title = 'Estimator';
    const description = "How long this might this take?";

    return (
        <>
            <Head>
                <title>{`${title} | MindClass`}</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} />

            <Row>
                <EstimatorTool />
            </Row>
        </>
    );
}
