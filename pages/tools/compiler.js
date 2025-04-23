import {Row} from "react-bootstrap";
import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";
import {CompilerTool} from "@/components/tools/CompilerTool";


export default function Chef() {

    const title = 'Compiler';
    const description = "Compile my braindump into a list of tasks";

    return (
        <>
            <Head>
                <title>{`${title} | MindClass`}</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} />

            <Row>
                <CompilerTool />
            </Row>
        </>
    );
}
