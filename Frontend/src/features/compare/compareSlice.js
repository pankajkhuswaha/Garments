import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const addItems = createAsyncThunk(
    'cart/getCartItems',
    async (name, thunkAPI) => {
      try {
       
       return name
  
      
      } catch (error) {
        return thunkAPI.rejectWithValue('something went wrong');
      }
    }
  );
export const removeItem = createAsyncThunk(
      'cart/removeItems',
      async (name, thunkAPI) => {
        try {
         return  name;
        } catch (error) {
          return thunkAPI.rejectWithValue('something went wrong');
        }
      }
    );
const initialState = {
  Items: [],
   
};


  
const compareSlice = createSlice({
  name: 'compare',
  initialState,
  isLoading:false,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addItems.fulfilled, (state, action) => {
      
        state.isLoading = false;
        if (state.Items.length === 0 || state.Items[0].category === action.payload.category) {
          const uniqueItems = new Set(state.Items.map(item => item._id));
          if (!uniqueItems.has(action.payload._id)) {
            state.Items.push(action.payload);
          }
        } else {
          state.Items = [action.payload];
        }
      
      })
      .addCase(addItems.rejected, (state, action) => {
       
        state.isLoading = false;
      })
      .addCase(removeItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
      
        state.isLoading = false;
       
        state.Items = state.Items.filter(item => item._id !== action.payload);
      })
      .addCase(removeItem.rejected, (state, action) => {
       
        state.isLoading = false;
      });
  },
});


export default compareSlice.reducer;