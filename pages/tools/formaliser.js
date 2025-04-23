import {Row} from "react-bootstrap";
import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";
import {FormaliserTool} from "@/components/tools/FormaliserTool";

export default function Formaliser() {

    const title = 'Formaliser';
    const description = "Turn the chaotic thoughts into classy ones, or vice versa";

    return (
        <>
            <Head>
                <title>{`${title} | MindClass`}</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} />

            <Row>
                <FormaliserTool />
            </Row>
        </>
    );
}
