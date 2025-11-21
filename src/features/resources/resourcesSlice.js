import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching all resources
export const fetchAllResources = createAsyncThunk(
  'resources/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL;
      const { auth } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      };

      const response = await axios.get(`${API_URL}/resources`, config);
      // console.log(`Data Response${response.data.data.map((e) => e.fileUrl)}`);
      return response.data.data;
    } catch (error) {
       console.error('Error creating resource:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        return rejectWithValue(error.response.data?.message || 'Failed to create resource');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        return rejectWithValue('No response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request setup error:', error.message);
        return rejectWithValue(error.message);
      }
      // return rejectWithValue(error.response?.data?.message || 'Failed to fetch resources');
    }
  }
);

// Async thunk for creating a resource
export const createResource = createAsyncThunk(
  'resources/create',
  async (resourceData, { getState, rejectWithValue }) => {
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL;
      // Log the incoming resource data
      // console.group('Resource Data in Redux Slice');
      // console.log('Raw resourceData:', resourceData);
      
      // Log FormData entries if it's a FormData object
      // if (resourceData instanceof FormData) {
      //   console.log('FormData entries:');
      //   for (let pair of resourceData.entries()) {
      //     console.log(pair[0] + ':', pair[1]);
      //   }
      // } else {
      //   console.log('Regular object data:', JSON.stringify(resourceData, null, 2));
      // }
      
      const { auth } = getState();
      const formData = resourceData instanceof FormData 
        ? resourceData 
        : new FormData();
      
      // Only append if not already a FormData object
      if (!(resourceData instanceof FormData)) {
        Object.keys(resourceData).forEach(key => {
          formData.append(key, resourceData[key]);
        });
      }
      
      // console.log('Final FormData being sent to API:');
      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ':', pair[1]);
      // }
      // console.groupEnd();

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`,
        },
        // timeout: 30000,
      };
      const response = await axios.post(
        `${API_URL}/resources/create`, 
        resourceData, 
        config
      );
      // console.log(`Data Response: ${response.data.data}`);
      return response.data.data;
    } catch (error) {
      console.error('Error creating resource:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        return rejectWithValue(error.response.data?.message || 'Failed to create resource');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        return rejectWithValue('No response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request setup error:', error.message);
        return rejectWithValue(error.message);
      }
      // return rejectWithValue(error.response?.data?.message || 'Failed to create resource');
    }
  }
);

const initialState = {
  resources: [],
  loading: false,
  error: null,
  success: false,
};

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    resetResourceState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Fetch All Resources
    builder
      .addCase(fetchAllResources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllResources.fulfilled, (state, action) => {
        state.loading = false;
        state.resources = action.payload;
        state.success = true;
      })
      .addCase(fetchAllResources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Resource
      .addCase(createResource.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createResource.fulfilled, (state, action) => {
        state.loading = false;
        state.resources = [action.payload, ...state.resources];
        state.success = true;
      })
      .addCase(createResource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetResourceState } = resourcesSlice.actions;

export const selectResources = (state) => state.resources.resources;
export const selectResourcesLoading = (state) => state.resources.loading;
export const selectResourcesError = (state) => state.resources.error;
export const selectResourcesSuccess = (state) => state.resources.success;

export default resourcesSlice.reducer;
