import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/orderDetail" element={<OrderScreen />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;


// import logo from './logo.svg';
// import './App.css';
// import { Container } from "react-bootstrap";

// /* COMPONENTS */
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import HomeScreen from "./screens/HomeScreen";
// import ProductScreen from "./screens/ProductScreen";
// import CartScreen from "./screens/CartScreen";
// import LoginScreen from "./screens/LoginScreen";
// import RegisterScreen from "./screens/RegisterScreen";
// import ProfileScreen from "./screens/ProfileScreen";
// import ShippingScreen from "./screens/ShippingScreen";
// import PaymentScreen from "./screens/PaymentScreen";
// import PlaceOrderScreen from "./screens/PlaceOrderScreen";
// import OrderScreen from "./screens/OrderScreen";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import Star from "./components/Star";




// function App() {
//   return (
//     <Router>  
// <div style={{ position: "sticky", top: 0, zIndex: "100" }}>
//         <Header />
//       </div>

//       <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
//         <main>
//           <Route exact path="/" component={HomeScreen} />
//           <Route path="/page/:pageNumber" component={HomeScreen} />
//           <Route path="/login" component={LoginScreen} />
//           <Route path="/register" component={RegisterScreen} />
//           <Route path="/profile" component={ProfileScreen} />
//           <Route path="/shipping" component={ShippingScreen} />
//           <Route path="/payment" component={PaymentScreen} />
//           <Route path="/placeorder" component={PlaceOrderScreen} />
//           <Route path="/orderDetail" component={OrderScreen} />
//           <Route path="/product/:id" component={ProductScreen} />
//           <Route path="/cart/:id?" component={CartScreen} />
//           <Route path="/star" component={Star} />
//         </main>
//       </div>

//       <Footer />

//     </Router>
  
//   );
// }

// export default App;
