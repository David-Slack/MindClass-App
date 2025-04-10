import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";

export default function Home() {

    const title = 'Shorts';
    const description = "Our short videos";

    return (
        <>
            <Head>
                <title>{`${title} | MindClass`}</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} />
        </>
    );
}
