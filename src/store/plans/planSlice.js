import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const initialSetupRequest = createAsyncThunk(
  'plans/initialSetupRequest',
  async data => {
    return data;
  },
);

export const allPlans = createAsyncThunk('plans/allPlans', async data => {
  try {
    return {
      status: 'success',
      error: false,
      message: 'Success!',
      isData: data,
    };
  } catch (error) {
    return {
      status: 'failed',
      error: true,
      message: 'Oops! Something went wrong!',
      isData: undefined,
    };
  }
});


const initialState = {
  isLoadingRequest: false,
  status: 'idle',
  error: false,
  errorMessage: '',
  plansData: undefined,

};

const planSlice = createSlice({
  name: 'plans',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    // PLANS
    [allPlans.pending]: (state, action) => {
      state.status = 'loading';
      state.isLoadingRequest = true;
    },
    [allPlans.rejected]: (state, action) => {
      state.status = 'failed';
      state.isLoadingRequest = false;
      state.error = true;
      state.plansData = action.payload.isData;
    },
    [allPlans.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.plansData = action.payload.isData;
    },
  },
});

export default planSlice.reducer;
