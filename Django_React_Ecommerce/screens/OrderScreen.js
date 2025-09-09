import React, { useState, useEffect } from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { payOrder } from "../redux/slices/orderSlice";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useNavigate } from "react-router-dom";

export default function OrderScreen() {
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);

  const order = useSelector((state) => state.order);
  const { orderDetails, loading, error } = order || {};
  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin || {};

  const navigate = useNavigate();

  let itemsPrice = 0;
  if (Array.isArray(orderDetails?.orderItems)) {
    for (let item of orderDetails.orderItems) {
      itemsPrice += Number(item.price) * Number(item.qty);
    }
  }

  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=AW03j2aqK8DahlqVkhyWyJdTdL4aeHMTRnPg8LtNiKw1w7qSkgIkWcBgJmpaBEqgfH6fugnexuQlxvBX";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => setSdkReady(true);
    document.body.appendChild(script);
  };

  useEffect(() => {
    console.log("ORDER FROM REDUX:", order);

    if (!userDetails) {
      navigate("/login");
    } else if (orderDetails && !orderDetails.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [userDetails, orderDetails, navigate]);

  const successPaymentHandler = (paymentResult) => {
     console.log("PayPal paymentResult:", paymentResult);
    dispatch(payOrder(orderDetails.id, paymentResult));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message message={error} />
      ) : orderDetails ? (
        <div style={{ padding: "20px" }}>
          <h1>Order: {orderDetails.id}</h1>

          {/* Shipping info */}
          <div>
            <h2>Shipping</h2>
            <p><strong>Name:</strong> {orderDetails.user?.name}</p>
            <p><strong>Email:</strong> {orderDetails.user?.username}</p>
            <p>
              <strong>Address:</strong>{" "}
              {orderDetails.shippingAddress?.address}, {orderDetails.shippingAddress?.city},{" "}
              {orderDetails.shippingAddress?.postalCode}, {orderDetails.shippingAddress?.country}
            </p>
            {orderDetails.isDelivered ? (
              <Message variant="success">
                Delivered on {orderDetails.deliveredAt?.substring(0, 10)}
              </Message>
            ) : (
              <Message variant="warning">Not Delivered</Message>
            )}
          </div>

          {/* Payment info */}
          <div style={{ marginTop: "20px" }}>
            <h2>Payment</h2>
            <p><strong>Method:</strong> {orderDetails.paymentMethod}</p>
            {orderDetails.isPaid ? (
              <Message variant="success">
                Paid on {orderDetails.paidAt?.substring(0, 10)}
              </Message>
            ) : (
              <Message variant="warning">Not Paid</Message>
            )}
          </div>

          {/* Order items */}
          <div style={{ marginTop: "20px" }}>
            <h2>Order Items</h2>
            {!Array.isArray(orderDetails.orderItems) || orderDetails.orderItems.length === 0 ? (
              <Message variant="info">Order is empty</Message>
            ) : (
              <ul>
                {orderDetails.orderItems.map((item, index) => (
                  <li key={index} style={{ marginBottom: "10px" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "50px", verticalAlign: "middle" }}
                    />{" "}
                    <Link to={`/product/${item.product}`}>{item.name}</Link> -{" "}
                    {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Order summary */}
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              border: "1px solid #ccc",
              maxWidth: "400px",
            }}
          >
            <h2>Order Summary</h2>
            <p><strong>Items Total:</strong> ₹{itemsPrice}</p>
            <p><strong>Shipping:</strong> ₹{orderDetails.shippingPrice}</p>
            <p><strong>Tax:</strong> ₹{orderDetails.taxPrice}</p>
            <p><strong>Total:</strong> ₹{orderDetails.totalPrice}</p>

            {!orderDetails.isPaid && (
              <div style={{ marginTop: "20px" }}>
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={orderDetails.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

// import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
// import Message from "../components/Message";
// import Loader from "../components/Loader";
// import { useDispatch, useSelector } from "react-redux";
// import { payOrder } from "../redux/slices/orderSlice";
// import { PayPalButton } from "react-paypal-button-v2";
// import { Link } from 'react-router-dom';

// import { useNavigate } from "react-router-dom";

// export default function OrderScreen() {
//     const dispatch = useDispatch();
//     const [sdkReady, setSdkReady] = useState(false);
//     const order = useSelector((state) => state.order);
//     const { orderDetails, loading, error } = order || {}; // Fallback in case order is undefined
//     const userLogin = useSelector((state) => state.user);
//     const { userDetails } = userLogin;
  
//     let itemsPrice = 0;
//     if (orderDetails && orderDetails.orderItems) {
//       for (let i = 0; i < orderDetails.orderItems.length; i++) {
//         let item = orderDetails.orderItems[i];
//         const itemTotal = Number(item.price) * Number(item.qty);
//         itemsPrice += itemTotal;
//       }
//     }
  
//     const addPayPalScript = () => {
//       const script = document.createElement("script");
//       script.src =
//         "https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID_HERE";
//       script.type = "text/javascript";
//       script.async = true;
//       script.onload = () => {
//         setSdkReady(true);
//       };
//       document.body.appendChild(script);
//     };
  
//     const navigate = useNavigate();
  
//     useEffect(() => {
//       if (!userDetails) {
//         navigate("/login");
//       } else if (orderDetails && !orderDetails.isPaid) {
//         if (!window.paypal) {
//           addPayPalScript();
//         } else {
//           setSdkReady(true);
//         }
//       }
//     }, [userDetails, orderDetails, navigate]);
  
//     const successPaymentHandler = (paymentResult) => {
//       dispatch(payOrder(orderDetails.id, paymentResult));
//     };
  
//     return (
//       <>
//         <div>
//           {loading ? (
//             <Loader />
//           ) : error ? (
//             <Message message={error} />
//           ) : (
//             orderDetails && (
//               <div style={{ padding: "20px" }}>
//                 <h1>Order: {orderDetails.id}</h1>
  
//                 {/* Shipping info */}
//                 <div>
//                   <h2>Shipping</h2>
//                   <p><strong>Name:</strong> {orderDetails.User.name}</p>
//                   <p><strong>Email:</strong> {orderDetails.User.username}</p>
//                   <p>
//                     <strong>Address:</strong>{" "}
//                     {orderDetails.shippingAddress.address}, {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.postalCode}, {orderDetails.shippingAddress.country}
//                   </p>
//                   {orderDetails.isDeliver ? (
//                     <Message variant="success">
//                       Delivered on {orderDetails.deliveredAt?.substring(0, 10)}
//                     </Message>
//                   ) : (
//                     <Message variant="warning">Not Delivered</Message>
//                   )}
//                 </div>
  
//                 {/* Payment info */}
//                 <div style={{ marginTop: "20px" }}>
//                   <h2>Payment</h2>
//                   <p><strong>Method:</strong> {orderDetails.paymentMethod}</p>
//                   {orderDetails.isPaid ? (
//                     <Message variant="success">
//                       Paid on {orderDetails.paidAt?.substring(0, 10)}
//                     </Message>
//                   ) : (
//                     <Message variant="warning">Not Paid</Message>
//                   )}
//                 </div>
  
//                 {/* Order items */}
//                 <div style={{ marginTop: "20px" }}>
//                   <h2>Order Items</h2>
//                   {orderDetails.orderItems.length === 0 ? (
//                     <Message variant="info">Order is empty</Message>
//                   ) : (
//                     <ul>
//                       {orderDetails.orderItems.map((item, index) => (
//                         <li key={index} style={{ marginBottom: "10px" }}>
//                           <img
//                             src={item.image}
//                             alt={item.name}
//                             style={{ width: "50px", verticalAlign: "middle" }}
//                           />{" "}
//                           <Link to={`/product/${item.product}`}>{item.name}</Link> -{" "}
//                           {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
  
//                 {/* Order summary */}
//                 <div
//                   style={{
//                     marginTop: "20px",
//                     padding: "20px",
//                     border: "1px solid #ccc",
//                     maxWidth: "400px",
//                   }}
//                 >
//                   <h2>Order Summary</h2>
//                   <p><strong>Items Total:</strong> ₹{itemsPrice}</p>
//                   <p><strong>Shipping:</strong> ₹{orderDetails.shippingPrice}</p>
//                   <p><strong>Tax:</strong> ₹{orderDetails.taxPrice}</p>
//                   <p><strong>Total:</strong> ₹{orderDetails.totalPrice}</p>
  
//                   {!orderDetails.isPaid && (
//                     <div style={{ marginTop: "20px" }}>
//                       {!sdkReady ? (
//                         <Loader />
//                       ) : (
//                         <PayPalButton
//                           amount={orderDetails.totalPrice}
//                           onSuccess={successPaymentHandler}
//                         />
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )
//           )}
//         </div>
//       </>
//     );
//   }