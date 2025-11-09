import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Initial state
const initialState = {
  applications: [],
  currentApplication: null,
  loading: false,
  error: null,
  success: false
};

// Async Thunks
export const submitApplication = createAsyncThunk(
  'applications/submit',
  async (formData, { rejectWithValue }) => {
    try {
      // const formData = new FormData();
      
      // Append all application data to formData
      // Object.keys(applicationData).forEach(key => {
      //   if (key === 'progressReport' || key === 'resultSlip') {
      //     if (applicationData[key]) {
      //       formData.append(key, applicationData[key]);
      //     }
      //   } else if (applicationData[key] !== undefined) {
      //     formData.append(key, applicationData[key]);
      //   }
      // });
      // Inside your submitApplication async thunk, before the axios call:
     // Log the incoming form data
      // console.log('Received FormData in slice:');
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value instanceof File ? 
      //     `${value.name} (${value.type}, ${value.size} bytes)` : 
      //     value
      //   );
      // } 
      const response = await axios.post(
        `${API_BASE_URL}/applications/apply`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      console.log(`The response ${response.data}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to submit application'
      );
    }
  }
);

export const fetchApplicationsBySchool = createAsyncThunk(
  'applications/fetchBySchool',
  async (schoolId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/applications/school/${schoolId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch applications'
      );
    }
  }
);

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    resetApplicationState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    setCurrentApplication: (state, action) => {
      state.currentApplication = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Submit Application
      .addCase(submitApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        console.log(`The action Success ${state.success}`);
        state.currentApplication = action.payload.data;
        // state.applications.push(action.payload.data);
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Fetch Applications by School
      .addCase(fetchApplicationsBySchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicationsBySchool.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload.data;
      })
      .addCase(fetchApplicationsBySchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Export actions
export const { resetApplicationState, setCurrentApplication } = applicationsSlice.actions;

// Selectors
export const selectApplications = (state) => state.applications.applications;
export const selectCurrentApplication = (state) => state.applications.currentApplication;
export const selectApplicationsLoading = (state) => state.applications.loading;
export const selectApplicationsError = (state) => state.applications.error;
export const selectApplicationSuccess = (state) => state.applications.success;

export default applicationsSlice.reducer;