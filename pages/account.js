import Head from "next/head";
import { TitleHeader } from "@/components/titleHeader/TitleHeader";
import { useUser } from '@/helpers/firebase/userContext';
import {LoadingSpinner} from "@/components/loadingSpinner/LoadingSpinner";
import {UserInfo} from "@/components/user/UserInfo";
import {Row} from "react-bootstrap";

export default function Account() {
    const title = 'My Account';
    const subtitle = "Information we hold about you. Ask your manager if you'd like to remove it";
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

                    <UserInfo userData={userData} />

                ) : (
                    <p>Not logged in.</p>
                )}
            </Row>
        </>
    );
}
