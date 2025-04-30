import Head from "next/head";
import {getCollection} from "@/helpers/firebase/getCollection";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";
import {CourseCards} from "@/components/cards/courseCards/CourseCards";
import {Row} from "react-bootstrap";

export async function getServerSideProps() {
    return getCollection("courses", "publish_date");
}

export default function Courses({ collection }) {

    const title = 'Courses';
    const description = "From Mental Health Awareness, to ADHD, Sleep and the Menopause, we’ve got you covered";

    return (
        <>
            <Head>
                <title>{`${title} | MindClass`}</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} />
            <Row>
                <CourseCards collection={collection} />
            </Row>
        </>
    );
}
