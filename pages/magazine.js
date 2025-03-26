import Head from "next/head";
import {MagazineArticles} from "@/components/MagazineArticles/MagazineArticles";
import {Container} from "react-bootstrap";

export default function Magazine() {

    const title = 'Magazine';
    const description = "Our magazine articles";

    return (
        <>
            <Head>
                <title>{title} | MindClass</title>
                <meta name="description" content={description}/>
            </Head>

            <h1>{title}</h1>
            <p>{description}</p>
            <Container fluid>
                <MagazineArticles />
            </Container>
        </>
    );
}
