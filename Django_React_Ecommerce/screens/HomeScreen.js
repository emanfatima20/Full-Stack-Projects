import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import custom components
import Product from "../components/Product";       // Component to show individual product
import Loader from "../components/Loader";         // Component to show a loading spinner
import Message from "../components/Message";       // Component to show error messages
import ProductCarousal from "../components/ProductCarousal"; // Top-rated products carousel

// Redux thunk to fetch product list from backend
import { fetchProductList } from "../redux/slices/productSlice";



export default function HomeScreen() {
    const dispatch= useDispatch();
  const productList= useSelector((state)=> state.product.productList)
  const { products, loading, error}= productList

    const topRatedProducts= useSelector((state)=>state.product.topRatedProducts)
    const { products:topproducts, error:toperror, loading:toploading}= topRatedProducts

    useEffect(()=>{
        dispatch(fetchProductList())
    },[dispatch])

  return (
    <div className="home-container">
    {/* Show carousel of top-rated products only if it exists */}
    <>
      <h2 className="section-title">TOP-RATED PRODUCTS</h2>
      <ProductCarousal />
    </>

    {/* Section title */}
    <h2 className="section-title">LATEST PRODUCTS</h2>

    {/* Conditional rendering based on loading/error state */}
    {loading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">{error}</Message>
    ) : (
      <div className="products-grid">
      { 
  products.map((product) => (
    <div className="product-item" key={product.id}>
      <Product product={product} />
    </div>
  ))
// ) : (
//   <Message variant="danger">No products available.</Message>)
  }
      </div>
    )}
  </div>
  )
}
