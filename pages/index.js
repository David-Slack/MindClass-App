import Head from "next/head";
import { TitleHeader } from "@/components/titleHeader/TitleHeader";
import { useUser } from '@/helpers/firebase/userContext';
import { LoadingSpinner } from "@/components/loadingSpinner/LoadingSpinner";
import { Row } from "react-bootstrap";

export default function Home() {
    const title = 'MindClass';
    const subtitle = "Welcome to MindClass, counsellors, courses and content are just a click away!";
    const { userData, loading } = useUser();

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="MindClass | home page" />
            </Head>

            <TitleHeader title={title} subtitle={subtitle} />
            <Row>

                {loading ? (
                    <LoadingSpinner />
                ) : userData ? (
                    <>
                        {
                            userData.customerData?.firstName ?
                                <h2>Hi {userData.customerData.firstName}, welcome to the MindClass dashboard
                                    {userData.customerData?.company && <> with {userData.customerData.company}</>}</h2>
                                :
                                <h3>Welcome to the MindClass dashboard</h3>
                        }
                        <p>We'll keep you up to date with the latest in Mental Health, so come back daily and see what's changed</p>
                    </>
                ) : (
                    <p>Not logged in.</p>
                )}

            </Row>
        </>
    );
}
