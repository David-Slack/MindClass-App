import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";

export default function Home() {

    const title = 'Tools';
    const description = "Useful tool to help you on your journey";

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
