import React, { useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../redux/slices/orderSlice";

export default function PlaceOrderScreen() {
  const error = useSelector((state) => state.order.error);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  // PRICE CALCULATIONS
  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.082 * itemsPrice).toFixed(2));
 const totalPrice = Number(
  (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)
);

  if (!cart.paymentMethod) {
    navigate("/payment");
    return;
  }

  // The original way to prepare data (paymentMethod included exactly as in your code)
  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod, // <- payment method sent here same as your original
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
    navigate("/orderDetail");
  };

  return (
    <div className="place-order">
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="order-details">
        {/* <div className="shipping-info">
          <h2>Shipping</h2>
          <p>
            <strong>Shipping Address: </strong>
            {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
          </p>
        </div> */}

   

        <div className="order-items">
          <h2>Order Items</h2>
          {cart.cartItems.length === 0 ? (
            <Message variant="info">Your cart is empty</Message>
          ) : (
            <div>
              {cart.cartItems.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-info">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <Link to={`/product/${item.product}`} className="item-name">
                      {item.name}
                    </Link>
                    <div className="item-price">
                      {item.quantity} X ₹{item.price} = ₹
                      {(item.quantity * item.price).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="summary-item">
          <span>Items:</span> <span>₹{itemsPrice.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Shipping:</span> <span>₹{shippingPrice.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Tax:</span> <span>₹{taxPrice.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Total:</span> <span>₹{totalPrice}</span>
        </div>

        {error && (
          <Message variant="danger">
            {typeof error === "string"
              ? error
              : error?.message || "Unknown error"}
          </Message>
        )}

        <div className="place-order-button">
          <button
            type="button"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom"; // ✅ useNavigate used instead of history
// import Message from "../components/Message";
// import CheckoutSteps from "../components/CheckoutSteps";
// import { useDispatch, useSelector } from "react-redux";
// import { createOrder } from "../redux/slices/orderSlice";




// export default function PlaceOrderScreen() {
// const error = useSelector((state) => state.order.error);
// console.log("Error value:", error);



//   const navigate = useNavigate(); // ✅ get navigate from useNavigate
//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart);
// console.log("item",cart.cartItems )
// console.log("Cart items:", cart.cartItems);

// console.log("Shipping address object: ", cart.shippingAddress);
// cart.cartItems.forEach((item, index) => {
//   console.log(`Item ${index} name type:`, typeof item.name, item.name);
// });

// useEffect(() => {
//   try {
//     console.log("Cart items:", cart?.cartItems);
//   } catch (e) {
//     console.error("Logging failed:", e);
//   }
// }, []);

//   // PRICE CALCULATIONS
//   const itemsPrice = cart.cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const shippingPrice = itemsPrice > 100 ? 0 : 10;
//   const taxPrice = Number((0.082 * itemsPrice).toFixed(2));
//   const totalPrice = (
//     Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
//   ).toFixed(2);

//   // Redirect to payment page if no payment method
//   if (!cart.paymentMethod) {
//     navigate("/payment");
//     return; // Ensure that the function exits here, preventing further execution
//   }

//   // Prepare the data to be sent with the order
//   const data = {
//     orderItems: cart.cartItems,
//     shippingAddress: cart.shippingAddress,
//     paymentMethod: cart.paymentMethod,
//     itemsPrice: Number(itemsPrice.toFixed(2)),       // ✅ Convert back to number
//   shippingPrice: Number(shippingPrice.toFixed(2)), // ✅ Convert back to number
//   taxPrice: Number(taxPrice.toFixed(2)),           // ✅ Convert back to number
//   totalPrice: Number(totalPrice),                  // ✅ Already a number
//   };

//   const placeOrder = () => {
//     dispatch(createOrder(data)); // Dispatch the action to create the order
//     navigate("/orderDetail"); // Navigate to the order detail page
//   };
// try{
// return (
//     <div className="place-order">
//       <CheckoutSteps step1 step2 step3 step4 />

//       <div className="order-details">
//         <div className="shipping-info">
//           <h2>Shipping</h2>
//        <p>
//   <strong>Shipping Address: </strong>
//   {typeof cart.shippingAddress?.address === "string"
//     ? cart.shippingAddress.address
//     : "Address not available"}, {" "}
//   {typeof cart.shippingAddress?.city === "string"
//     ? cart.shippingAddress.city
//     : "City not available"}, {" "}
//   {typeof cart.shippingAddress?.postalCode === "string"
//     ? cart.shippingAddress.postalCode
//     : "Postal Code not available"}, {" "}
//   {typeof cart.shippingAddress?.country === "string"
//     ? cart.shippingAddress.country
//     : "Country not available"}
// </p>


//         </div>

//         <div className="payment-info">
//           <h2>Payment</h2>
//           <p>
//             <strong>Payment Method: </strong>
//             {cart.paymentMethod}
//           </p>
//         </div>

//         <div className="order-items">
//           <h2>Order Items</h2>
//           {cart.cartItems.length === 0 ? (
//             <Message variant="info">Your cart is empty</Message>
//           ) : (
//             <div>
//               {cart.cartItems.map((item, index) => (
//                 <div key={index} className="order-item">
//                   <div className="item-info">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="item-image"
//                     />
//                     <Link to={`/product/${item.product}`} className="item-name">
//                       {item.name}
//                     </Link>
//                     <div className="item-price">
//                       {item.quantity} X ₹{item.price} = ₹
//                       {(item.quantity * item.price).toFixed(2)}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="order-summary">
//         <h2>Order Summary</h2>
//         <div className="summary-item">
//           <span>Items:</span> <span>₹{itemsPrice.toFixed(2)}</span>
//         </div>
//         <div className="summary-item">
//           <span>Shipping:</span> <span>₹{shippingPrice.toFixed(2)}</span>
//         </div>
//         <div className="summary-item">
//           <span>Tax:</span> <span>₹{taxPrice}</span>
//         </div>
//         <div className="summary-item">
//           <span>Total:</span> <span>₹{totalPrice}</span>
//         </div>
// {/* {error && (
//   <Message variant="danger">
//     {typeof error === "string"
//       ? error
//       : error && typeof error.message === "string"
//       ? error.message
//       : JSON.stringify(error, null, 2) || "Unknown error"}
//   </Message>
// )} */}



//         <div className="place-order-button">
//           <button
//             type="button"
//             disabled={cart.cartItems.length === 0}
//             onClick={placeOrder}
//           >
//             Place Order
//           </button>
//         </div>
//       </div>


//     </div>
//   );
// }
// catch(e){
// console.error("Render crashed:", e);
//   return <div>Error rendering PlaceOrderScreen</div>;
// }
  


  
// }


// import React, { useEffect } from "react";
// import { Link } from "react-router-dom"; // For navigation between pages
// import Message from "../components/Message"; // Internal component to show messages (e.g., errors, info)
// import CheckoutSteps from "../components/CheckoutSteps"; // Component for checkout steps
// import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management
// import { createOrder } from "../redux/slices/orderSlice"; // To create an order




// export default function PlaceOrderScreen() {
//     const dispatch = useDispatch(); // Dispatch function for Redux actions
//     const order = useSelector((state) => state.order); // Access order state from Redux store
//     const { orderDetails, loading, error } = order; // Destructuring order details, loading and error from the state
//     const cart = useSelector((state) => state.cart); // Access cart state from Redux st
//       // PRICE CALCULATIONS
//   const itemsPrice = cart.cartItems.reduce(
//     (acc, item) => acc + item.price * item.qty, // Calculate the total price of all items
//     0
//   );

//   const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping for orders above 100
//   const taxPrice = Number((0.082 * itemsPrice).toFixed(2)); // Tax calculation (8.2%)
//   const totalPrice = (
//     Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
//   ).toFixed(2); // Total price including items, shipping, and tax



//  // Redirect to payment page if no payment method is selected
//  if (!cart.paymentMethod) {
//     history.push("/payment");
//   }
//   const data = {
//     orderItems: cart.cartItems,
//     shippingAddress: cart.shippingAddress,
//     paymentMethod: cart.paymentMethod,
//     itemsPrice: itemsPrice.toFixed(2).toString(),
//     shippingPrice: shippingPrice.toFixed(2).toString(),
//     taxPrice: taxPrice.toFixed(2).toString(),
//     totalPrice: totalPrice.toString(),
//   };
//     // Function to place the order
//     const placeOrder = () => {
//         // Dispatch createOrder action and pass the order data
//         dispatch(createOrder(data))
//           .then(() => {
//             // After successful order creation, redirect to order details page
//             history.push(`/orderDetail`);
//           })
//           .catch((error) => {
//             // Handle any error that occurred during order creation
//             console.error("Error creating order:", error);
//           });
//       };
    






//       return (
//         <div className="place-order">
//           {/* Checkout Steps: Step 1 to 4 */}
//           <CheckoutSteps step1 step2 step3 step4 />
          
//           <div className="order-details">
//             <div className="shipping-info">
//               <h2>Shipping</h2>
//               <p>
//                 <strong>Shipping Address: </strong>
//                 {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
//                 {cart.shippingAddress.postalCode},{" "}
//                 {cart.shippingAddress.country}
//               </p>
//             </div>
    
//             <div className="payment-info">
//               <h2>Payment</h2>
//               <p>
//                 <strong>Payment Method: </strong>
//                 {cart.paymentMethod}
//               </p>
//             </div>
    
//             {/* List of Order Items */}
//             <div className="order-items">
//               <h2>Order Items</h2>
//               {cart.cartItems.length === 0 ? (
//                 <Message variant="info">Your cart is empty</Message>
//               ) : (
//                 <div>
//                   {cart.cartItems.map((item, index) => (
//                     <div key={index} className="order-item">
//                       <div className="item-info">
//                         <img src={item.image} alt={item.name} className="item-image" />
//                         <Link to={`/product${item.product}`} className="item-name">
//                           {item.name}
//                         </Link>
//                         <div className="item-price">
//                           {item.qty} X ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
    
//           <div className="order-summary">
//             <h2>Order Summary</h2>
//             <div className="summary-item">
//               <span>Items:</span> <span>₹{itemsPrice.toFixed(2)}</span>
//             </div>
//             <div className="summary-item">
//               <span>Shipping:</span> <span>₹{shippingPrice.toFixed(2)}</span>
//             </div>
//             <div className="summary-item">
//               <span>Tax:</span> <span>₹{taxPrice}</span>
//             </div>
//             <div className="summary-item">
//               <span>Total:</span> <span>₹{totalPrice}</span>
//             </div>
//             {/* Error Message (if any) */}
//             {error && <Message variant="danger">{error}</Message>}
    
//             <div className="place-order-button">
//               <button
//                 type="button"
//                 disabled={cart.cartItems.length === 0}
//                 onClick={placeOrder}
//               >
//                 Place Order
//               </button>
//             </div>
//           </div>
//         </div>
//   )
// }
