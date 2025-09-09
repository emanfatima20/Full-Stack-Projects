

// import { createSlice } from "@reduxjs/toolkit";
// import cartApi from "../../mocks/cart";


// const cartSlice= createSlice({
//   name:'cart',
//   initialState:{
//     cartItems:  JSON.parse(localStorage.getItem('cartItems'))  || [],
//     shippingAddress :{},
//     paymentMethod: {}
//   },
//   reducers:{
//     setCartItems(state,action){
//         state.cartItems= action.payload
//         localStorage.setItem('cartItems', JSON.stringify(action.payload));
    
//   },
//   removeCartItems(state,action){
//       const id = action.payload
//       state.cartItems=   state.cartItems.filter((x)=> x.id !==id )
//       localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
//   },

//   setShippingAddress(state,action){
//        state.shippingAddress= action.payload
//        localStorage.setItem('shippingAddress', JSON.stringify(action.payload))
//   },
//   setPaymentMethod(state,action){
//     state.paymentMethod = action.payload
//     localStorage.setItem('paymentMethod', JSON.stringify(action.payload))
//   }
//   }

// })




// // Export the actions
// export const {
//     setCartItems,
//     removeCartItems,
//     setShippingAddress,
//     setPaymentMethod
//   } = cartSlice.actions;
  
//   // Export the reducer
//   export default cartSlice.reducer;


// export const addToCart = (id, qty) => async(dispatch, getState)=>{

//  try{
  
//   const { cartItems } = getState().cart;
//   const productResponse = await cartApi.fetchProduct(id);
//   const product = productResponse.data;  // Access the data inside the response
//   console.log("Product response full data:", product);

  
    
//   // Check if 'data' exists and then extract 'img'


//       let existingItemIndex= -1

//       for(let i=0; i< cartItems.length; i++){
//         if(cartItems[i].id === id)
//         {
//             existingItemIndex =i;
//             break;
//         }
//       }
//    if(existingItemIndex !== -1){
//     const updatedCartItems = [...cartItems];
//     updatedCartItems[existingItemIndex].quantity += qty;

//     dispatch(setCartItems(updatedCartItems))
//     console.log("item updated", updatedCartItems)

//    }
//  else {
//       const newItem = {
//         id: product.id,
//         name: product.name,
//         image: product.image,
//         price: product.price,
//         quantity: qty,
//       };

//       dispatch(setCartItems([...cartItems, newItem]));
//     }
//   }

 
//  catch(error){
//     console.log("Error in add to cart",error)
//  }
// }

import { createSlice } from "@reduxjs/toolkit";
import cartApi from "../../mocks/cart";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    shippingAddress: {},
    paymentMethod: {}
  },
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload;
      localStorage.setItem('cartItems', JSON.stringify(action.payload));
    },
    removeCartItems(state, action) {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((x) => x.id !== id);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    setShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
    setPaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
    }
  }
});

export const {
  setCartItems,
  removeCartItems,
  setShippingAddress,
  setPaymentMethod
} = cartSlice.actions;

export default cartSlice.reducer;
export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { cartItems } = getState().cart;
    const productResponse = await cartApi.fetchProduct(id);


console.log("Product response:", productResponse);



    const product = productResponse.data; // ✅ Fix nested data access
 
 const existingItemIndex = cartItems.findIndex(item => String(item.id) === String(id));


    if (existingItemIndex !== -1) {
      const updatedCartItems = cartItems.map((item, index) => {
        if (index === existingItemIndex) {
          return {
            ...item,
            quantity: item.quantity + qty, // ✅ Immutable update
          };
        }
        return item;
      });

      dispatch(setCartItems(updatedCartItems));
      console.log("item updated", updatedCartItems);
    } else {
      const newItem = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: qty,
      };
      console.log("Adding new item:", newItem);


      dispatch(setCartItems([...cartItems, newItem]));
      console.log("item added", newItem);
    }
  } catch (error) {
    console.log("Error in add to cart", error);
  }
};

export const removeFromCart = (id)=>(dispatch,getState)=>{
    try{
        dispatch(removeCartItems(id))
    }
    catch(error){
        console.log("Error in removing item from cart")
    }
}

export const saveShippingAddress = (data) => (dispatch)=>{
    dispatch(setShippingAddress(data))
}

export const savePaymentMethod = (data) => (dispatch)=>{
    dispatch(setPaymentMethod(data))
}