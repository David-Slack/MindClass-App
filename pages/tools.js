import Head from "next/head";

export default function Home() {

    const title = 'Tools';
    const description = "Useful tool to help you on your journey";

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
