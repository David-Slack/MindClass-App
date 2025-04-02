import {Container, Row} from "react-bootstrap";

export function TitleHeader({title, subtitle}){
    return(
        <Container fluid>
            <Row>
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </Row>
        </Container>
    )
}
