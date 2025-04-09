import { Container, Row, Col, Button, Form} from 'react-bootstrap';
import Image from "next/image";
import styles from "./LoginForm.module.css";
import people from "../../public/img/people.webp";
import {useState} from "react";
// import { useAuth } from '@/helpers/firebase/AuthUserContext';
// import {useRouter} from "next/router";

export function LoginForm( ){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    // const [error, setError] = useState(null);
    // const router = useRouter();
    // const { signInWithEmailAndPassword } = useAuth();
    // const { authUser, loading} = useAuth();
    //
    // // If we are already logged in, redirect to the home page
    // useEffect(() => {
    //     if (authUser)
    //         router.push('/').then();
    // }, [authUser, router]);
    //
    const onSubmit = event => {
    //     setError(null);
    //     signInWithEmailAndPassword(email, password)
    //         .then(authUser => {
    //             router.push('/').then();
    //         })
    //         .catch(error => {
    //             setError(error.message);
    //         });
    //     event.preventDefault();
    };

    return(
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="3" className={`${styles.loginImageRow} ${styles.loginRow}`}>
                    <Image
                        src={people}
                        alt={`People`}
                        priority={true}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </Col>
                <Col lg={3} className={`${styles.loginFormRow} ${styles.loginRow}`}>
                    <Form onSubmit={onSubmit}>

                        {/*{error && <Alert color="danger">{error}</Alert>}*/}

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput0">
                            <h1>Login</h1>
                        </Form.Group>
                        <Form.Group className="form-floating mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="name@example.com"
                            />
                            <Form.Label>Email address</Form.Label>
                        </Form.Group>

                        <Form.Group className="form-floating mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Control
                                type="password"
                                name="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="password"
                            />
                            <Form.Label>Password</Form.Label>
                        </Form.Group>

                        <Form.Group className="form-floating mb-3" controlId="exampleForm.ControlInput3">
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form.Group>

                    </Form>
                </Col>
            </Row>

        </Container>
    );
}
