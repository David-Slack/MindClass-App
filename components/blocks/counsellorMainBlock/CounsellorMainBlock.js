import {Col, Container, Row} from "react-bootstrap";
import Image from "next/image";

const blockHTML = `
<h2>Get started with counselling</h2>
<p>Hello, I'm Carl, the Clinical Lead here at MindClass. I'm also in charge of safeguarding our counselling service to
ensure a safe and welcoming experience for all of our clients. We're big advocates of counselling as it provides a
supportive environment for you to explore your thoughts, feelings, and behaviours with a trained professional.</p>
<p>Counselling can help you manage stress, anxiety, depression, and other mental health challenges by offering new 
perspectives and coping strategies.</p>  
`;

const blockImageSrc = "https://app.mindclass.co.uk/static/media/counsellorImage.5f296e5ee6d9e5398903.png";
const blockImageAlt = "Carl Turner, MindClass Clinical Lead, CYPMHS BA (Hons), PG dip";


export function CounsellorMainBlock(){
    return(
        <Container fluid={true}>
            <Row>
                <Col xs={12} xl={6}>
                    <div dangerouslySetInnerHTML={{__html: blockHTML}} />
                </Col>
                <Col xs={12} xl={6}>
                    <Image
                        src={blockImageSrc}
                        alt={blockImageAlt}
                        width="1199"
                        height="800"
                        style={{width:'100%', height:'auto'}}
                    />
                </Col>
            </Row>
        </Container>
    );
}
