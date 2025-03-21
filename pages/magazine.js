import Head from "next/head";
import ListItems from "@/components/listItems/ListItems";

export default function Magazine() {

    const title = 'Magazine';
    const description = "Our magazine articles";

    return (
        <>
            <Head>
                <title>{title} | MindClass</title>
                <meta name="description" content={description}/>
            </Head>

            <h1>{title}</h1>
            <p>{description}</p>
            <ListItems/>
        </>
    );
}
