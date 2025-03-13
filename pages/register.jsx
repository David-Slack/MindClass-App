import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '@/context/AuthUserContext';

import { Container, Row, Col, Button, Form, FormGroup, Alert } from 'react-bootstrap';
import Link from 'next/link';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const router = useRouter();
    // Optional error handling
    const [error, setError] = useState(null);

    const { createUserWithEmailAndPassword } = useAuth();

    const onSubmit = (event) => {
        event.preventDefault();
        setError(null);
        if (passwordOne === passwordTwo) {
            createUserWithEmailAndPassword(email, passwordOne)
                .then(authUser => {
                    console.log("Success. The user is created in firebase");
                    router.push("/");
                })
                .catch(error => {
                    setError(error.message);
                });
        } else {
            setError("Passwords do not match");
        }
    };

    return (
        <Container className="text-center" style={{ padding: '40px 0px' }}>
            <Row>
                <Col>
                    <h2>Register</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form style={{ maxWidth: '400px', margin: 'auto' }} onSubmit={onSubmit}>
                        { error &&
                            <Alert color="danger">{error}</Alert>
                        }
                        <FormGroup row>
                            <Form.Label for="signUpEmail" sm={4}>Email</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    name="email"
                                    id="signUpEmail"
                                    placeholder="Email"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Form.Label for="signUpPassword" sm={4}>Password</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="password"
                                    name="passwordOne"
                                    value={passwordOne}
                                    onChange={(event) => setPasswordOne(event.target.value)}
                                    id="signUpPassword"
                                    placeholder="Password"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Form.Label for="signUpPassword2" sm={4}>Confirm Password</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={passwordTwo}
                                    onChange={(event) => setPasswordTwo(event.target.value)}
                                    id="signUpPassword2"
                                    placeholder="Password"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Button variant="primary" type="submit">
                                    Register
                                </Button>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col className='text-white'>
                                Have an account? <Link href={`/login`}>Login</Link>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUp;