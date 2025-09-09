// import React, { useEffect, useState } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom"; // useParams to get ID, useNavigate to redirect
// import { useDispatch, useSelector } from "react-redux";

// // Redux actions to fetch product data and create a review
// import { fetchProductDetails, createReview } from "../redux/slices/productSlice";
// import { addToCart } from "../redux/slices/cartSlice";

// function ProductScreen() {
//   const { id } = useParams(); // Get the product ID from the URL
//   const navigate = useNavigate(); // Used to redirect (replace history.push)

//   const dispatch = useDispatch();

//   // States to handle selected quantity, review rating and comment
//   const [qty, setQty] = useState(1);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");

//   // Get product details from Redux state
//   const productState = useSelector((state) => state.product.productDetails);
//   const { product, loading, error } = productState;

//   // Get user info from Redux to check if the user is logged in
//   const userState = useSelector((state) => state.user);
//   const { userDetails } = userState;

//   // Get review creation status
//   const reviewCreate = useSelector((state) => state.product.createReview);
//   const { loading: loadingReview, error: errorReview, success: successReview } = reviewCreate;

//   // Load product details from backend when component mounts or review is submitted
//   useEffect(() => {
//     // If review was submitted successfully, clear the form
//     if (successReview) {
//       setRating(0);
//       setComment("");
//     }

//     // Dispatch action to fetch product details
//     dispatch(fetchProductDetails(id));
//   }, [dispatch, id, successReview]);

//   // Handler to add product to cart
//   const addToCartHandler = () => {
//     dispatch(addToCart(id, qty)); // Add to cart in Redux
//     navigate("/cart"); // Redirect to cart page
//   };

//   // Handler to submit a review
//   const submitReviewHandler = (e) => {
//     const name= product.name
//     console.log(name)
//     console.log(product)
//     e.preventDefault();
//     dispatch(createReview(id, {name, rating, comment }));
//   };

//   return (
//     <div style={{ padding: "1rem" }}>
//       <Link to="/">🔙 Go Back</Link>

//       {loading ? (
//         <p>Loading product...</p>
//       ) : error ? (
//         <p style={{ color: "red" }}>{error}</p>
//       ) : (
//         <div>
//           {/* Product Info Section */}
//           <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
//             <img src={product.image} alt={product.name} style={{ width: "300px" }} />

//             <div>
//               <h2>{product.name}</h2>
//               <p><strong>Price:</strong> ₹{product.price}</p>
//               <p><strong>Description:</strong> {product.description}</p>
//               mm <p><strong>Stock:</strong> {product.countInStock > 0 ? "In Stock" : "Out of Stock"}</p>

//               {product.countInStock > 0 && (
//                 <div>
//                   <label>Quantity:</label>
//                   <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
//                     {[...Array(product.countInStock).keys()].map((x) => (
//                       <option key={x + 1} value={x + 1}>
//                         {x + 1}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}

//               <button
//                 onClick={addToCartHandler}
//                 disabled={product.countInStock === 0}
//                 style={{
//                   marginTop: "1rem",
//                   padding: "10px",
//                   backgroundColor: "#333",
//                   color: "white",
//                   border: "none",
//                   cursor: "pointer"
//                 }}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>

//           {/* Reviews Section */}
//           <div style={{ marginTop: "3rem" }}>
//             <h3>Reviews</h3>
//             <div style={{ marginTop: "3rem" }}>
//   <h3>Reviews</h3>
//   {product.reviews && product.reviews.length === 0 ? (
//     <p>No reviews yet.</p>
//   ) : product.reviews ? (
//     product.reviews.map((review) => (
//       <div key={review.id} style={{ borderBottom: "1px solid #ccc", marginTop: "1rem" }}>
//         <strong>{review.name}</strong>
//         <p>⭐ {review.rating}</p>
//         <p>{review.comment}</p>
//         <p style={{ fontSize: "0.8rem", color: "gray" }}>{review.createdAt?.substring(0, 10)}</p>
//       </div>
//     ))
//   ) : (
//     <p>Loading reviews...</p>
//   )}
// </div>

//             {/* Review Form */}
//             <div style={{ marginTop: "2rem" }}>
//               <h4>Write a Review</h4>
//               {loadingReview && <p>Submitting review...</p>}
//               {successReview && <p style={{ color: "green" }}>Review submitted!</p>}
//               {errorReview && <p style={{ color: "red" }}>{errorReview}</p>}

//               {userDetails ? (
//                 <form onSubmit={submitReviewHandler}>
//                   <div>
//                     <label>Rating:</label>
//                     <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
//                       <option value="">Select...</option>
//                       <option value="1">1 - Poor</option>
//                       <option value="2">2 - Fair</option>
//                       <option value="3">3 - Good</option>
//                       <option value="4">4 - Very Good</option>
//                       <option value="5">5 - Excellent</option>
//                     </select>
//                   </div>

