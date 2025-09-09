import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";
import { useEffect } from 'react';

import { setCartItems } from '../redux/slices/cartSlice'; // adjust path if needed

function CartScreen() {
    
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cart and user state from Redux
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const user = useSelector((state) => state.user);
  const { userDetails } = user;

  // Remove item from cart
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // useEffect(() => {
  //   const stored = localStorage.getItem('cartItems');
  //   if (stored) {
  //     dispatch(setCartItems(JSON.parse(stored)));
  //   }
  //   console.log('Cart items:', cartItems);
  
    
  //   localStorage.removeItem('cart');

  // }, [dispatch]);


  
  // Proceed to checkout
  const checkoutHandler = () => {
    if (userDetails && Object.keys(userDetails).length > 0) {
      // ✅ User is logged in
      navigate("/shipping");
    } else {
      // ❌ User is not logged in
      navigate("/login");
    }
  };

  // Simple subtotal calculation without reduce
  let totalItems = 0;
  let totalPrice = 0;

  for (let i = 0; i < cartItems.length; i++) {
    totalItems += cartItems[i].quantity;
    totalPrice += cartItems[i].quantity * cartItems[i].price;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/">Go Back</Link>
        </p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #ccc",
                padding: "10px 0",
              }}
            >
              <img
                src={item.image}
               
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  marginRight: "1rem",
                }}
              />

              <div style={{ flex: 1 }}>
                <Link to={`/product/${item.id}`}>{item.name}</Link>
              </div>

              <div style={{ width: "60px", textAlign: "center" }}>{item.quantity}</div>
              <div style={{ width: "80px", textAlign: "center" }}>₹{item.price}</div>

              <button
                onClick={() => removeFromCartHandler(item.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "red",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              >
                &#128465;
              </button>
            </div>
          ))}

          <div style={{ marginTop: "2rem" }}>
            <h2>
              Subtotal ({totalItems} items): ₹{totalPrice}
            </h2>

            <button
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
              style={{
                marginTop: "1rem",
                padding: "10px 20px",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartScreen;
