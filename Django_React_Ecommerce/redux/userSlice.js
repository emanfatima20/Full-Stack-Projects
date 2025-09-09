
import { createSlice } from "@reduxjs/toolkit";
import userApi from "../../mocks/user";

let storedUserInfo = null;

try {
  const raw = localStorage.getItem('userInfo');
  if (raw && raw !== 'undefined') {
    storedUserInfo = JSON.parse(raw);
  }
} catch (error) {
  console.error('Failed to parse userInfo from localStorage:', error);
  localStorage.removeItem('userInfo'); // cleanup
}


const initialState ={
    userDetails: storedUserInfo? storedUserInfo: null,
    loading:false,
    error:null
}

const userSlice = createSlice(
  {
    name: 'user',
    initialState,
    reducers:{
         loginStart(state){
            state.loading=true
            state.error =null
         },
         loginSuccess(state,action){

            state.userDetails= action.payload
            state.error= null
            state.loading= false
     ;

            localStorage.setItem('userInfo', JSON.stringify(action.payload))

         },
         loginFailure(state,action){
                state.error= action.payload
                state.loading=false
         },
         getUserDetailsStart(state){
            state.loading= true
            state.error= null
         },
         getUserDetailsSuccess(state,action){
                state.loading= false
                state.error= null
                state.userDetails= action.payload

         },
         getUserDetailsFailure(state,action){
            state.error= action.payload
            state.loading=false
         },
         createUserStart(state){
            state.loading= true
            state.error= null
         },
         createUserSuccess(state, action){
            state.loading=false
            state.error= null
            state.userDetails={...action.payload}
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
         },
         createUserFailure(state,action){
            state.loading= false
            state.error= action.payload
         },
          updateUserStart(state){
            state.loading= true
            state.error= null
         },
         updateUserSuccess(state,action){
            state.userDetails= {...state.userDetails, ...action.payload}
            state.loading= false
            state.error= null
         },
          updateUserFailure(state,action){
            state.loading= false
            state.error= action.payload
         },
         deleteUserStart(state){
            state.loading= true
            state.error= null
         },
         deleteUserSuccess(state,action){
            state.loading=false
            state.error=null
            state.userDetails= {}
            localStorage.removeItem('userInfo')
         },
         deleteUserFailure(state,action){
            state.loading= false
            state.error= action.payload
         },
         logoutSuccess(state){
            state.userDetails= {}
            state.loading=false
            state.error= null
            localStorage.removeItem('userInfo')
         }

    }


  }

)
export const {
    loginStart,
    loginSuccess,
    loginFailure,
    getUserDetailsStart,
    getUserDetailsSuccess,
    getUserDetailsFailure,
    createUserStart,
    createUserSuccess,
    createUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    logoutSuccess,
  } = userSlice.actions;
  

  export const login = (username, password) => async (dispatch) => {
   try {
     dispatch(loginStart());
     const user = await userApi.loginUser(username, password); // no `.data`
     dispatch(loginSuccess(user)); // user is already the object
   } catch (error) {
     dispatch(loginFailure(error));
   }
 };
 

export const fetchUserDetails =(userId)=> async(dispatch)=>{
    try{
        dispatch(getUserDetailsStart())
        const userDetails= await userApi.getUserDetails(userId)
        dispatch(getUserDetailsSuccess(userDetails))
    }
    catch(error){
        dispatch(getUserDetailsFailure(error.message))
     }
}
export const createUser= (username, password, email)=> async(dispatch)=>{
    
    try{
   
        dispatch(createUserStart())
        const user= await userApi.createUser(username,password,email)
        dispatch(createUserSuccess(user.data))
    
    }
 
    catch(error){
        dispatch(createUserFailure(error.message))
     }
}
export const updateUser= (userId, updatedata) => async(dispatch)=>{
  try{
    dispatch(updateUserStart())
    const user= await userApi.updateUser(userId, updatedata)
    dispatch(updateUserSuccess(user))
  }

  catch(error){
    dispatch(updateUserFailure(error.message))
 }
}
export const deleteUser= (userId) => async(dispatch)=>{
    try{
      dispatch(deleteUserStart())
      await userApi.updateUser(userId)
      dispatch(deleteUserSuccess())
    }
  
    catch(error){
      dispatch(deleteUserFailure(error.message))
   }
  };


 export const logout=()=> (dispatch)=>{
    dispatch(logoutSuccess())
  }


  export default userSlice.reducer;