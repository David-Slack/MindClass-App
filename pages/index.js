import Head from "next/head";
import {Footer} from "@/components/footer/Footer";
import Link from "next/link";
import { useAuth } from '@/context/AuthUserContext';
import {Button } from 'react-bootstrap';

export default function Home() {
    const { authUser, loading, signOut } = useAuth();

    return (
        <>
            <Head>
                <title>MindClass</title>
                <meta name="description" content="MindClass | home page" />
            </Head>

            <h1>Hello World!</h1>

            { authUser && <Button onClick={signOut}>Sign out</Button>}
            { !authUser && <Link href={`/login`}>Login</Link> }

            <Footer />
        </>
    );
}
