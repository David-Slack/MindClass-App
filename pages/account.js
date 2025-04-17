import Head from "next/head";
import { TitleHeader } from "@/components/titleHeader/TitleHeader";
import { useUser } from '@/helpers/firebase/userContext';
import {LoadingSpinner} from "@/components/loadingSpinner/LoadingSpinner";
import {UserInfo} from "@/components/user/UserInfo";
import { Col } from "react-bootstrap";
import ChangePasswordForm from "@/components/user/ChangePasswordForm";

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


            {loading ? (
                <LoadingSpinner />
            ) : userData ? (
                <>
                    <Col md={12}>
                        <UserInfo userData={userData} />
                    </Col>
                    <Col md={6}>
                        <ChangePasswordForm />
                    </Col>
                </>
            ) : (
                <p>Not logged in.</p>
            )}

        </>
    );
}
