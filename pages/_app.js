import "@/styles/globals.css";
import localFont from 'next/font/local';
import Head from "next/head";
import { AuthUserProvider } from '@/context/AuthUserContext';
import {MainMenu} from "@/components/mainMenu/MainMenu";
import {Footer} from "@/components/footer/Footer";
import {LoginCheck} from "@/components/loginCheck/LoginCheck";

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
})

let mainClass = 'home'

export default function App({ Component, pageProps }) {
    // TODO: Check if the user is logged in and redirect to the login page if they are not

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <AuthUserProvider>
                <main className={`${mainClass} ${dazzed.className}`}>
                    <LoginCheck/>
                    <MainMenu/>
                    <Component {...pageProps} />
                    <Footer/>
                </main>
            </AuthUserProvider>
        </>
    );
}
