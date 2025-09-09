import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

function RegisterScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 👈 for redirecting

  // State variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // Redux state
  const { userDetails, loading, error } = useSelector((state) => state.user);

  // Redirect after successful registration
  useEffect(() => {
    if (userDetails) {
      navigate("/"); // 👈 programmatic navigation
    }
  }, [userDetails, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, email, password });
    console.log("form submitted")
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      try {
      


         dispatch(createUser(username, password, email))  // Create user action) 
      } catch (error) {
        console.error("User creation failed:", error);
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Register</h2>

      {message && <p style={{ color: "red" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Username:</label><br />
          <input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Confirm Password:</label><br />
          <input
            type="password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 15px" }}>
          Register
        </button>
      </form>

      <p style={{ marginTop: "10px" }}>
        Already have an account? <a href="/login">Sign in</a>
      </p>
    </div>
  );
}

export default RegisterScreen;
