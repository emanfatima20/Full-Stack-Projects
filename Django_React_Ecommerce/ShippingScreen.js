import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux/slices/cartSlice";

// ✅ React Router v6 navigation hook
import { useNavigate } from "react-router-dom";

// ✅ Custom components
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate(); // 🔄 to navigate after submit

  const submitHandler = (e) => {
    e.preventDefault();

    // 🔄 Save form data to Redux store
    dispatch(saveShippingAddress({ address, city, postalCode, country }));

    // 🔄 Go to the payment page
    navigate("/payment");
  };

  return (
    <FormContainer>
      {/* ✅ Step progress indicator */}
      <CheckoutSteps step1 step2 />

      <h1 style={{ textAlign: "center" }}>Shipping</h1>

      <form onSubmit={submitHandler} style={styles.form}>
        <label style={styles.label}>Address</label>
        <input
          type="text"
          required
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>City</label>
        <input
          type="text"
          required
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Postal Code</label>
        <input
          type="text"
          required
          placeholder="Enter Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Country</label>
        <input
          type="text"
          required
          placeholder="Enter Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Continue</button>
      </form>
    </FormContainer>
  );
}

// ✅ Simple inline styles
const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    marginTop: "15px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "20px",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ShippingScreen;
