import Head from "next/head";
import { TitleHeader } from "@/components/titleHeader/TitleHeader";
import { useUser } from '@/helpers/firebase/userContext';
import { LoadingSpinner } from "@/components/loadingSpinner/LoadingSpinner";
import {Col, Row} from "react-bootstrap";
import HomeHero from "@/components/blocks/homeHero/HomeHero";
import {MagazineCards} from "@/components/cards/magazineCards/MagazineCards";
import {getCollection} from "@/helpers/firebase/getCollection";

export async function getServerSideProps() {
    return getCollection("resources", "publish_date");
}

export default function Home({ collection }) {
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
                <Col md={12}>

                    {loading ? (
                        <LoadingSpinner />
                    ) : userData ? (
                        <HomeHero userData={userData} />
                    ) : (
                        <p>Not logged in.</p>
                    )}

                </Col>

            </Row>

            <MagazineCards magazineArticles={collection} simple={true} />
        </>
    );
}
