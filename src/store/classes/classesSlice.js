import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {URL} from '@config/apiUrl';
import {Get} from '@axios/AxiosInterceptorFunction';

export const initialSetupRequest = createAsyncThunk(
  'user/initialSetupRequest',
  async data => {
    return data;
  },
);

export const popularClass = createAsyncThunk(
  'user/popularClass',
  async data => {
    try {
      return {
        status: 'success',
        error: false,
        message: 'Success! You are logged in!',
        isData: data,
      };
    } catch (error) {
      console.log('ERROR', error);
      return {
        status: 'failed',
        error: true,
        message: 'Oops! Something went wrong!',
      };
    }
  },
);

export const getClasses = createAsyncThunk('user/getClasses', async data => {
  try {
    return {
      status: 'success',
      error: false,
      message: 'Success! You are logged in!',
      isData: data,
    };
  } catch (error) {
    console.log('ERROR', error);
    return {
      status: 'failed',
      error: true,
      message: 'Oops! Something went wrong!',
    };
  }
});

export const getSingleClass = createAsyncThunk(
  'user/getSingleClass',
  async data => {
    try {
      const url = URL(`timeTable/trainee/single?date=${data.date}`);
      const response = await Get(url, data.authToken);
      return {
        status: 'success',
        error: false,
        message: 'Success! You are logged in!',
        classesData: response?.data?.data,
      };
    } catch (error) {
      console.log('ERROR', error);
      return {
        status: 'failed',
        error: true,
        message: 'Oops! Something went wrong!',
      };
    }
  },
);

export const saveDate = createAsyncThunk('user/saveDate', async data => {
  try {
    return {
      status: 'success',
      error: false,
      dateSaved: data,
    };
  } catch (error) {
    console.log('ERROR', error);
    return {
      status: 'failed',
      error: true,
      message: 'Oops! Something went wrong!',
    };
  }
});
export const refreshList = createAsyncThunk('classes/refreshList', async data => {
  try {
    return {
      status: 'success',
      classesData: data,
    };
  } catch (error) {
    return {
      status: 'failed',
      error: true,
      message: error.code,
      classesData: undefined,
    };
  }
});
const initialState = {
  isLoadingRequest: false,
  status: 'idle',
  error: false,
  errorMessage: '',
  popularClasses: [],
  classesData: undefined,
  singleDateClasses: undefined,
  savedDate: '',
  refList: null,
};

const classReducer = createSlice({
  name: 'classes',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    //POPULARS
    [popularClass.pending]: (state, action) => {
      state.status = 'loading';
      state.isLoadingRequest = true;
    },
    [popularClass.rejected]: (state, action) => {
      state.status = 'failed';
      state.isLoadingRequest = false;
      state.error = true;
      state.popularClasses = action.payload.isData;
    },
    [popularClass.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.popularClasses = action.payload.isData;
    },

    //GET CLASSES BY DATE
    [getClasses.pending]: (state, action) => {
      state.status = 'loading';
      state.isLoadingRequest = true;
    },
    [getClasses.rejected]: (state, action) => {
      state.status = 'failed';
      state.isLoadingRequest = false;
      state.error = true;
      state.classesData = action.payload.isData;
    },
    [getClasses.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.classesData = action.payload.isData;
    },
    ///SINGLE DATE CLASSES
    [getSingleClass.pending]: (state, action) => {
      state.status = 'loading';
      state.isLoadingRequest = true;
    },
    [getSingleClass.rejected]: (state, action) => {
      state.status = 'failed';
      state.isLoadingRequest = false;
      state.error = true;
      state.classesData = action.payload.classesData;
    },
    [getSingleClass.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.classesData = action.payload.classesData;
    },
    [saveDate.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.savedDate = action.payload.dateSaved;
    },
    ///REFRESH LIST
    [refreshList.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.refList = action.payload.classesData;
    },
  },
});

export default classReducer.reducer;
