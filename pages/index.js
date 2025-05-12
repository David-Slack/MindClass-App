import Head from "next/head";
import { TitleHeader } from "@/components/titleHeader/TitleHeader";
import { useUser } from '@/helpers/firebase/userContext';
import { LoadingSpinner } from "@/components/loadingSpinner/LoadingSpinner";
import {Col, Row} from "react-bootstrap";
// import HomeHero from "@/components/blocks/homeHero/HomeHero";
import {getCollection} from "@/helpers/firebase/getCollection";
import HomeMagazine from "@/components/blocks/homeMagazine/HomeMagazine";
import HomeCourses from "@/components/blocks/homeCourses/HomeCourses";
import HomeCounsellors from "@/components/blocks/homeCounsellors/HomeCounsellors";

export async function getServerSideProps() {
    const articlesPromise = getCollection({
        collectionID: "resources",
        sortBy: "publish_date",
        limitNumber: 6,
        returnKey: 'articles'
    });

    const coursesPromise = getCollection({
        collectionID: "courses",
        sortBy: "publish_date",
        limitNumber: 6,
        returnKey: 'courses'
    });

    const counsellorsPromise = getCollection({
        collectionID: "counsellors",
        sortBy: "name",
        returnKey: 'counsellors'
    });

    const [
        articlesResult,
        coursesResult,
        counsellorsResult
    ] = await Promise.all([
        articlesPromise,
        coursesPromise,
        counsellorsPromise
    ]);

    return {
        props: {
            articles: articlesResult.props.articles || [],
            courses: coursesResult.props.courses || [],
            counsellors: counsellorsResult.props.counsellors || [],
        },
    };
}

export default function Home({ articles, courses, counsellors }) {
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
                        <>
                            {/*<HomeHero userData={userData} />*/}
                            <HomeMagazine articles={articles} />
                            <HomeCourses courses={courses} />
                            <HomeCounsellors courses={counsellors} />
                        </>
                    ) : (
                        <p>Not logged in.</p>
                    )}

                </Col>
            </Row>
        </>
    );
}
