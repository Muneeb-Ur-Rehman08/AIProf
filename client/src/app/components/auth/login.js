  import axios from 'axios';
  import React, { useState } from 'react';
  import { Modal, Button, Form } from 'react-bootstrap';
  import { setUser } from '../../../comon.lib';

  const LoginFormPopup = ({ show, handleClose, setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      // Add your login logic here
      if (email === '' || password === '') {
        setError('Please fill in all fields');
      } else {
        // Simulate a login process
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signin`, { email, password })
          .then(response => {
            setUser({...response?.data?.user, ...response?.data?.user?.session});
            setToken({...response?.data?.user, ...response?.data?.user?.session});
            handleClose(); // Close the modal on successful login
          })
          .catch(error => {
            setError('Invalid email or password');
          });
      }
    };

  const handleGoogleSignIn = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signingoogle`, { withCredentials: true });
        if (response.data.url) {
          window.location.href = response.data.url;
        } else {
          console.error('Google Sign-In URL not found.');
        }
      } catch (error) {
        console.error('Google Sign-In failed:', error);
        alert('An error occurred during Google Sign-In.');
      }
    };

    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Login
            </Button>
          </Form>
          <Button variant="danger" onClick={handleGoogleSignIn} className="mt-3">
            Continue with Google
          </Button>
        </Modal.Body>
      </Modal>
    );
  };

  export default LoginFormPopup;
