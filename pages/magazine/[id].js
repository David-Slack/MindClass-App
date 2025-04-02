import {getItem} from "@/helpers/firebase/getItem";
import Head from "next/head";
import {Container} from "react-bootstrap";
import {MagazineArticle} from "@/components/magazineArticle/MagazineArticle";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";

export async function getServerSideProps(context) {
    const { id } = context.params;
    return getItem(id, "resources");
}

export default function ArticlePage({ article }) {
    if (!article || article.live === false) {
        return <div>Article not found.</div>;
    }

    const title = article.title + " | MindClass";
    const description = article.title + " article short description";

    return (
        <>
            <Head>
                <title>{title} | MindClass</title>
                <meta name="description" content={description} />
            </Head>
            <TitleHeader title={article.title} subtitle={description} />
            <Container fluid>

                <MagazineArticle article={article} />
            </Container>
        </>
    );
}
