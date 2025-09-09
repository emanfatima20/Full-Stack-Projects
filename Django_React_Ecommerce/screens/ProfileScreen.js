import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser } from "../redux/slices/userSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import CancelIcon from '@mui/icons-material/Cancel';

function ProfileScreen({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userDetails, loading, error } = user;

  const userData = {
    id: userDetails._id,
    name: name,
    email: email,
    password: password,
  };

  // When the component mounts, ensure the user is logged in
  useEffect(() => {
    if (!userDetails) {
      history.push("/login"); // Redirect to login if no user is found
    } else {
      setName(userDetails.name);
      setEmail(userDetails.email);
    }
  }, [dispatch, history, userDetails]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Check if passwords match before dispatching the update
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUser(userDetails._id, userData));
      setMessage("");
    }
  };

  const handleDeleteUser = () => {
    // Call the deleteUser action from userSlice
    dispatch(deleteUser(userDetails._id));
    history.push('/');
    window.location.reload(); // Reload the page
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>
        </Form>

        <Button
          type="button"
          variant="danger"
          className="mt-3"
          onClick={handleDeleteUser}
        >
          <div style={{ fontSize: "7px" }}>
            <CancelIcon /> Account
          </div>
        </Button>
      </Col>

      {/* No Orders Table Here */}
      <Col md={9}></Col>
    </Row>
  );
}

export default ProfileScreen;
