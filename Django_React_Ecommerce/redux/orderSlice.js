import { createSlice } from "@reduxjs/toolkit";
import orderApi from "../../mocks/order";

const initialState= {
   listorder: [],
   orderDetails:{},
   loading: false,
   error:null


}

const orderSlice= createSlice({

    name:'order',
    initialState,
    reducers :{
        getOrderDetailsStart(state){
            state.loading=true
            state.error=null
        },
        getOrderDetailsSuccess(state,action){
            state.loading=false
            state.error=null
            state.orderDetails=action.payload
        },
        getOrderDetailsFailure(state,action){

            state.error= action.payload
            state.loading=false
    
        },
        createOrderStart(state){
                  state.loading= true
                  state.error=null
        },
        createOrderSuccess(state,action){
                state.listorder.push(action.payload)
                state.orderDetails= action.payload
                state.error=null
                state.loading=false
        },
       createOrderFailure(state,action){
        state.error= action.payload
        state.loading=false
       },

       payOrderStart(state){
        state.loading= true
        state.error=null
       },
       payOrderSuccess(state,action){
          state.loading=false
          state.error=null
          if(action.payload=="Order was paid"){
           state.orderDetails.isPaid= true
          }
          return state
       },
       payOrderFailure(state,action){
        state.error= action.payload
        state.loading=false
       },
       listMyOrderStart(state){
        state.loading= true
        state.error= null
       },
       listMyOrderSuccess(state,action){
                  state.listorder= action.payload
                  state.error= null
                  state.loading= false
       },
       listMyOrderFailure(state,action){
                 state.error= action.payload
                 state.loading= false
       },
       deliverOrderStart(state){
        state.loading=true
        state.error=null
       },
       deliverOrderSuccess(state,action){
        state.loading=false
        state.error=null
        const updatedOrder = action.payload
         const index= state.listorder.findIndex((order)=> order.id=== updatedOrder.id)
         if(index!== -1){
            state.listorder[index]= updatedOrder;
         }
       },
       deliverOrderFailure(state,action){
        state.error=action.payload
        state.loading= false
       }

    }
})


// Export actions
export const {
    getOrderDetailsStart,
    getOrderDetailsSuccess,
    getOrderDetailsFailure,
    createOrderStart,
    createOrderSuccess,
    createOrderFailure,
    payOrderStart,
    payOrderSuccess,
    payOrderFailure,
    listMyOrderStart,
    listMyOrderSuccess,
    listMyOrderFailure,
    deliverOrderStart,
    deliverOrderSuccess,
    deliverOrderFailure,
  } = orderSlice.actions;
  
  // Export the reducer to be used in the store
  export default orderSlice.reducer;

  export const createOrder=(order)=> async(dispatch)=>{
             try{
                dispatch(createOrderStart())
                const createdOrder = await orderApi.createOrder(order)
                dispatch(createOrderSuccess(createdOrder))
                localStorage.removeItem('cartItems')
             }
             catch(error){
                dispatch(createOrderFailure(error.message))
             }

  }

export const getOrderDetails= (orderId)=> async(dispatch)=>{

        try{
             dispatch(getOrderDetailsStart())
             const orderDetails = await orderApi.getOrderDetails(orderId)
             dispatch(getOrderDetailsSuccess(orderDetails))

        }
        catch(error){
            dispatch(getOrderDetailsFailure(error.message))

         }



}


export const payOrder = (orderId, paymentResult) => async(dispatch)=>{

     try{
          dispatch(payOrderStart())
          const updatedOrder= await orderApi.payOrder(orderId,paymentResult)
          dispatch(payOrderSuccess(updatedOrder.data))
     }
     catch(error){
        dispatch(payOrderFailure(error.message))

     }
}
export const listMyOrders= ()=>async(dispatch)=>{
    try{
        dispatch(listMyOrderStart())
        const myOrders= await orderApi.listMyOrders()
        dispatch(listMyOrderSuccess(myOrders))
    }
    catch(error){
        dispatch(listMyOrderFailure(error.message))

     }
}
export const deliverOrder= (orderId)=> async(dispatch)=>{
    try{
        dispatch(deliverOrderStart())
        const updatedOrder= await orderApi.deliverOrder(orderId);
        dispatch(deliverOrderSuccess(updatedOrder))
    }
    catch(error){
        dispatch(deliverOrderFailure(error.message))
    }
}