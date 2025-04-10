import {Container, Row, Col, Button, Form, Alert} from 'react-bootstrap';
import Image from "next/image";
import styles from "./LoginForm.module.css";
import people from "../../public/img/people.webp";
import {useState} from "react";
import {useRouter} from "next/router";

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from "@/helpers/firebase/firebase";

export function LoginForm( ){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();
    const auth = getAuth(firebaseApp);
    const [error, setError] = useState(null);
    const [errorBox, setErrorBox] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setErrorBox(false);

        if (!email) {
            setError('Please enter your email address.');
            setErrorBox(true);
            return;
        }
        if (!password) {
            setError('Please enter your password.');
            setErrorBox(true);
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            setErrorBox(true);
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`,
                },
                body: JSON.stringify({ rememberMe }),
            });

            const data = await response.json();

            if (response.ok) {
                router.push('/');
            } else {
                setError(data.error || 'Login failed');
                setErrorBox(true);
            }
        } catch (err) {
            console.error('Firebase sign-in error:', err);

            if (err.code === 'auth/invalid-credential') {
                setError('Invalid email or password.');
            } else if (err.code === 'auth/user-not-found') {
                setError('User not found.');
            } else if (err.code === 'auth/wrong-password') {
                setError('Incorrect password.');
            }
            else {
                setError(err.message || 'Login failed');
            }
            setErrorBox(true);
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

                        { errorBox &&
                            <Alert variant="danger" onClose={() => setErrorBox(false)} dismissible>
                                {error}
                            </Alert>
                        }

                        <Form.Group className="mb-3" controlId="loginForm.title">
                            <h1>Login</h1>
                        </Form.Group>
                        <Form.Group className="form-floating mb-3" controlId="loginForm.email">
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                            />
                            <Form.Label>Email address</Form.Label>
                        </Form.Group>

                        <Form.Group className="form-floating mb-3" controlId="loginForm.password">
                            <Form.Control
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="password"
                            />
                            <Form.Label>Password</Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="loginForm.rememberMe">
                            <Form.Check
                                type="checkbox"
                                label="Remember Me"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                        </Form.Group>

                        <Form.Group className="form-floating mb-3" controlId="loginForm.submit">
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
