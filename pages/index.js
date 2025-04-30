import Head from "next/head";
import { TitleHeader } from "@/components/titleHeader/TitleHeader";
import { useUser } from '@/helpers/firebase/userContext';
import { LoadingSpinner } from "@/components/loadingSpinner/LoadingSpinner";
import {Col, Row} from "react-bootstrap";
import HomeHero from "@/components/blocks/homeHero/HomeHero";
import {getCollection} from "@/helpers/firebase/getCollection";
import Link from "next/link";
import HomeMagazine from "@/components/blocks/homeMagazine/HomeMagazine";

export async function getServerSideProps() {
    return getCollection({
        collectionID: "resources",
        sortBy: "publish_date",
        limitNumber: 6,
        returnKey: 'articles'
    });
}

export default function Home({ articles }) {
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

            <HomeMagazine articles={articles} />

{/*            <Row>
                <h2>Latest Courses</h2>
                <Link href={'/courses'}>View all</Link>
            </Row>

            <Row>
                <h2>Counsellors</h2>
                <Link href={'/counsellors'}>View page</Link>
            </Row>

            <Row>
                <h2>Testimonials</h2>
            </Row>*/}
        </>
    );
}
