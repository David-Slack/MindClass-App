import Head from "next/head";
import {Container} from "react-bootstrap";
import {getCollection} from "@/helpers/firebase/getCollection";
import {MagazineCards} from "@/components/MagazineCards/MagazineCards";

export async function getServerSideProps() {
    return getCollection("resources", "publish_date");
}

export default function Magazine({ collection }) {
    const title = "Magazine";
    const description = "Our magazine articles";

    return (
        <>
            <Head>
                <title>{title} | MindClass</title>
                <meta name="description" content={description} />
            </Head>

            <h1>{title}</h1>
            <p>{description}</p>
            <Container fluid>
                <MagazineCards magazineArticles={collection} />
            </Container>
        </>
    );
}
