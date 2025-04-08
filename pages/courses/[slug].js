import Head from 'next/head';
import {getItem} from "@/helpers/firebase/getItem";
// import {TitleHeader} from "@/components/titleHeader/TitleHeader";
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
            {/*<TitleHeader title={article.title} subtitle={description} />*/}
            <Container fluid>
                <CourseIFrame course={article} />
            </Container>
        </>
    );
}
