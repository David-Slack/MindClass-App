import Head from 'next/head';
import {getItem} from "@/helpers/firebase/getItem";
import { Row } from "react-bootstrap";

export async function getServerSideProps(context) {
    const { slug } = context.params;
    return getItem(slug, "videoResources");
}
export default function Meditation({ article }) {

    const title = article.title + " | MindClass";
    const description = article.title + " meditation short description";

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>
            <Row className={'meditation'}>

            </Row>
        </>
    );
}
