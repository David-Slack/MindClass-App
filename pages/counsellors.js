import Head from "next/head";

export default function Home() {

    const title = 'Counsellors';
    const description = "Choose one of our counsellors";

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
