import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";

export default function Home() {
    const title = 'MindClass';
    const subtitle = "See the latest MindClass has to offer you";

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="MindClass | home page" />
            </Head>

            <TitleHeader title={title} subtitle={subtitle} />
        </>
    );
}
