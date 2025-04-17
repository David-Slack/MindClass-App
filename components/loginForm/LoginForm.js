import { Row, Col, Button, Form, Alert } from 'react-bootstrap';
import Image from "next/image";
import styles from "./LoginForm.module.css";
import people from "../../public/img/people.webp";
import logo from "../../public/img/logo.png";
import { useState } from "react";
import { useRouter } from "next/router";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from "@/helpers/firebase/firebase";
import { httpsCallable } from 'firebase/functions';
import { getFunctions } from 'firebase/functions';

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();
    const auth = getAuth(firebaseApp);
    const [loginError, setLoginError] = useState(null);
    const [loginErrorBox, setLoginErrorBox] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    const [resetError, setResetError] = useState(null);
    const [resetErrorBox, setResetErrorBox] = useState(false);
    const functions = getFunctions(firebaseApp);
    const [showResetForm, setShowResetForm] = useState(false); // New state to control which form to show

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');
        setLoginErrorBox(false);

        // Validation logic (same as before)
        if (!email) {
            setLoginError('Please enter your email address.');
            setLoginErrorBox(true);
            return;
        }
        if (!password) {
            setLoginError('Please enter your password.');
            setLoginErrorBox(true);
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setLoginError('Please enter a valid email address.');
            setLoginErrorBox(true);
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
                setLoginError(data.error || 'Login failed');
                setLoginErrorBox(true);
            }
        } catch (err) {
            console.error('Firebase sign-in error:', err);

            if (err.code === 'auth/invalid-credential') {
                setLoginError('Invalid email or password.');
            } else if (err.code === 'auth/user-not-found') {
                setLoginError('User not found.');
            } else if (err.code === 'auth/wrong-password') {
                setLoginError('Incorrect password.');
            }
            else {
                setLoginError(err.message || 'Login failed');
            }
            setLoginErrorBox(true);
        }
    };

    const handleForgotPassword = () => {
        setShowResetForm(true); // Show the reset password form
        setResetError('');
        setResetErrorBox(false);
        setResetSent(false);
    };

    const handleSendPasswordReset = async () => {
        setResetError('');
        setResetErrorBox(false);
        setResetSent(false);

        if (!email) {
            setResetError('Please enter your email address to reset your password.');
            setResetErrorBox(true);
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setResetError('Please enter a valid email address.');
            setResetErrorBox(true);
            return;
        }

        const sendPasswordReset = httpsCallable(functions, 'sendPasswordResetEmail');
        try {
            await sendPasswordReset({ email: email });
            setResetSent(true);
        } catch (error) {
            console.error('Error sending password reset email:', error);
            setResetError(error.message || 'Failed to send password reset email.');
            setResetErrorBox(true);
        }
    };

    const handleBackToLogin = () => {
        setShowResetForm(false); // Show the login form again
        setEmail(''); // Clear email
        setResetError('');
        setResetErrorBox(false);
        setResetSent(false);
    };

    return (
        <Row className="justify-content-md-center">
            <Col xs lg="3" className={`${styles.loginImageRow} ${styles.loginRow}`}>
                <Image
                    src={logo}
                    alt={'MindClass Logo'}
                    priority={true}
                    style={{ width: '100%', height: 'auto' }}
                />
                <Image
                    src={people}
                    alt={`People`}
                    priority={true}
                    style={{ width: '100%', height: 'auto' }}
                />
            </Col>
            <Col lg={3} className={`${styles.loginFormRow} ${styles.loginRow}`}>
                {showResetForm ? (
                    <Form>
                        <Form.Group className="mb-3" controlId="resetForm.title">
                            <h2>Reset Password</h2>
                        </Form.Group>

                        {resetErrorBox && (
                            <Alert variant="danger" onClose={() => setResetErrorBox(false)} dismissible>
                                {resetError}
                            </Alert>
                        )}

                        {resetSent && (
                            <Alert variant="success">
                                Password reset email sent to {email}. Please check your inbox and spam/junk folder.
                            </Alert>
                        )}

                        <Form.Group className="form-floating mb-3" controlId="resetForm.email">
                            <Form.Control
                                id="resetEmail"
                                type="email"
                                name="resetEmail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                            />
                            <Form.Label>Email address</Form.Label>
                        </Form.Group>

                        <Form.Group className="form-floating mb-3" controlId="resetForm.sendReset">
                            <Button variant="primary" onClick={handleSendPasswordReset}>
                                Send Password Reset Email
                            </Button>
                        </Form.Group>

                        <div className="text-end">
                            <Button className={styles.link} variant="link" onClick={handleBackToLogin}>
                                Back to Login <i className="bi bi-arrow-right-circle-fill"></i>
                            </Button>
                        </div>
                    </Form>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="loginForm.title">
                            <h2>Login</h2>
                        </Form.Group>

                        {loginErrorBox && (
                            <Alert variant="danger" onClose={() => setLoginErrorBox(false)} dismissible>
                                {loginError}
                            </Alert>
                        )}

                        <Form.Group className="form-floating mb-3" controlId="loginForm.email">
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

                        <div className="text-end">
                            <Button className={styles.link} variant="link" onClick={handleForgotPassword}>
                                Forgotten password? <i className="bi bi-arrow-right-circle-fill"></i>
                            </Button>
                        </div>
                    </Form>
                )}
            </Col>
        </Row>
    );
}
