import Head from "next/head";
import {Footer} from "@/components/footer/Footer";
import {MainMenu} from "@/components/mainMenu/MainMenu";

export default function Home() {

    return (
        <>
            <Head>
                <title>MindClass</title>
                <meta name="description" content="MindClass | home page" />
            </Head>

            <MainMenu/>

            <h1>Hello World!</h1>


            <Footer />
        </>
    );
}
