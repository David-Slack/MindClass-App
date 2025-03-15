import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthUserContext';

import { Container, Row, Col, Button, Form, FormGroup, Alert } from 'react-bootstrap';

export default function Home() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);
    const router = useRouter();
    const { signInWithEmailAndPassword } = useAuth();
    const { authUser, loading} = useAuth();

    // If we are already logged in, redirect to the home page
    useEffect(() => {
        if (authUser)
            router.push('/').then();
    }, [authUser]);

    const onSubmit = event => {
        setError(null);
        signInWithEmailAndPassword(email, password)
            .then(authUser => {
                router.push('/').then();
            })
            .catch(error => {
                setError(error.message);
            });
        event.preventDefault();
    };

    return (
        <Container className="text-center" style={{ padding: '40px 0px' }}>
            <Row>
                <Col>
                    <h2>Login</h2>
                </Col>
            </Row>
            <Row style={{ maxWidth: '400px', margin: 'auto' }}>
                <Col>
                    <Form onSubmit={onSubmit}>
                        {error && <Alert color="danger">{error}</Alert>}
                        <FormGroup row>
                            <Form.Label for="loginEmail" sm={4}>Email</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    name="email"
                                    id="loginEmail"
                                    placeholder="Email"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Form.Label for="loginPassword" sm={4}>Password</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    id="loginPassword"
                                    placeholder="Password"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}