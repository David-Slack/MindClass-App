import {Row} from "react-bootstrap";
import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";
import {ProfessorTool} from "@/components/tools/ProfessorTool";


export default function Chef() {

    const title = 'Professor';
    const description = "Give me the crash course";

    return (
        <>
            <Head>
                <title>{`${title} | MindClass`}</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} />

            <Row>
                <ProfessorTool />
            </Row>
        </>
    );
}
