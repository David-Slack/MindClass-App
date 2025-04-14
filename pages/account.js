import Head from "next/head";
import { TitleHeader } from "@/components/titleHeader/TitleHeader";
import { useUser } from '@/helpers/firebase/userContext';
import {LoadingSpinner} from "@/components/loadingSpinner/LoadingSpinner";
import {Container, Row} from "react-bootstrap";

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
            <Container fluid>
                <Row>
                    <h3>Temp user data</h3>
                    {loading ? (
                        <LoadingSpinner />
                    ) : userData ? (
                        <>


                            <ul>
                                <li>User UID: {userData.uid}</li>
                                <li>User Email: {userData.email}</li>
                                {userData.accessToken && <li>ID Token: {userData.accessToken.substring(0, 20)}...</li>}
                                {userData.customerData?.firstName && <li>First Name: {userData.customerData.firstName}</li>}
                                {userData.customerData?.lastName && <li>Last Name: {userData.customerData.lastName}</li>}
                                {userData.customerData?.accountType && <li>Account Type: {userData.customerData.accountType}</li>}
                                {userData.customerData?.company && <li>Company: {userData.customerData.company}</li>}
                                {userData.customerData?.createdDtm && <li>Account Created: {userData.customerData.createdDtm}</li>}
                                {userData.customerData?.lastLoginDate && <li>Last logged in: {userData.customerData.lastLoginDate}</li>}
                                {userData.customerData?.location && <li>Location: {userData.customerData.location}</li>}
                                {userData.customerData?.loginStreak && <li>Login streak: {userData.customerData.loginStreak}</li>}
                                {userData.customerData?.phoneNumber && <li>Phone Number: {userData.customerData.phoneNumber}</li>}
                            </ul>
                        </>
                    ) : (
                        <p>Not logged in.</p>
                    )}
                </Row>
            </Container>
        </>
    );
}
