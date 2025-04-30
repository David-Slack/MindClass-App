import {Row} from "react-bootstrap";
import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";
import {MagicToDo} from "@/components/tools/MagicToDo";


export default function Chef() {

    const title = 'Magic To Do';
    const description = "Breaking things down so you don't";

    return (
        <>
            <Head>
                <title>{`${title} | MindClass`}</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} />

            <Row>
                <MagicToDo />
            </Row>
        </>
    );
}
