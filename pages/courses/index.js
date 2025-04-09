import Head from "next/head";
import {getCollection} from "@/helpers/firebase/getCollection";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";
import {CourseCards} from "@/components/courseCards/CourseCards";

export async function getServerSideProps() {
    return getCollection("courses", "publish_date");
}

export default function Courses({ collection }) {

    const title = 'Courses';
    const description = "All the courses MindClass offers. Click on the different tags to filter";

    return (
        <>
            <Head>
                <title>{title} | MindClass</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} />
            <CourseCards collection={collection} />
        </>
    );
}
