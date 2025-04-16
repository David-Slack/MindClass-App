import {Col, Row} from "react-bootstrap";
import Image from "next/image";
import styles from "./CounsellorMainBlock.module.css";

// TODO: Store in the DB with CMS to change
const block = {
    title: `Get started with counselling`,
    body: `<p>Hello, I'm Carl, the Clinical Lead here at MindClass. I'm also in charge of safeguarding our counselling service to
ensure a safe and welcoming experience for all of our clients. We're big advocates of counselling as it provides a
supportive environment for you to explore your thoughts, feelings, and behaviours with a trained professional.</p>
<p>Counselling can help you manage stress, anxiety, depression, and other mental health challenges by offering new 
perspectives and coping strategies.</p>`,
    img: `https://app.mindclass.co.uk/static/media/counsellorImage.5f296e5ee6d9e5398903.png`,
    imgAlt: `Carl Turner, MindClass Clinical Lead, CYPMHS BA (Hons), PG dip`
}

export function CounsellorMainBlock(){
    return(
        <Row>
            <Col xs={12} xl={6}>
                <h2>{block.title}</h2>
                <div dangerouslySetInnerHTML={{__html: block.body}} />
            </Col>
            <Col xs={12} xl={6}>
                <Image
                    className={styles.mainImage}
                    src={block.img}
                    alt={block.imgAlt}
                    width="1199"
                    height="800"
                />
            </Col>
        </Row>
    );
}
