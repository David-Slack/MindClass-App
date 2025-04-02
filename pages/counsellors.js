import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";

export default function Home() {

    const title = 'Counsellors';
    const description = "Choose one of our counsellors";

    return (
        <>
            <Head>
                <title>{title} | MindClass</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} />
        </>
    );
}
