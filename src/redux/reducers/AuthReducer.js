
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  token: "",
  resetkey: "",
  filter :{},
  delete:false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogin: (state, action) => {
      state.token = action.payload;
    },
    handleProductList: (state, action) => {
      state.productList = action.payload;
    },
    handleresetkey: (state, action) => {
      state.resetkey = action.payload;
    },
    
    deletehandlefilter:(state,action)=>{
      state.filter=action.payload;
  },
  handledeleteds:(state,action)=>{
    state.delete=action.payload;
  }
    
  },
});

export const { handleLogin, handleProductList, handleresetkey ,deletehandlefilter ,handledeleteds} =
  authSlice.actions;
export default authSlice.reducer;
