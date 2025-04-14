import Head from "next/head";
import {getCollection} from "@/helpers/firebase/getCollection";
import {MagazineCards} from "@/components/cards/magazineCards/MagazineCards";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";

export async function getServerSideProps() {
    return getCollection("resources", "publish_date");
}

export default function Magazine({ collection }) {
    const title = "Magazine";
    const description = "Our magazine articles";

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
