import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";
import {getCollection} from "@/helpers/firebase/getCollection";
import {CounsellorCards} from "@/components/cards/counsellorCards/CounsellorCards";
import {CounsellorMainBlock} from "@/components/blocks/counsellorMainBlock/CounsellorMainBlock";

export async function getServerSideProps() {
    return getCollection("counsellors", "name");
}
export default function counsellors({ collection  }) {

    const title = 'Counsellors';
    const description = "Choose one of our counsellors";

    return (
        <>
            <Head>
                <title>{`${title} | MindClass`}</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} />
            <CounsellorMainBlock />
            <CounsellorCards collection={collection} />
        </>
    );
}
