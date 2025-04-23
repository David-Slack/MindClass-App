import {Row} from "react-bootstrap";

export default function Compiler(){

    return (
        <>

            <Row
                style={{
                    padding: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    height: "300vh",
                    width: "calc(100% + 100px)",
                    marginLeft: -50,
                    marginTop: -0,
                    background: "white",
                    paddingTop: 30,
                }}
            >
                <iframe
                    src={`https://goblin.tools/Compiler`}
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        marginTop: -200,
                    }}
                    title="Course Content"
                    allowFullScreen
                />
            </Row>
        </>
    );
};
