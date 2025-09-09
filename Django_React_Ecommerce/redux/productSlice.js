import { createSlice } from "@reduxjs/toolkit";
import productApi from "../../mocks/product";

const initialState ={

    productList:{ products:[], loading:false, error:null},
    productDetails: {product:{reviews:[]}, loading:false, error:null},
    createReview: {loading:false, error:null, success:false},
    topRatedProducts:{products: [], loading:false, error:null},


}

const productSlice =createSlice({

    name:'product',
    initialState,
    reducers:{

          productListRequest(state){
             state.productList.loading= true
             state.productList.error=null
          },
          productListSuccess(state,action){
            state.productList.loading= false
            state.productList.products= action.payload
            state.productList.error=null
          },
          productListFailure(state,action){
            state.productList.error= action.payload
            state.productList.loading= false
          },
          productDetailsRequest(state){
            state.productDetails.loading= true
            state.productDetails.error=null
         },
         productDetailsSuccess(state,action){
            state.productDetails.loading= false
            state.productDetails.error=null
            state.productDetails.product= action.payload
         },
         productDetailsFailure(state,action){
            state.productDetails.loading= false
            state.productDetails.error= action.payload
           
         },
         createReviewRequest(state){
            state.createReview.loading= true
            state.createReview.error=null
            state.createReview.success= false
         },
         createReviewSuccess(state,){
            state.createReview.loading= false
            state.createReview.success=true
            state.createReview.error=null;

    },
    createReviewFailure(state,action){
        state.createReview.loading= false
        state.createReview.success=false
        state.createReview.error=action.payload

},
productTopRequest(state){
    state.topRatedProducts.loading= true
    state.topRatedProducts.error=null
 },
 productTopSuccess(state,action){
    state.topRatedProducts.loading= false
    state.topRatedProducts.error=null
    state.topRatedProducts.products=action.payload


 },
 productTopFailure(state,action){
    state.topRatedProducts.loading= false
    state.topRatedProducts.error=action.payload

    

 }
    }



})
export const {
    productListRequest,
    productListSuccess,
    productListFailure,
    productDetailsRequest,
    productDetailsSuccess,
    productDetailsFailure,
    createReviewRequest,
    createReviewSuccess,
    createReviewFailure,
    productTopRequest,
    productTopSuccess,
    productTopFailure,
} = productSlice.actions;

export default productSlice.reducer;


export const fetchProductList = () => async(dispatch)=>{
  
   try{

    dispatch(productListRequest())
       const productList =    await productApi.getProductList()
       dispatch(productListSuccess( productList.data.data ))

  
} catch(error){
    dispatch(productListFailure(error.message))
}}




   

export const fetchProductDetails = (id) => async(dispatch)=>{
    try{
        dispatch(productDetailsRequest())
      const productDetails=  await productApi.getProductDetails(id)
      dispatch(productDetailsSuccess(productDetails.data))
    }
    catch(error){
        dispatch(productDetailsFailure(error.message))
    }
    

}

export const createReview = (productId, review) => async(dispatch)=>{
    try{
        dispatch(createReviewRequest())
        await productApi.createProductReview(productId,review);
        dispatch(createReviewSuccess())

    }
    catch(error){
        dispatch(createReviewFailure(error.message))
    }
};


export const fetchTopRatedProducts = () => async(dispatch)=>{
  try{
      dispatch(productTopRequest())
      const topRatedProducts=   await productApi.getTopRatedProducts()
      dispatch(productTopSuccess(topRatedProducts.data.data))
      console.log(topRatedProducts); // Log the response to inspect its structure
  }
  catch(error){
    dispatch(productTopFailure(error.message))
}
}

  