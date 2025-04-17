import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

const ChangePasswordForm = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const auth = getAuth();
    const user = auth.currentUser;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');
        if (!user) {
            setError('No user logged in.');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setError('New passwords do not match.');
            return;
        }
        if (newPassword.length < 6) {
            setError('New password must be at least 6 characters.');
            return;
        }

        setIsUpdating(true);
        try {
            // Re-authenticate the user
            const credential = EmailAuthProvider.credential(user.email, oldPassword);
            await reauthenticateWithCredential(user, credential);

            // Update the password
            await updatePassword(user, newPassword);
            setSuccess('Password updated successfully!');
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsUpdating(false);
        }
    };

    const getErrorMessage = (error) => {
        switch (error.code) {
            case 'auth/wrong-password':
                return 'Incorrect old password.';
            case 'auth/weak-password':
                return 'New password is too weak.';
            case 'auth/requires-recent-login':
                return 'For security reasons, you need to log in again before changing your password.';
            default:
                return error.message;
        }
    };

    return (
        <Card>
            <Card.Header>
                <h5 className={'text-center'}>Change Password</h5>
            </Card.Header>
            <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <p className={'text-muted'}>Enter your old password, then your new password twice.<br/>
                    Your new password must be over 6 characters long.</p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="form-floating mb-3" controlId="formOldPassword">
                        <Form.Control
                            type="password"
                            name="oldPassword"
                            placeholder="Old Password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                        <Form.Label>Old Password</Form.Label>
                    </Form.Group>

                    <Form.Group className="form-floating mb-3" controlId="formNewPassword">
                        <Form.Control
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <Form.Label>New Password</Form.Label>
                    </Form.Group>

                    <Form.Group className="form-floating mb-3" controlId="formConfirmNewPassword">
                        <Form.Control
                            type="password"
                            name="confirmNewPassword"
                            placeholder="Confirm New Password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                        />
                        <Form.Label>Confirm New Password</Form.Label>
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={isUpdating}>
                        {isUpdating ? 'Updating...' : 'Change Password'}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ChangePasswordForm;
