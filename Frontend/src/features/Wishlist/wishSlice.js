import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import wishlistService from "./wishService";



export const getwishlist = createAsyncThunk(
  "wishlist/get-wishlist",
  async (thunkAPI) => {
    try {
        return await wishlistService.getwishlis()
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);   

export const createwishlist = createAsyncThunk(
  "wishlist/create-wishlist",     
  async (wishlist, thunkAPI) => {
    try {
      
      return await wishlistService.createwishlist(wishlist);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }   
);

export const deletefromwishlist =createAsyncThunk(
  "wishlist/deletefromwishlist",
  async(id,thunkAPI)=>{
    try{
           return await wishlistService.deletefromwishlist(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
  }
)


export const resetState = createAction("Reset_all");

const initialState = {
  wishlist: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getwishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getwishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist=action.payload;
       
      
      })
      .addCase(getwishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createwishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createwishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(createwishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deletefromwishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletefromwishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message="product deleted from wishlist successfully"
      })
      .addCase(deletefromwishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
    
  },
});
export default wishlistSlice.reducer;
