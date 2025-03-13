import Head from "next/head";

export default function Home() {

    const title = 'Relax';
    const description = "Take some time out to watch our latest videos";

    return (
        <>
            <Head>
                <title>{title} | MindClass</title>
                <meta name="description" content={description} />
            </Head>

            <h1>{title}</h1>
            <p>{description}</p>
        </>
    );
}
