import Head from "next/head";
import {getCollection} from "@/helpers/firebase/getCollection";
import {MagazineCards} from "@/components/cards/magazineCards/MagazineCards";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";

export async function getServerSideProps() {
    return getCollection({
        collectionID: "resources",
        sortBy: "publish_date"
    });
}

export default function Magazine({ collection }) {
    const title = "The Daily Mind";
    const description = "A mental health magazine. From interviews, to articles, tips and insights - grab a brew and read it through";

    return (
        <>
            <Head>
                <title>{`${title} | MindClass`}</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} />
            <MagazineCards magazineArticles={collection} />
        </>
    );
}
