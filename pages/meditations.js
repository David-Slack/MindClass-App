import Head from "next/head";
import {TitleHeader} from "@/components/titleHeader/TitleHeader";
import {MeditationsCards} from "@/components/cards/meditationsCards/MeditationsCards";
import {Row} from "react-bootstrap";
import {getVideoCollection} from "@/helpers/firebase/getVideoCollection";

export async function getServerSideProps() {
    return getVideoCollection("relax"); // relax is the name of the meditation type
}
export default function Meditations({ collection }) {
    const title = 'Meditations';
    const description = "Take some time out to watch our latest videos";

    return (
        <>
            <Head>
                <title>{`${title} | MindClass`}</title>
                <meta name="description" content={description} />
            </Head>

            <TitleHeader title={title} subtitle={description} />
            <Row>
                <MeditationsCards collection={collection} />
            </Row>
        </>
    );
}
