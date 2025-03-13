import Head from "next/head";

export default function Home() {

    const title = 'Courses';
    const description = "All the courses MindClass offers. Click on the different tags to filter";

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
