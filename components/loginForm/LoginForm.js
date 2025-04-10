import { Container, Row, Col, Button, Form} from 'react-bootstrap';
import Image from "next/image";
import styles from "./LoginForm.module.css";
import people from "../../public/img/people.webp";
import {useState} from "react";
import {useRouter} from "next/router";

export function LoginForm( ){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                router.push('/');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            console.error('Login request error:', err);
            setError('Failed to connect to the server');
        }
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
                    <Form onSubmit={handleSubmit}>

                        {/*{error && <Alert color="danger">{error}</Alert>}*/}
                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput0">
                            <h1>Login</h1>
                        </Form.Group>
                        <Form.Group className="form-floating mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                            />
                            <Form.Label>Email address</Form.Label>
                        </Form.Group>

                        <Form.Group className="form-floating mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Control
                                id="password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
