import Head from 'next/head';
import {getItem} from "@/helpers/firebase/getItem";
import {Container} from "react-bootstrap";
import {CourseIFrame} from "@/components/courseIFrame/CourseIFrame";

export async function getServerSideProps(context) {
    const { slug } = context.params;
    return getItem(slug, "courses");
}
export default function Course({ article }) {

    const title = article.title + " | MindClass";
    const description = article.title + " article short description";

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>
            <Container fluid>
                <CourseIFrame course={article} />
            </Container>
        </>
    );
}
