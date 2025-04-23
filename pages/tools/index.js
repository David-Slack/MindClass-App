import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";
import {ToolCards} from "@/components/cards/toolCards/toolCards";

export default function Home() {

    const title = 'Tools';
    const description = "Helpful tools and tricks to help you on your journey";

    return (
        <>
            <Head>
                <title>{`${title} | MindClass`}</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} />
            <ToolCards />
        </>
    );
}
