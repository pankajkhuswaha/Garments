import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import cartService from "./cartService";
import { useDispatch } from "react-redux";
import {toast} from'react-toastify'


export const getcart = createAsyncThunk(
  "cart/get-cart",
  async (thunkAPI) => {
    try {
      
      return await cartService.getcart()
    
 
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
); 
export const createcart = createAsyncThunk(
  "cart/create-cart",
  async (cart, thunkAPI) => {
    try {
      
      return await cartService.createcart(cart);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }   
);
export const updateAProduct = createAsyncThunk(
  "cart/update-cart",
  async (product, thunkAPI) => {
    try {
      return await cartService.updateBrand(product);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAProduct = createAsyncThunk(
  "cart/delete-cart",
  async (id, thunkAPI) => {
    try {
      return await cartService.deleteProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const daletecart = createAsyncThunk(
  "cart/delete-cart",
  async (id,thunkAPI) => {
    try {
      return await cartService.daletecart(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletecartitem = createAsyncThunk(
  "cart/delete-Acart",
  async (id,thunkAPI) => {
    try {
      
      return await cartService.deletecartitem(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
); 



export const resetState = createAction("Reset_all");

const initialState = {
  cart: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getcart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getcart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = action.payload;
        
        
     
      })
      .addCase(getcart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createcart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createcart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart.push(action.payload);
      })
      .addCase(createcart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deletecartitem.pending, (state) => {
        state.isLoading = true;

      })
      .addCase(deletecartitem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        toast.success("product deleted successfully from your cart ")
        
     
      })
      .addCase(deletecartitem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState).addCase(daletecart.pending, (state) => {
        state.isLoading = true;
      })
    
  },
});
export default cartSlice.reducer;
