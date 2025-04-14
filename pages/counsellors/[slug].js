import Head from 'next/head';
import {getItem} from "@/helpers/firebase/getItem";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";
import {CounsellorBio} from "@/components/counsellorBio/CounsellorBio";

export async function getServerSideProps(context) {
    const { slug } = context.params;
    return getItem(slug, "counsellors");
}
export default function Course({ article }) {

    const title = `Meet ${article.name}`;
    const description = article.beforeReadMore;

    return (
        <>
            <Head>
                <title>{`Meet ${article.name} | MindClass`}</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={article.job_title} />
            <CounsellorBio bio={article} />
        </>
    );
}
