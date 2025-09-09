import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate is used instead of history
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/userSlice"; // Redux action to handle login
import Message from "../components/Message"; // Component to show error messages
import Loader from "../components/Loader";   // Component to show loading spinner


export default function LoginScreen() {
    const [password, setpassword]= useState("")
    const [username , setusername]= useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const userLogin = useSelector((state)=>state.user)
  const {userDetails, error, loading}= userLogin
  useEffect(() => {
    if (userDetails) {
      navigate("/"); // Go to homepage after login
    }
  }, [userDetails, navigate]);
  const submitHandler = (e) => {
    e.preventDefault(); // Stop the page from refreshing
    dispatch(login(username, password)); // Dispatch the login action with email and password
  };

  return (
    <div className="form-container">
      <h2>Sign In</h2>

      {/* Show error message if login fails */}
      {error && <Message variant="danger">{error}</Message>}

      {/* Show loader while login is in progress */}
      {loading && <Loader />}

      {/* Login form */}
      <form onSubmit={submitHandler}>
        {/* Email input */}
        <div className="form-group">
          <label>Username:</label>
          <input
            type="username"
            required
            value={username}
            onChange={(e) =>  setusername(e.target.value)} // Update state when user types
          />
        </div>

        {/* Password input */}
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)} // Update state when user types
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="btn">
          Sign In
        </button>
      </form>

      {/* Link to register page */}
      <p style={{ marginTop: "15px" }}>
        New Customer? <Link to="/register">Register</Link>
      </p>
    </div>
  );

  
  
}
