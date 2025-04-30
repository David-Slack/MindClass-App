import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";
import {VideoCards} from "@/components/cards/meditationsCards/VideoCards";
import {Row} from "react-bootstrap";
import {getVideoCollection} from "@/helpers/firebase/getVideoCollection";

export async function getServerSideProps() {
    return getVideoCollection("relax"); // relax is the name of the meditation type
}
export default function Meditations({ collection }) {
    const title = 'Meditations';
    const description = "Your peace, your pace. Browse our mindfulness meditations";

    return (
        <>
            <Head>
                <title>{`${title} | MindClass`}</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} />
            <Row>
                <VideoCards collection={collection} />
            </Row>
        </>
    );
}
