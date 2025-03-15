import "@/styles/globals.css";
import localFont from 'next/font/local';
import Head from "next/head";
import {MainMenu} from "@/components/mainMenu/MainMenu";
import {Footer} from "@/components/footer/Footer";

export const dazzed = localFont({
    src: [
        {
            path: './dazzed/Dazzed-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './dazzed/Dazzed-Bold.ttf',
            weight: '700',
            style: 'normal',
        }
    ],
});

let mainClass = 'home'

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main className={`${mainClass} ${dazzed.className}`}>

                <div className="mainContent">
                    <Component {...pageProps} />
                    <Footer/>
                </div>

                <MainMenu/>

            </main>
        </>
    );
}
