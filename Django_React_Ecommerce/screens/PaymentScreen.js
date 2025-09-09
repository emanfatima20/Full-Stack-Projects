// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { savePaymentMethod } from "../redux/slices/cartSlice"; // Action creator to save payment method
// import { useNavigate } from "react-router-dom";

// import FormContainer from "../components/FormContainer"; // Custom form container for layout
// import CheckoutSteps from "../components/CheckoutSteps"; // Custom checkout steps for navigation

// function PaymentScreen({ history }) {
//   // Pull shipping address from the cart state
//   const cart = useSelector((state) => state.cart);
//   const { shippingAddress } = cart;
//   const navigate = useNavigate(); // ✅ this replaces history
//   // State to manage the selected payment method
//   const [paymentMethod, setPaymentMethod] = useState("PayPal");

//   // If no shipping address is found, redirect the user to the shipping screen
//   if (!shippingAddress.address) {
//       navigate("/shipping")
//   }

//   // Dispatch function for saving the payment method to Redux state
//   const dispatch = useDispatch();

//   // Submit handler for the form
//   const submitHandler = (e) => {
//     e.preventDefault();

//     // Dispatch the payment method to the Redux store
//     dispatch(savePaymentMethod(paymentMethod));

//     // Redirect to the place order screen
   
//       navigate("/placeorder"); // ✅ use navigate
//   };

//   return (
//     <div className="payment-screen">
//       {/* Checkout Steps component */}
//       <CheckoutSteps step1 step2 step3 />

//       {/* Form to select payment method */}
//       <form onSubmit={submitHandler} className="payment-form">
//         <div className="payment-method">
//           <legend>Select Method</legend>

//           <div className="payment-options">
//             {/* Radio button for PayPal or Credit Card selection */}
//             <label htmlFor="paypal">
//               <input
//                 type="radio"
//                 id="paypal"
//                 name="paymentMethod"
//                 value="PayPal"
//                 checked={paymentMethod === "PayPal"}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//               />
//               PayPal or Credit Card
//             </label>
//           </div>
//         </div>

//         {/* Continue button to submit the form */}
//         <button type="submit" className="continue-button">
//           Continue
//         </button>
//       </form>
//     </div>
//   );
// }

// export default PaymentScreen;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <style>{`
        .payment-screen {
          max-width: 500px;
          margin: 40px auto;
          padding: 30px 25px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          background-color: #fefefe;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .payment-screen legend {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 20px;
          color: #333;
        }
        .payment-method {
          margin-bottom: 30px;
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 6px;
          background-color: #fafafa;
        }
        .payment-options label {
          display: flex;
          align-items: center;
          font-size: 1.1rem;
          cursor: pointer;
          user-select: none;
          color: #222;
        }
        .payment-options input[type="radio"] {
          margin-right: 12px;
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #007bff; /* modern browsers support */
        }
        .continue-button {
          display: block;
          width: 100%;
          padding: 12px 0;
          font-size: 1.15rem;
          font-weight: 600;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .continue-button:hover {
          background-color: #0056b3;
        }
      `}</style>

      <div className="payment-screen">
        <CheckoutSteps step1 step2 step3 />

        <form onSubmit={submitHandler} className="payment-form">
          <div className="payment-method">
            <legend>Select Method</legend>

            <div className="payment-options">
              <label htmlFor="paypal">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                PayPal or Credit Card
              </label>
            </div>
          </div>

          <button type="submit" className="continue-button">
            Continue
          </button>
        </form>
      </div>
    </>
  );
}

export default PaymentScreen;
