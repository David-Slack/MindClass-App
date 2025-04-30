import {Row} from "react-bootstrap";
import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";
import {ChefTool} from "@/components/tools/ChefTool";


export default function Chef() {

    const title = 'Chef';
    const description = "What's for dinner?";

    return (
        <>
            <Head>
                <title>{`${title} | MindClass`}</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} />

            <Row>
                <ChefTool />
            </Row>
        </>
    );
}
