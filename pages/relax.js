import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";

export default function Home() {

    const title = 'Relax';
    const description = "Take some time out to watch our latest videos";

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