//                   <div style={{ marginTop: "1rem" }}>
//                     <label>Comment:</label>
//                     <textarea
//                       rows="4"
//                       value={comment}
//                       onChange={(e) => setComment(e.target.value)}
//                       style={{ width: "100%", padding: "8px" }}
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     style={{
//                       marginTop: "1rem",
//                       padding: "10px 20px",
//                       backgroundColor: "#007bff",
//                       color: "white",
//                       border: "none",
//                       cursor: "pointer"
//                     }}
//                   >
//                     Submit Review
//                   </button>
//                 </form>
//               ) : (
//                 <p>
//                   Please <Link to="/login">sign in</Link> to write a review.
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductScreen;
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, createReview } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productDetails = useSelector((state) => state.product.productDetails);
  const { product, loading, error } = productDetails;

  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin;

  const reviewCreate = useSelector((state) => state.product.createReview);
  const { loading: loadingReview, error: errorReview, success: successReview } = reviewCreate;

  useEffect(() => {
    if (successReview) {
      setRating(0);
      setComment("");
    }
    dispatch(fetchProductDetails(id));
  }, [dispatch, id, successReview]);

  const addToCartHandler = () => {
    dispatch(addToCart(id, qty));
    navigate("/cart");
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(createReview(id, { name: product.name, rating, comment }));
  };

  return (
    <>
      <style>{`
        .product-screen {
          padding: 1rem;
        }
        .go-back-link {
          text-decoration: none;
          font-size: 1.1rem;
          color: #333;
        }
        .product-info {
          display: flex;
          gap: 2rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }
        .product-image {
          width: 300px;
          object-fit: contain;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .product-details {
          flex: 1;
          min-width: 250px;
        }
        .product-details h2 {
          margin-top: 0;
          margin-bottom: 1rem;
        }
        .product-details p {
          margin: 0.5rem 0;
          font-size: 1rem;
          line-height: 1.4;
        }
        .quantity-select {
          margin-top: 1rem;
        }
        .quantity-select label {
          margin-right: 0.5rem;
          font-weight: bold;
        }
        .quantity-select select {
          padding: 4px 8px;
          font-size: 1rem;
        }
        .add-to-cart-btn {
          margin-top: 1rem;
          padding: 10px 15px;
          background-color: #333;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 4px;
          font-size: 1rem;
          transition: background-color 0.3s ease;
        }
        .add-to-cart-btn:disabled {
          background-color: #999;
          cursor: not-allowed;
        }
        .reviews-section {
          margin-top: 3rem;
        }
        .reviews-list {
          margin-top: 1rem;
        }
        .review-item {
          border-bottom: 1px solid #ccc;
          padding-bottom: 1rem;
          margin-top: 1rem;
        }
        .review-item strong {
          font-weight: 600;
        }
        .review-rating {
          color: #ff9529;
          font-weight: 600;
          margin: 0.2rem 0;
        }
        .review-date {
          font-size: 0.8rem;
          color: gray;
        }
        .review-form {
          margin-top: 2rem;
          max-width: 500px;
        }
        .review-form h4 {
          margin-bottom: 1rem;
        }
        .review-form label {
          font-weight: bold;
        }
        .review-form select,
        .review-form textarea {
          width: 100%;
          padding: 8px;
          margin-top: 0.3rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
          resize: vertical;
        }
        .review-submit-btn {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 4px;
          font-size: 1rem;
          transition: background-color 0.3s ease;
        }
        .review-submit-btn:hover {
          background-color: #0056b3;
        }
        .review-message {
          margin-top: 0.5rem;
          font-weight: 600;
        }
        .review-message.success {
          color: green;
        }
        .review-message.error {
          color: red;
        }
        .sign-in-link {
          color: #007bff;
          text-decoration: none;
        }
        .sign-in-link:hover {
          text-decoration: underline;
        }
        @media (max-width: 700px) {
          .product-info {
            flex-direction: column;
            align-items: center;
          }
          .product-image {
            width: 100%;
            max-width: 300px;
          }
          .product-details {
            width: 100%;
          }
        }
      `}</style>

      <div className="product-screen">
        <Link to="/" className="go-back-link">🔙 Go Back</Link>

        {loading ? (
          <p>Loading product...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <div>
            <div className="product-info">
              <img src={product.image} alt={product.name} className="product-image" />

              <div className="product-details">
                <h2>{product.name}</h2>
                <p><strong>Price:</strong> ₹{product.price}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Stock:</strong> {product.countInStock > 0 ? "In Stock" : "Out of Stock"}</p>

                {product.countInStock > 0 && (
                  <div className="quantity-select">
                    <label htmlFor="qty-select">Quantity:</label>
                    <select
                      id="qty-select"
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="reviews-section">
              <h3>Reviews</h3>

              <div className="reviews-list">
                {product.reviews && product.reviews.length === 0 ? (
                  <p>No reviews yet.</p>
                ) : product.reviews ? (
                  product.reviews.map((review) => (
                    <div key={review.id} className="review-item">
                      <strong>{review.name}</strong>
                      <p className="review-rating">⭐ {review.rating}</p>
                      <p>{review.comment}</p>
                      <p className="review-date">{review.createdAt?.substring(0, 10)}</p>
                    </div>
                  ))
                ) : (
                  <p>Loading reviews...</p>
                )}
              </div>

              <div className="review-form">
                <h4>Write a Review</h4>
                {loadingReview && <p className="review-message">Submitting review...</p>}
                {successReview && <p className="review-message success">Review submitted!</p>}
                {errorReview && <p className="review-message error">{errorReview}</p>}

                {userDetails ? (
                  <form onSubmit={submitReviewHandler}>
                    <div>
                      <label htmlFor="rating-select">Rating:</label>
                      <select
                        id="rating-select"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="comment-textarea">Comment:</label>
                      <textarea
                        id="comment-textarea"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="review-submit-btn">
                      Submit Review
                    </button>
                  </form>
                ) : (
                  <p>
                    Please <Link to="/login" className="sign-in-link">sign in</Link> to write a review.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductScreen;
