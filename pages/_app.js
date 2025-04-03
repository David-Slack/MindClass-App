import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import localFont from 'next/font/local';
import Head from "next/head";
import { AuthUserProvider } from '@/helpers/firebase/AuthUserContext';
import { MainMenu } from "@/components/mainMenu/MainMenu";
import { Footer } from "@/components/footer/Footer";
import {LoginCheck} from "@/components/loginCheck/LoginCheck";
import {textToClass} from "@/helpers/textToClass";
import { usePathname } from 'next/navigation';

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


export default function App({ Component, pageProps }) {

    const pathname = usePathname();
    let mainClass = pathname ? textToClass(pathname) : 'home';
    if(mainClass==='') mainClass = 'home';

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <AuthUserProvider>
                <main className={`${mainClass} ${dazzed.className}`}>
                    <MainMenu/>
                    <div className="mainContent">
                        <LoginCheck>
                            <Component {...pageProps} />
                        </LoginCheck>
                        <Footer/>
                    </div>
                </main>
            </AuthUserProvider>
        </>
    );
}
