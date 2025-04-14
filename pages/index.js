import Head from "next/head";
import { TitleHeader } from "@/components/titleHeader/TitleHeader";
import { useUser } from '@/helpers/firebase/userContext';
import {LoadingSpinner} from "@/components/loadingSpinner/LoadingSpinner"; // Updated import path

export default function Home() {
    const title = 'MindClass';
    const subtitle = "See the latest MindClass has to offer you";
    const { userData, loading } = useUser(); // Use the context

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="MindClass | home page" />
            </Head>

            <TitleHeader title={title} subtitle={subtitle} />

            {loading ? (
                <LoadingSpinner />
            ) : userData ? (
                <>
                    {
                        userData.customerData?.firstName ?
                            <h3>Hi {userData.customerData.firstName}, welcome to the MindClass dashboard {userData.customerData?.company && <>with {userData.customerData.company}</>}</h3>
                            :
                            <h3>Welcome to the MindClass dashboard</h3>
                    }
                    <p>We'll keep you up to date with the latest in Mental Health, so come back daily and see what's changed</p>
                </>
            ) : (
                <p>Not logged in.</p>
            )}
        </>
    );
}
